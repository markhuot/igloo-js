import {IglooAST} from './ComponentTree'

export const seed: IglooAST[] = [
    {
        uuid: 'a2c1c433-f7f9-4f02-9983-c7bb2b248aad',
        type: 'blockquote',
        props: {
            content: [{ uuid: '6b71687c-b1b6-4754-9919-9c2294d16ff8', type: 'plaintext', children: 'the content' }],
            citation: [{ uuid: 'dafc0e38-2525-4d01-b2f7-c27905c0875b', type: 'plaintext', children: 'baz'}],
        },
    },
    {
        uuid: 'cbead2da-8250-408c-997a-577cbd0e494c',
        type: 'plaintext',
        props: {},
        children: 'foo bar'
    },
]
