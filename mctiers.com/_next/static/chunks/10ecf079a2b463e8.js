(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 71353, e => {
    "use strict";
    var t = e.i(778),
        n = 0;

    function r() {
        t.useEffect(() => {
            let e = document.querySelectorAll("[data-radix-focus-guard]");
            return document.body.insertAdjacentElement("afterbegin", e[0]?? o()), document.body.insertAdjacentElement("beforeend", e[1]?? o()), n++, () => {
                1 === n && document.querySelectorAll("[data-radix-focus-guard]").forEach(e => e.remove()), n--
            }
        }, [])
    }

    function o() {
        let e = document.createElement("span");
        return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e
    }
    e.s(["useFocusGuards", () => r])
}, 89535, e => {
    "use strict";
    let t;
    var n = e.i(778),
        r = e.i(44977),
        o = e.i(56872),
        i = e.i(52960),
        a = e.i(80506),
        u = "focusScope.autoFocusOnMount",
        c = "focusScope.autoFocusOnUnmount",
        s = {
            bubbles: !1,
            cancelable: !0
        },
        l = n.forwardRef((e, t) => {
            let {
                loop: l = !1,
                trapped: v = !1,
                onMountAutoFocus: m,
                onUnmountAutoFocus: y,
                ...g
            } = e, [b, w] = n.useState(null), E = (0, i.useCallbackRef)(m), R = (0, i.useCallbackRef)(y), S = n.useRef(null), k = (0, r.useComposedRefs)(t, e => w(e)), A = n.useRef({
                paused: !1,
                pause() {
                    this.paused = !0
                },
                resume() {
                    this.paused = !1
                }
            }).current;
            n.useEffect(() => {
                if (v) {
                    let e = function(e) {
                            if (A.paused || !b) return;
                            let t = e.target;
                            b.contains(t) ? S.current = t : h(S.current, {
                                select: !0
                            })
                        },
                        t = function(e) {
                            if (A.paused || !b) return;
                            let t = e.relatedTarget;
                            null !== t && (b.contains(t) || h(S.current, {
                                select: !0
                            }))
                        };
                    document.addEventListener("focusin", e), document.addEventListener("focusout", t);
                    let n = new MutationObserver(function(e) {
                        if (document.activeElement === document.body)
                            for (let t of e) t.removedNodes.length > 0 && h(b)
                    });
                    return b && n.observe(b, {
                        childList: !0,
                        subtree: !0
                    }), () => {
                        document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), n.disconnect()
                    }
                }
            }, [v, b, A.paused]), n.useEffect(() => {
                if (b) {
                    p.add(A);
                    let e = document.activeElement;
                    if (!b.contains(e)) {
                        let t = new CustomEvent(u, s);
                        b.addEventListener(u, E), b.dispatchEvent(t), t.defaultPrevented || (function(e, {
                            select: t = !1
                        } = {}) {
                            let n = document.activeElement;
                            for (let r of e)
                                if (h(r, {
                                        select: t
                                    }), document.activeElement !== n) return
                        }(f(b).filter(e => "A" !== e.tagName), {
                            select: !0
                        }), document.activeElement === e && h(b))
                    }
                    return () => {
                        b.removeEventListener(u, E), setTimeout(() => {
                            let t = new CustomEvent(c, s);
                            b.addEventListener(c, R), b.dispatchEvent(t), t.defaultPrevented || h(e?? document.body, {
                                select: !0
                            }), b.removeEventListener(c, R), p.remove(A)
                        }, 0)
                    }
                }
            }, [b, E, R, A]);
            let x = n.useCallback(e => {
                if (!l && !v || A.paused) return;
                let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                    n = document.activeElement;
                if (t && n) {
                    var r;
                    let t, o = e.currentTarget,
                        [i, a] = [d(t = f(r = o), r), d(t.reverse(), r)];
                    i && a ? e.shiftKey || n !== a ? e.shiftKey && n === i && (e.preventDefault(), l && h(a, {
                        select: !0
                    })) : (e.preventDefault(), l && h(i, {
                        select: !0
                    })) : n === o && e.preventDefault()
                }
            }, [l, v, A.paused]);
            return (0, a.jsx)(o.Primitive.div, {
                tabIndex: -1,
                ...g,
                ref: k,
                onKeyDown: x
            })
        });

    function f(e) {
        let t = [],
            n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                acceptNode: e => {
                    let t = "INPUT" === e.tagName && "hidden" === e.type;
                    return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
                }
            });
        for (; n.nextNode();) t.push(n.currentNode);
        return t
    }

    function d(e, t) {
        for (let n of e)
            if (! function(e, {
                    upTo: t
                }) {
                    if ("hidden" === getComputedStyle(e).visibility) return !0;
                    for (; e && (void 0 === t || e !== t);) {
                        if ("none" === getComputedStyle(e).display) return !0;
                        e = e.parentElement
                    }
                    return !1
                }(n, {
                    upTo: t
                })) return n
    }

    function h(e, {
        select: t = !1
    } = {}) {
        if (e && e.focus) {
            var n;
            let r = document.activeElement;
            e.focus({
                preventScroll: !0
            }), e !== r && (n = e) instanceof HTMLInputElement && "select" in n && t && e.select()
        }
    }
    l.displayName = "FocusScope";
    var p = (t = [], {
        add(e) {
            let n = t[0];
            e !== n && n?.pause(), (t = v(t, e)).unshift(e)
        },
        remove(e) {
            t = v(t, e), t[0]?.resume()
        }
    });

    function v(e, t) {
        let n = [...e],
            r = n.indexOf(t);
        return -1 !== r && n.splice(r, 1), n
    }
    e.s(["FocusScope", () => l])
}, 73772, e => {
    "use strict";
    var t = new WeakMap,
        n = new WeakMap,
        r = {},
        o = 0,
        i = function(e) {
            return e && (e.host || i(e.parentNode))
        },
        a = function(e, a, u, c) {
            var s = (Array.isArray(e) ? e : [e]).map(function(e) {
                if (a.contains(e)) return e;
                var t = i(e);
                return t && a.contains(t) ? t : (console.error("aria-hidden", e, "in not contained inside", a, ". Doing nothing"), null)
            }).filter(function(e) {
                return !!e
            });
            r[u] || (r[u] = new WeakMap);
            var l = r[u],
                f = [],
                d = new Set,
                h = new Set(s),
                p = function(e) {
                    !e || d.has(e) || (d.add(e), p(e.parentNode))
                };
            s.forEach(p);
            var v = function(e) {
                !e || h.has(e) || Array.prototype.forEach.call(e.children, function(e) {
                    if (d.has(e)) v(e);
                    else try {
                        var r = e.getAttribute(c),
                            o = null !== r && "false" !== r,
                            i = (t.get(e) || 0) + 1,
                            a = (l.get(e) || 0) + 1;
                        t.set(e, i), l.set(e, a), f.push(e), 1 === i && o && n.set(e, !0), 1 === a && e.setAttribute(u, "true"), o || e.setAttribute(c, "true")
                    } catch (t) {
                        console.error("aria-hidden: cannot operate on ", e, t)
                    }
                })
            };
            return v(a), d.clear(), o++,
                function() {
                    f.forEach(function(e) {
                        var r = t.get(e) - 1,
                            o = l.get(e) - 1;
                        t.set(e, r), l.set(e, o), r || (n.has(e) || e.removeAttribute(c), n.delete(e)), o || e.removeAttribute(u)
                    }), --o || (t = new WeakMap, t = new WeakMap, n = new WeakMap, r = {})
                }
        },
        u = function(e, t, n) {
            void 0 === n && (n = "data-aria-hidden");
            var r = Array.from(Array.isArray(e) ? e : [e]),
                o = t || ("undefined" == typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
            return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), a(r, o, n, "aria-hidden")) : function() {
                return null
            }
        };
    e.s(["hideOthers", () => u])
}, 21790, e => {
    "use strict";
    var t, n, r, o, i, a, u, c = function() {
        return (c = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function s(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++) 0 > t.indexOf(r[o]) && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
        return n
    }
    var l = ("function" == typeof SuppressedError && SuppressedError, e.i(778)),
        f = "right-scroll-bar-position",
        d = "width-before-scroll-bar";

    function h(e, t) {
        return "function" == typeof e ? e(t) : e && (e.current = t), e
    }
    var p = "undefined" != typeof window ? l.useLayoutEffect : l.useEffect,
        v = new WeakMap,
        m = (void 0 === t && (t = {}), (void 0 === n && (n = function(e) {
            return e
        }), r = [], o = !1, i = {
            read: function() {
                if (o) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
                return r.length ? r[r.length - 1] : null
            },
            useMedium: function(e) {
                var t = n(e, o);
                return r.push(t),
                    function() {
                        r = r.filter(function(e) {
                            return e !== t
                        })
                    }
            },
            assignSyncMedium: function(e) {
                for (o = !0; r.length;) {
                    var t = r;
                    r = [], t.forEach(e)
                }
                r = {
                    push: function(t) {
                        return e(t)
                    },
                    filter: function() {
                        return r
                    }
                }
            },
            assignMedium: function(e) {
                o = !0;
                var t = [];
                if (r.length) {
                    var n = r;
                    r = [], n.forEach(e), t = r
                }
                var i = function() {
                        var n = t;
                        t = [], n.forEach(e)
                    },
                    a = function() {
                        return Promise.resolve().then(i)
                    };
                a(), r = {
                    push: function(e) {
                        t.push(e), a()
                    },
                    filter: function(e) {
                        return t = t.filter(e), r
                    }
                }
            }
        }).options = c({
            async: !0,
            ssr: !1
        }, t), i),
        y = function() {},
        g = l.forwardRef(function(e, t) {
            var n, r, o, i, a = l.useRef(null),
                u = l.useState({
                    onScrollCapture: y,
                    onWheelCapture: y,
                    onTouchMoveCapture: y
                }),
                f = u[0],
                d = u[1],
                g = e.forwardProps,
                b = e.children,
                w = e.className,
                E = e.removeScrollBar,
                R = e.enabled,
                S = e.shards,
                k = e.sideCar,
                A = e.noRelative,
                x = e.noIsolation,
                C = e.inert,
                M = e.allowPinchZoom,
                T = e.as,
                N = e.gapMode,
                I = s(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
                L = (n = [a, t], r = function(e) {
                    return n.forEach(function(t) {
                        return h(t, e)
                    })
                }, (o = (0, l.useState)(function() {
                    return {
                        value: null,
                        callback: r,
                        facade: {
                            get current() {
                                return o.value
                            },
                            set current(value) {
                                var e = o.value;
                                e !== value && (o.value = value, o.callback(value, e))
                            }
                        }
                    }
                })[0]).callback = r, i = o.facade, p(function() {
                    var e = v.get(i);
                    if (e) {
                        var t = new Set(e),
                            r = new Set(n),
                            o = i.current;
                        t.forEach(function(e) {
                            r.has(e) || h(e, null)
                        }), r.forEach(function(e) {
                            t.has(e) || h(e, o)
                        })
                    }
                    v.set(i, n)
                }, [n]), i),
                O = c(c({}, I), f);
            return l.createElement(l.Fragment, null, R && l.createElement(k, {
                sideCar: m,
                removeScrollBar: E,
                shards: S,
                noRelative: A,
                noIsolation: x,
                inert: C,
                setCallbacks: d,
                allowPinchZoom: !!M,
                lockRef: a,
                gapMode: N
            }), g ? l.cloneElement(l.Children.only(b), c(c({}, O), {
                ref: L
            })) : l.createElement(void 0 === T ? "div" : T, c({}, O, {
                className: w,
                ref: L
            }), b))
        });
    g.defaultProps = {
        enabled: !0,
        removeScrollBar: !0,
        inert: !1
    }, g.classNames = {
        fullWidth: d,
        zeroRight: f
    };
    var b = function(e) {
        var t = e.sideCar,
            n = s(e, ["sideCar"]);
        if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
        var r = t.read();
        if (!r) throw Error("Sidecar medium not found");
        return l.createElement(r, c({}, n))
    };
    b.isSideCarExport = !0;
    var w = function() {
            var e = 0,
                t = null;
            return {
                add: function(n) {
                    if (0 == e && (t = function() {
                            if (!document) return null;
                            var e = document.createElement("style");
                            e.type = "text/css";
                            var t = u || ("undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
                            return t && e.setAttribute("nonce", t), e
                        }())) {
                        var r, o;
                        (r = t).styleSheet ? r.styleSheet.cssText = n : r.appendChild(document.createTextNode(n)), o = t, (document.head || document.getElementsByTagName("head")[0]).appendChild(o)
                    }
                    e++
                },
                remove: function() {
                    --e || !t || (t.parentNode && t.parentNode.removeChild(t), t = null)
                }
            }
        },
        E = function() {
            var e = w();
            return function(t, n) {
                l.useEffect(function() {
                    return e.add(t),
                        function() {
                            e.remove()
                        }
                }, [t && n])
            }
        },
        R = function() {
            var e = E();
            return function(t) {
                return e(t.styles, t.dynamic), null
            }
        },
        S = {
            left: 0,
            top: 0,
            right: 0,
            gap: 0
        },
        k = function(e) {
            return parseInt(e || "", 10) || 0
        },
        A = function(e) {
            var t = window.getComputedStyle(document.body),
                n = t["padding" === e ? "paddingLeft" : "marginLeft"],
                r = t["padding" === e ? "paddingTop" : "marginTop"],
                o = t["padding" === e ? "paddingRight" : "marginRight"];
            return [k(n), k(r), k(o)]
        },
        x = function(e) {
            if (void 0 === e && (e = "margin"), "undefined" == typeof window) return S;
            var t = A(e),
                n = document.documentElement.clientWidth,
                r = window.innerWidth;
            return {
                left: t[0],
                top: t[1],
                right: t[2],
                gap: Math.max(0, r - n + t[2] - t[0])
            }
        },
        C = R(),
        M = "data-scroll-locked",
        T = function(e, t, n, r) {
            var o = e.left,
                i = e.top,
                a = e.right,
                u = e.gap;
            return void 0 === n && (n = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(u, "px ").concat(r, ";\n  }\n  body[").concat(M, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(r, ";"), "margin" === n && "\n    padding-left: ".concat(o, "px;\n    padding-top: ").concat(i, "px;\n    padding-right: ").concat(a, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u, "px ").concat(r, ";\n    "), "padding" === n && "padding-right: ".concat(u, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(f, " {\n    right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(d, " {\n    margin-right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(f, " .").concat(f, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(d, " .").concat(d, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(M, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(u, "px;\n  }\n")
        },
        N = function() {
            var e = parseInt(document.body.getAttribute(M) || "0", 10);
            return isFinite(e) ? e : 0
        },
        I = function() {
            l.useEffect(function() {
                return document.body.setAttribute(M, (N() + 1).toString()),
                    function() {
                        var e = N() - 1;
                        e <= 0 ? document.body.removeAttribute(M) : document.body.setAttribute(M, e.toString())
                    }
            }, [])
        },
        L = function(e) {
            var t = e.noRelative,
                n = e.noImportant,
                r = e.gapMode,
                o = void 0 === r ? "margin" : r;
            I();
            var i = l.useMemo(function() {
                return x(o)
            }, [o]);
            return l.createElement(C, {
                styles: T(i, !t, o, n ? "" : "!important")
            })
        },
        O = !1;
    if ("undefined" != typeof window) try {
        var F = Object.defineProperty({}, "passive", {
            get: function() {
                return O = !0, !0
            }
        });
        window.addEventListener("test", F, F), window.removeEventListener("test", F, F)
    } catch (e) {
        O = !1
    }
    var P = !!O && {
            passive: !1
        },
        j = function(e, t) {
            if (!(e instanceof Element)) return !1;
            var n = window.getComputedStyle(e);
            return "hidden" !== n[t] && (n.overflowY !== n.overflowX || "TEXTAREA" === e.tagName || "visible" !== n[t])
        },
        D = function(e, t) {
            var n = t.ownerDocument,
                r = t;
            do {
                if ("undefined" != typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), _(e, r)) {
                    var o = K(e, r);
                    if (o[1] > o[2]) return !0
                }
                r = r.parentNode
            } while (r && r !== n.body) return !1
        },
        _ = function(e, t) {
            return "v" === e ? j(t, "overflowY") : j(t, "overflowX")
        },
        K = function(e, t) {
            return "v" === e ? [t.scrollTop, t.scrollHeight, t.clientHeight] : [t.scrollLeft, t.scrollWidth, t.clientWidth]
        },
        W = function(e, t, n, r, o) {
            var i, a = (i = window.getComputedStyle(t).direction, "h" === e && "rtl" === i ? -1 : 1),
                u = a * r,
                c = n.target,
                s = t.contains(c),
                l = !1,
                f = u > 0,
                d = 0,
                h = 0;
            do {
                if (!c) break;
                var p = K(e, c),
                    v = p[0],
                    m = p[1] - p[2] - a * v;
                (v || m) && _(e, c) && (d += m, h += v);
                var y = c.parentNode;
                c = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y
            } while (!s && c !== document.body || s && (t.contains(c) || t === c)) return f && (o && 1 > Math.abs(d) || !o && u > d) ? l = !0 : !f && (o && 1 > Math.abs(h) || !o && -u > h) && (l = !0), l
        },
        z = function(e) {
            return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
        },
        B = function(e) {
            return [e.deltaX, e.deltaY]
        },
        H = function(e) {
            return e && "current" in e ? e.current : e
        },
        U = 0,
        G = [];
    let X = (a = function(e) {
        var t = l.useRef([]),
            n = l.useRef([0, 0]),
            r = l.useRef(),
            o = l.useState(U++)[0],
            i = l.useState(R)[0],
            a = l.useRef(e);
        l.useEffect(function() {
            a.current = e
        }, [e]), l.useEffect(function() {
            if (e.inert) {
                document.body.classList.add("block-interactivity-".concat(o));
                var t = (function(e, t, n) {
                    if (n || 2 == arguments.length)
                        for (var r, o = 0, i = t.length; o < i; o++) !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
                    return e.concat(r || Array.prototype.slice.call(t))
                })([e.lockRef.current], (e.shards || []).map(H), !0).filter(Boolean);
                return t.forEach(function(e) {
                        return e.classList.add("allow-interactivity-".concat(o))
                    }),
                    function() {
                        document.body.classList.remove("block-interactivity-".concat(o)), t.forEach(function(e) {
                            return e.classList.remove("allow-interactivity-".concat(o))
                        })
                    }
            }
        }, [e.inert, e.lockRef.current, e.shards]);
        var u = l.useCallback(function(e, t) {
                if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !a.current.allowPinchZoom;
                var o, i = z(e),
                    u = n.current,
                    c = "deltaX" in e ? e.deltaX : u[0] - i[0],
                    s = "deltaY" in e ? e.deltaY : u[1] - i[1],
                    l = e.target,
                    f = Math.abs(c) > Math.abs(s) ? "h" : "v";
                if ("touches" in e && "h" === f && "range" === l.type) return !1;
                var d = window.getSelection(),
                    h = d && d.anchorNode;
                if (h && (h === l || h.contains(l))) return !1;
                var p = D(f, l);
                if (!p) return !0;
                if (p ? o = f : (o = "v" === f ? "h" : "v", p = D(f, l)), !p) return !1;
                if (!r.current && "changedTouches" in e && (c || s) && (r.current = o), !o) return !0;
                var v = r.current || o;
                return W(v, t, e, "h" === v ? c : s, !0)
            }, []),
            c = l.useCallback(function(e) {
                if (G.length && G[G.length - 1] === i) {
                    var n = "deltaY" in e ? B(e) : z(e),
                        r = t.current.filter(function(t) {
                            var r;
                            return t.name === e.type && (t.target === e.target || e.target === t.shadowParent) && (r = t.delta, r[0] === n[0] && r[1] === n[1])
                        })[0];
                    if (r && r.should) {
                        e.cancelable && e.preventDefault();
                        return
                    }
                    if (!r) {
                        var o = (a.current.shards || []).map(H).filter(Boolean).filter(function(t) {
                            return t.contains(e.target)
                        });
                        (o.length > 0 ? u(e, o[0]) : !a.current.noIsolation) && e.cancelable && e.preventDefault()
                    }
                }
            }, []),
            s = l.useCallback(function(e, n, r, o) {
                var i = {
                    name: e,
                    delta: n,
                    target: r,
                    should: o,
                    shadowParent: function(e) {
                        for (var t = null; null !== e;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
                        return t
                    }(r)
                };
                t.current.push(i), setTimeout(function() {
                    t.current = t.current.filter(function(e) {
                        return e !== i
                    })
                }, 1)
            }, []),
            f = l.useCallback(function(e) {
                n.current = z(e), r.current = void 0
            }, []),
            d = l.useCallback(function(t) {
                s(t.type, B(t), t.target, u(t, e.lockRef.current))
            }, []),
            h = l.useCallback(function(t) {
                s(t.type, z(t), t.target, u(t, e.lockRef.current))
            }, []);
        l.useEffect(function() {
            return G.push(i), e.setCallbacks({
                    onScrollCapture: d,
                    onWheelCapture: d,
                    onTouchMoveCapture: h
                }), document.addEventListener("wheel", c, P), document.addEventListener("touchmove", c, P), document.addEventListener("touchstart", f, P),
                function() {
                    G = G.filter(function(e) {
                        return e !== i
                    }), document.removeEventListener("wheel", c, P), document.removeEventListener("touchmove", c, P), document.removeEventListener("touchstart", f, P)
                }
        }, []);
        var p = e.removeScrollBar,
            v = e.inert;
        return l.createElement(l.Fragment, null, v ? l.createElement(i, {
            styles: "\n  .block-interactivity-".concat(o, " {pointer-events: none;}\n  .allow-interactivity-").concat(o, " {pointer-events: all;}\n")
        }) : null, p ? l.createElement(L, {
            noRelative: e.noRelative,
            gapMode: e.gapMode
        }) : null)
    }, m.useMedium(a), b);
    var Y = l.forwardRef(function(e, t) {
        return l.createElement(g, c({}, e, {
            ref: t,
            sideCar: X
        }))
    });
    Y.classNames = g.classNames, e.s(["RemoveScroll", 0, Y], 21790)
}, 47176, e => {
    "use strict";
    var t = e.i(80506),
        n = e.i(13622),
        r = e.i(69742);
    e.s(["default", 0, ({
        condition: e,
        className: o = null
    }) => (0, t.jsx)(n.AnimatePresence, {
        children: e && (0, t.jsx)(r.motion.span, {
            initial: {
                opacity: 1
            },
            animate: {
                opacity: 0
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: .2
            },
            className: `outline-offset-0 absolute inset-0 outline-white outline-solid outline-hidden pointer-events-none ${o??""}`,
            "aria-hidden": !0
        })
    })])
}, 40226, 57784, 70460, e => {
    "use strict";
    var t = e.i(778),
        n = e.i(91967),
        r = e.i(56207),
        o = e.i(44977),
        i = e.i(93074),
        a = e.i(80506);

    function u(e) {
        let n = e + "CollectionProvider",
            [u, c] = (0, r.createContextScope)(n),
            [s, l] = u(n, {
                collectionRef: {
                    current: null
                },
                itemMap: new Map
            }),
            f = e => {
                let {
                    scope: n,
                    children: r
                } = e, o = t.default.useRef(null), i = t.default.useRef(new Map).current;
                return (0, a.jsx)(s, {
                    scope: n,
                    itemMap: i,
                    collectionRef: o,
                    children: r
                })
            };
        f.displayName = n;
        let d = e + "CollectionSlot",
            h = (0, i.createSlot)(d),
            p = t.default.forwardRef((e, t) => {
                let {
                    scope: n,
                    children: r
                } = e, i = l(d, n), u = (0, o.useComposedRefs)(t, i.collectionRef);
                return (0, a.jsx)(h, {
                    ref: u,
                    children: r
                })
            });
        p.displayName = d;
        let v = e + "CollectionItemSlot",
            m = "data-radix-collection-item",
            y = (0, i.createSlot)(v),
            g = t.default.forwardRef((e, n) => {
                let {
                    scope: r,
                    children: i,
                    ...u
                } = e, c = t.default.useRef(null), s = (0, o.useComposedRefs)(n, c), f = l(v, r);
                return t.default.useEffect(() => (f.itemMap.set(c, {
                    ref: c,
                    ...u
                }), () => void f.itemMap.delete(c))), (0, a.jsx)(y, { ...{
                        [m]: ""
                    },
                    ref: s,
                    children: i
                })
            });
        return g.displayName = v, [{
            Provider: f,
            Slot: p,
            ItemSlot: g
        }, function(n) {
            let r = l(e + "CollectionConsumer", n);
            return t.default.useCallback(() => {
                let e = r.collectionRef.current;
                if (!e) return [];
                let t = Array.from(e.querySelectorAll(`[${m}]`));
                return Array.from(r.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current))
            }, [r.collectionRef, r.itemMap])
        }, c]
    }
    var c = new WeakMap;

    function s(e, t) {
        var n, r;
        let o, i, a;
        if ("at" in Array.prototype) return Array.prototype.at.call(e, t);
        let u = (n = e, r = t, o = n.length, (a = (i = l(r)) >= 0 ? i : o + i) < 0 || a >= o ? -1 : a);
        return -1 === u ? void 0 : e[u]
    }

    function l(e) {
        return e != e || 0 === e ? 0 : Math.trunc(e)
    }(class e extends Map {#e;
        constructor(e) {
            super(e), this.#e = [...super.keys()], c.set(this, !0)
        }
        set(e, t) {
            return c.get(this) && (this.has(e) ? this.#e[this.#e.indexOf(e)] = e : this.#e.push(e)), super.set(e, t), this
        }
        insert(e, t, n) {
            let r, o = this.has(t),
                i = this.#e.length,
                a = l(e),
                u = a >= 0 ? a : i + a,
                c = u < 0 || u >= i ? -1 : u;
            if (c === this.size || o && c === this.size - 1 || -1 === c) return this.set(t, n), this;
            let s = this.size + +!o;
            a < 0 && u++;
            let f = [...this.#e],
                d = !1;
            for (let e = u; e < s; e++)
                if (u === e) {
                    let i = f[e];
                    f[e] === t && (i = f[e + 1]), o && this.delete(t), r = this.get(i), this.set(t, n)
                } else {
                    d || f[e - 1] !== t || (d = !0);
                    let n = f[d ? e : e - 1],
                        o = r;
                    r = this.get(n), this.delete(n), this.set(n, o)
                }
            return this
        }
        with(t, n, r) {
            let o = new e(this);
            return o.insert(t, n, r), o
        }
        before(e) {
            let t = this.#e.indexOf(e) - 1;
            if (!(t < 0)) return this.entryAt(t)
        }
        setBefore(e, t, n) {
            let r = this.#e.indexOf(e);
            return -1 === r ? this : this.insert(r, t, n)
        }
        after(e) {
            let t = this.#e.indexOf(e);
            if (-1 !== (t = -1 === t || t === this.size - 1 ? -1 : t + 1)) return this.entryAt(t)
        }
        setAfter(e, t, n) {
            let r = this.#e.indexOf(e);
            return -1 === r ? this : this.insert(r + 1, t, n)
        }
        first() {
            return this.entryAt(0)
        }
        last() {
            return this.entryAt(-1)
        }
        clear() {
            return this.#e = [], super.clear()
        }
        delete(e) {
            let t = super.delete(e);
            return t && this.#e.splice(this.#e.indexOf(e), 1), t
        }
        deleteAt(e) {
            let t = this.keyAt(e);
            return void 0 !== t && this.delete(t)
        }
        at(e) {
            let t = s(this.#e, e);
            if (void 0 !== t) return this.get(t)
        }
        entryAt(e) {
            let t = s(this.#e, e);
            if (void 0 !== t) return [t, this.get(t)]
        }
        indexOf(e) {
            return this.#e.indexOf(e)
        }
        keyAt(e) {
            return s(this.#e, e)
        }
        from(e, t) {
            let n = this.indexOf(e);
            if (-1 === n) return;
            let r = n + t;
            return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.at(r)
        }
        keyFrom(e, t) {
            let n = this.indexOf(e);
            if (-1 === n) return;
            let r = n + t;
            return r < 0 && (r = 0), r >= this.size && (r = this.size - 1), this.keyAt(r)
        }
        find(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return r;
                n++
            }
        }
        findIndex(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return n;
                n++
            }
            return -1
        }
        filter(t, n) {
            let r = [],
                o = 0;
            for (let e of this) Reflect.apply(t, n, [e, o, this]) && r.push(e), o++;
            return new e(r)
        }
        map(t, n) {
            let r = [],
                o = 0;
            for (let e of this) r.push([e[0], Reflect.apply(t, n, [e, o, this])]), o++;
            return new e(r)
        }
        reduce(...e) {
            let [t, n] = e, r = 0, o = n?? this.at(0);
            for (let n of this) o = 0 === r && 1 === e.length ? n : Reflect.apply(t, this, [o, n, r, this]), r++;
            return o
        }
        reduceRight(...e) {
            let [t, n] = e, r = n?? this.at(-1);
            for (let n = this.size - 1; n >= 0; n--) {
                let o = this.at(n);
                r = n === this.size - 1 && 1 === e.length ? o : Reflect.apply(t, this, [r, o, n, this])
            }
            return r
        }
        toSorted(t) {
            return new e([...this.entries()].sort(t))
        }
        toReversed() {
            let t = new e;
            for (let e = this.size - 1; e >= 0; e--) {
                let n = this.keyAt(e),
                    r = this.get(n);
                t.set(n, r)
            }
            return t
        }
        toSpliced(...t) {
            let n = [...this.entries()];
            return n.splice(...t), new e(n)
        }
        slice(t, n) {
            let r = new e,
                o = this.size - 1;
            if (void 0 === t) return r;
            t < 0 && (t += this.size), void 0 !== n && n > 0 && (o = n - 1);
            for (let e = t; e <= o; e++) {
                let t = this.keyAt(e),
                    n = this.get(t);
                r.set(t, n)
            }
            return r
        }
        every(e, t) {
            let n = 0;
            for (let r of this) {
                if (!Reflect.apply(e, t, [r, n, this])) return !1;
                n++
            }
            return !0
        }
        some(e, t) {
            let n = 0;
            for (let r of this) {
                if (Reflect.apply(e, t, [r, n, this])) return !0;
                n++
            }
            return !1
        }
    }), e.s(["createCollection", () => u], 57784);
    var f = e.i(61194),
        d = e.i(56872),
        h = e.i(52960),
        p = e.i(34643),
        v = t.createContext(void 0);

    function m(e) {
        let n = t.useContext(v);
        return e || n || "ltr"
    }
    e.s(["useDirection", () => m], 70460);
    var y = "rovingFocusGroup.onEntryFocus",
        g = {
            bubbles: !1,
            cancelable: !0
        },
        b = "RovingFocusGroup",
        [w, E, R] = u(b),
        [S, k] = (0, r.createContextScope)(b, [R]),
        [A, x] = S(b),
        C = t.forwardRef((e, t) => (0, a.jsx)(w.Provider, {
            scope: e.__scopeRovingFocusGroup,
            children: (0, a.jsx)(w.Slot, {
                scope: e.__scopeRovingFocusGroup,
                children: (0, a.jsx)(M, { ...e,
                    ref: t
                })
            })
        }));
    C.displayName = b;
    var M = t.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: i,
                orientation: u,
                loop: c = !1,
                dir: s,
                currentTabStopId: l,
                defaultCurrentTabStopId: f,
                onCurrentTabStopIdChange: v,
                onEntryFocus: w,
                preventScrollOnEntryFocus: R = !1,
                ...S
            } = e, k = t.useRef(null), x = (0, o.useComposedRefs)(r, k), C = m(s), [M, T] = (0, p.useControllableState)({
                prop: l,
                defaultProp: f?? null,
                onChange: v,
                caller: b
            }), [N, I] = t.useState(!1), O = (0, h.useCallbackRef)(w), F = E(i), P = t.useRef(!1), [j, D] = t.useState(0);
            return t.useEffect(() => {
                let e = k.current;
                if (e) return e.addEventListener(y, O), () => e.removeEventListener(y, O)
            }, [O]), (0, a.jsx)(A, {
                scope: i,
                orientation: u,
                dir: C,
                loop: c,
                currentTabStopId: M,
                onItemFocus: t.useCallback(e => T(e), [T]),
                onItemShiftTab: t.useCallback(() => I(!0), []),
                onFocusableItemAdd: t.useCallback(() => D(e => e + 1), []),
                onFocusableItemRemove: t.useCallback(() => D(e => e - 1), []),
                children: (0, a.jsx)(d.Primitive.div, {
                    tabIndex: N || 0 === j ? -1 : 0,
                    "data-orientation": u,
                    ...S,
                    ref: x,
                    style: {
                        outline: "none",
                        ...e.style
                    },
                    onMouseDown: (0, n.composeEventHandlers)(e.onMouseDown, () => {
                        P.current = !0
                    }),
                    onFocus: (0, n.composeEventHandlers)(e.onFocus, e => {
                        let t = !P.current;
                        if (e.target === e.currentTarget && t && !N) {
                            let t = new CustomEvent(y, g);
                            if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
                                let e = F().filter(e => e.focusable);
                                L([e.find(e => e.active), e.find(e => e.id === M), ...e].filter(Boolean).map(e => e.ref.current), R)
                            }
                        }
                        P.current = !1
                    }),
                    onBlur: (0, n.composeEventHandlers)(e.onBlur, () => I(!1))
                })
            })
        }),
        T = "RovingFocusGroupItem",
        N = t.forwardRef((e, r) => {
            let {
                __scopeRovingFocusGroup: o,
                focusable: i = !0,
                active: u = !1,
                tabStopId: c,
                children: s,
                ...l
            } = e, h = (0, f.useId)(), p = c || h, v = x(T, o), m = v.currentTabStopId === p, y = E(o), {
                onFocusableItemAdd: g,
                onFocusableItemRemove: b,
                currentTabStopId: R
            } = v;
            return t.useEffect(() => {
                if (i) return g(), () => b()
            }, [i, g, b]), (0, a.jsx)(w.ItemSlot, {
                scope: o,
                id: p,
                focusable: i,
                active: u,
                children: (0, a.jsx)(d.Primitive.span, {
                    tabIndex: m ? 0 : -1,
                    "data-orientation": v.orientation,
                    ...l,
                    ref: r,
                    onMouseDown: (0, n.composeEventHandlers)(e.onMouseDown, e => {
                        i ? v.onItemFocus(p) : e.preventDefault()
                    }),
                    onFocus: (0, n.composeEventHandlers)(e.onFocus, () => v.onItemFocus(p)),
                    onKeyDown: (0, n.composeEventHandlers)(e.onKeyDown, e => {
                        if ("Tab" === e.key && e.shiftKey) return void v.onItemShiftTab();
                        if (e.target !== e.currentTarget) return;
                        let t = function(e, t, n) {
                            var r;
                            let o = (r = e.key, "rtl" !== n ? r : "ArrowLeft" === r ? "ArrowRight" : "ArrowRight" === r ? "ArrowLeft" : r);
                            if (!("vertical" === t && ["ArrowLeft", "ArrowRight"].includes(o)) && !("horizontal" === t && ["ArrowUp", "ArrowDown"].includes(o))) return I[o]
                        }(e, v.orientation, v.dir);
                        if (void 0 !== t) {
                            if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
                            e.preventDefault();
                            let o = y().filter(e => e.focusable).map(e => e.ref.current);
                            if ("last" === t) o.reverse();
                            else if ("prev" === t || "next" === t) {
                                var n, r;
                                "prev" === t && o.reverse();
                                let i = o.indexOf(e.currentTarget);
                                o = v.loop ? (n = o, r = i + 1, n.map((e, t) => n[(r + t) % n.length])) : o.slice(i + 1)
                            }
                            setTimeout(() => L(o))
                        }
                    }),
                    children: "function" == typeof s ? s({
                        isCurrentTabStop: m,
                        hasTabStop: null != R
                    }) : s
                })
            })
        });
    N.displayName = T;
    var I = {
        ArrowLeft: "prev",
        ArrowUp: "prev",
        ArrowRight: "next",
        ArrowDown: "next",
        PageUp: "first",
        Home: "first",
        PageDown: "last",
        End: "last"
    };

    function L(e, t = !1) {
        let n = document.activeElement;
        for (let r of e)
            if (r === n || (r.focus({
                    preventScroll: t
                }), document.activeElement !== n)) return
    }
    e.s(["Item", () => N, "Root", () => C, "createRovingFocusGroupScope", () => k], 40226)
}]);