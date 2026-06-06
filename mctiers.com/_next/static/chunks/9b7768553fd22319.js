(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 46798, 1345, e => {
    "use strict";
    var t = e.i(80506),
        n = e.i(778),
        r = e.i(91967),
        o = e.i(44977),
        i = e.i(56207),
        l = e.i(60212),
        a = e.i(61194);
    let s = ["top", "right", "bottom", "left"],
        c = Math.min,
        u = Math.max,
        f = Math.round,
        d = Math.floor,
        p = e => ({
            x: e,
            y: e
        }),
        h = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        m = {
            start: "end",
            end: "start"
        };

    function g(e, t) {
        return "function" == typeof e ? e(t) : e
    }

    function x(e) {
        return e.split("-")[0]
    }

    function y(e) {
        return e.split("-")[1]
    }

    function w(e) {
        return "x" === e ? "y" : "x"
    }

    function v(e) {
        return "y" === e ? "height" : "width"
    }
    let b = new Set(["top", "bottom"]);

    function R(e) {
        return b.has(x(e)) ? "y" : "x"
    }

    function C(e) {
        return e.replace(/start|end/g, e => m[e])
    }
    let T = ["left", "right"],
        E = ["right", "left"],
        A = ["top", "bottom"],
        L = ["bottom", "top"];

    function P(e) {
        return e.replace(/left|right|bottom|top/g, e => h[e])
    }

    function S(e) {
        return "number" != typeof e ? {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...e
        } : {
            top: e,
            right: e,
            bottom: e,
            left: e
        }
    }

    function j(e) {
        let {
            x: t,
            y: n,
            width: r,
            height: o
        } = e;
        return {
            width: r,
            height: o,
            top: n,
            left: t,
            right: t + r,
            bottom: n + o,
            x: t,
            y: n
        }
    }

    function O(e, t, n) {
        let r, {
                reference: o,
                floating: i
            } = e,
            l = R(t),
            a = w(R(t)),
            s = v(a),
            c = x(t),
            u = "y" === l,
            f = o.x + o.width / 2 - i.width / 2,
            d = o.y + o.height / 2 - i.height / 2,
            p = o[s] / 2 - i[s] / 2;
        switch (c) {
            case "top":
                r = {
                    x: f,
                    y: o.y - i.height
                };
                break;
            case "bottom":
                r = {
                    x: f,
                    y: o.y + o.height
                };
                break;
            case "right":
                r = {
                    x: o.x + o.width,
                    y: d
                };
                break;
            case "left":
                r = {
                    x: o.x - i.width,
                    y: d
                };
                break;
            default:
                r = {
                    x: o.x,
                    y: o.y
                }
        }
        switch (y(t)) {
            case "start":
                r[a] -= p * (n && u ? -1 : 1);
                break;
            case "end":
                r[a] += p * (n && u ? -1 : 1)
        }
        return r
    }
    let k = async (e, t, n) => {
        let {
            placement: r = "bottom",
            strategy: o = "absolute",
            middleware: i = [],
            platform: l
        } = n, a = i.filter(Boolean), s = await (null == l.isRTL ? void 0 : l.isRTL(t)), c = await l.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }), {
            x: u,
            y: f
        } = O(c, r, s), d = r, p = {}, h = 0;
        for (let n = 0; n < a.length; n++) {
            let {
                name: i,
                fn: m
            } = a[n], {
                x: g,
                y: x,
                data: y,
                reset: w
            } = await m({
                x: u,
                y: f,
                initialPlacement: r,
                placement: d,
                strategy: o,
                middlewareData: p,
                rects: c,
                platform: l,
                elements: {
                    reference: e,
                    floating: t
                }
            });
            u = null != g ? g : u, f = null != x ? x : f, p = { ...p,
                [i]: { ...p[i],
                    ...y
                }
            }, w && h <= 50 && (h++, "object" == typeof w && (w.placement && (d = w.placement), w.rects && (c = !0 === w.rects ? await l.getElementRects({
                reference: e,
                floating: t,
                strategy: o
            }) : w.rects), {
                x: u,
                y: f
            } = O(c, d, s)), n = -1)
        }
        return {
            x: u,
            y: f,
            placement: d,
            strategy: o,
            middlewareData: p
        }
    };
    async function H(e, t) {
        var n;
        void 0 === t && (t = {});
        let {
            x: r,
            y: o,
            platform: i,
            rects: l,
            elements: a,
            strategy: s
        } = e, {
            boundary: c = "clippingAncestors",
            rootBoundary: u = "viewport",
            elementContext: f = "floating",
            altBoundary: d = !1,
            padding: p = 0
        } = g(t, e), h = S(p), m = a[d ? "floating" === f ? "reference" : "floating" : f], x = j(await i.getClippingRect({
            element: null == (n = await (null == i.isElement ? void 0 : i.isElement(m))) || n ? m : m.contextElement || await (null == i.getDocumentElement ? void 0 : i.getDocumentElement(a.floating)),
            boundary: c,
            rootBoundary: u,
            strategy: s
        })), y = "floating" === f ? {
            x: r,
            y: o,
            width: l.floating.width,
            height: l.floating.height
        } : l.reference, w = await (null == i.getOffsetParent ? void 0 : i.getOffsetParent(a.floating)), v = await (null == i.isElement ? void 0 : i.isElement(w)) && await (null == i.getScale ? void 0 : i.getScale(w)) || {
            x: 1,
            y: 1
        }, b = j(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: y,
            offsetParent: w,
            strategy: s
        }) : y);
        return {
            top: (x.top - b.top + h.top) / v.y,
            bottom: (b.bottom - x.bottom + h.bottom) / v.y,
            left: (x.left - b.left + h.left) / v.x,
            right: (b.right - x.right + h.right) / v.x
        }
    }

    function D(e, t) {
        return {
            top: e.top - t.height,
            right: e.right - t.width,
            bottom: e.bottom - t.height,
            left: e.left - t.width
        }
    }

    function M(e) {
        return s.some(t => e[t] >= 0)
    }
    let F = new Set(["left", "top"]);
    async function N(e, t) {
        let {
            placement: n,
            platform: r,
            elements: o
        } = e, i = await (null == r.isRTL ? void 0 : r.isRTL(o.floating)), l = x(n), a = y(n), s = "y" === R(n), c = F.has(l) ? -1 : 1, u = i && s ? -1 : 1, f = g(t, e), {
            mainAxis: d,
            crossAxis: p,
            alignmentAxis: h
        } = "number" == typeof f ? {
            mainAxis: f,
            crossAxis: 0,
            alignmentAxis: null
        } : {
            mainAxis: f.mainAxis || 0,
            crossAxis: f.crossAxis || 0,
            alignmentAxis: f.alignmentAxis
        };
        return a && "number" == typeof h && (p = "end" === a ? -1 * h : h), s ? {
            x: p * u,
            y: d * c
        } : {
            x: d * c,
            y: p * u
        }
    }

    function z() {
        return "undefined" != typeof window
    }

    function B(e) {
        return _(e) ? (e.nodeName || "").toLowerCase() : "#document"
    }

    function W(e) {
        var t;
        return (null == e || null == (t = e.ownerDocument) ? void 0 : t.defaultView) || window
    }

    function $(e) {
        var t;
        return null == (t = (_(e) ? e.ownerDocument : e.document) || window.document) ? void 0 : t.documentElement
    }

    function _(e) {
        return !!z() && (e instanceof Node || e instanceof W(e).Node)
    }

    function I(e) {
        return !!z() && (e instanceof Element || e instanceof W(e).Element)
    }

    function V(e) {
        return !!z() && (e instanceof HTMLElement || e instanceof W(e).HTMLElement)
    }

    function Y(e) {
        return !!z() && "undefined" != typeof ShadowRoot && (e instanceof ShadowRoot || e instanceof W(e).ShadowRoot)
    }
    let X = new Set(["inline", "contents"]);

    function q(e) {
        let {
            overflow: t,
            overflowX: n,
            overflowY: r,
            display: o
        } = eo(e);
        return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !X.has(o)
    }
    let K = new Set(["table", "td", "th"]),
        U = [":popover-open", ":modal"];

    function G(e) {
        return U.some(t => {
            try {
                return e.matches(t)
            } catch (e) {
                return !1
            }
        })
    }
    let J = ["transform", "translate", "scale", "rotate", "perspective"],
        Q = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
        Z = ["paint", "layout", "strict", "content"];

    function ee(e) {
        let t = et(),
            n = I(e) ? eo(e) : e;
        return J.some(e => !!n[e] && "none" !== n[e]) || !!n.containerType && "normal" !== n.containerType || !t && !!n.backdropFilter && "none" !== n.backdropFilter || !t && !!n.filter && "none" !== n.filter || Q.some(e => (n.willChange || "").includes(e)) || Z.some(e => (n.contain || "").includes(e))
    }

    function et() {
        return "undefined" != typeof CSS && !!CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")
    }
    let en = new Set(["html", "body", "#document"]);

    function er(e) {
        return en.has(B(e))
    }

    function eo(e) {
        return W(e).getComputedStyle(e)
    }

    function ei(e) {
        return I(e) ? {
            scrollLeft: e.scrollLeft,
            scrollTop: e.scrollTop
        } : {
            scrollLeft: e.scrollX,
            scrollTop: e.scrollY
        }
    }

    function el(e) {
        if ("html" === B(e)) return e;
        let t = e.assignedSlot || e.parentNode || Y(e) && e.host || $(e);
        return Y(t) ? t.host : t
    }

    function ea(e, t, n) {
        var r;
        void 0 === t && (t = []), void 0 === n && (n = !0);
        let o = function e(t) {
                let n = el(t);
                return er(n) ? t.ownerDocument ? t.ownerDocument.body : t.body : V(n) && q(n) ? n : e(n)
            }(e),
            i = o === (null == (r = e.ownerDocument) ? void 0 : r.body),
            l = W(o);
        if (i) {
            let e = es(l);
            return t.concat(l, l.visualViewport || [], q(o) ? o : [], e && n ? ea(e) : [])
        }
        return t.concat(o, ea(o, [], n))
    }

    function es(e) {
        return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
    }

    function ec(e) {
        let t = eo(e),
            n = parseFloat(t.width) || 0,
            r = parseFloat(t.height) || 0,
            o = V(e),
            i = o ? e.offsetWidth : n,
            l = o ? e.offsetHeight : r,
            a = f(n) !== i || f(r) !== l;
        return a && (n = i, r = l), {
            width: n,
            height: r,
            $: a
        }
    }

    function eu(e) {
        return I(e) ? e : e.contextElement
    }

    function ef(e) {
        let t = eu(e);
        if (!V(t)) return p(1);
        let n = t.getBoundingClientRect(),
            {
                width: r,
                height: o,
                $: i
            } = ec(t),
            l = (i ? f(n.width) : n.width) / r,
            a = (i ? f(n.height) : n.height) / o;
        return l && Number.isFinite(l) || (l = 1), a && Number.isFinite(a) || (a = 1), {
            x: l,
            y: a
        }
    }
    let ed = p(0);

    function ep(e) {
        let t = W(e);
        return et() && t.visualViewport ? {
            x: t.visualViewport.offsetLeft,
            y: t.visualViewport.offsetTop
        } : ed
    }

    function eh(e, t, n, r) {
        var o;
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        let i = e.getBoundingClientRect(),
            l = eu(e),
            a = p(1);
        t && (r ? I(r) && (a = ef(r)) : a = ef(e));
        let s = (void 0 === (o = n) && (o = !1), r && (!o || r === W(l)) && o) ? ep(l) : p(0),
            c = (i.left + s.x) / a.x,
            u = (i.top + s.y) / a.y,
            f = i.width / a.x,
            d = i.height / a.y;
        if (l) {
            let e = W(l),
                t = r && I(r) ? W(r) : r,
                n = e,
                o = es(n);
            for (; o && r && t !== n;) {
                let e = ef(o),
                    t = o.getBoundingClientRect(),
                    r = eo(o),
                    i = t.left + (o.clientLeft + parseFloat(r.paddingLeft)) * e.x,
                    l = t.top + (o.clientTop + parseFloat(r.paddingTop)) * e.y;
                c *= e.x, u *= e.y, f *= e.x, d *= e.y, c += i, u += l, o = es(n = W(o))
            }
        }
        return j({
            width: f,
            height: d,
            x: c,
            y: u
        })
    }

    function em(e, t) {
        let n = ei(e).scrollLeft;
        return t ? t.left + n : eh($(e)).left + n
    }

    function eg(e, t) {
        let n = e.getBoundingClientRect();
        return {
            x: n.left + t.scrollLeft - em(e, n),
            y: n.top + t.scrollTop
        }
    }
    let ex = new Set(["absolute", "fixed"]);

    function ey(e, t, n) {
        var r;
        let o;
        if ("viewport" === t) o = function(e, t) {
            let n = W(e),
                r = $(e),
                o = n.visualViewport,
                i = r.clientWidth,
                l = r.clientHeight,
                a = 0,
                s = 0;
            if (o) {
                i = o.width, l = o.height;
                let e = et();
                (!e || e && "fixed" === t) && (a = o.offsetLeft, s = o.offsetTop)
            }
            let c = em(r);
            if (c <= 0) {
                let e = r.ownerDocument,
                    t = e.body,
                    n = getComputedStyle(t),
                    o = "CSS1Compat" === e.compatMode && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0,
                    l = Math.abs(r.clientWidth - t.clientWidth - o);
                l <= 25 && (i -= l)
            } else c <= 25 && (i += c);
            return {
                width: i,
                height: l,
                x: a,
                y: s
            }
        }(e, n);
        else if ("document" === t) {
            let t, n, i, l, a, s, c;
            r = $(e), t = $(r), n = ei(r), i = r.ownerDocument.body, l = u(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth), a = u(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight), s = -n.scrollLeft + em(r), c = -n.scrollTop, "rtl" === eo(i).direction && (s += u(t.clientWidth, i.clientWidth) - l), o = {
                width: l,
                height: a,
                x: s,
                y: c
            }
        } else if (I(t)) {
            let e, r, i, l, a, s;
            r = (e = eh(t, !0, "fixed" === n)).top + t.clientTop, i = e.left + t.clientLeft, l = V(t) ? ef(t) : p(1), a = t.clientWidth * l.x, s = t.clientHeight * l.y, o = {
                width: a,
                height: s,
                x: i * l.x,
                y: r * l.y
            }
        } else {
            let n = ep(e);
            o = {
                x: t.x - n.x,
                y: t.y - n.y,
                width: t.width,
                height: t.height
            }
        }
        return j(o)
    }

    function ew(e) {
        return "static" === eo(e).position
    }

    function ev(e, t) {
        if (!V(e) || "fixed" === eo(e).position) return null;
        if (t) return t(e);
        let n = e.offsetParent;
        return $(e) === n && (n = n.ownerDocument.body), n
    }

    function eb(e, t) {
        var n;
        let r = W(e);
        if (G(e)) return r;
        if (!V(e)) {
            let t = el(e);
            for (; t && !er(t);) {
                if (I(t) && !ew(t)) return t;
                t = el(t)
            }
            return r
        }
        let o = ev(e, t);
        for (; o && (n = o, K.has(B(n))) && ew(o);) o = ev(o, t);
        return o && er(o) && ew(o) && !ee(o) ? r : o || function(e) {
            let t = el(e);
            for (; V(t) && !er(t);) {
                if (ee(t)) return t;
                if (G(t)) break;
                t = el(t)
            }
            return null
        }(e) || r
    }
    let eR = async function(e) {
            let t = this.getOffsetParent || eb,
                n = this.getDimensions,
                r = await n(e.floating);
            return {
                reference: function(e, t, n) {
                    let r = V(t),
                        o = $(t),
                        i = "fixed" === n,
                        l = eh(e, !0, i, t),
                        a = {
                            scrollLeft: 0,
                            scrollTop: 0
                        },
                        s = p(0);
                    if (r || !r && !i)
                        if (("body" !== B(t) || q(o)) && (a = ei(t)), r) {
                            let e = eh(t, !0, i, t);
                            s.x = e.x + t.clientLeft, s.y = e.y + t.clientTop
                        } else o && (s.x = em(o));
                    i && !r && o && (s.x = em(o));
                    let c = !o || r || i ? p(0) : eg(o, a);
                    return {
                        x: l.left + a.scrollLeft - s.x - c.x,
                        y: l.top + a.scrollTop - s.y - c.y,
                        width: l.width,
                        height: l.height
                    }
                }(e.reference, await t(e.floating), e.strategy),
                floating: {
                    x: 0,
                    y: 0,
                    width: r.width,
                    height: r.height
                }
            }
        },
        eC = {
            convertOffsetParentRelativeRectToViewportRelativeRect: function(e) {
                let {
                    elements: t,
                    rect: n,
                    offsetParent: r,
                    strategy: o
                } = e, i = "fixed" === o, l = $(r), a = !!t && G(t.floating);
                if (r === l || a && i) return n;
                let s = {
                        scrollLeft: 0,
                        scrollTop: 0
                    },
                    c = p(1),
                    u = p(0),
                    f = V(r);
                if ((f || !f && !i) && (("body" !== B(r) || q(l)) && (s = ei(r)), V(r))) {
                    let e = eh(r);
                    c = ef(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop
                }
                let d = !l || f || i ? p(0) : eg(l, s);
                return {
                    width: n.width * c.x,
                    height: n.height * c.y,
                    x: n.x * c.x - s.scrollLeft * c.x + u.x + d.x,
                    y: n.y * c.y - s.scrollTop * c.y + u.y + d.y
                }
            },
            getDocumentElement: $,
            getClippingRect: function(e) {
                let {
                    element: t,
                    boundary: n,
                    rootBoundary: r,
                    strategy: o
                } = e, i = [..."clippingAncestors" === n ? G(t) ? [] : function(e, t) {
                    let n = t.get(e);
                    if (n) return n;
                    let r = ea(e, [], !1).filter(e => I(e) && "body" !== B(e)),
                        o = null,
                        i = "fixed" === eo(e).position,
                        l = i ? el(e) : e;
                    for (; I(l) && !er(l);) {
                        let t = eo(l),
                            n = ee(l);
                        n || "fixed" !== t.position || (o = null), (i ? !n && !o : !n && "static" === t.position && !!o && ex.has(o.position) || q(l) && !n && function e(t, n) {
                            let r = el(t);
                            return !(r === n || !I(r) || er(r)) && ("fixed" === eo(r).position || e(r, n))
                        }(e, l)) ? r = r.filter(e => e !== l) : o = t, l = el(l)
                    }
                    return t.set(e, r), r
                }(t, this._c) : [].concat(n), r], l = i[0], a = i.reduce((e, n) => {
                    let r = ey(t, n, o);
                    return e.top = u(r.top, e.top), e.right = c(r.right, e.right), e.bottom = c(r.bottom, e.bottom), e.left = u(r.left, e.left), e
                }, ey(t, l, o));
                return {
                    width: a.right - a.left,
                    height: a.bottom - a.top,
                    x: a.left,
                    y: a.top
                }
            },
            getOffsetParent: eb,
            getElementRects: eR,
            getClientRects: function(e) {
                return Array.from(e.getClientRects())
            },
            getDimensions: function(e) {
                let {
                    width: t,
                    height: n
                } = ec(e);
                return {
                    width: t,
                    height: n
                }
            },
            getScale: ef,
            isElement: I,
            isRTL: function(e) {
                return "rtl" === eo(e).direction
            }
        };

    function eT(e, t) {
        return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
    }
    let eE = e => ({
        name: "arrow",
        options: e,
        async fn(t) {
            let {
                x: n,
                y: r,
                placement: o,
                rects: i,
                platform: l,
                elements: a,
                middlewareData: s
            } = t, {
                element: f,
                padding: d = 0
            } = g(e, t) || {};
            if (null == f) return {};
            let p = S(d),
                h = {
                    x: n,
                    y: r
                },
                m = w(R(o)),
                x = v(m),
                b = await l.getDimensions(f),
                C = "y" === m,
                T = C ? "clientHeight" : "clientWidth",
                E = i.reference[x] + i.reference[m] - h[m] - i.floating[x],
                A = h[m] - i.reference[m],
                L = await (null == l.getOffsetParent ? void 0 : l.getOffsetParent(f)),
                P = L ? L[T] : 0;
            P && await (null == l.isElement ? void 0 : l.isElement(L)) || (P = a.floating[T] || i.floating[x]);
            let j = P / 2 - b[x] / 2 - 1,
                O = c(p[C ? "top" : "left"], j),
                k = c(p[C ? "bottom" : "right"], j),
                H = P - b[x] - k,
                D = P / 2 - b[x] / 2 + (E / 2 - A / 2),
                M = u(O, c(D, H)),
                F = !s.arrow && null != y(o) && D !== M && i.reference[x] / 2 - (D < O ? O : k) - b[x] / 2 < 0,
                N = F ? D < O ? D - O : D - H : 0;
            return {
                [m]: h[m] + N,
                data: {
                    [m]: M,
                    centerOffset: D - M - N,
                    ...F && {
                        alignmentOffset: N
                    }
                },
                reset: F
            }
        }
    });
    var eA = e.i(50919),
        eL = "undefined" != typeof document ? n.useLayoutEffect : function() {};

    function eP(e, t) {
        let n, r, o;
        if (e === t) return !0;
        if (typeof e != typeof t) return !1;
        if ("function" == typeof e && e.toString() === t.toString()) return !0;
        if (e && t && "object" == typeof e) {
            if (Array.isArray(e)) {
                if ((n = e.length) !== t.length) return !1;
                for (r = n; 0 != r--;)
                    if (!eP(e[r], t[r])) return !1;
                return !0
            }
            if ((n = (o = Object.keys(e)).length) !== Object.keys(t).length) return !1;
            for (r = n; 0 != r--;)
                if (!({}).hasOwnProperty.call(t, o[r])) return !1;
            for (r = n; 0 != r--;) {
                let n = o[r];
                if (("_owner" !== n || !e.$$typeof) && !eP(e[n], t[n])) return !1
            }
            return !0
        }
        return e != e && t != t
    }

    function eS(e) {
        return "undefined" == typeof window ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
    }

    function ej(e, t) {
        let n = eS(e);
        return Math.round(t * n) / n
    }

    function eO(e) {
        let t = n.useRef(e);
        return eL(() => {
            t.current = e
        }), t
    }
    var ek = e.i(56872),
        eH = n.forwardRef((e, n) => {
            let {
                children: r,
                width: o = 10,
                height: i = 5,
                ...l
            } = e;
            return (0, t.jsx)(ek.Primitive.svg, { ...l,
                ref: n,
                width: o,
                height: i,
                viewBox: "0 0 30 10",
                preserveAspectRatio: "none",
                children: e.asChild ? r : (0, t.jsx)("polygon", {
                    points: "0,0 30,0 15,10"
                })
            })
        });
    eH.displayName = "Arrow";
    var eD = e.i(52960),
        eM = e.i(27864),
        eF = "Popper",
        [eN, ez] = (0, i.createContextScope)(eF),
        [eB, eW] = eN(eF),
        e$ = e => {
            let {
                __scopePopper: r,
                children: o
            } = e, [i, l] = n.useState(null);
            return (0, t.jsx)(eB, {
                scope: r,
                anchor: i,
                onAnchorChange: l,
                children: o
            })
        };
    e$.displayName = eF;
    var e_ = "PopperAnchor",
        eI = n.forwardRef((e, r) => {
            let {
                __scopePopper: i,
                virtualRef: l,
                ...a
            } = e, s = eW(e_, i), c = n.useRef(null), u = (0, o.useComposedRefs)(r, c), f = n.useRef(null);
            return n.useEffect(() => {
                let e = f.current;
                f.current = l?.current || c.current, e !== f.current && s.onAnchorChange(f.current)
            }), l ? null : (0, t.jsx)(ek.Primitive.div, { ...a,
                ref: u
            })
        });
    eI.displayName = e_;
    var eV = "PopperContent",
        [eY, eX] = eN(eV),
        eq = n.forwardRef((e, r) => {
            var i, l, a, s, f, p, h, m, b, S, j, O, z;
            let {
                __scopePopper: B,
                side: W = "bottom",
                sideOffset: _ = 0,
                align: I = "center",
                alignOffset: V = 0,
                arrowPadding: Y = 0,
                avoidCollisions: X = !0,
                collisionBoundary: q = [],
                collisionPadding: K = 0,
                sticky: U = "partial",
                hideWhenDetached: G = !1,
                updatePositionStrategy: J = "optimized",
                onPlaced: Q,
                ...Z
            } = e, ee = eW(eV, B), [et, en] = n.useState(null), er = (0, o.useComposedRefs)(r, e => en(e)), [eo, ei] = n.useState(null), el = function(e) {
                let [t, r] = n.useState(void 0);
                return (0, eM.useLayoutEffect)(() => {
                    if (e) {
                        r({
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        });
                        let t = new ResizeObserver(t => {
                            let n, o;
                            if (!Array.isArray(t) || !t.length) return;
                            let i = t[0];
                            if ("borderBoxSize" in i) {
                                let e = i.borderBoxSize,
                                    t = Array.isArray(e) ? e[0] : e;
                                n = t.inlineSize, o = t.blockSize
                            } else n = e.offsetWidth, o = e.offsetHeight;
                            r({
                                width: n,
                                height: o
                            })
                        });
                        return t.observe(e, {
                            box: "border-box"
                        }), () => t.unobserve(e)
                    }
                    r(void 0)
                }, [e]), t
            }(eo), es = el?.width?? 0, ec = el?.height?? 0, ef = "number" == typeof K ? K : {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                ...K
            }, ed = Array.isArray(q) ? q : [q], ep = ed.length > 0, em = {
                padding: ef,
                boundary: ed.filter(eJ),
                altBoundary: ep
            }, {
                refs: eg,
                floatingStyles: ex,
                placement: ey,
                isPositioned: ew,
                middlewareData: ev
            } = function(e) {
                void 0 === e && (e = {});
                let {
                    placement: t = "bottom",
                    strategy: r = "absolute",
                    middleware: o = [],
                    platform: i,
                    elements: {
                        reference: l,
                        floating: a
                    } = {},
                    transform: s = !0,
                    whileElementsMounted: c,
                    open: u
                } = e, [f, d] = n.useState({
                    x: 0,
                    y: 0,
                    strategy: r,
                    placement: t,
                    middlewareData: {},
                    isPositioned: !1
                }), [p, h] = n.useState(o);
                eP(p, o) || h(o);
                let [m, g] = n.useState(null), [x, y] = n.useState(null), w = n.useCallback(e => {
                    e !== C.current && (C.current = e, g(e))
                }, []), v = n.useCallback(e => {
                    e !== T.current && (T.current = e, y(e))
                }, []), b = l || m, R = a || x, C = n.useRef(null), T = n.useRef(null), E = n.useRef(f), A = null != c, L = eO(c), P = eO(i), S = eO(u), j = n.useCallback(() => {
                    var e, n;
                    let o, i, l;
                    if (!C.current || !T.current) return;
                    let a = {
                        placement: t,
                        strategy: r,
                        middleware: p
                    };
                    P.current && (a.platform = P.current), (e = C.current, n = T.current, o = new Map, l = { ...(i = {
                            platform: eC,
                            ...a
                        }).platform,
                        _c: o
                    }, k(e, n, { ...i,
                        platform: l
                    })).then(e => {
                        let t = { ...e,
                            isPositioned: !1 !== S.current
                        };
                        O.current && !eP(E.current, t) && (E.current = t, eA.flushSync(() => {
                            d(t)
                        }))
                    })
                }, [p, t, r, P, S]);
                eL(() => {
                    !1 === u && E.current.isPositioned && (E.current.isPositioned = !1, d(e => ({ ...e,
                        isPositioned: !1
                    })))
                }, [u]);
                let O = n.useRef(!1);
                eL(() => (O.current = !0, () => {
                    O.current = !1
                }), []), eL(() => {
                    if (b && (C.current = b), R && (T.current = R), b && R) {
                        if (L.current) return L.current(b, R, j);
                        j()
                    }
                }, [b, R, j, L, A]);
                let H = n.useMemo(() => ({
                        reference: C,
                        floating: T,
                        setReference: w,
                        setFloating: v
                    }), [w, v]),
                    D = n.useMemo(() => ({
                        reference: b,
                        floating: R
                    }), [b, R]),
                    M = n.useMemo(() => {
                        let e = {
                            position: r,
                            left: 0,
                            top: 0
                        };
                        if (!D.floating) return e;
                        let t = ej(D.floating, f.x),
                            n = ej(D.floating, f.y);
                        return s ? { ...e,
                            transform: "translate(" + t + "px, " + n + "px)",
                            ...eS(D.floating) >= 1.5 && {
                                willChange: "transform"
                            }
                        } : {
                            position: r,
                            left: t,
                            top: n
                        }
                    }, [r, s, D.floating, f.x, f.y]);
                return n.useMemo(() => ({ ...f,
                    update: j,
                    refs: H,
                    elements: D,
                    floatingStyles: M
                }), [f, j, H, D, M])
            }({
                strategy: "fixed",
                placement: W + ("center" !== I ? "-" + I : ""),
                whileElementsMounted: (...e) => (function(e, t, n, r) {
                    let o;
                    void 0 === r && (r = {});
                    let {
                        ancestorScroll: i = !0,
                        ancestorResize: l = !0,
                        elementResize: a = "function" == typeof ResizeObserver,
                        layoutShift: s = "function" == typeof IntersectionObserver,
                        animationFrame: f = !1
                    } = r, p = eu(e), h = i || l ? [...p ? ea(p) : [], ...ea(t)] : [];
                    h.forEach(e => {
                        i && e.addEventListener("scroll", n, {
                            passive: !0
                        }), l && e.addEventListener("resize", n)
                    });
                    let m = p && s ? function(e, t) {
                            let n, r = null,
                                o = $(e);

                            function i() {
                                var e;
                                clearTimeout(n), null == (e = r) || e.disconnect(), r = null
                            }
                            return ! function l(a, s) {
                                void 0 === a && (a = !1), void 0 === s && (s = 1), i();
                                let f = e.getBoundingClientRect(),
                                    {
                                        left: p,
                                        top: h,
                                        width: m,
                                        height: g
                                    } = f;
                                if (a || t(), !m || !g) return;
                                let x = {
                                        rootMargin: -d(h) + "px " + -d(o.clientWidth - (p + m)) + "px " + -d(o.clientHeight - (h + g)) + "px " + -d(p) + "px",
                                        threshold: u(0, c(1, s)) || 1
                                    },
                                    y = !0;

                                function w(t) {
                                    let r = t[0].intersectionRatio;
                                    if (r !== s) {
                                        if (!y) return l();
                                        r ? l(!1, r) : n = setTimeout(() => {
                                            l(!1, 1e-7)
                                        }, 1e3)
                                    }
                                    1 !== r || eT(f, e.getBoundingClientRect()) || l(), y = !1
                                }
                                try {
                                    r = new IntersectionObserver(w, { ...x,
                                        root: o.ownerDocument
                                    })
                                } catch (e) {
                                    r = new IntersectionObserver(w, x)
                                }
                                r.observe(e)
                            }(!0), i
                        }(p, n) : null,
                        g = -1,
                        x = null;
                    a && (x = new ResizeObserver(e => {
                        let [r] = e;
                        r && r.target === p && x && (x.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
                            var e;
                            null == (e = x) || e.observe(t)
                        })), n()
                    }), p && !f && x.observe(p), x.observe(t));
                    let y = f ? eh(e) : null;
                    return f && function t() {
                        let r = eh(e);
                        y && !eT(y, r) && n(), y = r, o = requestAnimationFrame(t)
                    }(), n(), () => {
                        var e;
                        h.forEach(e => {
                            i && e.removeEventListener("scroll", n), l && e.removeEventListener("resize", n)
                        }), null == m || m(), null == (e = x) || e.disconnect(), x = null, f && cancelAnimationFrame(o)
                    }
                })(...e, {
                    animationFrame: "always" === J
                }),
                elements: {
                    reference: ee.anchor
                },
                middleware: [{ ...{
                        name: "offset",
                        options: l = i = {
                            mainAxis: _ + ec,
                            alignmentAxis: V
                        },
                        async fn(e) {
                            var t, n;
                            let {
                                x: r,
                                y: o,
                                placement: i,
                                middlewareData: a
                            } = e, s = await N(e, l);
                            return i === (null == (t = a.offset) ? void 0 : t.placement) && null != (n = a.arrow) && n.alignmentOffset ? {} : {
                                x: r + s.x,
                                y: o + s.y,
                                data: { ...s,
                                    placement: i
                                }
                            }
                        }
                    },
                    options: [i, void 0]
                }, X && { ...{
                        name: "shift",
                        options: f = s = {
                            mainAxis: !0,
                            crossAxis: !1,
                            limiter: "partial" === U ? { ...(a = void 0, {
                                    options: a = {},
                                    fn(e) {
                                        let {
                                            x: t,
                                            y: n,
                                            placement: r,
                                            rects: o,
                                            middlewareData: i
                                        } = e, {
                                            offset: l = 0,
                                            mainAxis: s = !0,
                                            crossAxis: c = !0
                                        } = g(a, e), u = {
                                            x: t,
                                            y: n
                                        }, f = R(r), d = w(f), p = u[d], h = u[f], m = g(l, e), y = "number" == typeof m ? {
                                            mainAxis: m,
                                            crossAxis: 0
                                        } : {
                                            mainAxis: 0,
                                            crossAxis: 0,
                                            ...m
                                        };
                                        if (s) {
                                            let e = "y" === d ? "height" : "width",
                                                t = o.reference[d] - o.floating[e] + y.mainAxis,
                                                n = o.reference[d] + o.reference[e] - y.mainAxis;
                                            p < t ? p = t : p > n && (p = n)
                                        }
                                        if (c) {
                                            var v, b;
                                            let e = "y" === d ? "width" : "height",
                                                t = F.has(x(r)),
                                                n = o.reference[f] - o.floating[e] + (t && (null == (v = i.offset) ? void 0 : v[f]) || 0) + (t ? 0 : y.crossAxis),
                                                l = o.reference[f] + o.reference[e] + (t ? 0 : (null == (b = i.offset) ? void 0 : b[f]) || 0) - (t ? y.crossAxis : 0);
                                            h < n ? h = n : h > l && (h = l)
                                        }
                                        return {
                                            [d]: p,
                                            [f]: h
                                        }
                                    }
                                }),
                                options: [void 0, void 0]
                            } : void 0,
                            ...em
                        },
                        async fn(e) {
                            let {
                                x: t,
                                y: n,
                                placement: r
                            } = e, {
                                mainAxis: o = !0,
                                crossAxis: i = !1,
                                limiter: l = {
                                    fn: e => {
                                        let {
                                            x: t,
                                            y: n
                                        } = e;
                                        return {
                                            x: t,
                                            y: n
                                        }
                                    }
                                },
                                ...a
                            } = g(f, e), s = {
                                x: t,
                                y: n
                            }, d = await H(e, a), p = R(x(r)), h = w(p), m = s[h], y = s[p];
                            if (o) {
                                let e = "y" === h ? "top" : "left",
                                    t = "y" === h ? "bottom" : "right",
                                    n = m + d[e],
                                    r = m - d[t];
                                m = u(n, c(m, r))
                            }
                            if (i) {
                                let e = "y" === p ? "top" : "left",
                                    t = "y" === p ? "bottom" : "right",
                                    n = y + d[e],
                                    r = y - d[t];
                                y = u(n, c(y, r))
                            }
                            let v = l.fn({ ...e,
                                [h]: m,
                                [p]: y
                            });
                            return { ...v,
                                data: {
                                    x: v.x - t,
                                    y: v.y - n,
                                    enabled: {
                                        [h]: o,
                                        [p]: i
                                    }
                                }
                            }
                        }
                    },
                    options: [s, void 0]
                }, X && { ...{
                        name: "flip",
                        options: h = p = { ...em
                        },
                        async fn(e) {
                            var t, n, r, o, i, l, a, s;
                            let c, u, f, {
                                    placement: d,
                                    middlewareData: p,
                                    rects: m,
                                    initialPlacement: b,
                                    platform: S,
                                    elements: j
                                } = e,
                                {
                                    mainAxis: O = !0,
                                    crossAxis: k = !0,
                                    fallbackPlacements: D,
                                    fallbackStrategy: M = "bestFit",
                                    fallbackAxisSideDirection: F = "none",
                                    flipAlignment: N = !0,
                                    ...z
                                } = g(h, e);
                            if (null != (t = p.arrow) && t.alignmentOffset) return {};
                            let B = x(d),
                                W = R(b),
                                $ = x(b) === b,
                                _ = await (null == S.isRTL ? void 0 : S.isRTL(j.floating)),
                                I = D || ($ || !N ? [P(b)] : (c = P(b), [C(b), c, C(c)])),
                                V = "none" !== F;
                            !D && V && I.push(...(u = y(b), f = function(e, t, n) {
                                switch (e) {
                                    case "top":
                                    case "bottom":
                                        if (n) return t ? E : T;
                                        return t ? T : E;
                                    case "left":
                                    case "right":
                                        return t ? A : L;
                                    default:
                                        return []
                                }
                            }(x(b), "start" === F, _), u && (f = f.map(e => e + "-" + u), N && (f = f.concat(f.map(C)))), f));
                            let Y = [b, ...I],
                                X = await H(e, z),
                                q = [],
                                K = (null == (n = p.flip) ? void 0 : n.overflows) || [];
                            if (O && q.push(X[B]), k) {
                                let e, t, n, r, o = (l = d, a = m, void 0 === (s = _) && (s = !1), e = y(l), n = v(t = w(R(l))), r = "x" === t ? e === (s ? "end" : "start") ? "right" : "left" : "start" === e ? "bottom" : "top", a.reference[n] > a.floating[n] && (r = P(r)), [r, P(r)]);
                                q.push(X[o[0]], X[o[1]])
                            }
                            if (K = [...K, {
                                    placement: d,
                                    overflows: q
                                }], !q.every(e => e <= 0)) {
                                let e = ((null == (r = p.flip) ? void 0 : r.index) || 0) + 1,
                                    t = Y[e];
                                if (t && ("alignment" !== k || W === R(t) || K.every(e => R(e.placement) !== W || e.overflows[0] > 0))) return {
                                    data: {
                                        index: e,
                                        overflows: K
                                    },
                                    reset: {
                                        placement: t
                                    }
                                };
                                let n = null == (o = K.filter(e => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]) ? void 0 : o.placement;
                                if (!n) switch (M) {
                                    case "bestFit":
                                        {
                                            let e = null == (i = K.filter(e => {
                                                if (V) {
                                                    let t = R(e.placement);
                                                    return t === W || "y" === t
                                                }
                                                return !0
                                            }).map(e => [e.placement, e.overflows.filter(e => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]) ? void 0 : i[0];e && (n = e);
                                            break
                                        }
                                    case "initialPlacement":
                                        n = b
                                }
                                if (d !== n) return {
                                    reset: {
                                        placement: n
                                    }
                                }
                            }
                            return {}
                        }
                    },
                    options: [p, void 0]
                }, { ...{
                        name: "size",
                        options: b = m = { ...em,
                            apply: ({
                                elements: e,
                                rects: t,
                                availableWidth: n,
                                availableHeight: r
                            }) => {
                                let {
                                    width: o,
                                    height: i
                                } = t.reference, l = e.floating.style;
                                l.setProperty("--radix-popper-available-width", `${n}px`), l.setProperty("--radix-popper-available-height", `${r}px`), l.setProperty("--radix-popper-anchor-width", `${o}px`), l.setProperty("--radix-popper-anchor-height", `${i}px`)
                            }
                        },
                        async fn(e) {
                            var t, n;
                            let r, o, {
                                    placement: i,
                                    rects: l,
                                    platform: a,
                                    elements: s
                                } = e,
                                {
                                    apply: f = () => {},
                                    ...d
                                } = g(b, e),
                                p = await H(e, d),
                                h = x(i),
                                m = y(i),
                                w = "y" === R(i),
                                {
                                    width: v,
                                    height: C
                                } = l.floating;
                            "top" === h || "bottom" === h ? (r = h, o = m === (await (null == a.isRTL ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (o = h, r = "end" === m ? "top" : "bottom");
                            let T = C - p.top - p.bottom,
                                E = v - p.left - p.right,
                                A = c(C - p[r], T),
                                L = c(v - p[o], E),
                                P = !e.middlewareData.shift,
                                S = A,
                                j = L;
                            if (null != (t = e.middlewareData.shift) && t.enabled.x && (j = E), null != (n = e.middlewareData.shift) && n.enabled.y && (S = T), P && !m) {
                                let e = u(p.left, 0),
                                    t = u(p.right, 0),
                                    n = u(p.top, 0),
                                    r = u(p.bottom, 0);
                                w ? j = v - 2 * (0 !== e || 0 !== t ? e + t : u(p.left, p.right)) : S = C - 2 * (0 !== n || 0 !== r ? n + r : u(p.top, p.bottom))
                            }
                            await f({ ...e,
                                availableWidth: j,
                                availableHeight: S
                            });
                            let O = await a.getDimensions(s.floating);
                            return v !== O.width || C !== O.height ? {
                                reset: {
                                    rects: !0
                                }
                            } : {}
                        }
                    },
                    options: [m, void 0]
                }, eo && { ...{
                        name: "arrow",
                        options: j = S = {
                            element: eo,
                            padding: Y
                        },
                        fn(e) {
                            let {
                                element: t,
                                padding: n
                            } = "function" == typeof j ? j(e) : j;
                            return t && ({}).hasOwnProperty.call(t, "current") ? null != t.current ? eE({
                                element: t.current,
                                padding: n
                            }).fn(e) : {} : t ? eE({
                                element: t,
                                padding: n
                            }).fn(e) : {}
                        }
                    },
                    options: [S, void 0]
                }, eQ({
                    arrowWidth: es,
                    arrowHeight: ec
                }), G && { ...{
                        name: "hide",
                        options: z = O = {
                            strategy: "referenceHidden",
                            ...em
                        },
                        async fn(e) {
                            let {
                                rects: t
                            } = e, {
                                strategy: n = "referenceHidden",
                                ...r
                            } = g(z, e);
                            switch (n) {
                                case "referenceHidden":
                                    {
                                        let n = D(await H(e, { ...r,
                                            elementContext: "reference"
                                        }), t.reference);
                                        return {
                                            data: {
                                                referenceHiddenOffsets: n,
                                                referenceHidden: M(n)
                                            }
                                        }
                                    }
                                case "escaped":
                                    {
                                        let n = D(await H(e, { ...r,
                                            altBoundary: !0
                                        }), t.floating);
                                        return {
                                            data: {
                                                escapedOffsets: n,
                                                escaped: M(n)
                                            }
                                        }
                                    }
                                default:
                                    return {}
                            }
                        }
                    },
                    options: [O, void 0]
                }]
            }), [eb, eR] = eZ(ey), eH = (0, eD.useCallbackRef)(Q);
            (0, eM.useLayoutEffect)(() => {
                ew && eH?.()
            }, [ew, eH]);
            let eF = ev.arrow?.x,
                eN = ev.arrow?.y,
                ez = ev.arrow?.centerOffset !== 0,
                [eB, e$] = n.useState();
            return (0, eM.useLayoutEffect)(() => {
                et && e$(window.getComputedStyle(et).zIndex)
            }, [et]), (0, t.jsx)("div", {
                ref: eg.setFloating,
                "data-radix-popper-content-wrapper": "",
                style: { ...ex,
                    transform: ew ? ex.transform : "translate(0, -200%)",
                    minWidth: "max-content",
                    zIndex: eB,
                    "--radix-popper-transform-origin": [ev.transformOrigin?.x, ev.transformOrigin?.y].join(" "),
                    ...ev.hide?.referenceHidden && {
                        visibility: "hidden",
                        pointerEvents: "none"
                    }
                },
                dir: e.dir,
                children: (0, t.jsx)(eY, {
                    scope: B,
                    placedSide: eb,
                    onArrowChange: ei,
                    arrowX: eF,
                    arrowY: eN,
                    shouldHideArrow: ez,
                    children: (0, t.jsx)(ek.Primitive.div, {
                        "data-side": eb,
                        "data-align": eR,
                        ...Z,
                        ref: er,
                        style: { ...Z.style,
                            animation: ew ? void 0 : "none"
                        }
                    })
                })
            })
        });
    eq.displayName = eV;
    var eK = "PopperArrow",
        eU = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
        },
        eG = n.forwardRef(function(e, n) {
            let {
                __scopePopper: r,
                ...o
            } = e, i = eX(eK, r), l = eU[i.placedSide];
            return (0, t.jsx)("span", {
                ref: i.onArrowChange,
                style: {
                    position: "absolute",
                    left: i.arrowX,
                    top: i.arrowY,
                    [l]: 0,
                    transformOrigin: {
                        top: "",
                        right: "0 0",
                        bottom: "center 0",
                        left: "100% 0"
                    }[i.placedSide],
                    transform: {
                        top: "translateY(100%)",
                        right: "translateY(50%) rotate(90deg) translateX(-50%)",
                        bottom: "rotate(180deg)",
                        left: "translateY(50%) rotate(-90deg) translateX(50%)"
                    }[i.placedSide],
                    visibility: i.shouldHideArrow ? "hidden" : void 0
                },
                children: (0, t.jsx)(eH, { ...o,
                    ref: n,
                    style: { ...o.style,
                        display: "block"
                    }
                })
            })
        });

    function eJ(e) {
        return null !== e
    }
    eG.displayName = eK;
    var eQ = e => ({
        name: "transformOrigin",
        options: e,
        fn(t) {
            let {
                placement: n,
                rects: r,
                middlewareData: o
            } = t, i = o.arrow?.centerOffset !== 0, l = i ? 0 : e.arrowWidth, a = i ? 0 : e.arrowHeight, [s, c] = eZ(n), u = {
                start: "0%",
                center: "50%",
                end: "100%"
            }[c], f = (o.arrow?.x?? 0) + l / 2, d = (o.arrow?.y?? 0) + a / 2, p = "", h = "";
            return "bottom" === s ? (p = i ? u : `${f}px`, h = `${-a}px`) : "top" === s ? (p = i ? u : `${f}px`, h = `${r.floating.height+a}px`) : "right" === s ? (p = `${-a}px`, h = i ? u : `${d}px`) : "left" === s && (p = `${r.floating.width+a}px`, h = i ? u : `${d}px`), {
                data: {
                    x: p,
                    y: h
                }
            }
        }
    });

    function eZ(e) {
        let [t, n = "center"] = e.split("-");
        return [t, n]
    }
    e.s(["Anchor", () => eI, "Arrow", () => eG, "Content", () => eq, "Root", () => e$, "createPopperScope", () => ez], 1345);
    var e0 = e.i(14952),
        e1 = e.i(53747),
        e2 = e.i(93074),
        e5 = e.i(34643),
        e7 = Object.freeze({
            position: "absolute",
            border: 0,
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            wordWrap: "normal"
        }),
        e9 = n.forwardRef((e, n) => (0, t.jsx)(ek.Primitive.span, { ...e,
            ref: n,
            style: { ...e7,
                ...e.style
            }
        }));
    e9.displayName = "VisuallyHidden";
    var [e4, e3] = (0, i.createContextScope)("Tooltip", [ez]), e6 = ez(), e8 = "TooltipProvider", te = "tooltip.open", [tt, tn] = e4(e8), tr = e => {
        let {
            __scopeTooltip: r,
            delayDuration: o = 700,
            skipDelayDuration: i = 300,
            disableHoverableContent: l = !1,
            children: a
        } = e, s = n.useRef(!0), c = n.useRef(!1), u = n.useRef(0);
        return n.useEffect(() => {
            let e = u.current;
            return () => window.clearTimeout(e)
        }, []), (0, t.jsx)(tt, {
            scope: r,
            isOpenDelayedRef: s,
            delayDuration: o,
            onOpen: n.useCallback(() => {
                window.clearTimeout(u.current), s.current = !1
            }, []),
            onClose: n.useCallback(() => {
                window.clearTimeout(u.current), u.current = window.setTimeout(() => s.current = !0, i)
            }, [i]),
            isPointerInTransitRef: c,
            onPointerInTransitChange: n.useCallback(e => {
                c.current = e
            }, []),
            disableHoverableContent: l,
            children: a
        })
    };
    tr.displayName = e8;
    var to = "Tooltip",
        [ti, tl] = e4(to),
        ta = e => {
            let {
                __scopeTooltip: r,
                children: o,
                open: i,
                defaultOpen: l,
                onOpenChange: s,
                disableHoverableContent: c,
                delayDuration: u
            } = e, f = tn(to, e.__scopeTooltip), d = e6(r), [p, h] = n.useState(null), m = (0, a.useId)(), g = n.useRef(0), x = c?? f.disableHoverableContent, y = u?? f.delayDuration, w = n.useRef(!1), [v, b] = (0, e5.useControllableState)({
                prop: i,
                defaultProp: l?? !1,
                onChange: e => {
                    e ? (f.onOpen(), document.dispatchEvent(new CustomEvent(te))) : f.onClose(), s?.(e)
                },
                caller: to
            }), R = n.useMemo(() => v ? w.current ? "delayed-open" : "instant-open" : "closed", [v]), C = n.useCallback(() => {
                window.clearTimeout(g.current), g.current = 0, w.current = !1, b(!0)
            }, [b]), T = n.useCallback(() => {
                window.clearTimeout(g.current), g.current = 0, b(!1)
            }, [b]), E = n.useCallback(() => {
                window.clearTimeout(g.current), g.current = window.setTimeout(() => {
                    w.current = !0, b(!0), g.current = 0
                }, y)
            }, [y, b]);
            return n.useEffect(() => () => {
                g.current && (window.clearTimeout(g.current), g.current = 0)
            }, []), (0, t.jsx)(e$, { ...d,
                children: (0, t.jsx)(ti, {
                    scope: r,
                    contentId: m,
                    open: v,
                    stateAttribute: R,
                    trigger: p,
                    onTriggerChange: h,
                    onTriggerEnter: n.useCallback(() => {
                        f.isOpenDelayedRef.current ? E() : C()
                    }, [f.isOpenDelayedRef, E, C]),
                    onTriggerLeave: n.useCallback(() => {
                        x ? T() : (window.clearTimeout(g.current), g.current = 0)
                    }, [T, x]),
                    onOpen: C,
                    onClose: T,
                    disableHoverableContent: x,
                    children: o
                })
            })
        };
    ta.displayName = to;
    var ts = "TooltipTrigger",
        tc = n.forwardRef((e, i) => {
            let {
                __scopeTooltip: l,
                ...a
            } = e, s = tl(ts, l), c = tn(ts, l), u = e6(l), f = n.useRef(null), d = (0, o.useComposedRefs)(i, f, s.onTriggerChange), p = n.useRef(!1), h = n.useRef(!1), m = n.useCallback(() => p.current = !1, []);
            return n.useEffect(() => () => document.removeEventListener("pointerup", m), [m]), (0, t.jsx)(eI, {
                asChild: !0,
                ...u,
                children: (0, t.jsx)(ek.Primitive.button, {
                    "aria-describedby": s.open ? s.contentId : void 0,
                    "data-state": s.stateAttribute,
                    ...a,
                    ref: d,
                    onPointerMove: (0, r.composeEventHandlers)(e.onPointerMove, e => {
                        "touch" !== e.pointerType && (h.current || c.isPointerInTransitRef.current || (s.onTriggerEnter(), h.current = !0))
                    }),
                    onPointerLeave: (0, r.composeEventHandlers)(e.onPointerLeave, () => {
                        s.onTriggerLeave(), h.current = !1
                    }),
                    onPointerDown: (0, r.composeEventHandlers)(e.onPointerDown, () => {
                        s.open && s.onClose(), p.current = !0, document.addEventListener("pointerup", m, {
                            once: !0
                        })
                    }),
                    onFocus: (0, r.composeEventHandlers)(e.onFocus, () => {
                        p.current || s.onOpen()
                    }),
                    onBlur: (0, r.composeEventHandlers)(e.onBlur, s.onClose),
                    onClick: (0, r.composeEventHandlers)(e.onClick, s.onClose)
                })
            })
        });
    tc.displayName = ts;
    var tu = "TooltipPortal",
        [tf, td] = e4(tu, {
            forceMount: void 0
        }),
        tp = e => {
            let {
                __scopeTooltip: n,
                forceMount: r,
                children: o,
                container: i
            } = e, l = tl(tu, n);
            return (0, t.jsx)(tf, {
                scope: n,
                forceMount: r,
                children: (0, t.jsx)(e1.Presence, {
                    present: r || l.open,
                    children: (0, t.jsx)(e0.Portal, {
                        asChild: !0,
                        container: i,
                        children: o
                    })
                })
            })
        };
    tp.displayName = tu;
    var th = "TooltipContent",
        tm = n.forwardRef((e, n) => {
            let r = td(th, e.__scopeTooltip),
                {
                    forceMount: o = r.forceMount,
                    side: i = "top",
                    ...l
                } = e,
                a = tl(th, e.__scopeTooltip);
            return (0, t.jsx)(e1.Presence, {
                present: o || a.open,
                children: a.disableHoverableContent ? (0, t.jsx)(tv, {
                    side: i,
                    ...l,
                    ref: n
                }) : (0, t.jsx)(tg, {
                    side: i,
                    ...l,
                    ref: n
                })
            })
        }),
        tg = n.forwardRef((e, r) => {
            let i = tl(th, e.__scopeTooltip),
                l = tn(th, e.__scopeTooltip),
                a = n.useRef(null),
                s = (0, o.useComposedRefs)(r, a),
                [c, u] = n.useState(null),
                {
                    trigger: f,
                    onClose: d
                } = i,
                p = a.current,
                {
                    onPointerInTransitChange: h
                } = l,
                m = n.useCallback(() => {
                    u(null), h(!1)
                }, [h]),
                g = n.useCallback((e, t) => {
                    let n, r = e.currentTarget,
                        o = {
                            x: e.clientX,
                            y: e.clientY
                        },
                        i = function(e, t) {
                            let n = Math.abs(t.top - e.y),
                                r = Math.abs(t.bottom - e.y),
                                o = Math.abs(t.right - e.x),
                                i = Math.abs(t.left - e.x);
                            switch (Math.min(n, r, o, i)) {
                                case i:
                                    return "left";
                                case o:
                                    return "right";
                                case n:
                                    return "top";
                                case r:
                                    return "bottom";
                                default:
                                    throw Error("unreachable")
                            }
                        }(o, r.getBoundingClientRect());
                    u(((n = [... function(e, t, n = 5) {
                        let r = [];
                        switch (t) {
                            case "top":
                                r.push({
                                    x: e.x - n,
                                    y: e.y + n
                                }, {
                                    x: e.x + n,
                                    y: e.y + n
                                });
                                break;
                            case "bottom":
                                r.push({
                                    x: e.x - n,
                                    y: e.y - n
                                }, {
                                    x: e.x + n,
                                    y: e.y - n
                                });
                                break;
                            case "left":
                                r.push({
                                    x: e.x + n,
                                    y: e.y - n
                                }, {
                                    x: e.x + n,
                                    y: e.y + n
                                });
                                break;
                            case "right":
                                r.push({
                                    x: e.x - n,
                                    y: e.y - n
                                }, {
                                    x: e.x - n,
                                    y: e.y + n
                                })
                        }
                        return r
                    }(o, i), ... function(e) {
                        let {
                            top: t,
                            right: n,
                            bottom: r,
                            left: o
                        } = e;
                        return [{
                            x: o,
                            y: t
                        }, {
                            x: n,
                            y: t
                        }, {
                            x: n,
                            y: r
                        }, {
                            x: o,
                            y: r
                        }]
                    }(t.getBoundingClientRect())].slice()).sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : 1 * !!(e.y > t.y)), function(e) {
                        if (e.length <= 1) return e.slice();
                        let t = [];
                        for (let n = 0; n < e.length; n++) {
                            let r = e[n];
                            for (; t.length >= 2;) {
                                let e = t[t.length - 1],
                                    n = t[t.length - 2];
                                if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
                                else break
                            }
                            t.push(r)
                        }
                        t.pop();
                        let n = [];
                        for (let t = e.length - 1; t >= 0; t--) {
                            let r = e[t];
                            for (; n.length >= 2;) {
                                let e = n[n.length - 1],
                                    t = n[n.length - 2];
                                if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
                                else break
                            }
                            n.push(r)
                        }
                        return (n.pop(), 1 === t.length && 1 === n.length && t[0].x === n[0].x && t[0].y === n[0].y) ? t : t.concat(n)
                    }(n))), h(!0)
                }, [h]);
            return n.useEffect(() => () => m(), [m]), n.useEffect(() => {
                if (f && p) {
                    let e = e => g(e, p),
                        t = e => g(e, f);
                    return f.addEventListener("pointerleave", e), p.addEventListener("pointerleave", t), () => {
                        f.removeEventListener("pointerleave", e), p.removeEventListener("pointerleave", t)
                    }
                }
            }, [f, p, g, m]), n.useEffect(() => {
                if (c) {
                    let e = e => {
                        let t = e.target,
                            n = {
                                x: e.clientX,
                                y: e.clientY
                            },
                            r = f?.contains(t) || p?.contains(t),
                            o = ! function(e, t) {
                                let {
                                    x: n,
                                    y: r
                                } = e, o = !1;
                                for (let e = 0, i = t.length - 1; e < t.length; i = e++) {
                                    let l = t[e],
                                        a = t[i],
                                        s = l.x,
                                        c = l.y,
                                        u = a.x,
                                        f = a.y;
                                    c > r != f > r && n < (u - s) * (r - c) / (f - c) + s && (o = !o)
                                }
                                return o
                            }(n, c);
                        r ? m() : o && (m(), d())
                    };
                    return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e)
                }
            }, [f, p, c, d, m]), (0, t.jsx)(tv, { ...e,
                ref: s
            })
        }),
        [tx, ty] = e4(to, {
            isInside: !1
        }),
        tw = (0, e2.createSlottable)("TooltipContent"),
        tv = n.forwardRef((e, r) => {
            let {
                __scopeTooltip: o,
                children: i,
                "aria-label": a,
                onEscapeKeyDown: s,
                onPointerDownOutside: c,
                ...u
            } = e, f = tl(th, o), d = e6(o), {
                onClose: p
            } = f;
            return n.useEffect(() => (document.addEventListener(te, p), () => document.removeEventListener(te, p)), [p]), n.useEffect(() => {
                if (f.trigger) {
                    let e = e => {
                        let t = e.target;
                        t?.contains(f.trigger) && p()
                    };
                    return window.addEventListener("scroll", e, {
                        capture: !0
                    }), () => window.removeEventListener("scroll", e, {
                        capture: !0
                    })
                }
            }, [f.trigger, p]), (0, t.jsx)(l.DismissableLayer, {
                asChild: !0,
                disableOutsidePointerEvents: !1,
                onEscapeKeyDown: s,
                onPointerDownOutside: c,
                onFocusOutside: e => e.preventDefault(),
                onDismiss: p,
                children: (0, t.jsxs)(eq, {
                    "data-state": f.stateAttribute,
                    ...d,
                    ...u,
                    ref: r,
                    style: { ...u.style,
                        "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                        "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                        "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                        "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                        "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                    },
                    children: [(0, t.jsx)(tw, {
                        children: i
                    }), (0, t.jsx)(tx, {
                        scope: o,
                        isInside: !0,
                        children: (0, t.jsx)(e9, {
                            id: f.contentId,
                            role: "tooltip",
                            children: a || i
                        })
                    })]
                })
            })
        });
    tm.displayName = th;
    var tb = "TooltipArrow",
        tR = n.forwardRef((e, n) => {
            let {
                __scopeTooltip: r,
                ...o
            } = e, i = e6(r);
            return ty(tb, r).isInside ? null : (0, t.jsx)(eG, { ...i,
                ...o,
                ref: n
            })
        });
    tR.displayName = tb;
    var tC = e.i(75157);

    function tT({
        delayDuration: e = 0,
        ...n
    }) {
        return (0, t.jsx)(tr, {
            "data-slot": "tooltip-provider",
            delayDuration: e,
            ...n
        })
    }

    function tE({ ...e
    }) {
        return (0, t.jsx)(tT, {
            children: (0, t.jsx)(ta, {
                "data-slot": "tooltip",
                ...e
            })
        })
    }

    function tA({ ...e
    }) {
        return (0, t.jsx)(tc, {
            "data-slot": "tooltip-trigger",
            ...e
        })
    }

    function tL({
        className: e,
        sideOffset: n = 0,
        children: r,
        ...o
    }) {
        return (0, t.jsx)(tp, {
            children: (0, t.jsxs)(tm, {
                "data-slot": "tooltip-content",
                sideOffset: n,
                className: (0, tC.cn)("bg-card border-2 text-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance text-center", e),
                ...o,
                children: [r, (0, t.jsx)(tR, {
                    className: "bg-card fill-card z-50 size-2.5 -translate-y-1.5 rotate-45 rounded-[2px] border-b-2 border-r-2"
                })]
            })
        })
    }
    e.s(["Tooltip", () => tE, "TooltipContent", () => tL, "TooltipProvider", () => tT, "TooltipTrigger", () => tA], 46798)
}]);