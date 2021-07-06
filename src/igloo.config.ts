export const config = {
    components: {
        blockquote: require('./components/Blockquote'),
        plaintext: require('./components/PlainText'),
    },
    fieldtypes: {
        plaintext: require('./fields/PlainText'),
        lightswitch: require('./fields/Lightswitch'),
    }
}
