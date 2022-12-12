function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach(function(prop) {
        delete result[prop];
    });
    return result;
}

module.exports = omit