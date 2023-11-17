function formatError(formattedError, error) {
    // if (formattedError.extensions.code === 'NOT_FOUND') {
    //   return {
    //     ...formattedError,
    //     message: "Your query doesn't match the schema. Try double-checking it!",
    //   };
    // }
    console.log(formattedError);

    if (formattedError.path[0] === 'event') {
        if (formattedError.message.includes('Argument passed in must be a string of 12 bytes')) {
            return {
                ...formattedError,
                extensions: {
                    ...formattedError.extensions,
                    code: 'NOT_FOUND'
                },
                message: `ERROR CODE: NOT_FOUND\n\n${formattedError.message}`
            }
        }
    }

    return {
        ...formattedError,
        message: `ERROR CODE: ${formattedError.extensions.code}\n\n${formattedError.message}`
    }
}

module.exports = formatError;