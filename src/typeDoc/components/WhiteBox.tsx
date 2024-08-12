import React from "react";
import cn from "classnames";

/**
 * A styled container component with a white background, padding, shadow, and rounded corners.
 *
 * The `WhiteBox` component is used to wrap and style content with a consistent appearance. It applies
 * a default set of styles including background color, padding, shadow, and rounded corners, and allows
 * additional styles to be applied via the `className` prop.

 * @example
 * ```tsx
 * <WhiteBox className="my-custom-class">
 *   <p>This is some content inside the white box.</p>
 * </WhiteBox>
 * ```
 */

export type WhiteBoxProps = {
  children: React.ReactNode;
  className?: string;
};

const WhiteBox = ({ children, className, ...rest }: WhiteBoxProps) => {
  return (
    <div
      {...rest}
      className={cn("w-full bg-white p-4 shadow rounded-xl", className)}
    >
      {children}
    </div>
  );
};
export default WhiteBox;
