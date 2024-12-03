import { SocialMediaProfiles } from "@/components/SocialMedia";

export const navigation = [
  {
    title: "Bino.Bot",
    links: [
      { title: "bino", href: "/" },
      { title: "bot", href: "/" },
      { title: "Chat", href: "/" },
      {
        title: (
          <>
            See all <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: "/",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Bino", href: "/" },
      { title: "Templetes", href: "/search" },
      { title: "Blog", href: "/" },
      { title: "Contact us", href: "/" },
    ],
  },
  {
    title: "Connect",
    links: SocialMediaProfiles,
  },
];
