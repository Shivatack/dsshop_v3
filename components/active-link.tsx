import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ActiveLink({ children, linkKey, linkHref, activeClass, inactiveClass, linkClassName, ariaCurrent }: {children: any, linkKey?:string, linkHref:string, activeClass: string, inactiveClass: string, linkClassName?: string, ariaCurrent?: any}) {
    const [classNames, setClassNames] = useState(activeClass);
    // const [ariaCurrent, setAriaCurrent] = useState("page" as React.AriaRole);
    const router = useRouter();

    useEffect(
        () => {
            if (router.asPath === linkHref) {
                setClassNames(activeClass);
                // setAriaCurrent("page" as React.AriaRole);
            } else {
                setClassNames(inactiveClass);
                // setAriaCurrent(undefined);
            }
        },
        [
            router,
            linkHref,
            activeClass,
            inactiveClass
        ]
    );
    classNames.concat(" ", linkClassName);

    const handleClick = (e) => {
        e.preventDefault();
        router.push(linkHref);
    };

    return (
        <a
            key={linkKey}
            href={linkHref}
            onClick={handleClick}
            className={classNames}
            aria-current={ariaCurrent}
        >
            {children}
        </a>
    );
}

export default ActiveLink;
