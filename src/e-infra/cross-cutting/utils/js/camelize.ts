export const camelize = function camelize(str: string): string {
    return str.replace(/\W+(.)/g, function (match, chr) {
        return chr.toUpperCase()
    })
}
