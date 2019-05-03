/**
 * 发送post请求
 * @param {String} url 请求的url
 * @param {FormData} formData 请求的body
 * @returns {Promise}
 */
// 不加Content-Type的原因: https://zhuanlan.zhihu.com/p/34291688
function post(url, formData) {
    return fetch(url, {
        method: "POST",
        headers: {
        },
        body: formData,
        credentials: "same-origin"
    })
}

export default post