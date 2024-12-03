import React from "react";
import Container from "./Container";
import FadeIn from "./FadeIn";
import clsx from "clsx";

const SearchIntro = ({ title, subtitle, children, centered = false }) => {
  return (
    <Container
      className={clsx("mt-24 sm:mt-32 lg:mt-40", centered && "text-center")}
    >
      <FadeIn>
        <h1
          className={clsx(
            "text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8",
            centered && "mx-auto"
          )}
        >
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <h2
            className={clsx(
              "text-xl text-gray-600 sm:text-2xl mb-6",
              centered && "mx-auto"
            )}
          >
            {subtitle}
          </h2>
        )}

        {/* Children content */}
        <div
          className={clsx(
            "mt-6 max-w-3xl text-xl text-gray-600",
            centered && "mx-auto"
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  );
};

export default SearchIntro;
