/**
 * Kid-friendly educational content keyed off ledger records.
 * Every kid-level claim is linked back to a record id on the Ledger
 * so a researcher can audit it.
 */

import type { CountryId } from "./db";

export type LobsterPolicyNote = {
  policyId: string;
  kidTitle: string;
  kidSummary: string;
  whyItMatters: string;
};

export type LobsterCompanyNote = {
  companyId: string;
  kidTake: string;
};

export type LobsterCountryStory = {
  hookline: string;
  whoIsTheAnimal: string;
  bigPicture: string;
  policies: LobsterPolicyNote[];
  companies: LobsterCompanyNote[];
  treatyKidVersion: string;
  ambitionScore: number; // 0-100, hand-rated based on cited stance
  thingYouCanDo: string;
};

export const LOBSTER_STORIES: Record<CountryId, LobsterCountryStory> = {
  japan: {
    hookline:
      "Japan recycles a lot of plastic — but it also makes and uses a lot of plastic.",
    whoIsTheAnimal:
      "Goma is a spotted seal who lives in the cold seas off northern Japan. He has watched fishing villages, ports, and city beaches change over his whole life. He is patient, careful, and very honest.",
    bigPicture:
      "Japan is one of the biggest users of plastic packaging in the world per person. People here are very good at sorting their trash, and the country has strong rules about recycling. But Japan also still wants companies to be allowed to make new plastic, instead of agreeing to a worldwide cap on how much new plastic gets made.",
    policies: [
      {
        policyId: "jpn-plastic-resource-circulation-act",
        kidTitle: "The Plastic Resource Circulation Act (2022)",
        kidSummary:
          "A national law that tells companies to design products so they can be recycled, and tells towns to collect plastic separately so it can actually be reused.",
        whyItMatters:
          "Most plastic in the world is never recycled. A law that pushes design and collection together is one of the few ways to actually raise that number.",
      },
      {
        policyId: "jpn-bag-charge-2020",
        kidTitle: "You have to pay for plastic bags (2020)",
        kidSummary:
          "Every store in Japan has to charge you for a plastic bag instead of giving it away. It sounds small, but in the first year people used way fewer bags.",
        whyItMatters:
          "When something is free, we use too much of it. Even a tiny price changes how people choose.",
      },
    ],
    companies: [
      {
        companyId: "jpn-suntory",
        kidTake:
          "Suntory makes a lot of bottled drinks. They've promised that by 2030 every PET bottle they sell anywhere in the world will be made from recycled or plant-based plastic — not new plastic from oil.",
      },
      {
        companyId: "jpn-sevenandi",
        kidTake:
          "7-Eleven's parent company has promised to cut plastic packaging in their store-brand products. Convenience stores in Japan sell a huge amount of plastic-wrapped food, so this is a big deal if they actually do it.",
      },
    ],
    treatyKidVersion:
      "Japan says yes to a treaty, but says no to a worldwide rule that limits how much new plastic factories can make. They prefer to focus on what happens to plastic after we use it.",
    ambitionScore: 55,
    thingYouCanDo:
      "Next time you buy a drink in Japan, look for the recycled-PET label (リサイクルPET). Choosing those bottles tells companies their recycled-plastic line is worth keeping.",
  },
  usa: {
    hookline:
      "The U.S. uses more plastic per person than almost anywhere else.",
    whoIsTheAnimal:
      "Otis is a sea otter who lives in the kelp forests off California. Otters use rocks like tools to crack open shells, so Otis is good with details — but he sometimes argues that the plastic in the water isn't his country's fault.",
    bigPicture:
      "The U.S. is the biggest plastic-using country in the world. Different states have very different rules: California has some of the strongest laws on the planet, while many other states have almost none. The federal government has been slow to agree to worldwide limits on new plastic.",
    policies: [
      {
        policyId: "usa-save-our-seas-2.0",
        kidTitle: "Save Our Seas 2.0 (2020)",
        kidSummary:
          "A national law that puts more money into cleaning up plastic that ends up in the ocean and into building better recycling systems at home.",
        whyItMatters:
          "Cleanup helps, but it's like mopping the floor with the tap still running. This law focuses mostly on the mop.",
      },
      {
        policyId: "usa-ca-sb54",
        kidTitle: "California SB 54 (2022)",
        kidSummary:
          "California's law that says by 2032, every single-use plastic package sold in the state has to be recyclable or compostable — and the companies that make the packaging have to pay to clean it up.",
        whyItMatters:
          "This is called Extended Producer Responsibility (EPR). Instead of you and your town paying for trash, the company that made the trash has to pay. It changes who has to care.",
      },
    ],
    companies: [
      {
        companyId: "usa-coca-cola",
        kidTake:
          "Coca-Cola is one of the most-found plastic brands on beaches in the world. They've promised at least 25% recycled plastic in their bottles by 2035 — but they have changed this promise a few times, usually to make it easier on themselves.",
      },
      {
        companyId: "usa-pepsico",
        kidTake:
          "PepsiCo says it will cut the amount of new plastic per drink in half by 2030. 'Per drink' is important — if they sell more drinks, the total plastic can still go up.",
      },
    ],
    treatyKidVersion:
      "The U.S. says yes to a treaty, but no to a worldwide cap on how much new plastic gets made. They want each country to decide for itself.",
    ambitionScore: 40,
    thingYouCanDo:
      "If you live in the U.S., your state probably decides more about plastic than the federal government does. Look up your state's bottle bill or bag rule — they really vary.",
  },
  taiwan: {
    hookline:
      "Taiwan is small, but it has some of the strictest plastic rules in Asia.",
    whoIsTheAnimal:
      "Pīng is a Taiwanese white dolphin. There are fewer than 100 of her family left alive — she lives off Taiwan's west coast where rivers full of plastic meet the sea. She is quiet and serious because every word she says counts.",
    bigPicture:
      "Taiwan is not in the United Nations because of complicated politics with China, so it doesn't get to vote on the global plastic treaty. But Taiwan has decided to follow the treaty anyway. Inside Taiwan, single-use plastics like straws and bags are being phased out year by year.",
    policies: [
      {
        policyId: "twn-single-use-plastics-roadmap",
        kidTitle: "The single-use plastic phase-out (2018 →)",
        kidSummary:
          "A multi-year plan to ban four types of single-use plastic — bags, straws, utensils, and cups — first in government and schools, then restaurants, then everywhere.",
        whyItMatters:
          "Most countries pick one item to ban. Taiwan picked four and a timeline. That's much more ambitious.",
      },
      {
        policyId: "twn-plastic-bag-restriction",
        kidTitle: "Pay-for-bag, expanded (2018)",
        kidSummary:
          "Taiwan already made big stores charge for plastic bags back in 2002. In 2018 they added bookstores, bakeries, drink shops, pharmacies, hardware stores, and electronics shops to the list.",
        whyItMatters:
          "If only some stores charge for bags, people just go to the others. Covering everywhere is what makes the rule actually work.",
      },
    ],
    companies: [
      {
        companyId: "twn-uni-president",
        kidTake:
          "Uni-President is the company behind a huge amount of bottled drinks and instant noodles in Taiwan. They've said they'll use more recycled PET, but they haven't said exactly how much, by when.",
      },
      {
        companyId: "twn-formosa-plastics",
        kidTake:
          "Formosa Plastics is one of the world's biggest makers of brand-new plastic from oil. Most plastic policy is about what we throw away, but Formosa is upstream — they make the stuff in the first place. Environmental groups say their commitments to slow down are too small.",
      },
    ],
    treatyKidVersion:
      "Taiwan can't sign the UN treaty (it's not a UN member), but it has said it will follow whatever the treaty ends up requiring. That's unusual and pretty cool.",
    ambitionScore: 70,
    thingYouCanDo:
      "If you visit Taiwan, bring your own cup. Most drink shops will fill it up — and many give you a small discount.",
  },
};

