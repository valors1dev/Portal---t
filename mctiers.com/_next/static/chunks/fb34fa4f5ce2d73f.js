(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 52755, e => {
    "use strict";
    var t = e.i(23393),
        r = e.i(778);
    e.s(["useProfile", 0, () => {
        let [e, a] = (0, r.useState)(null), [s, l] = (0, r.useState)(!1), [i, n] = (0, r.useState)(!1);
        return {
            profile: e,
            handleFetchPlayer: async e => {
                a(null), l(!0), n(!0);
                let o = Date.now();
                try {
                    let [r, s] = await Promise.all([(0, t.fetchProfileData)(e), (0, t.fetchPvPClub)(e).catch(e => (console.error("Portal Network Server - not found:", e), null))]);
                    let i = 500 - (Date.now() - o);
                    i > 0 && await new Promise(e => setTimeout(e, i));
                    a({ ...r,
                        pvpclub: s
                    })
                } catch (e) {
                    console.error(e)
                } finally {
                    n(!1)
                }
            },
            hide: () => {
                a(null), l(!1)
            },
            visible: s,
            loadingProfile: i
        }
    }])
}, 42550, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(778);
    e.s(["default", 0, ({
        fn: e,
        dependency: a
    }) => {
        let s = (0, r.useRef)(null);
        return (0, r.useEffect)(() => {
            if (!s.current) return;
            let r = !1,
                t = new IntersectionObserver(t => {
                    t[0].isIntersecting && !r && (r = !0, e(), setTimeout(() => {
                        r = !1
                    }, 400))
                }, {
                    threshold: .2
                });
            return t.observe(s.current), () => t.disconnect()
        }, [a]), (0, t.jsx)("div", {
            "aria-label": "infinite loader",
            "aria-hidden": !0,
            style: {
                height: "50px"
            },
            ref: s
        })
    }])
}, 83827, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(86115);

    function a(e) {
        return (0, r.GenIcon)({
            tag: "svg",
            attr: {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            },
            child: [{
                tag: "path",
                attr: {
                    d: "M4 8v-2a2 2 0 0 1 2 -2h2"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M4 16v2a2 2 0 0 0 2 2h2"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M16 4h2a2 2 0 0 1 2 2v2"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M16 20h2a2 2 0 0 0 2 -2v-2"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M9 10h.01"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M15 10h.01"
                },
                child: []
            }, {
                tag: "path",
                attr: {
                    d: "M9.5 15.05a3.5 3.5 0 0 1 5 0"
                },
                child: []
            }]
        })(e)
    }
    e.s(["default", 0, ({
        message: e,
        notice: r,
        heading: s
    }) => (0, t.jsxs)("div", {
        className: "text-center space-y-3",
        children: [(0, t.jsx)(a, {
            size: 100,
            className: "mx-auto"
        }), (0, t.jsx)("h1", {
            className: "text-2xl font-bold",
            children: s || "Oops, an error occurred!"
        }), (0, t.jsx)("h2", {
            className: "text-lg text-muted-foreground",
            children: e || "An error occurred while loading players. Please refresh the page."
        }), (0, t.jsx)("p", {
            className: "text-sm mt-4 text-muted-foreground",
            children: r || "If the issue persists, please contact staff members or admins."
        })]
    })], 83827)
}]);