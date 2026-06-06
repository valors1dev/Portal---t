(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 55774, e => {
    "use strict";
    var t = e.i(80506);
    e.s(["default", 0, ({
        uuid: e,
        loading: r,
        alt: s,
        width: l,
        height: a,
        ...i
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
        width: l || 16,
        height: a || 16,
        loading: r || "eager",
        alt: s,
        ...i
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
            var r, s = (e.match(/^[0-9.]*/) || "").toString();
            r = s.includes(".") ? parseFloat(s) : parseInt(s, 10);
            var l = (e.match(/[^0-9]*$/) || "").toString();
            return t[l] ? {
                value: r,
                unit: l
            } : (console.warn("React Spinners: ".concat(e, " is not a valid css value. Defaulting to ").concat(r, "px.")), {
                value: r,
                unit: "px"
            })
        }(e);
        return "".concat(r.value).concat(r.unit)
    }
    e.s(["cssValue", () => r], 78350);
    var s = function(e, t, r) {
        var s = "react-spinners-".concat(e, "-").concat(r);
        if ("undefined" == typeof window || !window.document) return s;
        var l = document.createElement("style");
        document.head.appendChild(l);
        var a = l.sheet,
            i = "\n    @keyframes ".concat(s, " {\n      ").concat(t, "\n    }\n  ");
        return a && a.insertRule(i, 0), s
    };
    e.s(["createAnimation", () => s], 59625)
}, 98631, e => {
    "use strict";
    var t = e.i(778);
    let r = e => {
            let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, r) => r ? r.toUpperCase() : t.toLowerCase());
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        s = (...e) => e.filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t).join(" ").trim();
    var l = {
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
    let a = (0, t.forwardRef)(({
            color: e = "currentColor",
            size: r = 24,
            strokeWidth: a = 2,
            absoluteStrokeWidth: i,
            className: n = "",
            children: o,
            iconNode: c,
            ...d
        }, u) => (0, t.createElement)("svg", {
            ref: u,
            ...l,
            width: r,
            height: r,
            stroke: e,
            strokeWidth: i ? 24 * Number(a) / Number(r) : a,
            className: s("lucide", n),
            ...!o && !(e => {
                for (let t in e)
                    if (t.startsWith("aria-") || "role" === t || "title" === t) return !0
            })(d) && {
                "aria-hidden": "true"
            },
            ...d
        }, [...c.map(([e, r]) => (0, t.createElement)(e, r)), ...Array.isArray(o) ? o : [o]])),
        i = (e, l) => {
            let i = (0, t.forwardRef)(({
                className: i,
                ...n
            }, o) => (0, t.createElement)(a, {
                ref: o,
                iconNode: l,
                className: s(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, `lucide-${e}`, i),
                ...n
            }));
            return i.displayName = r(e), i
        };
    e.s(["default", () => i], 98631)
}, 45994, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(23393),
        s = e.i(7284),
        l = e.i(23191);

    function a(...e) {
        return (0, l.twMerge)((0, s.clsx)(e))
    }
    var i = e.i(47800),
        n = e.i(46798);
    let o = ({
        name: e,
        ranking: r,
        dynamicColors: s,
        slotStyles: l
    }) => {
        let i = s ? r.retired ? "var(--placement-other)" : `var(--${0===r.pos?"h":"l"}t${r.tier})` : "#000",
            n = s ? `var(--${0===r.pos?"h":"l"}t${r.tier}-foreground)` : "#000";
        return (0, t.jsxs)("span", {
            className: a("w-10 h-14 relative flex flex-col items-center", l?? ""),
            children: [(0, t.jsx)("span", {
                className: "size-8 bg-black/50 rounded-full flex items-center justify-center overflow-clip border-2 p-1",
                style: {
                    borderColor: i
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
                    background: i,
                    color: n
                },
                children: [r?.pos === 0 ? "HT" : "LT", r?.tier]
            })]
        })
    };
    e.s(["default", 0, ({
        rankings: e,
        slotStyles: s,
        dynamicColors: l = !1,
        withTooltip: c = !1,
        loading: d,
        tooltipSide: u = "top"
    }) => {
        let m = Object.entries(e).sort(([e, t], [s, l]) => {
                if (t.retired !== l.retired) return t.retired ? 1 : -1;
                if (t.tier !== l.tier) return t.tier - l.tier;
                if (t.pos !== l.pos) return t.pos - l.pos;
                let a = (0, r.calculateGamemodePoints)(l) - (0, r.calculateGamemodePoints)(t);
                return 0 !== a ? a : i.gamemodeNames.indexOf(e) - i.gamemodeNames.indexOf(s)
            }),
            p = e => 0 === e ? "H" : "L";
        return [...Array(8)].map((e, i) => {
            if (d) return (0, t.jsxs)("span", {
                className: "w-10 h-14 relative flex flex-col items-center",
                children: [(0, t.jsx)("span", {
                    className: "size-8 bg-[var(--layout-item-outline)] animate-pulse rounded-full flex items-center justify-center overflow-clip p-1"
                }), (0, t.jsx)("span", {
                    className: "absolute bottom-1 left-2/4 bg-[var(--layout-item-outline)] animate-pulse -translate-x-2/4 text-[14px] px-1 rounded-lg w-9 h-6 text-center"
                })]
            }, i);
            if (!(i < m.length)) return (0, t.jsxs)("span", {
                className: a("w-10 h-14 flex flex-col items-center relative", s?? ""),
                "aria-hidden": !0,
                children: [(0, t.jsx)("span", {
                    className: "size-8 bg-black/20 rounded-full flex items-center justify-center overflow-clip border-2 border-slate-500/50 border-dashed p-1"
                }), (0, t.jsx)("span", {
                    className: "absolute bottom-0.5 left-2/4 -translate-x-2/4 rounded-lg w-9 flex h-6 bg-slate-500/10 backdrop-blur-sm text-center text-muted-foreground text-sm items-center justify-center",
                    children: "-"
                })]
            }, i); {
                let [e, a] = m[i], d = (e => {
                    if (e)
                        if (e.retired) return `Retired ${p(e.pos)}T${e.tier}`;
                        else {
                            if (null === e.peak_tier || null === e.peak_pos) return `${p(e.pos)}T${e.tier}`;
                            return null !== e && null !== e.peak_tier && null !== e.peak_pos && (e.peak_tier < e.tier || e.peak_tier === e.tier && e.peak_pos < e.pos) ? `Peak ${p(e.peak_pos)}T${e.peak_tier}` : `${p(e.pos)}T${e.tier}`
                        }
                })(a);
                return c ? (0, t.jsxs)(n.Tooltip, {
                    children: [(0, t.jsx)(n.TooltipTrigger, {
                        children: (0, t.jsx)(o, {
                            name: e,
                            ranking: a,
                            dynamicColors: l,
                            slotStyles: s
                        })
                    }), (0, t.jsxs)(n.TooltipContent, {
                        side: u,
                        children: [(0, t.jsx)("h1", {
                            className: "text-2xl font-bold",
                            children: d
                        }), (0, t.jsx)("h2", {
                            className: "text-muted-foreground",
                            children: `${(0,r.calculateGamemodePoints)(a)} points`
                        })]
                    })]
                }, i) : (0, t.jsx)(o, {
                    name: e,
                    ranking: a,
                    dynamicColors: l,
                    slotStyles: s
                }, i)
            }
        })
    }], 45994)
}, 24623, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(778),
        s = e.i(13622),
        l = e.i(69742),
        a = e.i(50919);
    let i = ({
        children: e
    }) => {
        let [t, s] = (0, r.useState)(!1);
        if ((0, r.useEffect)(() => s(!0), []), t) return (0, a.createPortal)(e, document.body)
    };
    var n = e.i(56594),
        o = e.i(78350),
        c = e.i(59625),
        d = function() {
            return (d = Object.assign || function(e) {
                for (var t, r = 1, s = arguments.length; r < s; r++)
                    for (var l in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, l) && (e[l] = t[l]);
                return e
            }).apply(this, arguments)
        },
        u = function(e, t) {
            var r = {};
            for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && 0 > t.indexOf(s) && (r[s] = e[s]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var l = 0, s = Object.getOwnPropertySymbols(e); l < s.length; l++) 0 > t.indexOf(s[l]) && Object.prototype.propertyIsEnumerable.call(e, s[l]) && (r[s[l]] = e[s[l]]);
            return r
        },
        m = (0, c.createAnimation)("BeatLoader", "50% {transform: scale(0.75);opacity: 0.2} 100% {transform: scale(1);opacity: 1}", "beat");
    let p = function(e) {
        var t = e.loading,
            s = e.color,
            l = void 0 === s ? "#000000" : s,
            a = e.speedMultiplier,
            i = void 0 === a ? 1 : a,
            n = e.cssOverride,
            c = e.size,
            p = void 0 === c ? 15 : c,
            x = e.margin,
            f = void 0 === x ? 2 : x,
            h = u(e, ["loading", "color", "speedMultiplier", "cssOverride", "size", "margin"]),
            g = d({
                display: "inherit"
            }, void 0 === n ? {} : n),
            v = function(e) {
                return {
                    display: "inline-block",
                    backgroundColor: l,
                    width: (0, o.cssValue)(p),
                    height: (0, o.cssValue)(p),
                    margin: (0, o.cssValue)(f),
                    borderRadius: "100%",
                    animation: "".concat(m, " ").concat(.7 / i, "s ").concat(e % 2 ? "0s" : "".concat(.35 / i, "s"), " infinite linear"),
                    animationFillMode: "both"
                }
            };
        return void 0 === t || t ? r.createElement("span", d({
            style: g
        }, h), r.createElement("span", {
            style: v(1)
        }), r.createElement("span", {
            style: v(2)
        }), r.createElement("span", {
            style: v(3)
        })) : null
    };
    var x = e.i(23393),
        f = e.i(45994),
        h = e.i(46798),
        g = e.i(19455),
        v = e.i(55774),
        j = e.i(8331);
    let b = (0, e.i(98631).default)("square-arrow-out-up-right", [
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
        y = (0, r.memo)(({
            children: e,
            className: r = "",
            colors: s = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
            speed: l = 1
        }) => {
            let a = {
                backgroundImage: `linear-gradient(135deg, ${s.join(", ")}, ${s[0]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animationDuration: `${10/l}s`
            };
            return (0, t.jsxs)("span", {
                className: `relative inline-block ${r}`,
                children: [(0, t.jsx)("span", {
                    className: "sr-only",
                    children: e
                }), (0, t.jsx)("span", {
                    className: "relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent",
                    style: a,
                    "aria-hidden": "true",
                    children: e
                })]
            })
        });
    y.displayName = "AuroraText", e.s(["default", 0, ({
        profile: e,
        hide: a,
        visible: o,
        profileError: c = !1,
        loadingProfile: P = !1
    }) => {
        (0, r.useEffect)(() => {
            o ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "auto"
        }, [o]);
        let d = e => {
                e.stopPropagation(), a()
            },
            u = (0, x.getPlayerAchievement)(e?.points);
        if (c) return;
        let m = (0, x.getAchievementImgUrl)(u?.title),
            w = `/placements/${e?.overall&&e.overall<4?e.overall+"-shimmer.svg":"other.svg"}`,
            N = `var(--placement-${e?.overall&&e.overall<=3?e.overall:"other"})`,
            k = (0, x.getAchievementColor)(u?.title);
        return (0, t.jsx)(i, {
            children: (0, t.jsx)(s.AnimatePresence, {
                children: o && (0, t.jsx)(l.motion.div, {
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
                    onClick: d,
                    transition: {
                        duration: .15
                    },
                    children: (0, t.jsxs)(l.motion.div, {
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
                            onClick: d,
                            className: "size-12 rounded-full float-right",
                            size: "icon",
                            variant: "secondary",
                            children: (0, t.jsx)(n.BiX, {
                                fill: "#B4BDC7",
                                className: "!size-10"
                            })
                        }), (0, t.jsx)("section", {
                            className: "w-full h-fit text-center py-2 flex items-center justify-center flex-col space-y-4",
                            children: e && !P ? (0, t.jsxs)(t.Fragment, {
                                children: [(0, t.jsx)("span", {
                                    className: "m-auto size-28 overflow-clip border-2 border-[var(--frame-color)] bg-slate-800 rounded-full flex items-center justify-center pt-3.5",
                                    style: {
                                        borderColor: N
                                    },
                                    children: (0, t.jsx)(v.default, {
                                        uuid: e.uuid,
                                        width: 95,
                                        height: 95,
                                        alt: `${e.name}'s Skin`
                                    })
                                }), (0, t.jsx)("h1", {
                                    className: "text-3xl font-bold !bg-clip-text text-slate-300",
                                    children: e.pvpclub ? (0, t.jsx)(y, {
                                        colors: [`rgb(${e.pvpclub.color_one.map(e=>e).join(",")})`, `rgb(${e.pvpclub[e.pvpclub.color_two?"color_two":"color_one"]?.map(e=>e).join(",")})`],
                                        children: e?.name
                                    }) : e?.name
                                }), (0, t.jsxs)(h.Tooltip, {
                                    children: [(0, t.jsx)(h.TooltipTrigger, {
                                        children: (0, t.jsxs)("h2", {
                                            className: "flex gap-2 items-center justify-center text-muted font-medium text-lg px-3 py-1 rounded-full cursor-default",
                                            style: k,
                                            children: [(0, t.jsx)("img", {
                                                src: m,
                                                width: 30,
                                                height: 30,
                                                alt: "Achievement Icon"
                                            }), u?.title]
                                        })
                                    }), (0, t.jsxs)(h.TooltipContent, {
                                        children: [(0, t.jsx)("h1", {
                                            className: "text-2xl font-bold",
                                            children: `${u?.title}`
                                        }), (0, t.jsx)("h2", {
                                            children: u?.reqString?? ""
                                        })]
                                    })]
                                }), (0, t.jsx)("h3", {
                                    className: "text-xl font-bold text-muted",
                                    children: (0, x.regionFormatter)(e?.region?.toUpperCase?.() ?? "")
                                }), (0, t.jsxs)(j.default, {
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
                                        children: ["NameMC", (0, t.jsx)(b, {
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
                                                children: (0, t.jsxs)(h.Tooltip, {
                                                    children: [(0, t.jsxs)(h.TooltipTrigger, {
                                                        children: [e.overall, "."]
                                                    }), (0, t.jsxs)(h.TooltipContent, {
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
                                        children: (0, t.jsx)(f.default, {
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
}, 2747, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(75157);

    function s({
        className: e,
        ...s
    }) {
        return (0, t.jsx)("div", {
            "data-slot": "skeleton",
            className: (0, r.cn)("bg-accent animate-pulse rounded-md", e),
            ...s
        })
    }
    e.s(["Skeleton", () => s])
}, 16694, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(778),
        s = e.i(69742),
        l = e.i(23393),
        a = e.i(58294),
        i = e.i(54219),
        n = e.i(42550),
        o = e.i(24623),
        c = e.i(52755),
        d = e.i(83827);
    let u = r.default.lazy(() => e.A(97135));
    e.s(["default", 0, () => {
        let {
            players: e,
            loadingPlayers: m,
            loadMorePlayers: p,
            error: x,
            columnsHasMore: f
        } = (() => {
            let [e, t] = (0, r.useState)([]), [s, n] = (0, r.useState)(!1), [o, c] = (0, r.useState)(0), [d, u] = (0, r.useState)(!1), [m, p] = (0, r.useState)({
                0: !0,
                1: !0,
                2: !0,
                3: !0,
                4: !0
            }), x = (0, a.usePathname)();
            return (0, r.useEffect)(() => {
                t([]), c(0), p({
                    0: !0,
                    1: !0,
                    2: !0,
                    3: !0,
                    4: !0
                })
            }, [x]), (0, r.useEffect)(() => {
                (async () => {
                    try {
                        u(!1), n(!0);
                        let r = await (0, l.fetchGamemodePlayers)((0, l.stripGamemodePathname)(x.toLowerCase()), o, 10);
                        if (r) {
                            let s = [...e];
                            for (let e = 1; e <= 5; e++) {
                                let t = s.find(t => t.column === e);
                                t || (t = {
                                    column: e,
                                    players: []
                                }, s.push(t));
                                let l = new Set(t.players.map(e => e.uuid)),
                                    a = r[e.toString()];
                                if (a && a.length) {
                                    let n = a.filter(e => !l.has(e.uuid));
                                    n.length ? t.players.push(...n) : p(t => ({ ...t,
                                        [e]: !1
                                    }))
                                } else p(t => ({ ...t,
                                    [e]: !1
                                }))
                            }
                            s.sort((e, t) => e.column - t.column), t(s)
                        }
                    } catch (e) {
                        console.error(e), u(!0), i.toast.error("Error loading players", {
                            description: "Please refresh the page. If the error persists, let a staff member know.",
                            position: "top-center",
                            duration: 5e3
                        })
                    } finally {
                        n(!1)
                    }
                })()
            }, [o, x]), {
                players: e,
                loadingPlayers: s,
                loadMorePlayers: () => Object.values(m).some(Boolean) && c(e => e + 10),
                error: d,
                columnsHasMore: m
            }
        })(), {
            visible: h,
            hide: g,
            profile: v,
            loadingProfile: S,
            handleFetchPlayer: j
        } = (0, c.useProfile)(), b = (0, r.useRef)(null), y = (0, r.useRef)(null), [w, N] = (0, r.useState)({
            left: 0,
            right: 0
        });
        return (0, r.useEffect)(() => {
            if (b.current && y.current) {
                let e = y.current.offsetWidth;
                N({
                    left: -(b.current.scrollWidth - e),
                    right: 0
                })
            }
        }, [e]), (0, t.jsx)(t.Fragment, {
            children: x ? (0, t.jsx)(d.default, {}) : (0, t.jsx)(t.Fragment, {
                children: (0, t.jsxs)("div", {
                    ref: y,
                    className: "mt-4 overflow-hidden mb-6",
                    children: [(0, t.jsx)(s.motion.div, {
                        ref: b,
                        className: "min-w-[80rem] grid grid-cols-5 gap-2 pb-8 cursor-grab active:cursor-grabbing",
                        drag: "x",
                        dragConstraints: w,
                        children: e.map((e, s) => (0, t.jsx)(r.Suspense, {
                            children: (0, t.jsx)(u, {
                                handleFetchPlayer: e => j(e),
                                column: e,
                                loading: m,
                                hasMore: f[e.column]
                            })
                        }, s))
                    }), 0 !== e.length && Object.values(f).some(Boolean) && (0, t.jsx)(n.default, {
                        fn: p,
                        dependency: e
                    }), (0, t.jsx)(o.default, {
                        profile: v,
                        visible: h,
                        hide: g,
                        loadingProfile: S
                    })]
                })
            })
        })
    }], 16694)
}, 72146, e => {
    e.v(e => Promise.resolve().then(() => e(45994)))
}, 97135, e => {
    e.v(t => Promise.all(["static/chunks/edb637b383bbd993.js"].map(t => e.l(t))).then(() => t(16472)))
}]);