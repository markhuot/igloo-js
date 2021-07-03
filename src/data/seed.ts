import {IglooAST} from './ComponentTree'

export const seed: IglooAST[] = [
    {
        type: 'blockquote',
        slots: {
            content: [{ type: 'plaintext', children: 'the content' }],
            citation: [{type: 'plaintext', children: 'baz'}],
        },
    },
    {
        type: 'plaintext',
        props: {},
        children: 'foo bar'
    },
]
