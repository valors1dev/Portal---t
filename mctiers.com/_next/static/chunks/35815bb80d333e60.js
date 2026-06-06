(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 22240, e => {
    "use strict";
    var t = e.i(80506),
        n = e.i(23393),
        r = e.i(778),
        o = e.i(54219),
        a = e.i(52755),
        s = e.i(24623),
        i = e.i(47176),
        l = e.i(55774),
        c = e.i(91967),
        d = e.i(56207),
        u = e.i(56872),
        p = e.i(57784),
        m = e.i(44977),
        f = e.i(70460),
        x = e.i(60212),
        h = e.i(71353),
        v = e.i(89535),
        g = e.i(61194),
        w = e.i(1345),
        y = e.i(14952),
        j = e.i(53747),
        C = e.i(40226),
        b = e.i(93074),
        M = e.i(52960),
        R = e.i(73772),
        P = e.i(21790),
        k = ["Enter", " "],
        _ = ["ArrowUp", "PageDown", "End"],
        N = ["ArrowDown", "PageUp", "Home", ..._],
        E = {
            ltr: [...k, "ArrowRight"],
            rtl: [...k, "ArrowLeft"]
        },
        S = {
            ltr: ["ArrowLeft"],
            rtl: ["ArrowRight"]
        },
        T = "Menu",
        [D, I, O] = (0, p.createCollection)(T),
        [F, L] = (0, d.createContextScope)(T, [O, w.createPopperScope, C.createRovingFocusGroupScope]),
        H = (0, w.createPopperScope)(),
        A = (0, C.createRovingFocusGroupScope)(),
        [K, U] = F(T),
        [$, G] = F(T),
        z = e => {
            let {
                __scopeMenu: n,
                open: o = !1,
                children: a,
                dir: s,
                onOpenChange: i,
                modal: l = !0
            } = e, c = H(n), [d, u] = r.useState(null), p = r.useRef(!1), m = (0, M.useCallbackRef)(i), x = (0, f.useDirection)(s);
            return r.useEffect(() => {
                let e = () => {
                        p.current = !0, document.addEventListener("pointerdown", t, {
                            capture: !0,
                            once: !0
                        }), document.addEventListener("pointermove", t, {
                            capture: !0,
                            once: !0
                        })
                    },
                    t = () => p.current = !1;
                return document.addEventListener("keydown", e, {
                    capture: !0
                }), () => {
                    document.removeEventListener("keydown", e, {
                        capture: !0
                    }), document.removeEventListener("pointerdown", t, {
                        capture: !0
                    }), document.removeEventListener("pointermove", t, {
                        capture: !0
                    })
                }
            }, []), (0, t.jsx)(w.Root, { ...c,
                children: (0, t.jsx)(K, {
                    scope: n,
                    open: o,
                    onOpenChange: m,
                    content: d,
                    onContentChange: u,
                    children: (0, t.jsx)($, {
                        scope: n,
                        onClose: r.useCallback(() => m(!1), [m]),
                        isUsingKeyboardRef: p,
                        dir: x,
                        modal: l,
                        children: a
                    })
                })
            })
        };
    z.displayName = T;
    var B = r.forwardRef((e, n) => {
        let {
            __scopeMenu: r,
            ...o
        } = e, a = H(r);
        return (0, t.jsx)(w.Anchor, { ...a,
            ...o,
            ref: n
        })
    });
    B.displayName = "MenuAnchor";
    var V = "MenuPortal",
        [X, Y] = F(V, {
            forceMount: void 0
        }),
        W = e => {
            let {
                __scopeMenu: n,
                forceMount: r,
                children: o,
                container: a
            } = e, s = U(V, n);
            return (0, t.jsx)(X, {
                scope: n,
                forceMount: r,
                children: (0, t.jsx)(j.Presence, {
                    present: r || s.open,
                    children: (0, t.jsx)(y.Portal, {
                        asChild: !0,
                        container: a,
                        children: o
                    })
                })
            })
        };
    W.displayName = V;
    var q = "MenuContent",
        [Z, J] = F(q),
        Q = r.forwardRef((e, n) => {
            let r = Y(q, e.__scopeMenu),
                {
                    forceMount: o = r.forceMount,
                    ...a
                } = e,
                s = U(q, e.__scopeMenu),
                i = G(q, e.__scopeMenu);
            return (0, t.jsx)(D.Provider, {
                scope: e.__scopeMenu,
                children: (0, t.jsx)(j.Presence, {
                    present: o || s.open,
                    children: (0, t.jsx)(D.Slot, {
                        scope: e.__scopeMenu,
                        children: i.modal ? (0, t.jsx)(ee, { ...a,
                            ref: n
                        }) : (0, t.jsx)(et, { ...a,
                            ref: n
                        })
                    })
                })
            })
        }),
        ee = r.forwardRef((e, n) => {
            let o = U(q, e.__scopeMenu),
                a = r.useRef(null),
                s = (0, m.useComposedRefs)(n, a);
            return r.useEffect(() => {
                let e = a.current;
                if (e) return (0, R.hideOthers)(e)
            }, []), (0, t.jsx)(er, { ...e,
                ref: s,
                trapFocus: o.open,
                disableOutsidePointerEvents: o.open,
                disableOutsideScroll: !0,
                onFocusOutside: (0, c.composeEventHandlers)(e.onFocusOutside, e => e.preventDefault(), {
                    checkForDefaultPrevented: !1
                }),
                onDismiss: () => o.onOpenChange(!1)
            })
        }),
        et = r.forwardRef((e, n) => {
            let r = U(q, e.__scopeMenu);
            return (0, t.jsx)(er, { ...e,
                ref: n,
                trapFocus: !1,
                disableOutsidePointerEvents: !1,
                disableOutsideScroll: !1,
                onDismiss: () => r.onOpenChange(!1)
            })
        }),
        en = (0, b.createSlot)("MenuContent.ScrollLock"),
        er = r.forwardRef((e, n) => {
            let {
                __scopeMenu: o,
                loop: a = !1,
                trapFocus: s,
                onOpenAutoFocus: i,
                onCloseAutoFocus: l,
                disableOutsidePointerEvents: d,
                onEntryFocus: u,
                onEscapeKeyDown: p,
                onPointerDownOutside: f,
                onFocusOutside: g,
                onInteractOutside: y,
                onDismiss: j,
                disableOutsideScroll: b,
                ...M
            } = e, R = U(q, o), k = G(q, o), E = H(o), S = A(o), T = I(o), [D, O] = r.useState(null), F = r.useRef(null), L = (0, m.useComposedRefs)(n, F, R.onContentChange), K = r.useRef(0), $ = r.useRef(""), z = r.useRef(0), B = r.useRef(null), V = r.useRef("right"), X = r.useRef(0), Y = b ? P.RemoveScroll : r.Fragment;
            r.useEffect(() => () => window.clearTimeout(K.current), []), (0, h.useFocusGuards)();
            let W = r.useCallback(e => {
                var t, n;
                return V.current === B.current?.side && (t = e, !!(n = B.current?.area) && function(e, t) {
                    let {
                        x: n,
                        y: r
                    } = e, o = !1;
                    for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
                        let s = t[e],
                            i = t[a],
                            l = s.x,
                            c = s.y,
                            d = i.x,
                            u = i.y;
                        c > r != u > r && n < (d - l) * (r - c) / (u - c) + l && (o = !o)
                    }
                    return o
                }({
                    x: t.clientX,
                    y: t.clientY
                }, n))
            }, []);
            return (0, t.jsx)(Z, {
                scope: o,
                searchRef: $,
                onItemEnter: r.useCallback(e => {
                    W(e) && e.preventDefault()
                }, [W]),
                onItemLeave: r.useCallback(e => {
                    W(e) || (F.current?.focus(), O(null))
                }, [W]),
                onTriggerLeave: r.useCallback(e => {
                    W(e) && e.preventDefault()
                }, [W]),
                pointerGraceTimerRef: z,
                onPointerGraceIntentChange: r.useCallback(e => {
                    B.current = e
                }, []),
                children: (0, t.jsx)(Y, { ...b ? {
                        as: en,
                        allowPinchZoom: !0
                    } : void 0,
                    children: (0, t.jsx)(v.FocusScope, {
                        asChild: !0,
                        trapped: s,
                        onMountAutoFocus: (0, c.composeEventHandlers)(i, e => {
                            e.preventDefault(), F.current?.focus({
                                preventScroll: !0
                            })
                        }),
                        onUnmountAutoFocus: l,
                        children: (0, t.jsx)(x.DismissableLayer, {
                            asChild: !0,
                            disableOutsidePointerEvents: d,
                            onEscapeKeyDown: p,
                            onPointerDownOutside: f,
                            onFocusOutside: g,
                            onInteractOutside: y,
                            onDismiss: j,
                            children: (0, t.jsx)(C.Root, {
                                asChild: !0,
                                ...S,
                                dir: k.dir,
                                orientation: "vertical",
                                loop: a,
                                currentTabStopId: D,
                                onCurrentTabStopIdChange: O,
                                onEntryFocus: (0, c.composeEventHandlers)(u, e => {
                                    k.isUsingKeyboardRef.current || e.preventDefault()
                                }),
                                preventScrollOnEntryFocus: !0,
                                children: (0, t.jsx)(w.Content, {
                                    role: "menu",
                                    "aria-orientation": "vertical",
                                    "data-state": eE(R.open),
                                    "data-radix-menu-content": "",
                                    dir: k.dir,
                                    ...E,
                                    ...M,
                                    ref: L,
                                    style: {
                                        outline: "none",
                                        ...M.style
                                    },
                                    onKeyDown: (0, c.composeEventHandlers)(M.onKeyDown, e => {
                                        let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget,
                                            n = e.ctrlKey || e.altKey || e.metaKey,
                                            r = 1 === e.key.length;
                                        if (t) {
                                            var o;
                                            let t, a, s, i, l, c;
                                            "Tab" === e.key && e.preventDefault(), !n && r && (o = e.key, t = $.current + o, a = T().filter(e => !e.disabled), s = document.activeElement, i = a.find(e => e.ref.current === s)?.textValue, l = function(e, t, n) {
                                                var r;
                                                let o = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
                                                    a = n ? e.indexOf(n) : -1,
                                                    s = (r = Math.max(a, 0), e.map((t, n) => e[(r + n) % e.length]));
                                                1 === o.length && (s = s.filter(e => e !== n));
                                                let i = s.find(e => e.toLowerCase().startsWith(o.toLowerCase()));
                                                return i !== n ? i : void 0
                                            }(a.map(e => e.textValue), t, i), c = a.find(e => e.textValue === l)?.ref.current, function e(t) {
                                                $.current = t, window.clearTimeout(K.current), "" !== t && (K.current = window.setTimeout(() => e(""), 1e3))
                                            }(t), c && setTimeout(() => c.focus()))
                                        }
                                        let a = F.current;
                                        if (e.target !== a || !N.includes(e.key)) return;
                                        e.preventDefault();
                                        let s = T().filter(e => !e.disabled).map(e => e.ref.current);
                                        _.includes(e.key) && s.reverse(),
                                            function(e) {
                                                let t = document.activeElement;
                                                for (let n of e)
                                                    if (n === t || (n.focus(), document.activeElement !== t)) return
                                            }(s)
                                    }),
                                    onBlur: (0, c.composeEventHandlers)(e.onBlur, e => {
                                        e.currentTarget.contains(e.target) || (window.clearTimeout(K.current), $.current = "")
                                    }),
                                    onPointerMove: (0, c.composeEventHandlers)(e.onPointerMove, eD(e => {
                                        let t = e.target,
                                            n = X.current !== e.clientX;
                                        e.currentTarget.contains(t) && n && (V.current = e.clientX > X.current ? "right" : "left", X.current = e.clientX)
                                    }))
                                })
                            })
                        })
                    })
                })
            })
        });
    Q.displayName = q;
    var eo = r.forwardRef((e, n) => {
        let {
            __scopeMenu: r,
            ...o
        } = e;
        return (0, t.jsx)(u.Primitive.div, {
            role: "group",
            ...o,
            ref: n
        })
    });
    eo.displayName = "MenuGroup";
    var ea = r.forwardRef((e, n) => {
        let {
            __scopeMenu: r,
            ...o
        } = e;
        return (0, t.jsx)(u.Primitive.div, { ...o,
            ref: n
        })
    });
    ea.displayName = "MenuLabel";
    var es = "MenuItem",
        ei = "menu.itemSelect",
        el = r.forwardRef((e, n) => {
            let {
                disabled: o = !1,
                onSelect: a,
                ...s
            } = e, i = r.useRef(null), l = G(es, e.__scopeMenu), d = J(es, e.__scopeMenu), p = (0, m.useComposedRefs)(n, i), f = r.useRef(!1);
            return (0, t.jsx)(ec, { ...s,
                ref: p,
                disabled: o,
                onClick: (0, c.composeEventHandlers)(e.onClick, () => {
                    let e = i.current;
                    if (!o && e) {
                        let t = new CustomEvent(ei, {
                            bubbles: !0,
                            cancelable: !0
                        });
                        e.addEventListener(ei, e => a?.(e), {
                            once: !0
                        }), (0, u.dispatchDiscreteCustomEvent)(e, t), t.defaultPrevented ? f.current = !1 : l.onClose()
                    }
                }),
                onPointerDown: t => {
                    e.onPointerDown?.(t), f.current = !0
                },
                onPointerUp: (0, c.composeEventHandlers)(e.onPointerUp, e => {
                    f.current || e.currentTarget?.click()
                }),
                onKeyDown: (0, c.composeEventHandlers)(e.onKeyDown, e => {
                    let t = "" !== d.searchRef.current;
                    o || t && " " === e.key || k.includes(e.key) && (e.currentTarget.click(), e.preventDefault())
                })
            })
        });
    el.displayName = es;
    var ec = r.forwardRef((e, n) => {
            let {
                __scopeMenu: o,
                disabled: a = !1,
                textValue: s,
                ...i
            } = e, l = J(es, o), d = A(o), p = r.useRef(null), f = (0, m.useComposedRefs)(n, p), [x, h] = r.useState(!1), [v, g] = r.useState("");
            return r.useEffect(() => {
                let e = p.current;
                e && g((e.textContent?? "").trim())
            }, [i.children]), (0, t.jsx)(D.ItemSlot, {
                scope: o,
                disabled: a,
                textValue: s?? v,
                children: (0, t.jsx)(C.Item, {
                    asChild: !0,
                    ...d,
                    focusable: !a,
                    children: (0, t.jsx)(u.Primitive.div, {
                        role: "menuitem",
                        "data-highlighted": x ? "" : void 0,
                        "aria-disabled": a || void 0,
                        "data-disabled": a ? "" : void 0,
                        ...i,
                        ref: f,
                        onPointerMove: (0, c.composeEventHandlers)(e.onPointerMove, eD(e => {
                            a ? l.onItemLeave(e) : (l.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({
                                preventScroll: !0
                            }))
                        })),
                        onPointerLeave: (0, c.composeEventHandlers)(e.onPointerLeave, eD(e => l.onItemLeave(e))),
                        onFocus: (0, c.composeEventHandlers)(e.onFocus, () => h(!0)),
                        onBlur: (0, c.composeEventHandlers)(e.onBlur, () => h(!1))
                    })
                })
            })
        }),
        ed = r.forwardRef((e, n) => {
            let {
                checked: r = !1,
                onCheckedChange: o,
                ...a
            } = e;
            return (0, t.jsx)(eg, {
                scope: e.__scopeMenu,
                checked: r,
                children: (0, t.jsx)(el, {
                    role: "menuitemcheckbox",
                    "aria-checked": eS(r) ? "mixed" : r,
                    ...a,
                    ref: n,
                    "data-state": eT(r),
                    onSelect: (0, c.composeEventHandlers)(a.onSelect, () => o?.(!!eS(r) || !r), {
                        checkForDefaultPrevented: !1
                    })
                })
            })
        });
    ed.displayName = "MenuCheckboxItem";
    var eu = "MenuRadioGroup",
        [ep, em] = F(eu, {
            value: void 0,
            onValueChange: () => {}
        }),
        ef = r.forwardRef((e, n) => {
            let {
                value: r,
                onValueChange: o,
                ...a
            } = e, s = (0, M.useCallbackRef)(o);
            return (0, t.jsx)(ep, {
                scope: e.__scopeMenu,
                value: r,
                onValueChange: s,
                children: (0, t.jsx)(eo, { ...a,
                    ref: n
                })
            })
        });
    ef.displayName = eu;
    var ex = "MenuRadioItem",
        eh = r.forwardRef((e, n) => {
            let {
                value: r,
                ...o
            } = e, a = em(ex, e.__scopeMenu), s = r === a.value;
            return (0, t.jsx)(eg, {
                scope: e.__scopeMenu,
                checked: s,
                children: (0, t.jsx)(el, {
                    role: "menuitemradio",
                    "aria-checked": s,
                    ...o,
                    ref: n,
                    "data-state": eT(s),
                    onSelect: (0, c.composeEventHandlers)(o.onSelect, () => a.onValueChange?.(r), {
                        checkForDefaultPrevented: !1
                    })
                })
            })
        });
    eh.displayName = ex;
    var ev = "MenuItemIndicator",
        [eg, ew] = F(ev, {
            checked: !1
        }),
        ey = r.forwardRef((e, n) => {
            let {
                __scopeMenu: r,
                forceMount: o,
                ...a
            } = e, s = ew(ev, r);
            return (0, t.jsx)(j.Presence, {
                present: o || eS(s.checked) || !0 === s.checked,
                children: (0, t.jsx)(u.Primitive.span, { ...a,
                    ref: n,
                    "data-state": eT(s.checked)
                })
            })
        });
    ey.displayName = ev;
    var ej = r.forwardRef((e, n) => {
        let {
            __scopeMenu: r,
            ...o
        } = e;
        return (0, t.jsx)(u.Primitive.div, {
            role: "separator",
            "aria-orientation": "horizontal",
            ...o,
            ref: n
        })
    });
    ej.displayName = "MenuSeparator";
    var eC = r.forwardRef((e, n) => {
        let {
            __scopeMenu: r,
            ...o
        } = e, a = H(r);
        return (0, t.jsx)(w.Arrow, { ...a,
            ...o,
            ref: n
        })
    });
    eC.displayName = "MenuArrow";
    var eb = "MenuSub",
        [eM, eR] = F(eb);
    var eP = "MenuSubTrigger",
        ek = r.forwardRef((e, n) => {
            let o = U(eP, e.__scopeMenu),
                a = G(eP, e.__scopeMenu),
                s = eR(eP, e.__scopeMenu),
                i = J(eP, e.__scopeMenu),
                l = r.useRef(null),
                {
                    pointerGraceTimerRef: d,
                    onPointerGraceIntentChange: u
                } = i,
                p = {
                    __scopeMenu: e.__scopeMenu
                },
                f = r.useCallback(() => {
                    l.current && window.clearTimeout(l.current), l.current = null
                }, []);
            return r.useEffect(() => f, [f]), r.useEffect(() => {
                let e = d.current;
                return () => {
                    window.clearTimeout(e), u(null)
                }
            }, [d, u]), (0, t.jsx)(B, {
                asChild: !0,
                ...p,
                children: (0, t.jsx)(ec, {
                    id: s.triggerId,
                    "aria-haspopup": "menu",
                    "aria-expanded": o.open,
                    "aria-controls": s.contentId,
                    "data-state": eE(o.open),
                    ...e,
                    ref: (0, m.composeRefs)(n, s.onTriggerChange),
                    onClick: t => {
                        e.onClick?.(t), e.disabled || t.defaultPrevented || (t.currentTarget.focus(), o.open || o.onOpenChange(!0))
                    },
                    onPointerMove: (0, c.composeEventHandlers)(e.onPointerMove, eD(t => {
                        i.onItemEnter(t), !t.defaultPrevented && (e.disabled || o.open || l.current || (i.onPointerGraceIntentChange(null), l.current = window.setTimeout(() => {
                            o.onOpenChange(!0), f()
                        }, 100)))
                    })),
                    onPointerLeave: (0, c.composeEventHandlers)(e.onPointerLeave, eD(e => {
                        f();
                        let t = o.content?.getBoundingClientRect();
                        if (t) {
                            let n = o.content?.dataset.side,
                                r = "right" === n,
                                a = t[r ? "left" : "right"],
                                s = t[r ? "right" : "left"];
                            i.onPointerGraceIntentChange({
                                area: [{
                                    x: e.clientX + (r ? -5 : 5),
                                    y: e.clientY
                                }, {
                                    x: a,
                                    y: t.top
                                }, {
                                    x: s,
                                    y: t.top
                                }, {
                                    x: s,
                                    y: t.bottom
                                }, {
                                    x: a,
                                    y: t.bottom
                                }],
                                side: n
                            }), window.clearTimeout(d.current), d.current = window.setTimeout(() => i.onPointerGraceIntentChange(null), 300)
                        } else {
                            if (i.onTriggerLeave(e), e.defaultPrevented) return;
                            i.onPointerGraceIntentChange(null)
                        }
                    })),
                    onKeyDown: (0, c.composeEventHandlers)(e.onKeyDown, t => {
                        let n = "" !== i.searchRef.current;
                        e.disabled || n && " " === t.key || E[a.dir].includes(t.key) && (o.onOpenChange(!0), o.content?.focus(), t.preventDefault())
                    })
                })
            })
        });
    ek.displayName = eP;
    var e_ = "MenuSubContent",
        eN = r.forwardRef((e, n) => {
            let o = Y(q, e.__scopeMenu),
                {
                    forceMount: a = o.forceMount,
                    ...s
                } = e,
                i = U(q, e.__scopeMenu),
                l = G(q, e.__scopeMenu),
                d = eR(e_, e.__scopeMenu),
                u = r.useRef(null),
                p = (0, m.useComposedRefs)(n, u);
            return (0, t.jsx)(D.Provider, {
                scope: e.__scopeMenu,
                children: (0, t.jsx)(j.Presence, {
                    present: a || i.open,
                    children: (0, t.jsx)(D.Slot, {
                        scope: e.__scopeMenu,
                        children: (0, t.jsx)(er, {
                            id: d.contentId,
                            "aria-labelledby": d.triggerId,
                            ...s,
                            ref: p,
                            align: "start",
                            side: "rtl" === l.dir ? "left" : "right",
                            disableOutsidePointerEvents: !1,
                            disableOutsideScroll: !1,
                            trapFocus: !1,
                            onOpenAutoFocus: e => {
                                l.isUsingKeyboardRef.current && u.current?.focus(), e.preventDefault()
                            },
                            onCloseAutoFocus: e => e.preventDefault(),
                            onFocusOutside: (0, c.composeEventHandlers)(e.onFocusOutside, e => {
                                e.target !== d.trigger && i.onOpenChange(!1)
                            }),
                            onEscapeKeyDown: (0, c.composeEventHandlers)(e.onEscapeKeyDown, e => {
                                l.onClose(), e.preventDefault()
                            }),
                            onKeyDown: (0, c.composeEventHandlers)(e.onKeyDown, e => {
                                let t = e.currentTarget.contains(e.target),
                                    n = S[l.dir].includes(e.key);
                                t && n && (i.onOpenChange(!1), d.trigger?.focus(), e.preventDefault())
                            })
                        })
                    })
                })
            })
        });

    function eE(e) {
        return e ? "open" : "closed"
    }

    function eS(e) {
        return "indeterminate" === e
    }

    function eT(e) {
        return eS(e) ? "indeterminate" : e ? "checked" : "unchecked"
    }

    function eD(e) {
        return t => "mouse" === t.pointerType ? e(t) : void 0
    }
    eN.displayName = e_, e.i(34643);
    var eI = "ContextMenu",
        [eO, eF] = (0, d.createContextScope)(eI, [L]),
        eL = L(),
        [eH, eA] = eO(eI),
        eK = e => {
            let {
                __scopeContextMenu: n,
                children: o,
                onOpenChange: a,
                dir: s,
                modal: i = !0
            } = e, [l, c] = r.useState(!1), d = eL(n), u = (0, M.useCallbackRef)(a), p = r.useCallback(e => {
                c(e), u(e)
            }, [u]);
            return (0, t.jsx)(eH, {
                scope: n,
                open: l,
                onOpenChange: p,
                modal: i,
                children: (0, t.jsx)(z, { ...d,
                    dir: s,
                    open: l,
                    onOpenChange: p,
                    modal: i,
                    children: o
                })
            })
        };
    eK.displayName = eI;
    var eU = "ContextMenuTrigger",
        e$ = r.forwardRef((e, n) => {
            let {
                __scopeContextMenu: o,
                disabled: a = !1,
                ...s
            } = e, i = eA(eU, o), l = eL(o), d = r.useRef({
                x: 0,
                y: 0
            }), p = r.useRef({
                getBoundingClientRect: () => DOMRect.fromRect({
                    width: 0,
                    height: 0,
                    ...d.current
                })
            }), m = r.useRef(0), f = r.useCallback(() => window.clearTimeout(m.current), []), x = e => {
                d.current = {
                    x: e.clientX,
                    y: e.clientY
                }, i.onOpenChange(!0)
            };
            return r.useEffect(() => f, [f]), r.useEffect(() => void(a && f()), [a, f]), (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)(B, { ...l,
                    virtualRef: p
                }), (0, t.jsx)(u.Primitive.span, {
                    "data-state": i.open ? "open" : "closed",
                    "data-disabled": a ? "" : void 0,
                    ...s,
                    ref: n,
                    style: {
                        WebkitTouchCallout: "none",
                        ...e.style
                    },
                    onContextMenu: a ? e.onContextMenu : (0, c.composeEventHandlers)(e.onContextMenu, e => {
                        f(), x(e), e.preventDefault()
                    }),
                    onPointerDown: a ? e.onPointerDown : (0, c.composeEventHandlers)(e.onPointerDown, eW(e => {
                        f(), m.current = window.setTimeout(() => x(e), 700)
                    })),
                    onPointerMove: a ? e.onPointerMove : (0, c.composeEventHandlers)(e.onPointerMove, eW(f)),
                    onPointerCancel: a ? e.onPointerCancel : (0, c.composeEventHandlers)(e.onPointerCancel, eW(f)),
                    onPointerUp: a ? e.onPointerUp : (0, c.composeEventHandlers)(e.onPointerUp, eW(f))
                })]
            })
        });
    e$.displayName = eU;
    var eG = e => {
        let {
            __scopeContextMenu: n,
            ...r
        } = e, o = eL(n);
        return (0, t.jsx)(W, { ...o,
            ...r
        })
    };
    eG.displayName = "ContextMenuPortal";
    var ez = "ContextMenuContent",
        eB = r.forwardRef((e, n) => {
            let {
                __scopeContextMenu: o,
                ...a
            } = e, s = eA(ez, o), i = eL(o), l = r.useRef(!1);
            return (0, t.jsx)(Q, { ...i,
                ...a,
                ref: n,
                side: "right",
                sideOffset: 2,
                align: "start",
                onCloseAutoFocus: t => {
                    e.onCloseAutoFocus?.(t), !t.defaultPrevented && l.current && t.preventDefault(), l.current = !1
                },
                onInteractOutside: t => {
                    e.onInteractOutside?.(t), t.defaultPrevented || s.modal || (l.current = !0)
                },
                style: { ...e.style,
                    "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
                }
            })
        });
    eB.displayName = ez;
    var eV = r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(eo, { ...a,
            ...o,
            ref: n
        })
    });
    eV.displayName = "ContextMenuGroup";
    var eX = r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ea, { ...a,
            ...o,
            ref: n
        })
    });
    eX.displayName = "ContextMenuLabel";
    var eY = r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(el, { ...a,
            ...o,
            ref: n
        })
    });
    eY.displayName = "ContextMenuItem", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ed, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuCheckboxItem", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ef, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuRadioGroup", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(eh, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuRadioItem", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ey, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuItemIndicator", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ej, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuSeparator", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(eC, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuArrow";

    function eW(e) {
        return t => "mouse" !== t.pointerType ? e(t) : void 0
    }
    r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(ek, { ...a,
            ...o,
            ref: n
        })
    }).displayName = "ContextMenuSubTrigger", r.forwardRef((e, n) => {
        let {
            __scopeContextMenu: r,
            ...o
        } = e, a = eL(r);
        return (0, t.jsx)(eN, { ...a,
            ...o,
            ref: n,
            style: { ...e.style,
                "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
                "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
                "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
            }
        })
    }).displayName = "ContextMenuSubContent";
    var eq = e.i(98631);
    (0, eq.default)("check", [
        ["path", {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }]
    ]), (0, eq.default)("chevron-right", [
        ["path", {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }]
    ]), (0, eq.default)("circle", [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }]
    ]);
    var eZ = e.i(75157);

    function eJ({ ...e
    }) {
        return (0, t.jsx)(eK, {
            "data-slot": "context-menu",
            ...e
        })
    }

    function eQ({ ...e
    }) {
        return (0, t.jsx)(e$, {
            "data-slot": "context-menu-trigger",
            ...e
        })
    }

    function e0({ ...e
    }) {
        return (0, t.jsx)(eV, {
            "data-slot": "context-menu-group",
            ...e
        })
    }

    function e1({
        className: e,
        ...n
    }) {
        return (0, t.jsx)(eG, {
            children: (0, t.jsx)(eB, {
                "data-slot": "context-menu-content",
                className: (0, eZ.cn)("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", e),
                ...n
            })
        })
    }

    function e2({
        className: e,
        inset: n,
        variant: r = "default",
        ...o
    }) {
        return (0, t.jsx)(eY, {
            "data-slot": "context-menu-item",
            "data-inset": n,
            "data-variant": r,
            className: (0, eZ.cn)("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
            ...o
        })
    }

    function e4({
        className: e,
        inset: n,
        ...r
    }) {
        return (0, t.jsx)(eX, {
            "data-slot": "context-menu-label",
            "data-inset": n,
            className: (0, eZ.cn)("text-muted-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
            ...r
        })
    }
    let e7 = (0, eq.default)("copy", [
        ["rect", {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }],
        ["path", {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }]
    ]);
    var e5 = e.i(47800);
    let e9 = (0, r.lazy)(() => e.A(72146)),
        e3 = ({
            children: e,
            player: r,
            rankings: o,
            achievement: a
        }) => {
            let s = e => window.navigator.clipboard.writeText(e).catch(console.error);
            return (0, t.jsxs)(eJ, {
                children: [(0, t.jsx)(eQ, {
                    asChild: !0,
                    children: e
                }), (0, t.jsx)(e1, {
                    children: (0, t.jsxs)(e0, {
                        children: [(0, t.jsx)(e4, {
                            children: "Profile"
                        }), (0, t.jsxs)(e2, {
                            onClick: () => s(r.uuid),
                            children: [(0, t.jsx)(e7, {}), " Copy UUID"]
                        }), (0, t.jsxs)(e2, {
                            onClick: () => s(r.name),
                            children: [(0, t.jsx)(e7, {}), " Copy username"]
                        }), (0, t.jsxs)(e2, {
                            disabled: !a,
                            className: "gap-2",
                            onClick: () => {
                                let e = (0, n.sortedModes)(o).map(([e, t]) => {
                                    let r = e5.gamemodes.find(t => t.id === e).name,
                                        o = (0, n.calculateGamemodePoints)(t),
                                        [a, s] = t.retired || (0, n.showPeakTier)(t) ? [t.peak_tier, t.peak_pos] : [t.tier, t.pos],
                                        i = `${(0,n.positionLetter)(s)}T${a} (${o} points)`;
                                    return t.retired ? i = `Retired ${i}` : (0, n.showPeakTier)(t) && (i = `Peak ${i}`), `${r}: ${i}`
                                }).join("\n");
                                s(`Title: ${a?.title} (${r.points} points)
${e}`)
                            },
                            children: [(0, t.jsx)(e7, {}), " Copy Tiers"]
                        })]
                    })
                })]
            })
        },
        e6 = ({
            index: e,
            player: n
        }) => (0, t.jsxs)("div", {
            className: "max-w-40 w-full h-14 flex items-center p-2 relative overflow-clip rounded-xs",
            children: [(0, t.jsx)("img", {
                src: `/placements/${e+1>=4?"other.svg":e+1+"-shimmer.svg"}`,
                className: "w-full absolute inset-0 h-full",
                alt: "shimmer"
            }), (0, t.jsxs)("h1", {
                className: "text-4xl font-bold self-end italic absolute drop-shadow-[0px_3px_1px_#232323]",
                children: [e + 1, "."]
            }), (0, t.jsx)(l.default, {
                uuid: n.uuid,
                className: "absolute right-7 drop-shadow-[-4px_-2px_1px_#00000077]",
                width: 60,
                height: 60,
                alt: `${n.name}'s Skin`
            })]
        }),
        e8 = ({
            player: e,
            achievement: n,
            achievementImgUrl: r
        }) => (0, t.jsxs)("div", {
            className: "w-72 truncate",
            children: [(0, t.jsx)("h2", {
                className: "text-2xl text-slate-300 font-bold truncate",
                children: e.name
            }), (0, t.jsxs)("h3", {
                className: "flex gap-1 text-disabled",
                children: [(0, t.jsx)("img", {
                    src: r,
                    className: "object-contain",
                    width: 24,
                    height: 24,
                    alt: `${n?.title} icon`
                }), (0, t.jsxs)("span", {
                    className: "truncate text-slate-400",
                    children: [n?.title, " ", (0, t.jsxs)("span", {
                        className: "text-slate-600",
                        children: ["(", e.points, " points)"]
                    })]
                })]
            })]
        }),
        te = ({
            region: e,
            isMobile: n = !1
        }) => (0, t.jsx)("div", {
            className: `h-[78px] md:bg-slate-700/10 flex items-center justify-center px-4 mr-2 max-md:ml-auto max-md:mr-0 md:ml-auto ${n?"md:hidden":"max-md:hidden"}`,
            children: (0, t.jsx)("span", {
                className: "size-10 p-2 text-xl rounded-md flex items-center justify-center font-extrabold",
                style: {
                    background: `var(--${e.toLowerCase()})`,
                    color: `var(--${e.toLowerCase()}-foreground)`
                },
                children: e
            })
        }),
        tt = ({
            player: e,
            handleFetchPlayer: o,
            index: a
        }) => {
            let [s, l] = (0, r.useState)(!1), [c, d] = (0, r.useState)(null), u = () => {
                c && (l(!0), setTimeout(() => {
                    l(!1), d(null)
                }, 40))
            }, p = (0, n.getPlayerAchievement)(e.points), m = (0, n.getAchievementImgUrl)(p?.title);
            return (0, t.jsx)(e3, {
                player: e,
                rankings: e.rankings,
                achievement: p,
                children: (0, t.jsxs)("div", {
                    className: "player-row-optimized w-full h-20 relative duration-150 sm:hover:-translate-x-4 sm:active:scale-[.99] max-md:h-fit flex flex-col bg-accent/20 hover:bg-accent rounded-xl my-2 border-2 border-border",
                    role: "button",
                    "aria-haspopup": "dialog",
                    onClick: o,
                    onMouseDown: () => {
                        d(e.name)
                    },
                    onMouseUp: u,
                    onMouseLeave: u,
                    children: [(0, t.jsx)(i.default, {
                        condition: s && c === e.name,
                        className: "rounded-xl"
                    }), (0, t.jsxs)("div", {
                        className: "w-full flex gap-2 items-center h-[inherit] max-md:flex-col",
                        children: [(0, t.jsxs)("div", {
                            className: "w-full h-[inherit] flex gap-2 items-center",
                            children: [(0, t.jsx)(e6, {
                                index: a,
                                player: e
                            }), (0, t.jsx)(e8, {
                                player: e,
                                achievement: p,
                                achievementImgUrl: m
                            }), (0, t.jsx)(te, {
                                region: e.region,
                                isMobile: !0
                            })]
                        }), (0, t.jsxs)("div", {
                            className: "ml-auto h-full flex w-fit max-md:flex max-md:flex-wrap max-md:justify-between max-md:w-full max-md:px-1 max-md:py-2",
                            children: [(0, t.jsx)(te, {
                                region: e.region
                            }), (0, t.jsxs)("div", {
                                className: "space-y-1 w-full h-[inherit] flex md:items-center justify-center flex-col px-2",
                                children: [(0, t.jsx)("h2", {
                                    className: "overall_player__label",
                                    children: "Tiers"
                                }), (0, t.jsx)("div", {
                                    className: "overall_player__slots-wrapper max-sm:flex-wrap",
                                    children: (0, t.jsx)(r.Suspense, {
                                        children: (0, t.jsx)(e9, {
                                            rankings: e.rankings,
                                            dynamicColors: !0,
                                            withTooltip: !0,
                                            tooltipSide: "bottom"
                                        })
                                    })
                                })]
                            })]
                        })]
                    })]
                })
            })
        };
    var tn = e.i(42550),
        tr = e.i(2747),
        to = e.i(83827);
    let ta = (0, r.memo)(s.default);
    e.s(["default", 0, () => {
        let e, s, {
                playersArray: i,
                loading: l,
                loadMore: c,
                error: d,
                hasMore: h
            } = (() => {
                let [e, t] = (0, r.useState)([]), [a, s] = (0, r.useState)(!1), [i, l] = (0, r.useState)(0), [c, d] = (0, r.useState)(!1), [u, f] = (0, r.useState)(!0);
                return (0, r.useEffect)(() => {
                    (async () => {
                        try {
                            d(!1), s(!0);
                            let r = await (0, n.fetchOverall)(i, 10);
                            t(t => [...t, ...r || []]), (!r || r.length < 10) && f(!1)
                        } catch (e) {
                            d(!0), f(!1), console.error("Error fetching players:", e), o.toast.error("Error loading players", {
                                description: "Please refresh the page. If the error persists, let a staff member know.",
                                position: "top-center",
                                duration: 5e3
                            })
                        } finally {
                            s(!1)
                        }
                    })()
                }, [i]), {
                    loading: a,
                    playersArray: e,
                    loadMore: () => u && l(e => e >= 90 ? 90 : e + 10),
                    error: c,
                    hasMore: u
                }
            })(),
            {
                profile: u,
                handleFetchPlayer: p,
                hide: m,
                visible: f,
                loadingProfile: _
            } = (0, a.useProfile)();
        return d ? (0, t.jsx)(to.default, {}) : (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsxs)("div", {
                className: "w-full flex gap-2 max-md:hidden font-bold uppercase px-4 text-muted",
                children: [(0, t.jsx)("span", {
                    className: "",
                    children: "#"
                }), (0, t.jsx)("span", {
                    className: "w-[196px] text-right inline-block",
                    children: "Player"
                }), (0, t.jsx)("span", {
                    className: "inline-block text-right ml-auto",
                    children: "Region"
                }), (0, t.jsx)("span", {
                    className: "w-[340px] text-center",
                    children: "Tiers"
                })]
            }), (0, t.jsxs)("div", {
                className: "w-full flex gap-2 md:hidden font-bold uppercase px-4 text-muted",
                children: [(0, t.jsx)("span", {
                    className: "",
                    children: "#"
                }), (0, t.jsx)("span", {
                    className: "w-[196px] text-right inline-block",
                    children: "Player"
                }), (0, t.jsx)("span", {
                    className: "ml-auto w-[84px] inline-block text-right",
                    children: "Region"
                })]
            }), (e = -1, s = 0, i.map((n, r) => (n.points != e && (s = r + 1, e = n.points), (0, t.jsx)(tt, {
                player: n,
                handleFetchPlayer: () => p(n.uuid),
                index: r
            }, r)))), l && 0 === i.length && Array.from({
                length: 10
            }).map((e, n) => (0, t.jsx)(tr.Skeleton, {
                className: "w-full h-20 rounded-xl my-2 bg-accent/50"
            }, n)), 0 !== i.length && h && (0, t.jsx)(tn.default, {
                fn: c,
                dependency: i
            }), (0, t.jsx)(ta, {
                profile: u,
                hide: m,
                visible: f,
                loadingProfile: _
            })]
        })
    }], 22240)
}]);