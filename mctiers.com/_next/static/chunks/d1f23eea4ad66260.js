(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 31755, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(47800),
        o = e.i(8331),
        a = e.i(58294),
        n = e.i(778),
        i = e.i(69742),
        s = e.i(47176);
    e.s(["default", 0, () => {
        let e = (0, a.usePathname)(),
            l = t => `/rankings/${t.toLowerCase()}` === e.toLowerCase().replace(/\/$/, ""),
            [c, d] = (0, n.useState)(null),
            [u, p] = (0, n.useState)(!1),
            h = () => {
                c && (p(!0), setTimeout(() => {
                    p(!1), d(null)
                }, 40))
            };
        return (0, t.jsx)("section", {
            className: "w-full flex gap-1 absolute top-auto bottom-full left-0 overflow-x-auto overflow-y-hidden",
            children: r.gamemodes.map((e, r) => (0, t.jsx)(o.default, {
                href: `/rankings/${e.id}`, 
                children: (0, t.jsxs)(i.motion.span, {
                    initial: {
                        y: 50
                    },
                    animate: {
                        y: 0
                    },
                    transition: {
                        damping: 0,
                        delay: r / 10
                    },
                    onMouseDown: () => {
                        d(e.name)
                    },
                    onMouseUp: h,
                    className: `w-28 h-fit duration-100 ${l(e.id)?"bg-accent/50":"text-muted-foreground/40 hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/20"} text-nowrap relative flex flex-col items-center justify-end rounded-t-3xl border-2 border-b-none border-border px-8 pt-1`,
                    children: [(0, t.jsx)(s.default, {
                        condition: u && c === e.name,
                        className: "rounded-2xl rounded-b-none"
                    }), (0, t.jsx)("img", {
                        src: `/tier_icons/${e.icon}`,
                        width: 30,
                        height: 30,
                        alt: e.name
                    }), (0, t.jsx)("strong", {
                        className: "capitalize",
                        children: e.name
                    }), l(e.id) && (0, t.jsx)(i.motion.span, {
                        className: "w-full h-0.5 bg-white block absolute bottom-0 left-0",
                        layoutId: "underline"
                    })]
                })
            }, r))
        })
    }])
}, 44667, e => {
    "use strict";
    var t = e.i(80506),
        r = e.i(778),
        o = e.i(8331),
        a = e.i(86115);

    function n(e) {
        return (0, a.GenIcon)({
            tag: "svg",
            attr: {
                fill: "currentColor",
                viewBox: "0 0 16 16"
            },
            child: [{
                tag: "path",
                attr: {
                    fillRule: "evenodd",
                    d: "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                },
                child: []
            }]
        })(e)
    }

    function i(e) {
        return (0, a.GenIcon)({
            tag: "svg",
            attr: {
                fill: "currentColor",
                viewBox: "0 0 16 16"
            },
            child: [{
                tag: "path",
                attr: {
                    d: "M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
                },
                child: []
            }]
        })(e)
    }
    var s = e.i(46798),
        l = e.i(47800);
    let c = () => {
        let e = async () => {
            try {
                await navigator.clipboard.writeText(l.pvpclub_data.ip)
            } catch (e) {
                console.error("Failed to copy: ", e)
            }
        };
        return (0, t.jsxs)("div", {
            className: "w-fit flex gap-2 items-center",
            children: [(0, t.jsx)("img", {
                src: "/icons/pvpclub.webp",
                width: 40,
                height: 40,
                className: "object-contain",
                alt: "Portal Network Server"
            }), (0, t.jsxs)("div", {
                children: [(0, t.jsx)("h2", {
                    className: "text-muted-foreground text-xs uppercase font-bold",
                    children: "Server IP"
                }), (0, t.jsxs)("div", {
                    className: "flex items-center gap-1",
                    children: [(0, t.jsxs)("span", {
                        className: "group text-xs bg-secondary text-secondary-foreground font-semibold rounded-md py-1 px-1.5 flex gap-2 items-center justify-between cursor-default",
                        children: ["portalnetwork.fun", (0, t.jsxs)(s.Tooltip, {
                            children: [(0, t.jsx)(s.TooltipTrigger, {
                                onClick: e,
                                children: (0, t.jsx)(n, {
                                    className: "opacity-20 group-hover:opacity-100 duration-200"
                                })
                            }), (0, t.jsx)(s.TooltipContent, {
                                children: "Copy"
                            })]
                        })]
                    }), (0, t.jsxs)(s.Tooltip, {
                        children: [(0, t.jsx)(s.TooltipTrigger, {
                            children: (0, t.jsx)("a", {
                                href: l.pvpclub_data.discord,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                onClick: function(ev) { ev.stopPropagation(); window.open(l.pvpclub_data.discord, "_blank", "noopener,noreferrer"); ev.preventDefault(); },
                                className: "bg-blue-600 hover:bg-blue-600/90 size-fit text-sm rounded-md flex p-1 text-blue-200",
                                children: (0, t.jsx)(i, {})
                            })
                        }), (0, t.jsx)(s.TooltipContent, {
                            children: "Join the discord"
                        })]
                    })]
                })]
            })]
        })
    };
    var d = e.i(91967),
        u = e.i(44977),
        p = e.i(56207),
        h = e.i(60212),
        m = e.i(71353),
        f = e.i(89535),
        x = e.i(61194),
        v = e.i(1345),
        g = e.i(14952),
        b = e.i(53747),
        j = e.i(56872),
        w = e.i(93074),
        y = e.i(34643),
        C = e.i(73772),
        N = e.i(21790),
        P = "Popover",
        [T, R] = (0, p.createContextScope)(P, [v.createPopperScope]),
        k = (0, v.createPopperScope)(),
        [A, I] = T(P),
        O = e => {
            let {
                __scopePopover: o,
                children: a,
                open: n,
                defaultOpen: i,
                onOpenChange: s,
                modal: l = !1
            } = e, c = k(o), d = r.useRef(null), [u, p] = r.useState(!1), [h, m] = (0, y.useControllableState)({
                prop: n,
                defaultProp: i?? !1,
                onChange: s,
                caller: P
            });
            return (0, t.jsx)(v.Root, { ...c,
                children: (0, t.jsx)(A, {
                    scope: o,
                    contentId: (0, x.useId)(),
                    triggerRef: d,
                    open: h,
                    onOpenChange: m,
                    onOpenToggle: r.useCallback(() => m(e => !e), [m]),
                    hasCustomAnchor: u,
                    onCustomAnchorAdd: r.useCallback(() => p(!0), []),
                    onCustomAnchorRemove: r.useCallback(() => p(!1), []),
                    modal: l,
                    children: a
                })
            })
        };
    O.displayName = P;
    var F = "PopoverAnchor";
    r.forwardRef((e, o) => {
        let {
            __scopePopover: a,
            ...n
        } = e, i = I(F, a), s = k(a), {
            onCustomAnchorAdd: l,
            onCustomAnchorRemove: c
        } = i;
        return r.useEffect(() => (l(), () => c()), [l, c]), (0, t.jsx)(v.Anchor, { ...s,
            ...n,
            ref: o
        })
    }).displayName = F;
    var S = "PopoverTrigger",
        D = r.forwardRef((e, r) => {
            let {
                __scopePopover: o,
                ...a
            } = e, n = I(S, o), i = k(o), s = (0, u.useComposedRefs)(r, n.triggerRef), l = (0, t.jsx)(j.Primitive.button, {
                type: "button",
                "aria-haspopup": "dialog",
                "aria-expanded": n.open,
                "aria-controls": n.contentId,
                "data-state": B(n.open),
                ...a,
                ref: s,
                onClick: (0, d.composeEventHandlers)(e.onClick, n.onOpenToggle)
            });
            return n.hasCustomAnchor ? l : (0, t.jsx)(v.Anchor, {
                asChild: !0,
                ...i,
                children: l
            })
        });
    D.displayName = S;
    var E = "PopoverPortal",
        [_, z] = T(E, {
            forceMount: void 0
        }),
        M = e => {
            let {
                __scopePopover: r,
                forceMount: o,
                children: a,
                container: n
            } = e, i = I(E, r);
            return (0, t.jsx)(_, {
                scope: r,
                forceMount: o,
                children: (0, t.jsx)(b.Presence, {
                    present: o || i.open,
                    children: (0, t.jsx)(g.Portal, {
                        asChild: !0,
                        container: n,
                        children: a
                    })
                })
            })
        };
    M.displayName = E;
    var H = "PopoverContent",
        $ = r.forwardRef((e, r) => {
            let o = z(H, e.__scopePopover),
                {
                    forceMount: a = o.forceMount,
                    ...n
                } = e,
                i = I(H, e.__scopePopover);
            return (0, t.jsx)(b.Presence, {
                present: a || i.open,
                children: i.modal ? (0, t.jsx)(K, { ...n,
                    ref: r
                }) : (0, t.jsx)(G, { ...n,
                    ref: r
                })
            })
        });
    $.displayName = H;
    var q = (0, w.createSlot)("PopoverContent.RemoveScroll"),
        K = r.forwardRef((e, o) => {
            let a = I(H, e.__scopePopover),
                n = r.useRef(null),
                i = (0, u.useComposedRefs)(o, n),
                s = r.useRef(!1);
            return r.useEffect(() => {
                let e = n.current;
                if (e) return (0, C.hideOthers)(e)
            }, []), (0, t.jsx)(N.RemoveScroll, {
                as: q,
                allowPinchZoom: !0,
                children: (0, t.jsx)(L, { ...e,
                    ref: i,
                    trapFocus: a.open,
                    disableOutsidePointerEvents: !0,
                    onCloseAutoFocus: (0, d.composeEventHandlers)(e.onCloseAutoFocus, e => {
                        e.preventDefault(), s.current || a.triggerRef.current?.focus()
                    }),
                    onPointerDownOutside: (0, d.composeEventHandlers)(e.onPointerDownOutside, e => {
                        let t = e.detail.originalEvent,
                            r = 0 === t.button && !0 === t.ctrlKey;
                        s.current = 2 === t.button || r
                    }, {
                        checkForDefaultPrevented: !1
                    }),
                    onFocusOutside: (0, d.composeEventHandlers)(e.onFocusOutside, e => e.preventDefault(), {
                        checkForDefaultPrevented: !1
                    })
                })
            })
        }),
        G = r.forwardRef((e, o) => {
            let a = I(H, e.__scopePopover),
                n = r.useRef(!1),
                i = r.useRef(!1);
            return (0, t.jsx)(L, { ...e,
                ref: o,
                trapFocus: !1,
                disableOutsidePointerEvents: !1,
                onCloseAutoFocus: t => {
                    e.onCloseAutoFocus?.(t), t.defaultPrevented || (n.current || a.triggerRef.current?.focus(), t.preventDefault()), n.current = !1, i.current = !1
                },
                onInteractOutside: t => {
                    e.onInteractOutside?.(t), t.defaultPrevented || (n.current = !0, "pointerdown" === t.detail.originalEvent.type && (i.current = !0));
                    let r = t.target;
                    a.triggerRef.current?.contains(r) && t.preventDefault(), "focusin" === t.detail.originalEvent.type && i.current && t.preventDefault()
                }
            })
        }),
        L = r.forwardRef((e, r) => {
            let {
                __scopePopover: o,
                trapFocus: a,
                onOpenAutoFocus: n,
                onCloseAutoFocus: i,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: l,
                onPointerDownOutside: c,
                onFocusOutside: d,
                onInteractOutside: u,
                ...p
            } = e, x = I(H, o), g = k(o);
            return (0, m.useFocusGuards)(), (0, t.jsx)(f.FocusScope, {
                asChild: !0,
                loop: !0,
                trapped: a,
                onMountAutoFocus: n,
                onUnmountAutoFocus: i,
                children: (0, t.jsx)(h.DismissableLayer, {
                    asChild: !0,
                    disableOutsidePointerEvents: s,
                    onInteractOutside: u,
                    onEscapeKeyDown: l,
                    onPointerDownOutside: c,
                    onFocusOutside: d,
                    onDismiss: () => x.onOpenChange(!1),
                    children: (0, t.jsx)(v.Content, {
                        "data-state": B(x.open),
                        role: "dialog",
                        id: x.contentId,
                        ...g,
                        ...p,
                        ref: r,
                        style: { ...p.style,
                            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                        }
                    })
                })
            })
        }),
        V = "PopoverClose";

    function B(e) {
        return e ? "open" : "closed"
    }
    r.forwardRef((e, r) => {
        let {
            __scopePopover: o,
            ...a
        } = e, n = I(V, o);
        return (0, t.jsx)(j.Primitive.button, {
            type: "button",
            ...a,
            ref: r,
            onClick: (0, d.composeEventHandlers)(e.onClick, () => n.onOpenChange(!1))
        })
    }).displayName = V, r.forwardRef((e, r) => {
        let {
            __scopePopover: o,
            ...a
        } = e, n = k(o);
        return (0, t.jsx)(v.Arrow, { ...n,
            ...a,
            ref: r
        })
    }).displayName = "PopoverArrow";
    var U = e.i(75157);

    function W({ ...e
    }) {
        return (0, t.jsx)(O, {
            "data-slot": "popover",
            ...e
        })
    }

    function J({ ...e
    }) {
        return (0, t.jsx)(D, {
            "data-slot": "popover-trigger",
            ...e
        })
    }

    function Z({
        className: e,
        align: r = "center",
        sideOffset: o = 4,
        ...a
    }) {
        return (0, t.jsx)(M, {
            children: (0, t.jsx)($, {
                "data-slot": "popover-content",
                align: r,
                sideOffset: o,
                className: (0, U.cn)("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", e),
                ...a
            })
        })
    }
    var Q = e.i(19455),
        X = e.i(40226),
        Y = e.i(70460),
        ee = "Tabs",
        [et, er] = (0, p.createContextScope)(ee, [X.createRovingFocusGroupScope]),
        eo = (0, X.createRovingFocusGroupScope)(),
        [ea, en] = et(ee),
        ei = r.forwardRef((e, r) => {
            let {
                __scopeTabs: o,
                value: a,
                onValueChange: n,
                defaultValue: i,
                orientation: s = "horizontal",
                dir: l,
                activationMode: c = "automatic",
                ...d
            } = e, u = (0, Y.useDirection)(l), [p, h] = (0, y.useControllableState)({
                prop: a,
                onChange: n,
                defaultProp: i?? "",
                caller: ee
            });
            return (0, t.jsx)(ea, {
                scope: o,
                baseId: (0, x.useId)(),
                value: p,
                onValueChange: h,
                orientation: s,
                dir: u,
                activationMode: c,
                children: (0, t.jsx)(j.Primitive.div, {
                    dir: u,
                    "data-orientation": s,
                    ...d,
                    ref: r
                })
            })
        });
    ei.displayName = ee;
    var es = "TabsList",
        el = r.forwardRef((e, r) => {
            let {
                __scopeTabs: o,
                loop: a = !0,
                ...n
            } = e, i = en(es, o), s = eo(o);
            return (0, t.jsx)(X.Root, {
                asChild: !0,
                ...s,
                orientation: i.orientation,
                dir: i.dir,
                loop: a,
                children: (0, t.jsx)(j.Primitive.div, {
                    role: "tablist",
                    "aria-orientation": i.orientation,
                    ...n,
                    ref: r
                })
            })
        });
    el.displayName = es;
    var ec = "TabsTrigger",
        ed = r.forwardRef((e, r) => {
            let {
                __scopeTabs: o,
                value: a,
                disabled: n = !1,
                ...i
            } = e, s = en(ec, o), l = eo(o), c = eh(s.baseId, a), u = em(s.baseId, a), p = a === s.value;
            return (0, t.jsx)(X.Item, {
                asChild: !0,
                ...l,
                focusable: !n,
                active: p,
                children: (0, t.jsx)(j.Primitive.button, {
                    type: "button",
                    role: "tab",
                    "aria-selected": p,
                    "aria-controls": u,
                    "data-state": p ? "active" : "inactive",
                    "data-disabled": n ? "" : void 0,
                    disabled: n,
                    id: c,
                    ...i,
                    ref: r,
                    onMouseDown: (0, d.composeEventHandlers)(e.onMouseDown, e => {
                        n || 0 !== e.button || !1 !== e.ctrlKey ? e.preventDefault() : s.onValueChange(a)
                    }),
                    onKeyDown: (0, d.composeEventHandlers)(e.onKeyDown, e => {
                        [" ", "Enter"].includes(e.key) && s.onValueChange(a)
                    }),
                    onFocus: (0, d.composeEventHandlers)(e.onFocus, () => {
                        let e = "manual" !== s.activationMode;
                        p || n || !e || s.onValueChange(a)
                    })
                })
            })
        });
    ed.displayName = ec;
    var eu = "TabsContent",
        ep = r.forwardRef((e, o) => {
            let {
                __scopeTabs: a,
                value: n,
                forceMount: i,
                children: s,
                ...l
            } = e, c = en(eu, a), d = eh(c.baseId, n), u = em(c.baseId, n), p = n === c.value, h = r.useRef(p);
            return r.useEffect(() => {
                let e = requestAnimationFrame(() => h.current = !1);
                return () => cancelAnimationFrame(e)
            }, []), (0, t.jsx)(b.Presence, {
                present: i || p,
                children: ({
                    present: r
                }) => (0, t.jsx)(j.Primitive.div, {
                    "data-state": p ? "active" : "inactive",
                    "data-orientation": c.orientation,
                    role: "tabpanel",
                    "aria-labelledby": d,
                    hidden: !r,
                    id: u,
                    tabIndex: 0,
                    ...l,
                    ref: o,
                    style: { ...e.style,
                        animationDuration: h.current ? "0s" : void 0
                    },
                    children: r && s
                })
            })
        });

    function eh(e, t) {
        return `${e}-trigger-${t}`
    }

    function em(e, t) {
        return `${e}-content-${t}`
    }

    function ef({
        className: e,
        ...r
    }) {
        return (0, t.jsx)(ei, {
            "data-slot": "tabs",
            className: (0, U.cn)("flex flex-col gap-2", e),
            ...r
        })
    }

    function ex({
        className: e,
        ...r
    }) {
        return (0, t.jsx)(el, {
            "data-slot": "tabs-list",
            className: (0, U.cn)("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", e),
            ...r
        })
    }

    function ev({
        className: e,
        ...r
    }) {
        return (0, t.jsx)(ed, {
            "data-slot": "tabs-trigger",
            className: (0, U.cn)("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
            ...r
        })
    }

    function eg({
        className: e,
        ...r
    }) {
        return (0, t.jsx)(ep, {
            "data-slot": "tabs-content",
            className: (0, U.cn)("flex-1 outline-none", e),
            ...r
        })
    }
    ep.displayName = eu;
    var eb = e.i(58294),
        ej = e.i(23393),
        ew = e.i(97716);

    function ey(e) {
        return (0, a.GenIcon)({
            tag: "svg",
            attr: {
                viewBox: "0 0 512 512"
            },
            child: [{
                tag: "path",
                attr: {
                    d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                },
                child: []
            }]
        })(e)
    }
    e.s(["default", 0, () => {
        let [e, a] = (0, r.useState)(!0), n = (0, eb.usePathname)(), {
            imgSrc: i
        } = (() => {
            let [e, t] = (0, r.useState)(null), o = (0, eb.usePathname)();
            (0, r.useEffect)(() => {
                try {
                    (0, ej.fetchGamemodeInfo)().then(e => {
                        t(e)
                    })
                } catch (e) {
                    console.error(e)
                }
            }, []);
            let a = (0, ej.stripGamemodePathname)(o),
                n = l.gamemodes.find(e => e.id === a),
                i = e && n?.show ? e[a.toLowerCase()].kit_image : null;
            return {
                data: e,
                imgSrc: i
            }
        })(), d = (0, ej.stripGamemodePathname)(n), u = l.gamemodes.find(e => e.id === d);
        return (0, t.jsxs)("div", {
            className: "flex items-center gap-4 justify-end mb-4",
            children: [(0, t.jsxs)(W, {
                children: [(0, t.jsx)(J, {
                    asChild: !0,
                    children: (0, t.jsxs)(Q.Button, {
                        variant: "secondary",
                        children: [(0, t.jsx)(ey, {}), "Information"]
                    })
                }), (0, t.jsx)(Z, {
                    className: "min-w-[320]",
                    children: (0, t.jsxs)(ef, {
                        defaultValue: "titles",
                        children: [(0, t.jsxs)(ex, {
                            className: "w-full",
                            children: [(0, t.jsx)(ev, {
                                value: "titles",
                                children: "Titles"
                            }), (0, t.jsx)(ev, {
                                value: "points",
                                children: "Points"
                            }), u?.show && (0, t.jsx)(ev, {
                                value: "test",
                                children: "Tier Test"
                            }), u?.show && (0, t.jsx)(ev, {
                                value: "kit",
                                children: "Testing Kit"
                            })]
                        }), (0, t.jsxs)(eg, {
                            value: "titles",
                            children: [(0, t.jsxs)("h1", {
                                className: "mb-4",
                                children: ["How to obtain ", (0, t.jsx)("u", {
                                    children: "Achievement Titles"
                                })]
                            }), (0, t.jsx)("ul", {
                                className: "space-y-2",
                                children: Object.entries(l.TITLES).map(([e, r], o) => "unranked" !== e && (0, t.jsxs)("li", {
                                    className: "text-muted-foreground items-center space-y-0.5",
                                    children: [(0, t.jsxs)("span", {
                                        className: "flex gap-1 items-center",
                                        children: [(0, t.jsx)("img", {
                                            src: `/titles/${r.title.split(" ").join("_").toLowerCase()}.${o<2?"webp":"svg"}`,
                                            width: 20,
                                            height: 20,
                                            alt: "title icon"
                                        }), (0, t.jsx)("h1", {
                                            className: "text-sm",
                                            style: {
                                                color: r.colors.fg
                                            },
                                            children: r.title
                                        })]
                                    }), (0, t.jsx)("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: r.reqString
                                    })]
                                }, o))
                            })]
                        }), (0, t.jsxs)(eg, {
                            value: "points",
                            children: [(0, t.jsxs)("h1", {
                                className: "mb-4",
                                children: ["How ", (0, t.jsx)("u", {
                                    children: "ranking points"
                                }), " are calculated"]
                            }), (0, t.jsx)("ul", {
                                className: "space-y-2",
                                children: Object.entries(l.points).map(([e, r], o) => (0, t.jsxs)("li", {
                                    style: {
                                        "--item-color": `var(--tier-${e}-foreground)`
                                    },
                                    children: [(0, t.jsxs)("h2", {
                                        className: "flex gap-2 items-center text-[var(--item-color)]",
                                        children: [3 >= Number(e) && (0, t.jsx)("img", {
                                            src: `/icons/tier_${e}.svg`,
                                            width: 20,
                                            height: 20,
                                            alt: "Trophy"
                                        }), " ", "Tier ", e]
                                    }), (0, t.jsx)("div", {
                                        className: "pl-1 flex items-center gap-1 border-l-2 border-[var(--item-color)] ml-0.5",
                                        children: Object.entries(r).map(([e, r], o) => (0, t.jsxs)(s.Tooltip, {
                                            children: [(0, t.jsx)(s.TooltipTrigger, {
                                                children: (0, t.jsxs)("span", {
                                                    className: `text-xs rounded-full py-1 ${"high"===e?"bg-[var(--item-color)]/20 text-[var(--item-color)]":"bg-[var(--item-color)]/10 text-[var(--item-color)]"} flex w-22 items-center gap-0.5 px-1.5`,
                                                    children: ["high" === e ? (0, t.jsx)(ew.MdOutlineKeyboardDoubleArrowUp, {
                                                        size: 18
                                                    }) : (0, t.jsx)(ew.MdOutlineKeyboardArrowUp, {
                                                        size: 18
                                                    }), " ", r, " Point", r > 1 && "s"]
                                                })
                                            }), (0, t.jsxs)(s.TooltipContent, {
                                                className: "capitalize",
                                                children: [e, " Tier"]
                                            })]
                                        }, o))
                                    })]
                                }, o))
                            })]
                        }), (0, t.jsxs)(eg, {
                            value: "test",
                            children: [(0, t.jsx)("h1", {
                                className: "mb-4",
                                children: "How to get Tier Tested"
                            }), (0, t.jsxs)("p", {
                                className: "text-muted-foreground text-sm",
                                children: ["To get tier tested, join the", " ", (0, t.jsx)("a", {
                                    className: "underline text-blue-400",
                                    href: u?.discord || "#",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    onClick: function(ev) { if(u?.discord) { ev.stopPropagation(); window.open(u.discord, "_blank", "noopener,noreferrer"); ev.preventDefault(); } },
                                    children: u?.name
                                }), " ", "discord server & visit the", " ", (0, t.jsx)("span", {
                                    className: "bg-muted p-0.5 font-mono",
                                    children: "#request-test"
                                }), " ", "channel, in which you will be able to find a button to verify your account. ", (0, t.jsx)("br", {}), " Once you verify your account you will be required to fill up a form which, when done, will assign you a waitlist role. ", (0, t.jsx)("br", {}), " Whenever there are tier testers available in your region, you will be able to join a queue. ", (0, t.jsx)("br", {}), " When you reach #1 in the queue, you will gain access to a private channel to speak with your tier tester. ", (0, t.jsx)("br", {}), " Happy Testing!"]
                            })]
                        }), (0, t.jsx)(eg, {
                            value: "kit",
                            children: i && e ? (0, t.jsx)("img", {
                                src: i,
                                alt: "Image Kit",
                                width: 300,
                                height: 300,
                                onError: () => a(!1)
                            }) : (0, t.jsx)("p", {
                                className: "h-[300px]",
                                children: "No kit image was provided."
                            })
                        })]
                    })
                })]
            }), (0, t.jsx)(c, {})]
        })
    }], 44667)
}]);