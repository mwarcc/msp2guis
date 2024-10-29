const rS = (l = 8) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('').reduce((a, _) => a + _[Math.random() * _.length | 0], '').slice(0, l);

const f = window.fetch;

window.fetch = async (u, o) => {
    if (/curatedcontentitemtemplates\/v2\/item-templates\//.test(u)) {
        const d = await (await f(u, o)).clone().json();
        d.forEach(i => i.tags.forEach(t => t.resourceIdentifiers.forEach(r => r.key = rS())));
        d.forEach(i => i.additionalData?.MSP2Data && (i.additionalData.MSP2Data.Type = rS()));
        return new Response(JSON.stringify(d), { status: 200, statusText: 'OK', headers: {} });
    }
    return f(u, o);
};
//
