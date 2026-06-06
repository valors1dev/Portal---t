(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 23393, e => {
    "use strict";
    var r = e.i(47800);
    async function t(e) {
        let r = "/api/v2";
        return void 0 === r && (r = "/api/v2/", console.warn(`NEXT_PUBLIC_API_ROOT undefined, defaulting to ${r}`)), r.endsWith("/") || (r += "/"), fetch(`${r}${e}`).then(async e => {
            const t = await e.json();
            if (!e.ok) throw Object.assign(new Error(t?.error || "Request failed"), {
                status: e.status,
                data: t
            });
            return t
        }).catch(e => {
            throw console.error(e), e
        })
    }
    async function n(e, r, n) {
        return t(`mode/${e}?from=${r}&count=${n}`)
    }
    async function o(e, r) {
        return t(`mode/overall?from=${e}&count=${r}`)
    }
    async function a(e) {
        return t(`profile/${e}`)
    }
    async function i() {
        return t("mode/list")
    }
    async function s(e) {
        return t(e.length > 16 ? `profile/${e.split("-").join("")}` : `profile/by-name/${e}`)
    }

    function l(e) {
        if (!e) return 0;
        let t = e.peak_tier?? e.tier,
            n = e.peak_pos?? e.pos;
        return r.points[t][0 === n ? "high" : "low"]
    }
    let c = async e => {
        try {
            let r = await fetch(`https://api.portalnetwork.fun/v1/customname?uuid=${e}`, {
                headers: {
                    Authorization: "Bearer 213328a68ef847e4882c70aaf9146e741789535ea6384063a5b3baa0f0e356aa"
                }
            });
            if (!r.ok) return console.error("Bad Response:", r.status, await r.text()), null;
            return await r.json()
        } catch (e) {
            return console.error(e), null
        }
    };
    e.s(["calculateGamemodePoints", () => l, "fetchGamemodeInfo", () => i, "fetchGamemodePlayers", () => n, "fetchOverall", () => o, "fetchProfileData", () => a, "fetchPvPClub", 0, c, "getAchievementColor", 0, e => {
        switch (e) {
            case "Combat Grandmaster":
                return {
                    color: r.TITLES.grand_master.colors.fg,
                    background: r.TITLES.grand_master.colors.bg
                };
            case "Combat Master":
                return {
                    color: r.TITLES.master.colors.fg,
                    background: r.TITLES.master.colors.bg
                };
            case "Combat Ace":
                return {
                    color: r.TITLES.ace.colors.fg,
                    background: r.TITLES.ace.colors.bg
                };
            case "Combat Specialist":
                return {
                    color: r.TITLES.specialist.colors.fg,
                    background: r.TITLES.specialist.colors.bg
                };
            case "Combat Cadet":
                return {
                    color: r.TITLES.cadet.colors.fg,
                    background: r.TITLES.cadet.colors.bg
                };
            case "Combat Novice":
                return {
                    color: r.TITLES.novice.colors.fg,
                    background: r.TITLES.novice.colors.bg
                };
            default:
                return {
                    color: r.TITLES.rookie.colors.fg,
                    background: r.TITLES.rookie.colors.bg
                }
        }
    }, "getAchievementImgUrl", 0, e => {
        let r = "Combat Grandmaster" === e || "Combat Master" === e || "Combat Ace" === e ? "webp" : "svg";
        return `/titles/${e?.split(" ").join("_").toLowerCase()}.${r}`
    }, "getPlayerAchievement", 0, e => {
        if (null == e) return null;
        if (e >= 400) return r.TITLES.grand_master;
        if (e >= 250) return r.TITLES.master;
        if (e >= 100) return r.TITLES.ace;
        if (e >= 50) return r.TITLES.specialist;
        if (e >= 20) return r.TITLES.cadet;
        else if (e >= 10) return r.TITLES.novice;
        else if (e >= 1) return r.TITLES.rookie;
        else return r.TITLES.unranked
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
    }, "searchForPlayer", () => s, "showPeakTier", 0, e => e?.peak_tier && e?.peak_pos && !e.retired && (e.peak_tier < e.tier || e.peak_tier === e.tier && e.peak_pos < e.pos), "sortedModes", 0, e => Object.entries(e?? {}).sort(([e, t], [n, o]) => {
        if (t.retired !== o.retired) return t.retired ? 1 : -1;
        if (t.tier !== o.tier) return t.tier - o.tier;
        if (t.pos !== o.pos) return t.pos - o.pos;
        let a = l(o) - l(t);
        return 0 !== a ? a : r.gamemodeNames.indexOf(e) - r.gamemodeNames.indexOf(n)
    }), "stripGamemodePathname", 0, e => e.split("/rankings")[1].split("/").join("")])
}, 19455, e => {
    "use strict";
    let r, t, n, o, a;
    var i = e.i(80506),
        s = e.i(778),
        l = e.i(44977),
        c = Symbol.for("react.lazy"),
        u = s[" use ".trim().toString()];

    function d(e) {
        var r;
        return null != e && "object" == typeof e && "$$typeof" in e && e.$$typeof === c && "_payload" in e && "object" == typeof(r = e._payload) && null !== r && "then" in r
    }
    var f = ((a = s.forwardRef((e, r) => {
            let {
                children: t,
                ...n
            } = e;
            if (d(t) && "function" == typeof u && (t = u(t._payload)), s.isValidElement(t)) {
                var o;
                let e, a, i = (o = t, (a = (e = Object.getOwnPropertyDescriptor(o.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? o.ref : (a = (e = Object.getOwnPropertyDescriptor(o, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? o.props.ref : o.props.ref || o.ref),
                    c = function(e, r) {
                        let t = { ...r
                        };
                        for (let n in r) {
                            let o = e[n],
                                a = r[n];
                            /^on[A-Z]/.test(n) ? o && a ? t[n] = (...e) => {
                                let r = a(...e);
                                return o(...e), r
                            } : o && (t[n] = o) : "style" === n ? t[n] = { ...o,
                                ...a
                            } : "className" === n && (t[n] = [o, a].filter(Boolean).join(" "))
                        }
                        return { ...e,
                            ...t
                        }
                    }(n, t.props);
                return t.type !== s.Fragment && (c.ref = r ? (0, l.composeRefs)(r, i) : i), s.cloneElement(t, c)
            }
            return s.Children.count(t) > 1 ? s.Children.only(null) : null
        })).displayName = "Slot.SlotClone", r = a, (t = s.forwardRef((e, t) => {
            let {
                children: n,
                ...o
            } = e;
            d(n) && "function" == typeof u && (n = u(n._payload));
            let a = s.Children.toArray(n),
                l = a.find(m);
            if (l) {
                let e = l.props.children,
                    n = a.map(r => r !== l ? r : s.Children.count(e) > 1 ? s.Children.only(null) : s.isValidElement(e) ? e.props.children : null);
                return (0, i.jsx)(r, { ...o,
                    ref: t,
                    children: s.isValidElement(e) ? s.cloneElement(e, void 0, n) : null
                })
            }
            return (0, i.jsx)(r, { ...o,
                ref: t,
                children: n
            })
        })).displayName = "Slot.Slot", t),
        p = Symbol("radix.slottable");

    function m(e) {
        return s.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === p
    }
    var g = e.i(7284);
    let v = e => "boolean" == typeof e ? `${e}` : 0 === e ? "0" : e,
        b = g.clsx;
    var h = e.i(75157);
    let y = (n = "active:scale-95 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", o = {
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
        var r;
        if ((null == o ? void 0 : o.variants) == null) return b(n, null == e ? void 0 : e.class, null == e ? void 0 : e.className);
        let {
            variants: t,
            defaultVariants: a
        } = o, i = Object.keys(t).map(r => {
            let n = null == e ? void 0 : e[r],
                o = null == a ? void 0 : a[r];
            if (null === n) return null;
            let i = v(n) || v(o);
            return t[r][i]
        }), s = e && Object.entries(e).reduce((e, r) => {
            let [t, n] = r;
            return void 0 === n || (e[t] = n), e
        }, {});
        return b(n, i, null == o || null == (r = o.compoundVariants) ? void 0 : r.reduce((e, r) => {
            let {
                class: t,
                className: n,
                ...o
            } = r;
            return Object.entries(o).every(e => {
                let [r, t] = e;
                return Array.isArray(t) ? t.includes({ ...a,
                    ...s
                }[r]) : ({ ...a,
                    ...s
                })[r] === t
            }) ? [...e, t, n] : e
        }, []), null == e ? void 0 : e.class, null == e ? void 0 : e.className)
    });

    function T({
        className: e,
        variant: r,
        size: t,
        asChild: n = !1,
        ...o
    }) {
        return (0, i.jsx)(n ? f : "button", {
            "data-slot": "button",
            className: (0, h.cn)(y({
                variant: r,
                size: t,
                className: e
            })),
            ...o
        })
    }
    e.s(["Button", () => T], 19455)
}]);