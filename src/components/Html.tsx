import {Tree} from "./Tree";
import React, {PropsWithChildren} from "react";

export default function Html({ children }: PropsWithChildren<{}>) {
    return <html>
        <body>
            <div id="react-root">
                {children}
            </div>
            <script src="/client.js"></script>
        </body>
    </html>
}
