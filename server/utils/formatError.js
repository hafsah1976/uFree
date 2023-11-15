function formatError(formattedError, error) {
    // if (formattedError.extensions.code === 'NOT_FOUND') {
    //   return {
    //     ...formattedError,
    //     message: "Your query doesn't match the schema. Try double-checking it!",
    //   };
    // }
    return {
        ...formattedError,
        message: `ERROR CODE: ${formattedError.extensions.code}\n\n${formattedError.message}`
    }
}

module.exports = formatError;