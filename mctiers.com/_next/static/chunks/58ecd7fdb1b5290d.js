(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 98631, e => {
    "use strict";
    var t = e.i(778);
    let n = e => {
            let t = e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase());
            return t.charAt(0).toUpperCase() + t.slice(1)
        },
        r = (...e) => e.filter((e, t, n) => !!e && "" !== e.trim() && n.indexOf(e) === t).join(" ").trim();
    var o = {
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
            size: n = 24,
            strokeWidth: a = 2,
            absoluteStrokeWidth: i,
            className: c = "",
            children: s,
            iconNode: l,
            ...u
        }, d) => (0, t.createElement)("svg", {
            ref: d,
            ...o,
            width: n,
            height: n,
            stroke: e,
            strokeWidth: i ? 24 * Number(a) / Number(n) : a,
            className: r("lucide", c),
            ...!s && !(e => {
                for (let t in e)
                    if (t.startsWith("aria-") || "role" === t || "title" === t) return !0
            })(u) && {
                "aria-hidden": "true"
            },
            ...u
        }, [...l.map(([e, n]) => (0, t.createElement)(e, n)), ...Array.isArray(s) ? s : [s]])),
        i = (e, o) => {
            let i = (0, t.forwardRef)(({
                className: i,
                ...c
            }, s) => (0, t.createElement)(a, {
                ref: s,
                iconNode: o,
                className: r(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`, `lucide-${e}`, i),
                ...c
            }));
            return i.displayName = n(e), i
        };
    e.s(["default", () => i], 98631)
}, 89535, e => {
    "use strict";
    let t;
    var n = e.i(778),
        r = e.i(44977),
        o = e.i(56872),
        a = e.i(52960),
        i = e.i(80506),
        c = "focusScope.autoFocusOnMount",
        s = "focusScope.autoFocusOnUnmount",
        l = {
            bubbles: !1,
            cancelable: !0
        },
        u = n.forwardRef((e, t) => {
            let {
                loop: u = !1,
                trapped: h = !1,
                onMountAutoFocus: v,
                onUnmountAutoFocus: g,
                ...y
            } = e, [b, w] = n.useState(null), x = (0, a.useCallbackRef)(v), E = (0, a.useCallbackRef)(g), C = n.useRef(null), N = (0, r.useComposedRefs)(t, e => w(e)), j = n.useRef({
                paused: !1,
                pause() {
                    this.paused = !0
                },
                resume() {
                    this.paused = !1
                }
            }).current;
            n.useEffect(() => {
                if (h) {
                    let e = function(e) {
                            if (j.paused || !b) return;
                            let t = e.target;
                            b.contains(t) ? C.current = t : p(C.current, {
                                select: !0
                            })
                        },
                        t = function(e) {
                            if (j.paused || !b) return;
                            let t = e.relatedTarget;
                            null !== t && (b.contains(t) || p(C.current, {
                                select: !0
                            }))
                        };
                    document.addEventListener("focusin", e), document.addEventListener("focusout", t);
                    let n = new MutationObserver(function(e) {
                        if (document.activeElement === document.body)
                            for (let t of e) t.removedNodes.length > 0 && p(b)
                    });
                    return b && n.observe(b, {
                        childList: !0,
                        subtree: !0
                    }), () => {
                        document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), n.disconnect()
                    }
                }
            }, [h, b, j.paused]), n.useEffect(() => {
                if (b) {
                    m.add(j);
                    let e = document.activeElement;
                    if (!b.contains(e)) {
                        let t = new CustomEvent(c, l);
                        b.addEventListener(c, x), b.dispatchEvent(t), t.defaultPrevented || (function(e, {
                            select: t = !1
                        } = {}) {
                            let n = document.activeElement;
                            for (let r of e)
                                if (p(r, {
                                        select: t
                                    }), document.activeElement !== n) return
                        }(d(b).filter(e => "A" !== e.tagName), {
                            select: !0
                        }), document.activeElement === e && p(b))
                    }
                    return () => {
                        b.removeEventListener(c, x), setTimeout(() => {
                            let t = new CustomEvent(s, l);
                            b.addEventListener(s, E), b.dispatchEvent(t), t.defaultPrevented || p(e?? document.body, {
                                select: !0
                            }), b.removeEventListener(s, E), m.remove(j)
                        }, 0)
                    }
                }
            }, [b, x, E, j]);
            let R = n.useCallback(e => {
                if (!u && !h || j.paused) return;
                let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                    n = document.activeElement;
                if (t && n) {
                    var r;
                    let t, o = e.currentTarget,
                        [a, i] = [f(t = d(r = o), r), f(t.reverse(), r)];
                    a && i ? e.shiftKey || n !== i ? e.shiftKey && n === a && (e.preventDefault(), u && p(i, {
                        select: !0
                    })) : (e.preventDefault(), u && p(a, {
                        select: !0
                    })) : n === o && e.preventDefault()
                }
            }, [u, h, j.paused]);
            return (0, i.jsx)(o.Primitive.div, {
                tabIndex: -1,
                ...y,
                ref: N,
                onKeyDown: R
            })
        });

    function d(e) {
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

    function f(e, t) {
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

    function p(e, {
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
    u.displayName = "FocusScope";
    var m = (t = [], {
        add(e) {
            let n = t[0];
            e !== n && n?.pause(), (t = h(t, e)).unshift(e)
        },
        remove(e) {
            t = h(t, e), t[0]?.resume()
        }
    });

    function h(e, t) {
        let n = [...e],
            r = n.indexOf(t);
        return -1 !== r && n.splice(r, 1), n
    }
    e.s(["FocusScope", () => u])
}, 71353, e => {
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
}, 21790, e => {
    "use strict";
    var t, n, r, o, a, i, c, s = function() {
        return (s = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e
        }).apply(this, arguments)
    };

    function l(e, t) {
        var n = {};
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
            for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++) 0 > t.indexOf(r[o]) && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
        return n
    }
    var u = ("function" == typeof SuppressedError && SuppressedError, e.i(778)),
        d = "right-scroll-bar-position",
        f = "width-before-scroll-bar";

    function p(e, t) {
        return "function" == typeof e ? e(t) : e && (e.current = t), e
    }
    var m = "undefined" != typeof window ? u.useLayoutEffect : u.useEffect,
        h = new WeakMap,
        v = (void 0 === t && (t = {}), (void 0 === n && (n = function(e) {
            return e
        }), r = [], o = !1, a = {
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
                var a = function() {
                        var n = t;
                        t = [], n.forEach(e)
                    },
                    i = function() {
                        return Promise.resolve().then(a)
                    };
                i(), r = {
                    push: function(e) {
                        t.push(e), i()
                    },
                    filter: function(e) {
                        return t = t.filter(e), r
                    }
                }
            }
        }).options = s({
            async: !0,
            ssr: !1
        }, t), a),
        g = function() {},
        y = u.forwardRef(function(e, t) {
            var n, r, o, a, i = u.useRef(null),
                c = u.useState({
                    onScrollCapture: g,
                    onWheelCapture: g,
                    onTouchMoveCapture: g
                }),
                d = c[0],
                f = c[1],
                y = e.forwardProps,
                b = e.children,
                w = e.className,
                x = e.removeScrollBar,
                E = e.enabled,
                C = e.shards,
                N = e.sideCar,
                j = e.noRelative,
                R = e.noIsolation,
                S = e.inert,
                k = e.allowPinchZoom,
                A = e.as,
                M = e.gapMode,
                P = l(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]),
                D = (n = [i, t], r = function(e) {
                    return n.forEach(function(t) {
                        return p(t, e)
                    })
                }, (o = (0, u.useState)(function() {
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
                })[0]).callback = r, a = o.facade, m(function() {
                    var e = h.get(a);
                    if (e) {
                        var t = new Set(e),
                            r = new Set(n),
                            o = a.current;
                        t.forEach(function(e) {
                            r.has(e) || p(e, null)
                        }), r.forEach(function(e) {
                            t.has(e) || p(e, o)
                        })
                    }
                    h.set(a, n)
                }, [n]), a),
                I = s(s({}, P), d);
            return u.createElement(u.Fragment, null, E && u.createElement(N, {
                sideCar: v,
                removeScrollBar: x,
                shards: C,
                noRelative: j,
                noIsolation: R,
                inert: S,
                setCallbacks: f,
                allowPinchZoom: !!k,
                lockRef: i,
                gapMode: M
            }), y ? u.cloneElement(u.Children.only(b), s(s({}, I), {
                ref: D
            })) : u.createElement(void 0 === A ? "div" : A, s({}, I, {
                className: w,
                ref: D
            }), b))
        });
    y.defaultProps = {
        enabled: !0,
        removeScrollBar: !0,
        inert: !1
    }, y.classNames = {
        fullWidth: f,
        zeroRight: d
    };
    var b = function(e) {
        var t = e.sideCar,
            n = l(e, ["sideCar"]);
        if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
        var r = t.read();
        if (!r) throw Error("Sidecar medium not found");
        return u.createElement(r, s({}, n))
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
                            var t = c || ("undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0);
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
        x = function() {
            var e = w();
            return function(t, n) {
                u.useEffect(function() {
                    return e.add(t),
                        function() {
                            e.remove()
                        }
                }, [t && n])
            }
        },
        E = function() {
            var e = x();
            return function(t) {
                return e(t.styles, t.dynamic), null
            }
        },
        C = {
            left: 0,
            top: 0,
            right: 0,
            gap: 0
        },
        N = function(e) {
            return parseInt(e || "", 10) || 0
        },
        j = function(e) {
            var t = window.getComputedStyle(document.body),
                n = t["padding" === e ? "paddingLeft" : "marginLeft"],
                r = t["padding" === e ? "paddingTop" : "marginTop"],
                o = t["padding" === e ? "paddingRight" : "marginRight"];
            return [N(n), N(r), N(o)]
        },
        R = function(e) {
            if (void 0 === e && (e = "margin"), "undefined" == typeof window) return C;
            var t = j(e),
                n = document.documentElement.clientWidth,
                r = window.innerWidth;
            return {
                left: t[0],
                top: t[1],
                right: t[2],
                gap: Math.max(0, r - n + t[2] - t[0])
            }
        },
        S = E(),
        k = "data-scroll-locked",
        A = function(e, t, n, r) {
            var o = e.left,
                a = e.top,
                i = e.right,
                c = e.gap;
            return void 0 === n && (n = "margin"), "\n  .".concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(c, "px ").concat(r, ";\n  }\n  body[").concat(k, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && "position: relative ".concat(r, ";"), "margin" === n && "\n    padding-left: ".concat(o, "px;\n    padding-top: ").concat(a, "px;\n    padding-right: ").concat(i, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(c, "px ").concat(r, ";\n    "), "padding" === n && "padding-right: ".concat(c, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(d, " {\n    right: ").concat(c, "px ").concat(r, ";\n  }\n  \n  .").concat(f, " {\n    margin-right: ").concat(c, "px ").concat(r, ";\n  }\n  \n  .").concat(d, " .").concat(d, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(f, " .").concat(f, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(k, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(c, "px;\n  }\n")
        },
        M = function() {
            var e = parseInt(document.body.getAttribute(k) || "0", 10);
            return isFinite(e) ? e : 0
        },
        P = function() {
            u.useEffect(function() {
                return document.body.setAttribute(k, (M() + 1).toString()),
                    function() {
                        var e = M() - 1;
                        e <= 0 ? document.body.removeAttribute(k) : document.body.setAttribute(k, e.toString())
                    }
            }, [])
        },
        D = function(e) {
            var t = e.noRelative,
                n = e.noImportant,
                r = e.gapMode,
                o = void 0 === r ? "margin" : r;
            P();
            var a = u.useMemo(function() {
                return R(o)
            }, [o]);
            return u.createElement(S, {
                styles: A(a, !t, o, n ? "" : "!important")
            })
        },
        I = !1;
    if ("undefined" != typeof window) try {
        var O = Object.defineProperty({}, "passive", {
            get: function() {
                return I = !0, !0
            }
        });
        window.addEventListener("test", O, O), window.removeEventListener("test", O, O)
    } catch (e) {
        I = !1
    }
    var T = !!I && {
            passive: !1
        },
        F = function(e, t) {
            if (!(e instanceof Element)) return !1;
            var n = window.getComputedStyle(e);
            return "hidden" !== n[t] && (n.overflowY !== n.overflowX || "TEXTAREA" === e.tagName || "visible" !== n[t])
        },
        L = function(e, t) {
            var n = t.ownerDocument,
                r = t;
            do {
                if ("undefined" != typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), _(e, r)) {
                    var o = W(e, r);
                    if (o[1] > o[2]) return !0
                }
                r = r.parentNode
            } while (r && r !== n.body) return !1
        },
        _ = function(e, t) {
            return "v" === e ? F(t, "overflowY") : F(t, "overflowX")
        },
        W = function(e, t) {
            return "v" === e ? [t.scrollTop, t.scrollHeight, t.clientHeight] : [t.scrollLeft, t.scrollWidth, t.clientWidth]
        },
        B = function(e, t, n, r, o) {
            var a, i = (a = window.getComputedStyle(t).direction, "h" === e && "rtl" === a ? -1 : 1),
                c = i * r,
                s = n.target,
                l = t.contains(s),
                u = !1,
                d = c > 0,
                f = 0,
                p = 0;
            do {
                if (!s) break;
                var m = W(e, s),
                    h = m[0],
                    v = m[1] - m[2] - i * h;
                (h || v) && _(e, s) && (f += v, p += h);
                var g = s.parentNode;
                s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g
            } while (!l && s !== document.body || l && (t.contains(s) || t === s)) return d && (o && 1 > Math.abs(f) || !o && c > f) ? u = !0 : !d && (o && 1 > Math.abs(p) || !o && -c > p) && (u = !0), u
        },
        $ = function(e) {
            return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
        },
        K = function(e) {
            return [e.deltaX, e.deltaY]
        },
        H = function(e) {
            return e && "current" in e ? e.current : e
        },
        U = 0,
        z = [];
    let X = (i = function(e) {
        var t = u.useRef([]),
            n = u.useRef([0, 0]),
            r = u.useRef(),
            o = u.useState(U++)[0],
            a = u.useState(E)[0],
            i = u.useRef(e);
        u.useEffect(function() {
            i.current = e
        }, [e]), u.useEffect(function() {
            if (e.inert) {
                document.body.classList.add("block-interactivity-".concat(o));
                var t = (function(e, t, n) {
                    if (n || 2 == arguments.length)
                        for (var r, o = 0, a = t.length; o < a; o++) !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
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
        var c = u.useCallback(function(e, t) {
                if ("touches" in e && 2 === e.touches.length || "wheel" === e.type && e.ctrlKey) return !i.current.allowPinchZoom;
                var o, a = $(e),
                    c = n.current,
                    s = "deltaX" in e ? e.deltaX : c[0] - a[0],
                    l = "deltaY" in e ? e.deltaY : c[1] - a[1],
                    u = e.target,
                    d = Math.abs(s) > Math.abs(l) ? "h" : "v";
                if ("touches" in e && "h" === d && "range" === u.type) return !1;
                var f = window.getSelection(),
                    p = f && f.anchorNode;
                if (p && (p === u || p.contains(u))) return !1;
                var m = L(d, u);
                if (!m) return !0;
                if (m ? o = d : (o = "v" === d ? "h" : "v", m = L(d, u)), !m) return !1;
                if (!r.current && "changedTouches" in e && (s || l) && (r.current = o), !o) return !0;
                var h = r.current || o;
                return B(h, t, e, "h" === h ? s : l, !0)
            }, []),
            s = u.useCallback(function(e) {
                if (z.length && z[z.length - 1] === a) {
                    var n = "deltaY" in e ? K(e) : $(e),
                        r = t.current.filter(function(t) {
                            var r;
                            return t.name === e.type && (t.target === e.target || e.target === t.shadowParent) && (r = t.delta, r[0] === n[0] && r[1] === n[1])
                        })[0];
                    if (r && r.should) {
                        e.cancelable && e.preventDefault();
                        return
                    }
                    if (!r) {
                        var o = (i.current.shards || []).map(H).filter(Boolean).filter(function(t) {
                            return t.contains(e.target)
                        });
                        (o.length > 0 ? c(e, o[0]) : !i.current.noIsolation) && e.cancelable && e.preventDefault()
                    }
                }
            }, []),
            l = u.useCallback(function(e, n, r, o) {
                var a = {
                    name: e,
                    delta: n,
                    target: r,
                    should: o,
                    shadowParent: function(e) {
                        for (var t = null; null !== e;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
                        return t
                    }(r)
                };
                t.current.push(a), setTimeout(function() {
                    t.current = t.current.filter(function(e) {
                        return e !== a
                    })
                }, 1)
            }, []),
            d = u.useCallback(function(e) {
                n.current = $(e), r.current = void 0
            }, []),
            f = u.useCallback(function(t) {
                l(t.type, K(t), t.target, c(t, e.lockRef.current))
            }, []),
            p = u.useCallback(function(t) {
                l(t.type, $(t), t.target, c(t, e.lockRef.current))
            }, []);
        u.useEffect(function() {
            return z.push(a), e.setCallbacks({
                    onScrollCapture: f,
                    onWheelCapture: f,
                    onTouchMoveCapture: p
                }), document.addEventListener("wheel", s, T), document.addEventListener("touchmove", s, T), document.addEventListener("touchstart", d, T),
                function() {
                    z = z.filter(function(e) {
                        return e !== a
                    }), document.removeEventListener("wheel", s, T), document.removeEventListener("touchmove", s, T), document.removeEventListener("touchstart", d, T)
                }
        }, []);
        var m = e.removeScrollBar,
            h = e.inert;
        return u.createElement(u.Fragment, null, h ? u.createElement(a, {
            styles: "\n  .block-interactivity-".concat(o, " {pointer-events: none;}\n  .allow-interactivity-").concat(o, " {pointer-events: all;}\n")
        }) : null, m ? u.createElement(D, {
            noRelative: e.noRelative,
            gapMode: e.gapMode
        }) : null)
    }, v.useMedium(i), b);
    var Y = u.forwardRef(function(e, t) {
        return u.createElement(y, s({}, e, {
            ref: t,
            sideCar: X
        }))
    });
    Y.classNames = y.classNames, e.s(["RemoveScroll", 0, Y], 21790)
}, 73772, e => {
    "use strict";
    var t = new WeakMap,
        n = new WeakMap,
        r = {},
        o = 0,
        a = function(e) {
            return e && (e.host || a(e.parentNode))
        },
        i = function(e, i, c, s) {
            var l = (Array.isArray(e) ? e : [e]).map(function(e) {
                if (i.contains(e)) return e;
                var t = a(e);
                return t && i.contains(t) ? t : (console.error("aria-hidden", e, "in not contained inside", i, ". Doing nothing"), null)
            }).filter(function(e) {
                return !!e
            });
            r[c] || (r[c] = new WeakMap);
            var u = r[c],
                d = [],
                f = new Set,
                p = new Set(l),
                m = function(e) {
                    !e || f.has(e) || (f.add(e), m(e.parentNode))
                };
            l.forEach(m);
            var h = function(e) {
                !e || p.has(e) || Array.prototype.forEach.call(e.children, function(e) {
                    if (f.has(e)) h(e);
                    else try {
                        var r = e.getAttribute(s),
                            o = null !== r && "false" !== r,
                            a = (t.get(e) || 0) + 1,
                            i = (u.get(e) || 0) + 1;
                        t.set(e, a), u.set(e, i), d.push(e), 1 === a && o && n.set(e, !0), 1 === i && e.setAttribute(c, "true"), o || e.setAttribute(s, "true")
                    } catch (t) {
                        console.error("aria-hidden: cannot operate on ", e, t)
                    }
                })
            };
            return h(i), f.clear(), o++,
                function() {
                    d.forEach(function(e) {
                        var r = t.get(e) - 1,
                            o = u.get(e) - 1;
                        t.set(e, r), u.set(e, o), r || (n.has(e) || e.removeAttribute(s), n.delete(e)), o || e.removeAttribute(c)
                    }), --o || (t = new WeakMap, t = new WeakMap, n = new WeakMap, r = {})
                }
        },
        c = function(e, t, n) {
            void 0 === n && (n = "data-aria-hidden");
            var r = Array.from(Array.isArray(e) ? e : [e]),
                o = t || ("undefined" == typeof document ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body);
            return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), i(r, o, n, "aria-hidden")) : function() {
                return null
            }
        };
    e.s(["hideOthers", () => c])
}, 70532, e => {
    "use strict";
    var t = e.i(80506),
        n = e.i(58294),
        r = e.i(8331),
        o = e.i(47800),
        a = e.i(778),
        i = e.i(91967),
        c = e.i(44977),
        s = e.i(56207),
        l = e.i(61194),
        u = e.i(34643),
        d = e.i(60212),
        f = e.i(89535),
        p = e.i(14952),
        m = e.i(53747),
        h = e.i(56872),
        v = e.i(71353),
        g = e.i(21790),
        y = e.i(73772),
        b = e.i(93074),
        w = "Dialog",
        [x, E] = (0, s.createContextScope)(w),
        [C, N] = x(w),
        j = e => {
            let {
                __scopeDialog: n,
                children: r,
                open: o,
                defaultOpen: i,
                onOpenChange: c,
                modal: s = !0
            } = e, d = a.useRef(null), f = a.useRef(null), [p, m] = (0, u.useControllableState)({
                prop: o,
                defaultProp: i?? !1,
                onChange: c,
                caller: w
            });
            return (0, t.jsx)(C, {
                scope: n,
                triggerRef: d,
                contentRef: f,
                contentId: (0, l.useId)(),
                titleId: (0, l.useId)(),
                descriptionId: (0, l.useId)(),
                open: p,
                onOpenChange: m,
                onOpenToggle: a.useCallback(() => m(e => !e), [m]),
                modal: s,
                children: r
            })
        };
    j.displayName = w;
    var R = "DialogTrigger",
        S = a.forwardRef((e, n) => {
            let {
                __scopeDialog: r,
                ...o
            } = e, a = N(R, r), s = (0, c.useComposedRefs)(n, a.triggerRef);
            return (0, t.jsx)(h.Primitive.button, {
                type: "button",
                "aria-haspopup": "dialog",
                "aria-expanded": a.open,
                "aria-controls": a.contentId,
                "data-state": X(a.open),
                ...o,
                ref: s,
                onClick: (0, i.composeEventHandlers)(e.onClick, a.onOpenToggle)
            })
        });
    S.displayName = R;
    var k = "DialogPortal",
        [A, M] = x(k, {
            forceMount: void 0
        }),
        P = e => {
            let {
                __scopeDialog: n,
                forceMount: r,
                children: o,
                container: i
            } = e, c = N(k, n);
            return (0, t.jsx)(A, {
                scope: n,
                forceMount: r,
                children: a.Children.map(o, e => (0, t.jsx)(m.Presence, {
                    present: r || c.open,
                    children: (0, t.jsx)(p.Portal, {
                        asChild: !0,
                        container: i,
                        children: e
                    })
                }))
            })
        };
    P.displayName = k;
    var D = "DialogOverlay",
        I = a.forwardRef((e, n) => {
            let r = M(D, e.__scopeDialog),
                {
                    forceMount: o = r.forceMount,
                    ...a
                } = e,
                i = N(D, e.__scopeDialog);
            return i.modal ? (0, t.jsx)(m.Presence, {
                present: o || i.open,
                children: (0, t.jsx)(T, { ...a,
                    ref: n
                })
            }) : null
        });
    I.displayName = D;
    var O = (0, b.createSlot)("DialogOverlay.RemoveScroll"),
        T = a.forwardRef((e, n) => {
            let {
                __scopeDialog: r,
                ...o
            } = e, a = N(D, r);
            return (0, t.jsx)(g.RemoveScroll, {
                as: O,
                allowPinchZoom: !0,
                shards: [a.contentRef],
                children: (0, t.jsx)(h.Primitive.div, {
                    "data-state": X(a.open),
                    ...o,
                    ref: n,
                    style: {
                        pointerEvents: "auto",
                        ...o.style
                    }
                })
            })
        }),
        F = "DialogContent",
        L = a.forwardRef((e, n) => {
            let r = M(F, e.__scopeDialog),
                {
                    forceMount: o = r.forceMount,
                    ...a
                } = e,
                i = N(F, e.__scopeDialog);
            return (0, t.jsx)(m.Presence, {
                present: o || i.open,
                children: i.modal ? (0, t.jsx)(_, { ...a,
                    ref: n
                }) : (0, t.jsx)(W, { ...a,
                    ref: n
                })
            })
        });
    L.displayName = F;
    var _ = a.forwardRef((e, n) => {
            let r = N(F, e.__scopeDialog),
                o = a.useRef(null),
                s = (0, c.useComposedRefs)(n, r.contentRef, o);
            return a.useEffect(() => {
                let e = o.current;
                if (e) return (0, y.hideOthers)(e)
            }, []), (0, t.jsx)(B, { ...e,
                ref: s,
                trapFocus: r.open,
                disableOutsidePointerEvents: !0,
                onCloseAutoFocus: (0, i.composeEventHandlers)(e.onCloseAutoFocus, e => {
                    e.preventDefault(), r.triggerRef.current?.focus()
                }),
                onPointerDownOutside: (0, i.composeEventHandlers)(e.onPointerDownOutside, e => {
                    let t = e.detail.originalEvent,
                        n = 0 === t.button && !0 === t.ctrlKey;
                    (2 === t.button || n) && e.preventDefault()
                }),
                onFocusOutside: (0, i.composeEventHandlers)(e.onFocusOutside, e => e.preventDefault())
            })
        }),
        W = a.forwardRef((e, n) => {
            let r = N(F, e.__scopeDialog),
                o = a.useRef(!1),
                i = a.useRef(!1);
            return (0, t.jsx)(B, { ...e,
                ref: n,
                trapFocus: !1,
                disableOutsidePointerEvents: !1,
                onCloseAutoFocus: t => {
                    e.onCloseAutoFocus?.(t), t.defaultPrevented || (o.current || r.triggerRef.current?.focus(), t.preventDefault()), o.current = !1, i.current = !1
                },
                onInteractOutside: t => {
                    e.onInteractOutside?.(t), t.defaultPrevented || (o.current = !0, "pointerdown" === t.detail.originalEvent.type && (i.current = !0));
                    let n = t.target;
                    r.triggerRef.current?.contains(n) && t.preventDefault(), "focusin" === t.detail.originalEvent.type && i.current && t.preventDefault()
                }
            })
        }),
        B = a.forwardRef((e, n) => {
            let {
                __scopeDialog: r,
                trapFocus: o,
                onOpenAutoFocus: i,
                onCloseAutoFocus: s,
                ...l
            } = e, u = N(F, r), p = a.useRef(null), m = (0, c.useComposedRefs)(n, p);
            return (0, v.useFocusGuards)(), (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)(f.FocusScope, {
                    asChild: !0,
                    loop: !0,
                    trapped: o,
                    onMountAutoFocus: i,
                    onUnmountAutoFocus: s,
                    children: (0, t.jsx)(d.DismissableLayer, {
                        role: "dialog",
                        id: u.contentId,
                        "aria-describedby": u.descriptionId,
                        "aria-labelledby": u.titleId,
                        "data-state": X(u.open),
                        ...l,
                        ref: m,
                        onDismiss: () => u.onOpenChange(!1)
                    })
                }), (0, t.jsxs)(t.Fragment, {
                    children: [(0, t.jsx)(G, {
                        titleId: u.titleId
                    }), (0, t.jsx)(V, {
                        contentRef: p,
                        descriptionId: u.descriptionId
                    })]
                })]
            })
        }),
        $ = "DialogTitle",
        K = a.forwardRef((e, n) => {
            let {
                __scopeDialog: r,
                ...o
            } = e, a = N($, r);
            return (0, t.jsx)(h.Primitive.h2, {
                id: a.titleId,
                ...o,
                ref: n
            })
        });
    K.displayName = $;
    var H = "DialogDescription";
    a.forwardRef((e, n) => {
        let {
            __scopeDialog: r,
            ...o
        } = e, a = N(H, r);
        return (0, t.jsx)(h.Primitive.p, {
            id: a.descriptionId,
            ...o,
            ref: n
        })
    }).displayName = H;
    var U = "DialogClose",
        z = a.forwardRef((e, n) => {
            let {
                __scopeDialog: r,
                ...o
            } = e, a = N(U, r);
            return (0, t.jsx)(h.Primitive.button, {
                type: "button",
                ...o,
                ref: n,
                onClick: (0, i.composeEventHandlers)(e.onClick, () => a.onOpenChange(!1))
            })
        });

    function X(e) {
        return e ? "open" : "closed"
    }
    z.displayName = U;
    var Y = "DialogTitleWarning",
        [Z, q] = (0, s.createContext)(Y, {
            contentName: F,
            titleName: $,
            docsSlug: "dialog"
        }),
        G = ({
            titleId: e
        }) => {
            let t = q(Y),
                n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
            return a.useEffect(() => {
                e && (document.getElementById(e) || console.error(n))
            }, [n, e]), null
        },
        V = ({
            contentRef: e,
            descriptionId: t
        }) => {
            let n = q("DialogDescriptionWarning"),
                r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
            return a.useEffect(() => {
                let n = e.current?.getAttribute("aria-describedby");
                t && n && (document.getElementById(t) || console.warn(r))
            }, [r, e, t]), null
        },
        J = e.i(98631);
    let Q = (0, J.default)("x", [
        ["path", {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }],
        ["path", {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }]
    ]);
    var ee = e.i(75157);

    function et({ ...e
    }) {
        return (0, t.jsx)(j, {
            "data-slot": "sheet",
            ...e
        })
    }

    function en({ ...e
    }) {
        return (0, t.jsx)(S, {
            "data-slot": "sheet-trigger",
            ...e
        })
    }

    function er({ ...e
    }) {
        return (0, t.jsx)(P, {
            "data-slot": "sheet-portal",
            ...e
        })
    }

    function eo({
        className: e,
        ...n
    }) {
        return (0, t.jsx)(I, {
            "data-slot": "sheet-overlay",
            className: (0, ee.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", e),
            ...n
        })
    }

    function ea({
        className: e,
        children: n,
        side: r = "right",
        ...o
    }) {
        return (0, t.jsxs)(er, {
            children: [(0, t.jsx)(eo, {}), (0, t.jsxs)(L, {
                "data-slot": "sheet-content",
                className: (0, ee.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500", "right" === r && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", "left" === r && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", "top" === r && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b", "bottom" === r && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t", e),
                ...o,
                children: [n, (0, t.jsxs)(z, {
                    className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
                    children: [(0, t.jsx)(Q, {
                        className: "size-4"
                    }), (0, t.jsx)("span", {
                        className: "sr-only",
                        children: "Close"
                    })]
                })]
            })]
        })
    }

    function ei({
        className: e,
        ...n
    }) {
        return (0, t.jsx)("div", {
            "data-slot": "sheet-footer",
            className: (0, ee.cn)("mt-auto flex flex-col gap-2 p-4", e),
            ...n
        })
    }

    function ec({
        className: e,
        ...n
    }) {
        return (0, t.jsx)(K, {
            "data-slot": "sheet-title",
            className: (0, ee.cn)("text-foreground font-semibold", e),
            ...n
        })
    }
    let es = (0, J.default)("menu", [
        ["path", {
            d: "M4 5h16",
            key: "1tepv9"
        }],
        ["path", {
            d: "M4 12h16",
            key: "1lakjw"
        }],
        ["path", {
            d: "M4 19h16",
            key: "1djgab"
        }]
    ]);
    e.s(["default", 0, () => {
        let e = (0, n.usePathname)();
        return (0, t.jsx)(t.Fragment, {
            children: (0, t.jsxs)(et, {
                children: [(0, t.jsx)(en, {
                    asChild: !0,
                    children: (0, t.jsx)("button", {
                        className: "md:hidden size-10 space-y-1 p-2",
                        children: (0, t.jsx)(es, {
                            className: "fill-muted"
                        })
                    })
                }), (0, t.jsxs)(ea, {
                    className: "bg-card",
                    children: [(0, t.jsx)(ec, {
                        hidden: !0,
                        children: "Mobile Navigation"
                    }), (0, t.jsx)("nav", {
                        className: "w-full h-fit space-y-0.5 my-12",
                        children: o.homeNavs.map((n, o) => (0, t.jsx)(a.default.Fragment, {
                            children: n.url && (n.disabled ? (0, t.jsxs)("span", {
                                className: "w-full h-14 flex items-center gap-2 p-2 rounded-lg text-muted text-xl font-semibold",
                                children: [(0, t.jsx)("img", {
                                    src: `/nav_icons/${n.disabledIcon}`,
                                    width: 32,
                                    height: 32,
                                    alt: `${n.title} icon`
                                }), n.title]
                            }) : (0, t.jsxs)(r.default, {
                                className: `w-full h-14 flex items-center gap-2 p-2 rounded-lg ${n.url===e?"bg-slate-500/10":"hover:bg-slate-500/10"}`,
                                href: n.url,
                                children: [(0, t.jsx)("img", {
                                    src: `/nav_icons/${n.icon}`,
                                    width: 32,
                                    height: 32,
                                    alt: n.icon
                                }), (0, t.jsx)("strong", {
                                    className: "font-semibold text-xl",
                                    children: n.title
                                })]
                            }))
                        }, o))
                    }), (0, t.jsxs)(ei, {
                        children: [(0, t.jsx)("h2", {
                            className: "text-xl text-disabled",
                            children: "Discords"
                        }), (0, t.jsx)("div", {
                            className: "flex flex-wrap gap-2",
                            children: o.gamemodes.map(({
                                icon: e,
                                discord: n
                            }, o) => (0, t.jsx)(a.default.Fragment, {
                                children: n && (0, t.jsx)("a", {
                                    className: "inline-flex m-0.5 gap-2 rounded-xl border-2 p-1 border-slate-500/10 hover:bg-slate-500/15 text-sm",
                                    href: n,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    onClick: function(ev) { ev.stopPropagation(); window.open(n, "_blank", "noopener,noreferrer"); ev.preventDefault(); },
                                    children: (0, t.jsx)("img", {
                                        src: `/tier_icons/${e}`,
                                        width: 36,
                                        height: 36,
                                        alt: ""
                                    })
                                })
                            }, o))
                        })]
                    })]
                })]
            })
        })
    }], 70532)
}]);