export const PLASTIC_101 = {
  whatIsPlastic: [
    "Plastic is made from oil and gas. It's a chain of tiny pieces, called polymers, that link together to make something light, cheap, and almost unbreakable.",
    "That sounds great — except plastic doesn't really go away. It just gets smaller. A bottle becomes a flake, a flake becomes a microplastic, and a microplastic ends up in fish, in rain, and in our blood.",
  ],
  whereDoesItGo: [
    "About 9% of plastic the world has ever made has been recycled. About 12% has been burned. The other ~79% is still here — in landfills, in the ocean, or as tiny bits in the dirt.",
    "Rivers carry a huge amount of plastic to the sea. That's why coastal places like Beppu Bay matter so much. They're at the end of every river story.",
  ],
  whyTreaty: [
    "Plastic doesn't care about borders. A bottle thrown away in one country can wash up on a beach in another country a year later. So one country's rules can't fix the problem alone.",
    "In 2022, the United Nations agreed to write a worldwide treaty about plastic — the first one ever. Countries are still arguing about what it should say. The biggest argument is whether the treaty should limit how much new plastic gets made, or only deal with what we throw away.",
    "The countries who want strong limits are called the High Ambition Coalition. The countries who don't want hard limits are usually big oil and gas producers, or big plastic users.",
  ],
  vocabulary: [
    {
      word: "Polymer",
      meaning: "A chain of repeating molecules. Plastic is one kind of polymer.",
    },
    {
      word: "Virgin plastic",
      meaning: "Brand-new plastic, made directly from oil or gas. Not recycled.",
    },
    {
      word: "EPR",
      meaning:
        "Extended Producer Responsibility. The rule that says the company that made the packaging has to pay to deal with it, not you.",
    },
    {
      word: "Microplastic",
      meaning: "Plastic smaller than 5 millimeters. Found in oceans, soil, food, and people.",
    },
    {
      word: "INC",
      meaning:
        "Intergovernmental Negotiating Committee. The group of countries writing the UN plastic treaty.",
    },
  ],
} as const;

