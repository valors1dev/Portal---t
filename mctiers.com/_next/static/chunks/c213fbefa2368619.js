(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 91967, 44977, 56207, e => {
    "use strict";

    function t(e, r, {
        checkForDefaultPrevented: n = !0
    } = {}) {
        return function(t) {
            if (e?.(t), !1 === n || !t.defaultPrevented) return r?.(t)
        }
    }
    "undefined" != typeof window && window.document && window.document.createElement, e.s(["composeEventHandlers", () => t], 91967);
    var r = e.i(778);

    function n(e, t) {
        if ("function" == typeof e) return e(t);
        null != e && (e.current = t)
    }

    function o(...e) {
        return t => {
            let r = !1,
                o = e.map(e => {
                    let o = n(e, t);
                    return r || "function" != typeof o || (r = !0), o
                });
            if (r) return () => {
                for (let t = 0; t < o.length; t++) {
                    let r = o[t];
                    "function" == typeof r ? r() : n(e[t], null)
                }
            }
        }
    }

    function i(...e) {
        return r.useCallback(o(...e), e)
    }
    e.s(["composeRefs", () => o, "useComposedRefs", () => i], 44977);
    var s = e.i(80506);

    function u(e, t) {
        let n = r.createContext(t),
            o = e => {
                let {
                    children: t,
                    ...o
                } = e, i = r.useMemo(() => o, Object.values(o));
                return (0, s.jsx)(n.Provider, {
                    value: i,
                    children: t
                })
            };
        return o.displayName = e + "Provider", [o, function(o) {
            let i = r.useContext(n);
            if (i) return i;
            if (void 0 !== t) return t;
            throw Error(`\`${o}\` must be used within \`${e}\``)
        }]
    }

    function a(e, t = []) {
        let n = [],
            o = () => {
                let t = n.map(e => r.createContext(e));
                return function(n) {
                    let o = n?.[e] || t;
                    return r.useMemo(() => ({
                        [`__scope${e}`]: { ...n,
                            [e]: o
                        }
                    }), [n, o])
                }
            };
        return o.scopeName = e, [function(t, o) {
            let i = r.createContext(o),
                u = n.length;
            n = [...n, o];
            let a = t => {
                let {
                    scope: n,
                    children: o,
                    ...a
                } = t, l = n?.[e]?.[u] || i, c = r.useMemo(() => a, Object.values(a));
                return (0, s.jsx)(l.Provider, {
                    value: c,
                    children: o
                })
            };
            return a.displayName = t + "Provider", [a, function(n, s) {
                let a = s?.[e]?.[u] || i,
                    l = r.useContext(a);
                if (l) return l;
                if (void 0 !== o) return o;
                throw Error(`\`${n}\` must be used within \`${t}\``)
            }]
        }, function(...e) {
            let t = e[0];
            if (1 === e.length) return t;
            let n = () => {
                let n = e.map(e => ({
                    useScope: e(),
                    scopeName: e.scopeName
                }));
                return function(e) {
                    let o = n.reduce((t, {
                        useScope: r,
                        scopeName: n
                    }) => {
                        let o = r(e)[`__scope${n}`];
                        return { ...t,
                            ...o
                        }
                    }, {});
                    return r.useMemo(() => ({
                        [`__scope${t.scopeName}`]: o
                    }), [o])
                }
            };
            return n.scopeName = t.scopeName, n
        }(o, ...t)]
    }
    e.s(["createContext", () => u, "createContextScope", () => a], 56207)
}, 60212, 93074, 56872, 52960, e => {
    "use strict";
    var t, r = e.i(778),
        n = e.i(91967),
        o = e.i(50919),
        i = e.i(44977),
        s = e.i(80506);

    function u(e) {
        var t;
        let n, o = (t = e, (n = r.forwardRef((e, t) => {
                let {
                    children: n,
                    ...o
                } = e;
                if (r.isValidElement(n)) {
                    var s;
                    let e, u, a = (s = n, (u = (e = Object.getOwnPropertyDescriptor(s.props, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.ref : (u = (e = Object.getOwnPropertyDescriptor(s, "ref")?.get) && "isReactWarning" in e && e.isReactWarning) ? s.props.ref : s.props.ref || s.ref),
                        l = function(e, t) {
                            let r = { ...t
                            };
                            for (let n in t) {
                                let o = e[n],
                                    i = t[n];
                                /^on[A-Z]/.test(n) ? o && i ? r[n] = (...e) => {
                                    let t = i(...e);
                                    return o(...e), t
                                } : o && (r[n] = o) : "style" === n ? r[n] = { ...o,
                                    ...i
                                } : "className" === n && (r[n] = [o, i].filter(Boolean).join(" "))
                            }
                            return { ...e,
                                ...r
                            }
                        }(o, n.props);
                    return n.type !== r.Fragment && (l.ref = t ? (0, i.composeRefs)(t, a) : a), r.cloneElement(n, l)
                }
                return r.Children.count(n) > 1 ? r.Children.only(null) : null
            })).displayName = `${t}.SlotClone`, n),
            u = r.forwardRef((e, t) => {
                let {
                    children: n,
                    ...i
                } = e, u = r.Children.toArray(n), a = u.find(c);
                if (a) {
                    let e = a.props.children,
                        n = u.map(t => t !== a ? t : r.Children.count(e) > 1 ? r.Children.only(null) : r.isValidElement(e) ? e.props.children : null);
                    return (0, s.jsx)(o, { ...i,
                        ref: t,
                        children: r.isValidElement(e) ? r.cloneElement(e, void 0, n) : null
                    })
                }
                return (0, s.jsx)(o, { ...i,
                    ref: t,
                    children: n
                })
            });
        return u.displayName = `${e}.Slot`, u
    }
    var a = Symbol("radix.slottable");

    function l(e) {
        let t = ({
            children: e
        }) => (0, s.jsx)(s.Fragment, {
            children: e
        });
        return t.displayName = `${e}.Slottable`, t.__radixId = a, t
    }

    function c(e) {
        return r.isValidElement(e) && "function" == typeof e.type && "__radixId" in e.type && e.type.__radixId === a
    }
    e.s(["createSlot", () => u, "createSlottable", () => l], 93074);
    var d = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"].reduce((e, t) => {
        let n = u(`Primitive.${t}`),
            o = r.forwardRef((e, r) => {
                let {
                    asChild: o,
                    ...i
                } = e;
                return "undefined" != typeof window && (window[Symbol.for("radix-ui")] = !0), (0, s.jsx)(o ? n : t, { ...i,
                    ref: r
                })
            });
        return o.displayName = `Primitive.${t}`, { ...e,
            [t]: o
        }
    }, {});

    function f(e, t) {
        e && o.flushSync(() => e.dispatchEvent(t))
    }

    function p(e) {
        let t = r.useRef(e);
        return r.useEffect(() => {
            t.current = e
        }), r.useMemo(() => (...e) => t.current?.(...e), [])
    }
    e.s(["Primitive", () => d, "dispatchDiscreteCustomEvent", () => f], 56872), e.s(["useCallbackRef", () => p], 52960);
    var m = "dismissableLayer.update",
        g = r.createContext({
            layers: new Set,
            layersWithOutsidePointerEventsDisabled: new Set,
            branches: new Set
        }),
        v = r.forwardRef((e, o) => {
            let {
                disableOutsidePointerEvents: u = !1,
                onEscapeKeyDown: a,
                onPointerDownOutside: l,
                onFocusOutside: c,
                onInteractOutside: f,
                onDismiss: v,
                ...b
            } = e, E = r.useContext(g), [w, O] = r.useState(null), P = w?.ownerDocument?? globalThis?.document, [, C] = r.useState({}), S = (0, i.useComposedRefs)(o, e => O(e)), N = Array.from(E.layers), [j] = [...E.layersWithOutsidePointerEventsDisabled].slice(-1), R = N.indexOf(j), _ = w ? N.indexOf(w) : -1, T = E.layersWithOutsidePointerEventsDisabled.size > 0, x = _ >= R, L = function(e, t = globalThis?.document) {
                let n = p(e),
                    o = r.useRef(!1),
                    i = r.useRef(() => {});
                return r.useEffect(() => {
                    let e = e => {
                            if (e.target && !o.current) {
                                let r = function() {
                                        y("dismissableLayer.pointerDownOutside", n, o, {
                                            discrete: !0
                                        })
                                    },
                                    o = {
                                        originalEvent: e
                                    };
                                "touch" === e.pointerType ? (t.removeEventListener("click", i.current), i.current = r, t.addEventListener("click", i.current, {
                                    once: !0
                                })) : r()
                            } else t.removeEventListener("click", i.current);
                            o.current = !1
                        },
                        r = window.setTimeout(() => {
                            t.addEventListener("pointerdown", e)
                        }, 0);
                    return () => {
                        window.clearTimeout(r), t.removeEventListener("pointerdown", e), t.removeEventListener("click", i.current)
                    }
                }, [t, n]), {
                    onPointerDownCapture: () => o.current = !0
                }
            }(e => {
                let t = e.target,
                    r = [...E.branches].some(e => e.contains(t));
                x && !r && (l?.(e), f?.(e), e.defaultPrevented || v?.())
            }, P), k = function(e, t = globalThis?.document) {
                let n = p(e),
                    o = r.useRef(!1);
                return r.useEffect(() => {
                    let e = e => {
                        e.target && !o.current && y("dismissableLayer.focusOutside", n, {
                            originalEvent: e
                        }, {
                            discrete: !1
                        })
                    };
                    return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e)
                }, [t, n]), {
                    onFocusCapture: () => o.current = !0,
                    onBlurCapture: () => o.current = !1
                }
            }(e => {
                let t = e.target;
                ![...E.branches].some(e => e.contains(t)) && (c?.(e), f?.(e), e.defaultPrevented || v?.())
            }, P);
            return ! function(e, t = globalThis?.document) {
                let n = p(e);
                r.useEffect(() => {
                    let e = e => {
                        "Escape" === e.key && n(e)
                    };
                    return t.addEventListener("keydown", e, {
                        capture: !0
                    }), () => t.removeEventListener("keydown", e, {
                        capture: !0
                    })
                }, [n, t])
            }(e => {
                _ === E.layers.size - 1 && (a?.(e), !e.defaultPrevented && v && (e.preventDefault(), v()))
            }, P), r.useEffect(() => {
                if (w) return u && (0 === E.layersWithOutsidePointerEventsDisabled.size && (t = P.body.style.pointerEvents, P.body.style.pointerEvents = "none"), E.layersWithOutsidePointerEventsDisabled.add(w)), E.layers.add(w), h(), () => {
                    u && 1 === E.layersWithOutsidePointerEventsDisabled.size && (P.body.style.pointerEvents = t)
                }
            }, [w, P, u, E]), r.useEffect(() => () => {
                w && (E.layers.delete(w), E.layersWithOutsidePointerEventsDisabled.delete(w), h())
            }, [w, E]), r.useEffect(() => {
                let e = () => C({});
                return document.addEventListener(m, e), () => document.removeEventListener(m, e)
            }, []), (0, s.jsx)(d.div, { ...b,
                ref: S,
                style: {
                    pointerEvents: T ? x ? "auto" : "none" : void 0,
                    ...e.style
                },
                onFocusCapture: (0, n.composeEventHandlers)(e.onFocusCapture, k.onFocusCapture),
                onBlurCapture: (0, n.composeEventHandlers)(e.onBlurCapture, k.onBlurCapture),
                onPointerDownCapture: (0, n.composeEventHandlers)(e.onPointerDownCapture, L.onPointerDownCapture)
            })
        });

    function h() {
        let e = new CustomEvent(m);
        document.dispatchEvent(e)
    }

    function y(e, t, r, {
        discrete: n
    }) {
        let o = r.originalEvent.target,
            i = new CustomEvent(e, {
                bubbles: !1,
                cancelable: !0,
                detail: r
            });
        t && o.addEventListener(e, t, {
            once: !0
        }), n ? f(o, i) : o.dispatchEvent(i)
    }
    v.displayName = "DismissableLayer", r.forwardRef((e, t) => {
        let n = r.useContext(g),
            o = r.useRef(null),
            u = (0, i.useComposedRefs)(t, o);
        return r.useEffect(() => {
            let e = o.current;
            if (e) return n.branches.add(e), () => {
                n.branches.delete(e)
            }
        }, [n.branches]), (0, s.jsx)(d.div, { ...e,
            ref: u
        })
    }).displayName = "DismissableLayerBranch", e.s(["DismissableLayer", () => v], 60212)
}, 61194, 27864, e => {
    "use strict";
    var t = e.i(778),
        r = globalThis?.document ? t.useLayoutEffect : () => {};
    e.s(["useLayoutEffect", () => r], 27864);
    var n = t[" useId ".trim().toString()] || (() => void 0),
        o = 0;

    function i(e) {
        let [i, s] = t.useState(n());
        return r(() => {
            e || s(e => e?? String(o++))
        }, [e]), e || (i ? `radix-${i}` : "")
    }
    e.s(["useId", () => i], 61194)
}, 14952, 53747, e => {
    "use strict";
    var t = e.i(778),
        r = e.i(50919),
        n = e.i(56872),
        o = e.i(27864),
        i = e.i(80506),
        s = t.forwardRef((e, s) => {
            let {
                container: u,
                ...a
            } = e, [l, c] = t.useState(!1);
            (0, o.useLayoutEffect)(() => c(!0), []);
            let d = u || l && globalThis?.document?.body;
            return d ? r.default.createPortal((0, i.jsx)(n.Primitive.div, { ...a,
                ref: s
            }), d) : null
        });
    s.displayName = "Portal", e.s(["Portal", () => s], 14952);
    var u = e.i(44977),
        a = e => {
            var r;
            let n, i, {
                    present: s,
                    children: a
                } = e,
                c = function(e) {
                    var r, n;
                    let [i, s] = t.useState(), u = t.useRef(null), a = t.useRef(e), c = t.useRef("none"), [d, f] = (r = e ? "mounted" : "unmounted", n = {
                        mounted: {
                            UNMOUNT: "unmounted",
                            ANIMATION_OUT: "unmountSuspended"
                        },
                        unmountSuspended: {
                            MOUNT: "mounted",
                            ANIMATION_END: "unmounted"
                        },
                        unmounted: {
                            MOUNT: "mounted"
                        }
                    }, t.useReducer((e, t) => n[e][t]?? e, r));
                    return t.useEffect(() => {
                        let e = l(u.current);
                        c.current = "mounted" === d ? e : "none"
                    }, [d]), (0, o.useLayoutEffect)(() => {
                        let t = u.current,
                            r = a.current;
                        if (r !== e) {
                            let n = c.current,
                                o = l(t);
                            e ? f("MOUNT") : "none" === o || t?.display === "none" ? f("UNMOUNT") : r && n !== o ? f("ANIMATION_OUT") : f("UNMOUNT"), a.current = e
                        }
                    }, [e, f]), (0, o.useLayoutEffect)(() => {
                        if (i) {
                            let e, t = i.ownerDocument.defaultView?? window,
                                r = r => {
                                    let n = l(u.current).includes(CSS.escape(r.animationName));
                                    if (r.target === i && n && (f("ANIMATION_END"), !a.current)) {
                                        let r = i.style.animationFillMode;
                                        i.style.animationFillMode = "forwards", e = t.setTimeout(() => {
                                            "forwards" === i.style.animationFillMode && (i.style.animationFillMode = r)
                                        })
                                    }
                                },
                                n = e => {
                                    e.target === i && (c.current = l(u.current))
                                };
                            return i.addEventListener("animationstart", n), i.addEventListener("animationcancel", r), i.addEventListener("animationend", r), () => {
                                t.clearTimeout(e), i.removeEventListener("animationstart", n), i.removeEventListener("animationcancel", r), i.removeEventListener("animationend", r)
                            }
                        }
                        f("ANIMATION_END")
                    }, [i, f]), {
                        isPresent: ["mounted", "unmountSuspended"].includes(d),
                        ref: t.useCallback(e => {
                            u.current = e ? getComputedStyle(e) : null, s(e)
                        }, [])
                    }
                }(s),
                d = "function" == typeof a ? a({
                    present: c.isPresent
                }) : t.Children.only(a),
                f = (0, u.useComposedRefs)(c.ref, (r = d, (i = (n = Object.getOwnPropertyDescriptor(r.props, "ref")?.get) && "isReactWarning" in n && n.isReactWarning) ? r.ref : (i = (n = Object.getOwnPropertyDescriptor(r, "ref")?.get) && "isReactWarning" in n && n.isReactWarning) ? r.props.ref : r.props.ref || r.ref));
            return "function" == typeof a || c.isPresent ? t.cloneElement(d, {
                ref: f
            }) : null
        };

    function l(e) {
        return e?.animationName || "none"
    }
    a.displayName = "Presence", e.s(["Presence", () => a], 53747)
}, 34643, e => {
    "use strict";
    var t = e.i(778),
        r = e.i(27864);
    t[" useEffectEvent ".trim().toString()], t[" useInsertionEffect ".trim().toString()];
    var n = t[" useInsertionEffect ".trim().toString()] || r.useLayoutEffect;

    function o({
        prop: e,
        defaultProp: r,
        onChange: o = () => {},
        caller: i
    }) {
        let [s, u, a] = function({
            defaultProp: e,
            onChange: r
        }) {
            let [o, i] = t.useState(e), s = t.useRef(o), u = t.useRef(r);
            return n(() => {
                u.current = r
            }, [r]), t.useEffect(() => {
                s.current !== o && (u.current?.(o), s.current = o)
            }, [o, s]), [o, i, u]
        }({
            defaultProp: r,
            onChange: o
        }), l = void 0 !== e, c = l ? e : s; {
            let r = t.useRef(void 0 !== e);
            t.useEffect(() => {
                let e = r.current;
                if (e !== l) {
                    let t = l ? "controlled" : "uncontrolled";
                    console.warn(`${i} is changing from ${e?"controlled":"uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`)
                }
                r.current = l
            }, [l, i])
        }
        return [c, t.useCallback(t => {
            if (l) {
                let r = "function" == typeof t ? t(e) : t;
                r !== e && a.current?.(r)
            } else u(t)
        }, [l, e, u, a])]
    }
    Symbol("RADIX:SYNC_STATE"), e.s(["useControllableState", () => o], 34643)
}, 86115, e => {
    "use strict";
    var t = e.i(778),
        r = {
            color: void 0,
            size: void 0,
            className: void 0,
            style: void 0,
            attr: void 0
        },
        n = t.default.createContext && t.default.createContext(r),
        o = ["attr", "size", "title"];

    function i() {
        return (i = Object.assign.bind()).apply(this, arguments)
    }

    function s(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter(function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            })), r.push.apply(r, n)
        }
        return r
    }

    function u(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? s(Object(r), !0).forEach(function(t) {
                var n, o, i;
                n = e, o = t, i = r[t], (o = function(e) {
                    var t = function(e, t) {
                        if ("object" != typeof e || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, t || "default");
                            if ("object" != typeof n) return n;
                            throw TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" == typeof t ? t : t + ""
                }(o)) in n ? Object.defineProperty(n, o, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = i
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s(Object(r)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
        }
        return e
    }

    function a(e) {
        return r => t.default.createElement(l, i({
            attr: u({}, e.attr)
        }, r), function e(r) {
            return r && r.map((r, n) => t.default.createElement(r.tag, u({
                key: n
            }, r.attr), e(r.child)))
        }(e.child))
    }

    function l(e) {
        var s = r => {
            var n, {
                    attr: s,
                    size: a,
                    title: l
                } = e,
                c = function(e, t) {
                    if (null == e) return {};
                    var r, n, o = function(e, t) {
                        if (null == e) return {};
                        var r = {};
                        for (var n in e)
                            if (Object.prototype.hasOwnProperty.call(e, n)) {
                                if (t.indexOf(n) >= 0) continue;
                                r[n] = e[n]
                            }
                        return r
                    }(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (n = 0; n < i.length; n++) r = i[n], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                    }
                    return o
                }(e, o),
                d = a || r.size || "1em";
            return r.className && (n = r.className), e.className && (n = (n ? n + " " : "") + e.className), t.default.createElement("svg", i({
                stroke: "currentColor",
                fill: "currentColor",
                strokeWidth: "0"
            }, r.attr, s, c, {
                className: n,
                style: u(u({
                    color: e.color || r.color
                }, r.style), e.style),
                height: d,
                width: d,
                xmlns: "http://www.w3.org/2000/svg"
            }), l && t.default.createElement("title", null, l), e.children)
        };
        return void 0 !== n ? t.default.createElement(n.Consumer, null, e => s(e)) : s(r)
    }
    e.s(["GenIcon", () => a], 86115)
}, 47800, e => {
    "use strict";
    let t = [{
            id: "overall",
            name: "Overall",
            icon: "overall.svg",
            discord: null,
            show: !1
        }, {
            id: "ltm",
            name: "LTMs",
            icon: "2v2.svg",
            discord: null,
            show: !1
        }, {
            id: "vanilla",
            name: "Vanilla",
            icon: "vanilla.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "uhc",
            name: "UHC",
            icon: "uhc.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "pot",
            name: "Pot",
            icon: "pot.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "nethop",
            name: "NethOP",
            icon: "nethop.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "smp",
            name: "SMP",
            icon: "smp.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "sword",
            name: "Sword",
            icon: "sword.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "axe",
            name: "Axe",
            icon: "axe.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }, {
            id: "mace",
            name: "Mace",
            icon: "mace.svg",
            discord: "https://discord.gg/2QsW3rTjqg",
            show: !0
        }],
        r = t.filter(e => e.show).map(e => e.name),
        n = [{
            title: "Home",
            url: "/",
            icon: "home.svg",
            disabled: !0,
            disabledIcon: "home-muted.svg"
        }, {
            title: "Rankings",
            url: "/rankings",
            icon: "rankings.svg",
            disabled: !1,
            disabledIcon: "rankings-muted.svg"
        }, {
            title: "Discords",
            icon: "discord.svg",
            items: t,
            disabled: !1,
            disabledIcon: "discord-muted.svg"
        }, {
            title: "API Docs",
            url: "/docs/v2",
            icon: "file_code.svg",
            disabled: !1,
            disabledIcon: ""
        }];
    e.s(["TITLES", 0, {
        grand_master: {
            title: "Combat Grandmaster",
            reqString: "Obtained 400+ total points.",
            colors: {
                bg: "#fde04733",
                fg: "#fde047"
            }
        },
        master: {
            title: "Combat Master",
            reqString: "Obtained 250+ total points.",
            colors: {
                bg: "#fde04733",
                fg: "#fde047"
            }
        },
        ace: {
            title: "Combat Ace",
            reqString: "Obtained 100+ total points.",
            colors: {
                bg: "#f43f5e4d",
                fg: "#fda4af"
            }
        },
        specialist: {
            title: "Combat Specialist",
            reqString: "Obtained 50+ total points.",
            colors: {
                bg: "#c084fc4d",
                fg: "#d8b4fe"
            }
        },
        cadet: {
            title: "Combat Cadet",
            reqString: "Obtained 20+ total points.",
            colors: {
                bg: "#818cfb33",
                fg: "#c4b5fd"
            }
        },
        novice: {
            title: "Combat Novice",
            reqString: "Obtained 10+ total points.",
            colors: {
                bg: "#a5b4fc33",
                fg: "#c4b5fd"
            }
        },
        rookie: {
            title: "Rookie",
            reqString: "Starting rank for players with less than 10 points.",
            colors: {
                bg: "#6b72804d",
                fg: "#d1d5db"
            }
        },
        unranked: {
            title: "Unranked",
            reqString: "",
            colors: {
                bg: "#6b72804d",
                fg: "#d1d5db"
            }
        }
    }, "gamemodeNames", 0, r, "gamemodes", 0, t, "homeNavs", 0, n, "kb_shortcuts", 0, {
        search: {
            key: "/",
            description: "Focuses on the search player input"
        },
        kit: {
            key: "CTRL+E",
            description: "Shows the gamemode kit if any"
        }
    }, "points", 0, {
        1: {
            high: 60,
            low: 45
        },
        2: {
            high: 30,
            low: 20
        },
        3: {
            high: 10,
            low: 6
        },
        4: {
            high: 4,
            low: 3
        },
        5: {
            high: 2,
            low: 1
        }
    }, "pvpclub_data", 0, {
        ip: "portalnetwork.fun",
        discord: "https://discord.gg/2QsW3rTjqg"
    }])
}, 43946, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "warnOnce", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let n = e => {}
}, 86462, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        assign: function() {
            return a
        },
        searchParamsToUrlQuery: function() {
            return i
        },
        urlQueryToSearchParams: function() {
            return u
        }
    };
    for (var o in n) Object.defineProperty(r, o, {
        enumerable: !0,
        get: n[o]
    });

    function i(e) {
        let t = {};
        for (let [r, n] of e.entries()) {
            let e = t[r];
            void 0 === e ? t[r] = n : Array.isArray(e) ? e.push(n) : t[r] = [e, n]
        }
        return t
    }

    function s(e) {
        return "string" == typeof e ? e : ("number" != typeof e || isNaN(e)) && "boolean" != typeof e ? "" : String(e)
    }

    function u(e) {
        let t = new URLSearchParams;
        for (let [r, n] of Object.entries(e))
            if (Array.isArray(n))
                for (let e of n) t.append(r, s(e));
            else t.set(r, s(n));
        return t
    }

    function a(e, ...t) {
        for (let r of t) {
            for (let t of r.keys()) e.delete(t);
            for (let [t, n] of r.entries()) e.append(t, n)
        }
        return e
    }
}, 33860, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        formatUrl: function() {
            return u
        },
        formatWithValidation: function() {
            return l
        },
        urlObjectKeys: function() {
            return a
        }
    };
    for (var o in n) Object.defineProperty(r, o, {
        enumerable: !0,
        get: n[o]
    });
    let i = e.r(44066)._(e.r(86462)),
        s = /https?|ftp|gopher|file/;

    function u(e) {
        let {
            auth: t,
            hostname: r
        } = e, n = e.protocol || "", o = e.pathname || "", u = e.hash || "", a = e.query || "", l = !1;
        t = t ? encodeURIComponent(t).replace(/%3A/i, ":") + "@" : "", e.host ? l = t + e.host : r && (l = t + (~r.indexOf(":") ? `[${r}]` : r), e.port && (l += ":" + e.port)), a && "object" == typeof a && (a = String(i.urlQueryToSearchParams(a)));
        let c = e.search || a && `?${a}` || "";
        return n && !n.endsWith(":") && (n += ":"), e.slashes || (!n || s.test(n)) && !1 !== l ? (l = "//" + (l || ""), o && "/" !== o[0] && (o = "/" + o)) : l || (l = ""), u && "#" !== u[0] && (u = "#" + u), c && "?" !== c[0] && (c = "?" + c), o = o.replace(/[?#]/g, encodeURIComponent), c = c.replace("#", "%23"), `${n}${l}${o}${c}${u}`
    }
    let a = ["auth", "hash", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "slashes"];

    function l(e) {
        return u(e)
    }
}, 4357, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "useMergedRef", {
        enumerable: !0,
        get: function() {
            return o
        }
    });
    let n = e.r(778);

    function o(e, t) {
        let r = (0, n.useRef)(null),
            o = (0, n.useRef)(null);
        return (0, n.useCallback)(n => {
            if (null === n) {
                let e = r.current;
                e && (r.current = null, e());
                let t = o.current;
                t && (o.current = null, t())
            } else e && (r.current = i(e, n)), t && (o.current = i(t, n))
        }, [e, t])
    }

    function i(e, t) {
        if ("function" != typeof e) return e.current = t, () => {
            e.current = null
        }; {
            let r = e(t);
            return "function" == typeof r ? r : () => e(null)
        }
    }("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}, 68825, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        DecodeError: function() {
            return h
        },
        MiddlewareNotFoundError: function() {
            return w
        },
        MissingStaticPage: function() {
            return E
        },
        NormalizeError: function() {
            return y
        },
        PageNotFoundError: function() {
            return b
        },
        SP: function() {
            return g
        },
        ST: function() {
            return v
        },
        WEB_VITALS: function() {
            return i
        },
        execOnce: function() {
            return s
        },
        getDisplayName: function() {
            return d
        },
        getLocationOrigin: function() {
            return l
        },
        getURL: function() {
            return c
        },
        isAbsoluteUrl: function() {
            return a
        },
        isResSent: function() {
            return f
        },
        loadGetInitialProps: function() {
            return m
        },
        normalizeRepeatedSlashes: function() {
            return p
        },
        stringifyError: function() {
            return O
        }
    };
    for (var o in n) Object.defineProperty(r, o, {
        enumerable: !0,
        get: n[o]
    });
    let i = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];

    function s(e) {
        let t, r = !1;
        return (...n) => (r || (r = !0, t = e(...n)), t)
    }
    let u = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
        a = e => u.test(e);

    function l() {
        let {
            protocol: e,
            hostname: t,
            port: r
        } = window.location;
        return `${e}//${t}${r?":"+r:""}`
    }

    function c() {
        let {
            href: e
        } = window.location, t = l();
        return e.substring(t.length)
    }

    function d(e) {
        return "string" == typeof e ? e : e.displayName || e.name || "Unknown"
    }

    function f(e) {
        return e.finished || e.headersSent
    }

    function p(e) {
        let t = e.split("?");
        return t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (t[1] ? `?${t.slice(1).join("?")}` : "")
    }
    async function m(e, t) {
        let r = t.res || t.ctx && t.ctx.res;
        if (!e.getInitialProps) return t.ctx && t.Component ? {
            pageProps: await m(t.Component, t.ctx)
        } : {};
        let n = await e.getInitialProps(t);
        if (r && f(r)) return n;
        if (!n) throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0
        });
        return n
    }
    let g = "undefined" != typeof performance,
        v = g && ["mark", "measure", "getEntriesByName"].every(e => "function" == typeof performance[e]);
    class h extends Error {}
    class y extends Error {}
    class b extends Error {
        constructor(e) {
            super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = `Cannot find module for page: ${e}`
        }
    }
    class E extends Error {
        constructor(e, t) {
            super(), this.message = `Failed to load static file for page: ${e} ${t}`
        }
    }
    class w extends Error {
        constructor() {
            super(), this.code = "ENOENT", this.message = "Cannot find the middleware module"
        }
    }

    function O(e) {
        return JSON.stringify({
            message: e.message,
            stack: e.stack
        })
    }
}, 98869, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "isLocalURL", {
        enumerable: !0,
        get: function() {
            return i
        }
    });
    let n = e.r(68825),
        o = e.r(6125);

    function i(e) {
        if (!(0, n.isAbsoluteUrl)(e)) return !0;
        try {
            let t = (0, n.getLocationOrigin)(),
                r = new URL(e, t);
            return r.origin === t && (0, o.hasBasePath)(r.pathname)
        } catch (e) {
            return !1
        }
    }
}, 37034, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), Object.defineProperty(r, "errorOnce", {
        enumerable: !0,
        get: function() {
            return n
        }
    });
    let n = e => {}
}, 8331, (e, t, r) => {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    });
    var n = {
        default: function() {
            return h
        },
        useLinkStatus: function() {
            return b
        }
    };
    for (var o in n) Object.defineProperty(r, o, {
        enumerable: !0,
        get: n[o]
    });
    let i = e.r(44066),
        s = e.r(80506),
        u = i._(e.r(778)),
        a = e.r(33860),
        l = e.r(40992),
        c = e.r(4357),
        d = e.r(68825),
        f = e.r(89810);
    e.r(43946);
    let p = e.r(97689),
        m = e.r(98869),
        g = e.r(25797);

    function v(e) {
        return "string" == typeof e ? e : (0, a.formatUrl)(e)
    }

    function h(t) {
        var r;
        let n, o, i, [a, h] = (0, u.useOptimistic)(p.IDLE_LINK_STATUS),
            b = (0, u.useRef)(null),
            {
                href: E,
                as: w,
                children: O,
                prefetch: P = null,
                passHref: C,
                replace: S,
                shallow: N,
                scroll: j,
                onClick: R,
                onMouseEnter: _,
                onTouchStart: T,
                legacyBehavior: x = !1,
                onNavigate: L,
                ref: k,
                unstable_dynamicOnHover: M,
                ...D
            } = t;
        n = O, x && ("string" == typeof n || "number" == typeof n) && (n = (0, s.jsx)("a", {
            children: n
        }));
        let I = u.default.useContext(l.AppRouterContext),
            A = !1 !== P,
            $ = !1 !== P ? null === (r = P) || "auto" === r ? g.FetchStrategy.PPR : g.FetchStrategy.Full : g.FetchStrategy.PPR,
            {
                href: U,
                as: F
            } = u.default.useMemo(() => {
                let e = v(E);
                return {
                    href: e,
                    as: w ? v(w) : e
                }
            }, [E, w]);
        if (x) {
            if (n?.$$typeof === Symbol.for("react.lazy")) throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: !1,
                configurable: !0
            });
            o = u.default.Children.only(n)
        }
        let W = x ? o && "object" == typeof o && o.ref : k,
            B = u.default.useCallback(e => (null !== I && (b.current = (0, p.mountLinkInstance)(e, U, I, $, A, h)), () => {
                b.current && ((0, p.unmountLinkForCurrentNavigation)(b.current), b.current = null), (0, p.unmountPrefetchableInstance)(e)
            }), [A, U, I, $, h]),
            z = {
                ref: (0, c.useMergedRef)(B, W),
                onClick(t) {
                    x || "function" != typeof R || R(t), x && o.props && "function" == typeof o.props.onClick && o.props.onClick(t), !I || t.defaultPrevented || function(t, r, n, o, i, s, a) {
                        if ("undefined" != typeof window) {
                            let l, {
                                nodeName: c
                            } = t.currentTarget;
                            if ("A" === c.toUpperCase() && ((l = t.currentTarget.getAttribute("target")) && "_self" !== l || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey || t.nativeEvent && 2 === t.nativeEvent.which) || t.currentTarget.hasAttribute("download")) return;
                            if (!(0, m.isLocalURL)(r)) {
                                i && (t.preventDefault(), location.replace(r));
                                return
                            }
                            if (t.preventDefault(), a) {
                                let e = !1;
                                if (a({
                                        preventDefault: () => {
                                            e = !0
                                        }
                                    }), e) return
                            }
                            let {
                                dispatchNavigateAction: d
                            } = e.r(15355);
                            u.default.startTransition(() => {
                                d(n || r, i ? "replace" : "push", s?? !0, o.current)
                            })
                        }
                    }(t, U, F, b, S, j, L)
                },
                onMouseEnter(e) {
                    x || "function" != typeof _ || _(e), x && o.props && "function" == typeof o.props.onMouseEnter && o.props.onMouseEnter(e), I && A && (0, p.onNavigationIntent)(e.currentTarget, !0 === M)
                },
                onTouchStart: function(e) {
                    x || "function" != typeof T || T(e), x && o.props && "function" == typeof o.props.onTouchStart && o.props.onTouchStart(e), I && A && (0, p.onNavigationIntent)(e.currentTarget, !0 === M)
                }
            };
        return (0, d.isAbsoluteUrl)(F) ? z.href = F : x && !C && ("a" !== o.type || "href" in o.props) || (z.href = (0, f.addBasePath)(F)), i = x ? u.default.cloneElement(o, z) : (0, s.jsx)("a", { ...D,
            ...z,
            children: n
        }), (0, s.jsx)(y.Provider, {
            value: a,
            children: i
        })
    }
    e.r(37034);
    let y = (0, u.createContext)(p.IDLE_LINK_STATUS),
        b = () => (0, u.useContext)(y);
    ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", {
        value: !0
    }), Object.assign(r.default, r), t.exports = r.default)
}]);