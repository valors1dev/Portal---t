(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 78350, 59625, e => {
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

    function n(e) {
        var n = function(e) {
            if ("number" == typeof e) return {
                value: e,
                unit: "px"
            };
            var n, r = (e.match(/^[0-9.]*/) || "").toString();
            n = r.includes(".") ? parseFloat(r) : parseInt(r, 10);
            var a = (e.match(/[^0-9]*$/) || "").toString();
            return t[a] ? {
                value: n,
                unit: a
            } : (console.warn("React Spinners: ".concat(e, " is not a valid css value. Defaulting to ").concat(n, "px.")), {
                value: n,
                unit: "px"
            })
        }(e);
        return "".concat(n.value).concat(n.unit)
    }
    e.s(["cssValue", () => n], 78350);
    var r = function(e, t, n) {
        var r = "react-spinners-".concat(e, "-").concat(n);
        if ("undefined" == typeof window || !window.document) return r;
        var a = document.createElement("style");
        document.head.appendChild(a);
        var i = a.sheet,
            o = "\n    @keyframes ".concat(r, " {\n      ").concat(t, "\n    }\n  ");
        return i && i.insertRule(o, 0), r
    };
    e.s(["createAnimation", () => r], 59625)
}, 26679, e => {
    "use strict";
    var t = e.i(80506),
        n = e.i(778),
        r = e.i(78350),
        a = e.i(59625),
        i = function() {
            return (i = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++)
                    for (var a in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }).apply(this, arguments)
        },
        o = function(e, t) {
            var n = {};
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && 0 > t.indexOf(r) && (n[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var a = 0, r = Object.getOwnPropertySymbols(e); a < r.length; a++) 0 > t.indexOf(r[a]) && Object.prototype.propertyIsEnumerable.call(e, r[a]) && (n[r[a]] = e[r[a]]);
            return n
        },
        c = function(e, t, n) {
            if (n || 2 == arguments.length)
                for (var r, a = 0, i = t.length; a < i; a++) !r && a in t || (r || (r = Array.prototype.slice.call(t, 0, a)), r[a] = t[a]);
            return e.concat(r || Array.prototype.slice.call(t))
        },
        l = (0, a.createAnimation)("ScaleLoader", "0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}", "scale");
    let s = function(e) {
        var t = e.loading,
            a = e.color,
            s = void 0 === a ? "#000000" : a,
            u = e.speedMultiplier,
            d = void 0 === u ? 1 : u,
            p = e.cssOverride,
            v = e.height,
            f = void 0 === v ? 35 : v,
            m = e.width,
            h = void 0 === m ? 4 : m,
            y = e.radius,
            g = void 0 === y ? 2 : y,
            b = e.margin,
            w = void 0 === b ? 2 : b,
            O = e.barCount,
            x = o(e, ["loading", "color", "speedMultiplier", "cssOverride", "height", "width", "radius", "margin", "barCount"]),
            j = i({
                display: "inherit"
            }, void 0 === p ? {} : p);
        return void 0 === t || t ? n.createElement("span", i({
            style: j
        }, x), c([], Array(void 0 === O ? 5 : O), !0).map(function(e, t) {
            var a;
            return n.createElement("span", {
                key: t,
                style: (a = t + 1, {
                    backgroundColor: s,
                    width: (0, r.cssValue)(h),
                    height: (0, r.cssValue)(f),
                    margin: (0, r.cssValue)(w),
                    borderRadius: (0, r.cssValue)(g),
                    display: "inline-block",
                    animation: "".concat(l, " ").concat(1 / d, "s ").concat(.1 * a, "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),
                    animationFillMode: "both"
                })
            })
        })) : null
    };

    function u() {
        return (0, t.jsxs)("div", {
            className: "w-full text-center space-y-3 py-8",
            children: [(0, t.jsx)("h1", {
                className: "text-4xl font-bold text-disabled",
                children: "Connecting To Portal Network.com"
            }), (0, t.jsx)(s, {
                width: 16,
                height: 16,
                loading: !0,
                color: "white"
            })]
        })
    }
    e.s(["default", () => u], 26679)
}]);