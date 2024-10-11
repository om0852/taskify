"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-board/create-safe-action";
import { StripeRedirect } from "./schema";
import { title } from "process";
import { Copy } from "lucide-react";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const settingUrl = absoluteUrl(`/organization/${orgId}`);
  let url = "";
  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency:"usd",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 200,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
          test:"test"
        },
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    console.log(error,"error")
    return {
      error: "Something went wrong",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};
export const stripeRedirect = createSafeAction(StripeRedirect, handler);
