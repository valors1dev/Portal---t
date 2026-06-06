(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 23393, e => {
    "use strict";
    var t = e.i(47800);
    async function r(e) {
        let t = "/api/v2";
        return void 0 === t && (t = "/api/v2/", console.warn(`NEXT_PUBLIC_API_ROOT undefined, defaulting to ${t}`)), t.endsWith("/") || (t += "/"), fetch(`${t}${e}`).then(async e => {
            const r = await e.json();
            if (!e.ok) throw Object.assign(new Error(r?.error || "Request failed"), {
                status: e.status,
                data: r
            });
            return r
        }).catch(e => {
            throw console.error(e), e
        })
    }
    async function n(e, t, n) {
        return r(`mode/${e}?from=${t}&count=${n}`)
    }
    async function a(e, t) {
        return r(`mode/overall?from=${e}&count=${t}`)
    }
    async function s(e) {
        return r(`profile/${e}`)
    }
    async function l() {
        return r("mode/list")
    }
    async function i(e) {
        return r(e.length > 16 ? `profile/${e.split("-").join("")}` : `profile/by-name/${e}`)
    }

    function o(e) {
        if (!e) return 0;
        let r = e.peak_tier?? e.tier,
            n = e.peak_pos?? e.pos;
        return t.points[r][0 === n ? "high" : "low"]
    }
    let c = async e => {
        try {
            let t = await fetch(`https://api.portalnetwork.fun/v1/customname?uuid=${e}`, {
                headers: {
                    Authorization: "Bearer 213328a68ef847e4882c70aaf9146e741789535ea6384063a5b3baa0f0e356aa"
                }
            });
            if (!t.ok) return console.error("Bad Response:", t.status, await t.text()), null;
            return await t.json()
        } catch (e) {
            return console.error(e), null
        }
    };
    e.s(["calculateGamemodePoints", () => o, "fetchGamemodeInfo", () => l, "fetchGamemodePlayers", () => n, "fetchOverall", () => a, "fetchProfileData", () => s, "fetchPvPClub", 0, c, "getAchievementColor", 0, e => {
        switch (e) {
            case "Combat Grandmaster":
                return {
                    color: t.TITLES.grand_master.colors.fg,
                    background: t.TITLES.grand_master.colors.bg
                };
            case "Combat Master":
                return {
                    color: t.TITLES.master.colors.fg,
                    background: t.TITLES.master.colors.bg
                };
            case "Combat Ace":
                return {
                    color: t.TITLES.ace.colors.fg,
                    background: t.TITLES.ace.colors.bg
                };
            case "Combat Specialist":
                return {
                    color: t.TITLES.specialist.colors.fg,
                    background: t.TITLES.specialist.colors.bg
                };
            case "Combat Cadet":
                return {
                    color: t.TITLES.cadet.colors.fg,
                    background: t.TITLES.cadet.colors.bg
                };
            case "Combat Novice":
                return {
                    color: t.TITLES.novice.colors.fg,
                    background: t.TITLES.novice.colors.bg
                };
            default:
                return {
                    color: t.TITLES.rookie.colors.fg,
                    background: t.TITLES.rookie.colors.bg
                }
        }
    }, "getAchievementImgUrl", 0, e => {
        let t = "Combat Grandmaster" === e || "Combat Master" === e || "Combat Ace" === e ? "webp" : "svg";
        return `/titles/${e?.split(" ").join("_").toLowerCase()}.${t}`
    }, "getPlayerAchievement", 0, e => {
        if (null == e) return null;
        if (e >= 400) return t.TITLES.grand_master;
        if (e >= 250) return t.TITLES.master;
        if (e >= 100) return t.TITLES.ace;
        if (e >= 50) return t.TITLES.specialist;
        if (e >= 20) return t.TITLES.cadet;
        else if (e >= 10) return t.TITLES.novice;
        else if (e >= 1) return t.TITLES.rookie;
        else return t.TITLES.unranked
    }, "positionLetter", 0, e => 0 === e ? "H" : "L", "regionFormatter", 0, e => {
        switch (e) {
            case "NA":
                return "North America";
            case "AS":
                return "Asia";
            case "EU":
                return "Europe";
            case "AU":
                return "Australia";
            case "SA":
                return "South America";
            case "ME":
                return "Middle East";
            default:
                return "Unknown"
        }
    }, "searchForPlayer", () => i, "showPeakTier", 0, e => e?.peak_tier && e?.peak_pos && !e.retired && (e.peak_tier < e.tier || e.peak_tier === e.tier && e.peak_pos < e.pos), "sortedModes", 0, e => Object.entries(e?? {}).sort(([e, r], [n, a]) => {
        if (r.retired !== a.retired) return r.retired ? 1 : -1;
        if (r.tier !== a.tier) return r.tier - a.tier;
        if (r.pos !== a.pos) return r.pos - a.pos;
        let s = o(a) - o(r);
        return 0 !== s ? s : t.gamemodeNames.indexOf(e) - t.gamemodeNames.indexOf(n)
    }), "stripGamemodePathname", 0, e => e.split("/rankings")[1].split("/").join("")])
}, 45994, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(23393),
        n = e.i(7284),
        a = e.i(23191);

    function s(...e) {
        return (0, a.twMerge)((0, n.clsx)(e))
    }
    var l = e.i(47800),
        i = e.i(46798);
    let o = ({
        name: e,
        ranking: r,
        dynamicColors: n,
        slotStyles: a
    }) => {
        let l = n ? r.retired ? "var(--placement-other)" : `var(--${0===r.pos?"h":"l"}t${r.tier})` : "#000",
            i = n ? `var(--${0===r.pos?"h":"l"}t${r.tier}-foreground)` : "#000";
        return (0, t.jsxs)("span", {
            className: s("w-10 h-14 relative flex flex-col items-center", a?? ""),
            children: [(0, t.jsx)("span", {
                className: "size-8 bg-black/50 rounded-full flex items-center justify-center overflow-clip border-2 p-1",
                style: {
                    borderColor: l
                },
                children: (0, t.jsx)("img", {
                    src: `/tier_icons/${e}.svg`,
                    width: 20,
                    height: 20,
                    className: "object-contain",
                    alt: e
                })
            }), (0, t.jsxs)("strong", {
                className: "absolute bottom-1 left-2/4 -translate-x-2/4 text-[14px] px-1 rounded-lg w-9 text-center",
                style: {
                    background: l,
                    color: i
                },
                children: [r?.pos === 0 ? "HT" : "LT", r?.tier]
            })]
        })
    };
    e.s(["default", 0, ({
        rankings: e,
        slotStyles: n,
        dynamicColors: a = !1,
        withTooltip: c = !1,
        loading: u,
        tooltipSide: d = "top"
    }) => {
        let m = Object.entries(e).sort(([e, t], [n, a]) => {
                if (t.retired !== a.retired) return t.retired ? 1 : -1;
                if (t.tier !== a.tier) return t.tier - a.tier;
                if (t.pos !== a.pos) return t.pos - a.pos;
                let s = (0, r.calculateGamemodePoints)(a) - (0, r.calculateGamemodePoints)(t);
                return 0 !== s ? s : l.gamemodeNames.indexOf(e) - l.gamemodeNames.indexOf(n)
            }),
            p = e => 0 === e ? "H" : "L";
        return [...Array(8)].map((e, l) => {
            if (u) return (0, t.jsxs)("span", {
                className: "w-10 h-14 relative flex flex-col items-center",
                children: [(0, t.jsx)("span", {
                    className: "size-8 bg-[var(--layout-item-outline)] animate-pulse rounded-full flex items-center justify-center overflow-clip p-1"
                }), (0, t.jsx)("span", {
                    className: "absolute bottom-1 left-2/4 bg-[var(--layout-item-outline)] animate-pulse -translate-x-2/4 text-[14px] px-1 rounded-lg w-9 h-6 text-center"
                })]
            }, l);
            if (!(l < m.length)) return (0, t.jsxs)("span", {
                className: s("w-10 h-14 flex flex-col items-center relative", n?? ""),
                "aria-hidden": !0,
                children: [(0, t.jsx)("span", {
                    className: "size-8 bg-black/20 rounded-full flex items-center justify-center overflow-clip border-2 border-slate-500/50 border-dashed p-1"
                }), (0, t.jsx)("span", {
                    className: "absolute bottom-0.5 left-2/4 -translate-x-2/4 rounded-lg w-9 flex h-6 bg-slate-500/10 backdrop-blur-sm text-center text-muted-foreground text-sm items-center justify-center",
                    children: "-"
                })]
            }, l); {
                let [e, s] = m[l], u = (e => {
                    if (e)
                        if (e.retired) return `Retired ${p(e.pos)}T${e.tier}`;
                        else {
                            if (null === e.peak_tier || null === e.peak_pos) return `${p(e.pos)}T${e.tier}`;
                            return null !== e && null !== e.peak_tier && null !== e.peak_pos && (e.peak_tier < e.tier || e.peak_tier === e.tier && e.peak_pos < e.pos) ? `Peak ${p(e.peak_pos)}T${e.peak_tier}` : `${p(e.pos)}T${e.tier}`
                        }
                })(s);
                return c ? (0, t.jsxs)(i.Tooltip, {
                    children: [(0, t.jsx)(i.TooltipTrigger, {
                        children: (0, t.jsx)(o, {
                            name: e,
                            ranking: s,
                            dynamicColors: a,
                            slotStyles: n
                        })
                    }), (0, t.jsxs)(i.TooltipContent, {
                        side: d,
                        children: [(0, t.jsx)("h1", {
                            className: "text-2xl font-bold",
                            children: u
                        }), (0, t.jsx)("h2", {
                            className: "text-muted-foreground",
                            children: `${(0,r.calculateGamemodePoints)(s)} points`
                        })]
                    })]
                }, l) : (0, t.jsx)(o, {
                    name: e,
                    ranking: s,
                    dynamicColors: a,
                    slotStyles: n
                }, l)
            }
        })
    }], 45994)
}, 55774, e => {
    "use strict";
    var t = e.i(80506);
    e.s(["default", 0, ({
        uuid: e,
        loading: r,
        alt: n,
        width: a,
        height: s,
        ...l
    }) => (0, t.jsx)("img", {
        onError: ({
            currentTarget: t
        }) => {
            if (!t.dataset.fallback) {
                t.dataset.fallback = "1";
                t.src = `/skins/${e}.png`;
                return;
            }
            t.onerror = null;
            t.src = "/skin-404.avif";
        },
        src: `/skins/${e}.webp`,
        width: a || 16,
        height: s || 16,
        loading: r || "eager",
        alt: n,
        ...l
    })])
}, 78350, 59625, e => {
    "use strict";
    var t = {
        cm: !0,
        mm: !0,
        in: !0,
        px: !0,
        pt: !0,
        pc: !0,
        em: !0,
        ex: !0,
        ch: !0,
        rem: !0,
        vw: !0,
        vh: !0,
        vmin: !0,
        vmax: !0,
        "%": !0
    };

    function r(e) {
        var r = function(e) {
            if ("number" == typeof e) return {
                value: e,
                unit: "px"
            };
            var r, n = (e.match(/^[0-9.]*/) || "").toString();
            r = n.includes(".") ? parseFloat(n) : parseInt(n, 10);
            var a = (e.match(/[^0-9]*$/) || "").toString();
            return t[a] ? {
                value: r,
                unit: a
            } : (console.warn("React Spinners: ".concat(e, " is not a valid css value. Defaulting to ").concat(r, "px.")), {
                value: r,
                unit: "px"
            })
        }(e);
        return "".concat(r.value).concat(r.unit)
    }
    e.s(["cssValue", () => r], 78350);
    var n = function(e, t, r) {
        var n = "react-spinners-".concat(e, "-").concat(r);
        if ("undefined" == typeof window || !window.document) return n;
        var a = document.createElement("style");
        document.head.appendChild(a);
        var s = a.sheet,
            l = "\n    @keyframes ".concat(n, " {\n      ").concat(t, "\n    }\n  ");
        return s && s.insertRule(l, 0), n
    };
    e.s(["createAnimation", () => n], 59625)
}, 98631, e => {
    "use strict";
    var t = e.i(778);
    let r = e => {
            let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => r ? r.toUpperCase() : t.toLowerCase());
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        n = (...e) => e.filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t).join(" ").trim();
    var a = {
        xmlns: "http://www.w3.org/2000/svg",
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    };
    let s = (0, t.forwardRef)(({
            color: e = "currentColor",
            size: r = 24,
            strokeWidth: s = 2,
            absoluteStrokeWidth: l,
            className: i = "",
            children: o,
            iconNode: c,
            ...u
        }, d) => (0, t.createElement)("svg", {
            ref: d,
            ...a,
            width: r,
            height: r,
            stroke: e,
            strokeWidth: l ? 24 * Number(s) / Number(r) : s,
            className: n("lucide", i),
            ...!o && !(e => {
                for (let t in e)
                    if (t.startsWith("aria-") || "role" === t || "title" === t) return !0
            })(u) && {
                "aria-hidden": "true"
            },
            ...u
        }, [...c.map(([e, r]) => (0, t.createElement)(e, r)), ...Array.isArray(o) ? o : [o]])),
        l = (e, a) => {
            let l = (0, t.forwardRef)(({
                className: l,
                ...i
            }, o) => (0, t.createElement)(s, {
                ref: o,
                iconNode: a,
                className: n(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, `lucide-${e}`, l),
                ...i
            }));
            return l.displayName = r(e), l
        };
    e.s(["default", () => l], 98631)
}, 19455, e => {
    "use strict";
    let t, r, n, a, s;
    var l = e.i(80506),
        i = e.i(778),
        o = e.i(44977),
        c = Symbol.for("react.lazy"),
        u = i[" use ".trim().toString()];

    function d(e) {
        var t;
        return null != e && "object" == typeof e && "$$typeof" in e && e.$$typeof === c && "_payload" in e && "object" == typeof(t = e._payload) && null !== t && "then" in t
    }
    var m = ((s = i.forwardRef((e, t) => {
            let {
                children: r,
                ...n
            } = e;
            if (d(r) && "function" == typeof u && (r = u(r._payload)), i.isValidElement(r)) {
                var a;
                let e, s, l = (a = r, (s = (e = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.ref : (s = (e = Object.getOwnPropertyDescriptor(a, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? a.props.ref : a.props.ref || a.ref),
                    c = function(e, t) {
                        let r = { ...t
                        };
                        for (let n in t) {
                            let a = e[n],
                                s = t[n];
                            /^on[A-Z]/.test(n) ? a && s ? r[n] = (...e) => {
                                let t = s(...e);
                                return a(...e), t
                            } : a && (r[n] = a) : "style" === n ? r[n] = { ...a,
                                ...s
                            } : "className" === n && (r[n] = [a, s].filter(Boolean).join(" "))
                        }
                        return { ...e,
                            ...r
                        }
                    }(n, r.props);
                return r.type !== i.Fragment && (c.ref = t ? (0, o.composeRefs)(t, l) : l), i.cloneElement(r, c)
            }
            return i.Children.count(r) > 1 ? i.Children.only(null) : null
        })).displayName = "Slot.SlotClone", t = s, (r = i.forwardRef((e, r) => {
            let {
                children: n,
                ...a
            } = e;
            d(n) && "function" == typeof u && (n = u(n._payload));
            let s = i.Children.toArray(n),
                o = s.find(f);
            if (o) {
                let e = o.props.children,
                    n = s.map(t => t !== o ? t : i.Children.count(e) > 1 ? i.Children.only(null) : i.isValidElement(e) ? e.props.children : null);
                return (0, l.jsx)(t, { ...a,
                    ref: r,
                    children: i.isValidElement(e) ? i.cloneElement(e, void 0, n) : null
                })
            }
            return (0, l.jsx)(t, { ...a,
                ref: r,
                children: n
            })
        })).displayName = "Slot.Slot", r),
        p = Symbol("radix.slottable");

    function f(e) {
        return i.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === p
    }
    var h = e.i(7284);
    let x = e => "boolean" == typeof e ? `${e}` : 0 === e ? "0" : e,
        g = h.clsx;
    var v = e.i(75157);
    let b = (n = "active:scale-95 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", a = {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/20",
                secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline"
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }, e => {
        var t;
        if ((null == a ? void 0 : a.variants) == null) return g(n, null == e ? void 0 : e.class, null == e ? void 0 : e.className);
        let {
            variants: r,
            defaultVariants: s
        } = a, l = Object.keys(r).map(t => {
            let n = null == e ? void 0 : e[t],
                a = null == s ? void 0 : s[t];
            if (null === n) return null;
            let l = x(n) || x(a);
            return r[t][l]
        }), i = e && Object.entries(e).reduce((e, t) => {
            let [r, n] = t;
            return void 0 === n || (e[r] = n), e
        }, {});
        return g(n, l, null == a || null == (t = a.compoundVariants) ? void 0 : t.reduce((e, t) => {
            let {
                class: r,
                className: n,
                ...a
            } = t;
            return Object.entries(a).every(e => {
                let [t, r] = e;
                return Array.isArray(r) ? r.includes({ ...s,
                    ...i
                }[t]) : ({ ...s,
                    ...i
                })[t] === r
            }) ? [...e, r, n] : e
        }, []), null == e ? void 0 : e.class, null == e ? void 0 : e.className)
    });

    function y({
        className: e,
        variant: t,
        size: r,
        asChild: n = !1,
        ...a
    }) {
        return (0, l.jsx)(n ? m : "button", {
            "data-slot": "button",
            className: (0, v.cn)(b({
                variant: t,
                size: r,
                className: e
            })),
            ...a
        })
    }
    e.s(["Button", () => y], 19455)
}, 24623, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(778),
        n = e.i(13622),
        a = e.i(69742),
        s = e.i(50919);
    let l = ({
        children: e
    }) => {
        let [t, n] = (0, r.useState)(!1);
        if ((0, r.useEffect)(() => n(!0), []), t) return (0, s.createPortal)(e, document.body)
    };
    var i = e.i(56594),
        o = e.i(78350),
        c = e.i(59625),
        u = function() {
            return (u = Object.assign || function(e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var a in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }).apply(this, arguments)
        },
        d = function(e, t) {
            var r = {};
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++) 0 > t.indexOf(n[a]) && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
            return r
        },
        m = (0, c.createAnimation)("BeatLoader", "50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}", "beat");
    let p = function(e) {
        var t = e.loading,
            n = e.color,
            a = void 0 === n ? "#000000" : n,
            s = e.speedMultiplier,
            l = void 0 === s ? 1 : s,
            i = e.cssOverride,
            c = e.size,
            p = void 0 === c ? 15 : c,
            f = e.margin,
            h = void 0 === f ? 2 : f,
            x = d(e, ["loading", "color", "speedMultiplier", "cssOverride", "size", "margin"]),
            g = u({
                display: "inherit"
            }, void 0 === i ? {} : i),
            v = function(e) {
                return {
                    display: "inline-block",
                    backgroundColor: a,
                    width: (0, o.cssValue)(p),
                    height: (0, o.cssValue)(p),
                    margin: (0, o.cssValue)(h),
                    borderRadius: "100%",
                    animation: "".concat(m, " ").concat(.7 / l, "s ").concat(e % 2 ? "0s" : "".concat(.35 / l, "s"), " infinite linear"),
                    animationFillMode: "both"
                }
            };
        return void 0 === t || t ? r.createElement("span", u({
            style: g
        }, x), r.createElement("span", {
            style: v(1)
        }), r.createElement("span", {
            style: v(2)
        }), r.createElement("span", {
            style: v(3)
        })) : null
    };
    var f = e.i(23393),
        h = e.i(45994),
        x = e.i(46798),
        g = e.i(19455),
        v = e.i(55774),
        b = e.i(8331);
    let y = (0, e.i(98631).default)("square-arrow-out-up-right", [
            ["path", {
                d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6",
                key: "y09zxi"
            }],
            ["path", {
                d: "m21 3-9 9",
                key: "mpx6sq"
            }],
            ["path", {
                d: "M15 3h6v6",
                key: "1q9fwt"
            }]
        ]),
        j = (0, r.memo)(({
            children: e,
            className: r = "",
            colors: n = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
            speed: a = 1
        }) => {
            let s = {
                backgroundImage: `linear-gradient(135deg, ${n.join(", ")}, ${n[0]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animationDuration: `${10/a}s`
            };
            return (0, t.jsxs)("span", {
                className: `relative inline-block ${r}`,
                children: [(0, t.jsx)("span", {
                    className: "sr-only",
                    children: e
                }), (0, t.jsx)("span", {
                    className: "relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent",
                    style: s,
                    "aria-hidden": "true",
                    children: e
                })]
            })
        });
    j.displayName = "AuroraText", e.s(["default", 0, ({
        profile: e,
        hide: s,
        visible: o,
        profileError: c = !1,
        loadingProfile: P = !1
    }) => {
        (0, r.useEffect)(() => {
            o ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "auto"
        }, [o]);
        let u = e => {
                e.stopPropagation(), s()
            },
            d = (0, f.getPlayerAchievement)(e?.points);
        if (c) return;
        let m = (0, f.getAchievementImgUrl)(d?.title),
            w = `/placements/${e?.overall&&e.overall<4?e.overall+"-shimmer.svg":"other.svg"}`,
            k = `var(--placement-${e?.overall&&e.overall<=3?e.overall:"other"})`,
            N = (0, f.getAchievementColor)(d?.title);
        return (0, t.jsx)(l, {
            children: (0, t.jsx)(n.AnimatePresence, {
                children: o && (0, t.jsx)(a.motion.div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "fixed inset-0 flex items-center justify-center p-2 bg-black/80 z-50",
                    onClick: u,
                    transition: {
                        duration: .15
                    },
                    children: (0, t.jsxs)(a.motion.div, {
                        initial: {
                            opacity: 0,
                            y: -5
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            scale: .9
                        },
                        className: "max-w-lg w-full rounded-3xl h-fit px-10 py-8 bg-card cursor-default",
                        onClick: e => e.stopPropagation(),
                        transition: {
                            duration: .2
                        },
                        children: [(0, t.jsx)(g.Button, {
                            onClick: u,
                            className: "size-12 rounded-full float-right",
                            size: "icon",
                            variant: "secondary",
                            children: (0, t.jsx)(i.BiX, {
                                fill: "#B4BDC7",
                                className: "!size-10"
                            })
                        }), (0, t.jsx)("section", {
                            className: "w-full h-fit text-center py-2 flex items-center justify-center flex-col space-y-4",
                            children: e ? (0, t.jsxs)(t.Fragment, {
                                children: [(0, t.jsx)("span", {
                                    className: "m-auto size-28 overflow-clip border-2 border-[var(--frame-color)] bg-slate-800 rounded-full flex items-center justify-center pt-3.5",
                                    style: {
                                        borderColor: k
                                    },
                                    children: (0, t.jsx)(v.default, {
                                        uuid: e.uuid,
                                        width: 95,
                                        height: 95,
                                        alt: `${e.name}'s Skin`
                                    })
                                }), (0, t.jsx)("h1", {
                                    className: "text-3xl font-bold !bg-clip-text text-slate-300",
                                    children: e.pvpclub ? (0, t.jsx)(j, {
                                        colors: [`rgb(${e.pvpclub.color_one.map(e=>e).join(",")})`, `rgb(${e.pvpclub[e.pvpclub.color_two?"color_two":"color_one"]?.map(e=>e).join(",")})`],
                                        children: e?.name
                                    }) : e?.name
                                }), (0, t.jsxs)(x.Tooltip, {
                                    children: [(0, t.jsx)(x.TooltipTrigger, {
                                        children: (0, t.jsxs)("h2", {
                                            className: "flex gap-2 items-center justify-center text-muted font-medium text-lg px-3 py-1 rounded-full cursor-default",
                                            style: N,
                                            children: [(0, t.jsx)("img", {
                                                src: m,
                                                width: 30,
                                                height: 30,
                                                alt: "Achievement Icon"
                                            }), d?.title]
                                        })
                                    }), (0, t.jsxs)(x.TooltipContent, {
                                        children: [(0, t.jsx)("h1", {
                                            className: "text-2xl font-bold",
                                            children: `${d?.title}`
                                        }), (0, t.jsx)("h2", {
                                            children: d?.reqString?? ""
                                        })]
                                    })]
                                }), (0, t.jsx)("h3", {
                                    className: "text-xl font-bold text-muted",
                                    children: (0, f.regionFormatter)(e?.region?.toUpperCase?.() ?? "")
                                }), (0, t.jsxs)(b.default, {
                                    className: "bg-secondary rounded-xl text-sm flex items-center p-2 gap-2 hover:bg-secondary/90 text-muted-foreground hover:text-secondary-foreground duration-100",
                                    href: `https://namemc.com/profile/${e.uuid}`,
                                    target: "_blank",
                                    children: [(0, t.jsx)("span", {
                                        className: "pr-1 flex items-center justify-center border-r-2 border-muted",
                                        children: (0, t.jsx)("img", {
                                            src: "https://pt.minecraft.wiki/images/NameMC.png?f63c3",
                                            height: 20,
                                            width: 20,
                                            alt: "NameMC",
                                            className: "object-contain rounded-sm"
                                        })
                                    }), (0, t.jsxs)("span", {
                                        className: "flex gap-1 items-center",
                                        children: ["NameMC", (0, t.jsx)(y, {
                                            size: 12
                                        })]
                                    })]
                                })]
                            }) : (0, t.jsxs)("span", {
                                className: "w-full flex items-center justify-center flex-col space-y-4",
                                children: [(0, t.jsx)("span", {
                                    className: "bg-slate-500/20 rounded-md animate-pulse block w-32 h-10"
                                }), (0, t.jsx)("span", {
                                    className: "bg-slate-500/20 rounded-md animate-pulse block w-24 h-8"
                                })]
                            })
                        }), (0, t.jsx)("section", {
                            className: "w-full h-fit space-y-6",
                            children: e && !P ? (0, t.jsxs)(t.Fragment, {
                                children: [(0, t.jsxs)("motion.div", {
                                    className: "w-full space-y-2",
                                    children: [(0, t.jsx)("h2", {
                                        className: "text-2xl text-muted-foreground font-medium",
                                        children: "POSITION"
                                    }), (0, t.jsxs)("div", {
                                        className: "h-12 profile-box_styles",
                                        children: [(0, t.jsxs)("div", {
                                            className: `${e.overall>9999?"w-40":e.overall>99?"w-32":"w-24"} h-full flex p-2 items-center relative truncate`,
                                            children: [(0, t.jsx)("img", {
                                                src: w,
                                                className: "absolute inset-0 size-full",
                                                alt: "shimmer"
                                            }), (0, t.jsx)("strong", {
                                                className: "w-full font-bold text-4xl max-sm:text-3xl italic absolute truncate drop-shadow-[0px_3px_1px_#232323]",
                                                children: (0, t.jsxs)(x.Tooltip, {
                                                    children: [(0, t.jsxs)(x.TooltipTrigger, {
                                                        children: [e.overall, "."]
                                                    }), (0, t.jsxs)(x.TooltipContent, {
                                                        side: "right",
                                                        children: [(0, t.jsx)("h1", {
                                                            className: "text-3xl font-bold",
                                                            children: `#${e.overall}`
                                                        }), (0, t.jsx)("h2", {
                                                            children: "Overall placement"
                                                        })]
                                                    })]
                                                })
                                            })]
                                        }), (0, t.jsxs)("div", {
                                            className: "flex gap-2 items-center",
                                            children: [(0, t.jsx)("img", {
                                                src: "/tier_icons/overall.svg",
                                                width: 26,
                                                height: 26,
                                                alt: "Overall"
                                            }), (0, t.jsx)("strong", {
                                                className: "text-2xl max-sm:text-xl",
                                                children: "OVERALL"
                                            }), (0, t.jsxs)("span", {
                                                className: "text-xl text-slate-400 font-medium max-sm:text-sm",
                                                children: ["(", e?.points, " points)"]
                                            })]
                                        })]
                                    })]
                                }), (0, t.jsxs)("div", {
                                    className: "w-full h-fit space-y-2",
                                    children: [(0, t.jsx)("h2", {
                                        className: "text-2xl text-muted-foreground font-medium",
                                        children: "TIERS"
                                    }), (0, t.jsx)("div", {
                                        className: "profile-box_styles p-2",
                                        children: (0, t.jsx)(h.default, {
                                            dynamicColors: !0,
                                            rankings: e.rankings,
                                            withTooltip: !0
                                        })
                                    })]
                                })]
                            }) : (0, t.jsx)("div", {
                                className: "w-full h-fit flex items-center justify-center",
                                children: (0, t.jsx)(p, {
                                    color: "white"
                                })
                            })
                        })]
                    })
                })
            })
        })
    }], 24623)
}, 97076, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(56594),
        n = e.i(24623),
        a = e.i(47800),
        s = e.i(23393),
        l = e.i(778),
        i = e.i(54219);
    e.s(["default", 0, () => {
        let {
            profile: e,
            searchVal: o,
            searchError: c,
            profileExists: u,
            handleSearch: d,
            setProfile: m,
            setSearchVal: p,
            setFocused: f
        } = (() => {
            let [e, t] = (0, l.useState)(""), [r, n] = (0, l.useState)(!1), [o, c] = (0, l.useState)(!1), [u, d] = (0, l.useState)(null), [m, p] = (0, l.useState)(!1);
            (0, l.useEffect)(() => {
                let e = document?.getElementById("search-player-input");
                o && e?.blur()
            }, [o]), (0, l.useEffect)(() => {
                let e = e => {
                    if (e.key === a.kb_shortcuts.search.key) {
                        e.preventDefault(), p(!0);
                        let t = document?.getElementById("search-player-input");
                        setTimeout(() => {
                            t?.focus()
                        }, 0)
                    }
                };
                return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e)
            });
            let f = !!u,
                h = async () => {
                    if (u) try {
                        let e = await (0, s.fetchPvPClub)(u.uuid);
                        d({ ...u,
                            pvpclub: e
                        })
                    } catch (e) {
                        console.error(e), d({ ...u,
                            pvpclub: null
                        })
                    } finally {
                        c(!1)
                    }
                };
            (0, l.useEffect)(() => {
                f && h()
            }, [f]);
            let x = e.length < 3 || e.length > 16;
            return {
                searchVal: e,
                searchError: r,
                searching: o,
                profile: u,
                profileExists: f,
                buttonDisabled: x,
                resetVal: () => t(""),
                handleSearch: () => {
                    o || ((0, i.toast)("Searching Player..", {
                        description: `Searching for ${e}`,
                        closeButton: !0,
                        position: "top-center"
                    }), c(!0), n(!1), (0, s.searchForPlayer)(e).then(e => {
                        if (!e?.uuid) throw new Error("Player not found");
                        d(e), c(!1), t("")
                    }).catch(() => {
                        n(!0), i.toast.error("Player Not Found", {
                            description: `Unable to find player by the name of ${e}`,
                            closeButton: !0,
                            position: "top-center"
                        }), setTimeout(() => {
                            n(!1)
                        }, 1500)
                    }).finally(() => {
                        t(""), c(!1)
                    }))
                },
                setProfile: d,
                setSearchVal: t,
                focused: m,
                setFocused: p
            }
        })();
        return (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsxs)("span", {
                className: "bg-input/40 text-muted-foreground rounded-full flex gap-2 items-center relative ml-auto h-10 px-2",
                children: [(0, t.jsx)(r.BiSearch, {
                    size: 28
                }), (0, t.jsx)("input", {
                    id: "search-player-input",
                    onKeyDown: e => "Enter" === e.key && d(),
                    onFocus: () => f(!0),
                    onBlur: () => f(!1),
                    value: o,
                    onChange: e => p(e.target.value),
                    placeholder: "Search player...",
                    className: "outline-none border-none max-w-52 w-full"
                }), (0, t.jsx)("kbd", {
                    className: "bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs max-md:hidden",
                    children: a.kb_shortcuts.search.key
                })]
            }), (0, t.jsx)(n.default, {
                visible: u,
                profile: e,
                profileError: c,
                hide: () => m(null)
            })]
        })
    }], 97076)
}]);