import {Tree} from "./Tree";
import React, {PropsWithChildren} from "react";

export default function Html({ children }: PropsWithChildren<{}>) {
    return <html>
        <head>
            <meta charSet="UTF-8"/>
        </head>
        <body>
            <div id="react-root">
                {children}
            </div>
            <script src="/client.js"></script>
        </body>
    </html>
}
