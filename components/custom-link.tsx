import Link from 'next/link';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

const CustomLink = forwardRef<HTMLAnchorElement, ComponentPropsWithRef<'a'>>((props, ref) => {
    let { href, children, ...rest } = props;

    return (
        <Link href={href}>
            <a ref={ref} {...rest}>
                {children}
            </a>
        </Link>
    );
});
CustomLink.displayName = "CustomLink";

export default CustomLink;