export const BEPPU_DEEP = {
  intro:
    "Beppu sits on the coast of Oita, on Japan's Inland Sea. It is famous for hot springs that bubble up out of the ground because of volcanoes underneath. The hot springs feed rivers that run fast, straight, and short — from mountains to the sea in just a few hours.",
  whyItMatters: [
    "Short steep rivers mean that any litter dropped in town can be in the bay by the next day. Beppu is one of the clearest places in Japan to see the journey from street → river → sea.",
    "Beppu Bay sits inside the Seto Inland Sea, which is shaped like a closed bathtub. Water doesn't flush out fast. Plastic that arrives tends to stay.",
    "Local fishing co-ops and beach-cleanup volunteers have been pulling out the same kinds of items for years: snack wrappers, fishing line, broken polystyrene, and microplastic shards.",
  ],
  ifYouVisit: [
    "Walk Kamegawa Beach at low tide and look at the wrack line — the line of seaweed and debris left by the last wave.",
    "Take the train one stop south to a smaller fishing port and see how the same plastic looks different when it's caught in nets.",
    "Eat the local fish. Then think about the microplastic study you read at the Ledger.",
  ],
} as const;

export const COURT_INTRO = {
  whatIsThis:
    "Once a year, countries meet at the United Nations to argue about a treaty for plastic. A treaty is a worldwide rule that countries agree to follow. The plastic treaty is being written right now — it isn't finished yet.",
  bigQuestion:
    "The hardest argument is this: should the treaty tell factories to make less new plastic? Or should it only tell us what to do with the plastic after we throw it away?",
  whoSitsHere:
    "Below, each of our three countries is represented by their marine animal — but the words they say are the real positions their governments took at the last UN meeting (INC-5.2, Geneva, August 2025). Every position links to its source on the Ledger.",
};
