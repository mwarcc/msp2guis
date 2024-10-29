const gR = (l = 8) => {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: l }, () => c.charAt(Math.floor(Math.random() * c.length))).join('');
};

const oF = window.fetch;

window.fetch = async function(u, o) {
    if (/curatedcontentitemtemplates\/v2\/item-templates\//.test(u)) {
        const r = await oF(u, o);
        const d = await r.clone().json();

        d.forEach(i => {
            i.tags.forEach(t => {
                t.resourceIdentifiers.forEach(r => {
                    r.key = gR();
                });
            });
            if (i.additionalData?.MSP2Data?.Type !== undefined) {
                i.additionalData.MSP2Data.Type = gR();
            }
        });

        return new Response(JSON.stringify(d), {
            status: r.status,
            statusText: r.statusText,
            headers: r.headers
        });
    }
    return oF(u, o);
};
