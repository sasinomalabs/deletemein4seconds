var Gd = Object.defineProperty;
var Kd = (e, t, n) => t in e ? Gd(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
var be = (e, t, n) => (Kd(e, typeof t != "symbol" ? t + "" : t, n), n),
    Wd = (e, t, n) => {
        if (!t.has(e)) throw TypeError("Cannot " + n)
    };
var Fi = (e, t, n) => {
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n)
};
var br = (e, t, n) => (Wd(e, t, "access private method"), n);

function Vo(e, t) {
    const n = Object.create(null),
        s = e.split(",");
    for (let r = 0; r < s.length; r++) n[s[r]] = !0;
    return t ? r => !!n[r.toLowerCase()] : r => !!n[r]
}
const Se = {},
    us = [],
    zt = () => {},
    Qd = () => !1,
    Yd = /^on[^a-z]/,
    ui = e => Yd.test(e),
    Go = e => e.startsWith("onUpdate:"),
    Le = Object.assign,
    Ko = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    Xd = Object.prototype.hasOwnProperty,
    ue = (e, t) => Xd.call(e, t),
    W = Array.isArray,
    ps = e => pi(e) === "[object Map]",
    Ql = e => pi(e) === "[object Set]",
    Z = e => typeof e == "function",
    Ue = e => typeof e == "string",
    Wo = e => typeof e == "symbol",
    Ce = e => e !== null && typeof e == "object",
    Yl = e => Ce(e) && Z(e.then) && Z(e.catch),
    Xl = Object.prototype.toString,
    pi = e => Xl.call(e),
    Jd = e => pi(e).slice(8, -1),
    Jl = e => pi(e) === "[object Object]",
    Qo = e => Ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    $r = Vo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    di = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    Zd = /-(\w)/g,
    yt = di(e => e.replace(Zd, (t, n) => n ? n.toUpperCase() : "")),
    ef = /\B([A-Z])/g,
    Et = di(e => e.replace(ef, "-$1").toLowerCase()),
    fi = di(e => e.charAt(0).toUpperCase() + e.slice(1)),
    Ui = di(e => e ? `on${fi(e)}` : ""),
    qs = (e, t) => !Object.is(e, t),
    zr = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    Wr = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    co = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    },
    lo = e => {
        const t = Ue(e) ? Number(e) : NaN;
        return isNaN(t) ? e : t
    };
let ic;
const uo = () => ic || (ic = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function Yo(e) {
    if (W(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = Ue(s) ? rf(s) : Yo(s);
            if (r)
                for (const i in r) t[i] = r[i]
        }
        return t
    } else {
        if (Ue(e)) return e;
        if (Ce(e)) return e
    }
}
const tf = /;(?![^(]*\))/g,
    nf = /:([^]+)/,
    sf = /\/\*[^]*?\*\//g;

function rf(e) {
    const t = {};
    return e.replace(sf, "").split(tf).forEach(n => {
        if (n) {
            const s = n.split(nf);
            s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
    }), t
}

function ms(e) {
    let t = "";
    if (Ue(e)) t = e;
    else if (W(e))
        for (let n = 0; n < e.length; n++) {
            const s = ms(e[n]);
            s && (t += s + " ")
        } else if (Ce(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}
const of = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", af = Vo(of);

function Zl(e) {
    return !!e || e === ""
}
const Re = e => Ue(e) ? e : e == null ? "" : W(e) || Ce(e) && (e.toString === Xl || !Z(e.toString)) ? JSON.stringify(e, eu, 2) : String(e),
    eu = (e, t) => t && t.__v_isRef ? eu(e, t.value) : ps(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
    } : Ql(t) ? {
        [`Set(${t.size})`]: [...t.values()]
    } : Ce(t) && !W(t) && !Jl(t) ? String(t) : t;
let mt;
class tu {
    constructor(t = !1) {
        this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = mt, !t && mt && (this.index = (mt.scopes || (mt.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = mt;
            try {
                return mt = this, t()
            } finally {
                mt = n
            }
        }
    }
    on() {
        mt = this
    }
    off() {
        mt = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
            for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function nu(e) {
    return new tu(e)
}

function cf(e, t = mt) {
    t && t.active && t.effects.push(e)
}

function Xo() {
    return mt
}

function su(e) {
    mt && mt.cleanups.push(e)
}
const Jo = e => {
        const t = new Set(e);
        return t.w = 0, t.n = 0, t
    },
    ru = e => (e.w & Cn) > 0,
    iu = e => (e.n & Cn) > 0,
    lf = ({
        deps: e
    }) => {
        if (e.length)
            for (let t = 0; t < e.length; t++) e[t].w |= Cn
    },
    uf = e => {
        const {
            deps: t
        } = e;
        if (t.length) {
            let n = 0;
            for (let s = 0; s < t.length; s++) {
                const r = t[s];
                ru(r) && !iu(r) ? r.delete(e) : t[n++] = r, r.w &= ~Cn, r.n &= ~Cn
            }
            t.length = n
        }
    },
    Qr = new WeakMap;
let Is = 0,
    Cn = 1;
const po = 30;
let Dt;
const Vn = Symbol(""),
    fo = Symbol("");
class Zo {
    constructor(t, n = null, s) {
        this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, cf(this, s)
    }
    run() {
        if (!this.active) return this.fn();
        let t = Dt,
            n = kn;
        for (; t;) {
            if (t === this) return;
            t = t.parent
        }
        try {
            return this.parent = Dt, Dt = this, kn = !0, Cn = 1 << ++Is, Is <= po ? lf(this) : oc(this), this.fn()
        } finally {
            Is <= po && uf(this), Cn = 1 << --Is, Dt = this.parent, kn = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        Dt === this ? this.deferStop = !0 : this.active && (oc(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function oc(e) {
    const {
        deps: t
    } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}
let kn = !0;
const ou = [];

function ys() {
    ou.push(kn), kn = !1
}

function bs() {
    const e = ou.pop();
    kn = e === void 0 ? !0 : e
}

function ht(e, t, n) {
    if (kn && Dt) {
        let s = Qr.get(e);
        s || Qr.set(e, s = new Map);
        let r = s.get(n);
        r || s.set(n, r = Jo()), au(r)
    }
}

function au(e, t) {
    let n = !1;
    Is <= po ? iu(e) || (e.n |= Cn, n = !ru(e)) : n = !e.has(Dt), n && (e.add(Dt), Dt.deps.push(e))
}

function ln(e, t, n, s, r, i) {
    const o = Qr.get(e);
    if (!o) return;
    let a = [];
    if (t === "clear") a = [...o.values()];
    else if (n === "length" && W(e)) {
        const c = Number(s);
        o.forEach((l, u) => {
            (u === "length" || u >= c) && a.push(l)
        })
    } else switch (n !== void 0 && a.push(o.get(n)), t) {
        case "add":
            W(e) ? Qo(n) && a.push(o.get("length")) : (a.push(o.get(Vn)), ps(e) && a.push(o.get(fo)));
            break;
        case "delete":
            W(e) || (a.push(o.get(Vn)), ps(e) && a.push(o.get(fo)));
            break;
        case "set":
            ps(e) && a.push(o.get(Vn));
            break
    }
    if (a.length === 1) a[0] && ho(a[0]);
    else {
        const c = [];
        for (const l of a) l && c.push(...l);
        ho(Jo(c))
    }
}

function ho(e, t) {
    const n = W(e) ? e : [...e];
    for (const s of n) s.computed && ac(s);
    for (const s of n) s.computed || ac(s)
}

function ac(e, t) {
    (e !== Dt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}

function pf(e, t) {
    var n;
    return (n = Qr.get(e)) == null ? void 0 : n.get(t)
}
const df = Vo("__proto__,__v_isRef,__isVue"),
    cu = new Set(Object.getOwnPropertyNames(Symbol).filter(e => e !== "arguments" && e !== "caller").map(e => Symbol[e]).filter(Wo)),
    ff = ea(),
    hf = ea(!1, !0),
    mf = ea(!0),
    cc = gf();

function gf() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t => {
        e[t] = function(...n) {
            const s = oe(this);
            for (let i = 0, o = this.length; i < o; i++) ht(s, "get", i + "");
            const r = s[t](...n);
            return r === -1 || r === !1 ? s[t](...n.map(oe)) : r
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(t => {
        e[t] = function(...n) {
            ys();
            const s = oe(this)[t].apply(this, n);
            return bs(), s
        }
    }), e
}

function wf(e) {
    const t = oe(this);
    return ht(t, "has", e), t.hasOwnProperty(e)
}

function ea(e = !1, t = !1) {
    return function(s, r, i) {
        if (r === "__v_isReactive") return !e;
        if (r === "__v_isReadonly") return e;
        if (r === "__v_isShallow") return t;
        if (r === "__v_raw" && i === (e ? t ? If : fu : t ? du : pu).get(s)) return s;
        const o = W(s);
        if (!e) {
            if (o && ue(cc, r)) return Reflect.get(cc, r, i);
            if (r === "hasOwnProperty") return wf
        }
        const a = Reflect.get(s, r, i);
        return (Wo(r) ? cu.has(r) : df(r)) || (e || ht(s, "get", r), t) ? a : Ne(a) ? o && Qo(r) ? a : a.value : Ce(a) ? e ? nr(a) : De(a) : a
    }
}
const vf = lu(),
    yf = lu(!0);

function lu(e = !1) {
    return function(n, s, r, i) {
        let o = n[s];
        if (gs(o) && Ne(o) && !Ne(r)) return !1;
        if (!e && (!Yr(r) && !gs(r) && (o = oe(o), r = oe(r)), !W(n) && Ne(o) && !Ne(r))) return o.value = r, !0;
        const a = W(n) && Qo(s) ? Number(s) < n.length : ue(n, s),
            c = Reflect.set(n, s, r, i);
        return n === oe(i) && (a ? qs(r, o) && ln(n, "set", s, r) : ln(n, "add", s, r)), c
    }
}

function bf(e, t) {
    const n = ue(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && ln(e, "delete", t, void 0), s
}

function _f(e, t) {
    const n = Reflect.has(e, t);
    return (!Wo(t) || !cu.has(t)) && ht(e, "has", t), n
}

function xf(e) {
    return ht(e, "iterate", W(e) ? "length" : Vn), Reflect.ownKeys(e)
}
const uu = {
        get: ff,
        set: vf,
        deleteProperty: bf,
        has: _f,
        ownKeys: xf
    },
    kf = {
        get: mf,
        set(e, t) {
            return !0
        },
        deleteProperty(e, t) {
            return !0
        }
    },
    Ef = Le({}, uu, {
        get: hf,
        set: yf
    }),
    ta = e => e,
    hi = e => Reflect.getPrototypeOf(e);

function _r(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const r = oe(e),
        i = oe(t);
    n || (t !== i && ht(r, "get", t), ht(r, "get", i));
    const {
        has: o
    } = hi(r), a = s ? ta : n ? ra : Hs;
    if (o.call(r, t)) return a(e.get(t));
    if (o.call(r, i)) return a(e.get(i));
    e !== r && e.get(t)
}

function xr(e, t = !1) {
    const n = this.__v_raw,
        s = oe(n),
        r = oe(e);
    return t || (e !== r && ht(s, "has", e), ht(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r)
}

function kr(e, t = !1) {
    return e = e.__v_raw, !t && ht(oe(e), "iterate", Vn), Reflect.get(e, "size", e)
}

function lc(e) {
    e = oe(e);
    const t = oe(this);
    return hi(t).has.call(t, e) || (t.add(e), ln(t, "add", e, e)), this
}

function uc(e, t) {
    t = oe(t);
    const n = oe(this),
        {
            has: s,
            get: r
        } = hi(n);
    let i = s.call(n, e);
    i || (e = oe(e), i = s.call(n, e));
    const o = r.call(n, e);
    return n.set(e, t), i ? qs(t, o) && ln(n, "set", e, t) : ln(n, "add", e, t), this
}

function pc(e) {
    const t = oe(this),
        {
            has: n,
            get: s
        } = hi(t);
    let r = n.call(t, e);
    r || (e = oe(e), r = n.call(t, e)), s && s.call(t, e);
    const i = t.delete(e);
    return r && ln(t, "delete", e, void 0), i
}

function dc() {
    const e = oe(this),
        t = e.size !== 0,
        n = e.clear();
    return t && ln(e, "clear", void 0, void 0), n
}

function Er(e, t) {
    return function(s, r) {
        const i = this,
            o = i.__v_raw,
            a = oe(o),
            c = t ? ta : e ? ra : Hs;
        return !e && ht(a, "iterate", Vn), o.forEach((l, u) => s.call(r, c(l), c(u), i))
    }
}

function Ar(e, t, n) {
    return function(...s) {
        const r = this.__v_raw,
            i = oe(r),
            o = ps(i),
            a = e === "entries" || e === Symbol.iterator && o,
            c = e === "keys" && o,
            l = r[e](...s),
            u = n ? ta : t ? ra : Hs;
        return !t && ht(i, "iterate", c ? fo : Vn), {
            next() {
                const {
                    value: p,
                    done: d
                } = l.next();
                return d ? {
                    value: p,
                    done: d
                } : {
                    value: a ? [u(p[0]), u(p[1])] : u(p),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function mn(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}

function Af() {
    const e = {
            get(i) {
                return _r(this, i)
            },
            get size() {
                return kr(this)
            },
            has: xr,
            add: lc,
            set: uc,
            delete: pc,
            clear: dc,
            forEach: Er(!1, !1)
        },
        t = {
            get(i) {
                return _r(this, i, !1, !0)
            },
            get size() {
                return kr(this)
            },
            has: xr,
            add: lc,
            set: uc,
            delete: pc,
            clear: dc,
            forEach: Er(!1, !0)
        },
        n = {
            get(i) {
                return _r(this, i, !0)
            },
            get size() {
                return kr(this, !0)
            },
            has(i) {
                return xr.call(this, i, !0)
            },
            add: mn("add"),
            set: mn("set"),
            delete: mn("delete"),
            clear: mn("clear"),
            forEach: Er(!0, !1)
        },
        s = {
            get(i) {
                return _r(this, i, !0, !0)
            },
            get size() {
                return kr(this, !0)
            },
            has(i) {
                return xr.call(this, i, !0)
            },
            add: mn("add"),
            set: mn("set"),
            delete: mn("delete"),
            clear: mn("clear"),
            forEach: Er(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        e[i] = Ar(i, !1, !1), n[i] = Ar(i, !0, !1), t[i] = Ar(i, !1, !0), s[i] = Ar(i, !0, !0)
    }), [e, n, t, s]
}
const [Tf, Sf, Cf, Of] = Af();

function na(e, t) {
    const n = t ? e ? Of : Cf : e ? Sf : Tf;
    return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(ue(n, r) && r in s ? n : s, r, i)
}
const Rf = {
        get: na(!1, !1)
    },
    Nf = {
        get: na(!1, !0)
    },
    Lf = {
        get: na(!0, !1)
    },
    pu = new WeakMap,
    du = new WeakMap,
    fu = new WeakMap,
    If = new WeakMap;

function Pf(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Df(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Pf(Jd(e))
}

function De(e) {
    return gs(e) ? e : sa(e, !1, uu, Rf, pu)
}

function $f(e) {
    return sa(e, !1, Ef, Nf, du)
}

function nr(e) {
    return sa(e, !0, kf, Lf, fu)
}

function sa(e, t, n, s, r) {
    if (!Ce(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = r.get(e);
    if (i) return i;
    const o = Df(e);
    if (o === 0) return e;
    const a = new Proxy(e, o === 2 ? s : n);
    return r.set(e, a), a
}

function En(e) {
    return gs(e) ? En(e.__v_raw) : !!(e && e.__v_isReactive)
}

function gs(e) {
    return !!(e && e.__v_isReadonly)
}

function Yr(e) {
    return !!(e && e.__v_isShallow)
}

function hu(e) {
    return En(e) || gs(e)
}

function oe(e) {
    const t = e && e.__v_raw;
    return t ? oe(t) : e
}

function mi(e) {
    return Wr(e, "__v_skip", !0), e
}
const Hs = e => Ce(e) ? De(e) : e,
    ra = e => Ce(e) ? nr(e) : e;

function mu(e) {
    kn && Dt && (e = oe(e), au(e.dep || (e.dep = Jo())))
}

function gu(e, t) {
    e = oe(e);
    const n = e.dep;
    n && ho(n)
}

function Ne(e) {
    return !!(e && e.__v_isRef === !0)
}

function ce(e) {
    return zf(e, !1)
}

function zf(e, t) {
    return Ne(e) ? e : new Mf(e, t)
}
class Mf {
    constructor(t, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : oe(t), this._value = n ? t : Hs(t)
    }
    get value() {
        return mu(this), this._value
    }
    set value(t) {
        const n = this.__v_isShallow || Yr(t) || gs(t);
        t = n ? t : oe(t), qs(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Hs(t), gu(this))
    }
}

function b(e) {
    return Ne(e) ? e.value : e
}
const Ff = {
    get: (e, t, n) => b(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return Ne(r) && !Ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s)
    }
};

function wu(e) {
    return En(e) ? e : new Proxy(e, Ff)
}

function Uf(e) {
    const t = W(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = jf(e, n);
    return t
}
class Bf {
    constructor(t, n, s) {
        this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return pf(oe(this._object), this._key)
    }
}

function jf(e, t, n) {
    const s = e[t];
    return Ne(s) ? s : new Bf(e, t, n)
}
class qf {
    constructor(t, n, s, r) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Zo(t, () => {
            this._dirty || (this._dirty = !0, gu(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s
    }
    get value() {
        const t = oe(this);
        return mu(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value
    }
    set value(t) {
        this._setter(t)
    }
}

function Hf(e, t, n = !1) {
    let s, r;
    const i = Z(e);
    return i ? (s = e, r = zt) : (s = e.get, r = e.set), new qf(s, r, i || !r, n)
}

function An(e, t, n, s) {
    let r;
    try {
        r = s ? e(...s) : e()
    } catch (i) {
        sr(i, t, n)
    }
    return r
}

function St(e, t, n, s) {
    if (Z(e)) {
        const i = An(e, t, n, s);
        return i && Yl(i) && i.catch(o => {
            sr(o, t, n)
        }), i
    }
    const r = [];
    for (let i = 0; i < e.length; i++) r.push(St(e[i], t, n, s));
    return r
}

function sr(e, t, n, s = !0) {
    const r = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const o = t.proxy,
            a = n;
        for (; i;) {
            const l = i.ec;
            if (l) {
                for (let u = 0; u < l.length; u++)
                    if (l[u](e, o, a) === !1) return
            }
            i = i.parent
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            An(c, null, 10, [e, o, a]);
            return
        }
    }
    Vf(e, n, r, s)
}

function Vf(e, t, n, s = !0) {
    console.error(e)
}
let Vs = !1,
    mo = !1;
const tt = [];
let Wt = 0;
const ds = [];
let an = null,
    Un = 0;
const vu = Promise.resolve();
let ia = null;

function oa(e) {
    const t = ia || vu;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Gf(e) {
    let t = Wt + 1,
        n = tt.length;
    for (; t < n;) {
        const s = t + n >>> 1;
        Gs(tt[s]) < e ? t = s + 1 : n = s
    }
    return t
}

function gi(e) {
    (!tt.length || !tt.includes(e, Vs && e.allowRecurse ? Wt + 1 : Wt)) && (e.id == null ? tt.push(e) : tt.splice(Gf(e.id), 0, e), yu())
}

function yu() {
    !Vs && !mo && (mo = !0, ia = vu.then(_u))
}

function Kf(e) {
    const t = tt.indexOf(e);
    t > Wt && tt.splice(t, 1)
}

function Wf(e) {
    W(e) ? ds.push(...e) : (!an || !an.includes(e, e.allowRecurse ? Un + 1 : Un)) && ds.push(e), yu()
}

function fc(e, t = Vs ? Wt + 1 : 0) {
    for (; t < tt.length; t++) {
        const n = tt[t];
        n && n.pre && (tt.splice(t, 1), t--, n())
    }
}

function bu(e) {
    if (ds.length) {
        const t = [...new Set(ds)];
        if (ds.length = 0, an) {
            an.push(...t);
            return
        }
        for (an = t, an.sort((n, s) => Gs(n) - Gs(s)), Un = 0; Un < an.length; Un++) an[Un]();
        an = null, Un = 0
    }
}
const Gs = e => e.id == null ? 1 / 0 : e.id,
    Qf = (e, t) => {
        const n = Gs(e) - Gs(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1
        }
        return n
    };

function _u(e) {
    mo = !1, Vs = !0, tt.sort(Qf);
    const t = zt;
    try {
        for (Wt = 0; Wt < tt.length; Wt++) {
            const n = tt[Wt];
            n && n.active !== !1 && An(n, null, 14)
        }
    } finally {
        Wt = 0, tt.length = 0, bu(), Vs = !1, ia = null, (tt.length || ds.length) && _u()
    }
}

function Yf(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || Se;
    let r = n;
    const i = t.startsWith("update:"),
        o = i && t.slice(7);
    if (o && o in s) {
        const u = `${o==="modelValue"?"model":o}Modifiers`,
            {
                number: p,
                trim: d
            } = s[u] || Se;
        d && (r = n.map(g => Ue(g) ? g.trim() : g)), p && (r = n.map(co))
    }
    let a, c = s[a = Ui(t)] || s[a = Ui(yt(t))];
    !c && i && (c = s[a = Ui(Et(t))]), c && St(c, e, 6, r);
    const l = s[a + "Once"];
    if (l) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[a]) return;
        e.emitted[a] = !0, St(l, e, 6, r)
    }
}

function xu(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const i = e.emits;
    let o = {},
        a = !1;
    if (!Z(e)) {
        const c = l => {
            const u = xu(l, t, !0);
            u && (a = !0, Le(o, u))
        };
        !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
    }
    return !i && !a ? (Ce(e) && s.set(e, null), null) : (W(i) ? i.forEach(c => o[c] = null) : Le(o, i), Ce(e) && s.set(e, o), o)
}

function wi(e, t) {
    return !e || !ui(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ue(e, t[0].toLowerCase() + t.slice(1)) || ue(e, Et(t)) || ue(e, t))
}
let Ke = null,
    ku = null;

function Xr(e) {
    const t = Ke;
    return Ke = e, ku = e && e.type.__scopeId || null, t
}

function Y(e, t = Ke, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && Ac(-1);
        const i = Xr(t);
        let o;
        try {
            o = e(...r)
        } finally {
            Xr(i), s._d && Ac(1)
        }
        return o
    };
    return s._n = !0, s._c = !0, s._d = !0, s
}

function Bi(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: r,
        props: i,
        propsOptions: [o],
        slots: a,
        attrs: c,
        emit: l,
        render: u,
        renderCache: p,
        data: d,
        setupState: g,
        ctx: v,
        inheritAttrs: w
    } = e;
    let y, x;
    const S = Xr(e);
    try {
        if (n.shapeFlag & 4) {
            const E = r || s;
            y = Kt(u.call(E, E, p, i, g, d, v)), x = c
        } else {
            const E = t;
            y = Kt(E.length > 1 ? E(i, {
                attrs: c,
                slots: a,
                emit: l
            }) : E(i, null)), x = t.props ? c : Xf(c)
        }
    } catch (E) {
        Ms.length = 0, sr(E, e, 1), y = $(Ct)
    }
    let R = y;
    if (x && w !== !1) {
        const E = Object.keys(x),
            {
                shapeFlag: V
            } = R;
        E.length && V & 7 && (o && E.some(Go) && (x = Jf(x, o)), R = On(R, x))
    }
    return n.dirs && (R = On(R), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && (R.transition = n.transition), y = R, Xr(S), y
}
const Xf = e => {
        let t;
        for (const n in e)(n === "class" || n === "style" || ui(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    Jf = (e, t) => {
        const n = {};
        for (const s in e)(!Go(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n
    };

function Zf(e, t, n) {
    const {
        props: s,
        children: r,
        component: i
    } = e, {
        props: o,
        children: a,
        patchFlag: c
    } = t, l = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return s ? hc(s, o, l) : !!o;
        if (c & 8) {
            const u = t.dynamicProps;
            for (let p = 0; p < u.length; p++) {
                const d = u[p];
                if (o[d] !== s[d] && !wi(l, d)) return !0
            }
        }
    } else return (r || a) && (!a || !a.$stable) ? !0 : s === o ? !1 : s ? o ? hc(s, o, l) : !0 : !!o;
    return !1
}

function hc(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const i = s[r];
        if (t[i] !== e[i] && !wi(n, i)) return !0
    }
    return !1
}

function eh({
    vnode: e,
    parent: t
}, n) {
    for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
}
const th = e => e.__isSuspense;

function nh(e, t) {
    t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Wf(e)
}

function Eu(e, t) {
    return aa(e, null, t)
}
const Tr = {};

function Tn(e, t, n) {
    return aa(e, t, n)
}

function aa(e, t, {
    immediate: n,
    deep: s,
    flush: r,
    onTrack: i,
    onTrigger: o
} = Se) {
    var a;
    const c = Xo() === ((a = ze) == null ? void 0 : a.scope) ? ze : null;
    let l, u = !1,
        p = !1;
    if (Ne(e) ? (l = () => e.value, u = Yr(e)) : En(e) ? (l = () => e, s = !0) : W(e) ? (p = !0, u = e.some(E => En(E) || Yr(E)), l = () => e.map(E => {
            if (Ne(E)) return E.value;
            if (En(E)) return qn(E);
            if (Z(E)) return An(E, c, 2)
        })) : Z(e) ? t ? l = () => An(e, c, 2) : l = () => {
            if (!(c && c.isUnmounted)) return d && d(), St(e, c, 3, [g])
        } : l = zt, t && s) {
        const E = l;
        l = () => qn(E())
    }
    let d, g = E => {
            d = S.onStop = () => {
                An(E, c, 4)
            }
        },
        v;
    if (vs)
        if (g = zt, t ? n && St(t, c, 3, [l(), p ? [] : void 0, g]) : l(), r === "sync") {
            const E = Wh();
            v = E.__watcherHandles || (E.__watcherHandles = [])
        } else return zt;
    let w = p ? new Array(e.length).fill(Tr) : Tr;
    const y = () => {
        if (!!S.active)
            if (t) {
                const E = S.run();
                (s || u || (p ? E.some((V, re) => qs(V, w[re])) : qs(E, w))) && (d && d(), St(t, c, 3, [E, w === Tr ? void 0 : p && w[0] === Tr ? [] : w, g]), w = E)
            } else S.run()
    };
    y.allowRecurse = !!t;
    let x;
    r === "sync" ? x = y : r === "post" ? x = () => pt(y, c && c.suspense) : (y.pre = !0, c && (y.id = c.uid), x = () => gi(y));
    const S = new Zo(l, x);
    t ? n ? y() : w = S.run() : r === "post" ? pt(S.run.bind(S), c && c.suspense) : S.run();
    const R = () => {
        S.stop(), c && c.scope && Ko(c.scope.effects, S)
    };
    return v && v.push(R), R
}

function sh(e, t, n) {
    const s = this.proxy,
        r = Ue(e) ? e.includes(".") ? Au(s, e) : () => s[e] : e.bind(s, s);
    let i;
    Z(t) ? i = t : (i = t.handler, n = t);
    const o = ze;
    ws(this);
    const a = aa(r, i.bind(s), n);
    return o ? ws(o) : Gn(), a
}

function Au(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s
    }
}

function qn(e, t) {
    if (!Ce(e) || e.__v_skip || (t = t || new Set, t.has(e))) return e;
    if (t.add(e), Ne(e)) qn(e.value, t);
    else if (W(e))
        for (let n = 0; n < e.length; n++) qn(e[n], t);
    else if (Ql(e) || ps(e)) e.forEach(n => {
        qn(n, t)
    });
    else if (Jl(e))
        for (const n in e) qn(e[n], t);
    return e
}

function Ks(e, t) {
    const n = Ke;
    if (n === null) return e;
    const s = xi(n) || n.proxy,
        r = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let [o, a, c, l = Se] = t[i];
        o && (Z(o) && (o = {
            mounted: o,
            updated: o
        }), o.deep && qn(a), r.push({
            dir: o,
            instance: s,
            value: a,
            oldValue: void 0,
            arg: c,
            modifiers: l
        }))
    }
    return e
}

function Pn(e, t, n, s) {
    const r = e.dirs,
        i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const a = r[o];
        i && (a.oldValue = i[o].value);
        let c = a.dir[s];
        c && (ys(), St(c, n, 8, [e.el, a, e, t]), bs())
    }
}

function Tu() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return dn(() => {
        e.isMounted = !0
    }), Nu(() => {
        e.isUnmounting = !0
    }), e
}
const xt = [Function, Array],
    Su = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: xt,
        onEnter: xt,
        onAfterEnter: xt,
        onEnterCancelled: xt,
        onBeforeLeave: xt,
        onLeave: xt,
        onAfterLeave: xt,
        onLeaveCancelled: xt,
        onBeforeAppear: xt,
        onAppear: xt,
        onAfterAppear: xt,
        onAppearCancelled: xt
    },
    rh = {
        name: "BaseTransition",
        props: Su,
        setup(e, {
            slots: t
        }) {
            const n = da(),
                s = Tu();
            let r;
            return () => {
                const i = t.default && ca(t.default(), !0);
                if (!i || !i.length) return;
                let o = i[0];
                if (i.length > 1) {
                    for (const w of i)
                        if (w.type !== Ct) {
                            o = w;
                            break
                        }
                }
                const a = oe(e),
                    {
                        mode: c
                    } = a;
                if (s.isLeaving) return ji(o);
                const l = mc(o);
                if (!l) return ji(o);
                const u = Ws(l, a, s, n);
                Qs(l, u);
                const p = n.subTree,
                    d = p && mc(p);
                let g = !1;
                const {
                    getTransitionKey: v
                } = l.type;
                if (v) {
                    const w = v();
                    r === void 0 ? r = w : w !== r && (r = w, g = !0)
                }
                if (d && d.type !== Ct && (!Bn(l, d) || g)) {
                    const w = Ws(d, a, s, n);
                    if (Qs(d, w), c === "out-in") return s.isLeaving = !0, w.afterLeave = () => {
                        s.isLeaving = !1, n.update.active !== !1 && n.update()
                    }, ji(o);
                    c === "in-out" && l.type !== Ct && (w.delayLeave = (y, x, S) => {
                        const R = Cu(s, d);
                        R[String(d.key)] = d, y._leaveCb = () => {
                            x(), y._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = S
                    })
                }
                return o
            }
        }
    },
    ih = rh;

function Cu(e, t) {
    const {
        leavingVNodes: n
    } = e;
    let s = n.get(t.type);
    return s || (s = Object.create(null), n.set(t.type, s)), s
}

function Ws(e, t, n, s) {
    const {
        appear: r,
        mode: i,
        persisted: o = !1,
        onBeforeEnter: a,
        onEnter: c,
        onAfterEnter: l,
        onEnterCancelled: u,
        onBeforeLeave: p,
        onLeave: d,
        onAfterLeave: g,
        onLeaveCancelled: v,
        onBeforeAppear: w,
        onAppear: y,
        onAfterAppear: x,
        onAppearCancelled: S
    } = t, R = String(e.key), E = Cu(n, e), V = (F, q) => {
        F && St(F, s, 9, q)
    }, re = (F, q) => {
        const X = q[1];
        V(F, q), W(F) ? F.every(we => we.length <= 1) && X() : F.length <= 1 && X()
    }, le = {
        mode: i,
        persisted: o,
        beforeEnter(F) {
            let q = a;
            if (!n.isMounted)
                if (r) q = w || a;
                else return;
            F._leaveCb && F._leaveCb(!0);
            const X = E[R];
            X && Bn(e, X) && X.el._leaveCb && X.el._leaveCb(), V(q, [F])
        },
        enter(F) {
            let q = c,
                X = l,
                we = u;
            if (!n.isMounted)
                if (r) q = y || c, X = x || l, we = S || u;
                else return;
            let B = !1;
            const se = F._enterCb = Ie => {
                B || (B = !0, Ie ? V(we, [F]) : V(X, [F]), le.delayedLeave && le.delayedLeave(), F._enterCb = void 0)
            };
            q ? re(q, [F, se]) : se()
        },
        leave(F, q) {
            const X = String(e.key);
            if (F._enterCb && F._enterCb(!0), n.isUnmounting) return q();
            V(p, [F]);
            let we = !1;
            const B = F._leaveCb = se => {
                we || (we = !0, q(), se ? V(v, [F]) : V(g, [F]), F._leaveCb = void 0, E[X] === e && delete E[X])
            };
            E[X] = e, d ? re(d, [F, B]) : B()
        },
        clone(F) {
            return Ws(F, t, n, s)
        }
    };
    return le
}

function ji(e) {
    if (rr(e)) return e = On(e), e.children = null, e
}

function mc(e) {
    return rr(e) ? e.children ? e.children[0] : void 0 : e
}

function Qs(e, t) {
    e.shapeFlag & 6 && e.component ? Qs(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function ca(e, t = !1, n) {
    let s = [],
        r = 0;
    for (let i = 0; i < e.length; i++) {
        let o = e[i];
        const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
        o.type === Pe ? (o.patchFlag & 128 && r++, s = s.concat(ca(o.children, t, a))) : (t || o.type !== Ct) && s.push(a != null ? On(o, {
            key: a
        }) : o)
    }
    if (r > 1)
        for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
    return s
}

function he(e, t) {
    return Z(e) ? (() => Le({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}
const $s = e => !!e.type.__asyncLoader;

function Xt(e) {
    Z(e) && (e = {
        loader: e
    });
    const {
        loader: t,
        loadingComponent: n,
        errorComponent: s,
        delay: r = 200,
        timeout: i,
        suspensible: o = !0,
        onError: a
    } = e;
    let c = null,
        l, u = 0;
    const p = () => (u++, c = null, d()),
        d = () => {
            let g;
            return c || (g = c = t().catch(v => {
                if (v = v instanceof Error ? v : new Error(String(v)), a) return new Promise((w, y) => {
                    a(v, () => w(p()), () => y(v), u + 1)
                });
                throw v
            }).then(v => g !== c && c ? c : (v && (v.__esModule || v[Symbol.toStringTag] === "Module") && (v = v.default), l = v, v)))
        };
    return he({
        name: "AsyncComponentWrapper",
        __asyncLoader: d,
        get __asyncResolved() {
            return l
        },
        setup() {
            const g = ze;
            if (l) return () => qi(l, g);
            const v = S => {
                c = null, sr(S, g, 13, !s)
            };
            if (o && g.suspense || vs) return d().then(S => () => qi(S, g)).catch(S => (v(S), () => s ? $(s, {
                error: S
            }) : null));
            const w = ce(!1),
                y = ce(),
                x = ce(!!r);
            return r && setTimeout(() => {
                x.value = !1
            }, r), i != null && setTimeout(() => {
                if (!w.value && !y.value) {
                    const S = new Error(`Async component timed out after ${i}ms.`);
                    v(S), y.value = S
                }
            }, i), d().then(() => {
                w.value = !0, g.parent && rr(g.parent.vnode) && gi(g.parent.update)
            }).catch(S => {
                v(S), y.value = S
            }), () => {
                if (w.value && l) return qi(l, g);
                if (y.value && s) return $(s, {
                    error: y.value
                });
                if (n && !x.value) return $(n)
            }
        }
    })
}

function qi(e, t) {
    const {
        ref: n,
        props: s,
        children: r,
        ce: i
    } = t.vnode, o = $(e, s, r);
    return o.ref = n, o.ce = i, delete t.vnode.ce, o
}
const rr = e => e.type.__isKeepAlive;

function oh(e, t) {
    Ou(e, "a", t)
}

function ah(e, t) {
    Ou(e, "da", t)
}

function Ou(e, t, n = ze) {
    const s = e.__wdc || (e.__wdc = () => {
        let r = n;
        for (; r;) {
            if (r.isDeactivated) return;
            r = r.parent
        }
        return e()
    });
    if (vi(t, s, n), n) {
        let r = n.parent;
        for (; r && r.parent;) rr(r.parent.vnode) && ch(s, t, n, r), r = r.parent
    }
}

function ch(e, t, n, s) {
    const r = vi(t, e, s, !0);
    Lu(() => {
        Ko(s[t], r)
    }, n)
}

function vi(e, t, n = ze, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            i = t.__weh || (t.__weh = (...o) => {
                if (n.isUnmounted) return;
                ys(), ws(n);
                const a = St(t, n, e, o);
                return Gn(), bs(), a
            });
        return s ? r.unshift(i) : r.push(i), i
    }
}
const pn = e => (t, n = ze) => (!vs || e === "sp") && vi(e, (...s) => t(...s), n),
    lh = pn("bm"),
    dn = pn("m"),
    uh = pn("bu"),
    Ru = pn("u"),
    Nu = pn("bum"),
    Lu = pn("um"),
    ph = pn("sp"),
    dh = pn("rtg"),
    fh = pn("rtc");

function hh(e, t = ze) {
    vi("ec", e, t)
}
const Iu = "components",
    Pu = Symbol.for("v-ndc");

function ir(e) {
    return Ue(e) ? mh(Iu, e, !1) || e : e || Pu
}

function mh(e, t, n = !0, s = !1) {
    const r = Ke || ze;
    if (r) {
        const i = r.type;
        if (e === Iu) {
            const a = Hh(i, !1);
            if (a && (a === t || a === yt(t) || a === fi(yt(t)))) return i
        }
        const o = gc(r[e] || i[e], t) || gc(r.appContext[e], t);
        return !o && s ? i : o
    }
}

function gc(e, t) {
    return e && (e[t] || e[yt(t)] || e[fi(yt(t))])
}

function Wn(e, t, n, s) {
    let r;
    const i = n && n[s];
    if (W(e) || Ue(e)) {
        r = new Array(e.length);
        for (let o = 0, a = e.length; o < a; o++) r[o] = t(e[o], o, void 0, i && i[o])
    } else if (typeof e == "number") {
        r = new Array(e);
        for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o])
    } else if (Ce(e))
        if (e[Symbol.iterator]) r = Array.from(e, (o, a) => t(o, a, void 0, i && i[a]));
        else {
            const o = Object.keys(e);
            r = new Array(o.length);
            for (let a = 0, c = o.length; a < c; a++) {
                const l = o[a];
                r[a] = t(e[l], l, a, i && i[a])
            }
        }
    else r = [];
    return n && (n[s] = r), r
}

function _t(e, t, n = {}, s, r) {
    if (Ke.isCE || Ke.parent && $s(Ke.parent) && Ke.parent.isCE) return t !== "default" && (n.name = t), $("slot", n, s && s());
    let i = e[t];
    i && i._c && (i._d = !1), P();
    const o = i && Du(i(n)),
        a = Te(Pe, {
            key: n.key || o && o.key || `_${t}`
        }, o || (s ? s() : []), o && e._ === 1 ? 64 : -2);
    return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function Du(e) {
    return e.some(t => Zr(t) ? !(t.type === Ct || t.type === Pe && !Du(t.children)) : !0) ? e : null
}
const go = e => e ? Ku(e) ? xi(e) || e.proxy : go(e.parent) : null,
    zs = Le(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => go(e.parent),
        $root: e => go(e.root),
        $emit: e => e.emit,
        $options: e => la(e),
        $forceUpdate: e => e.f || (e.f = () => gi(e.update)),
        $nextTick: e => e.n || (e.n = oa.bind(e.proxy)),
        $watch: e => sh.bind(e)
    }),
    Hi = (e, t) => e !== Se && !e.__isScriptSetup && ue(e, t),
    gh = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: i,
                accessCache: o,
                type: a,
                appContext: c
            } = e;
            let l;
            if (t[0] !== "$") {
                const g = o[t];
                if (g !== void 0) switch (g) {
                    case 1:
                        return s[t];
                    case 2:
                        return r[t];
                    case 4:
                        return n[t];
                    case 3:
                        return i[t]
                } else {
                    if (Hi(s, t)) return o[t] = 1, s[t];
                    if (r !== Se && ue(r, t)) return o[t] = 2, r[t];
                    if ((l = e.propsOptions[0]) && ue(l, t)) return o[t] = 3, i[t];
                    if (n !== Se && ue(n, t)) return o[t] = 4, n[t];
                    wo && (o[t] = 0)
                }
            }
            const u = zs[t];
            let p, d;
            if (u) return t === "$attrs" && ht(e, "get", t), u(e);
            if ((p = a.__cssModules) && (p = p[t])) return p;
            if (n !== Se && ue(n, t)) return o[t] = 4, n[t];
            if (d = c.config.globalProperties, ue(d, t)) return d[t]
        },
        set({
            _: e
        }, t, n) {
            const {
                data: s,
                setupState: r,
                ctx: i
            } = e;
            return Hi(r, t) ? (r[t] = n, !0) : s !== Se && ue(s, t) ? (s[t] = n, !0) : ue(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: s,
                appContext: r,
                propsOptions: i
            }
        }, o) {
            let a;
            return !!n[o] || e !== Se && ue(e, o) || Hi(t, o) || (a = i[0]) && ue(a, o) || ue(s, o) || ue(zs, o) || ue(r.config.globalProperties, o)
        },
        defineProperty(e, t, n) {
            return n.get != null ? e._.accessCache[t] = 0 : ue(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
        }
    };

function wc(e) {
    return W(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e
}
let wo = !0;

function wh(e) {
    const t = la(e),
        n = e.proxy,
        s = e.ctx;
    wo = !1, t.beforeCreate && vc(t.beforeCreate, e, "bc");
    const {
        data: r,
        computed: i,
        methods: o,
        watch: a,
        provide: c,
        inject: l,
        created: u,
        beforeMount: p,
        mounted: d,
        beforeUpdate: g,
        updated: v,
        activated: w,
        deactivated: y,
        beforeDestroy: x,
        beforeUnmount: S,
        destroyed: R,
        unmounted: E,
        render: V,
        renderTracked: re,
        renderTriggered: le,
        errorCaptured: F,
        serverPrefetch: q,
        expose: X,
        inheritAttrs: we,
        components: B,
        directives: se,
        filters: Ie
    } = t;
    if (l && vh(l, s, null), o)
        for (const Ae in o) {
            const pe = o[Ae];
            Z(pe) && (s[Ae] = pe.bind(n))
        }
    if (r) {
        const Ae = r.call(n, n);
        Ce(Ae) && (e.data = De(Ae))
    }
    if (wo = !0, i)
        for (const Ae in i) {
            const pe = i[Ae],
                at = Z(pe) ? pe.bind(n, n) : Z(pe.get) ? pe.get.bind(n, n) : zt,
                Rn = !Z(pe) && Z(pe.set) ? pe.set.bind(n) : zt,
                Rt = Qn({
                    get: at,
                    set: Rn
                });
            Object.defineProperty(s, Ae, {
                enumerable: !0,
                configurable: !0,
                get: () => Rt.value,
                set: ve => Rt.value = ve
            })
        }
    if (a)
        for (const Ae in a) $u(a[Ae], s, n, Ae);
    if (c) {
        const Ae = Z(c) ? c.call(n) : c;
        Reflect.ownKeys(Ae).forEach(pe => {
            yi(pe, Ae[pe])
        })
    }
    u && vc(u, e, "c");

    function te(Ae, pe) {
        W(pe) ? pe.forEach(at => Ae(at.bind(n))) : pe && Ae(pe.bind(n))
    }
    if (te(lh, p), te(dn, d), te(uh, g), te(Ru, v), te(oh, w), te(ah, y), te(hh, F), te(fh, re), te(dh, le), te(Nu, S), te(Lu, E), te(ph, q), W(X))
        if (X.length) {
            const Ae = e.exposed || (e.exposed = {});
            X.forEach(pe => {
                Object.defineProperty(Ae, pe, {
                    get: () => n[pe],
                    set: at => n[pe] = at
                })
            })
        } else e.exposed || (e.exposed = {});
    V && e.render === zt && (e.render = V), we != null && (e.inheritAttrs = we), B && (e.components = B), se && (e.directives = se)
}

function vh(e, t, n = zt) {
    W(e) && (e = vo(e));
    for (const s in e) {
        const r = e[s];
        let i;
        Ce(r) ? "default" in r ? i = xe(r.from || s, r.default, !0) : i = xe(r.from || s) : i = xe(r), Ne(i) ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: o => i.value = o
        }) : t[s] = i
    }
}

function vc(e, t, n) {
    St(W(e) ? e.map(s => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}

function $u(e, t, n, s) {
    const r = s.includes(".") ? Au(n, s) : () => n[s];
    if (Ue(e)) {
        const i = t[e];
        Z(i) && Tn(r, i)
    } else if (Z(e)) Tn(r, e.bind(n));
    else if (Ce(e))
        if (W(e)) e.forEach(i => $u(i, t, n, s));
        else {
            const i = Z(e.handler) ? e.handler.bind(n) : t[e.handler];
            Z(i) && Tn(r, i, e)
        }
}

function la(e) {
    const t = e.type,
        {
            mixins: n,
            extends: s
        } = t,
        {
            mixins: r,
            optionsCache: i,
            config: {
                optionMergeStrategies: o
            }
        } = e.appContext,
        a = i.get(t);
    let c;
    return a ? c = a : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(l => Jr(c, l, o, !0)), Jr(c, t, o)), Ce(t) && i.set(t, c), c
}

function Jr(e, t, n, s = !1) {
    const {
        mixins: r,
        extends: i
    } = t;
    i && Jr(e, i, n, !0), r && r.forEach(o => Jr(e, o, n, !0));
    for (const o in t)
        if (!(s && o === "expose")) {
            const a = yh[o] || n && n[o];
            e[o] = a ? a(e[o], t[o]) : t[o]
        } return e
}
const yh = {
    data: yc,
    props: bc,
    emits: bc,
    methods: Ps,
    computed: Ps,
    beforeCreate: rt,
    created: rt,
    beforeMount: rt,
    mounted: rt,
    beforeUpdate: rt,
    updated: rt,
    beforeDestroy: rt,
    beforeUnmount: rt,
    destroyed: rt,
    unmounted: rt,
    activated: rt,
    deactivated: rt,
    errorCaptured: rt,
    serverPrefetch: rt,
    components: Ps,
    directives: Ps,
    watch: _h,
    provide: yc,
    inject: bh
};

function yc(e, t) {
    return t ? e ? function() {
        return Le(Z(e) ? e.call(this, this) : e, Z(t) ? t.call(this, this) : t)
    } : t : e
}

function bh(e, t) {
    return Ps(vo(e), vo(t))
}

function vo(e) {
    if (W(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t
    }
    return e
}

function rt(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}

function Ps(e, t) {
    return e ? Le(Object.create(null), e, t) : t
}

function bc(e, t) {
    return e ? W(e) && W(t) ? [...new Set([...e, ...t])] : Le(Object.create(null), wc(e), wc(t != null ? t : {})) : t
}

function _h(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = Le(Object.create(null), e);
    for (const s in t) n[s] = rt(e[s], t[s]);
    return n
}

function zu() {
    return {
        app: null,
        config: {
            isNativeTag: Qd,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let xh = 0;

function kh(e, t) {
    return function(s, r = null) {
        Z(s) || (s = Le({}, s)), r != null && !Ce(r) && (r = null);
        const i = zu(),
            o = new Set;
        let a = !1;
        const c = i.app = {
            _uid: xh++,
            _component: s,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: Qh,
            get config() {
                return i.config
            },
            set config(l) {},
            use(l, ...u) {
                return o.has(l) || (l && Z(l.install) ? (o.add(l), l.install(c, ...u)) : Z(l) && (o.add(l), l(c, ...u))), c
            },
            mixin(l) {
                return i.mixins.includes(l) || i.mixins.push(l), c
            },
            component(l, u) {
                return u ? (i.components[l] = u, c) : i.components[l]
            },
            directive(l, u) {
                return u ? (i.directives[l] = u, c) : i.directives[l]
            },
            mount(l, u, p) {
                if (!a) {
                    const d = $(s, r);
                    return d.appContext = i, u && t ? t(d, l) : e(d, l, p), a = !0, c._container = l, l.__vue_app__ = c, xi(d.component) || d.component.proxy
                }
            },
            unmount() {
                a && (e(null, c._container), delete c._container.__vue_app__)
            },
            provide(l, u) {
                return i.provides[l] = u, c
            },
            runWithContext(l) {
                Ys = c;
                try {
                    return l()
                } finally {
                    Ys = null
                }
            }
        };
        return c
    }
}
let Ys = null;

function yi(e, t) {
    if (ze) {
        let n = ze.provides;
        const s = ze.parent && ze.parent.provides;
        s === n && (n = ze.provides = Object.create(s)), n[e] = t
    }
}

function xe(e, t, n = !1) {
    const s = ze || Ke;
    if (s || Ys) {
        const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Ys._context.provides;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && Z(t) ? t.call(s && s.proxy) : t
    }
}

function Mu() {
    return !!(ze || Ke || Ys)
}

function Eh(e, t, n, s = !1) {
    const r = {},
        i = {};
    Wr(i, _i, 1), e.propsDefaults = Object.create(null), Fu(e, t, r, i);
    for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
    n ? e.props = s ? r : $f(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i
}

function Ah(e, t, n, s) {
    const {
        props: r,
        attrs: i,
        vnode: {
            patchFlag: o
        }
    } = e, a = oe(r), [c] = e.propsOptions;
    let l = !1;
    if ((s || o > 0) && !(o & 16)) {
        if (o & 8) {
            const u = e.vnode.dynamicProps;
            for (let p = 0; p < u.length; p++) {
                let d = u[p];
                if (wi(e.emitsOptions, d)) continue;
                const g = t[d];
                if (c)
                    if (ue(i, d)) g !== i[d] && (i[d] = g, l = !0);
                    else {
                        const v = yt(d);
                        r[v] = yo(c, a, v, g, e, !1)
                    }
                else g !== i[d] && (i[d] = g, l = !0)
            }
        }
    } else {
        Fu(e, t, r, i) && (l = !0);
        let u;
        for (const p in a)(!t || !ue(t, p) && ((u = Et(p)) === p || !ue(t, u))) && (c ? n && (n[p] !== void 0 || n[u] !== void 0) && (r[p] = yo(c, a, p, void 0, e, !0)) : delete r[p]);
        if (i !== a)
            for (const p in i)(!t || !ue(t, p) && !0) && (delete i[p], l = !0)
    }
    l && ln(e, "set", "$attrs")
}

function Fu(e, t, n, s) {
    const [r, i] = e.propsOptions;
    let o = !1,
        a;
    if (t)
        for (let c in t) {
            if ($r(c)) continue;
            const l = t[c];
            let u;
            r && ue(r, u = yt(c)) ? !i || !i.includes(u) ? n[u] = l : (a || (a = {}))[u] = l : wi(e.emitsOptions, c) || (!(c in s) || l !== s[c]) && (s[c] = l, o = !0)
        }
    if (i) {
        const c = oe(n),
            l = a || Se;
        for (let u = 0; u < i.length; u++) {
            const p = i[u];
            n[p] = yo(r, c, p, l[p], e, !ue(l, p))
        }
    }
    return o
}

function yo(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
        const a = ue(o, "default");
        if (a && s === void 0) {
            const c = o.default;
            if (o.type !== Function && !o.skipFactory && Z(c)) {
                const {
                    propsDefaults: l
                } = r;
                n in l ? s = l[n] : (ws(r), s = l[n] = c.call(null, t), Gn())
            } else s = c
        }
        o[0] && (i && !a ? s = !1 : o[1] && (s === "" || s === Et(n)) && (s = !0))
    }
    return s
}

function Uu(e, t, n = !1) {
    const s = t.propsCache,
        r = s.get(e);
    if (r) return r;
    const i = e.props,
        o = {},
        a = [];
    let c = !1;
    if (!Z(e)) {
        const u = p => {
            c = !0;
            const [d, g] = Uu(p, t, !0);
            Le(o, d), g && a.push(...g)
        };
        !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
    }
    if (!i && !c) return Ce(e) && s.set(e, us), us;
    if (W(i))
        for (let u = 0; u < i.length; u++) {
            const p = yt(i[u]);
            _c(p) && (o[p] = Se)
        } else if (i)
            for (const u in i) {
                const p = yt(u);
                if (_c(p)) {
                    const d = i[u],
                        g = o[p] = W(d) || Z(d) ? {
                            type: d
                        } : Le({}, d);
                    if (g) {
                        const v = Ec(Boolean, g.type),
                            w = Ec(String, g.type);
                        g[0] = v > -1, g[1] = w < 0 || v < w, (v > -1 || ue(g, "default")) && a.push(p)
                    }
                }
            }
    const l = [o, a];
    return Ce(e) && s.set(e, l), l
}

function _c(e) {
    return e[0] !== "$"
}

function xc(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}

function kc(e, t) {
    return xc(e) === xc(t)
}

function Ec(e, t) {
    return W(t) ? t.findIndex(n => kc(n, e)) : Z(t) && kc(t, e) ? 0 : -1
}
const Bu = e => e[0] === "_" || e === "$stable",
    ua = e => W(e) ? e.map(Kt) : [Kt(e)],
    Th = (e, t, n) => {
        if (t._n) return t;
        const s = Y((...r) => ua(t(...r)), n);
        return s._c = !1, s
    },
    ju = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (Bu(r)) continue;
            const i = e[r];
            if (Z(i)) t[r] = Th(r, i, s);
            else if (i != null) {
                const o = ua(i);
                t[r] = () => o
            }
        }
    },
    qu = (e, t) => {
        const n = ua(t);
        e.slots.default = () => n
    },
    Sh = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? (e.slots = oe(t), Wr(t, "_", n)) : ju(t, e.slots = {})
        } else e.slots = {}, t && qu(e, t);
        Wr(e.slots, _i, 1)
    },
    Ch = (e, t, n) => {
        const {
            vnode: s,
            slots: r
        } = e;
        let i = !0,
            o = Se;
        if (s.shapeFlag & 32) {
            const a = t._;
            a ? n && a === 1 ? i = !1 : (Le(r, t), !n && a === 1 && delete r._) : (i = !t.$stable, ju(t, r)), o = t
        } else t && (qu(e, t), o = {
            default: 1
        });
        if (i)
            for (const a in r) !Bu(a) && !(a in o) && delete r[a]
    };

function bo(e, t, n, s, r = !1) {
    if (W(e)) {
        e.forEach((d, g) => bo(d, t && (W(t) ? t[g] : t), n, s, r));
        return
    }
    if ($s(s) && !r) return;
    const i = s.shapeFlag & 4 ? xi(s.component) || s.component.proxy : s.el,
        o = r ? null : i,
        {
            i: a,
            r: c
        } = e,
        l = t && t.r,
        u = a.refs === Se ? a.refs = {} : a.refs,
        p = a.setupState;
    if (l != null && l !== c && (Ue(l) ? (u[l] = null, ue(p, l) && (p[l] = null)) : Ne(l) && (l.value = null)), Z(c)) An(c, a, 12, [o, u]);
    else {
        const d = Ue(c),
            g = Ne(c);
        if (d || g) {
            const v = () => {
                if (e.f) {
                    const w = d ? ue(p, c) ? p[c] : u[c] : c.value;
                    r ? W(w) && Ko(w, i) : W(w) ? w.includes(i) || w.push(i) : d ? (u[c] = [i], ue(p, c) && (p[c] = u[c])) : (c.value = [i], e.k && (u[e.k] = c.value))
                } else d ? (u[c] = o, ue(p, c) && (p[c] = o)) : g && (c.value = o, e.k && (u[e.k] = o))
            };
            o ? (v.id = -1, pt(v, n)) : v()
        }
    }
}
const pt = nh;

function Oh(e) {
    return Rh(e)
}

function Rh(e, t) {
    const n = uo();
    n.__VUE__ = !0;
    const {
        insert: s,
        remove: r,
        patchProp: i,
        createElement: o,
        createText: a,
        createComment: c,
        setText: l,
        setElementText: u,
        parentNode: p,
        nextSibling: d,
        setScopeId: g = zt,
        insertStaticContent: v
    } = e, w = (f, h, k, T = null, A = null, N = null, z = !1, L = null, D = !!h.dynamicChildren) => {
        if (f === h) return;
        f && !Bn(f, h) && (T = Vt(f), ve(f, A, N, !0), f = null), h.patchFlag === -2 && (D = !1, h.dynamicChildren = null);
        const {
            type: C,
            ref: G,
            shapeFlag: U
        } = h;
        switch (C) {
            case bi:
                y(f, h, k, T);
                break;
            case Ct:
                x(f, h, k, T);
                break;
            case Vi:
                f == null && S(h, k, T, z);
                break;
            case Pe:
                B(f, h, k, T, A, N, z, L, D);
                break;
            default:
                U & 1 ? V(f, h, k, T, A, N, z, L, D) : U & 6 ? se(f, h, k, T, A, N, z, L, D) : (U & 64 || U & 128) && C.process(f, h, k, T, A, N, z, L, D, tn)
        }
        G != null && A && bo(G, f && f.ref, N, h || f, !h)
    }, y = (f, h, k, T) => {
        if (f == null) s(h.el = a(h.children), k, T);
        else {
            const A = h.el = f.el;
            h.children !== f.children && l(A, h.children)
        }
    }, x = (f, h, k, T) => {
        f == null ? s(h.el = c(h.children || ""), k, T) : h.el = f.el
    }, S = (f, h, k, T) => {
        [f.el, f.anchor] = v(f.children, h, k, T, f.el, f.anchor)
    }, R = ({
        el: f,
        anchor: h
    }, k, T) => {
        let A;
        for (; f && f !== h;) A = d(f), s(f, k, T), f = A;
        s(h, k, T)
    }, E = ({
        el: f,
        anchor: h
    }) => {
        let k;
        for (; f && f !== h;) k = d(f), r(f), f = k;
        r(h)
    }, V = (f, h, k, T, A, N, z, L, D) => {
        z = z || h.type === "svg", f == null ? re(h, k, T, A, N, z, L, D) : q(f, h, A, N, z, L, D)
    }, re = (f, h, k, T, A, N, z, L) => {
        let D, C;
        const {
            type: G,
            props: U,
            shapeFlag: j,
            transition: Q,
            dirs: ne
        } = f;
        if (D = f.el = o(f.type, N, U && U.is, U), j & 8 ? u(D, f.children) : j & 16 && F(f.children, D, null, T, A, N && G !== "foreignObject", z, L), ne && Pn(f, null, T, "created"), le(D, f, f.scopeId, z, T), U) {
            for (const de in U) de !== "value" && !$r(de) && i(D, de, null, U[de], N, f.children, T, A, me);
            "value" in U && i(D, "value", null, U.value), (C = U.onVnodeBeforeMount) && Gt(C, T, f)
        }
        ne && Pn(f, null, T, "beforeMount");
        const ye = (!A || A && !A.pendingBranch) && Q && !Q.persisted;
        ye && Q.beforeEnter(D), s(D, h, k), ((C = U && U.onVnodeMounted) || ye || ne) && pt(() => {
            C && Gt(C, T, f), ye && Q.enter(D), ne && Pn(f, null, T, "mounted")
        }, A)
    }, le = (f, h, k, T, A) => {
        if (k && g(f, k), T)
            for (let N = 0; N < T.length; N++) g(f, T[N]);
        if (A) {
            let N = A.subTree;
            if (h === N) {
                const z = A.vnode;
                le(f, z, z.scopeId, z.slotScopeIds, A.parent)
            }
        }
    }, F = (f, h, k, T, A, N, z, L, D = 0) => {
        for (let C = D; C < f.length; C++) {
            const G = f[C] = L ? bn(f[C]) : Kt(f[C]);
            w(null, G, h, k, T, A, N, z, L)
        }
    }, q = (f, h, k, T, A, N, z) => {
        const L = h.el = f.el;
        let {
            patchFlag: D,
            dynamicChildren: C,
            dirs: G
        } = h;
        D |= f.patchFlag & 16;
        const U = f.props || Se,
            j = h.props || Se;
        let Q;
        k && Dn(k, !1), (Q = j.onVnodeBeforeUpdate) && Gt(Q, k, h, f), G && Pn(h, f, k, "beforeUpdate"), k && Dn(k, !0);
        const ne = A && h.type !== "foreignObject";
        if (C ? X(f.dynamicChildren, C, L, k, T, ne, N) : z || pe(f, h, L, null, k, T, ne, N, !1), D > 0) {
            if (D & 16) we(L, h, U, j, k, T, A);
            else if (D & 2 && U.class !== j.class && i(L, "class", null, j.class, A), D & 4 && i(L, "style", U.style, j.style, A), D & 8) {
                const ye = h.dynamicProps;
                for (let de = 0; de < ye.length; de++) {
                    const Oe = ye[de],
                        ct = U[Oe],
                        Nt = j[Oe];
                    (Nt !== ct || Oe === "value") && i(L, Oe, ct, Nt, A, f.children, k, T, me)
                }
            }
            D & 1 && f.children !== h.children && u(L, h.children)
        } else !z && C == null && we(L, h, U, j, k, T, A);
        ((Q = j.onVnodeUpdated) || G) && pt(() => {
            Q && Gt(Q, k, h, f), G && Pn(h, f, k, "updated")
        }, T)
    }, X = (f, h, k, T, A, N, z) => {
        for (let L = 0; L < h.length; L++) {
            const D = f[L],
                C = h[L],
                G = D.el && (D.type === Pe || !Bn(D, C) || D.shapeFlag & 70) ? p(D.el) : k;
            w(D, C, G, null, T, A, N, z, !0)
        }
    }, we = (f, h, k, T, A, N, z) => {
        if (k !== T) {
            if (k !== Se)
                for (const L in k) !$r(L) && !(L in T) && i(f, L, k[L], null, z, h.children, A, N, me);
            for (const L in T) {
                if ($r(L)) continue;
                const D = T[L],
                    C = k[L];
                D !== C && L !== "value" && i(f, L, C, D, z, h.children, A, N, me)
            }
            "value" in T && i(f, "value", k.value, T.value)
        }
    }, B = (f, h, k, T, A, N, z, L, D) => {
        const C = h.el = f ? f.el : a(""),
            G = h.anchor = f ? f.anchor : a("");
        let {
            patchFlag: U,
            dynamicChildren: j,
            slotScopeIds: Q
        } = h;
        Q && (L = L ? L.concat(Q) : Q), f == null ? (s(C, k, T), s(G, k, T), F(h.children, k, G, A, N, z, L, D)) : U > 0 && U & 64 && j && f.dynamicChildren ? (X(f.dynamicChildren, j, k, A, N, z, L), (h.key != null || A && h === A.subTree) && Hu(f, h, !0)) : pe(f, h, k, G, A, N, z, L, D)
    }, se = (f, h, k, T, A, N, z, L, D) => {
        h.slotScopeIds = L, f == null ? h.shapeFlag & 512 ? A.ctx.activate(h, k, T, z, D) : Ie(h, k, T, A, N, z, D) : Qe(f, h, D)
    }, Ie = (f, h, k, T, A, N, z) => {
        const L = f.component = Fh(f, T, A);
        if (rr(f) && (L.ctx.renderer = tn), Uh(L), L.asyncDep) {
            if (A && A.registerDep(L, te), !f.el) {
                const D = L.subTree = $(Ct);
                x(null, D, h, k)
            }
            return
        }
        te(L, f, h, k, A, N, z)
    }, Qe = (f, h, k) => {
        const T = h.component = f.component;
        if (Zf(f, h, k))
            if (T.asyncDep && !T.asyncResolved) {
                Ae(T, h, k);
                return
            } else T.next = h, Kf(T.update), T.update();
        else h.el = f.el, T.vnode = h
    }, te = (f, h, k, T, A, N, z) => {
        const L = () => {
                if (f.isMounted) {
                    let {
                        next: G,
                        bu: U,
                        u: j,
                        parent: Q,
                        vnode: ne
                    } = f, ye = G, de;
                    Dn(f, !1), G ? (G.el = ne.el, Ae(f, G, z)) : G = ne, U && zr(U), (de = G.props && G.props.onVnodeBeforeUpdate) && Gt(de, Q, G, ne), Dn(f, !0);
                    const Oe = Bi(f),
                        ct = f.subTree;
                    f.subTree = Oe, w(ct, Oe, p(ct.el), Vt(ct), f, A, N), G.el = Oe.el, ye === null && eh(f, Oe.el), j && pt(j, A), (de = G.props && G.props.onVnodeUpdated) && pt(() => Gt(de, Q, G, ne), A)
                } else {
                    let G;
                    const {
                        el: U,
                        props: j
                    } = h, {
                        bm: Q,
                        m: ne,
                        parent: ye
                    } = f, de = $s(h);
                    if (Dn(f, !1), Q && zr(Q), !de && (G = j && j.onVnodeBeforeMount) && Gt(G, ye, h), Dn(f, !0), U && ss) {
                        const Oe = () => {
                            f.subTree = Bi(f), ss(U, f.subTree, f, A, null)
                        };
                        de ? h.type.__asyncLoader().then(() => !f.isUnmounted && Oe()) : Oe()
                    } else {
                        const Oe = f.subTree = Bi(f);
                        w(null, Oe, k, T, f, A, N), h.el = Oe.el
                    }
                    if (ne && pt(ne, A), !de && (G = j && j.onVnodeMounted)) {
                        const Oe = h;
                        pt(() => Gt(G, ye, Oe), A)
                    }(h.shapeFlag & 256 || ye && $s(ye.vnode) && ye.vnode.shapeFlag & 256) && f.a && pt(f.a, A), f.isMounted = !0, h = k = T = null
                }
            },
            D = f.effect = new Zo(L, () => gi(C), f.scope),
            C = f.update = () => D.run();
        C.id = f.uid, Dn(f, !0), C()
    }, Ae = (f, h, k) => {
        h.component = f;
        const T = f.vnode.props;
        f.vnode = h, f.next = null, Ah(f, h.props, T, k), Ch(f, h.children, k), ys(), fc(), bs()
    }, pe = (f, h, k, T, A, N, z, L, D = !1) => {
        const C = f && f.children,
            G = f ? f.shapeFlag : 0,
            U = h.children,
            {
                patchFlag: j,
                shapeFlag: Q
            } = h;
        if (j > 0) {
            if (j & 128) {
                Rn(C, U, k, T, A, N, z, L, D);
                return
            } else if (j & 256) {
                at(C, U, k, T, A, N, z, L, D);
                return
            }
        }
        Q & 8 ? (G & 16 && me(C, A, N), U !== C && u(k, U)) : G & 16 ? Q & 16 ? Rn(C, U, k, T, A, N, z, L, D) : me(C, A, N, !0) : (G & 8 && u(k, ""), Q & 16 && F(U, k, T, A, N, z, L, D))
    }, at = (f, h, k, T, A, N, z, L, D) => {
        f = f || us, h = h || us;
        const C = f.length,
            G = h.length,
            U = Math.min(C, G);
        let j;
        for (j = 0; j < U; j++) {
            const Q = h[j] = D ? bn(h[j]) : Kt(h[j]);
            w(f[j], Q, k, null, A, N, z, L, D)
        }
        C > G ? me(f, A, N, !0, !1, U) : F(h, k, T, A, N, z, L, D, U)
    }, Rn = (f, h, k, T, A, N, z, L, D) => {
        let C = 0;
        const G = h.length;
        let U = f.length - 1,
            j = G - 1;
        for (; C <= U && C <= j;) {
            const Q = f[C],
                ne = h[C] = D ? bn(h[C]) : Kt(h[C]);
            if (Bn(Q, ne)) w(Q, ne, k, null, A, N, z, L, D);
            else break;
            C++
        }
        for (; C <= U && C <= j;) {
            const Q = f[U],
                ne = h[j] = D ? bn(h[j]) : Kt(h[j]);
            if (Bn(Q, ne)) w(Q, ne, k, null, A, N, z, L, D);
            else break;
            U--, j--
        }
        if (C > U) {
            if (C <= j) {
                const Q = j + 1,
                    ne = Q < G ? h[Q].el : T;
                for (; C <= j;) w(null, h[C] = D ? bn(h[C]) : Kt(h[C]), k, ne, A, N, z, L, D), C++
            }
        } else if (C > j)
            for (; C <= U;) ve(f[C], A, N, !0), C++;
        else {
            const Q = C,
                ne = C,
                ye = new Map;
            for (C = ne; C <= j; C++) {
                const Ye = h[C] = D ? bn(h[C]) : Kt(h[C]);
                Ye.key != null && ye.set(Ye.key, C)
            }
            let de, Oe = 0;
            const ct = j - ne + 1;
            let Nt = !1,
                Ln = 0;
            const nt = new Array(ct);
            for (C = 0; C < ct; C++) nt[C] = 0;
            for (C = Q; C <= U; C++) {
                const Ye = f[C];
                if (Oe >= ct) {
                    ve(Ye, A, N, !0);
                    continue
                }
                let lt;
                if (Ye.key != null) lt = ye.get(Ye.key);
                else
                    for (de = ne; de <= j; de++)
                        if (nt[de - ne] === 0 && Bn(Ye, h[de])) {
                            lt = de;
                            break
                        } lt === void 0 ? ve(Ye, A, N, !0) : (nt[lt - ne] = C + 1, lt >= Ln ? Ln = lt : Nt = !0, w(Ye, h[lt], k, null, A, N, z, L, D), Oe++)
            }
            const nn = Nt ? Nh(nt) : us;
            for (de = nn.length - 1, C = ct - 1; C >= 0; C--) {
                const Ye = ne + C,
                    lt = h[Ye],
                    wr = Ye + 1 < G ? h[Ye + 1].el : T;
                nt[C] === 0 ? w(null, lt, k, wr, A, N, z, L, D) : Nt && (de < 0 || C !== nn[de] ? Rt(lt, k, wr, 2) : de--)
            }
        }
    }, Rt = (f, h, k, T, A = null) => {
        const {
            el: N,
            type: z,
            transition: L,
            children: D,
            shapeFlag: C
        } = f;
        if (C & 6) {
            Rt(f.component.subTree, h, k, T);
            return
        }
        if (C & 128) {
            f.suspense.move(h, k, T);
            return
        }
        if (C & 64) {
            z.move(f, h, k, tn);
            return
        }
        if (z === Pe) {
            s(N, h, k);
            for (let U = 0; U < D.length; U++) Rt(D[U], h, k, T);
            s(f.anchor, h, k);
            return
        }
        if (z === Vi) {
            R(f, h, k);
            return
        }
        if (T !== 2 && C & 1 && L)
            if (T === 0) L.beforeEnter(N), s(N, h, k), pt(() => L.enter(N), A);
            else {
                const {
                    leave: U,
                    delayLeave: j,
                    afterLeave: Q
                } = L, ne = () => s(N, h, k), ye = () => {
                    U(N, () => {
                        ne(), Q && Q()
                    })
                };
                j ? j(N, ne, ye) : ye()
            }
        else s(N, h, k)
    }, ve = (f, h, k, T = !1, A = !1) => {
        const {
            type: N,
            props: z,
            ref: L,
            children: D,
            dynamicChildren: C,
            shapeFlag: G,
            patchFlag: U,
            dirs: j
        } = f;
        if (L != null && bo(L, null, k, f, !0), G & 256) {
            h.ctx.deactivate(f);
            return
        }
        const Q = G & 1 && j,
            ne = !$s(f);
        let ye;
        if (ne && (ye = z && z.onVnodeBeforeUnmount) && Gt(ye, h, f), G & 6) gr(f.component, k, T);
        else {
            if (G & 128) {
                f.suspense.unmount(k, T);
                return
            }
            Q && Pn(f, null, h, "beforeUnmount"), G & 64 ? f.type.remove(f, h, k, A, tn, T) : C && (N !== Pe || U > 0 && U & 64) ? me(C, h, k, !1, !0) : (N === Pe && U & 384 || !A && G & 16) && me(D, h, k), T && As(f)
        }(ne && (ye = z && z.onVnodeUnmounted) || Q) && pt(() => {
            ye && Gt(ye, h, f), Q && Pn(f, null, h, "unmounted")
        }, k)
    }, As = f => {
        const {
            type: h,
            el: k,
            anchor: T,
            transition: A
        } = f;
        if (h === Pe) {
            je(k, T);
            return
        }
        if (h === Vi) {
            E(f);
            return
        }
        const N = () => {
            r(k), A && !A.persisted && A.afterLeave && A.afterLeave()
        };
        if (f.shapeFlag & 1 && A && !A.persisted) {
            const {
                leave: z,
                delayLeave: L
            } = A, D = () => z(k, N);
            L ? L(f.el, N, D) : D()
        } else N()
    }, je = (f, h) => {
        let k;
        for (; f !== h;) k = d(f), r(f), f = k;
        r(h)
    }, gr = (f, h, k) => {
        const {
            bum: T,
            scope: A,
            update: N,
            subTree: z,
            um: L
        } = f;
        T && zr(T), A.stop(), N && (N.active = !1, ve(z, f, h, k)), L && pt(L, h), pt(() => {
            f.isUnmounted = !0
        }, h), h && h.pendingBranch && !h.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === h.pendingId && (h.deps--, h.deps === 0 && h.resolve())
    }, me = (f, h, k, T = !1, A = !1, N = 0) => {
        for (let z = N; z < f.length; z++) ve(f[z], h, k, T, A)
    }, Vt = f => f.shapeFlag & 6 ? Vt(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : d(f.anchor || f.el), ns = (f, h, k) => {
        f == null ? h._vnode && ve(h._vnode, null, null, !0) : w(h._vnode || null, f, h, null, null, null, k), fc(), bu(), h._vnode = f
    }, tn = {
        p: w,
        um: ve,
        m: Rt,
        r: As,
        mt: Ie,
        mc: F,
        pc: pe,
        pbc: X,
        n: Vt,
        o: e
    };
    let Nn, ss;
    return t && ([Nn, ss] = t(tn)), {
        render: ns,
        hydrate: Nn,
        createApp: kh(ns, Nn)
    }
}

function Dn({
    effect: e,
    update: t
}, n) {
    e.allowRecurse = t.allowRecurse = n
}

function Hu(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (W(s) && W(r))
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            let a = r[i];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[i] = bn(r[i]), a.el = o.el), n || Hu(o, a)), a.type === bi && (a.el = o.el)
        }
}

function Nh(e) {
    const t = e.slice(),
        n = [0];
    let s, r, i, o, a;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const l = e[s];
        if (l !== 0) {
            if (r = n[n.length - 1], e[r] < l) {
                t[s] = r, n.push(s);
                continue
            }
            for (i = 0, o = n.length - 1; i < o;) a = i + o >> 1, e[n[a]] < l ? i = a + 1 : o = a;
            l < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s)
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = t[o];
    return n
}
const Lh = e => e.__isTeleport,
    Pe = Symbol.for("v-fgt"),
    bi = Symbol.for("v-txt"),
    Ct = Symbol.for("v-cmt"),
    Vi = Symbol.for("v-stc"),
    Ms = [];
let $t = null;

function P(e = !1) {
    Ms.push($t = e ? null : [])
}

function Ih() {
    Ms.pop(), $t = Ms[Ms.length - 1] || null
}
let Xs = 1;

function Ac(e) {
    Xs += e
}

function Vu(e) {
    return e.dynamicChildren = Xs > 0 ? $t || us : null, Ih(), Xs > 0 && $t && $t.push(e), e
}

function H(e, t, n, s, r, i) {
    return Vu(I(e, t, n, s, r, i, !0))
}

function Te(e, t, n, s, r) {
    return Vu($(e, t, n, s, r, !0))
}

function Zr(e) {
    return e ? e.__v_isVNode === !0 : !1
}

function Bn(e, t) {
    return e.type === t.type && e.key === t.key
}
const _i = "__vInternal",
    Gu = ({
        key: e
    }) => e != null ? e : null,
    Mr = ({
        ref: e,
        ref_key: t,
        ref_for: n
    }) => (typeof e == "number" && (e = "" + e), e != null ? Ue(e) || Ne(e) || Z(e) ? {
        i: Ke,
        r: e,
        k: t,
        f: !!n
    } : e : null);

function I(e, t = null, n = null, s = 0, r = null, i = e === Pe ? 0 : 1, o = !1, a = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Gu(t),
        ref: t && Mr(t),
        scopeId: ku,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: Ke
    };
    return a ? (pa(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= Ue(n) ? 8 : 16), Xs > 0 && !o && $t && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && $t.push(c), c
}
const $ = Ph;

function Ph(e, t = null, n = null, s = 0, r = null, i = !1) {
    if ((!e || e === Pu) && (e = Ct), Zr(e)) {
        const a = On(e, t, !0);
        return n && pa(a, n), Xs > 0 && !i && $t && (a.shapeFlag & 6 ? $t[$t.indexOf(e)] = a : $t.push(a)), a.patchFlag |= -2, a
    }
    if (Vh(e) && (e = e.__vccOpts), t) {
        t = Dh(t);
        let {
            class: a,
            style: c
        } = t;
        a && !Ue(a) && (t.class = ms(a)), Ce(c) && (hu(c) && !W(c) && (c = Le({}, c)), t.style = Yo(c))
    }
    const o = Ue(e) ? 1 : th(e) ? 128 : Lh(e) ? 64 : Ce(e) ? 4 : Z(e) ? 2 : 0;
    return I(e, t, n, s, r, o, i, !0)
}

function Dh(e) {
    return e ? hu(e) || _i in e ? Le({}, e) : e : null
}

function On(e, t, n = !1) {
    const {
        props: s,
        ref: r,
        patchFlag: i,
        children: o
    } = e, a = t ? $h(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && Gu(a),
        ref: t && t.ref ? n && r ? W(r) ? r.concat(Mr(t)) : [r, Mr(t)] : Mr(t) : r,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Pe ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && On(e.ssContent),
        ssFallback: e.ssFallback && On(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}

function or(e = " ", t = 0) {
    return $(bi, null, e, t)
}

function Ee(e = "", t = !1) {
    return t ? (P(), Te(Ct, null, e)) : $(Ct, null, e)
}

function Kt(e) {
    return e == null || typeof e == "boolean" ? $(Ct) : W(e) ? $(Pe, null, e.slice()) : typeof e == "object" ? bn(e) : $(bi, null, String(e))
}

function bn(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : On(e)
}

function pa(e, t) {
    let n = 0;
    const {
        shapeFlag: s
    } = e;
    if (t == null) t = null;
    else if (W(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), pa(e, r()), r._c && (r._d = !0));
            return
        } else {
            n = 32;
            const r = t._;
            !r && !(_i in t) ? t._ctx = Ke : r === 3 && Ke && (Ke.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024))
        }
    else Z(t) ? (t = {
        default: t,
        _ctx: Ke
    }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [or(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function $h(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class") t.class !== s.class && (t.class = ms([t.class, s.class]));
            else if (r === "style") t.style = Yo([t.style, s.style]);
        else if (ui(r)) {
            const i = t[r],
                o = s[r];
            o && i !== o && !(W(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o)
        } else r !== "" && (t[r] = s[r])
    }
    return t
}

function Gt(e, t, n, s = null) {
    St(e, t, 7, [n, s])
}
const zh = zu();
let Mh = 0;

function Fh(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || zh,
        i = {
            uid: Mh++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new tu(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Uu(s, r),
            emitsOptions: xu(s, r),
            emit: null,
            emitted: null,
            propsDefaults: Se,
            inheritAttrs: s.inheritAttrs,
            ctx: Se,
            data: Se,
            props: Se,
            attrs: Se,
            slots: Se,
            refs: Se,
            setupState: Se,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return i.ctx = {
        _: i
    }, i.root = t ? t.root : i, i.emit = Yf.bind(null, i), e.ce && e.ce(i), i
}
let ze = null;
const da = () => ze || Ke;
let fa, is, Tc = "__VUE_INSTANCE_SETTERS__";
(is = uo()[Tc]) || (is = uo()[Tc] = []), is.push(e => ze = e), fa = e => {
    is.length > 1 ? is.forEach(t => t(e)) : is[0](e)
};
const ws = e => {
        fa(e), e.scope.on()
    },
    Gn = () => {
        ze && ze.scope.off(), fa(null)
    };

function Ku(e) {
    return e.vnode.shapeFlag & 4
}
let vs = !1;

function Uh(e, t = !1) {
    vs = t;
    const {
        props: n,
        children: s
    } = e.vnode, r = Ku(e);
    Eh(e, n, r, t), Sh(e, s);
    const i = r ? Bh(e, t) : void 0;
    return vs = !1, i
}

function Bh(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null), e.proxy = mi(new Proxy(e.ctx, gh));
    const {
        setup: s
    } = n;
    if (s) {
        const r = e.setupContext = s.length > 1 ? qh(e) : null;
        ws(e), ys();
        const i = An(s, e, 0, [e.props, r]);
        if (bs(), Gn(), Yl(i)) {
            if (i.then(Gn, Gn), t) return i.then(o => {
                Sc(e, o, t)
            }).catch(o => {
                sr(o, e, 0)
            });
            e.asyncDep = i
        } else Sc(e, i, t)
    } else Wu(e, t)
}

function Sc(e, t, n) {
    Z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ce(t) && (e.setupState = wu(t)), Wu(e, n)
}
let Cc;

function Wu(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Cc && !s.render) {
            const r = s.template || la(e).template;
            if (r) {
                const {
                    isCustomElement: i,
                    compilerOptions: o
                } = e.appContext.config, {
                    delimiters: a,
                    compilerOptions: c
                } = s, l = Le(Le({
                    isCustomElement: i,
                    delimiters: a
                }, o), c);
                s.render = Cc(r, l)
            }
        }
        e.render = s.render || zt
    }
    ws(e), ys(), wh(e), bs(), Gn()
}

function jh(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs, {
        get(t, n) {
            return ht(e, "get", "$attrs"), t[n]
        }
    }))
}

function qh(e) {
    const t = n => {
        e.exposed = n || {}
    };
    return {
        get attrs() {
            return jh(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}

function xi(e) {
    if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(wu(mi(e.exposed)), {
        get(t, n) {
            if (n in t) return t[n];
            if (n in zs) return zs[n](e)
        },
        has(t, n) {
            return n in t || n in zs
        }
    }))
}

function Hh(e, t = !0) {
    return Z(e) ? e.displayName || e.name : e.name || t && e.__name
}

function Vh(e) {
    return Z(e) && "__vccOpts" in e
}
const Qn = (e, t) => Hf(e, t, vs);

function Gh(e, t, n) {
    const s = arguments.length;
    return s === 2 ? Ce(t) && !W(t) ? Zr(t) ? $(e, null, [t]) : $(e, t) : $(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Zr(n) && (n = [n]), $(e, t, n))
}
const Kh = Symbol.for("v-scx"),
    Wh = () => xe(Kh),
    Qh = "3.3.4",
    Yh = "http://www.w3.org/2000/svg",
    jn = typeof document < "u" ? document : null,
    Oc = jn && jn.createElement("template"),
    Xh = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: e => {
            const t = e.parentNode;
            t && t.removeChild(e)
        },
        createElement: (e, t, n, s) => {
            const r = t ? jn.createElementNS(Yh, e) : jn.createElement(e, n ? {
                is: n
            } : void 0);
            return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r
        },
        createText: e => jn.createTextNode(e),
        createComment: e => jn.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: e => e.parentNode,
        nextSibling: e => e.nextSibling,
        querySelector: e => jn.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "")
        },
        insertStaticContent(e, t, n, s, r, i) {
            const o = n ? n.previousSibling : t.lastChild;
            if (r && (r === i || r.nextSibling))
                for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)););
            else {
                Oc.innerHTML = s ? `<svg>${e}</svg>` : e;
                const a = Oc.content;
                if (s) {
                    const c = a.firstChild;
                    for (; c.firstChild;) a.appendChild(c.firstChild);
                    a.removeChild(c)
                }
                t.insertBefore(a, n)
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
        }
    };

function Jh(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}

function Zh(e, t, n) {
    const s = e.style,
        r = Ue(n);
    if (n && !r) {
        if (t && !Ue(t))
            for (const i in t) n[i] == null && _o(s, i, "");
        for (const i in n) _o(s, i, n[i])
    } else {
        const i = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = i)
    }
}
const Rc = /\s*!important$/;

function _o(e, t, n) {
    if (W(n)) n.forEach(s => _o(e, t, s));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
        const s = em(e, t);
        Rc.test(n) ? e.setProperty(Et(s), n.replace(Rc, ""), "important") : e[s] = n
    }
}
const Nc = ["Webkit", "Moz", "ms"],
    Gi = {};

function em(e, t) {
    const n = Gi[t];
    if (n) return n;
    let s = yt(t);
    if (s !== "filter" && s in e) return Gi[t] = s;
    s = fi(s);
    for (let r = 0; r < Nc.length; r++) {
        const i = Nc[r] + s;
        if (i in e) return Gi[t] = i
    }
    return t
}
const Lc = "http://www.w3.org/1999/xlink";

function tm(e, t, n, s, r) {
    if (s && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Lc, t.slice(6, t.length)) : e.setAttributeNS(Lc, t, n);
    else {
        const i = af(t);
        n == null || i && !Zl(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n)
    }
}

function nm(e, t, n, s, r, i, o) {
    if (t === "innerHTML" || t === "textContent") {
        s && o(s, r, i), e[t] = n == null ? "" : n;
        return
    }
    const a = e.tagName;
    if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
        e._value = n;
        const l = a === "OPTION" ? e.getAttribute("value") : e.value,
            u = n == null ? "" : n;
        l !== u && (e.value = u), n == null && e.removeAttribute(t);
        return
    }
    let c = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean" ? n = Zl(n) : n == null && l === "string" ? (n = "", c = !0) : l === "number" && (n = 0, c = !0)
    }
    try {
        e[t] = n
    } catch {}
    c && e.removeAttribute(t)
}

function as(e, t, n, s) {
    e.addEventListener(t, n, s)
}

function sm(e, t, n, s) {
    e.removeEventListener(t, n, s)
}

function rm(e, t, n, s, r = null) {
    const i = e._vei || (e._vei = {}),
        o = i[t];
    if (s && o) o.value = s;
    else {
        const [a, c] = im(t);
        if (s) {
            const l = i[t] = cm(s, r);
            as(e, a, l, c)
        } else o && (sm(e, a, o, c), i[t] = void 0)
    }
}
const Ic = /(?:Once|Passive|Capture)$/;

function im(e) {
    let t;
    if (Ic.test(e)) {
        t = {};
        let s;
        for (; s = e.match(Ic);) e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Et(e.slice(2)), t]
}
let Ki = 0;
const om = Promise.resolve(),
    am = () => Ki || (om.then(() => Ki = 0), Ki = Date.now());

function cm(e, t) {
    const n = s => {
        if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        St(lm(s, n.value), t, 5, [s])
    };
    return n.value = e, n.attached = am(), n
}

function lm(e, t) {
    if (W(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = () => {
            n.call(e), e._stopped = !0
        }, t.map(s => r => !r._stopped && s && s(r))
    } else return t
}
const Pc = /^on[a-z]/,
    um = (e, t, n, s, r = !1, i, o, a, c) => {
        t === "class" ? Jh(e, s, r) : t === "style" ? Zh(e, n, s) : ui(t) ? Go(t) || rm(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : pm(e, t, s, r)) ? nm(e, t, s, i, o, a, c) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), tm(e, t, s, r))
    };

function pm(e, t, n, s) {
    return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Pc.test(t) && Z(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Pc.test(t) && Ue(n) ? !1 : t in e
}

function dm(e, t) {
    const n = he(e);
    class s extends ha {
        constructor(i) {
            super(n, i, t)
        }
    }
    return s.def = n, s
}
const fm = typeof HTMLElement < "u" ? HTMLElement : class {};
class ha extends fm {
    constructor(t, n = {}, s) {
        super(), this._def = t, this._props = n, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this.shadowRoot && s ? s(this._createVNode(), this.shadowRoot) : (this.attachShadow({
            mode: "open"
        }), this._def.__asyncLoader || this._resolveProps(this._def))
    }
    connectedCallback() {
        this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef())
    }
    disconnectedCallback() {
        this._connected = !1, oa(() => {
            this._connected || (qc(null, this.shadowRoot), this._instance = null)
        })
    }
    _resolveDef() {
        this._resolved = !0;
        for (let s = 0; s < this.attributes.length; s++) this._setAttr(this.attributes[s].name);
        new MutationObserver(s => {
            for (const r of s) this._setAttr(r.attributeName)
        }).observe(this, {
            attributes: !0
        });
        const t = (s, r = !1) => {
                const {
                    props: i,
                    styles: o
                } = s;
                let a;
                if (i && !W(i))
                    for (const c in i) {
                        const l = i[c];
                        (l === Number || l && l.type === Number) && (c in this._props && (this._props[c] = lo(this._props[c])), (a || (a = Object.create(null)))[yt(c)] = !0)
                    }
                this._numberProps = a, r && this._resolveProps(s), this._applyStyles(o), this._update()
            },
            n = this._def.__asyncLoader;
        n ? n().then(s => t(s, !0)) : t(this._def)
    }
    _resolveProps(t) {
        const {
            props: n
        } = t, s = W(n) ? n : Object.keys(n || {});
        for (const r of Object.keys(this)) r[0] !== "_" && s.includes(r) && this._setProp(r, this[r], !0, !1);
        for (const r of s.map(yt)) Object.defineProperty(this, r, {
            get() {
                return this._getProp(r)
            },
            set(i) {
                this._setProp(r, i)
            }
        })
    }
    _setAttr(t) {
        let n = this.getAttribute(t);
        const s = yt(t);
        this._numberProps && this._numberProps[s] && (n = lo(n)), this._setProp(s, n, !1)
    }
    _getProp(t) {
        return this._props[t]
    }
    _setProp(t, n, s = !0, r = !0) {
        n !== this._props[t] && (this._props[t] = n, r && this._instance && this._update(), s && (n === !0 ? this.setAttribute(Et(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Et(t), n + "") : n || this.removeAttribute(Et(t))))
    }
    _update() {
        qc(this._createVNode(), this.shadowRoot)
    }
    _createVNode() {
        const t = $(this._def, Le({}, this._props));
        return this._instance || (t.ce = n => {
            this._instance = n, n.isCE = !0;
            const s = (i, o) => {
                this.dispatchEvent(new CustomEvent(i, {
                    detail: o
                }))
            };
            n.emit = (i, ...o) => {
                s(i, o), Et(i) !== i && s(Et(i), o)
            };
            let r = this;
            for (; r = r && (r.parentNode || r.host);)
                if (r instanceof ha) {
                    n.parent = r._instance, n.provides = r._instance.provides;
                    break
                }
        }), t
    }
    _applyStyles(t) {
        t && t.forEach(n => {
            const s = document.createElement("style");
            s.textContent = n, this.shadowRoot.appendChild(s)
        })
    }
}
const gn = "transition",
    Ss = "animation",
    Yn = (e, {
        slots: t
    }) => Gh(ih, Yu(e), t);
Yn.displayName = "Transition";
const Qu = {
        name: String,
        type: String,
        css: {
            type: Boolean,
            default: !0
        },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    },
    hm = Yn.props = Le({}, Su, Qu),
    $n = (e, t = []) => {
        W(e) ? e.forEach(n => n(...t)) : e && e(...t)
    },
    Dc = e => e ? W(e) ? e.some(t => t.length > 1) : e.length > 1 : !1;

function Yu(e) {
    const t = {};
    for (const B in e) B in Qu || (t[B] = e[B]);
    if (e.css === !1) return t;
    const {
        name: n = "v",
        type: s,
        duration: r,
        enterFromClass: i = `${n}-enter-from`,
        enterActiveClass: o = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: c = i,
        appearActiveClass: l = o,
        appearToClass: u = a,
        leaveFromClass: p = `${n}-leave-from`,
        leaveActiveClass: d = `${n}-leave-active`,
        leaveToClass: g = `${n}-leave-to`
    } = e, v = mm(r), w = v && v[0], y = v && v[1], {
        onBeforeEnter: x,
        onEnter: S,
        onEnterCancelled: R,
        onLeave: E,
        onLeaveCancelled: V,
        onBeforeAppear: re = x,
        onAppear: le = S,
        onAppearCancelled: F = R
    } = t, q = (B, se, Ie) => {
        vn(B, se ? u : a), vn(B, se ? l : o), Ie && Ie()
    }, X = (B, se) => {
        B._isLeaving = !1, vn(B, p), vn(B, g), vn(B, d), se && se()
    }, we = B => (se, Ie) => {
        const Qe = B ? le : S,
            te = () => q(se, B, Ie);
        $n(Qe, [se, te]), $c(() => {
            vn(se, B ? c : i), on(se, B ? u : a), Dc(Qe) || zc(se, s, w, te)
        })
    };
    return Le(t, {
        onBeforeEnter(B) {
            $n(x, [B]), on(B, i), on(B, o)
        },
        onBeforeAppear(B) {
            $n(re, [B]), on(B, c), on(B, l)
        },
        onEnter: we(!1),
        onAppear: we(!0),
        onLeave(B, se) {
            B._isLeaving = !0;
            const Ie = () => X(B, se);
            on(B, p), Ju(), on(B, d), $c(() => {
                !B._isLeaving || (vn(B, p), on(B, g), Dc(E) || zc(B, s, y, Ie))
            }), $n(E, [B, Ie])
        },
        onEnterCancelled(B) {
            q(B, !1), $n(R, [B])
        },
        onAppearCancelled(B) {
            q(B, !0), $n(F, [B])
        },
        onLeaveCancelled(B) {
            X(B), $n(V, [B])
        }
    })
}

function mm(e) {
    if (e == null) return null;
    if (Ce(e)) return [Wi(e.enter), Wi(e.leave)];
    {
        const t = Wi(e);
        return [t, t]
    }
}

function Wi(e) {
    return lo(e)
}

function on(e, t) {
    t.split(/\s+/).forEach(n => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set)).add(t)
}

function vn(e, t) {
    t.split(/\s+/).forEach(s => s && e.classList.remove(s));
    const {
        _vtc: n
    } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0))
}

function $c(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}
let gm = 0;

function zc(e, t, n, s) {
    const r = e._endId = ++gm,
        i = () => {
            r === e._endId && s()
        };
    if (n) return setTimeout(i, n);
    const {
        type: o,
        timeout: a,
        propCount: c
    } = Xu(e, t);
    if (!o) return s();
    const l = o + "end";
    let u = 0;
    const p = () => {
            e.removeEventListener(l, d), i()
        },
        d = g => {
            g.target === e && ++u >= c && p()
        };
    setTimeout(() => {
        u < c && p()
    }, a + 1), e.addEventListener(l, d)
}

function Xu(e, t) {
    const n = window.getComputedStyle(e),
        s = v => (n[v] || "").split(", "),
        r = s(`${gn}Delay`),
        i = s(`${gn}Duration`),
        o = Mc(r, i),
        a = s(`${Ss}Delay`),
        c = s(`${Ss}Duration`),
        l = Mc(a, c);
    let u = null,
        p = 0,
        d = 0;
    t === gn ? o > 0 && (u = gn, p = o, d = i.length) : t === Ss ? l > 0 && (u = Ss, p = l, d = c.length) : (p = Math.max(o, l), u = p > 0 ? o > l ? gn : Ss : null, d = u ? u === gn ? i.length : c.length : 0);
    const g = u === gn && /\b(transform|all)(,|$)/.test(s(`${gn}Property`).toString());
    return {
        type: u,
        timeout: p,
        propCount: d,
        hasTransform: g
    }
}

function Mc(e, t) {
    for (; e.length < t.length;) e = e.concat(e);
    return Math.max(...t.map((n, s) => Fc(n) + Fc(e[s])))
}

function Fc(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}

function Ju() {
    return document.body.offsetHeight
}
const Zu = new WeakMap,
    ep = new WeakMap,
    tp = {
        name: "TransitionGroup",
        props: Le({}, hm, {
            tag: String,
            moveClass: String
        }),
        setup(e, {
            slots: t
        }) {
            const n = da(),
                s = Tu();
            let r, i;
            return Ru(() => {
                if (!r.length) return;
                const o = e.moveClass || `${e.name||"v"}-move`;
                if (!_m(r[0].el, n.vnode.el, o)) return;
                r.forEach(vm), r.forEach(ym);
                const a = r.filter(bm);
                Ju(), a.forEach(c => {
                    const l = c.el,
                        u = l.style;
                    on(l, o), u.transform = u.webkitTransform = u.transitionDuration = "";
                    const p = l._moveCb = d => {
                        d && d.target !== l || (!d || /transform$/.test(d.propertyName)) && (l.removeEventListener("transitionend", p), l._moveCb = null, vn(l, o))
                    };
                    l.addEventListener("transitionend", p)
                })
            }), () => {
                const o = oe(e),
                    a = Yu(o);
                let c = o.tag || Pe;
                r = i, i = t.default ? ca(t.default()) : [];
                for (let l = 0; l < i.length; l++) {
                    const u = i[l];
                    u.key != null && Qs(u, Ws(u, a, s, n))
                }
                if (r)
                    for (let l = 0; l < r.length; l++) {
                        const u = r[l];
                        Qs(u, Ws(u, a, s, n)), Zu.set(u, u.el.getBoundingClientRect())
                    }
                return $(c, null, i)
            }
        }
    },
    wm = e => delete e.mode;
tp.props;
const ar = tp;

function vm(e) {
    const t = e.el;
    t._moveCb && t._moveCb(), t._enterCb && t._enterCb()
}

function ym(e) {
    ep.set(e, e.el.getBoundingClientRect())
}

function bm(e) {
    const t = Zu.get(e),
        n = ep.get(e),
        s = t.left - n.left,
        r = t.top - n.top;
    if (s || r) {
        const i = e.el.style;
        return i.transform = i.webkitTransform = `translate(${s}px,${r}px)`, i.transitionDuration = "0s", e
    }
}

function _m(e, t, n) {
    const s = e.cloneNode();
    e._vtc && e._vtc.forEach(o => {
        o.split(/\s+/).forEach(a => a && s.classList.remove(a))
    }), n.split(/\s+/).forEach(o => o && s.classList.add(o)), s.style.display = "none";
    const r = t.nodeType === 1 ? t : t.parentNode;
    r.appendChild(s);
    const {
        hasTransform: i
    } = Xu(s);
    return r.removeChild(s), i
}
const Uc = e => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return W(t) ? n => zr(t, n) : t
};

function xm(e) {
    e.target.composing = !0
}

function Bc(e) {
    const t = e.target;
    t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")))
}
const np = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: s
            }
        }, r) {
            e._assign = Uc(r);
            const i = s || r.props && r.props.type === "number";
            as(e, t ? "change" : "input", o => {
                if (o.target.composing) return;
                let a = e.value;
                n && (a = a.trim()), i && (a = co(a)), e._assign(a)
            }), n && as(e, "change", () => {
                e.value = e.value.trim()
            }), t || (as(e, "compositionstart", xm), as(e, "compositionend", Bc), as(e, "change", Bc))
        },
        mounted(e, {
            value: t
        }) {
            e.value = t == null ? "" : t
        },
        beforeUpdate(e, {
            value: t,
            modifiers: {
                lazy: n,
                trim: s,
                number: r
            }
        }, i) {
            if (e._assign = Uc(i), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (r || e.type === "number") && co(e.value) === t)) return;
            const o = t == null ? "" : t;
            e.value !== o && (e.value = o)
        }
    },
    km = ["ctrl", "shift", "alt", "meta"],
    Em = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => "button" in e && e.button !== 0,
        middle: e => "button" in e && e.button !== 1,
        right: e => "button" in e && e.button !== 2,
        exact: (e, t) => km.some(n => e[`${n}Key`] && !t.includes(n))
    },
    Sn = (e, t) => (n, ...s) => {
        for (let r = 0; r < t.length; r++) {
            const i = Em[t[r]];
            if (i && i(n, t)) return
        }
        return e(n, ...s)
    },
    Am = {
        esc: "escape",
        space: " ",
        up: "arrow-up",
        left: "arrow-left",
        right: "arrow-right",
        down: "arrow-down",
        delete: "backspace"
    },
    Mt = (e, t) => n => {
        if (!("key" in n)) return;
        const s = Et(n.key);
        if (t.some(r => r === s || Am[r] === s)) return e(n)
    },
    xo = {
        beforeMount(e, {
            value: t
        }, {
            transition: n
        }) {
            e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Cs(e, t)
        },
        mounted(e, {
            value: t
        }, {
            transition: n
        }) {
            n && t && n.enter(e)
        },
        updated(e, {
            value: t,
            oldValue: n
        }, {
            transition: s
        }) {
            !t != !n && (s ? t ? (s.beforeEnter(e), Cs(e, !0), s.enter(e)) : s.leave(e, () => {
                Cs(e, !1)
            }) : Cs(e, t))
        },
        beforeUnmount(e, {
            value: t
        }) {
            Cs(e, t)
        }
    };

function Cs(e, t) {
    e.style.display = t ? e._vod : "none"
}
const Tm = Le({
    patchProp: um
}, Xh);
let jc;

function Sm() {
    return jc || (jc = Oh(Tm))
}
const qc = (...e) => {
    Sm().render(...e)
};
var Cm = !1;
/*!
 * pinia v2.1.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let ma;
const cr = e => ma = e,
    ga = () => Mu() && xe(wa) || ma,
    wa = Symbol();

function ko(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function"
}
var Fs;
(function(e) {
    e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function"
})(Fs || (Fs = {}));

function Om() {
    const e = nu(!0),
        t = e.run(() => ce({}));
    let n = [],
        s = [];
    const r = mi({
        install(i) {
            cr(r), r._a = i, i.provide(wa, r), i.config.globalProperties.$pinia = r, s.forEach(o => n.push(o)), s = []
        },
        use(i) {
            return !this._a && !Cm ? s.push(i) : n.push(i), this
        },
        _p: n,
        _a: null,
        _e: e,
        _s: new Map,
        state: t
    });
    return r
}
const sp = () => {};

function Hc(e, t, n, s = sp) {
    e.push(t);
    const r = () => {
        const i = e.indexOf(t);
        i > -1 && (e.splice(i, 1), s())
    };
    return !n && Xo() && su(r), r
}

function os(e, ...t) {
    e.slice().forEach(n => {
        n(...t)
    })
}
const Rm = e => e();

function Eo(e, t) {
    e instanceof Map && t instanceof Map && t.forEach((n, s) => e.set(s, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const n in t) {
        if (!t.hasOwnProperty(n)) continue;
        const s = t[n],
            r = e[n];
        ko(r) && ko(s) && e.hasOwnProperty(n) && !Ne(s) && !En(s) ? e[n] = Eo(r, s) : e[n] = s
    }
    return e
}
const Nm = Symbol();

function Lm(e) {
    return !ko(e) || !e.hasOwnProperty(Nm)
}
const {
    assign: yn
} = Object;

function Im(e) {
    return !!(Ne(e) && e.effect)
}

function Pm(e, t, n, s) {
    const {
        state: r,
        actions: i,
        getters: o
    } = t, a = n.state.value[e];
    let c;

    function l() {
        a || (n.state.value[e] = r ? r() : {});
        const u = Uf(n.state.value[e]);
        return yn(u, i, Object.keys(o || {}).reduce((p, d) => (p[d] = mi(Qn(() => {
            cr(n);
            const g = n._s.get(e);
            return o[d].call(g, g)
        })), p), {}))
    }
    return c = rp(e, l, t, n, s, !0), c
}

function rp(e, t, n = {}, s, r, i) {
    let o;
    const a = yn({
            actions: {}
        }, n),
        c = {
            deep: !0
        };
    let l, u, p = [],
        d = [],
        g;
    const v = s.state.value[e];
    !i && !v && (s.state.value[e] = {}), ce({});
    let w;

    function y(F) {
        let q;
        l = u = !1, typeof F == "function" ? (F(s.state.value[e]), q = {
            type: Fs.patchFunction,
            storeId: e,
            events: g
        }) : (Eo(s.state.value[e], F), q = {
            type: Fs.patchObject,
            payload: F,
            storeId: e,
            events: g
        });
        const X = w = Symbol();
        oa().then(() => {
            w === X && (l = !0)
        }), u = !0, os(p, q, s.state.value[e])
    }
    const x = i ? function() {
        const {
            state: q
        } = n, X = q ? q() : {};
        this.$patch(we => {
            yn(we, X)
        })
    } : sp;

    function S() {
        o.stop(), p = [], d = [], s._s.delete(e)
    }

    function R(F, q) {
        return function() {
            cr(s);
            const X = Array.from(arguments),
                we = [],
                B = [];

            function se(te) {
                we.push(te)
            }

            function Ie(te) {
                B.push(te)
            }
            os(d, {
                args: X,
                name: F,
                store: V,
                after: se,
                onError: Ie
            });
            let Qe;
            try {
                Qe = q.apply(this && this.$id === e ? this : V, X)
            } catch (te) {
                throw os(B, te), te
            }
            return Qe instanceof Promise ? Qe.then(te => (os(we, te), te)).catch(te => (os(B, te), Promise.reject(te))) : (os(we, Qe), Qe)
        }
    }
    const E = {
            _p: s,
            $id: e,
            $onAction: Hc.bind(null, d),
            $patch: y,
            $reset: x,
            $subscribe(F, q = {}) {
                const X = Hc(p, F, q.detached, () => we()),
                    we = o.run(() => Tn(() => s.state.value[e], B => {
                        (q.flush === "sync" ? u : l) && F({
                            storeId: e,
                            type: Fs.direct,
                            events: g
                        }, B)
                    }, yn({}, c, q)));
                return X
            },
            $dispose: S
        },
        V = De(E);
    s._s.set(e, V);
    const re = s._a && s._a.runWithContext || Rm,
        le = s._e.run(() => (o = nu(), re(() => o.run(t))));
    for (const F in le) {
        const q = le[F];
        if (Ne(q) && !Im(q) || En(q)) i || (v && Lm(q) && (Ne(q) ? q.value = v[F] : Eo(q, v[F])), s.state.value[e][F] = q);
        else if (typeof q == "function") {
            const X = R(F, q);
            le[F] = X, a.actions[F] = q
        }
    }
    return yn(V, le), yn(oe(V), le), Object.defineProperty(V, "$state", {
        get: () => s.state.value[e],
        set: F => {
            y(q => {
                yn(q, F)
            })
        }
    }), s._p.forEach(F => {
        yn(V, o.run(() => F({
            store: V,
            app: s._a,
            pinia: s,
            options: a
        })))
    }), v && i && n.hydrate && n.hydrate(V.$state, v), l = !0, u = !0, V
}

function He(e, t, n) {
    let s, r;
    const i = typeof t == "function";
    typeof e == "string" ? (s = e, r = i ? n : t) : (r = e, s = e.id);

    function o(a, c) {
        const l = Mu();
        return a = a || (l ? xe(wa, null) : null), a && cr(a), a = ma, a._s.has(s) || (i ? rp(s, t, r, a) : Pm(s, r, a)), a._s.get(s)
    }
    return o.$id = s, o
}
var Dm = Object.defineProperty,
    Vc = Object.getOwnPropertySymbols,
    $m = Object.prototype.hasOwnProperty,
    zm = Object.prototype.propertyIsEnumerable,
    Gc = (e, t, n) => t in e ? Dm(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Kc = (e, t) => {
        for (var n in t || (t = {})) $m.call(t, n) && Gc(e, n, t[n]);
        if (Vc)
            for (var n of Vc(t)) zm.call(t, n) && Gc(e, n, t[n]);
        return e
    };

function Mm(e) {
    return typeof e == "object" && e !== null
}

function Fm(e) {
    return e
}

function Wc(e, t) {
    return e = Mm(e) ? e : Object.create(null), new Proxy(e, {
        get(n, s, r) {
            var i;
            return s === "key" ? ((i = t.key) != null ? i : Fm)(Reflect.get(n, s, r)) : Reflect.get(n, s, r) || Reflect.get(t, s, r)
        }
    })
}

function Qc(e) {
    return e !== null && typeof e == "object"
}

function Ao(e, t) {
    const n = Array.isArray(e) && Array.isArray(t),
        s = Qc(e) && Qc(t);
    if (!n && !s) throw new Error("Can only merge object with object or array with array");
    const r = n ? [] : {};
    return [...Object.keys(e), ...Object.keys(t)].forEach(o => {
        Array.isArray(e[o]) && Array.isArray(t[o]) ? r[o] = [...Object.values(Ao(e[o], t[o]))] : t[o] !== null && typeof t[o] == "object" && typeof e[o] == "object" ? r[o] = Ao(e[o], t[o]) : e[o] !== void 0 && t[o] === void 0 ? r[o] = e[o] : e[o] === void 0 && t[o] !== void 0 && (r[o] = t[o])
    }), r
}

function Yc(e, t) {
    return t.reduce((n, s) => s === "[]" && Array.isArray(n) ? n : n == null ? void 0 : n[s], e)
}

function Xc(e, t, n) {
    const s = t.slice(0, -1).reduce((r, i) => /^(__proto__)$/.test(i) ? {} : r[i] = r[i] || {}, e);
    if (Array.isArray(s[t[t.length - 1]]) && Array.isArray(n)) {
        const r = s[t[t.length - 1]].map((i, o) => Array.isArray(i) && typeof i != "object" ? [...i, ...n[o]] : typeof i == "object" && i !== null && Object.keys(i).some(a => Array.isArray(i[a])) ? Ao(i, n[o]) : Kc(Kc({}, i), n[o]));
        s[t[t.length - 1]] = r
    } else t[t.length - 1] === void 0 && Array.isArray(s) && Array.isArray(n) ? s.push(...n) : s[t[t.length - 1]] = n;
    return e
}

function ip(e, t) {
    return t.reduce((n, s) => {
        const r = s.split(".");
        if (!r.includes("[]")) return Xc(n, r, Yc(e, r));
        const i = r.indexOf("[]"),
            o = r.slice(0, i),
            a = r.slice(0, i + 1),
            c = r.slice(i + 1),
            l = Yc(e, a),
            u = [];
        for (const p of l) c.length !== 0 && (Array.isArray(p) || typeof p == "object") ? u.push(ip(p, [c.join(".")])) : u.push(p);
        return Xc(n, o, u)
    }, Array.isArray(e) ? [] : {})
}

function Jc(e, t, n, s, r) {
    try {
        const i = t == null ? void 0 : t.getItem(s);
        i && e.$patch(n == null ? void 0 : n.deserialize(i))
    } catch (i) {
        r && console.error(i)
    }
}

function Um(e = {}) {
    return t => {
        const {
            options: {
                persist: n
            },
            store: s
        } = t;
        if (!n) return;
        const r = (Array.isArray(n) ? n.map(i => Wc(i, e)) : [Wc(n, e)]).map(({
            storage: i = localStorage,
            beforeRestore: o = null,
            afterRestore: a = null,
            serializer: c = {
                serialize: JSON.stringify,
                deserialize: JSON.parse
            },
            key: l = s.$id,
            paths: u = null,
            debug: p = !1
        }) => ({
            storage: i,
            beforeRestore: o,
            afterRestore: a,
            serializer: c,
            key: l,
            paths: u,
            debug: p
        }));
        r.forEach(i => {
            const {
                storage: o,
                serializer: a,
                key: c,
                paths: l,
                beforeRestore: u,
                afterRestore: p,
                debug: d
            } = i;
            u == null || u(t), Jc(s, o, a, c, d), p == null || p(t), s.$subscribe((g, v) => {
                try {
                    const w = Array.isArray(l) ? ip(v, l) : v;
                    o.setItem(c, a.serialize(w))
                } catch (w) {
                    d && console.error(w)
                }
            }, {
                detached: !0
            })
        }), s.$hydrate = ({
            runHooks: i = !0
        } = {}) => {
            r.forEach(o => {
                const {
                    beforeRestore: a,
                    afterRestore: c,
                    storage: l,
                    serializer: u,
                    key: p,
                    debug: d
                } = o;
                i && (a == null || a(t)), Jc(s, l, u, p, d), i && (c == null || c(t))
            })
        }
    }
}
const Bm = e => t => `${e}.${t}`,
    jm = (e, t) => {
        [Um({
            key: Bm(t)
        })].forEach(n => e._p.push(n))
    },
    Zc = e => {
        const t = Om();
        return jm(t, e), cr(t), t
    },
    Zt = Object.create(null);
Zt.open = "0";
Zt.close = "1";
Zt.ping = "2";
Zt.pong = "3";
Zt.message = "4";
Zt.upgrade = "5";
Zt.noop = "6";
const Fr = Object.create(null);
Object.keys(Zt).forEach(e => {
    Fr[Zt[e]] = e
});
const To = {
        type: "error",
        data: "parser error"
    },
    op = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]",
    ap = typeof ArrayBuffer == "function",
    cp = e => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer,
    va = ({
        type: e,
        data: t
    }, n, s) => op && t instanceof Blob ? n ? s(t) : el(t, s) : ap && (t instanceof ArrayBuffer || cp(t)) ? n ? s(t) : el(new Blob([t]), s) : s(Zt[e] + (t || "")),
    el = (e, t) => {
        const n = new FileReader;
        return n.onload = function() {
            const s = n.result.split(",")[1];
            t("b" + (s || ""))
        }, n.readAsDataURL(e)
    };

function tl(e) {
    return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
}
let Qi;

function qm(e, t) {
    if (op && e.data instanceof Blob) return e.data.arrayBuffer().then(tl).then(t);
    if (ap && (e.data instanceof ArrayBuffer || cp(e.data))) return t(tl(e.data));
    va(e, !1, n => {
        Qi || (Qi = new TextEncoder), t(Qi.encode(n))
    })
}
const nl = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    Ds = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < nl.length; e++) Ds[nl.charCodeAt(e)] = e;
const Hm = e => {
        let t = e.length * .75,
            n = e.length,
            s, r = 0,
            i, o, a, c;
        e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
        const l = new ArrayBuffer(t),
            u = new Uint8Array(l);
        for (s = 0; s < n; s += 4) i = Ds[e.charCodeAt(s)], o = Ds[e.charCodeAt(s + 1)], a = Ds[e.charCodeAt(s + 2)], c = Ds[e.charCodeAt(s + 3)], u[r++] = i << 2 | o >> 4, u[r++] = (o & 15) << 4 | a >> 2, u[r++] = (a & 3) << 6 | c & 63;
        return l
    },
    Vm = typeof ArrayBuffer == "function",
    ya = (e, t) => {
        if (typeof e != "string") return {
            type: "message",
            data: lp(e, t)
        };
        const n = e.charAt(0);
        return n === "b" ? {
            type: "message",
            data: Gm(e.substring(1), t)
        } : Fr[n] ? e.length > 1 ? {
            type: Fr[n],
            data: e.substring(1)
        } : {
            type: Fr[n]
        } : To
    },
    Gm = (e, t) => {
        if (Vm) {
            const n = Hm(e);
            return lp(n, t)
        } else return {
            base64: !0,
            data: e
        }
    },
    lp = (e, t) => {
        switch (t) {
            case "blob":
                return e instanceof Blob ? e : new Blob([e]);
            case "arraybuffer":
            default:
                return e instanceof ArrayBuffer ? e : e.buffer
        }
    },
    up = String.fromCharCode(30),
    Km = (e, t) => {
        const n = e.length,
            s = new Array(n);
        let r = 0;
        e.forEach((i, o) => {
            va(i, !1, a => {
                s[o] = a, ++r === n && t(s.join(up))
            })
        })
    },
    Wm = (e, t) => {
        const n = e.split(up),
            s = [];
        for (let r = 0; r < n.length; r++) {
            const i = ya(n[r], t);
            if (s.push(i), i.type === "error") break
        }
        return s
    };

function Qm() {
    return new TransformStream({
        transform(e, t) {
            qm(e, n => {
                const s = n.length;
                let r;
                if (s < 126) r = new Uint8Array(1), new DataView(r.buffer).setUint8(0, s);
                else if (s < 65536) {
                    r = new Uint8Array(3);
                    const i = new DataView(r.buffer);
                    i.setUint8(0, 126), i.setUint16(1, s)
                } else {
                    r = new Uint8Array(9);
                    const i = new DataView(r.buffer);
                    i.setUint8(0, 127), i.setBigUint64(1, BigInt(s))
                }
                e.data && typeof e.data != "string" && (r[0] |= 128), t.enqueue(r), t.enqueue(n)
            })
        }
    })
}
let Yi;

function Sr(e) {
    return e.reduce((t, n) => t + n.length, 0)
}

function Cr(e, t) {
    if (e[0].length === t) return e.shift();
    const n = new Uint8Array(t);
    let s = 0;
    for (let r = 0; r < t; r++) n[r] = e[0][s++], s === e[0].length && (e.shift(), s = 0);
    return e.length && s < e[0].length && (e[0] = e[0].slice(s)), n
}

function Ym(e, t) {
    Yi || (Yi = new TextDecoder);
    const n = [];
    let s = 0,
        r = -1,
        i = !1;
    return new TransformStream({
        transform(o, a) {
            for (n.push(o);;) {
                if (s === 0) {
                    if (Sr(n) < 1) break;
                    const c = Cr(n, 1);
                    i = (c[0] & 128) === 128, r = c[0] & 127, r < 126 ? s = 3 : r === 126 ? s = 1 : s = 2
                } else if (s === 1) {
                    if (Sr(n) < 2) break;
                    const c = Cr(n, 2);
                    r = new DataView(c.buffer, c.byteOffset, c.length).getUint16(0), s = 3
                } else if (s === 2) {
                    if (Sr(n) < 8) break;
                    const c = Cr(n, 8),
                        l = new DataView(c.buffer, c.byteOffset, c.length),
                        u = l.getUint32(0);
                    if (u > Math.pow(2, 53 - 32) - 1) {
                        a.enqueue(To);
                        break
                    }
                    r = u * Math.pow(2, 32) + l.getUint32(4), s = 3
                } else {
                    if (Sr(n) < r) break;
                    const c = Cr(n, r);
                    a.enqueue(ya(i ? c : Yi.decode(c), t)), s = 0
                }
                if (r === 0 || r > e) {
                    a.enqueue(To);
                    break
                }
            }
        }
    })
}
const pp = 4;

function Fe(e) {
    if (e) return Xm(e)
}

function Xm(e) {
    for (var t in Fe.prototype) e[t] = Fe.prototype[t];
    return e
}
Fe.prototype.on = Fe.prototype.addEventListener = function(e, t) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
};
Fe.prototype.once = function(e, t) {
    function n() {
        this.off(e, n), t.apply(this, arguments)
    }
    return n.fn = t, this.on(e, n), this
};
Fe.prototype.off = Fe.prototype.removeListener = Fe.prototype.removeAllListeners = Fe.prototype.removeEventListener = function(e, t) {
    if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
    var n = this._callbacks["$" + e];
    if (!n) return this;
    if (arguments.length == 1) return delete this._callbacks["$" + e], this;
    for (var s, r = 0; r < n.length; r++)
        if (s = n[r], s === t || s.fn === t) {
            n.splice(r, 1);
            break
        } return n.length === 0 && delete this._callbacks["$" + e], this
};
Fe.prototype.emit = function(e) {
    this._callbacks = this._callbacks || {};
    for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], s = 1; s < arguments.length; s++) t[s - 1] = arguments[s];
    if (n) {
        n = n.slice(0);
        for (var s = 0, r = n.length; s < r; ++s) n[s].apply(this, t)
    }
    return this
};
Fe.prototype.emitReserved = Fe.prototype.emit;
Fe.prototype.listeners = function(e) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
};
Fe.prototype.hasListeners = function(e) {
    return !!this.listeners(e).length
};
const kt = (() => typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")())();

function dp(e, ...t) {
    return t.reduce((n, s) => (e.hasOwnProperty(s) && (n[s] = e[s]), n), {})
}
const Jm = kt.setTimeout,
    Zm = kt.clearTimeout;

function ki(e, t) {
    t.useNativeTimers ? (e.setTimeoutFn = Jm.bind(kt), e.clearTimeoutFn = Zm.bind(kt)) : (e.setTimeoutFn = kt.setTimeout.bind(kt), e.clearTimeoutFn = kt.clearTimeout.bind(kt))
}
const eg = 1.33;

function tg(e) {
    return typeof e == "string" ? ng(e) : Math.ceil((e.byteLength || e.size) * eg)
}

function ng(e) {
    let t = 0,
        n = 0;
    for (let s = 0, r = e.length; s < r; s++) t = e.charCodeAt(s), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (s++, n += 4);
    return n
}

function sg(e) {
    let t = "";
    for (let n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
    return t
}

function rg(e) {
    let t = {},
        n = e.split("&");
    for (let s = 0, r = n.length; s < r; s++) {
        let i = n[s].split("=");
        t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
    }
    return t
}
class ig extends Error {
    constructor(t, n, s) {
        super(t), this.description = n, this.context = s, this.type = "TransportError"
    }
}
class ba extends Fe {
    constructor(t) {
        super(), this.writable = !1, ki(this, t), this.opts = t, this.query = t.query, this.socket = t.socket
    }
    onError(t, n, s) {
        return super.emitReserved("error", new ig(t, n, s)), this
    }
    open() {
        return this.readyState = "opening", this.doOpen(), this
    }
    close() {
        return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this
    }
    send(t) {
        this.readyState === "open" && this.write(t)
    }
    onOpen() {
        this.readyState = "open", this.writable = !0, super.emitReserved("open")
    }
    onData(t) {
        const n = ya(t, this.socket.binaryType);
        this.onPacket(n)
    }
    onPacket(t) {
        super.emitReserved("packet", t)
    }
    onClose(t) {
        this.readyState = "closed", super.emitReserved("close", t)
    }
    pause(t) {}
    createUri(t, n = {}) {
        return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(n)
    }
    _hostname() {
        const t = this.opts.hostname;
        return t.indexOf(":") === -1 ? t : "[" + t + "]"
    }
    _port() {
        return this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : ""
    }
    _query(t) {
        const n = sg(t);
        return n.length ? "?" + n : ""
    }
}
const fp = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
    So = 64,
    og = {};
let sl = 0,
    Or = 0,
    rl;

function il(e) {
    let t = "";
    do t = fp[e % So] + t, e = Math.floor(e / So); while (e > 0);
    return t
}

function hp() {
    const e = il(+new Date);
    return e !== rl ? (sl = 0, rl = e) : e + "." + il(sl++)
}
for (; Or < So; Or++) og[fp[Or]] = Or;
let mp = !1;
try {
    mp = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest
} catch {}
const ag = mp;

function gp(e) {
    const t = e.xdomain;
    try {
        if (typeof XMLHttpRequest < "u" && (!t || ag)) return new XMLHttpRequest
    } catch {}
    if (!t) try {
        return new kt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
    } catch {}
}

function cg() {}
const lg = function() {
    return new gp({
        xdomain: !1
    }).responseType != null
}();
class ug extends ba {
    constructor(t) {
        if (super(t), this.polling = !1, typeof location < "u") {
            const s = location.protocol === "https:";
            let r = location.port;
            r || (r = s ? "443" : "80"), this.xd = typeof location < "u" && t.hostname !== location.hostname || r !== t.port
        }
        const n = t && t.forceBase64;
        this.supportsBinary = lg && !n, this.opts.withCredentials && (this.cookieJar = void 0)
    }
    get name() {
        return "polling"
    }
    doOpen() {
        this.poll()
    }
    pause(t) {
        this.readyState = "pausing";
        const n = () => {
            this.readyState = "paused", t()
        };
        if (this.polling || !this.writable) {
            let s = 0;
            this.polling && (s++, this.once("pollComplete", function() {
                --s || n()
            })), this.writable || (s++, this.once("drain", function() {
                --s || n()
            }))
        } else n()
    }
    poll() {
        this.polling = !0, this.doPoll(), this.emitReserved("poll")
    }
    onData(t) {
        const n = s => {
            if (this.readyState === "opening" && s.type === "open" && this.onOpen(), s.type === "close") return this.onClose({
                description: "transport closed by the server"
            }), !1;
            this.onPacket(s)
        };
        Wm(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this.polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this.poll())
    }
    doClose() {
        const t = () => {
            this.write([{
                type: "close"
            }])
        };
        this.readyState === "open" ? t() : this.once("open", t)
    }
    write(t) {
        this.writable = !1, Km(t, n => {
            this.doWrite(n, () => {
                this.writable = !0, this.emitReserved("drain")
            })
        })
    }
    uri() {
        const t = this.opts.secure ? "https" : "http",
            n = this.query || {};
        return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = hp()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n)
    }
    request(t = {}) {
        return Object.assign(t, {
            xd: this.xd,
            cookieJar: this.cookieJar
        }, this.opts), new Jt(this.uri(), t)
    }
    doWrite(t, n) {
        const s = this.request({
            method: "POST",
            data: t
        });
        s.on("success", n), s.on("error", (r, i) => {
            this.onError("xhr post error", r, i)
        })
    }
    doPoll() {
        const t = this.request();
        t.on("data", this.onData.bind(this)), t.on("error", (n, s) => {
            this.onError("xhr poll error", n, s)
        }), this.pollXhr = t
    }
}
class Jt extends Fe {
    constructor(t, n) {
        super(), ki(this, n), this.opts = n, this.method = n.method || "GET", this.uri = t, this.data = n.data !== void 0 ? n.data : null, this.create()
    }
    create() {
        var t;
        const n = dp(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        n.xdomain = !!this.opts.xd;
        const s = this.xhr = new gp(n);
        try {
            s.open(this.method, this.uri, !0);
            try {
                if (this.opts.extraHeaders) {
                    s.setDisableHeaderCheck && s.setDisableHeaderCheck(!0);
                    for (let r in this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(r) && s.setRequestHeader(r, this.opts.extraHeaders[r])
                }
            } catch {}
            if (this.method === "POST") try {
                s.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
            } catch {}
            try {
                s.setRequestHeader("Accept", "*/*")
            } catch {}(t = this.opts.cookieJar) === null || t === void 0 || t.addCookies(s), "withCredentials" in s && (s.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (s.timeout = this.opts.requestTimeout), s.onreadystatechange = () => {
                var r;
                s.readyState === 3 && ((r = this.opts.cookieJar) === null || r === void 0 || r.parseCookies(s)), s.readyState === 4 && (s.status === 200 || s.status === 1223 ? this.onLoad() : this.setTimeoutFn(() => {
                    this.onError(typeof s.status == "number" ? s.status : 0)
                }, 0))
            }, s.send(this.data)
        } catch (r) {
            this.setTimeoutFn(() => {
                this.onError(r)
            }, 0);
            return
        }
        typeof document < "u" && (this.index = Jt.requestsCount++, Jt.requests[this.index] = this)
    }
    onError(t) {
        this.emitReserved("error", t, this.xhr), this.cleanup(!0)
    }
    cleanup(t) {
        if (!(typeof this.xhr > "u" || this.xhr === null)) {
            if (this.xhr.onreadystatechange = cg, t) try {
                this.xhr.abort()
            } catch {}
            typeof document < "u" && delete Jt.requests[this.index], this.xhr = null
        }
    }
    onLoad() {
        const t = this.xhr.responseText;
        t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this.cleanup())
    }
    abort() {
        this.cleanup()
    }
}
Jt.requestsCount = 0;
Jt.requests = {};
if (typeof document < "u") {
    if (typeof attachEvent == "function") attachEvent("onunload", ol);
    else if (typeof addEventListener == "function") {
        const e = "onpagehide" in kt ? "pagehide" : "unload";
        addEventListener(e, ol, !1)
    }
}

function ol() {
    for (let e in Jt.requests) Jt.requests.hasOwnProperty(e) && Jt.requests[e].abort()
}
const _a = (() => typeof Promise == "function" && typeof Promise.resolve == "function" ? t => Promise.resolve().then(t) : (t, n) => n(t, 0))(),
    Rr = kt.WebSocket || kt.MozWebSocket,
    al = !0,
    pg = "arraybuffer",
    cl = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class dg extends ba {
    constructor(t) {
        super(t), this.supportsBinary = !t.forceBase64
    }
    get name() {
        return "websocket"
    }
    doOpen() {
        if (!this.check()) return;
        const t = this.uri(),
            n = this.opts.protocols,
            s = cl ? {} : dp(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        this.opts.extraHeaders && (s.headers = this.opts.extraHeaders);
        try {
            this.ws = al && !cl ? n ? new Rr(t, n) : new Rr(t) : new Rr(t, n, s)
        } catch (r) {
            return this.emitReserved("error", r)
        }
        this.ws.binaryType = this.socket.binaryType, this.addEventListeners()
    }
    addEventListeners() {
        this.ws.onopen = () => {
            this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
        }, this.ws.onclose = t => this.onClose({
            description: "websocket connection closed",
            context: t
        }), this.ws.onmessage = t => this.onData(t.data), this.ws.onerror = t => this.onError("websocket error", t)
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const s = t[n],
                r = n === t.length - 1;
            va(s, this.supportsBinary, i => {
                const o = {};
                try {
                    al && this.ws.send(i)
                } catch {}
                r && _a(() => {
                    this.writable = !0, this.emitReserved("drain")
                }, this.setTimeoutFn)
            })
        }
    }
    doClose() {
        typeof this.ws < "u" && (this.ws.close(), this.ws = null)
    }
    uri() {
        const t = this.opts.secure ? "wss" : "ws",
            n = this.query || {};
        return this.opts.timestampRequests && (n[this.opts.timestampParam] = hp()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n)
    }
    check() {
        return !!Rr
    }
}
class fg extends ba {
    get name() {
        return "webtransport"
    }
    doOpen() {
        typeof WebTransport == "function" && (this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]), this.transport.closed.then(() => {
            this.onClose()
        }).catch(t => {
            this.onError("webtransport error", t)
        }), this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then(t => {
                const n = Ym(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
                    s = t.readable.pipeThrough(n).getReader(),
                    r = Qm();
                r.readable.pipeTo(t.writable), this.writer = r.writable.getWriter();
                const i = () => {
                    s.read().then(({
                        done: a,
                        value: c
                    }) => {
                        a || (this.onPacket(c), i())
                    }).catch(a => {})
                };
                i();
                const o = {
                    type: "open"
                };
                this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`), this.writer.write(o).then(() => this.onOpen())
            })
        }))
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const s = t[n],
                r = n === t.length - 1;
            this.writer.write(s).then(() => {
                r && _a(() => {
                    this.writable = !0, this.emitReserved("drain")
                }, this.setTimeoutFn)
            })
        }
    }
    doClose() {
        var t;
        (t = this.transport) === null || t === void 0 || t.close()
    }
}
const hg = {
        websocket: dg,
        webtransport: fg,
        polling: ug
    },
    mg = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    gg = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];

function Co(e) {
    if (e.length > 2e3) throw "URI too long";
    const t = e,
        n = e.indexOf("["),
        s = e.indexOf("]");
    n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
    let r = mg.exec(e || ""),
        i = {},
        o = 14;
    for (; o--;) i[gg[o]] = r[o] || "";
    return n != -1 && s != -1 && (i.source = t, i.host = i.host.substring(1, i.host.length - 1).replace(/;/g, ":"), i.authority = i.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), i.ipv6uri = !0), i.pathNames = wg(i, i.path), i.queryKey = vg(i, i.query), i
}

function wg(e, t) {
    const n = /\/{2,9}/g,
        s = t.replace(n, "/").split("/");
    return (t.slice(0, 1) == "/" || t.length === 0) && s.splice(0, 1), t.slice(-1) == "/" && s.splice(s.length - 1, 1), s
}

function vg(e, t) {
    const n = {};
    return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(s, r, i) {
        r && (n[r] = i)
    }), n
}
class _n extends Fe {
    constructor(t, n = {}) {
        super(), this.binaryType = pg, this.writeBuffer = [], t && typeof t == "object" && (n = t, t = null), t ? (t = Co(t), n.hostname = t.host, n.secure = t.protocol === "https" || t.protocol === "wss", n.port = t.port, t.query && (n.query = t.query)) : n.host && (n.hostname = Co(n.host).host), ki(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = n.transports || ["polling", "websocket", "webtransport"], this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: !1
        }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = rg(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, typeof addEventListener == "function" && (this.opts.closeOnBeforeunload && (this.beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close())
        }, addEventListener("beforeunload", this.beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this.offlineEventListener = () => {
            this.onClose("transport close", {
                description: "network connection lost"
            })
        }, addEventListener("offline", this.offlineEventListener, !1))), this.open()
    }
    createTransport(t) {
        const n = Object.assign({}, this.opts.query);
        n.EIO = pp, n.transport = t, this.id && (n.sid = this.id);
        const s = Object.assign({}, this.opts, {
            query: n,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[t]);
        return new hg[t](s)
    }
    open() {
        let t;
        if (this.opts.rememberUpgrade && _n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) t = "websocket";
        else if (this.transports.length === 0) {
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available")
            }, 0);
            return
        } else t = this.transports[0];
        this.readyState = "opening";
        try {
            t = this.createTransport(t)
        } catch {
            this.transports.shift(), this.open();
            return
        }
        t.open(), this.setTransport(t)
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", n => this.onClose("transport close", n))
    }
    probe(t) {
        let n = this.createTransport(t),
            s = !1;
        _n.priorWebsocketSuccess = !1;
        const r = () => {
            s || (n.send([{
                type: "ping",
                data: "probe"
            }]), n.once("packet", p => {
                if (!s)
                    if (p.type === "pong" && p.data === "probe") {
                        if (this.upgrading = !0, this.emitReserved("upgrading", n), !n) return;
                        _n.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
                            s || this.readyState !== "closed" && (u(), this.setTransport(n), n.send([{
                                type: "upgrade"
                            }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush())
                        })
                    } else {
                        const d = new Error("probe error");
                        d.transport = n.name, this.emitReserved("upgradeError", d)
                    }
            }))
        };

        function i() {
            s || (s = !0, u(), n.close(), n = null)
        }
        const o = p => {
            const d = new Error("probe error: " + p);
            d.transport = n.name, i(), this.emitReserved("upgradeError", d)
        };

        function a() {
            o("transport closed")
        }

        function c() {
            o("socket closed")
        }

        function l(p) {
            n && p.name !== n.name && i()
        }
        const u = () => {
            n.removeListener("open", r), n.removeListener("error", o), n.removeListener("close", a), this.off("close", c), this.off("upgrading", l)
        };
        n.once("open", r), n.once("error", o), n.once("close", a), this.once("close", c), this.once("upgrading", l), this.upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
            s || n.open()
        }, 200) : n.open()
    }
    onOpen() {
        if (this.readyState = "open", _n.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush(), this.readyState === "open" && this.opts.upgrade) {
            let t = 0;
            const n = this.upgrades.length;
            for (; t < n; t++) this.probe(this.upgrades[t])
        }
    }
    onPacket(t) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), this.resetPingTimeout(), t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "ping":
                this.sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong");
                break;
            case "error":
                const n = new Error("server error");
                n.code = t.data, this.onError(n);
                break;
            case "message":
                this.emitReserved("data", t.data), this.emitReserved("message", t.data);
                break
        }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.maxPayload = t.maxPayload, this.onOpen(), this.readyState !== "closed" && this.resetPingTimeout()
    }
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer), this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout")
        }, this.pingInterval + this.pingTimeout), this.opts.autoUnref && this.pingTimeoutTimer.unref()
    }
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush()
    }
    flush() {
        if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const t = this.getWritablePackets();
            this.transport.send(t), this.prevBufferLen = t.length, this.emitReserved("flush")
        }
    }
    getWritablePackets() {
        if (!(this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
        let n = 1;
        for (let s = 0; s < this.writeBuffer.length; s++) {
            const r = this.writeBuffer[s].data;
            if (r && (n += tg(r)), s > 0 && n > this.maxPayload) return this.writeBuffer.slice(0, s);
            n += 2
        }
        return this.writeBuffer
    }
    write(t, n, s) {
        return this.sendPacket("message", t, n, s), this
    }
    send(t, n, s) {
        return this.sendPacket("message", t, n, s), this
    }
    sendPacket(t, n, s, r) {
        if (typeof n == "function" && (r = n, n = void 0), typeof s == "function" && (r = s, s = null), this.readyState === "closing" || this.readyState === "closed") return;
        s = s || {}, s.compress = s.compress !== !1;
        const i = {
            type: t,
            data: n,
            options: s
        };
        this.emitReserved("packetCreate", i), this.writeBuffer.push(i), r && this.once("flush", r), this.flush()
    }
    close() {
        const t = () => {
                this.onClose("forced close"), this.transport.close()
            },
            n = () => {
                this.off("upgrade", n), this.off("upgradeError", n), t()
            },
            s = () => {
                this.once("upgrade", n), this.once("upgradeError", n)
            };
        return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
            this.upgrading ? s() : t()
        }) : this.upgrading ? s() : t()), this
    }
    onError(t) {
        _n.priorWebsocketSuccess = !1, this.emitReserved("error", t), this.onClose("transport error", t)
    }
    onClose(t, n) {
        (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") && (this.clearTimeoutFn(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), typeof removeEventListener == "function" && (removeEventListener("beforeunload", this.beforeunloadEventListener, !1), removeEventListener("offline", this.offlineEventListener, !1)), this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this.prevBufferLen = 0)
    }
    filterUpgrades(t) {
        const n = [];
        let s = 0;
        const r = t.length;
        for (; s < r; s++) ~this.transports.indexOf(t[s]) && n.push(t[s]);
        return n
    }
}
_n.protocol = pp;

function yg(e, t = "", n) {
    let s = e;
    n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), s = Co(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
    const i = s.host.indexOf(":") !== -1 ? "[" + s.host + "]" : s.host;
    return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s
}
const bg = typeof ArrayBuffer == "function",
    _g = e => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer,
    wp = Object.prototype.toString,
    xg = typeof Blob == "function" || typeof Blob < "u" && wp.call(Blob) === "[object BlobConstructor]",
    kg = typeof File == "function" || typeof File < "u" && wp.call(File) === "[object FileConstructor]";

function xa(e) {
    return bg && (e instanceof ArrayBuffer || _g(e)) || xg && e instanceof Blob || kg && e instanceof File
}

function Ur(e, t) {
    if (!e || typeof e != "object") return !1;
    if (Array.isArray(e)) {
        for (let n = 0, s = e.length; n < s; n++)
            if (Ur(e[n])) return !0;
        return !1
    }
    if (xa(e)) return !0;
    if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1) return Ur(e.toJSON(), !0);
    for (const n in e)
        if (Object.prototype.hasOwnProperty.call(e, n) && Ur(e[n])) return !0;
    return !1
}

function Eg(e) {
    const t = [],
        n = e.data,
        s = e;
    return s.data = Oo(n, t), s.attachments = t.length, {
        packet: s,
        buffers: t
    }
}

function Oo(e, t) {
    if (!e) return e;
    if (xa(e)) {
        const n = {
            _placeholder: !0,
            num: t.length
        };
        return t.push(e), n
    } else if (Array.isArray(e)) {
        const n = new Array(e.length);
        for (let s = 0; s < e.length; s++) n[s] = Oo(e[s], t);
        return n
    } else if (typeof e == "object" && !(e instanceof Date)) {
        const n = {};
        for (const s in e) Object.prototype.hasOwnProperty.call(e, s) && (n[s] = Oo(e[s], t));
        return n
    }
    return e
}

function Ag(e, t) {
    return e.data = Ro(e.data, t), delete e.attachments, e
}

function Ro(e, t) {
    if (!e) return e;
    if (e && e._placeholder === !0) {
        if (typeof e.num == "number" && e.num >= 0 && e.num < t.length) return t[e.num];
        throw new Error("illegal attachments")
    } else if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) e[n] = Ro(e[n], t);
    else if (typeof e == "object")
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (e[n] = Ro(e[n], t));
    return e
}
const Tg = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener"],
    Sg = 5;
var ie;
(function(e) {
    e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK"
})(ie || (ie = {}));
class Cg {
    constructor(t) {
        this.replacer = t
    }
    encode(t) {
        return (t.type === ie.EVENT || t.type === ie.ACK) && Ur(t) ? this.encodeAsBinary({
            type: t.type === ie.EVENT ? ie.BINARY_EVENT : ie.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id
        }) : [this.encodeAsString(t)]
    }
    encodeAsString(t) {
        let n = "" + t.type;
        return (t.type === ie.BINARY_EVENT || t.type === ie.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n
    }
    encodeAsBinary(t) {
        const n = Eg(t),
            s = this.encodeAsString(n.packet),
            r = n.buffers;
        return r.unshift(s), r
    }
}

function ll(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}
class ka extends Fe {
    constructor(t) {
        super(), this.reviver = t
    }
    add(t) {
        let n;
        if (typeof t == "string") {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            n = this.decodeString(t);
            const s = n.type === ie.BINARY_EVENT;
            s || n.type === ie.BINARY_ACK ? (n.type = s ? ie.EVENT : ie.ACK, this.reconstructor = new Og(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n)
        } else if (xa(t) || t.base64)
            if (this.reconstructor) n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, super.emitReserved("decoded", n));
            else throw new Error("got binary data when not reconstructing a packet");
        else throw new Error("Unknown type: " + t)
    }
    decodeString(t) {
        let n = 0;
        const s = {
            type: Number(t.charAt(0))
        };
        if (ie[s.type] === void 0) throw new Error("unknown packet type " + s.type);
        if (s.type === ie.BINARY_EVENT || s.type === ie.BINARY_ACK) {
            const i = n + 1;
            for (; t.charAt(++n) !== "-" && n != t.length;);
            const o = t.substring(i, n);
            if (o != Number(o) || t.charAt(n) !== "-") throw new Error("Illegal attachments");
            s.attachments = Number(o)
        }
        if (t.charAt(n + 1) === "/") {
            const i = n + 1;
            for (; ++n && !(t.charAt(n) === "," || n === t.length););
            s.nsp = t.substring(i, n)
        } else s.nsp = "/";
        const r = t.charAt(n + 1);
        if (r !== "" && Number(r) == r) {
            const i = n + 1;
            for (; ++n;) {
                const o = t.charAt(n);
                if (o == null || Number(o) != o) {
                    --n;
                    break
                }
                if (n === t.length) break
            }
            s.id = Number(t.substring(i, n + 1))
        }
        if (t.charAt(++n)) {
            const i = this.tryParse(t.substr(n));
            if (ka.isPayloadValid(s.type, i)) s.data = i;
            else throw new Error("invalid payload")
        }
        return s
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver)
        } catch {
            return !1
        }
    }
    static isPayloadValid(t, n) {
        switch (t) {
            case ie.CONNECT:
                return ll(n);
            case ie.DISCONNECT:
                return n === void 0;
            case ie.CONNECT_ERROR:
                return typeof n == "string" || ll(n);
            case ie.EVENT:
            case ie.BINARY_EVENT:
                return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Tg.indexOf(n[0]) === -1);
            case ie.ACK:
            case ie.BINARY_ACK:
                return Array.isArray(n)
        }
    }
    destroy() {
        this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null)
    }
}
class Og {
    constructor(t) {
        this.packet = t, this.buffers = [], this.reconPack = t
    }
    takeBinaryData(t) {
        if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            const n = Ag(this.reconPack, this.buffers);
            return this.finishedReconstruction(), n
        }
        return null
    }
    finishedReconstruction() {
        this.reconPack = null, this.buffers = []
    }
}
const Rg = Object.freeze(Object.defineProperty({
    __proto__: null,
    protocol: Sg,
    get PacketType() {
        return ie
    },
    Encoder: Cg,
    Decoder: ka
}, Symbol.toStringTag, {
    value: "Module"
}));

function Pt(e, t, n) {
    return e.on(t, n),
        function() {
            e.off(t, n)
        }
}
const Ng = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
});
class vp extends Fe {
    constructor(t, n, s) {
        super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = n, s && s.auth && (this.auth = s.auth), this._opts = Object.assign({}, s), this.io._autoConnect && this.open()
    }
    get disconnected() {
        return !this.connected
    }
    subEvents() {
        if (this.subs) return;
        const t = this.io;
        this.subs = [Pt(t, "open", this.onopen.bind(this)), Pt(t, "packet", this.onpacket.bind(this)), Pt(t, "error", this.onerror.bind(this)), Pt(t, "close", this.onclose.bind(this))]
    }
    get active() {
        return !!this.subs
    }
    connect() {
        return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this)
    }
    open() {
        return this.connect()
    }
    send(...t) {
        return t.unshift("message"), this.emit.apply(this, t), this
    }
    emit(t, ...n) {
        if (Ng.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
        if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) return this._addToQueue(n), this;
        const s = {
            type: ie.EVENT,
            data: n
        };
        if (s.options = {}, s.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
            const o = this.ids++,
                a = n.pop();
            this._registerAckCallback(o, a), s.id = o
        }
        const r = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
        return this.flags.volatile && (!r || !this.connected) || (this.connected ? (this.notifyOutgoingListeners(s), this.packet(s)) : this.sendBuffer.push(s)), this.flags = {}, this
    }
    _registerAckCallback(t, n) {
        var s;
        const r = (s = this.flags.timeout) !== null && s !== void 0 ? s : this._opts.ackTimeout;
        if (r === void 0) {
            this.acks[t] = n;
            return
        }
        const i = this.io.setTimeoutFn(() => {
                delete this.acks[t];
                for (let a = 0; a < this.sendBuffer.length; a++) this.sendBuffer[a].id === t && this.sendBuffer.splice(a, 1);
                n.call(this, new Error("operation has timed out"))
            }, r),
            o = (...a) => {
                this.io.clearTimeoutFn(i), n.apply(this, a)
            };
        o.withError = !0, this.acks[t] = o
    }
    emitWithAck(t, ...n) {
        return new Promise((s, r) => {
            const i = (o, a) => o ? r(o) : s(a);
            i.withError = !0, n.push(i), this.emit(t, ...n)
        })
    }
    _addToQueue(t) {
        let n;
        typeof t[t.length - 1] == "function" && (n = t.pop());
        const s = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({
                fromQueue: !0
            }, this.flags)
        };
        t.push((r, ...i) => s !== this._queue[0] ? void 0 : (r !== null ? s.tryCount > this._opts.retries && (this._queue.shift(), n && n(r)) : (this._queue.shift(), n && n(null, ...i)), s.pending = !1, this._drainQueue())), this._queue.push(s), this._drainQueue()
    }
    _drainQueue(t = !1) {
        if (!this.connected || this._queue.length === 0) return;
        const n = this._queue[0];
        n.pending && !t || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args))
    }
    packet(t) {
        t.nsp = this.nsp, this.io._packet(t)
    }
    onopen() {
        typeof this.auth == "function" ? this.auth(t => {
            this._sendConnectPacket(t)
        }) : this._sendConnectPacket(this.auth)
    }
    _sendConnectPacket(t) {
        this.packet({
            type: ie.CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, t) : t
        })
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t)
    }
    onclose(t, n) {
        this.connected = !1, delete this.id, this.emitReserved("disconnect", t, n), this._clearAcks()
    }
    _clearAcks() {
        Object.keys(this.acks).forEach(t => {
            if (!this.sendBuffer.some(s => String(s.id) === t)) {
                const s = this.acks[t];
                delete this.acks[t], s.withError && s.call(this, new Error("socket has been disconnected"))
            }
        })
    }
    onpacket(t) {
        if (t.nsp === this.nsp) switch (t.type) {
            case ie.CONNECT:
                t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case ie.EVENT:
            case ie.BINARY_EVENT:
                this.onevent(t);
                break;
            case ie.ACK:
            case ie.BINARY_ACK:
                this.onack(t);
                break;
            case ie.DISCONNECT:
                this.ondisconnect();
                break;
            case ie.CONNECT_ERROR:
                this.destroy();
                const s = new Error(t.data.message);
                s.data = t.data.data, this.emitReserved("connect_error", s);
                break
        }
    }
    onevent(t) {
        const n = t.data || [];
        t.id != null && n.push(this.ack(t.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n))
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length) {
            const n = this._anyListeners.slice();
            for (const s of n) s.apply(this, t)
        }
        super.emit.apply(this, t), this._pid && t.length && typeof t[t.length - 1] == "string" && (this._lastOffset = t[t.length - 1])
    }
    ack(t) {
        const n = this;
        let s = !1;
        return function(...r) {
            s || (s = !0, n.packet({
                type: ie.ACK,
                id: t,
                data: r
            }))
        }
    }
    onack(t) {
        const n = this.acks[t.id];
        typeof n == "function" && (delete this.acks[t.id], n.withError && t.data.unshift(null), n.apply(this, t.data))
    }
    onconnect(t, n) {
        this.id = t, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0)
    }
    emitBuffered() {
        this.receiveBuffer.forEach(t => this.emitEvent(t)), this.receiveBuffer = [], this.sendBuffer.forEach(t => {
            this.notifyOutgoingListeners(t), this.packet(t)
        }), this.sendBuffer = []
    }
    ondisconnect() {
        this.destroy(), this.onclose("io server disconnect")
    }
    destroy() {
        this.subs && (this.subs.forEach(t => t()), this.subs = void 0), this.io._destroy(this)
    }
    disconnect() {
        return this.connected && this.packet({
            type: ie.DISCONNECT
        }), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }
    close() {
        return this.disconnect()
    }
    compress(t) {
        return this.flags.compress = t, this
    }
    get volatile() {
        return this.flags.volatile = !0, this
    }
    timeout(t) {
        return this.flags.timeout = t, this
    }
    onAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this
    }
    prependAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this
    }
    offAny(t) {
        if (!this._anyListeners) return this;
        if (t) {
            const n = this._anyListeners;
            for (let s = 0; s < n.length; s++)
                if (t === n[s]) return n.splice(s, 1), this
        } else this._anyListeners = [];
        return this
    }
    listenersAny() {
        return this._anyListeners || []
    }
    onAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this
    }
    prependAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this
    }
    offAnyOutgoing(t) {
        if (!this._anyOutgoingListeners) return this;
        if (t) {
            const n = this._anyOutgoingListeners;
            for (let s = 0; s < n.length; s++)
                if (t === n[s]) return n.splice(s, 1), this
        } else this._anyOutgoingListeners = [];
        return this
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || []
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const n = this._anyOutgoingListeners.slice();
            for (const s of n) s.apply(this, t.data)
        }
    }
}

function _s(e) {
    e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
}
_s.prototype.duration = function() {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
        e = (Math.floor(t * 10) & 1) == 0 ? e - n : e + n
    }
    return Math.min(e, this.max) | 0
};
_s.prototype.reset = function() {
    this.attempts = 0
};
_s.prototype.setMin = function(e) {
    this.ms = e
};
_s.prototype.setMax = function(e) {
    this.max = e
};
_s.prototype.setJitter = function(e) {
    this.jitter = e
};
class No extends Fe {
    constructor(t, n) {
        var s;
        super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, ki(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((s = n.randomizationFactor) !== null && s !== void 0 ? s : .5), this.backoff = new _s({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
        const r = n.parser || Rg;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open()
    }
    reconnection(t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
    }
    reconnectionAttempts(t) {
        return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this)
    }
    reconnectionDelay(t) {
        var n;
        return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t, (n = this.backoff) === null || n === void 0 || n.setMin(t), this)
    }
    randomizationFactor(t) {
        var n;
        return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t, (n = this.backoff) === null || n === void 0 || n.setJitter(t), this)
    }
    reconnectionDelayMax(t) {
        var n;
        return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, (n = this.backoff) === null || n === void 0 || n.setMax(t), this)
    }
    timeout(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout
    }
    maybeReconnectOnOpen() {
        !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect()
    }
    open(t) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new _n(this.uri, this.opts);
        const n = this.engine,
            s = this;
        this._readyState = "opening", this.skipReconnect = !1;
        const r = Pt(n, "open", function() {
                s.onopen(), t && t()
            }),
            i = a => {
                this.cleanup(), this._readyState = "closed", this.emitReserved("error", a), t ? t(a) : this.maybeReconnectOnOpen()
            },
            o = Pt(n, "error", i);
        if (this._timeout !== !1) {
            const a = this._timeout,
                c = this.setTimeoutFn(() => {
                    r(), i(new Error("timeout")), n.close()
                }, a);
            this.opts.autoUnref && c.unref(), this.subs.push(() => {
                this.clearTimeoutFn(c)
            })
        }
        return this.subs.push(r), this.subs.push(o), this
    }
    connect(t) {
        return this.open(t)
    }
    onopen() {
        this.cleanup(), this._readyState = "open", this.emitReserved("open");
        const t = this.engine;
        this.subs.push(Pt(t, "ping", this.onping.bind(this)), Pt(t, "data", this.ondata.bind(this)), Pt(t, "error", this.onerror.bind(this)), Pt(t, "close", this.onclose.bind(this)), Pt(this.decoder, "decoded", this.ondecoded.bind(this)))
    }
    onping() {
        this.emitReserved("ping")
    }
    ondata(t) {
        try {
            this.decoder.add(t)
        } catch (n) {
            this.onclose("parse error", n)
        }
    }
    ondecoded(t) {
        _a(() => {
            this.emitReserved("packet", t)
        }, this.setTimeoutFn)
    }
    onerror(t) {
        this.emitReserved("error", t)
    }
    socket(t, n) {
        let s = this.nsps[t];
        return s ? this._autoConnect && !s.active && s.connect() : (s = new vp(this, t, n), this.nsps[t] = s), s
    }
    _destroy(t) {
        const n = Object.keys(this.nsps);
        for (const s of n)
            if (this.nsps[s].active) return;
        this._close()
    }
    _packet(t) {
        const n = this.encoder.encode(t);
        for (let s = 0; s < n.length; s++) this.engine.write(n[s], t.options)
    }
    cleanup() {
        this.subs.forEach(t => t()), this.subs.length = 0, this.decoder.destroy()
    }
    _close() {
        this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close"), this.engine && this.engine.close()
    }
    disconnect() {
        return this._close()
    }
    onclose(t, n) {
        this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, n), this._reconnection && !this.skipReconnect && this.reconnect()
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
        else {
            const n = this.backoff.duration();
            this._reconnecting = !0;
            const s = this.setTimeoutFn(() => {
                t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open(r => {
                    r ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", r)) : t.onreconnect()
                }))
            }, n);
            this.opts.autoUnref && s.unref(), this.subs.push(() => {
                this.clearTimeoutFn(s)
            })
        }
    }
    onreconnect() {
        const t = this.backoff.attempts;
        this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t)
    }
}
const Os = {};

function Br(e, t) {
    typeof e == "object" && (t = e, e = void 0), t = t || {};
    const n = yg(e, t.path || "/socket.io"),
        s = n.source,
        r = n.id,
        i = n.path,
        o = Os[r] && i in Os[r].nsps,
        a = t.forceNew || t["force new connection"] || t.multiplex === !1 || o;
    let c;
    return a ? c = new No(s, t) : (Os[r] || (Os[r] = new No(s, t)), c = Os[r]), n.query && !t.query && (t.query = n.queryKey), c.socket(n.path, t)
}
Object.assign(Br, {
    Manager: No,
    Socket: vp,
    io: Br,
    connect: Br
});

function Ea(e) {
    return Xo() ? (su(e), !0) : !1
}

function Lg() {
    const e = new Set,
        t = r => {
            e.delete(r)
        };
    return {
        on: r => {
            e.add(r);
            const i = () => t(r);
            return Ea(i), {
                off: i
            }
        },
        off: t,
        trigger: r => Promise.all(Array.from(e).map(i => i(r)))
    }
}

function Aa(e) {
    return typeof e == "function" ? e() : b(e)
}
const Ta = typeof window < "u",
    Ig = (e, t) => Object.prototype.hasOwnProperty.call(e, t);

function Pg(e, t) {
    function n(...s) {
        return new Promise((r, i) => {
            Promise.resolve(e(() => t.apply(this, s), {
                fn: t,
                thisArg: this,
                args: s
            })).then(r).catch(i)
        })
    }
    return n
}
const yp = e => e();

function Dg(e = yp) {
    const t = ce(!0);

    function n() {
        t.value = !1
    }

    function s() {
        t.value = !0
    }
    const r = (...i) => {
        t.value && e(...i)
    };
    return {
        isActive: nr(t),
        pause: n,
        resume: s,
        eventFilter: r
    }
}

function $g(e, t = !1, n = "Timeout") {
    return new Promise((s, r) => {
        setTimeout(t ? () => r(n) : s, e)
    })
}

function Sa(e, t, n = {}) {
    const {
        immediate: s = !0
    } = n, r = ce(!1);
    let i = null;

    function o() {
        i && (clearTimeout(i), i = null)
    }

    function a() {
        r.value = !1, o()
    }

    function c(...l) {
        o(), r.value = !0, i = setTimeout(() => {
            r.value = !1, i = null, e(...l)
        }, Aa(t))
    }
    return s && (r.value = !0, Ta && c()), Ea(a), {
        isPending: nr(r),
        start: c,
        stop: a
    }
}
var ul = Object.getOwnPropertySymbols,
    zg = Object.prototype.hasOwnProperty,
    Mg = Object.prototype.propertyIsEnumerable,
    Fg = (e, t) => {
        var n = {};
        for (var s in e) zg.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
        if (e != null && ul)
            for (var s of ul(e)) t.indexOf(s) < 0 && Mg.call(e, s) && (n[s] = e[s]);
        return n
    };

function Ug(e, t, n = {}) {
    const s = n,
        {
            eventFilter: r = yp
        } = s,
        i = Fg(s, ["eventFilter"]);
    return Tn(e, Pg(r, t), i)
}
var Bg = Object.defineProperty,
    jg = Object.defineProperties,
    qg = Object.getOwnPropertyDescriptors,
    ei = Object.getOwnPropertySymbols,
    bp = Object.prototype.hasOwnProperty,
    _p = Object.prototype.propertyIsEnumerable,
    pl = (e, t, n) => t in e ? Bg(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Hg = (e, t) => {
        for (var n in t || (t = {})) bp.call(t, n) && pl(e, n, t[n]);
        if (ei)
            for (var n of ei(t)) _p.call(t, n) && pl(e, n, t[n]);
        return e
    },
    Vg = (e, t) => jg(e, qg(t)),
    Gg = (e, t) => {
        var n = {};
        for (var s in e) bp.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
        if (e != null && ei)
            for (var s of ei(e)) t.indexOf(s) < 0 && _p.call(e, s) && (n[s] = e[s]);
        return n
    };

function dl(e, t, n = {}) {
    const s = n,
        {
            eventFilter: r
        } = s,
        i = Gg(s, ["eventFilter"]),
        {
            eventFilter: o,
            pause: a,
            resume: c,
            isActive: l
        } = Dg(r);
    return {
        stop: Ug(e, t, Vg(Hg({}, i), {
            eventFilter: o
        })),
        pause: a,
        resume: c,
        isActive: l
    }
}

function fl(e) {
    var t;
    const n = Aa(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n
}
const Kg = Ta ? window : void 0,
    Wg = Ta ? window.document : void 0;

function Qg() {
    const e = ce(!1);
    return da() && dn(() => {
        e.value = !0
    }), e
}

function Yg(e) {
    const t = Qg();
    return Qn(() => (t.value, Boolean(e())))
}
var hl = Object.getOwnPropertySymbols,
    Xg = Object.prototype.hasOwnProperty,
    Jg = Object.prototype.propertyIsEnumerable,
    Zg = (e, t) => {
        var n = {};
        for (var s in e) Xg.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
        if (e != null && hl)
            for (var s of hl(e)) t.indexOf(s) < 0 && Jg.call(e, s) && (n[s] = e[s]);
        return n
    };

function xp(e, t, n = {}) {
    const s = n,
        {
            window: r = Kg
        } = s,
        i = Zg(s, ["window"]);
    let o;
    const a = Yg(() => r && "ResizeObserver" in r),
        c = () => {
            o && (o.disconnect(), o = void 0)
        },
        l = Qn(() => Array.isArray(e) ? e.map(d => fl(d)) : [fl(e)]),
        u = Tn(l, d => {
            if (c(), a.value && r) {
                o = new ResizeObserver(t);
                for (const g of d) g && o.observe(g, i)
            }
        }, {
            immediate: !0,
            flush: "post",
            deep: !0
        }),
        p = () => {
            c(), u()
        };
    return Ea(p), {
        isSupported: a,
        stop: p
    }
}
var ew = Object.defineProperty,
    ml = Object.getOwnPropertySymbols,
    tw = Object.prototype.hasOwnProperty,
    nw = Object.prototype.propertyIsEnumerable,
    gl = (e, t, n) => t in e ? ew(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    Xi = (e, t) => {
        for (var n in t || (t = {})) tw.call(t, n) && gl(e, n, t[n]);
        if (ml)
            for (var n of ml(t)) nw.call(t, n) && gl(e, n, t[n]);
        return e
    };
const sw = {
    multiple: !0,
    accept: "*"
};

function rw(e = {}) {
    const {
        document: t = Wg
    } = e, n = ce(null), {
        on: s,
        trigger: r
    } = Lg();
    let i;
    t && (i = t.createElement("input"), i.type = "file", i.onchange = c => {
        const l = c.target;
        n.value = l.files, r(n.value)
    });
    const o = c => {
            if (!i) return;
            const l = Xi(Xi(Xi({}, sw), e), c);
            i.multiple = l.multiple, i.accept = l.accept, Ig(l, "capture") && (i.capture = l.capture), i.click()
        },
        a = () => {
            n.value = null, i && (i.value = "")
        };
    return {
        files: nr(n),
        open: o,
        reset: a,
        onChange: s
    }
}

function iw(e) {
    const t = ce(e == null ? void 0 : e.element),
        n = ce(e == null ? void 0 : e.input),
        s = ce(1);

    function r() {
        var i, o;
        if (!t.value) return;
        let a = "";
        t.value.style.height = "1px", s.value = (i = t.value) == null ? void 0 : i.scrollHeight, e != null && e.styleTarget ? Aa(e.styleTarget).style.height = `${s.value}px` : a = `${s.value}px`, t.value.style.height = a, (o = e == null ? void 0 : e.onResize) == null || o.call(e)
    }
    return Tn([n, t], r, {
        immediate: !0
    }), xp(t, () => r()), e != null && e.watch && Tn(e.watch, r, {
        immediate: !0,
        deep: !0
    }), {
        textarea: t,
        input: n,
        triggerResize: r
    }
}
var cs = (e => (e.NEGATIVE = "Negative", e.POSITIVE = "Positive", e.NOT_SPECIFIED = "Not Specified", e))(cs || {}),
    We = (e => (e.AGENT = "agent", e.APP = "app", e.FAQ = "faq", e.FILE = "file", e.INPUT = "input", e.LANGUAGE = "language", e.MENU = "menu", e.MODAL = "modal", e.SHEET = "sheet", e))(We || {}),
    $e = (e => (e.CAROUSEL = "carousel", e.CONVERSATION = "conversation", e.DIALOG = "dialog", e.FEEDBACK = "feedback", e.NOTIFICATION = "notification", e.QUEUE = "queue", e.SESSION = "session", e.FAQ = "sessionFaq", e.LANGUAGE = "sessionLanguage", e.USER = "user", e))($e || {});
const kp = He($e.FEEDBACK, () => {
    const e = De({
            score: 0,
            label: cs.NOT_SPECIFIED,
            interactionId: void 0,
            comment: ""
        }),
        t = ce(!1);

    function n({
        score: i,
        comment: o
    }) {
        i && (i = typeof i == "string" ? parseInt(i) : i, e.score = i, e.label = i <= 0 ? cs.NEGATIVE : cs.POSITIVE), o && (e.comment = o)
    }

    function s() {
        e.score = 0, e.label = cs.NOT_SPECIFIED, e.comment = ""
    }

    function r() {
        e.score = 0, e.label = cs.NOT_SPECIFIED, e.interactionId = void 0, e.comment = ""
    }
    return {
        feedback: e,
        feedbackStarted: t,
        resetPartFeedback: s,
        setFeedback: n,
        resetFeedback: r
    }
}, {
    persist: {
        key: $e.FEEDBACK
    }
});
var vt = (e => (e.MESSAGEGROUP = "messageGroup", e.DIVIDER = "divider", e))(vt || {});
const lr = He($e.CONVERSATION, () => {
    const e = ce([]);

    function t(i) {
        e.value.push(i)
    }

    function n(i) {
        const o = e.value[e.value.length - 1];
        o.type === vt.MESSAGEGROUP && o.messageItems && o.messageItems.push(i)
    }

    function s() {
        e.value.length = 0
    }

    function r() {
        if (e.value.length > 0) return e.value.at(-1)
    }
    return {
        conversation: e,
        addConversationItem: t,
        addConversationItemMessage: n,
        getLatestMessage: r,
        resetConversation: s
    }
}, {
    persist: {
        key: $e.CONVERSATION
    }
});
var dt = (e => (e.ASK = "ask", e.FAQ = "faq", e.DIALOG_STEP = "dialogstep", e.FEEDBACK = "feedback", e.LINK_CLICK = "linkclick", e.EVENT = "event", e))(dt || {});
let Nr;
const ow = new Uint8Array(16);

function aw() {
    if (!Nr && (Nr = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Nr)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return Nr(ow)
}
const Je = [];
for (let e = 0; e < 256; ++e) Je.push((e + 256).toString(16).slice(1));

function cw(e, t = 0) {
    return (Je[e[t + 0]] + Je[e[t + 1]] + Je[e[t + 2]] + Je[e[t + 3]] + "-" + Je[e[t + 4]] + Je[e[t + 5]] + "-" + Je[e[t + 6]] + Je[e[t + 7]] + "-" + Je[e[t + 8]] + Je[e[t + 9]] + "-" + Je[e[t + 10]] + Je[e[t + 11]] + Je[e[t + 12]] + Je[e[t + 13]] + Je[e[t + 14]] + Je[e[t + 15]]).toLowerCase()
}
const lw = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
    wl = {
        randomUUID: lw
    };

function Xn(e, t, n) {
    if (wl.randomUUID && !t && !e) return wl.randomUUID();
    e = e || {};
    const s = e.random || (e.rng || aw)();
    if (s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, t) {
        n = n || 0;
        for (let r = 0; r < 16; ++r) t[n + r] = s[r];
        return t
    }
    return cw(s)
}
var qe = (e => (e.CLIENT_TERMINATED = "ClientTerminated", e.CLIENT_ORIGINATED = "ClientOriginated", e))(qe || {}),
    Tt = (e => (e.TEXT = "text", e.DIVIDER = "divider", e.LIST_PICKER = "listPicker", e.MEDIA = "media", e))(Tt || {});
const cn = e => ({
        $type: Tt.TEXT,
        text: e,
        direction: qe.CLIENT_ORIGINATED,
        id: Xn()
    }),
    zn = (e, t) => ({
        chat: {
            metadata: t
        },
        conversationMessages: e
    }),
    uw = (e, t, n) => ({
        $type: Tt.MEDIA,
        media: {
            name: e,
            uri: t,
            mimeType: n
        },
        direction: qe.CLIENT_ORIGINATED,
        id: Xn()
    }),
    Ze = He($e.SESSION, () => {
        const e = De({
                livechat: {
                    active: !1
                },
                conversationVariables: {},
                conversationVariablesChanged: !1,
                userProperties: {},
                contexts: {},
                isLoading: !1
            }),
            t = () => {
                e.livechat.active = !1
            },
            n = () => {
                e.contexts = {}, e.conversationVariables = {}, e.conversationVariablesChanged = !1, e.userProperties = {}
            };
        return {
            state: e,
            resetState: () => {
                n(), t()
            },
            resetJSAPIState: n,
            resetLiveChat: t
        }
    }, {
        persist: {
            key: $e.SESSION,
            paths: ["state"]
        }
    }),
    Bt = He($e.LANGUAGE, () => {
        const e = De({
            supportedLanguages: [],
            filteredLanguages: [],
            originalLanguage: "",
            translationEnabled: !1,
            detectedLanguage: void 0,
            selectedLanguage: "",
            disabledTranslation: !1
        });
        return {
            languages: e,
            setLanguages: i => {
                const o = Object.entries(i.supportedLanguages).map(([a, c]) => ({
                    ...c,
                    languageCode: a,
                    isActive: a === i.originalLanguage,
                    nativeName: c.nativeName
                }));
                e.supportedLanguages = o, e.filteredLanguages = o, e.originalLanguage = i.originalLanguage, e.translationEnabled = !0
            },
            setFilteredLanguages: i => {
                e.filteredLanguages = i
            },
            setDetectedLanguage: i => {
                e.detectedLanguage = i
            },
            resetLanguage: () => {
                e.selectedLanguage = ""
            }
        }
    }, {
        persist: {
            key: $e.LANGUAGE
        }
    });
var _e = (e => (e.ADD_CONTEXT = "addContext", e.ADD_CONVERSATION_VARIABLES = "addConversationVariables", e.ADD_USER_PROPERTIES = "addUserProperties", e.CONFIG = "config", e.DISABLE_TRANSLATIONS = "disable_translations", e.FEEDBACK = "feedback", e.HANDOVER = "handover", e.ONLOAD = "onload", e.REQUEST = "request", e.REQUEST_CAIC = "request_CAIC", e.RESET = "reset", e.RESPONSE = "response", e.SEND_EVENT = "send_event", e.SET_LANGUAGE = "setLanguage", e.USER = "user", e.USER_LOADED = "userLoaded", e))(_e || {});
const Ep = (e, t) => {
        const n = u => {
            var R;
            const p = lr(e),
                d = Ze(e),
                g = d.state.contexts,
                v = d.state.conversationVariables,
                w = d.state.conversationVariablesChanged;
            d.state.conversationVariablesChanged = !1;
            const y = d.state.userProperties,
                S = Bt(e).languages.selectedLanguage;
            return u.metadata = {
                ...u.metadata,
                ...Object.keys(y).length > 0 && {
                    user: y
                },
                ...w && {
                    conversationVariables: v
                },
                JSAPIContexts: g,
                ...S && {
                    selectedLanguage: S
                },
                lastInteraction: (R = p.getLatestMessage()) == null ? void 0 : R.lastInteraction,
                referer: window.location.href,
                userAgent: window.navigator.userAgent
            }, u
        };
        return {
            ask: (u, p, d) => {
                const g = n({
                    type: dt.ASK,
                    data: {
                        userInput: p,
                        dialogPath: d
                    },
                    metadata: {}
                });
                t.emit(_e.REQUEST, zn(u, g))
            },
            dialogStep: u => {
                const p = n({
                        type: dt.DIALOG_STEP,
                        data: {
                            dialogPath: u
                        },
                        metadata: {}
                    }),
                    d = [cn(dt.DIALOG_STEP)];
                t.emit(_e.REQUEST, zn(d, p))
            },
            faq: (u, p, d) => {
                const g = n({
                    type: dt.FAQ,
                    data: {
                        faqId: p,
                        userInput: d
                    },
                    metadata: {}
                });
                t.emit(_e.REQUEST, zn(u, g))
            },
            linkClick: (u, p, d) => {
                const g = n({
                        type: dt.LINK_CLICK,
                        data: {
                            interactionId: d,
                            linkUrl: u,
                            linkId: p
                        },
                        metadata: {}
                    }),
                    v = [cn(dt.LINK_CLICK)];
                t.emit(_e.REQUEST_CAIC, zn(v, g))
            },
            submitFeedback: u => {
                const p = n({
                        type: dt.FEEDBACK,
                        data: u,
                        metadata: {}
                    }),
                    d = [cn(dt.FEEDBACK)];
                t.emit(_e.REQUEST_CAIC, zn(d, p))
            },
            sendEvent: u => {
                const p = n({
                        type: dt.EVENT,
                        data: {
                            eventName: u
                        },
                        metadata: {}
                    }),
                    d = [cn(dt.EVENT)];
                t.emit(_e.SEND_EVENT, zn(d, p))
            },
            askHidden: (u, p) => {
                const d = [cn(u)],
                    g = n({
                        type: dt.ASK,
                        data: {
                            userInput: u,
                            dialogPath: p
                        },
                        metadata: {}
                    });
                t.emit(_e.REQUEST_CAIC, zn(d, g))
            },
            addMetadataToPayload: n
        }
    },
    fn = He($e.DIALOG, () => {
        const e = De({
                options: [],
                dialogPath: void 0,
                tDialogState: void 0,
                dialogPathData: void 0
            }),
            t = De({
                chooseAgain: {
                    text: "Choose again",
                    dividerText: ""
                }
            });

        function n() {
            e.options = [], e.dialogPath = void 0, e.tDialogState = void 0
        }

        function s(l) {
            e.dialogPath = l
        }

        function r(l) {
            e.dialogPathData = l
        }

        function i(l) {
            e.tDialogState = l
        }

        function o(l) {
            e.options.length = 0, e.options = l
        }

        function a() {
            e.options = []
        }

        function c(l) {
            t.chooseAgain = l.chooseAgain
        }
        return {
            dialog: e,
            dialogConfig: t,
            addOptions: o,
            flushDialogOptions: a,
            resetDialog: n,
            setDialogPath: s,
            setDialogPathData: r,
            setDialogConfig: c,
            setTDialogState: i
        }
    }, {
        persist: {
            key: $e.DIALOG
        }
    }),
    pw = (e, t, n, s) => {
        var c;
        const r = kp(e),
            o = fn(e).dialog.dialogPathData,
            a = o && o.id !== (n == null ? void 0 : n.id);
        s.metadata.isDialogEnd && r.feedback.interactionId && !a && s.metadata.originalRequest && "userInput" in s.metadata.originalRequest.data && !r.feedbackStarted ? (r.setFeedback({
            score: (c = s.data.outputAdditions) == null ? void 0 : c.feedbackScore,
            comment: s.metadata.originalRequest.data.userInput
        }), Ep(e, t).submitFeedback(r.feedback), r.resetFeedback()) : a && (r.feedbackStarted ? r.resetPartFeedback() : r.resetFeedback()), r.feedbackStarted && (r.feedbackStarted = !1)
    },
    dw = e => {
        if (!e) return;
        const t = e.split(":");
        return {
            id: t[0],
            nodes: t[1].split("/")
        }
    };
var Ca = (e => (e.ON_ANSWER = "onAnswer", e))(Ca || {}),
    Js = (e => (e[e.BUBBLE = 400] = "BUBBLE", e[e.PAGE_PUSH = 2e3] = "PAGE_PUSH", e[e.SNACKBAR = 5e3] = "SNACKBAR", e))(Js || {}),
    Ap = (e => (e.ERROR = "error", e.WARNING = "warning", e.SUCCESS = "success", e))(Ap || {}),
    Tp = (e => (e.INVALID_FILE_TYPE = "File not uploaded. Only files with the following extensions are allowed: .jpg, .jpeg, .pdf, docx, and .png", e.FILE_TOO_LARGE = "This file is too large to be uploaded. Maximum file size is 8MB.", e.EXTENSION_EXTRACTION_FAILURE = "Could not extract the file extension", e.UPLOAD_FAILURE = "We were unable to upload the file at this time, please try again", e.EMPTY_FILE = "File is empty or invalid, please choose a different file.", e))(Tp || {});
const gt = {
    Type: Ap,
    Message: Tp
};
var Sp = (e => (e[e.MAX_NUMBER_OF_NOTIFICATIONS = 3] = "MAX_NUMBER_OF_NOTIFICATIONS", e))(Sp || {});
const ur = He($e.NOTIFICATION, () => {
    const e = ce([]);

    function t(s) {
        e.value.length >= Sp.MAX_NUMBER_OF_NOTIFICATIONS && e.value.shift(), e.value.push(s)
    }

    function n() {
        e.value.length = 0
    }
    return {
        notifications: e,
        addNotification: t,
        resetNotification: n
    }
}, {
    persist: {
        key: $e.NOTIFICATION
    }
});
var At = (e => (e.MENU = "Menu", e.LANGUAGE = "Language", e.MODAL = "Modal", e))(At || {}),
    ls = (e => (e.FULLHEIGHT = "fullHeight", e.DEFAULT = "default", e))(ls || {}),
    ae = (e => (e.MENU = "menu", e.RESET = "reset", e.LANGUAGE_DETECTED = "languagedetected", e.LANGUAGE_SELECT = "language", e))(ae || {}); /*! @license DOMPurify 2.4.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.1/LICENSE */
function xn(e) {
    return xn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
        return typeof t
    } : function(t) {
        return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, xn(e)
}

function Lo(e, t) {
    return Lo = Object.setPrototypeOf || function(s, r) {
        return s.__proto__ = r, s
    }, Lo(e, t)
}

function fw() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0
    } catch {
        return !1
    }
}

function jr(e, t, n) {
    return fw() ? jr = Reflect.construct : jr = function(r, i, o) {
        var a = [null];
        a.push.apply(a, i);
        var c = Function.bind.apply(r, a),
            l = new c;
        return o && Lo(l, o.prototype), l
    }, jr.apply(null, arguments)
}

function It(e) {
    return hw(e) || mw(e) || gw(e) || ww()
}

function hw(e) {
    if (Array.isArray(e)) return Io(e)
}

function mw(e) {
    if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e)
}

function gw(e, t) {
    if (!!e) {
        if (typeof e == "string") return Io(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Io(e, t)
    }
}

function Io(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, s = new Array(t); n < t; n++) s[n] = e[n];
    return s
}

function ww() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
}
var vw = Object.hasOwnProperty,
    vl = Object.setPrototypeOf,
    yw = Object.isFrozen,
    bw = Object.getPrototypeOf,
    _w = Object.getOwnPropertyDescriptor,
    it = Object.freeze,
    jt = Object.seal,
    xw = Object.create,
    Cp = typeof Reflect < "u" && Reflect,
    ti = Cp.apply,
    Po = Cp.construct;
ti || (ti = function(t, n, s) {
    return t.apply(n, s)
});
it || (it = function(t) {
    return t
});
jt || (jt = function(t) {
    return t
});
Po || (Po = function(t, n) {
    return jr(t, It(n))
});
var kw = Ot(Array.prototype.forEach),
    yl = Ot(Array.prototype.pop),
    Rs = Ot(Array.prototype.push),
    qr = Ot(String.prototype.toLowerCase),
    Ji = Ot(String.prototype.toString),
    Ew = Ot(String.prototype.match),
    Lt = Ot(String.prototype.replace),
    Aw = Ot(String.prototype.indexOf),
    Tw = Ot(String.prototype.trim),
    st = Ot(RegExp.prototype.test),
    Zi = Sw(TypeError);

function Ot(e) {
    return function(t) {
        for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) s[r - 1] = arguments[r];
        return ti(e, t, s)
    }
}

function Sw(e) {
    return function() {
        for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++) n[s] = arguments[s];
        return Po(e, n)
    }
}

function ee(e, t, n) {
    n = n || qr, vl && vl(e, null);
    for (var s = t.length; s--;) {
        var r = t[s];
        if (typeof r == "string") {
            var i = n(r);
            i !== r && (yw(t) || (t[s] = i), r = i)
        }
        e[r] = !0
    }
    return e
}

function Mn(e) {
    var t = xw(null),
        n;
    for (n in e) ti(vw, e, [n]) && (t[n] = e[n]);
    return t
}

function Lr(e, t) {
    for (; e !== null;) {
        var n = _w(e, t);
        if (n) {
            if (n.get) return Ot(n.get);
            if (typeof n.value == "function") return Ot(n.value)
        }
        e = bw(e)
    }

    function s(r) {
        return console.warn("fallback value for", r), null
    }
    return s
}
var bl = it(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
    eo = it(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
    to = it(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
    Cw = it(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
    no = it(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]),
    Ow = it(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
    _l = it(["#text"]),
    xl = it(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]),
    so = it(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
    kl = it(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
    Ir = it(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    Rw = jt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Nw = jt(/<%[\w\W]*|[\w\W]*%>/gm),
    Lw = jt(/\${[\w\W]*}/gm),
    Iw = jt(/^data-[\-\w.\u00B7-\uFFFF]/),
    Pw = jt(/^aria-[\-\w]+$/),
    Dw = jt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    $w = jt(/^(?:\w+script|data):/i),
    zw = jt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    Mw = jt(/^html$/i),
    Fw = function() {
        return typeof window > "u" ? null : window
    },
    Uw = function(t, n) {
        if (xn(t) !== "object" || typeof t.createPolicy != "function") return null;
        var s = null,
            r = "data-tt-policy-suffix";
        n.currentScript && n.currentScript.hasAttribute(r) && (s = n.currentScript.getAttribute(r));
        var i = "dompurify" + (s ? "#" + s : "");
        try {
            return t.createPolicy(i, {
                createHTML: function(a) {
                    return a
                },
                createScriptURL: function(a) {
                    return a
                }
            })
        } catch {
            return console.warn("TrustedTypes policy " + i + " could not be created."), null
        }
    };

function Op() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Fw(),
        t = function(m) {
            return Op(m)
        };
    if (t.version = "2.4.1", t.removed = [], !e || !e.document || e.document.nodeType !== 9) return t.isSupported = !1, t;
    var n = e.document,
        s = e.document,
        r = e.DocumentFragment,
        i = e.HTMLTemplateElement,
        o = e.Node,
        a = e.Element,
        c = e.NodeFilter,
        l = e.NamedNodeMap,
        u = l === void 0 ? e.NamedNodeMap || e.MozNamedAttrMap : l,
        p = e.HTMLFormElement,
        d = e.DOMParser,
        g = e.trustedTypes,
        v = a.prototype,
        w = Lr(v, "cloneNode"),
        y = Lr(v, "nextSibling"),
        x = Lr(v, "childNodes"),
        S = Lr(v, "parentNode");
    if (typeof i == "function") {
        var R = s.createElement("template");
        R.content && R.content.ownerDocument && (s = R.content.ownerDocument)
    }
    var E = Uw(g, n),
        V = E ? E.createHTML("") : "",
        re = s,
        le = re.implementation,
        F = re.createNodeIterator,
        q = re.createDocumentFragment,
        X = re.getElementsByTagName,
        we = n.importNode,
        B = {};
    try {
        B = Mn(s).documentMode ? s.documentMode : {}
    } catch {}
    var se = {};
    t.isSupported = typeof S == "function" && le && typeof le.createHTMLDocument < "u" && B !== 9;
    var Ie = Rw,
        Qe = Nw,
        te = Lw,
        Ae = Iw,
        pe = Pw,
        at = $w,
        Rn = zw,
        Rt = Dw,
        ve = null,
        As = ee({}, [].concat(It(bl), It(eo), It(to), It(no), It(_l))),
        je = null,
        gr = ee({}, [].concat(It(xl), It(so), It(kl), It(Ir))),
        me = Object.seal(Object.create(null, {
            tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1
            }
        })),
        Vt = null,
        ns = null,
        tn = !0,
        Nn = !0,
        ss = !1,
        f = !1,
        h = !1,
        k = !1,
        T = !1,
        A = !1,
        N = !1,
        z = !1,
        L = !0,
        D = !1,
        C = "user-content-",
        G = !0,
        U = !1,
        j = {},
        Q = null,
        ne = ee({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]),
        ye = null,
        de = ee({}, ["audio", "video", "img", "source", "image", "track"]),
        Oe = null,
        ct = ee({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
        Nt = "http://www.w3.org/1998/Math/MathML",
        Ln = "http://www.w3.org/2000/svg",
        nt = "http://www.w3.org/1999/xhtml",
        nn = nt,
        Ye = !1,
        lt = null,
        wr = ee({}, [Nt, Ln, nt], Ji),
        In, Fd = ["application/xhtml+xml", "text/html"],
        Ud = "text/html",
        Ve, rs = null,
        Bd = s.createElement("form"),
        Qa = function(m) {
            return m instanceof RegExp || m instanceof Function
        },
        Di = function(m) {
            rs && rs === m || ((!m || xn(m) !== "object") && (m = {}), m = Mn(m), In = Fd.indexOf(m.PARSER_MEDIA_TYPE) === -1 ? In = Ud : In = m.PARSER_MEDIA_TYPE, Ve = In === "application/xhtml+xml" ? Ji : qr, ve = "ALLOWED_TAGS" in m ? ee({}, m.ALLOWED_TAGS, Ve) : As, je = "ALLOWED_ATTR" in m ? ee({}, m.ALLOWED_ATTR, Ve) : gr, lt = "ALLOWED_NAMESPACES" in m ? ee({}, m.ALLOWED_NAMESPACES, Ji) : wr, Oe = "ADD_URI_SAFE_ATTR" in m ? ee(Mn(ct), m.ADD_URI_SAFE_ATTR, Ve) : ct, ye = "ADD_DATA_URI_TAGS" in m ? ee(Mn(de), m.ADD_DATA_URI_TAGS, Ve) : de, Q = "FORBID_CONTENTS" in m ? ee({}, m.FORBID_CONTENTS, Ve) : ne, Vt = "FORBID_TAGS" in m ? ee({}, m.FORBID_TAGS, Ve) : {}, ns = "FORBID_ATTR" in m ? ee({}, m.FORBID_ATTR, Ve) : {}, j = "USE_PROFILES" in m ? m.USE_PROFILES : !1, tn = m.ALLOW_ARIA_ATTR !== !1, Nn = m.ALLOW_DATA_ATTR !== !1, ss = m.ALLOW_UNKNOWN_PROTOCOLS || !1, f = m.SAFE_FOR_TEMPLATES || !1, h = m.WHOLE_DOCUMENT || !1, A = m.RETURN_DOM || !1, N = m.RETURN_DOM_FRAGMENT || !1, z = m.RETURN_TRUSTED_TYPE || !1, T = m.FORCE_BODY || !1, L = m.SANITIZE_DOM !== !1, D = m.SANITIZE_NAMED_PROPS || !1, G = m.KEEP_CONTENT !== !1, U = m.IN_PLACE || !1, Rt = m.ALLOWED_URI_REGEXP || Rt, nn = m.NAMESPACE || nt, m.CUSTOM_ELEMENT_HANDLING && Qa(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (me.tagNameCheck = m.CUSTOM_ELEMENT_HANDLING.tagNameCheck), m.CUSTOM_ELEMENT_HANDLING && Qa(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (me.attributeNameCheck = m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), m.CUSTOM_ELEMENT_HANDLING && typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (me.allowCustomizedBuiltInElements = m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), f && (Nn = !1), N && (A = !0), j && (ve = ee({}, It(_l)), je = [], j.html === !0 && (ee(ve, bl), ee(je, xl)), j.svg === !0 && (ee(ve, eo), ee(je, so), ee(je, Ir)), j.svgFilters === !0 && (ee(ve, to), ee(je, so), ee(je, Ir)), j.mathMl === !0 && (ee(ve, no), ee(je, kl), ee(je, Ir))), m.ADD_TAGS && (ve === As && (ve = Mn(ve)), ee(ve, m.ADD_TAGS, Ve)), m.ADD_ATTR && (je === gr && (je = Mn(je)), ee(je, m.ADD_ATTR, Ve)), m.ADD_URI_SAFE_ATTR && ee(Oe, m.ADD_URI_SAFE_ATTR, Ve), m.FORBID_CONTENTS && (Q === ne && (Q = Mn(Q)), ee(Q, m.FORBID_CONTENTS, Ve)), G && (ve["#text"] = !0), h && ee(ve, ["html", "head", "body"]), ve.table && (ee(ve, ["tbody"]), delete Vt.tbody), it && it(m), rs = m)
        },
        Ya = ee({}, ["mi", "mo", "mn", "ms", "mtext"]),
        Xa = ee({}, ["foreignobject", "desc", "title", "annotation-xml"]),
        jd = ee({}, ["title", "style", "font", "a", "script"]),
        vr = ee({}, eo);
    ee(vr, to), ee(vr, Cw);
    var $i = ee({}, no);
    ee($i, Ow);
    var qd = function(m) {
            var O = S(m);
            (!O || !O.tagName) && (O = {
                namespaceURI: nn,
                tagName: "template"
            });
            var M = qr(m.tagName),
                fe = qr(O.tagName);
            return lt[m.namespaceURI] ? m.namespaceURI === Ln ? O.namespaceURI === nt ? M === "svg" : O.namespaceURI === Nt ? M === "svg" && (fe === "annotation-xml" || Ya[fe]) : Boolean(vr[M]) : m.namespaceURI === Nt ? O.namespaceURI === nt ? M === "math" : O.namespaceURI === Ln ? M === "math" && Xa[fe] : Boolean($i[M]) : m.namespaceURI === nt ? O.namespaceURI === Ln && !Xa[fe] || O.namespaceURI === Nt && !Ya[fe] ? !1 : !$i[M] && (jd[M] || !vr[M]) : !!(In === "application/xhtml+xml" && lt[m.namespaceURI]) : !1
        },
        sn = function(m) {
            Rs(t.removed, {
                element: m
            });
            try {
                m.parentNode.removeChild(m)
            } catch {
                try {
                    m.outerHTML = V
                } catch {
                    m.remove()
                }
            }
        },
        zi = function(m, O) {
            try {
                Rs(t.removed, {
                    attribute: O.getAttributeNode(m),
                    from: O
                })
            } catch {
                Rs(t.removed, {
                    attribute: null,
                    from: O
                })
            }
            if (O.removeAttribute(m), m === "is" && !je[m])
                if (A || N) try {
                    sn(O)
                } catch {} else try {
                    O.setAttribute(m, "")
                } catch {}
        },
        Ja = function(m) {
            var O, M;
            if (T) m = "<remove></remove>" + m;
            else {
                var fe = Ew(m, /^[\r\n\t ]+/);
                M = fe && fe[0]
            }
            In === "application/xhtml+xml" && nn === nt && (m = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + m + "</body></html>");
            var ut = E ? E.createHTML(m) : m;
            if (nn === nt) try {
                O = new d().parseFromString(ut, In)
            } catch {}
            if (!O || !O.documentElement) {
                O = le.createDocument(nn, "template", null);
                try {
                    O.documentElement.innerHTML = Ye ? "" : ut
                } catch {}
            }
            var et = O.body || O.documentElement;
            return m && M && et.insertBefore(s.createTextNode(M), et.childNodes[0] || null), nn === nt ? X.call(O, h ? "html" : "body")[0] : h ? O.documentElement : et
        },
        Za = function(m) {
            return F.call(m.ownerDocument || m, m, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT, null, !1)
        },
        Hd = function(m) {
            return m instanceof p && (typeof m.nodeName != "string" || typeof m.textContent != "string" || typeof m.removeChild != "function" || !(m.attributes instanceof u) || typeof m.removeAttribute != "function" || typeof m.setAttribute != "function" || typeof m.namespaceURI != "string" || typeof m.insertBefore != "function" || typeof m.hasChildNodes != "function")
        },
        Ts = function(m) {
            return xn(o) === "object" ? m instanceof o : m && xn(m) === "object" && typeof m.nodeType == "number" && typeof m.nodeName == "string"
        },
        rn = function(m, O, M) {
            !se[m] || kw(se[m], function(fe) {
                fe.call(t, O, M, rs)
            })
        },
        ec = function(m) {
            var O;
            if (rn("beforeSanitizeElements", m, null), Hd(m) || st(/[\u0080-\uFFFF]/, m.nodeName)) return sn(m), !0;
            var M = Ve(m.nodeName);
            if (rn("uponSanitizeElement", m, {
                    tagName: M,
                    allowedTags: ve
                }), m.hasChildNodes() && !Ts(m.firstElementChild) && (!Ts(m.content) || !Ts(m.content.firstElementChild)) && st(/<[/\w]/g, m.innerHTML) && st(/<[/\w]/g, m.textContent) || M === "select" && st(/<template/i, m.innerHTML)) return sn(m), !0;
            if (!ve[M] || Vt[M]) {
                if (!Vt[M] && nc(M) && (me.tagNameCheck instanceof RegExp && st(me.tagNameCheck, M) || me.tagNameCheck instanceof Function && me.tagNameCheck(M))) return !1;
                if (G && !Q[M]) {
                    var fe = S(m) || m.parentNode,
                        ut = x(m) || m.childNodes;
                    if (ut && fe)
                        for (var et = ut.length, Xe = et - 1; Xe >= 0; --Xe) fe.insertBefore(w(ut[Xe], !0), y(m))
                }
                return sn(m), !0
            }
            return m instanceof a && !qd(m) || (M === "noscript" || M === "noembed") && st(/<\/no(script|embed)/i, m.innerHTML) ? (sn(m), !0) : (f && m.nodeType === 3 && (O = m.textContent, O = Lt(O, Ie, " "), O = Lt(O, Qe, " "), O = Lt(O, te, " "), m.textContent !== O && (Rs(t.removed, {
                element: m.cloneNode()
            }), m.textContent = O)), rn("afterSanitizeElements", m, null), !1)
        },
        tc = function(m, O, M) {
            if (L && (O === "id" || O === "name") && (M in s || M in Bd)) return !1;
            if (!(Nn && !ns[O] && st(Ae, O))) {
                if (!(tn && st(pe, O))) {
                    if (!je[O] || ns[O]) {
                        if (!(nc(m) && (me.tagNameCheck instanceof RegExp && st(me.tagNameCheck, m) || me.tagNameCheck instanceof Function && me.tagNameCheck(m)) && (me.attributeNameCheck instanceof RegExp && st(me.attributeNameCheck, O) || me.attributeNameCheck instanceof Function && me.attributeNameCheck(O)) || O === "is" && me.allowCustomizedBuiltInElements && (me.tagNameCheck instanceof RegExp && st(me.tagNameCheck, M) || me.tagNameCheck instanceof Function && me.tagNameCheck(M)))) return !1
                    } else if (!Oe[O]) {
                        if (!st(Rt, Lt(M, Rn, ""))) {
                            if (!((O === "src" || O === "xlink:href" || O === "href") && m !== "script" && Aw(M, "data:") === 0 && ye[m])) {
                                if (!(ss && !st(at, Lt(M, Rn, "")))) {
                                    if (M) return !1
                                }
                            }
                        }
                    }
                }
            }
            return !0
        },
        nc = function(m) {
            return m.indexOf("-") > 0
        },
        sc = function(m) {
            var O, M, fe, ut;
            rn("beforeSanitizeAttributes", m, null);
            var et = m.attributes;
            if (!!et) {
                var Xe = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: je
                };
                for (ut = et.length; ut--;) {
                    O = et[ut];
                    var yr = O,
                        Ge = yr.name,
                        Mi = yr.namespaceURI;
                    if (M = Ge === "value" ? O.value : Tw(O.value), fe = Ve(Ge), Xe.attrName = fe, Xe.attrValue = M, Xe.keepAttr = !0, Xe.forceKeepAttr = void 0, rn("uponSanitizeAttribute", m, Xe), M = Xe.attrValue, !Xe.forceKeepAttr && (zi(Ge, m), !!Xe.keepAttr)) {
                        if (st(/\/>/i, M)) {
                            zi(Ge, m);
                            continue
                        }
                        f && (M = Lt(M, Ie, " "), M = Lt(M, Qe, " "), M = Lt(M, te, " "));
                        var rc = Ve(m.nodeName);
                        if (!!tc(rc, fe, M)) {
                            if (D && (fe === "id" || fe === "name") && (zi(Ge, m), M = C + M), E && xn(g) === "object" && typeof g.getAttributeType == "function" && !Mi) switch (g.getAttributeType(rc, fe)) {
                                case "TrustedHTML":
                                    M = E.createHTML(M);
                                    break;
                                case "TrustedScriptURL":
                                    M = E.createScriptURL(M);
                                    break
                            }
                            try {
                                Mi ? m.setAttributeNS(Mi, Ge, M) : m.setAttribute(Ge, M), yl(t.removed)
                            } catch {}
                        }
                    }
                }
                rn("afterSanitizeAttributes", m, null)
            }
        },
        Vd = function K(m) {
            var O, M = Za(m);
            for (rn("beforeSanitizeShadowDOM", m, null); O = M.nextNode();) rn("uponSanitizeShadowNode", O, null), !ec(O) && (O.content instanceof r && K(O.content), sc(O));
            rn("afterSanitizeShadowDOM", m, null)
        };
    return t.sanitize = function(K) {
        var m = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            O, M, fe, ut, et;
        if (Ye = !K, Ye && (K = "<!-->"), typeof K != "string" && !Ts(K)) {
            if (typeof K.toString != "function") throw Zi("toString is not a function");
            if (K = K.toString(), typeof K != "string") throw Zi("dirty is not a string, aborting")
        }
        if (!t.isSupported) {
            if (xn(e.toStaticHTML) === "object" || typeof e.toStaticHTML == "function") {
                if (typeof K == "string") return e.toStaticHTML(K);
                if (Ts(K)) return e.toStaticHTML(K.outerHTML)
            }
            return K
        }
        if (k || Di(m), t.removed = [], typeof K == "string" && (U = !1), U) {
            if (K.nodeName) {
                var Xe = Ve(K.nodeName);
                if (!ve[Xe] || Vt[Xe]) throw Zi("root node is forbidden and cannot be sanitized in-place")
            }
        } else if (K instanceof o) O = Ja("<!---->"), M = O.ownerDocument.importNode(K, !0), M.nodeType === 1 && M.nodeName === "BODY" || M.nodeName === "HTML" ? O = M : O.appendChild(M);
        else {
            if (!A && !f && !h && K.indexOf("<") === -1) return E && z ? E.createHTML(K) : K;
            if (O = Ja(K), !O) return A ? null : z ? V : ""
        }
        O && T && sn(O.firstChild);
        for (var yr = Za(U ? K : O); fe = yr.nextNode();) fe.nodeType === 3 && fe === ut || ec(fe) || (fe.content instanceof r && Vd(fe.content), sc(fe), ut = fe);
        if (ut = null, U) return K;
        if (A) {
            if (N)
                for (et = q.call(O.ownerDocument); O.firstChild;) et.appendChild(O.firstChild);
            else et = O;
            return je.shadowroot && (et = we.call(n, et, !0)), et
        }
        var Ge = h ? O.outerHTML : O.innerHTML;
        return h && ve["!doctype"] && O.ownerDocument && O.ownerDocument.doctype && O.ownerDocument.doctype.name && st(Mw, O.ownerDocument.doctype.name) && (Ge = "<!DOCTYPE " + O.ownerDocument.doctype.name + `>
` + Ge), f && (Ge = Lt(Ge, Ie, " "), Ge = Lt(Ge, Qe, " "), Ge = Lt(Ge, te, " ")), E && z ? E.createHTML(Ge) : Ge
    }, t.setConfig = function(K) {
        Di(K), k = !0
    }, t.clearConfig = function() {
        rs = null, k = !1
    }, t.isValidAttribute = function(K, m, O) {
        rs || Di({});
        var M = Ve(K),
            fe = Ve(m);
        return tc(M, fe, O)
    }, t.addHook = function(K, m) {
        typeof m == "function" && (se[K] = se[K] || [], Rs(se[K], m))
    }, t.removeHook = function(K) {
        if (se[K]) return yl(se[K])
    }, t.removeHooks = function(K) {
        se[K] && (se[K] = [])
    }, t.removeAllHooks = function() {
        se = {}
    }, t
}
var Oa = Op();
const en = he({
        __name: "IconButton",
        props: {
            href: {}
        },
        setup(e) {
            return (t, n) => (P(), Te(ir(t.href ? "a" : "button"), {
                href: t.href,
                class: "wc-c-icon-button",
                type: "button"
            }, {
                default: Y(() => [_t(t.$slots, "default")]),
                _: 3
            }, 8, ["href"]))
        }
    }),
    ot = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [s, r] of t) n[s] = r;
        return n
    },
    Bw = {},
    jw = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    qw = I("title", null, "Send", -1),
    Hw = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M17.9294167,11 C17.5163365,10.7176237 16.9748736,10.3892493 16.2901689,10.0341046 C13.8948414,8.79168909 10.2051324,7.45262822 5.2515818,6.04069173 C6.18486895,7.90092189 6.75269946,9.54292329 6.93095345,11 L17.9294167,11 L17.9294167,11 Z M17.8258099,13 L6.89053829,13 C6.65768394,14.2843332 6.02443562,15.9005813 5.00159593,17.9598258 C10.0402829,16.5333518 13.7940038,15.1807133 16.2321933,13.9254606 C16.8875596,13.5880585 17.4146806,13.2741638 17.8258099,13 L17.8258099,13 Z M3.469944,6.96973481 C3.24085804,6.51312013 3.18886696,5.9852915 3.32432379,5.49135591 C3.62191307,4.40621359 4.7260194,3.77247809 5.79041446,4.07586742 C15.9301382,6.96604506 21,9.59569599 21,11.9648202 C21,14.3535962 15.8456811,17.0071932 5.53704335,19.9256114 C5.05617654,20.0617468 4.54276781,20.0097908 4.09753583,19.7799358 C3.11153419,19.2709038 2.71698422,18.0433591 3.21628579,17.0381391 C4.39921058,14.6566014 4.99067298,12.9654951 4.99067298,11.9648202 C4.99067298,10.6555104 4.48376332,8.99048189 3.469944,6.96973481 Z"
    }, null, -1),
    Vw = [qw, Hw];

function Gw(e, t) {
    return P(), H("svg", jw, Vw)
}
const Kw = ot(Bw, [
        ["render", Gw]
    ]),
    Ww = {},
    Qw = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    Yw = I("title", null, "Attachment", -1),
    Xw = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M9.707 16.607a1 1 0 0 1-1.414-1.415l8.485-8.485a1 1 0 1 0-1.414-1.414l-8.485 8.485a3 3 0 0 0 4.242 4.243l7.071-7.071a1 1 0 1 1 1.415 1.414l-7.071 7.071a5 5 0 1 1-7.072-7.071l8.486-8.485a3 3 0 0 1 4.242 4.242l-8.485 8.486Z"
    }, null, -1),
    Jw = [Yw, Xw];

function Zw(e, t) {
    return P(), H("svg", Qw, Jw)
}
const ev = ot(Ww, [
        ["render", Zw]
    ]),
    tv = ["src"],
    un = he({
        __name: "Icon",
        props: {
            src: {}
        },
        setup(e) {
            return (t, n) => t.src ? (P(), H("img", {
                key: 0,
                src: t.src
            }, null, 8, tv)) : _t(t.$slots, "default", {
                key: 1
            })
        }
    });

function Rp() {
    const e = ce([]);
    return {
        elementState: e,
        setElementStateOnEvent: n => {
            const s = n == null ? void 0 : n.type;
            !s || (s === "focus" && e.value.push("focus"), s === "focusout" && e.value.splice(e.value.indexOf("focus")))
        }
    }
}
const Np = He(We.INPUT, () => {
    const e = De({
        placeholder: "Type here"
    });

    function t(n) {
        e.placeholder = n.placeholder
    }
    return {
        inputConfig: e,
        setInputConfig: t
    }
}, {
    persist: {
        key: We.INPUT
    }
});

function Ra() {
    return {
        async: !1,
        breaks: !1,
        extensions: null,
        gfm: !0,
        hooks: null,
        pedantic: !1,
        renderer: null,
        silent: !1,
        tokenizer: null,
        walkTokens: null
    }
}
let es = Ra();

function Lp(e) {
    es = e
}
const Ip = /[&<>"']/,
    nv = new RegExp(Ip.source, "g"),
    Pp = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    sv = new RegExp(Pp.source, "g"),
    rv = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    },
    El = e => rv[e];

function wt(e, t) {
    if (t) {
        if (Ip.test(e)) return e.replace(nv, El)
    } else if (Pp.test(e)) return e.replace(sv, El);
    return e
}
const iv = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

function ov(e) {
    return e.replace(iv, (t, n) => (n = n.toLowerCase(), n === "colon" ? ":" : n.charAt(0) === "#" ? n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1)) : ""))
}
const av = /(^|[^\[])\^/g;

function ke(e, t) {
    let n = typeof e == "string" ? e : e.source;
    t = t || "";
    const s = {
        replace: (r, i) => {
            let o = typeof i == "string" ? i : i.source;
            return o = o.replace(av, "$1"), n = n.replace(r, o), s
        },
        getRegex: () => new RegExp(n, t)
    };
    return s
}

function Al(e) {
    try {
        e = encodeURI(e).replace(/%25/g, "%")
    } catch {
        return null
    }
    return e
}
const Us = {
    exec: () => null
};

function Tl(e, t) {
    const n = e.replace(/\|/g, (i, o, a) => {
            let c = !1,
                l = o;
            for (; --l >= 0 && a[l] === "\\";) c = !c;
            return c ? "|" : " |"
        }),
        s = n.split(/ \|/);
    let r = 0;
    if (s[0].trim() || s.shift(), s.length > 0 && !s[s.length - 1].trim() && s.pop(), t)
        if (s.length > t) s.splice(t);
        else
            for (; s.length < t;) s.push("");
    for (; r < s.length; r++) s[r] = s[r].trim().replace(/\\\|/g, "|");
    return s
}

function Pr(e, t, n) {
    const s = e.length;
    if (s === 0) return "";
    let r = 0;
    for (; r < s;) {
        const i = e.charAt(s - r - 1);
        if (i === t && !n) r++;
        else if (i !== t && n) r++;
        else break
    }
    return e.slice(0, s - r)
}

function cv(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let s = 0; s < e.length; s++)
        if (e[s] === "\\") s++;
        else if (e[s] === t[0]) n++;
    else if (e[s] === t[1] && (n--, n < 0)) return s;
    return -1
}

function Sl(e, t, n, s) {
    const r = t.href,
        i = t.title ? wt(t.title) : null,
        o = e[1].replace(/\\([\[\]])/g, "$1");
    if (e[0].charAt(0) !== "!") {
        s.state.inLink = !0;
        const a = {
            type: "link",
            raw: n,
            href: r,
            title: i,
            text: o,
            tokens: s.inlineTokens(o)
        };
        return s.state.inLink = !1, a
    }
    return {
        type: "image",
        raw: n,
        href: r,
        title: i,
        text: wt(o)
    }
}

function lv(e, t) {
    const n = e.match(/^(\s+)(?:```)/);
    if (n === null) return t;
    const s = n[1];
    return t.split(`
`).map(r => {
        const i = r.match(/^\s+/);
        if (i === null) return r;
        const [o] = i;
        return o.length >= s.length ? r.slice(s.length) : r
    }).join(`
`)
}
class ni {
    constructor(t) {
        be(this, "options");
        be(this, "rules");
        be(this, "lexer");
        this.options = t || es
    }
    space(t) {
        const n = this.rules.block.newline.exec(t);
        if (n && n[0].length > 0) return {
            type: "space",
            raw: n[0]
        }
    }
    code(t) {
        const n = this.rules.block.code.exec(t);
        if (n) {
            const s = n[0].replace(/^ {1,4}/gm, "");
            return {
                type: "code",
                raw: n[0],
                codeBlockStyle: "indented",
                text: this.options.pedantic ? s : Pr(s, `
`)
            }
        }
    }
    fences(t) {
        const n = this.rules.block.fences.exec(t);
        if (n) {
            const s = n[0],
                r = lv(s, n[3] || "");
            return {
                type: "code",
                raw: s,
                lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
                text: r
            }
        }
    }
    heading(t) {
        const n = this.rules.block.heading.exec(t);
        if (n) {
            let s = n[2].trim();
            if (/#$/.test(s)) {
                const r = Pr(s, "#");
                (this.options.pedantic || !r || / $/.test(r)) && (s = r.trim())
            }
            return {
                type: "heading",
                raw: n[0],
                depth: n[1].length,
                text: s,
                tokens: this.lexer.inline(s)
            }
        }
    }
    hr(t) {
        const n = this.rules.block.hr.exec(t);
        if (n) return {
            type: "hr",
            raw: n[0]
        }
    }
    blockquote(t) {
        const n = this.rules.block.blockquote.exec(t);
        if (n) {
            const s = Pr(n[0].replace(/^ *>[ \t]?/gm, ""), `
`),
                r = this.lexer.state.top;
            this.lexer.state.top = !0;
            const i = this.lexer.blockTokens(s);
            return this.lexer.state.top = r, {
                type: "blockquote",
                raw: n[0],
                tokens: i,
                text: s
            }
        }
    }
    list(t) {
        let n = this.rules.block.list.exec(t);
        if (n) {
            let s = n[1].trim();
            const r = s.length > 1,
                i = {
                    type: "list",
                    raw: "",
                    ordered: r,
                    start: r ? +s.slice(0, -1) : "",
                    loose: !1,
                    items: []
                };
            s = r ? `\\d{1,9}\\${s.slice(-1)}` : `\\${s}`, this.options.pedantic && (s = r ? s : "[*+-]");
            const o = new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);
            let a = "",
                c = "",
                l = !1;
            for (; t;) {
                let u = !1;
                if (!(n = o.exec(t)) || this.rules.block.hr.test(t)) break;
                a = n[0], t = t.substring(a.length);
                let p = n[2].split(`
`, 1)[0].replace(/^\t+/, x => " ".repeat(3 * x.length)),
                    d = t.split(`
`, 1)[0],
                    g = 0;
                this.options.pedantic ? (g = 2, c = p.trimStart()) : (g = n[2].search(/[^ ]/), g = g > 4 ? 1 : g, c = p.slice(g), g += n[1].length);
                let v = !1;
                if (!p && /^ *$/.test(d) && (a += d + `
`, t = t.substring(d.length + 1), u = !0), !u) {
                    const x = new RegExp(`^ {0,${Math.min(3,g-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
                        S = new RegExp(`^ {0,${Math.min(3,g-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                        R = new RegExp(`^ {0,${Math.min(3,g-1)}}(?:\`\`\`|~~~)`),
                        E = new RegExp(`^ {0,${Math.min(3,g-1)}}#`);
                    for (; t;) {
                        const V = t.split(`
`, 1)[0];
                        if (d = V, this.options.pedantic && (d = d.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), R.test(d) || E.test(d) || x.test(d) || S.test(t)) break;
                        if (d.search(/[^ ]/) >= g || !d.trim()) c += `
` + d.slice(g);
                        else {
                            if (v || p.search(/[^ ]/) >= 4 || R.test(p) || E.test(p) || S.test(p)) break;
                            c += `
` + d
                        }!v && !d.trim() && (v = !0), a += V + `
`, t = t.substring(V.length + 1), p = d.slice(g)
                    }
                }
                i.loose || (l ? i.loose = !0 : /\n *\n *$/.test(a) && (l = !0));
                let w = null,
                    y;
                this.options.gfm && (w = /^\[[ xX]\] /.exec(c), w && (y = w[0] !== "[ ] ", c = c.replace(/^\[[ xX]\] +/, ""))), i.items.push({
                    type: "list_item",
                    raw: a,
                    task: !!w,
                    checked: y,
                    loose: !1,
                    text: c,
                    tokens: []
                }), i.raw += a
            }
            i.items[i.items.length - 1].raw = a.trimEnd(), i.items[i.items.length - 1].text = c.trimEnd(), i.raw = i.raw.trimEnd();
            for (let u = 0; u < i.items.length; u++)
                if (this.lexer.state.top = !1, i.items[u].tokens = this.lexer.blockTokens(i.items[u].text, []), !i.loose) {
                    const p = i.items[u].tokens.filter(g => g.type === "space"),
                        d = p.length > 0 && p.some(g => /\n.*\n/.test(g.raw));
                    i.loose = d
                } if (i.loose)
                for (let u = 0; u < i.items.length; u++) i.items[u].loose = !0;
            return i
        }
    }
    html(t) {
        const n = this.rules.block.html.exec(t);
        if (n) return {
            type: "html",
            block: !0,
            raw: n[0],
            pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
            text: n[0]
        }
    }
    def(t) {
        const n = this.rules.block.def.exec(t);
        if (n) {
            const s = n[1].toLowerCase().replace(/\s+/g, " "),
                r = n[2] ? n[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                i = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
            return {
                type: "def",
                tag: s,
                raw: n[0],
                href: r,
                title: i
            }
        }
    }
    table(t) {
        const n = this.rules.block.table.exec(t);
        if (!n || !/[:|]/.test(n[2])) return;
        const s = Tl(n[1]),
            r = n[2].replace(/^\||\| *$/g, "").split("|"),
            i = n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split(`
`) : [],
            o = {
                type: "table",
                raw: n[0],
                header: [],
                align: [],
                rows: []
            };
        if (s.length === r.length) {
            for (const a of r) /^ *-+: *$/.test(a) ? o.align.push("right") : /^ *:-+: *$/.test(a) ? o.align.push("center") : /^ *:-+ *$/.test(a) ? o.align.push("left") : o.align.push(null);
            for (const a of s) o.header.push({
                text: a,
                tokens: this.lexer.inline(a)
            });
            for (const a of i) o.rows.push(Tl(a, o.header.length).map(c => ({
                text: c,
                tokens: this.lexer.inline(c)
            })));
            return o
        }
    }
    lheading(t) {
        const n = this.rules.block.lheading.exec(t);
        if (n) return {
            type: "heading",
            raw: n[0],
            depth: n[2].charAt(0) === "=" ? 1 : 2,
            text: n[1],
            tokens: this.lexer.inline(n[1])
        }
    }
    paragraph(t) {
        const n = this.rules.block.paragraph.exec(t);
        if (n) {
            const s = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
            return {
                type: "paragraph",
                raw: n[0],
                text: s,
                tokens: this.lexer.inline(s)
            }
        }
    }
    text(t) {
        const n = this.rules.block.text.exec(t);
        if (n) return {
            type: "text",
            raw: n[0],
            text: n[0],
            tokens: this.lexer.inline(n[0])
        }
    }
    escape(t) {
        const n = this.rules.inline.escape.exec(t);
        if (n) return {
            type: "escape",
            raw: n[0],
            text: wt(n[1])
        }
    }
    tag(t) {
        const n = this.rules.inline.tag.exec(t);
        if (n) return !this.lexer.state.inLink && /^<a /i.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
            type: "html",
            raw: n[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: n[0]
        }
    }
    link(t) {
        const n = this.rules.inline.link.exec(t);
        if (n) {
            const s = n[2].trim();
            if (!this.options.pedantic && /^</.test(s)) {
                if (!/>$/.test(s)) return;
                const o = Pr(s.slice(0, -1), "\\");
                if ((s.length - o.length) % 2 === 0) return
            } else {
                const o = cv(n[2], "()");
                if (o > -1) {
                    const c = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
                    n[2] = n[2].substring(0, o), n[0] = n[0].substring(0, c).trim(), n[3] = ""
                }
            }
            let r = n[2],
                i = "";
            if (this.options.pedantic) {
                const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);
                o && (r = o[1], i = o[3])
            } else i = n[3] ? n[3].slice(1, -1) : "";
            return r = r.trim(), /^</.test(r) && (this.options.pedantic && !/>$/.test(s) ? r = r.slice(1) : r = r.slice(1, -1)), Sl(n, {
                href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
                title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
            }, n[0], this.lexer)
        }
    }
    reflink(t, n) {
        let s;
        if ((s = this.rules.inline.reflink.exec(t)) || (s = this.rules.inline.nolink.exec(t))) {
            const r = (s[2] || s[1]).replace(/\s+/g, " "),
                i = n[r.toLowerCase()];
            if (!i) {
                const o = s[0].charAt(0);
                return {
                    type: "text",
                    raw: o,
                    text: o
                }
            }
            return Sl(s, i, s[0], this.lexer)
        }
    }
    emStrong(t, n, s = "") {
        let r = this.rules.inline.emStrongLDelim.exec(t);
        if (!r || r[3] && s.match(/[\p{L}\p{N}]/u)) return;
        if (!(r[1] || r[2] || "") || !s || this.rules.inline.punctuation.exec(s)) {
            const o = [...r[0]].length - 1;
            let a, c, l = o,
                u = 0;
            const p = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            for (p.lastIndex = 0, n = n.slice(-1 * t.length + o);
                (r = p.exec(n)) != null;) {
                if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
                if (c = [...a].length, r[3] || r[4]) {
                    l += c;
                    continue
                } else if ((r[5] || r[6]) && o % 3 && !((o + c) % 3)) {
                    u += c;
                    continue
                }
                if (l -= c, l > 0) continue;
                c = Math.min(c, c + l + u);
                const d = [...r[0]][0].length,
                    g = t.slice(0, o + r.index + d + c);
                if (Math.min(o, c) % 2) {
                    const w = g.slice(1, -1);
                    return {
                        type: "em",
                        raw: g,
                        text: w,
                        tokens: this.lexer.inlineTokens(w)
                    }
                }
                const v = g.slice(2, -2);
                return {
                    type: "strong",
                    raw: g,
                    text: v,
                    tokens: this.lexer.inlineTokens(v)
                }
            }
        }
    }
    codespan(t) {
        const n = this.rules.inline.code.exec(t);
        if (n) {
            let s = n[2].replace(/\n/g, " ");
            const r = /[^ ]/.test(s),
                i = /^ /.test(s) && / $/.test(s);
            return r && i && (s = s.substring(1, s.length - 1)), s = wt(s, !0), {
                type: "codespan",
                raw: n[0],
                text: s
            }
        }
    }
    br(t) {
        const n = this.rules.inline.br.exec(t);
        if (n) return {
            type: "br",
            raw: n[0]
        }
    }
    del(t) {
        const n = this.rules.inline.del.exec(t);
        if (n) return {
            type: "del",
            raw: n[0],
            text: n[2],
            tokens: this.lexer.inlineTokens(n[2])
        }
    }
    autolink(t) {
        const n = this.rules.inline.autolink.exec(t);
        if (n) {
            let s, r;
            return n[2] === "@" ? (s = wt(n[1]), r = "mailto:" + s) : (s = wt(n[1]), r = s), {
                type: "link",
                raw: n[0],
                text: s,
                href: r,
                tokens: [{
                    type: "text",
                    raw: s,
                    text: s
                }]
            }
        }
    }
    url(t) {
        var s, r;
        let n;
        if (n = this.rules.inline.url.exec(t)) {
            let i, o;
            if (n[2] === "@") i = wt(n[0]), o = "mailto:" + i;
            else {
                let a;
                do a = n[0], n[0] = (r = (s = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : s[0]) != null ? r : ""; while (a !== n[0]);
                i = wt(n[0]), n[1] === "www." ? o = "http://" + n[0] : o = n[0]
            }
            return {
                type: "link",
                raw: n[0],
                text: i,
                href: o,
                tokens: [{
                    type: "text",
                    raw: i,
                    text: i
                }]
            }
        }
    }
    inlineText(t) {
        const n = this.rules.inline.text.exec(t);
        if (n) {
            let s;
            return this.lexer.state.inRawBlock ? s = n[0] : s = wt(n[0]), {
                type: "text",
                raw: n[0],
                text: s
            }
        }
    }
}
const uv = /^(?: *(?:\n|$))+/,
    pv = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    dv = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    pr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    fv = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    Dp = /(?:[*+-]|\d{1,9}[.)])/,
    $p = ke(/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Dp).getRegex(),
    Na = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    hv = /^[^\n]+/,
    La = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
    mv = ke(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", La).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
    gv = ke(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Dp).getRegex(),
    Ei = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
    Ia = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
    wv = ke("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", Ia).replace("tag", Ei).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
    zp = ke(Na).replace("hr", pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ei).getRegex(),
    vv = ke(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", zp).getRegex(),
    Pa = {
        blockquote: vv,
        code: pv,
        def: mv,
        fences: dv,
        heading: fv,
        hr: pr,
        html: wv,
        lheading: $p,
        list: gv,
        newline: uv,
        paragraph: zp,
        table: Us,
        text: hv
    },
    Cl = ke("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ei).getRegex(),
    yv = {
        ...Pa,
        table: Cl,
        paragraph: ke(Na).replace("hr", pr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Cl).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ei).getRegex()
    },
    bv = {
        ...Pa,
        html: ke(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ia).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: Us,
        lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        paragraph: ke(Na).replace("hr", pr).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", $p).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
    },
    Mp = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    _v = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    Fp = /^( {2,}|\\)\n(?!\s*$)/,
    xv = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    dr = "\\p{P}\\p{S}",
    kv = ke(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, dr).getRegex(),
    Ev = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
    Av = ke(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, dr).getRegex(),
    Tv = ke("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, dr).getRegex(),
    Sv = ke("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, dr).getRegex(),
    Cv = ke(/\\([punct])/, "gu").replace(/punct/g, dr).getRegex(),
    Ov = ke(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
    Rv = ke(Ia).replace("(?:-->|$)", "-->").getRegex(),
    Nv = ke("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Rv).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
    si = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
    Lv = ke(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", si).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
    Up = ke(/^!?\[(label)\]\[(ref)\]/).replace("label", si).replace("ref", La).getRegex(),
    Bp = ke(/^!?\[(ref)\](?:\[\])?/).replace("ref", La).getRegex(),
    Iv = ke("reflink|nolink(?!\\()", "g").replace("reflink", Up).replace("nolink", Bp).getRegex(),
    Da = {
        _backpedal: Us,
        anyPunctuation: Cv,
        autolink: Ov,
        blockSkip: Ev,
        br: Fp,
        code: _v,
        del: Us,
        emStrongLDelim: Av,
        emStrongRDelimAst: Tv,
        emStrongRDelimUnd: Sv,
        escape: Mp,
        link: Lv,
        nolink: Bp,
        punctuation: kv,
        reflink: Up,
        reflinkSearch: Iv,
        tag: Nv,
        text: xv,
        url: Us
    },
    Pv = {
        ...Da,
        link: ke(/^!?\[(label)\]\((.*?)\)/).replace("label", si).getRegex(),
        reflink: ke(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", si).getRegex()
    },
    Do = {
        ...Da,
        escape: ke(Mp).replace("])", "~|])").getRegex(),
        url: ke(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
        _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    },
    Dv = {
        ...Do,
        br: ke(Fp).replace("{2,}", "*").getRegex(),
        text: ke(Do.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
    },
    Dr = {
        normal: Pa,
        gfm: yv,
        pedantic: bv
    },
    Ns = {
        normal: Da,
        gfm: Do,
        breaks: Dv,
        pedantic: Pv
    };
class Qt {
    constructor(t) {
        be(this, "tokens");
        be(this, "options");
        be(this, "state");
        be(this, "tokenizer");
        be(this, "inlineQueue");
        this.tokens = [], this.tokens.links = Object.create(null), this.options = t || es, this.options.tokenizer = this.options.tokenizer || new ni, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
            inLink: !1,
            inRawBlock: !1,
            top: !0
        };
        const n = {
            block: Dr.normal,
            inline: Ns.normal
        };
        this.options.pedantic ? (n.block = Dr.pedantic, n.inline = Ns.pedantic) : this.options.gfm && (n.block = Dr.gfm, this.options.breaks ? n.inline = Ns.breaks : n.inline = Ns.gfm), this.tokenizer.rules = n
    }
    static get rules() {
        return {
            block: Dr,
            inline: Ns
        }
    }
    static lex(t, n) {
        return new Qt(n).lex(t)
    }
    static lexInline(t, n) {
        return new Qt(n).inlineTokens(t)
    }
    lex(t) {
        t = t.replace(/\r\n|\r/g, `
`), this.blockTokens(t, this.tokens);
        for (let n = 0; n < this.inlineQueue.length; n++) {
            const s = this.inlineQueue[n];
            this.inlineTokens(s.src, s.tokens)
        }
        return this.inlineQueue = [], this.tokens
    }
    blockTokens(t, n = []) {
        this.options.pedantic ? t = t.replace(/\t/g, "    ").replace(/^ +$/gm, "") : t = t.replace(/^( *)(\t+)/gm, (a, c, l) => c + "    ".repeat(l.length));
        let s, r, i, o;
        for (; t;)
            if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(a => (s = a.call({
                    lexer: this
                }, t, n)) ? (t = t.substring(s.raw.length), n.push(s), !0) : !1))) {
                if (s = this.tokenizer.space(t)) {
                    t = t.substring(s.raw.length), s.raw.length === 1 && n.length > 0 ? n[n.length - 1].raw += `
` : n.push(s);
                    continue
                }
                if (s = this.tokenizer.code(t)) {
                    t = t.substring(s.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s);
                    continue
                }
                if (s = this.tokenizer.fences(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.heading(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.hr(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.blockquote(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.list(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.html(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.def(t)) {
                    t = t.substring(s.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + s.raw, r.text += `
` + s.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = {
                        href: s.href,
                        title: s.title
                    });
                    continue
                }
                if (s = this.tokenizer.table(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.lheading(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (i = t, this.options.extensions && this.options.extensions.startBlock) {
                    let a = 1 / 0;
                    const c = t.slice(1);
                    let l;
                    this.options.extensions.startBlock.forEach(u => {
                        l = u.call({
                            lexer: this
                        }, c), typeof l == "number" && l >= 0 && (a = Math.min(a, l))
                    }), a < 1 / 0 && a >= 0 && (i = t.substring(0, a + 1))
                }
                if (this.state.top && (s = this.tokenizer.paragraph(i))) {
                    r = n[n.length - 1], o && r.type === "paragraph" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s), o = i.length !== t.length, t = t.substring(s.raw.length);
                    continue
                }
                if (s = this.tokenizer.text(t)) {
                    t = t.substring(s.raw.length), r = n[n.length - 1], r && r.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s);
                    continue
                }
                if (t) {
                    const a = "Infinite loop on byte: " + t.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(a);
                        break
                    } else throw new Error(a)
                }
            } return this.state.top = !0, n
    }
    inline(t, n = []) {
        return this.inlineQueue.push({
            src: t,
            tokens: n
        }), n
    }
    inlineTokens(t, n = []) {
        let s, r, i, o = t,
            a, c, l;
        if (this.tokens.links) {
            const u = Object.keys(this.tokens.links);
            if (u.length > 0)
                for (;
                    (a = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null;) u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
        }
        for (;
            (a = this.tokenizer.rules.inline.blockSkip.exec(o)) != null;) o = o.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (;
            (a = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null;) o = o.slice(0, a.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        for (; t;)
            if (c || (l = ""), c = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(u => (s = u.call({
                    lexer: this
                }, t, n)) ? (t = t.substring(s.raw.length), n.push(s), !0) : !1))) {
                if (s = this.tokenizer.escape(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.tag(t)) {
                    t = t.substring(s.raw.length), r = n[n.length - 1], r && s.type === "text" && r.type === "text" ? (r.raw += s.raw, r.text += s.text) : n.push(s);
                    continue
                }
                if (s = this.tokenizer.link(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.reflink(t, this.tokens.links)) {
                    t = t.substring(s.raw.length), r = n[n.length - 1], r && s.type === "text" && r.type === "text" ? (r.raw += s.raw, r.text += s.text) : n.push(s);
                    continue
                }
                if (s = this.tokenizer.emStrong(t, o, l)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.codespan(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.br(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.del(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (s = this.tokenizer.autolink(t)) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (!this.state.inLink && (s = this.tokenizer.url(t))) {
                    t = t.substring(s.raw.length), n.push(s);
                    continue
                }
                if (i = t, this.options.extensions && this.options.extensions.startInline) {
                    let u = 1 / 0;
                    const p = t.slice(1);
                    let d;
                    this.options.extensions.startInline.forEach(g => {
                        d = g.call({
                            lexer: this
                        }, p), typeof d == "number" && d >= 0 && (u = Math.min(u, d))
                    }), u < 1 / 0 && u >= 0 && (i = t.substring(0, u + 1))
                }
                if (s = this.tokenizer.inlineText(i)) {
                    t = t.substring(s.raw.length), s.raw.slice(-1) !== "_" && (l = s.raw.slice(-1)), c = !0, r = n[n.length - 1], r && r.type === "text" ? (r.raw += s.raw, r.text += s.text) : n.push(s);
                    continue
                }
                if (t) {
                    const u = "Infinite loop on byte: " + t.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(u);
                        break
                    } else throw new Error(u)
                }
            } return n
    }
}
class ri {
    constructor(t) {
        be(this, "options");
        this.options = t || es
    }
    code(t, n, s) {
        var i;
        const r = (i = (n || "").match(/^\S*/)) == null ? void 0 : i[0];
        return t = t.replace(/\n$/, "") + `
`, r ? '<pre><code class="language-' + wt(r) + '">' + (s ? t : wt(t, !0)) + `</code></pre>
` : "<pre><code>" + (s ? t : wt(t, !0)) + `</code></pre>
`
    }
    blockquote(t) {
        return `<blockquote>
${t}</blockquote>
`
    }
    html(t, n) {
        return t
    }
    heading(t, n, s) {
        return `<h${n}>${t}</h${n}>
`
    }
    hr() {
        return `<hr>
`
    }
    list(t, n, s) {
        const r = n ? "ol" : "ul",
            i = n && s !== 1 ? ' start="' + s + '"' : "";
        return "<" + r + i + `>
` + t + "</" + r + `>
`
    }
    listitem(t, n, s) {
        return `<li>${t}</li>
`
    }
    checkbox(t) {
        return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
    }
    paragraph(t) {
        return `<p>${t}</p>
`
    }
    table(t, n) {
        return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + n + `</table>
`
    }
    tablerow(t) {
        return `<tr>
${t}</tr>
`
    }
    tablecell(t, n) {
        const s = n.header ? "th" : "td";
        return (n.align ? `<${s} align="${n.align}">` : `<${s}>`) + t + `</${s}>
`
    }
    strong(t) {
        return `<strong>${t}</strong>`
    }
    em(t) {
        return `<em>${t}</em>`
    }
    codespan(t) {
        return `<code>${t}</code>`
    }
    br() {
        return "<br>"
    }
    del(t) {
        return `<del>${t}</del>`
    }
    link(t, n, s) {
        const r = Al(t);
        if (r === null) return s;
        t = r;
        let i = '<a href="' + t + '"';
        return n && (i += ' title="' + n + '"'), i += ">" + s + "</a>", i
    }
    image(t, n, s) {
        const r = Al(t);
        if (r === null) return s;
        t = r;
        let i = `<img src="${t}" alt="${s}"`;
        return n && (i += ` title="${n}"`), i += ">", i
    }
    text(t) {
        return t
    }
}
class $a {
    strong(t) {
        return t
    }
    em(t) {
        return t
    }
    codespan(t) {
        return t
    }
    del(t) {
        return t
    }
    html(t) {
        return t
    }
    text(t) {
        return t
    }
    link(t, n, s) {
        return "" + s
    }
    image(t, n, s) {
        return "" + s
    }
    br() {
        return ""
    }
}
class Yt {
    constructor(t) {
        be(this, "options");
        be(this, "renderer");
        be(this, "textRenderer");
        this.options = t || es, this.options.renderer = this.options.renderer || new ri, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new $a
    }
    static parse(t, n) {
        return new Yt(n).parse(t)
    }
    static parseInline(t, n) {
        return new Yt(n).parseInline(t)
    }
    parse(t, n = !0) {
        let s = "";
        for (let r = 0; r < t.length; r++) {
            const i = t[r];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                const o = i,
                    a = this.options.extensions.renderers[o.type].call({
                        parser: this
                    }, o);
                if (a !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
                    s += a || "";
                    continue
                }
            }
            switch (i.type) {
                case "space":
                    continue;
                case "hr": {
                    s += this.renderer.hr();
                    continue
                }
                case "heading": {
                    const o = i;
                    s += this.renderer.heading(this.parseInline(o.tokens), o.depth, ov(this.parseInline(o.tokens, this.textRenderer)));
                    continue
                }
                case "code": {
                    const o = i;
                    s += this.renderer.code(o.text, o.lang, !!o.escaped);
                    continue
                }
                case "table": {
                    const o = i;
                    let a = "",
                        c = "";
                    for (let u = 0; u < o.header.length; u++) c += this.renderer.tablecell(this.parseInline(o.header[u].tokens), {
                        header: !0,
                        align: o.align[u]
                    });
                    a += this.renderer.tablerow(c);
                    let l = "";
                    for (let u = 0; u < o.rows.length; u++) {
                        const p = o.rows[u];
                        c = "";
                        for (let d = 0; d < p.length; d++) c += this.renderer.tablecell(this.parseInline(p[d].tokens), {
                            header: !1,
                            align: o.align[d]
                        });
                        l += this.renderer.tablerow(c)
                    }
                    s += this.renderer.table(a, l);
                    continue
                }
                case "blockquote": {
                    const o = i,
                        a = this.parse(o.tokens);
                    s += this.renderer.blockquote(a);
                    continue
                }
                case "list": {
                    const o = i,
                        a = o.ordered,
                        c = o.start,
                        l = o.loose;
                    let u = "";
                    for (let p = 0; p < o.items.length; p++) {
                        const d = o.items[p],
                            g = d.checked,
                            v = d.task;
                        let w = "";
                        if (d.task) {
                            const y = this.renderer.checkbox(!!g);
                            l ? d.tokens.length > 0 && d.tokens[0].type === "paragraph" ? (d.tokens[0].text = y + " " + d.tokens[0].text, d.tokens[0].tokens && d.tokens[0].tokens.length > 0 && d.tokens[0].tokens[0].type === "text" && (d.tokens[0].tokens[0].text = y + " " + d.tokens[0].tokens[0].text)) : d.tokens.unshift({
                                type: "text",
                                text: y + " "
                            }) : w += y + " "
                        }
                        w += this.parse(d.tokens, l), u += this.renderer.listitem(w, v, !!g)
                    }
                    s += this.renderer.list(u, a, c);
                    continue
                }
                case "html": {
                    const o = i;
                    s += this.renderer.html(o.text, o.block);
                    continue
                }
                case "paragraph": {
                    const o = i;
                    s += this.renderer.paragraph(this.parseInline(o.tokens));
                    continue
                }
                case "text": {
                    let o = i,
                        a = o.tokens ? this.parseInline(o.tokens) : o.text;
                    for (; r + 1 < t.length && t[r + 1].type === "text";) o = t[++r], a += `
` + (o.tokens ? this.parseInline(o.tokens) : o.text);
                    s += n ? this.renderer.paragraph(a) : a;
                    continue
                }
                default: {
                    const o = 'Token with "' + i.type + '" type was not found.';
                    if (this.options.silent) return console.error(o), "";
                    throw new Error(o)
                }
            }
        }
        return s
    }
    parseInline(t, n) {
        n = n || this.renderer;
        let s = "";
        for (let r = 0; r < t.length; r++) {
            const i = t[r];
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                const o = this.options.extensions.renderers[i.type].call({
                    parser: this
                }, i);
                if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
                    s += o || "";
                    continue
                }
            }
            switch (i.type) {
                case "escape": {
                    const o = i;
                    s += n.text(o.text);
                    break
                }
                case "html": {
                    const o = i;
                    s += n.html(o.text);
                    break
                }
                case "link": {
                    const o = i;
                    s += n.link(o.href, o.title, this.parseInline(o.tokens, n));
                    break
                }
                case "image": {
                    const o = i;
                    s += n.image(o.href, o.title, o.text);
                    break
                }
                case "strong": {
                    const o = i;
                    s += n.strong(this.parseInline(o.tokens, n));
                    break
                }
                case "em": {
                    const o = i;
                    s += n.em(this.parseInline(o.tokens, n));
                    break
                }
                case "codespan": {
                    const o = i;
                    s += n.codespan(o.text);
                    break
                }
                case "br": {
                    s += n.br();
                    break
                }
                case "del": {
                    const o = i;
                    s += n.del(this.parseInline(o.tokens, n));
                    break
                }
                case "text": {
                    const o = i;
                    s += n.text(o.text);
                    break
                }
                default: {
                    const o = 'Token with "' + i.type + '" type was not found.';
                    if (this.options.silent) return console.error(o), "";
                    throw new Error(o)
                }
            }
        }
        return s
    }
}
class Bs {
    constructor(t) {
        be(this, "options");
        this.options = t || es
    }
    preprocess(t) {
        return t
    }
    postprocess(t) {
        return t
    }
    processAllTokens(t) {
        return t
    }
}
be(Bs, "passThroughHooks", new Set(["preprocess", "postprocess", "processAllTokens"]));
var tr, $o, li, jp;
class $v {
    constructor(...t) {
        Fi(this, tr);
        Fi(this, li);
        be(this, "defaults", Ra());
        be(this, "options", this.setOptions);
        be(this, "parse", br(this, tr, $o).call(this, Qt.lex, Yt.parse));
        be(this, "parseInline", br(this, tr, $o).call(this, Qt.lexInline, Yt.parseInline));
        be(this, "Parser", Yt);
        be(this, "Renderer", ri);
        be(this, "TextRenderer", $a);
        be(this, "Lexer", Qt);
        be(this, "Tokenizer", ni);
        be(this, "Hooks", Bs);
        this.use(...t)
    }
    walkTokens(t, n) {
        var r, i;
        let s = [];
        for (const o of t) switch (s = s.concat(n.call(this, o)), o.type) {
            case "table": {
                const a = o;
                for (const c of a.header) s = s.concat(this.walkTokens(c.tokens, n));
                for (const c of a.rows)
                    for (const l of c) s = s.concat(this.walkTokens(l.tokens, n));
                break
            }
            case "list": {
                const a = o;
                s = s.concat(this.walkTokens(a.items, n));
                break
            }
            default: {
                const a = o;
                (i = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && i[a.type] ? this.defaults.extensions.childTokens[a.type].forEach(c => {
                    const l = a[c].flat(1 / 0);
                    s = s.concat(this.walkTokens(l, n))
                }) : a.tokens && (s = s.concat(this.walkTokens(a.tokens, n)))
            }
        }
        return s
    }
    use(...t) {
        const n = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        return t.forEach(s => {
            const r = {
                ...s
            };
            if (r.async = this.defaults.async || r.async || !1, s.extensions && (s.extensions.forEach(i => {
                    if (!i.name) throw new Error("extension name required");
                    if ("renderer" in i) {
                        const o = n.renderers[i.name];
                        o ? n.renderers[i.name] = function(...a) {
                            let c = i.renderer.apply(this, a);
                            return c === !1 && (c = o.apply(this, a)), c
                        } : n.renderers[i.name] = i.renderer
                    }
                    if ("tokenizer" in i) {
                        if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
                        const o = n[i.level];
                        o ? o.unshift(i.tokenizer) : n[i.level] = [i.tokenizer], i.start && (i.level === "block" ? n.startBlock ? n.startBlock.push(i.start) : n.startBlock = [i.start] : i.level === "inline" && (n.startInline ? n.startInline.push(i.start) : n.startInline = [i.start]))
                    }
                    "childTokens" in i && i.childTokens && (n.childTokens[i.name] = i.childTokens)
                }), r.extensions = n), s.renderer) {
                const i = this.defaults.renderer || new ri(this.defaults);
                for (const o in s.renderer) {
                    if (!(o in i)) throw new Error(`renderer '${o}' does not exist`);
                    if (o === "options") continue;
                    const a = o,
                        c = s.renderer[a],
                        l = i[a];
                    i[a] = (...u) => {
                        let p = c.apply(i, u);
                        return p === !1 && (p = l.apply(i, u)), p || ""
                    }
                }
                r.renderer = i
            }
            if (s.tokenizer) {
                const i = this.defaults.tokenizer || new ni(this.defaults);
                for (const o in s.tokenizer) {
                    if (!(o in i)) throw new Error(`tokenizer '${o}' does not exist`);
                    if (["options", "rules", "lexer"].includes(o)) continue;
                    const a = o,
                        c = s.tokenizer[a],
                        l = i[a];
                    i[a] = (...u) => {
                        let p = c.apply(i, u);
                        return p === !1 && (p = l.apply(i, u)), p
                    }
                }
                r.tokenizer = i
            }
            if (s.hooks) {
                const i = this.defaults.hooks || new Bs;
                for (const o in s.hooks) {
                    if (!(o in i)) throw new Error(`hook '${o}' does not exist`);
                    if (o === "options") continue;
                    const a = o,
                        c = s.hooks[a],
                        l = i[a];
                    Bs.passThroughHooks.has(o) ? i[a] = u => {
                        if (this.defaults.async) return Promise.resolve(c.call(i, u)).then(d => l.call(i, d));
                        const p = c.call(i, u);
                        return l.call(i, p)
                    } : i[a] = (...u) => {
                        let p = c.apply(i, u);
                        return p === !1 && (p = l.apply(i, u)), p
                    }
                }
                r.hooks = i
            }
            if (s.walkTokens) {
                const i = this.defaults.walkTokens,
                    o = s.walkTokens;
                r.walkTokens = function(a) {
                    let c = [];
                    return c.push(o.call(this, a)), i && (c = c.concat(i.call(this, a))), c
                }
            }
            this.defaults = {
                ...this.defaults,
                ...r
            }
        }), this
    }
    setOptions(t) {
        return this.defaults = {
            ...this.defaults,
            ...t
        }, this
    }
    lexer(t, n) {
        return Qt.lex(t, n != null ? n : this.defaults)
    }
    parser(t, n) {
        return Yt.parse(t, n != null ? n : this.defaults)
    }
}
tr = new WeakSet, $o = function(t, n) {
    return (s, r) => {
        const i = {
                ...r
            },
            o = {
                ...this.defaults,
                ...i
            };
        this.defaults.async === !0 && i.async === !1 && (o.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), o.async = !0);
        const a = br(this, li, jp).call(this, !!o.silent, !!o.async);
        if (typeof s > "u" || s === null) return a(new Error("marked(): input parameter is undefined or null"));
        if (typeof s != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(s) + ", string expected"));
        if (o.hooks && (o.hooks.options = o), o.async) return Promise.resolve(o.hooks ? o.hooks.preprocess(s) : s).then(c => t(c, o)).then(c => o.hooks ? o.hooks.processAllTokens(c) : c).then(c => o.walkTokens ? Promise.all(this.walkTokens(c, o.walkTokens)).then(() => c) : c).then(c => n(c, o)).then(c => o.hooks ? o.hooks.postprocess(c) : c).catch(a);
        try {
            o.hooks && (s = o.hooks.preprocess(s));
            let c = t(s, o);
            o.hooks && (c = o.hooks.processAllTokens(c)), o.walkTokens && this.walkTokens(c, o.walkTokens);
            let l = n(c, o);
            return o.hooks && (l = o.hooks.postprocess(l)), l
        } catch (c) {
            return a(c)
        }
    }
}, li = new WeakSet, jp = function(t, n) {
    return s => {
        if (s.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
            const r = "<p>An error occurred:</p><pre>" + wt(s.message + "", !0) + "</pre>";
            return n ? Promise.resolve(r) : r
        }
        if (n) return Promise.reject(s);
        throw s
    }
};
const Jn = new $v;

function ge(e, t) {
    return Jn.parse(e, t)
}
ge.options = ge.setOptions = function(e) {
    return Jn.setOptions(e), ge.defaults = Jn.defaults, Lp(ge.defaults), ge
};
ge.getDefaults = Ra;
ge.defaults = es;
ge.use = function(...e) {
    return Jn.use(...e), ge.defaults = Jn.defaults, Lp(ge.defaults), ge
};
ge.walkTokens = function(e, t) {
    return Jn.walkTokens(e, t)
};
ge.parseInline = Jn.parseInline;
ge.Parser = Yt;
ge.parser = Yt.parse;
ge.Renderer = ri;
ge.TextRenderer = $a;
ge.Lexer = Qt;
ge.lexer = Qt.lex;
ge.Tokenizer = ni;
ge.Hooks = Bs;
ge.parse = ge;
ge.options;
ge.setOptions;
ge.use;
ge.walkTokens;
ge.parseInline;
Yt.parse;
Qt.lex;
const za = e => {
        !e || (e.scrollTop = e.scrollHeight)
    },
    Ol = (e, {
        top: t = 0,
        left: n = 0,
        behavior: s = "smooth"
    }) => {
        e.scrollBy({
            top: t,
            left: n,
            behavior: s
        })
    };
var ii = (e => (e.NEXT_BUTTON_PATH = "M9 18a.999.999 0 0 1-.707-1.707L12.586 12 8.293 7.707a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 9 18", e.PREVIOUS_BUTTON_PATH = "M14 18a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L10.414 12l4.293 4.293A.999.999 0 0 1 14 18", e[e.CARD_MIN_WIDTH = 250] = "CARD_MIN_WIDTH", e))(ii || {}),
    ft = (e => (e.NAVIGATION_BUTTON_CONTAINTER = "wc-c-carousel__navigation", e.NAVIGATION_BUTTON = "wc-c-carousel__navigation-button", e.NAVIGATION_BUTTON_NEXT = "wc-c-navigation-button--next", e.NAVIGATION_BUTTON_PREVIOUS = "wc-c-navigation-button--previous", e.CAROUSEL_WRAPPER = "wc-c-carousel-wrapper", e.CAROUSEL = "wc-c-carousel", e.QUICK_REPLY = "wc-c-option", e))(ft || {});
const qp = He($e.CAROUSEL, () => {
        const e = De({});

        function t(n, s) {
            e[n] = s
        }
        return {
            carousels: e,
            clickQuickReply: t
        }
    }, {
        persist: {
            key: $e.CAROUSEL
        }
    }),
    Hp = (e, t) => {
        var n;
        if (t) {
            e.disabled = !0;
            return
        }(n = e.parentElement) == null || n.remove()
    },
    zv = (e, t, n, s, r) => {
        qp(r.sessionPinia).clickQuickReply(e, t), r.caic.askHidden(s), n.forEach(o => {
            const a = o.getAttribute("data-id") || "";
            Hp(o, t === a)
        })
    },
    Mv = (e, t, n, s) => {
        const r = s.getAttribute("data-value") || "",
            i = s.getAttribute("data-id") || "",
            a = qp(n.sessionPinia).carousels[e];
        a && Hp(s, a === i), s.addEventListener("click", () => {
            zv(e, i, t, r, n)
        })
    },
    Fv = (e, t) => {
        const n = e.querySelectorAll(`.${ft.QUICK_REPLY}`),
            s = e.getAttribute("data-id") || "";
        n.forEach(r => {
            Mv(s, n, t, r)
        })
    },
    Rl = e => {
        const t = document.createElementNS("http://www.w3.org/2000/svg", "path");
        t.setAttributeNS(null, "d", e);
        const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return n.setAttributeNS(null, "viewBox", "0 0 24 24"), n.setAttributeNS(null, "height", "24"), n.setAttributeNS(null, "width", "24"), n.appendChild(t), n
    },
    Uv = e => {
        e.setAttribute("data-id", Xn());
        const t = document.createElement("div");
        t.classList.add(ft.NAVIGATION_BUTTON_CONTAINTER);
        const n = document.createElement("button"),
            s = Rl(ii.PREVIOUS_BUTTON_PATH);
        n.appendChild(s), n.type = "button", n.setAttribute("aria-label", "previous slide"), n.classList.add(ft.NAVIGATION_BUTTON, ft.NAVIGATION_BUTTON_PREVIOUS), n.setAttribute("data-state", "initial");
        const r = document.createElement("button");
        r.type = "button", r.setAttribute("aria-label", "next slide");
        const i = Rl(ii.NEXT_BUTTON_PATH);
        i.style.transform = "translateX(2px)", r.appendChild(i), r.classList.add(ft.NAVIGATION_BUTTON, ft.NAVIGATION_BUTTON_NEXT), r.disabled = !0;
        const o = document.createElement("div");
        o.classList.add(ft.CAROUSEL_WRAPPER), o.setAttribute("role", "group"), o.setAttribute("aria-roledescription", "carousel"), o.setAttribute("aria-label", "carousel");
        const a = e.parentNode;
        a && (a.insertBefore(o, e), t.appendChild(n), t.appendChild(r), o.appendChild(t), o.appendChild(e)), e.querySelectorAll(`.${ft.QUICK_REPLY}`).forEach(l => {
            const u = Xn();
            l.setAttribute("data-id", u)
        })
    },
    Bv = e => {
        const t = document.createElement("div");
        return t.innerHTML = e, t.querySelectorAll(`.${ft.CAROUSEL}`).forEach(Uv), t.innerHTML
    };

function Nl(e, t, n) {
    const s = Math.ceil(e.scrollLeft) + Math.ceil(e.getBoundingClientRect().width) >= e.scrollWidth,
        r = e.scrollLeft === 0;
    t.disabled = s, n.disabled = r
}
const Ll = (e, t, n = !1) => {
        const s = ii.CARD_MIN_WIDTH;
        e.querySelectorAll(`.${ft.CAROUSEL_WRAPPER}`).forEach(i => {
            const o = i.querySelector(`.${ft.CAROUSEL}`);
            if (!o) return;
            const a = i.querySelector(`.${ft.NAVIGATION_BUTTON_NEXT}`),
                c = i.querySelector(`.${ft.NAVIGATION_BUTTON_PREVIOUS}`);
            n && (a.addEventListener("click", () => {
                Ol(o, {
                    left: s
                })
            }), c.addEventListener("click", () => {
                Ol(o, {
                    left: -s
                })
            }), o.addEventListener("scroll", () => {
                c.removeAttribute("data-state"), Nl(o, a, c)
            }), Fv(o, t)), Nl(o, a, c)
        })
    },
    jv = {
        timeStyle: "short"
    };

function qv(e) {
    const s = new DOMParser().parseFromString(e, "text/html").querySelectorAll("a, img, iframe, video");
    return s.forEach(({
        outerHTML: r
    }, i) => {
        e = e.replace(r.toString(), `%{replaceTag${i}}`)
    }), e = Hv(e), s.forEach(({
        outerHTML: r
    }, i) => {
        e = e.replace(`%{replaceTag${i}}`, r)
    }), e
}

function Hv(e) {
    return e.replace(/_([a-zA-Z0-9]+)_/g, "<em>$1</em>")
}
const Vv = e => {
        ge.use({
            hooks: {
                postprocess: qv
            }
        }), e.text = Oa.sanitize(e.text, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["target"]
        }), e.text = ge.parse(e.text)
    },
    Ma = () => {
        const e = Date.now();
        return {
            type: vt.MESSAGEGROUP,
            direction: qe.CLIENT_ORIGINATED,
            id: Xn(),
            createdOn: new Date(e).toLocaleTimeString(window.navigator.language, jv),
            lastInteraction: e
        }
    },
    fr = e => ({
        ...Ma(),
        type: vt.DIVIDER,
        direction: qe.CLIENT_ORIGINATED,
        text: e
    }),
    Gv = (e, t) => e.map((n, s) => {
        const r = t[s];
        return n.$type === Tt.TEXT && r.$type === Tt.TEXT ? n.originalLanguageText = r.text : n.$type === Tt.LIST_PICKER && r.$type === Tt.LIST_PICKER && (n.originalLanguageButtons = r.buttons), n
    }),
    Il = (e, t) => ({
        ...Ma(),
        type: vt.MESSAGEGROUP,
        direction: qe.CLIENT_TERMINATED,
        agent: t == null ? void 0 : t.agent,
        dialogPath: t == null ? void 0 : t.dialogPath,
        messageItems: e,
        bubbleDelay: t == null ? void 0 : t.bubbleDelay
    }),
    Kv = (e, t) => ({
        ...Ma(),
        type: vt.MESSAGEGROUP,
        direction: qe.CLIENT_ORIGINATED,
        dialogPath: t,
        messageItems: e
    }),
    Wv = (e, t) => {
        try {
            const n = Bt(t);
            if (e.$type === Tt.LIST_PICKER && e.buttons) {
                const r = fn(t);
                return n.languages.disabledTranslation && e.originalLanguageButtons && (e.buttons = e.originalLanguageButtons), r.addOptions(e.buttons)
            }
            e.$type === Tt.TEXT && e.text && (e.direction === qe.CLIENT_ORIGINATED && (e.text = Oa.sanitize(e.text, {
                USE_PROFILES: {
                    html: !1,
                    svg: !1,
                    svgFilters: !1,
                    mathMl: !1
                }
            }).trim()), e.direction === qe.CLIENT_TERMINATED && (n.languages.disabledTranslation && e.originalLanguageText && (e.text = e.originalLanguageText), e.text = Bv(e.text), Vv(e), ur(t).addNotification(e)));
            const s = lr(t);
            s.conversation && s.addConversationItemMessage(e)
        } catch (n) {
            console.error(n)
        }
    },
    qt = He($e.QUEUE, () => {
        const e = ga(),
            t = Ze(e),
            n = lr(e),
            s = ce([]),
            r = ce([]),
            i = ce(),
            o = ce(),
            a = ce(!1),
            c = ce(!0);
        let l;
        const u = () => {
                if (o.value = s.value[0], !o.value) return;
                a.value = !0;
                const E = {
                    ...o.value,
                    messageItems: []
                };
                if (n.addConversationItem(E), E.direction === qe.CLIENT_TERMINATED && (t.state.isLoading = !1), E.type === vt.DIVIDER) {
                    a.value = !1, s.value.shift();
                    return
                }
                o.value.type === vt.MESSAGEGROUP && o.value.messageItems && o.value.messageItems.length > 0 && (c.value = !0, r.value = o.value.messageItems)
            },
            p = () => {
                r.value.length <= 0 && s.value.length > 0 && a.value && (a.value = !1, u())
            },
            d = dl(() => s.value.length, (E, V) => {
                if (E <= 0) {
                    o.value = void 0;
                    return
                }
                V > E && !a.value && u()
            }),
            g = () => {
                var E;
                i.value = r.value[0], i.value && (((E = o.value) == null ? void 0 : E.type) === vt.MESSAGEGROUP && Wv(i.value, e), r.value.shift())
            },
            v = E => !E || (E == null ? void 0 : E.type) !== vt.MESSAGEGROUP ? Js.BUBBLE : c.value ? 0 : E.bubbleDelay || Js.BUBBLE,
            w = dl(() => r.value.length, E => {
                var V;
                if (E >= 1) {
                    const re = v(o.value);
                    c.value = !1, l = Sa(() => {
                        g()
                    }, re)
                }
                E <= 0 && (a.value = !1, s.value.shift(), i.value = void 0, ((V = o.value) == null ? void 0 : V.direction) === qe.CLIENT_ORIGINATED && !t.state.livechat.active && (t.state.isLoading = !0))
            });
        return {
            conversationItemQueue: s,
            isDequeuing: a,
            messageItemQueue: r,
            currentConversationItem: o,
            currentMessageItem: i,
            enqueue: (E, V) => {
                V ? s.value.unshift(E) : s.value.push(E), s.value.length > 0 && !a.value && d.isActive.value && u()
            },
            dequeue: u,
            cancel: () => {
                l != null && l.isPending && l.stop(), s.value.length = 0, r.value.length = 0, o.value = void 0, i.value = void 0, a.value = !1
            },
            resume: () => {
                d.resume(), w.resume()
            },
            pause: () => {
                d.pause(), w.pause()
            },
            resumeStalledQueue: p,
            dequeueMessage: g,
            conversationItemQueueWatcher: d,
            messageItemQueueWatcher: w
        }
    }, {
        persist: {
            key: $e.QUEUE
        }
    }),
    Qv = 8 * 1048576,
    Yv = ["image/jpeg", "application/pdf", "image/png", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    Xv = [".jpg", ".jpeg", ".pdf", ".png", ".docx"];

function Ai() {
    this._types = Object.create(null), this._extensions = Object.create(null);
    for (let e = 0; e < arguments.length; e++) this.define(arguments[e]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this)
}
Ai.prototype.define = function(e, t) {
    for (let n in e) {
        let s = e[n].map(function(r) {
            return r.toLowerCase()
        });
        n = n.toLowerCase();
        for (let r = 0; r < s.length; r++) {
            const i = s[r];
            if (i[0] !== "*") {
                if (!t && i in this._types) throw new Error('Attempt to change mapping for "' + i + '" extension from "' + this._types[i] + '" to "' + n + '". Pass `force=true` to allow this, otherwise remove "' + i + '" from the list of extensions for "' + n + '".');
                this._types[i] = n
            }
        }
        if (t || !this._extensions[n]) {
            const r = s[0];
            this._extensions[n] = r[0] !== "*" ? r : r.substr(1)
        }
    }
};
Ai.prototype.getType = function(e) {
    e = String(e);
    let t = e.replace(/^.*[/\\]/, "").toLowerCase(),
        n = t.replace(/^.*\./, "").toLowerCase(),
        s = t.length < e.length;
    return (n.length < t.length - 1 || !s) && this._types[n] || null
};
Ai.prototype.getExtension = function(e) {
    return e = /^\s*([^;\s]*)/.test(e) && RegExp.$1, e && this._extensions[e.toLowerCase()] || null
};
var Jv = Ai,
    Zv = {
        "application/andrew-inset": ["ez"],
        "application/applixware": ["aw"],
        "application/atom+xml": ["atom"],
        "application/atomcat+xml": ["atomcat"],
        "application/atomdeleted+xml": ["atomdeleted"],
        "application/atomsvc+xml": ["atomsvc"],
        "application/atsc-dwd+xml": ["dwd"],
        "application/atsc-held+xml": ["held"],
        "application/atsc-rsat+xml": ["rsat"],
        "application/bdoc": ["bdoc"],
        "application/calendar+xml": ["xcs"],
        "application/ccxml+xml": ["ccxml"],
        "application/cdfx+xml": ["cdfx"],
        "application/cdmi-capability": ["cdmia"],
        "application/cdmi-container": ["cdmic"],
        "application/cdmi-domain": ["cdmid"],
        "application/cdmi-object": ["cdmio"],
        "application/cdmi-queue": ["cdmiq"],
        "application/cu-seeme": ["cu"],
        "application/dash+xml": ["mpd"],
        "application/davmount+xml": ["davmount"],
        "application/docbook+xml": ["dbk"],
        "application/dssc+der": ["dssc"],
        "application/dssc+xml": ["xdssc"],
        "application/ecmascript": ["es", "ecma"],
        "application/emma+xml": ["emma"],
        "application/emotionml+xml": ["emotionml"],
        "application/epub+zip": ["epub"],
        "application/exi": ["exi"],
        "application/express": ["exp"],
        "application/fdt+xml": ["fdt"],
        "application/font-tdpfr": ["pfr"],
        "application/geo+json": ["geojson"],
        "application/gml+xml": ["gml"],
        "application/gpx+xml": ["gpx"],
        "application/gxf": ["gxf"],
        "application/gzip": ["gz"],
        "application/hjson": ["hjson"],
        "application/hyperstudio": ["stk"],
        "application/inkml+xml": ["ink", "inkml"],
        "application/ipfix": ["ipfix"],
        "application/its+xml": ["its"],
        "application/java-archive": ["jar", "war", "ear"],
        "application/java-serialized-object": ["ser"],
        "application/java-vm": ["class"],
        "application/javascript": ["js", "mjs"],
        "application/json": ["json", "map"],
        "application/json5": ["json5"],
        "application/jsonml+json": ["jsonml"],
        "application/ld+json": ["jsonld"],
        "application/lgr+xml": ["lgr"],
        "application/lost+xml": ["lostxml"],
        "application/mac-binhex40": ["hqx"],
        "application/mac-compactpro": ["cpt"],
        "application/mads+xml": ["mads"],
        "application/manifest+json": ["webmanifest"],
        "application/marc": ["mrc"],
        "application/marcxml+xml": ["mrcx"],
        "application/mathematica": ["ma", "nb", "mb"],
        "application/mathml+xml": ["mathml"],
        "application/mbox": ["mbox"],
        "application/mediaservercontrol+xml": ["mscml"],
        "application/metalink+xml": ["metalink"],
        "application/metalink4+xml": ["meta4"],
        "application/mets+xml": ["mets"],
        "application/mmt-aei+xml": ["maei"],
        "application/mmt-usd+xml": ["musd"],
        "application/mods+xml": ["mods"],
        "application/mp21": ["m21", "mp21"],
        "application/mp4": ["mp4s", "m4p"],
        "application/msword": ["doc", "dot"],
        "application/mxf": ["mxf"],
        "application/n-quads": ["nq"],
        "application/n-triples": ["nt"],
        "application/node": ["cjs"],
        "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"],
        "application/oda": ["oda"],
        "application/oebps-package+xml": ["opf"],
        "application/ogg": ["ogx"],
        "application/omdoc+xml": ["omdoc"],
        "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
        "application/oxps": ["oxps"],
        "application/p2p-overlay+xml": ["relo"],
        "application/patch-ops-error+xml": ["xer"],
        "application/pdf": ["pdf"],
        "application/pgp-encrypted": ["pgp"],
        "application/pgp-signature": ["asc", "sig"],
        "application/pics-rules": ["prf"],
        "application/pkcs10": ["p10"],
        "application/pkcs7-mime": ["p7m", "p7c"],
        "application/pkcs7-signature": ["p7s"],
        "application/pkcs8": ["p8"],
        "application/pkix-attr-cert": ["ac"],
        "application/pkix-cert": ["cer"],
        "application/pkix-crl": ["crl"],
        "application/pkix-pkipath": ["pkipath"],
        "application/pkixcmp": ["pki"],
        "application/pls+xml": ["pls"],
        "application/postscript": ["ai", "eps", "ps"],
        "application/provenance+xml": ["provx"],
        "application/pskc+xml": ["pskcxml"],
        "application/raml+yaml": ["raml"],
        "application/rdf+xml": ["rdf", "owl"],
        "application/reginfo+xml": ["rif"],
        "application/relax-ng-compact-syntax": ["rnc"],
        "application/resource-lists+xml": ["rl"],
        "application/resource-lists-diff+xml": ["rld"],
        "application/rls-services+xml": ["rs"],
        "application/route-apd+xml": ["rapd"],
        "application/route-s-tsid+xml": ["sls"],
        "application/route-usd+xml": ["rusd"],
        "application/rpki-ghostbusters": ["gbr"],
        "application/rpki-manifest": ["mft"],
        "application/rpki-roa": ["roa"],
        "application/rsd+xml": ["rsd"],
        "application/rss+xml": ["rss"],
        "application/rtf": ["rtf"],
        "application/sbml+xml": ["sbml"],
        "application/scvp-cv-request": ["scq"],
        "application/scvp-cv-response": ["scs"],
        "application/scvp-vp-request": ["spq"],
        "application/scvp-vp-response": ["spp"],
        "application/sdp": ["sdp"],
        "application/senml+xml": ["senmlx"],
        "application/sensml+xml": ["sensmlx"],
        "application/set-payment-initiation": ["setpay"],
        "application/set-registration-initiation": ["setreg"],
        "application/shf+xml": ["shf"],
        "application/sieve": ["siv", "sieve"],
        "application/smil+xml": ["smi", "smil"],
        "application/sparql-query": ["rq"],
        "application/sparql-results+xml": ["srx"],
        "application/srgs": ["gram"],
        "application/srgs+xml": ["grxml"],
        "application/sru+xml": ["sru"],
        "application/ssdl+xml": ["ssdl"],
        "application/ssml+xml": ["ssml"],
        "application/swid+xml": ["swidtag"],
        "application/tei+xml": ["tei", "teicorpus"],
        "application/thraud+xml": ["tfi"],
        "application/timestamped-data": ["tsd"],
        "application/toml": ["toml"],
        "application/trig": ["trig"],
        "application/ttml+xml": ["ttml"],
        "application/ubjson": ["ubj"],
        "application/urc-ressheet+xml": ["rsheet"],
        "application/urc-targetdesc+xml": ["td"],
        "application/voicexml+xml": ["vxml"],
        "application/wasm": ["wasm"],
        "application/widget": ["wgt"],
        "application/winhlp": ["hlp"],
        "application/wsdl+xml": ["wsdl"],
        "application/wspolicy+xml": ["wspolicy"],
        "application/xaml+xml": ["xaml"],
        "application/xcap-att+xml": ["xav"],
        "application/xcap-caps+xml": ["xca"],
        "application/xcap-diff+xml": ["xdf"],
        "application/xcap-el+xml": ["xel"],
        "application/xcap-ns+xml": ["xns"],
        "application/xenc+xml": ["xenc"],
        "application/xhtml+xml": ["xhtml", "xht"],
        "application/xliff+xml": ["xlf"],
        "application/xml": ["xml", "xsl", "xsd", "rng"],
        "application/xml-dtd": ["dtd"],
        "application/xop+xml": ["xop"],
        "application/xproc+xml": ["xpl"],
        "application/xslt+xml": ["*xsl", "xslt"],
        "application/xspf+xml": ["xspf"],
        "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
        "application/yang": ["yang"],
        "application/yin+xml": ["yin"],
        "application/zip": ["zip"],
        "audio/3gpp": ["*3gpp"],
        "audio/adpcm": ["adp"],
        "audio/amr": ["amr"],
        "audio/basic": ["au", "snd"],
        "audio/midi": ["mid", "midi", "kar", "rmi"],
        "audio/mobile-xmf": ["mxmf"],
        "audio/mp3": ["*mp3"],
        "audio/mp4": ["m4a", "mp4a"],
        "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
        "audio/ogg": ["oga", "ogg", "spx", "opus"],
        "audio/s3m": ["s3m"],
        "audio/silk": ["sil"],
        "audio/wav": ["wav"],
        "audio/wave": ["*wav"],
        "audio/webm": ["weba"],
        "audio/xm": ["xm"],
        "font/collection": ["ttc"],
        "font/otf": ["otf"],
        "font/ttf": ["ttf"],
        "font/woff": ["woff"],
        "font/woff2": ["woff2"],
        "image/aces": ["exr"],
        "image/apng": ["apng"],
        "image/avif": ["avif"],
        "image/bmp": ["bmp"],
        "image/cgm": ["cgm"],
        "image/dicom-rle": ["drle"],
        "image/emf": ["emf"],
        "image/fits": ["fits"],
        "image/g3fax": ["g3"],
        "image/gif": ["gif"],
        "image/heic": ["heic"],
        "image/heic-sequence": ["heics"],
        "image/heif": ["heif"],
        "image/heif-sequence": ["heifs"],
        "image/hej2k": ["hej2"],
        "image/hsj2": ["hsj2"],
        "image/ief": ["ief"],
        "image/jls": ["jls"],
        "image/jp2": ["jp2", "jpg2"],
        "image/jpeg": ["jpeg", "jpg", "jpe"],
        "image/jph": ["jph"],
        "image/jphc": ["jhc"],
        "image/jpm": ["jpm"],
        "image/jpx": ["jpx", "jpf"],
        "image/jxr": ["jxr"],
        "image/jxra": ["jxra"],
        "image/jxrs": ["jxrs"],
        "image/jxs": ["jxs"],
        "image/jxsc": ["jxsc"],
        "image/jxsi": ["jxsi"],
        "image/jxss": ["jxss"],
        "image/ktx": ["ktx"],
        "image/ktx2": ["ktx2"],
        "image/png": ["png"],
        "image/sgi": ["sgi"],
        "image/svg+xml": ["svg", "svgz"],
        "image/t38": ["t38"],
        "image/tiff": ["tif", "tiff"],
        "image/tiff-fx": ["tfx"],
        "image/webp": ["webp"],
        "image/wmf": ["wmf"],
        "message/disposition-notification": ["disposition-notification"],
        "message/global": ["u8msg"],
        "message/global-delivery-status": ["u8dsn"],
        "message/global-disposition-notification": ["u8mdn"],
        "message/global-headers": ["u8hdr"],
        "message/rfc822": ["eml", "mime"],
        "model/3mf": ["3mf"],
        "model/gltf+json": ["gltf"],
        "model/gltf-binary": ["glb"],
        "model/iges": ["igs", "iges"],
        "model/mesh": ["msh", "mesh", "silo"],
        "model/mtl": ["mtl"],
        "model/obj": ["obj"],
        "model/step+xml": ["stpx"],
        "model/step+zip": ["stpz"],
        "model/step-xml+zip": ["stpxz"],
        "model/stl": ["stl"],
        "model/vrml": ["wrl", "vrml"],
        "model/x3d+binary": ["*x3db", "x3dbz"],
        "model/x3d+fastinfoset": ["x3db"],
        "model/x3d+vrml": ["*x3dv", "x3dvz"],
        "model/x3d+xml": ["x3d", "x3dz"],
        "model/x3d-vrml": ["x3dv"],
        "text/cache-manifest": ["appcache", "manifest"],
        "text/calendar": ["ics", "ifb"],
        "text/coffeescript": ["coffee", "litcoffee"],
        "text/css": ["css"],
        "text/csv": ["csv"],
        "text/html": ["html", "htm", "shtml"],
        "text/jade": ["jade"],
        "text/jsx": ["jsx"],
        "text/less": ["less"],
        "text/markdown": ["markdown", "md"],
        "text/mathml": ["mml"],
        "text/mdx": ["mdx"],
        "text/n3": ["n3"],
        "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
        "text/richtext": ["rtx"],
        "text/rtf": ["*rtf"],
        "text/sgml": ["sgml", "sgm"],
        "text/shex": ["shex"],
        "text/slim": ["slim", "slm"],
        "text/spdx": ["spdx"],
        "text/stylus": ["stylus", "styl"],
        "text/tab-separated-values": ["tsv"],
        "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
        "text/turtle": ["ttl"],
        "text/uri-list": ["uri", "uris", "urls"],
        "text/vcard": ["vcard"],
        "text/vtt": ["vtt"],
        "text/xml": ["*xml"],
        "text/yaml": ["yaml", "yml"],
        "video/3gpp": ["3gp", "3gpp"],
        "video/3gpp2": ["3g2"],
        "video/h261": ["h261"],
        "video/h263": ["h263"],
        "video/h264": ["h264"],
        "video/iso.segment": ["m4s"],
        "video/jpeg": ["jpgv"],
        "video/jpm": ["*jpm", "jpgm"],
        "video/mj2": ["mj2", "mjp2"],
        "video/mp2t": ["ts"],
        "video/mp4": ["mp4", "mp4v", "mpg4"],
        "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
        "video/ogg": ["ogv"],
        "video/quicktime": ["qt", "mov"],
        "video/webm": ["webm"]
    },
    ey = {
        "application/prs.cww": ["cww"],
        "application/vnd.1000minds.decision-model+xml": ["1km"],
        "application/vnd.3gpp.pic-bw-large": ["plb"],
        "application/vnd.3gpp.pic-bw-small": ["psb"],
        "application/vnd.3gpp.pic-bw-var": ["pvb"],
        "application/vnd.3gpp2.tcap": ["tcap"],
        "application/vnd.3m.post-it-notes": ["pwn"],
        "application/vnd.accpac.simply.aso": ["aso"],
        "application/vnd.accpac.simply.imp": ["imp"],
        "application/vnd.acucobol": ["acu"],
        "application/vnd.acucorp": ["atc", "acutc"],
        "application/vnd.adobe.air-application-installer-package+zip": ["air"],
        "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
        "application/vnd.adobe.fxp": ["fxp", "fxpl"],
        "application/vnd.adobe.xdp+xml": ["xdp"],
        "application/vnd.adobe.xfdf": ["xfdf"],
        "application/vnd.ahead.space": ["ahead"],
        "application/vnd.airzip.filesecure.azf": ["azf"],
        "application/vnd.airzip.filesecure.azs": ["azs"],
        "application/vnd.amazon.ebook": ["azw"],
        "application/vnd.americandynamics.acc": ["acc"],
        "application/vnd.amiga.ami": ["ami"],
        "application/vnd.android.package-archive": ["apk"],
        "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
        "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
        "application/vnd.antix.game-component": ["atx"],
        "application/vnd.apple.installer+xml": ["mpkg"],
        "application/vnd.apple.keynote": ["key"],
        "application/vnd.apple.mpegurl": ["m3u8"],
        "application/vnd.apple.numbers": ["numbers"],
        "application/vnd.apple.pages": ["pages"],
        "application/vnd.apple.pkpass": ["pkpass"],
        "application/vnd.aristanetworks.swi": ["swi"],
        "application/vnd.astraea-software.iota": ["iota"],
        "application/vnd.audiograph": ["aep"],
        "application/vnd.balsamiq.bmml+xml": ["bmml"],
        "application/vnd.blueice.multipass": ["mpm"],
        "application/vnd.bmi": ["bmi"],
        "application/vnd.businessobjects": ["rep"],
        "application/vnd.chemdraw+xml": ["cdxml"],
        "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
        "application/vnd.cinderella": ["cdy"],
        "application/vnd.citationstyles.style+xml": ["csl"],
        "application/vnd.claymore": ["cla"],
        "application/vnd.cloanto.rp9": ["rp9"],
        "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
        "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
        "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
        "application/vnd.commonspace": ["csp"],
        "application/vnd.contact.cmsg": ["cdbcmsg"],
        "application/vnd.cosmocaller": ["cmc"],
        "application/vnd.crick.clicker": ["clkx"],
        "application/vnd.crick.clicker.keyboard": ["clkk"],
        "application/vnd.crick.clicker.palette": ["clkp"],
        "application/vnd.crick.clicker.template": ["clkt"],
        "application/vnd.crick.clicker.wordbank": ["clkw"],
        "application/vnd.criticaltools.wbs+xml": ["wbs"],
        "application/vnd.ctc-posml": ["pml"],
        "application/vnd.cups-ppd": ["ppd"],
        "application/vnd.curl.car": ["car"],
        "application/vnd.curl.pcurl": ["pcurl"],
        "application/vnd.dart": ["dart"],
        "application/vnd.data-vision.rdz": ["rdz"],
        "application/vnd.dbf": ["dbf"],
        "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
        "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
        "application/vnd.dece.unspecified": ["uvx", "uvvx"],
        "application/vnd.dece.zip": ["uvz", "uvvz"],
        "application/vnd.denovo.fcselayout-link": ["fe_launch"],
        "application/vnd.dna": ["dna"],
        "application/vnd.dolby.mlp": ["mlp"],
        "application/vnd.dpgraph": ["dpg"],
        "application/vnd.dreamfactory": ["dfac"],
        "application/vnd.ds-keypoint": ["kpxx"],
        "application/vnd.dvb.ait": ["ait"],
        "application/vnd.dvb.service": ["svc"],
        "application/vnd.dynageo": ["geo"],
        "application/vnd.ecowin.chart": ["mag"],
        "application/vnd.enliven": ["nml"],
        "application/vnd.epson.esf": ["esf"],
        "application/vnd.epson.msf": ["msf"],
        "application/vnd.epson.quickanime": ["qam"],
        "application/vnd.epson.salt": ["slt"],
        "application/vnd.epson.ssf": ["ssf"],
        "application/vnd.eszigno3+xml": ["es3", "et3"],
        "application/vnd.ezpix-album": ["ez2"],
        "application/vnd.ezpix-package": ["ez3"],
        "application/vnd.fdf": ["fdf"],
        "application/vnd.fdsn.mseed": ["mseed"],
        "application/vnd.fdsn.seed": ["seed", "dataless"],
        "application/vnd.flographit": ["gph"],
        "application/vnd.fluxtime.clip": ["ftc"],
        "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
        "application/vnd.frogans.fnc": ["fnc"],
        "application/vnd.frogans.ltf": ["ltf"],
        "application/vnd.fsc.weblaunch": ["fsc"],
        "application/vnd.fujitsu.oasys": ["oas"],
        "application/vnd.fujitsu.oasys2": ["oa2"],
        "application/vnd.fujitsu.oasys3": ["oa3"],
        "application/vnd.fujitsu.oasysgp": ["fg5"],
        "application/vnd.fujitsu.oasysprs": ["bh2"],
        "application/vnd.fujixerox.ddd": ["ddd"],
        "application/vnd.fujixerox.docuworks": ["xdw"],
        "application/vnd.fujixerox.docuworks.binder": ["xbd"],
        "application/vnd.fuzzysheet": ["fzs"],
        "application/vnd.genomatix.tuxedo": ["txd"],
        "application/vnd.geogebra.file": ["ggb"],
        "application/vnd.geogebra.tool": ["ggt"],
        "application/vnd.geometry-explorer": ["gex", "gre"],
        "application/vnd.geonext": ["gxt"],
        "application/vnd.geoplan": ["g2w"],
        "application/vnd.geospace": ["g3w"],
        "application/vnd.gmx": ["gmx"],
        "application/vnd.google-apps.document": ["gdoc"],
        "application/vnd.google-apps.presentation": ["gslides"],
        "application/vnd.google-apps.spreadsheet": ["gsheet"],
        "application/vnd.google-earth.kml+xml": ["kml"],
        "application/vnd.google-earth.kmz": ["kmz"],
        "application/vnd.grafeq": ["gqf", "gqs"],
        "application/vnd.groove-account": ["gac"],
        "application/vnd.groove-help": ["ghf"],
        "application/vnd.groove-identity-message": ["gim"],
        "application/vnd.groove-injector": ["grv"],
        "application/vnd.groove-tool-message": ["gtm"],
        "application/vnd.groove-tool-template": ["tpl"],
        "application/vnd.groove-vcard": ["vcg"],
        "application/vnd.hal+xml": ["hal"],
        "application/vnd.handheld-entertainment+xml": ["zmm"],
        "application/vnd.hbci": ["hbci"],
        "application/vnd.hhe.lesson-player": ["les"],
        "application/vnd.hp-hpgl": ["hpgl"],
        "application/vnd.hp-hpid": ["hpid"],
        "application/vnd.hp-hps": ["hps"],
        "application/vnd.hp-jlyt": ["jlt"],
        "application/vnd.hp-pcl": ["pcl"],
        "application/vnd.hp-pclxl": ["pclxl"],
        "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
        "application/vnd.ibm.minipay": ["mpy"],
        "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
        "application/vnd.ibm.rights-management": ["irm"],
        "application/vnd.ibm.secure-container": ["sc"],
        "application/vnd.iccprofile": ["icc", "icm"],
        "application/vnd.igloader": ["igl"],
        "application/vnd.immervision-ivp": ["ivp"],
        "application/vnd.immervision-ivu": ["ivu"],
        "application/vnd.insors.igm": ["igm"],
        "application/vnd.intercon.formnet": ["xpw", "xpx"],
        "application/vnd.intergeo": ["i2g"],
        "application/vnd.intu.qbo": ["qbo"],
        "application/vnd.intu.qfx": ["qfx"],
        "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
        "application/vnd.irepository.package+xml": ["irp"],
        "application/vnd.is-xpr": ["xpr"],
        "application/vnd.isac.fcs": ["fcs"],
        "application/vnd.jam": ["jam"],
        "application/vnd.jcp.javame.midlet-rms": ["rms"],
        "application/vnd.jisp": ["jisp"],
        "application/vnd.joost.joda-archive": ["joda"],
        "application/vnd.kahootz": ["ktz", "ktr"],
        "application/vnd.kde.karbon": ["karbon"],
        "application/vnd.kde.kchart": ["chrt"],
        "application/vnd.kde.kformula": ["kfo"],
        "application/vnd.kde.kivio": ["flw"],
        "application/vnd.kde.kontour": ["kon"],
        "application/vnd.kde.kpresenter": ["kpr", "kpt"],
        "application/vnd.kde.kspread": ["ksp"],
        "application/vnd.kde.kword": ["kwd", "kwt"],
        "application/vnd.kenameaapp": ["htke"],
        "application/vnd.kidspiration": ["kia"],
        "application/vnd.kinar": ["kne", "knp"],
        "application/vnd.koan": ["skp", "skd", "skt", "skm"],
        "application/vnd.kodak-descriptor": ["sse"],
        "application/vnd.las.las+xml": ["lasxml"],
        "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
        "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
        "application/vnd.lotus-1-2-3": ["123"],
        "application/vnd.lotus-approach": ["apr"],
        "application/vnd.lotus-freelance": ["pre"],
        "application/vnd.lotus-notes": ["nsf"],
        "application/vnd.lotus-organizer": ["org"],
        "application/vnd.lotus-screencam": ["scm"],
        "application/vnd.lotus-wordpro": ["lwp"],
        "application/vnd.macports.portpkg": ["portpkg"],
        "application/vnd.mapbox-vector-tile": ["mvt"],
        "application/vnd.mcd": ["mcd"],
        "application/vnd.medcalcdata": ["mc1"],
        "application/vnd.mediastation.cdkey": ["cdkey"],
        "application/vnd.mfer": ["mwf"],
        "application/vnd.mfmp": ["mfm"],
        "application/vnd.micrografx.flo": ["flo"],
        "application/vnd.micrografx.igx": ["igx"],
        "application/vnd.mif": ["mif"],
        "application/vnd.mobius.daf": ["daf"],
        "application/vnd.mobius.dis": ["dis"],
        "application/vnd.mobius.mbk": ["mbk"],
        "application/vnd.mobius.mqy": ["mqy"],
        "application/vnd.mobius.msl": ["msl"],
        "application/vnd.mobius.plc": ["plc"],
        "application/vnd.mobius.txf": ["txf"],
        "application/vnd.mophun.application": ["mpn"],
        "application/vnd.mophun.certificate": ["mpc"],
        "application/vnd.mozilla.xul+xml": ["xul"],
        "application/vnd.ms-artgalry": ["cil"],
        "application/vnd.ms-cab-compressed": ["cab"],
        "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
        "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
        "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
        "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
        "application/vnd.ms-fontobject": ["eot"],
        "application/vnd.ms-htmlhelp": ["chm"],
        "application/vnd.ms-ims": ["ims"],
        "application/vnd.ms-lrm": ["lrm"],
        "application/vnd.ms-officetheme": ["thmx"],
        "application/vnd.ms-outlook": ["msg"],
        "application/vnd.ms-pki.seccat": ["cat"],
        "application/vnd.ms-pki.stl": ["*stl"],
        "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
        "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
        "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
        "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
        "application/vnd.ms-project": ["mpp", "mpt"],
        "application/vnd.ms-word.document.macroenabled.12": ["docm"],
        "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
        "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
        "application/vnd.ms-wpl": ["wpl"],
        "application/vnd.ms-xpsdocument": ["xps"],
        "application/vnd.mseq": ["mseq"],
        "application/vnd.musician": ["mus"],
        "application/vnd.muvee.style": ["msty"],
        "application/vnd.mynfc": ["taglet"],
        "application/vnd.neurolanguage.nlu": ["nlu"],
        "application/vnd.nitf": ["ntf", "nitf"],
        "application/vnd.noblenet-directory": ["nnd"],
        "application/vnd.noblenet-sealer": ["nns"],
        "application/vnd.noblenet-web": ["nnw"],
        "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
        "application/vnd.nokia.n-gage.data": ["ngdat"],
        "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
        "application/vnd.nokia.radio-preset": ["rpst"],
        "application/vnd.nokia.radio-presets": ["rpss"],
        "application/vnd.novadigm.edm": ["edm"],
        "application/vnd.novadigm.edx": ["edx"],
        "application/vnd.novadigm.ext": ["ext"],
        "application/vnd.oasis.opendocument.chart": ["odc"],
        "application/vnd.oasis.opendocument.chart-template": ["otc"],
        "application/vnd.oasis.opendocument.database": ["odb"],
        "application/vnd.oasis.opendocument.formula": ["odf"],
        "application/vnd.oasis.opendocument.formula-template": ["odft"],
        "application/vnd.oasis.opendocument.graphics": ["odg"],
        "application/vnd.oasis.opendocument.graphics-template": ["otg"],
        "application/vnd.oasis.opendocument.image": ["odi"],
        "application/vnd.oasis.opendocument.image-template": ["oti"],
        "application/vnd.oasis.opendocument.presentation": ["odp"],
        "application/vnd.oasis.opendocument.presentation-template": ["otp"],
        "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
        "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
        "application/vnd.oasis.opendocument.text": ["odt"],
        "application/vnd.oasis.opendocument.text-master": ["odm"],
        "application/vnd.oasis.opendocument.text-template": ["ott"],
        "application/vnd.oasis.opendocument.text-web": ["oth"],
        "application/vnd.olpc-sugar": ["xo"],
        "application/vnd.oma.dd2+xml": ["dd2"],
        "application/vnd.openblox.game+xml": ["obgx"],
        "application/vnd.openofficeorg.extension": ["oxt"],
        "application/vnd.openstreetmap.data+xml": ["osm"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
        "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
        "application/vnd.osgeo.mapguide.package": ["mgp"],
        "application/vnd.osgi.dp": ["dp"],
        "application/vnd.osgi.subsystem": ["esa"],
        "application/vnd.palm": ["pdb", "pqa", "oprc"],
        "application/vnd.pawaafile": ["paw"],
        "application/vnd.pg.format": ["str"],
        "application/vnd.pg.osasli": ["ei6"],
        "application/vnd.picsel": ["efif"],
        "application/vnd.pmi.widget": ["wg"],
        "application/vnd.pocketlearn": ["plf"],
        "application/vnd.powerbuilder6": ["pbd"],
        "application/vnd.previewsystems.box": ["box"],
        "application/vnd.proteus.magazine": ["mgz"],
        "application/vnd.publishare-delta-tree": ["qps"],
        "application/vnd.pvi.ptid1": ["ptid"],
        "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
        "application/vnd.rar": ["rar"],
        "application/vnd.realvnc.bed": ["bed"],
        "application/vnd.recordare.musicxml": ["mxl"],
        "application/vnd.recordare.musicxml+xml": ["musicxml"],
        "application/vnd.rig.cryptonote": ["cryptonote"],
        "application/vnd.rim.cod": ["cod"],
        "application/vnd.rn-realmedia": ["rm"],
        "application/vnd.rn-realmedia-vbr": ["rmvb"],
        "application/vnd.route66.link66+xml": ["link66"],
        "application/vnd.sailingtracker.track": ["st"],
        "application/vnd.seemail": ["see"],
        "application/vnd.sema": ["sema"],
        "application/vnd.semd": ["semd"],
        "application/vnd.semf": ["semf"],
        "application/vnd.shana.informed.formdata": ["ifm"],
        "application/vnd.shana.informed.formtemplate": ["itp"],
        "application/vnd.shana.informed.interchange": ["iif"],
        "application/vnd.shana.informed.package": ["ipk"],
        "application/vnd.simtech-mindmapper": ["twd", "twds"],
        "application/vnd.smaf": ["mmf"],
        "application/vnd.smart.teacher": ["teacher"],
        "application/vnd.software602.filler.form+xml": ["fo"],
        "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
        "application/vnd.spotfire.dxp": ["dxp"],
        "application/vnd.spotfire.sfs": ["sfs"],
        "application/vnd.stardivision.calc": ["sdc"],
        "application/vnd.stardivision.draw": ["sda"],
        "application/vnd.stardivision.impress": ["sdd"],
        "application/vnd.stardivision.math": ["smf"],
        "application/vnd.stardivision.writer": ["sdw", "vor"],
        "application/vnd.stardivision.writer-global": ["sgl"],
        "application/vnd.stepmania.package": ["smzip"],
        "application/vnd.stepmania.stepchart": ["sm"],
        "application/vnd.sun.wadl+xml": ["wadl"],
        "application/vnd.sun.xml.calc": ["sxc"],
        "application/vnd.sun.xml.calc.template": ["stc"],
        "application/vnd.sun.xml.draw": ["sxd"],
        "application/vnd.sun.xml.draw.template": ["std"],
        "application/vnd.sun.xml.impress": ["sxi"],
        "application/vnd.sun.xml.impress.template": ["sti"],
        "application/vnd.sun.xml.math": ["sxm"],
        "application/vnd.sun.xml.writer": ["sxw"],
        "application/vnd.sun.xml.writer.global": ["sxg"],
        "application/vnd.sun.xml.writer.template": ["stw"],
        "application/vnd.sus-calendar": ["sus", "susp"],
        "application/vnd.svd": ["svd"],
        "application/vnd.symbian.install": ["sis", "sisx"],
        "application/vnd.syncml+xml": ["xsm"],
        "application/vnd.syncml.dm+wbxml": ["bdm"],
        "application/vnd.syncml.dm+xml": ["xdm"],
        "application/vnd.syncml.dmddf+xml": ["ddf"],
        "application/vnd.tao.intent-module-archive": ["tao"],
        "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
        "application/vnd.tmobile-livetv": ["tmo"],
        "application/vnd.trid.tpt": ["tpt"],
        "application/vnd.triscape.mxs": ["mxs"],
        "application/vnd.trueapp": ["tra"],
        "application/vnd.ufdl": ["ufd", "ufdl"],
        "application/vnd.uiq.theme": ["utz"],
        "application/vnd.umajin": ["umj"],
        "application/vnd.unity": ["unityweb"],
        "application/vnd.uoml+xml": ["uoml"],
        "application/vnd.vcx": ["vcx"],
        "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
        "application/vnd.visionary": ["vis"],
        "application/vnd.vsf": ["vsf"],
        "application/vnd.wap.wbxml": ["wbxml"],
        "application/vnd.wap.wmlc": ["wmlc"],
        "application/vnd.wap.wmlscriptc": ["wmlsc"],
        "application/vnd.webturbo": ["wtb"],
        "application/vnd.wolfram.player": ["nbp"],
        "application/vnd.wordperfect": ["wpd"],
        "application/vnd.wqd": ["wqd"],
        "application/vnd.wt.stf": ["stf"],
        "application/vnd.xara": ["xar"],
        "application/vnd.xfdl": ["xfdl"],
        "application/vnd.yamaha.hv-dic": ["hvd"],
        "application/vnd.yamaha.hv-script": ["hvs"],
        "application/vnd.yamaha.hv-voice": ["hvp"],
        "application/vnd.yamaha.openscoreformat": ["osf"],
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
        "application/vnd.yamaha.smaf-audio": ["saf"],
        "application/vnd.yamaha.smaf-phrase": ["spf"],
        "application/vnd.yellowriver-custom-menu": ["cmp"],
        "application/vnd.zul": ["zir", "zirz"],
        "application/vnd.zzazz.deck+xml": ["zaz"],
        "application/x-7z-compressed": ["7z"],
        "application/x-abiword": ["abw"],
        "application/x-ace-compressed": ["ace"],
        "application/x-apple-diskimage": ["*dmg"],
        "application/x-arj": ["arj"],
        "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
        "application/x-authorware-map": ["aam"],
        "application/x-authorware-seg": ["aas"],
        "application/x-bcpio": ["bcpio"],
        "application/x-bdoc": ["*bdoc"],
        "application/x-bittorrent": ["torrent"],
        "application/x-blorb": ["blb", "blorb"],
        "application/x-bzip": ["bz"],
        "application/x-bzip2": ["bz2", "boz"],
        "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
        "application/x-cdlink": ["vcd"],
        "application/x-cfs-compressed": ["cfs"],
        "application/x-chat": ["chat"],
        "application/x-chess-pgn": ["pgn"],
        "application/x-chrome-extension": ["crx"],
        "application/x-cocoa": ["cco"],
        "application/x-conference": ["nsc"],
        "application/x-cpio": ["cpio"],
        "application/x-csh": ["csh"],
        "application/x-debian-package": ["*deb", "udeb"],
        "application/x-dgc-compressed": ["dgc"],
        "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
        "application/x-doom": ["wad"],
        "application/x-dtbncx+xml": ["ncx"],
        "application/x-dtbook+xml": ["dtb"],
        "application/x-dtbresource+xml": ["res"],
        "application/x-dvi": ["dvi"],
        "application/x-envoy": ["evy"],
        "application/x-eva": ["eva"],
        "application/x-font-bdf": ["bdf"],
        "application/x-font-ghostscript": ["gsf"],
        "application/x-font-linux-psf": ["psf"],
        "application/x-font-pcf": ["pcf"],
        "application/x-font-snf": ["snf"],
        "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
        "application/x-freearc": ["arc"],
        "application/x-futuresplash": ["spl"],
        "application/x-gca-compressed": ["gca"],
        "application/x-glulx": ["ulx"],
        "application/x-gnumeric": ["gnumeric"],
        "application/x-gramps-xml": ["gramps"],
        "application/x-gtar": ["gtar"],
        "application/x-hdf": ["hdf"],
        "application/x-httpd-php": ["php"],
        "application/x-install-instructions": ["install"],
        "application/x-iso9660-image": ["*iso"],
        "application/x-iwork-keynote-sffkey": ["*key"],
        "application/x-iwork-numbers-sffnumbers": ["*numbers"],
        "application/x-iwork-pages-sffpages": ["*pages"],
        "application/x-java-archive-diff": ["jardiff"],
        "application/x-java-jnlp-file": ["jnlp"],
        "application/x-keepass2": ["kdbx"],
        "application/x-latex": ["latex"],
        "application/x-lua-bytecode": ["luac"],
        "application/x-lzh-compressed": ["lzh", "lha"],
        "application/x-makeself": ["run"],
        "application/x-mie": ["mie"],
        "application/x-mobipocket-ebook": ["prc", "mobi"],
        "application/x-ms-application": ["application"],
        "application/x-ms-shortcut": ["lnk"],
        "application/x-ms-wmd": ["wmd"],
        "application/x-ms-wmz": ["wmz"],
        "application/x-ms-xbap": ["xbap"],
        "application/x-msaccess": ["mdb"],
        "application/x-msbinder": ["obd"],
        "application/x-mscardfile": ["crd"],
        "application/x-msclip": ["clp"],
        "application/x-msdos-program": ["*exe"],
        "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
        "application/x-msmediaview": ["mvb", "m13", "m14"],
        "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
        "application/x-msmoney": ["mny"],
        "application/x-mspublisher": ["pub"],
        "application/x-msschedule": ["scd"],
        "application/x-msterminal": ["trm"],
        "application/x-mswrite": ["wri"],
        "application/x-netcdf": ["nc", "cdf"],
        "application/x-ns-proxy-autoconfig": ["pac"],
        "application/x-nzb": ["nzb"],
        "application/x-perl": ["pl", "pm"],
        "application/x-pilot": ["*prc", "*pdb"],
        "application/x-pkcs12": ["p12", "pfx"],
        "application/x-pkcs7-certificates": ["p7b", "spc"],
        "application/x-pkcs7-certreqresp": ["p7r"],
        "application/x-rar-compressed": ["*rar"],
        "application/x-redhat-package-manager": ["rpm"],
        "application/x-research-info-systems": ["ris"],
        "application/x-sea": ["sea"],
        "application/x-sh": ["sh"],
        "application/x-shar": ["shar"],
        "application/x-shockwave-flash": ["swf"],
        "application/x-silverlight-app": ["xap"],
        "application/x-sql": ["sql"],
        "application/x-stuffit": ["sit"],
        "application/x-stuffitx": ["sitx"],
        "application/x-subrip": ["srt"],
        "application/x-sv4cpio": ["sv4cpio"],
        "application/x-sv4crc": ["sv4crc"],
        "application/x-t3vm-image": ["t3"],
        "application/x-tads": ["gam"],
        "application/x-tar": ["tar"],
        "application/x-tcl": ["tcl", "tk"],
        "application/x-tex": ["tex"],
        "application/x-tex-tfm": ["tfm"],
        "application/x-texinfo": ["texinfo", "texi"],
        "application/x-tgif": ["*obj"],
        "application/x-ustar": ["ustar"],
        "application/x-virtualbox-hdd": ["hdd"],
        "application/x-virtualbox-ova": ["ova"],
        "application/x-virtualbox-ovf": ["ovf"],
        "application/x-virtualbox-vbox": ["vbox"],
        "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
        "application/x-virtualbox-vdi": ["vdi"],
        "application/x-virtualbox-vhd": ["vhd"],
        "application/x-virtualbox-vmdk": ["vmdk"],
        "application/x-wais-source": ["src"],
        "application/x-web-app-manifest+json": ["webapp"],
        "application/x-x509-ca-cert": ["der", "crt", "pem"],
        "application/x-xfig": ["fig"],
        "application/x-xliff+xml": ["*xlf"],
        "application/x-xpinstall": ["xpi"],
        "application/x-xz": ["xz"],
        "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
        "audio/vnd.dece.audio": ["uva", "uvva"],
        "audio/vnd.digital-winds": ["eol"],
        "audio/vnd.dra": ["dra"],
        "audio/vnd.dts": ["dts"],
        "audio/vnd.dts.hd": ["dtshd"],
        "audio/vnd.lucent.voice": ["lvp"],
        "audio/vnd.ms-playready.media.pya": ["pya"],
        "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
        "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
        "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
        "audio/vnd.rip": ["rip"],
        "audio/x-aac": ["aac"],
        "audio/x-aiff": ["aif", "aiff", "aifc"],
        "audio/x-caf": ["caf"],
        "audio/x-flac": ["flac"],
        "audio/x-m4a": ["*m4a"],
        "audio/x-matroska": ["mka"],
        "audio/x-mpegurl": ["m3u"],
        "audio/x-ms-wax": ["wax"],
        "audio/x-ms-wma": ["wma"],
        "audio/x-pn-realaudio": ["ram", "ra"],
        "audio/x-pn-realaudio-plugin": ["rmp"],
        "audio/x-realaudio": ["*ra"],
        "audio/x-wav": ["*wav"],
        "chemical/x-cdx": ["cdx"],
        "chemical/x-cif": ["cif"],
        "chemical/x-cmdf": ["cmdf"],
        "chemical/x-cml": ["cml"],
        "chemical/x-csml": ["csml"],
        "chemical/x-xyz": ["xyz"],
        "image/prs.btif": ["btif"],
        "image/prs.pti": ["pti"],
        "image/vnd.adobe.photoshop": ["psd"],
        "image/vnd.airzip.accelerator.azv": ["azv"],
        "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
        "image/vnd.djvu": ["djvu", "djv"],
        "image/vnd.dvb.subtitle": ["*sub"],
        "image/vnd.dwg": ["dwg"],
        "image/vnd.dxf": ["dxf"],
        "image/vnd.fastbidsheet": ["fbs"],
        "image/vnd.fpx": ["fpx"],
        "image/vnd.fst": ["fst"],
        "image/vnd.fujixerox.edmics-mmr": ["mmr"],
        "image/vnd.fujixerox.edmics-rlc": ["rlc"],
        "image/vnd.microsoft.icon": ["ico"],
        "image/vnd.ms-dds": ["dds"],
        "image/vnd.ms-modi": ["mdi"],
        "image/vnd.ms-photo": ["wdp"],
        "image/vnd.net-fpx": ["npx"],
        "image/vnd.pco.b16": ["b16"],
        "image/vnd.tencent.tap": ["tap"],
        "image/vnd.valve.source.texture": ["vtf"],
        "image/vnd.wap.wbmp": ["wbmp"],
        "image/vnd.xiff": ["xif"],
        "image/vnd.zbrush.pcx": ["pcx"],
        "image/x-3ds": ["3ds"],
        "image/x-cmu-raster": ["ras"],
        "image/x-cmx": ["cmx"],
        "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
        "image/x-icon": ["*ico"],
        "image/x-jng": ["jng"],
        "image/x-mrsid-image": ["sid"],
        "image/x-ms-bmp": ["*bmp"],
        "image/x-pcx": ["*pcx"],
        "image/x-pict": ["pic", "pct"],
        "image/x-portable-anymap": ["pnm"],
        "image/x-portable-bitmap": ["pbm"],
        "image/x-portable-graymap": ["pgm"],
        "image/x-portable-pixmap": ["ppm"],
        "image/x-rgb": ["rgb"],
        "image/x-tga": ["tga"],
        "image/x-xbitmap": ["xbm"],
        "image/x-xpixmap": ["xpm"],
        "image/x-xwindowdump": ["xwd"],
        "message/vnd.wfa.wsc": ["wsc"],
        "model/vnd.collada+xml": ["dae"],
        "model/vnd.dwf": ["dwf"],
        "model/vnd.gdl": ["gdl"],
        "model/vnd.gtw": ["gtw"],
        "model/vnd.mts": ["mts"],
        "model/vnd.opengex": ["ogex"],
        "model/vnd.parasolid.transmit.binary": ["x_b"],
        "model/vnd.parasolid.transmit.text": ["x_t"],
        "model/vnd.sap.vds": ["vds"],
        "model/vnd.usdz+zip": ["usdz"],
        "model/vnd.valve.source.compiled-map": ["bsp"],
        "model/vnd.vtu": ["vtu"],
        "text/prs.lines.tag": ["dsc"],
        "text/vnd.curl": ["curl"],
        "text/vnd.curl.dcurl": ["dcurl"],
        "text/vnd.curl.mcurl": ["mcurl"],
        "text/vnd.curl.scurl": ["scurl"],
        "text/vnd.dvb.subtitle": ["sub"],
        "text/vnd.fly": ["fly"],
        "text/vnd.fmi.flexstor": ["flx"],
        "text/vnd.graphviz": ["gv"],
        "text/vnd.in3d.3dml": ["3dml"],
        "text/vnd.in3d.spot": ["spot"],
        "text/vnd.sun.j2me.app-descriptor": ["jad"],
        "text/vnd.wap.wml": ["wml"],
        "text/vnd.wap.wmlscript": ["wmls"],
        "text/x-asm": ["s", "asm"],
        "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
        "text/x-component": ["htc"],
        "text/x-fortran": ["f", "for", "f77", "f90"],
        "text/x-handlebars-template": ["hbs"],
        "text/x-java-source": ["java"],
        "text/x-lua": ["lua"],
        "text/x-markdown": ["mkd"],
        "text/x-nfo": ["nfo"],
        "text/x-opml": ["opml"],
        "text/x-org": ["*org"],
        "text/x-pascal": ["p", "pas"],
        "text/x-processing": ["pde"],
        "text/x-sass": ["sass"],
        "text/x-scss": ["scss"],
        "text/x-setext": ["etx"],
        "text/x-sfv": ["sfv"],
        "text/x-suse-ymp": ["ymp"],
        "text/x-uuencode": ["uu"],
        "text/x-vcalendar": ["vcs"],
        "text/x-vcard": ["vcf"],
        "video/vnd.dece.hd": ["uvh", "uvvh"],
        "video/vnd.dece.mobile": ["uvm", "uvvm"],
        "video/vnd.dece.pd": ["uvp", "uvvp"],
        "video/vnd.dece.sd": ["uvs", "uvvs"],
        "video/vnd.dece.video": ["uvv", "uvvv"],
        "video/vnd.dvb.file": ["dvb"],
        "video/vnd.fvt": ["fvt"],
        "video/vnd.mpegurl": ["mxu", "m4u"],
        "video/vnd.ms-playready.media.pyv": ["pyv"],
        "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
        "video/vnd.vivo": ["viv"],
        "video/x-f4v": ["f4v"],
        "video/x-fli": ["fli"],
        "video/x-flv": ["flv"],
        "video/x-m4v": ["m4v"],
        "video/x-matroska": ["mkv", "mk3d", "mks"],
        "video/x-mng": ["mng"],
        "video/x-ms-asf": ["asf", "asx"],
        "video/x-ms-vob": ["vob"],
        "video/x-ms-wm": ["wm"],
        "video/x-ms-wmv": ["wmv"],
        "video/x-ms-wmx": ["wmx"],
        "video/x-ms-wvx": ["wvx"],
        "video/x-msvideo": ["avi"],
        "video/x-sgi-movie": ["movie"],
        "video/x-smv": ["smv"],
        "x-conference/x-cooltalk": ["ice"]
    };
let ty = Jv;
var ny = new ty(Zv, ey);
const Vp = (e, t) => {
        const n = e.match(/(.+?(?=\.[^.]*$|$))(\.[^.]*$|$)/);
        return {
            name: n != null && n[1] ? n[1] : e,
            extension: n != null && n[2] ? n[2] : `.${ny.getExtension(t)}`
        }
    },
    Ti = He(We.FILE, () => {
        const e = ga(),
            t = Me(e),
            n = ce(!1),
            s = De({
                isUploading: !1,
                name: "",
                type: "",
                extension: "",
                uploadedPercentage: 0
            }),
            {
                files: r,
                open: i,
                reset: o,
                onChange: a
            } = rw({
                multiple: !1,
                accept: Xv.join()
            });

        function c(g) {
            n.value = g.enabled
        }

        function l(g) {
            s.isUploading = g
        }

        function u() {
            s.isUploading = !1, s.name = "", s.type = "", s.extension = "", s.uploadedPercentage = 0, o()
        }

        function p(g) {
            s.name = g.name, s.type = g.type, s.extension = g.extension
        }
        const d = g => {
            const v = g == null ? void 0 : g[0];
            if (!v) {
                u();
                return
            }
            if (v.size <= 0) {
                t.setSnackbar(gt.Message.EMPTY_FILE, gt.Type.ERROR), u();
                return
            }
            if (!Yv.includes(v.type)) {
                t.setSnackbar(gt.Message.INVALID_FILE_TYPE, gt.Type.ERROR), u();
                return
            }
            if (v.size > Qv) {
                t.setSnackbar(gt.Message.FILE_TOO_LARGE, gt.Type.ERROR), u();
                return
            }
            const {
                name: w,
                extension: y
            } = Vp(v.name, v.type);
            if (!y) {
                t.setSnackbar(gt.Message.EXTENSION_EXTRACTION_FAILURE, gt.Type.ERROR), u();
                return
            }
            p({
                name: w,
                type: v.type,
                extension: y
            })
        };
        return a(g => {
            d(g)
        }), {
            enabled: n,
            file: s,
            setIsUploading: l,
            resetFile: u,
            fileChanged: d,
            setFile: p,
            openFileDialog: i,
            selectedFiles: r,
            setFileConfig: c
        }
    }),
    Fa = He($e.USER, () => {
        const e = De({
            UID: void 0,
            referer: window.location.href,
            userAgent: window.navigator.userAgent
        });
        return {
            user: e,
            setUser: n => {
                e.UID = n.UID
            }
        }
    }, {
        persist: {
            key: $e.USER
        }
    }),
    hr = He(We.MODAL, () => {
        const e = De({
            active: ae.RESET,
            [ae.RESET]: {
                title: "Reset conversation",
                text: "Are you sure you want to reset the conversation?",
                buttons: {
                    decline: "No",
                    accept: "Yes"
                }
            },
            [ae.LANGUAGE_DETECTED]: {
                title: "{language} detected",
                text: "We detected a new language. Do you want to automatically translate our answers to {language}?",
                buttons: {
                    decline: "No",
                    accept: "Yes"
                }
            },
            text: "",
            buttons: void 0
        });

        function t(s) {
            e.active = s, e[s] && (e.text = e[s].text, e.buttons = e[s].buttons)
        }

        function n(s) {
            e[ae.RESET] = s.reset.modal, e[ae.LANGUAGE_DETECTED] = s.translation.modal
        }
        return {
            modal: e,
            setContent: t,
            setModals: n
        }
    }, {
        persist: {
            key: We.MODAL
        }
    }),
    Si = He(We.MENU, () => {
        const e = De({
            title: "menu title",
            items: []
        });

        function t(n) {
            e.title = n.title, e.items = n.items
        }
        return {
            menuConfig: e,
            setMenuConfig: t
        }
    }, {
        persist: {
            key: We.MENU
        }
    }),
    hn = He(We.SHEET, () => {
        var o, a;
        const e = ga(),
            t = Si(e),
            n = hr(e),
            s = De({
                isOpen: !1,
                heightState: ls.DEFAULT,
                hasPreviousButton: !1,
                hasCloseButton: !0,
                contentType: At.MENU,
                title: t.menuConfig.title,
                [ae.MENU]: {
                    heightState: ls.DEFAULT,
                    hasPreviousButton: !1,
                    hasCloseButton: !0,
                    contentType: At.MENU,
                    title: t.menuConfig.title
                },
                [ae.RESET]: {
                    heightState: ls.DEFAULT,
                    hasPreviousButton: !0,
                    hasCloseButton: !0,
                    contentType: At.MODAL,
                    title: (o = t.menuConfig.items.find(({
                        type: c
                    }) => c === ae.RESET)) == null ? void 0 : o.text
                },
                [ae.LANGUAGE_DETECTED]: {
                    heightState: ls.DEFAULT,
                    hasPreviousButton: !1,
                    hasCloseButton: !0,
                    contentType: At.MODAL,
                    title: n.modal[ae.LANGUAGE_DETECTED].title
                },
                [ae.LANGUAGE_SELECT]: {
                    heightState: ls.FULLHEIGHT,
                    hasPreviousButton: !0,
                    hasCloseButton: !0,
                    contentType: At.LANGUAGE,
                    title: (a = t.menuConfig.items.find(({
                        type: c
                    }) => c === ae.LANGUAGE_SELECT)) == null ? void 0 : a.text
                }
            });

        function r(c) {
            s.heightState = s[c].heightState, s.hasPreviousButton = s[c].hasPreviousButton, s.hasCloseButton = s[c].hasCloseButton, s.title = s[c].title || "", s.contentType = s[c].contentType
        }

        function i() {
            s.isOpen = !s.isOpen
        }
        return {
            state: s,
            toggleSheet: i,
            setContent: r
        }
    }, {
        persist: {
            key: We.SHEET
        }
    }),
    sy = ["data-state"],
    ry = I("label", {
        for: "chat-input",
        class: "sr-only"
    }, "Type your message", -1),
    iy = ["placeholder", "onKeydown"],
    oy = {
        class: "wc-c-input__submit",
        "data-cmwc-test-id": "question-submit"
    },
    Gp = he({
        __name: "Input",
        setup(e) {
            const {
                textarea: t,
                input: n
            } = iw({
                onResize: () => g()
            }), {
                elementState: s,
                setElementStateOnEvent: r
            } = Rp(), i = xe("app"), o = Ti(i.pinia), a = Me(i.pinia), c = Np(i.pinia), l = Fa(i.sessionPinia), u = qt(i.sessionPinia), p = Ze(i.sessionPinia), d = async () => {
                var S;
                if (o.file.isUploading) return;
                const w = (S = o.selectedFiles) == null ? void 0 : S[0],
                    y = [];
                if (p.state.livechat.active || u.cancel(), w) {
                    o.setIsUploading(!0);
                    try {
                        const R = await i.cmupload.upload(l.user.UID, w, V => {
                                o.file.uploadedPercentage = V.progress
                            }),
                            E = uw(w.name, R.data, o.file.type);
                        y.push(E), o.resetFile()
                    } catch (R) {
                        console.error(R), n.value = "", a.setSnackbar(gt.Message.UPLOAD_FAILURE, gt.Type.ERROR), o.resetFile();
                        return
                    }
                }
                const x = Oa.sanitize(n.value, {
                    USE_PROFILES: {
                        html: !1,
                        svg: !1,
                        svgFilters: !1,
                        mathMl: !1
                    }
                }).trim();
                if (x) {
                    const R = cn(x);
                    y.push(R)
                }
                y.length !== 0 && (i.caic.ask(y, x), n.value = "")
            };

            function g() {
                if (n.value === "") {
                    const y = window.getComputedStyle(t.value).getPropertyValue("line-height") || "24px";
                    t.value.style.height = y
                }
            }
            return hn(i.pinia).$subscribe((w, y) => {
                y.state.isOpen || t.value.focus()
            }), (w, y) => b(o).file.isUploading ? Ee("", !0) : (P(), H("form", {
                key: 0,
                class: "wc-c-input wc-c-input--clean",
                "data-cmwc-test-id": "question-form",
                "data-state": [...b(s)],
                "data-border": "focusTopBorder",
                "aria-label": "Chat message input"
            }, [ry, Ks(I("textarea", {
                id: "chat-input",
                ref_key: "textarea",
                ref: t,
                "onUpdate:modelValue": y[0] || (y[0] = x => Ne(n) ? n.value = x : null),
                class: "wc-c-input__field",
                "data-cmwc-test-id": "question-input",
                placeholder: b(c).inputConfig.placeholder,
                "aria-required": "true",
                onKeydown: Mt(Sn(d, ["prevent"]), ["enter"]),
                onFocus: y[1] || (y[1] = (...x) => b(r) && b(r)(...x)),
                onFocusout: y[2] || (y[2] = (...x) => b(r) && b(r)(...x))
            }, null, 40, iy), [
                [np, b(n)]
            ]), I("div", oy, [$(en, {
                "aria-label": "Send message",
                onClick: d,
                onKeydown: Mt(Sn(d, ["prevent"]), ["enter"])
            }, {
                default: Y(() => [$(un, null, {
                    default: Y(() => [$(Kw)]),
                    _: 1
                })]),
                _: 1
            }, 8, ["onKeydown"]), b(o).enabled || b(p).state.livechat.active && !b(o).file.isUploading ? (P(), Te(en, {
                key: 0,
                "aria-label": "Attach file to message",
                "aria-describedby": "fileUploadHeader",
                onClick: b(o).openFileDialog,
                onKeydown: Mt(Sn(b(o).openFileDialog, ["prevent"]), ["enter"])
            }, {
                default: Y(() => [$(un, null, {
                    default: Y(() => [$(ev)]),
                    _: 1
                })]),
                _: 1
            }, 8, ["onClick", "onKeydown"])) : Ee("", !0)])], 8, sy))
        }
    }),
    Kp = he({
        __name: "Option",
        props: {
            optionAction: {}
        },
        setup(e) {
            return (t, n) => (P(), H("button", {
                class: "wc-c-option",
                role: "menuitem",
                onClick: n[0] || (n[0] = (...s) => t.optionAction && t.optionAction(...s)),
                onKeydown: n[1] || (n[1] = Mt((...s) => t.optionAction && t.optionAction(...s), ["enter"]))
            }, [_t(t.$slots, "default")], 32))
        }
    }),
    ay = he({
        __name: "Dialog",
        emits: ["scrollConversation"],
        setup(e, {
            emit: t
        }) {
            const n = xe("conversationReference");

            function s() {
                n != null && n.value && za(n.value.$el)
            }
            return (r, i) => (P(), Te(ar, {
                name: "wc-c-dialog",
                class: "wc-c-dialog",
                tag: "ol",
                appear: "",
                onEnter: s
            }, {
                default: Y(() => [_t(r.$slots, "default")]),
                _: 3
            }))
        }
    }),
    xs = He(We.AGENT, () => {
        const e = De({
                avatarUrl: "",
                name: "",
                description: ""
            }),
            t = De({
                avatarUrl: e.avatarUrl,
                name: e.name,
                description: e.description
            });

        function n(r) {
            if (!r) {
                Object.assign(t, e);
                return
            }
            t.avatarUrl = r.avatarUrl, t.name = r.name, t.description = r.description
        }

        function s(r) {
            e.avatarUrl = r.avatarUrl, e.name = r.name, e.description = r.description
        }
        return {
            agentConfig: e,
            setAgentConfig: s,
            agent: t,
            setAgent: n
        }
    }, {
        persist: {
            key: We.AGENT
        }
    }),
    cy = {
        key: 0,
        class: "wc-c-loader"
    },
    ly = {
        class: "wc-c-loader__avatar"
    },
    uy = ["src"],
    py = I("ol", {
        class: "wc-c-loader__indicator"
    }, [I("li", {
        class: "wc-c-loader__bubble"
    }), I("li", {
        class: "wc-c-loader__bubble"
    }), I("li", {
        class: "wc-c-loader__bubble"
    })], -1),
    dy = he({
        __name: "Loader",
        setup(e) {
            const t = xe("app"),
                n = Ze(t.sessionPinia),
                s = xs(t.pinia);
            return (r, i) => b(n).state.isLoading ? (P(), H("div", cy, [I("figure", ly, [I("img", {
                src: b(s).agent.avatarUrl,
                class: "wc-c-avatar wc-c-avatar--small"
            }, null, 8, uy)]), py])) : Ee("", !0)
        }
    }),
    fy = ["data-dialog-path", "data-id", "aria-posinset", "aria-setsize"],
    hy = ["datetime"],
    my = ["aria-posinset", "aria-setsize"],
    Wp = he({
        __name: "Conversation",
        setup(e) {
            const t = xe("app"),
                n = lr(t.sessionPinia),
                s = fn(t.sessionPinia),
                r = Ze(t.sessionPinia),
                i = (d, g) => async v => {
                    v.preventDefault();
                    const w = [cn(d)];
                    t.caic.ask(w, d, g)
                }, o = {
                    [vt.MESSAGEGROUP]: Xt(() => Promise.resolve().then(() => A0)),
                    [vt.DIVIDER]: Xt(() => Promise.resolve().then(() => C0))
                }, a = Xn(), c = Xn(), l = ce(null);
            yi("conversationReference", l);

            function u() {
                var d;
                l != null && l.value && za((d = l.value) == null ? void 0 : d.$el)
            }
            const p = Qn(() => n.conversation.length + (s.dialog.options.length > 0 ? 1 : 0));
            return (d, g) => (P(), Te(ar, {
                ref_key: "conversationReference",
                ref: l,
                name: "wc-c-conversation",
                class: "wc-c-conversation",
                tag: "ol",
                appear: "",
                "aria-live": "polite",
                role: "log",
                "aria-relevant": "all",
                "aria-busy": b(r).state.isLoading,
                onEnter: u
            }, {
                default: Y(() => [(P(!0), H(Pe, null, Wn(b(n).conversation, (v, w) => (P(), H("li", {
                    key: v.id,
                    "data-dialog-path": v.type === b(vt).MESSAGEGROUP ? v.dialogPath : void 0,
                    "data-id": v.id,
                    class: "wc-c-conversation__item",
                    "aria-posinset": w + 1,
                    "aria-setsize": p.value
                }, [(P(), Te(ir(o[v.type]), {
                    content: v,
                    "data-cmwc-test-id": "message-group"
                }, {
                    default: Y(() => [I("li", null, [I("time", {
                        datetime: v.createdOn,
                        "aria-hidden": "true"
                    }, Re(v.createdOn), 9, hy)])]),
                    _: 2
                }, 1032, ["content"]))], 8, fy))), 128)), b(s).dialog.options && b(s).dialog.options.length > 0 ? (P(), H("li", {
                    key: b(c),
                    class: "wc-c-conversation__item",
                    "aria-posinset": p.value,
                    "aria-setsize": p.value
                }, [$(ay, {
                    role: "menu",
                    "aria-label": "Chat options",
                    "aria-orientation": "vertical"
                }, {
                    default: Y(() => [(P(!0), H(Pe, null, Wn(b(s).dialog.options, ({
                        title: v,
                        id: w
                    }) => (P(), H("li", {
                        key: w,
                        class: "wc-c-dialog__item",
                        role: "presentation"
                    }, [$(Kp, {
                        "option-action": i(v, b(s).dialog.dialogPath)
                    }, {
                        default: Y(() => [or(Re(v), 1)]),
                        _: 2
                    }, 1032, ["option-action"])]))), 128))]),
                    _: 1
                })], 8, my)) : Ee("", !0), b(r).state.isLoading ? (P(), H("li", {
                    key: b(a),
                    "aria-hidden": "true"
                }, [$(dy)])) : Ee("", !0)]),
                _: 1
            }, 8, ["aria-busy"]))
        }
    }),
    gy = {},
    wy = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        style: {
            transform: "translateY(1px)"
        },
        role: "img"
    },
    vy = I("title", null, "Collapse", -1),
    yy = I("path", {
        fill: "#grey",
        "fill-rule": "evenodd",
        d: "M12 15a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 1 1 1.414-1.414L12 12.586l4.293-4.293a.999.999 0 1 1 1.414 1.414l-5 5A.997.997 0 0 1 12 15"
    }, null, -1),
    by = [vy, yy];

function _y(e, t) {
    return P(), H("svg", wy, by)
}
const xy = ot(gy, [
        ["render", _y]
    ]),
    ky = ["aria-expanded"],
    Ey = ["src"],
    Ay = he({
        __name: "Fab",
        setup(e) {
            const t = xe("app"),
                n = Me(t.pinia),
                s = ur(t.sessionPinia);
            return (r, i) => (P(), H("button", {
                "aria-expanded": !b(n).state.minimized,
                "aria-label": "Open chat window",
                type: "button",
                class: "wc-c-fab",
                "data-cmwc-test-id": "open-button",
                onClick: i[0] || (i[0] = () => {
                    b(s).resetNotification(), b(n).toggleChatWindow()
                })
            }, [b(n).state.minimized ? (P(), H("img", {
                key: 0,
                src: b(n).state.floatingActionButton,
                class: "wc-c-fab__image"
            }, null, 8, Ey)) : (P(), Te(xy, {
                key: 1,
                class: "wc-c-fab__icon"
            }))], 8, ky))
        }
    });
var Qp = (e => (e.DEVELOPMENT = "cms", e.STAGING = "staging", e.PRODUCTION = "production", e))(Qp || {});
const Ty = {
        class: "wc-c-header",
        "aria-labelledby": "agentName agentDescription"
    },
    Sy = {
        key: 0,
        class: "wc-c-header__environment-banner"
    },
    Cy = I("small", null, "Warning: Development Environment", -1),
    Oy = [Cy],
    Ry = {
        class: "wc-c-header__content",
        role: "presentation"
    },
    Yp = he({
        __name: "Header",
        setup(e) {
            const t = xe("app"),
                n = Me(t.pinia),
                s = Qn(() => n.state.environment === Qp.DEVELOPMENT),
                r = Qn(() => s.value && !n.previewMode);
            return (i, o) => (P(), H("header", Ty, [r.value ? (P(), H("span", Sy, Oy)) : Ee("", !0), I("div", Ry, [_t(i.$slots, "agent"), _t(i.$slots, "action")])]))
        }
    }),
    Ny = ["src"],
    Xp = he({
        __name: "Avatar",
        props: {
            agent: {}
        },
        setup(e) {
            return (t, n) => t.agent ? (P(), H("img", {
                key: 0,
                src: t.agent.avatarUrl,
                class: "wc-c-avatar",
                alt: ""
            }, null, 8, Ny)) : Ee("", !0)
        }
    }),
    Ly = {
        class: "wc-c-agent"
    },
    Iy = {
        class: "wc-c-agent__avatar"
    },
    Py = {
        class: "wc-c-agent__hgroup"
    },
    Dy = {
        id: "agentName",
        class: "wc-c-agent__name"
    },
    $y = {
        id: "agentDescription",
        class: "wc-c-agent__description"
    },
    Jp = he({
        __name: "Agent",
        setup(e) {
            const t = xe("app"),
                n = xs(t.pinia);
            return (s, r) => (P(), H("article", Ly, [I("figure", Iy, [b(n).agent.avatarUrl ? (P(), Te(Xp, {
                key: 0,
                agent: b(n).agent
            }, null, 8, ["agent"])) : Ee("", !0)]), I("hgroup", Py, [I("h1", Dy, Re(b(n).agent.name), 1), I("p", $y, Re(b(n).agent.description), 1)])]))
        }
    }),
    ts = He($e.FAQ, () => {
        const e = ce([]),
            t = ce(!1);

        function n(i) {
            e.value = i
        }

        function s() {
            e.value = []
        }

        function r(i) {
            t.value = i
        }
        return {
            setFaqs: n,
            resetFaqs: s,
            enableFaqs: r,
            faqs: e,
            enabled: t
        }
    }, {
        persist: {
            key: $e.FAQ
        }
    }),
    zy = ["data-show"],
    Zp = he({
        __name: "Action",
        setup(e) {
            const t = xe("app"),
                n = ts(t.sessionPinia);
            return (s, r) => (P(), H("menu", {
                class: "wc-c-action",
                "aria-label": "chat menu",
                role: "menubar",
                "data-show": !b(n).enabled
            }, [_t(s.$slots, "default")], 8, zy))
        }
    }),
    My = ["open"],
    Fy = ["data-state"],
    Uy = {
        class: "wc-c-sheet__content"
    },
    ed = he({
        __name: "Sheet",
        setup(e) {
            const t = xe("app"),
                n = hn(t.pinia);

            function s() {
                n.state.isOpen = !1, n.setContent(ae.MENU)
            }
            return (r, i) => (P(), Te(Yn, {
                name: "wc-c-sheet",
                appear: ""
            }, {
                default: Y(() => [b(n).state.isOpen ? (P(), H("section", {
                    key: 0,
                    class: "wc-c-sheet",
                    open: b(n).state.isOpen,
                    role: "region",
                    "aria-labelledby": "sheetHeader menuHeader",
                    onKeyup: i[0] || (i[0] = Mt(o => s(), ["esc"]))
                }, [I("div", {
                    class: "wc-c-sheet__scrim",
                    onClick: s
                }), $(Yn, {
                    name: "wc-c-sheet__container",
                    appear: ""
                }, {
                    default: Y(() => [I("dialog", {
                        class: "wc-c-sheet__container",
                        "data-state": b(n).state.heightState,
                        "aria-labelledby": "sheetHeader menuHeader"
                    }, [_t(r.$slots, "header"), I("div", Uy, [_t(r.$slots, "content")])], 8, Fy)]),
                    _: 3
                })], 40, My)) : Ee("", !0)]),
                _: 3
            }))
        }
    });

function By(e, t) {
    if (!e) return;
    const n = e.querySelectorAll("a[data-interactionId]");
    !n || n.length === 0 || n.forEach(s => s.addEventListener("click", t))
}
const td = he({
        __name: "Bubble",
        props: {
            modifier: String
        },
        setup(e) {
            const t = xe("app"),
                n = ce(),
                s = function(r) {
                    const i = r.currentTarget,
                        o = i.href,
                        a = i.getAttribute("data-id"),
                        c = i.getAttribute("data-interactionid");
                    if (!o || !a || !c) return console.error("invalid sendLinkClick payload");
                    t.caic.linkClick(o, a, c)
                };
            return xp(n, r => {
                !n.value || Ll(n.value, t)
            }), dn(() => {
                !n.value || (Ll(n.value, t, !0), By(n.value, s))
            }), (r, i) => (P(), H("div", {
                ref_key: "bubbleElement",
                ref: n,
                class: ms(`wc-c-bubble ${e.modifier}`)
            }, null, 2))
        }
    }),
    jy = ["data-layout", "aria-posinset", "aria-setsize"],
    qy = he({
        __name: "Notification",
        setup(e) {
            const t = xe("app"),
                n = ur(t.sessionPinia),
                s = Ze(t.sessionPinia),
                r = Me(t.pinia),
                i = () => {
                    n.resetNotification(), r.toggleChatWindow()
                };
            return (o, a) => b(r).state.minimized ? (P(), Te(ar, {
                key: 0,
                name: "wc-c-notification",
                class: "wc-c-notification",
                tag: "ol",
                "aria-live": "polite",
                role: "log",
                "aria-relevant": "all",
                "aria-busy": b(s).state.isLoading,
                appear: "",
                "data-cmwc-test-id": "wc-c-notification"
            }, {
                default: Y(() => [(P(!0), H(Pe, null, Wn(b(n).notifications, (c, l) => (P(), H("li", {
                    key: c.id,
                    class: "wc-c-notification__item",
                    "data-layout": c.direction,
                    "aria-posinset": l + 1,
                    "aria-setsize": b(n).notifications.length,
                    onClick: i
                }, [c.text && c.$type === "text" ? (P(), Te(td, {
                    key: 0,
                    modifier: "wc-c-bubble--clean",
                    innerHTML: c.text
                }, null, 8, ["innerHTML"])) : Ee("", !0)], 8, jy))), 128))]),
                _: 1
            }, 8, ["aria-busy"])) : Ee("", !0)
        }
    }),
    Hy = {},
    Vy = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    Gy = I("title", null, "Close", -1),
    Ky = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M13.4261944,11.9997479 L17.7050296,7.72091264 C17.9016765,7.52426573 18.0005042,7.26610362 18.0005042,7.00794151 C18.0005042,6.7497794 17.9016765,6.49262574 17.7050296,6.29497038 C17.3107273,5.90167654 16.6723812,5.90167654 16.2790874,6.29497038 L12.0002521,10.5738056 L7.72141687,6.29497038 C7.32812303,5.90167654 6.68977688,5.90167654 6.2954746,6.29497038 C6.09882768,6.49262574 6,6.7497794 6,7.00794151 C6,7.26610362 6.09882768,7.52426573 6.2954746,7.72091264 L10.5743098,11.9997479 L6.2954746,16.2785831 C6.09882768,16.4752301 6,16.7333922 6,16.9915543 C6,17.2497164 6.09882768,17.50687 6.2954746,17.7045254 C6.49312996,17.9011723 6.75028363,18 7.00844573,18 C7.26660784,18 7.52476995,17.9011723 7.72141687,17.7045254 L12.0002521,13.4256902 L16.2790874,17.7045254 C16.4757343,17.9011723 16.7338964,18 16.9920585,18 C17.2502206,18 17.5073743,17.9011723 17.7050296,17.7045254 C17.9016765,17.50687 18.0005042,17.2497164 18.0005042,16.9915543 C18.0005042,16.7333922 17.9016765,16.4752301 17.7050296,16.2785831 L13.4261944,11.9997479 Z"
    }, null, -1),
    Wy = [Gy, Ky];

function Qy(e, t) {
    return P(), H("svg", Vy, Wy)
}
const Ua = ot(Hy, [
        ["render", Qy]
    ]),
    Yy = {},
    Xy = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        role: "img"
    },
    Jy = I("title", null, "Back", -1),
    Zy = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M5.305 12.72a.997.997 0 0 1 .01-1.45l4.978-4.977a.999.999 0 1 1 1.414 1.414L8.414 11H18a1 1 0 0 1 0 2H8.414l3.293 3.293a.999.999 0 1 1-1.414 1.414L5.305 12.72Z"
    }, null, -1),
    eb = [Jy, Zy];

function tb(e, t) {
    return P(), H("svg", Xy, eb)
}
const nb = ot(Yy, [
        ["render", tb]
    ]),
    sb = {
        class: "wc-c-sheet__header"
    },
    rb = {
        id: "sheetHeader",
        class: "wc-c-sheet__title"
    },
    nd = he({
        __name: "SheetHeader",
        setup(e) {
            const t = xe("app"),
                n = hn(t.pinia),
                s = ts(t.sessionPinia);

            function r() {
                n.setContent(ae.MENU)
            }

            function i() {
                n.setContent(ae.MENU), n.state.isOpen = !1
            }
            return (o, a) => (P(), H("header", sb, [b(n).state.hasPreviousButton ? (P(), Te(en, {
                key: 0,
                "data-show": !b(s).enabled && b(n).state.hasPreviousButton,
                class: "wc-c-icon-button--left",
                "aria-label": "Return to previous menu",
                onClick: r
            }, {
                default: Y(() => [$(nb)]),
                _: 1
            }, 8, ["data-show"])) : Ee("", !0), I("h2", rb, [_t(o.$slots, "title")]), b(n).state.hasCloseButton ? (P(), Te(en, {
                key: 1,
                "aria-label": "Close menu",
                onClick: i,
                onKeydown: Mt(Sn(i, ["prevent"]), ["enter"])
            }, {
                default: Y(() => [$(Ua)]),
                _: 1
            }, 8, ["onKeydown"])) : Ee("", !0)]))
        }
    }),
    ib = {},
    ob = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    ab = I("title", null, "File", -1),
    cb = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "m16 2 4 4v12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h8Zm-2 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8h-1a3 3 0 0 1-3-3V4Zm1 12a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h6Zm0-4a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2h6Z"
    }, null, -1),
    lb = [ab, cb];

function ub(e, t) {
    return P(), H("svg", ob, lb)
}
const sd = ot(ib, [
        ["render", ub]
    ]),
    pb = {
        key: 0
    },
    db = {
        role: "status",
        "aria-live": "polite",
        class: "sr-only"
    },
    fb = {
        class: "wc-c-file-upload__data"
    },
    hb = {
        id: "fileUploadHeader",
        class: "wc-c-file-upload__header"
    },
    mb = {
        for: "progress-bar"
    },
    gb = {
        key: 0,
        class: "wc-c-file-upload__progress"
    },
    wb = ["value"],
    rd = he({
        __name: "FileUpload",
        setup(e) {
            const t = xe("app"),
                n = Ti(t.pinia);

            function s() {
                n.resetFile()
            }
            return (r, i) => (P(), Te(Yn, {
                class: "wc-c-file-upload",
                name: "wc-c-file-upload",
                appear: ""
            }, {
                default: Y(() => [b(n).file.extension.length > 0 ? (P(), H("div", pb, [I("div", db, Re(`File ${b(n).file.name}${b(n).file.extension} selected`), 1), $(un, null, {
                    default: Y(() => [$(sd, {
                        class: "wc-c-file-upload__icon"
                    })]),
                    _: 1
                }), I("div", fb, [I("div", hb, [I("label", mb, Re(b(n).file.name), 1), I("span", null, Re(b(n).file.extension), 1)]), b(n).file.isUploading ? (P(), H("div", gb, [I("progress", {
                    id: "progress-bar",
                    max: "1",
                    value: `${b(n).file.uploadedPercentage}`
                }, null, 8, wb)])) : Ee("", !0)]), b(n).file.isUploading ? Ee("", !0) : (P(), Te(en, {
                    key: 0,
                    "aria-label": `Remove attachment: ${b(n).file.name}${b(n).file.extension}`,
                    onClick: s,
                    onKeydown: Mt(Sn(s, ["prevent"]), ["enter"])
                }, {
                    default: Y(() => [$(un, null, {
                        default: Y(() => [$(Ua)]),
                        _: 1
                    })]),
                    _: 1
                }, 8, ["aria-label", "onKeydown"]))])) : Ee("", !0)]),
                _: 1
            }))
        }
    }),
    vb = {},
    yb = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    bb = I("title", null, "Menu", -1),
    _b = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2",
        style: {
            transform: "rotate(90deg)",
            "transform-origin": "center"
        }
    }, null, -1),
    xb = [bb, _b];

function kb(e, t) {
    return P(), H("svg", yb, xb)
}
const id = ot(vb, [
        ["render", kb]
    ]),
    fs = (e, t, n, s) => {
        if (!e.parentNode || !t || !n) return;
        const r = e.parentNode.querySelector(`#${t}`),
            i = r || document.createElement("style");
        i.textContent = n, !r && (i.id = t, e.insertAdjacentElement(s, i))
    },
    Eb = {
        key: 0,
        class: "wc-c-snackbar",
        role: "alert",
        "aria-live": "polite"
    },
    Ab = ["data-state"],
    Tb = {
        class: "wc-c-snackbar__content"
    },
    od = he({
        __name: "Snackbar",
        setup(e) {
            const t = xe("app"),
                n = Me(t.pinia);
            return (s, r) => (P(), Te(Yn, {
                name: "wc-c-snackbar"
            }, {
                default: Y(() => [b(n).state.snackbar.active ? (P(), H("dialog", Eb, [I("span", {
                    class: "wc-c-snackbar__type",
                    "data-state": `${b(n).state.snackbar.type}`
                }, null, 8, Ab), I("p", Tb, Re(b(n).state.snackbar.text), 1)])) : Ee("", !0)]),
                _: 1
            }))
        }
    }),
    Sb = ["aria-expanded"],
    Cb = {
        class: "wc-c-backdrop"
    },
    Ob = {
        class: "wc-c-backdrop__backlayer"
    },
    Rb = {
        role: "menuitem"
    },
    Nb = {
        role: "menuitem"
    },
    Lb = {
        class: "wc-c-backdrop__frontlayer"
    },
    Ib = he({
        __name: "Floating.ce",
        props: {
            instancekey: {}
        },
        setup(e) {
            const {
                instancekey: t
            } = e, n = window.cmwc.getByInstanceKey(t);
            if (!n) throw new Error("Chat instance is undefined ");
            yi("app", n);
            const s = hn(n.pinia),
                r = Me(n.pinia),
                i = ur(n.sessionPinia),
                o = ce(),
                a = {
                    [At.LANGUAGE]: Xt(() => Promise.resolve().then(() => zd)),
                    [At.MENU]: Xt(() => Promise.resolve().then(() => ld)),
                    [At.MODAL]: Xt(() => Promise.resolve().then(() => Md))
                };
            Eu(() => {
                !o.value || (r.state.style && fs(o.value, "style", r.state.style, "beforebegin"), r.state.customStyle && fs(o.value, "customStyle", r.state.customStyle, "beforebegin"), r.previewMode && fs(o.value, "previewStyle", ".wc-c-root { position: absolute; padding: 32px;}", "beforebegin"))
            }), dn(() => {
                qt(n.sessionPinia).resumeStalledQueue()
            });

            function c() {
                i.resetNotification(), r.setMinimized(!0)
            }
            return (l, u) => Ks((P(), H("div", {
                ref_key: "rootElement",
                ref: o,
                class: "wc-c-root"
            }, [$(Ay), $(Yn, {
                name: "wc-c-chat"
            }, {
                default: Y(() => [Ks(I("main", {
                    class: "wc-c-chat",
                    "data-cmwc-test-id": "chat",
                    "aria-expanded": !b(r).state.minimized,
                    "aria-labelledby": "agentName agentDescription",
                    onKeyup: u[4] || (u[4] = Mt(p => c(), ["esc"]))
                }, [I("div", Cb, [I("div", Ob, [$(Yp, null, {
                    agent: Y(() => [$(Jp)]),
                    action: Y(() => [$(Zp, null, {
                        default: Y(() => [I("li", Rb, [$(en, {
                            class: "wc-c-icon-button--primary",
                            "aria-label": "Chat options \u2026",
                            "aria-expanded": b(s).state.isOpen,
                            onClick: u[0] || (u[0] = p => b(s).toggleSheet()),
                            onKeydown: u[1] || (u[1] = Mt(Sn(p => b(s).toggleSheet(), ["prevent"]), ["enter"]))
                        }, {
                            default: Y(() => [$(id)]),
                            _: 1
                        }, 8, ["aria-expanded"])]), I("li", Nb, [$(en, {
                            class: "wc-c-icon-button--primary",
                            "aria-label": "Close chat",
                            "aria-expanded": !b(r).state.minimized,
                            onClick: u[2] || (u[2] = p => c()),
                            onKeydown: u[3] || (u[3] = Mt(Sn(p => c(), ["prevent"]), ["enter"]))
                        }, {
                            default: Y(() => [$(Ua)]),
                            _: 1
                        }, 8, ["aria-expanded"])])]),
                        _: 1
                    })]),
                    _: 1
                })]), I("div", Lb, [$(od), $(Wp), $(rd), $(Gp), $(ed, null, {
                    header: Y(() => [$(nd, null, {
                        title: Y(() => [or(Re(b(s).state.title), 1)]),
                        _: 1
                    })]),
                    content: Y(() => [(P(), Te(ir(a[b(s).state.contentType])))]),
                    _: 1
                })])])], 40, Sb), [
                    [xo, !b(r).state.minimized]
                ])]),
                _: 1
            }), $(qy)], 512)), [
                [xo, b(r).state.visible]
            ])
        }
    }),
    Pb = `:host{--wc-ref-primary: #0074e8;--wc-ref-primary-variant: #0658a5;--wc-ref-neutral: #fff;--wc-ref-neutral-variant: #f2f2f2}:host{--wc-sys-primary: var(--wc-ref-primary);--wc-sys-primary-inverted: #fff;--wc-sys-primary-contrast: #d6e4f0;--wc-sys-surface: var(--wc-ref-neutral);--wc-sys-surface-inverted: #000;--wc-sys-surface-contrast: #767676;--wc-sys-surface-shade: var(--wc-ref-neutral-variant);--wc-sys-surface-shade-inverted: #000;--wc-sys-active: var(--wc-ref-primary-variant);--wc-sys-active-inverted: #fff;--wc-sys-shadow: #000;--wc-sys-outline: var(--wc-ref-neutral-variant);--wc-sys-warning: #ffa400;--wc-sys-warning-inverted: #fff;--wc-sys-error: #ff495c;--wc-sys-error-inverted: #fff;--wc-sys-success: #3ddc97;--wc-sys-success-inverted: #fff}:host{--wc-sys-space: 1rem;--wc-sys-space-quarter: calc(var(--wc-sys-space) * .25);--wc-sys-space-half: calc(var(--wc-sys-space) * .5);--wc-sys-space-double: calc(var(--wc-sys-space) * 2);--wc-sys-space-triple: calc(var(--wc-sys-space) * 3);--wc-sys-space-quadruple: calc(var(--wc-sys-space) * 4);--wc-sys-gutter: max(var(--wc-sys-space), 5vmin);--wc-sys-constrain-size: 32rem}:host{--wc-sys-radius: 1rem;--wc-sys-border-style: solid;--wc-sys-border-color: var(--wc-sys-outline);--wc-sys-border-size: 2px}:host{--wc-sys-font: "Nunito";--wc-sys-font-size: 1rem;--wc-sys-font-size-tiny: calc(var(--wc-sys-font-size) * .75);--wc-sys-font-size-small: calc(var(--wc-sys-font-size) * .9);--wc-sys-font-size-large: calc(var(--wc-sys-font-size) * 1.1);--wc-sys-line-height: 1.5}:host{--wc-sys-transition-duration: .2s;--wc-sys-transition-timing-function: ease}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes bounce{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}.sr-only{position:absolute;top:auto;left:-10000px;overflow:hidden;width:1px;height:1px}*,*:before,*:after{box-sizing:inherit}p{margin:0}button{padding:0;border:none;background:transparent}figure{margin:0}a:not([class^=wc-c-]){color:var(--wc-sys-surface-balance)}a:not([class^=wc-c-]):hover,a:not([class^=wc-c-]):focus{opacity:.7}.wc-c-action{padding:0;list-style:none;display:flex;margin:0}.wc-c-action>*+*{margin-left:var(--wc-sys-space-quarter)}@container root (min-width: 48rem){.wc-c-action[data-show=false]{display:none}}.wc-c-agent{--wc-c-agent-name-font-weight: 600;--wc-c-agent-name-color: var(--wc-sys-primary-inverted);--wc-c-agent-name-font-size: var(--wc-sys-font-size-large);--wc-c-agent-description-weight: 400;--wc-c-agent-description-color: var(--wc-sys-primary-inverted);--wc-c-agent-description-font-size: var(--wc-sys-font-size-small);display:flex;align-items:center;gap:0 var(--wc-sys-space)}.wc-c-agent__avatar{flex:none}.wc-c-agent__header{flex:auto}.wc-c-agent__name{margin:0;color:var(--wc-c-agent-name-color);font-size:var(--wc-c-agent-name-font-size);font-weight:var(--wc-c-agent-name-font-weight)}.wc-c-agent__description{margin:0;color:var(--wc-c-agent-description-color);font-size:var(--wc-c-agent-description-font-size);font-weight:var(--wc-c-agent-description-weight)}.wc-c-avatar{border-radius:50%;display:block;width:calc(var(--wc-sys-space-triple) + var(--wc-sys-space-half));height:calc(var(--wc-sys-space-triple) + var(--wc-sys-space-half));background-size:contain}.wc-c-avatar--small{width:var(--wc-sys-space-double);height:var(--wc-sys-space-double)}.wc-c-media,.wc-c-bubble{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);width:fit-content;max-width:100%;padding:var(--wc-sys-space);border-radius:var(--wc-sys-radius);background-color:var(--wc-sys-surface);color:var(--wc-sys-surface-inverted);overflow-x:auto;overflow-y:hidden}@supports (-moz-appearance: none){.wc-c-media,.wc-c-bubble{scrollbar-color:var(--wc-sys-surface-shade) transparent;scrollbar-width:thin}}.wc-c-media::-webkit-scrollbar,.wc-c-bubble::-webkit-scrollbar{width:var(--wc-sys-space-half);height:var(--wc-sys-space-half)}.wc-c-media::-webkit-scrollbar-track,.wc-c-bubble::-webkit-scrollbar-track{border-radius:var(--wc-sys-radius);background-color:transparent}.wc-c-media::-webkit-scrollbar-thumb,.wc-c-bubble::-webkit-scrollbar-thumb{border-radius:var(--wc-sys-radius);background-color:var(--wc-sys-surface-shade)}.wc-c-bubble:has(iframe){width:auto;padding:0}.wc-c-bubble--clean{border:0;box-shadow:0 3px 4px -2px #4a4a4a66,0 6px 9px 1px #4a4a4a40,0 2px 11px 2px #4a4a4a1a}.wc-c-media--primary,.wc-c-bubble--primary{border:0;background-color:var(--wc-sys-primary);color:var(--wc-sys-primary-inverted)}.wc-c-media--primary a,.wc-c-bubble--primary a{color:var(--wc-sys-surface-balance)}.wc-c-media--primary a:hover,.wc-c-bubble--primary a:hover,.wc-c-media--primary a:focus,.wc-c-bubble--primary a:focus{opacity:.7}.wc-c-card{--wc-c-card-border-radius: var(--wc-sys-radius);--wc-c-card-font-size: var(--wc-sys-font-size);border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;max-width:calc(15 * var(--wc-sys-space));max-height:calc(24 * var(--wc-sys-space));flex:1 0 100%;flex-direction:column;padding:var(--wc-sys-space);border-radius:var(--wc-c-card-border-radius);justify-items:center;scroll-snap-align:center;scroll-snap-stop:always}.wc-c-card+.wc-c-card{margin-left:var(--wc-sys-space-half)}.wc-c-card__header{flex-shrink:0;padding:var(--wc-sys-space-half) 0;justify-self:start}.wc-c-card__header>.wc-c-card__title-anchor{color:var(--wc-sys-surface-inverted)}.wc-c-card__description{min-width:0;font-size:var(--wc-c-card-font-size);white-space:nowrap}.wc-c-card__title{overflow:hidden;min-width:0;margin:0;font-size:var(--wc-c-card-font-size);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-overflow:ellipsis}.wc-c-card__image{max-width:100%;align-self:center;border-radius:var(--wc-c-card-border-radius)}.wc-c-card__image-anchor{display:flex;flex-direction:column}.wc-c-card__quickreplies{display:flex;overflow:hidden;flex-direction:column;flex-grow:1;flex-shrink:0;justify-content:end;padding:0;margin:0;text-overflow:ellipsis}.wc-c-card__quickreplies-item,.wc-c-card__quickreplies-item .wc-c-option{width:100%}.wc-c-card__quickreplies-item+.wc-c-card__quickreplies-item{margin-top:var(--wc-sys-space-half)}.wc-c-card__quickreplies-item>*{overflow:hidden;max-width:100%;font-size:var(--wc-c-card-font-size);text-overflow:ellipsis;white-space:nowrap}.wc-c-carousel-wrapper{--wc-c-carousel-navigation-button-size: var(--wc-sys-space-double);--wc-c-carousel-navigation-button-hover-color: var(--wc-sys-surface);--wc-c-carousel-navigation-button-hover-background: var(--wc-sys-surface-inverted);position:relative}.wc-c-carousel-wrapper *{overflow:hidden;text-overflow:ellipsis}.wc-c-carousel{scrollbar-width:none;display:flex;max-width:100%;height:auto;padding:0 16px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory}.wc-c-carousel::-webkit-scrollbar{width:0;height:0}.wc-c-carousel__navigation{position:absolute;display:flex;align-items:center;justify-content:space-between;inset:0;pointer-events:none}.wc-c-carousel__navigation-button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);animation:fade-in var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);opacity:1;display:flex;width:var(--wc-c-carousel-navigation-button-size);height:var(--wc-c-carousel-navigation-button-size);align-items:center;justify-content:center;border-radius:50%;background-color:var(--wc-sys-surface-inverted);cursor:pointer;pointer-events:auto;visibility:visible}.wc-c-carousel__navigation-button[data-state=initial]{visibility:hidden}.wc-c-carousel__navigation-button svg path{fill:var(--wc-sys-surface)}.wc-c-carousel__navigation-button:disabled{animation:fade-out var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);opacity:0}.wc-c-carousel__navigation-button:disabled:hover{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);background-color:var(--wc-c-carousel-navigation-button-hover-color)}.wc-c-carousel__navigation-button:disabled:hover svg path{fill:var(--wc-c-carousel-navigation-button-hover-background)}.wc-c-carousel__navigation-button:hover:not(:disabled){transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);background-color:var(--wc-c-carousel-navigation-button-hover-color)}.wc-c-carousel__navigation-button:hover:not(:disabled) svg path{fill:var(--wc-c-carousel-navigation-button-hover-background)}.wc-c-carousel .wc-c-option:disabled{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border-style:double;background-color:var(--wc-c-option-hover-color);color:var(--wc-sys-primary-inverted);cursor:pointer;opacity:.7;pointer-events:none}.wc-c-conversation{padding:0;list-style:none;scrollbar-width:none;padding:var(--wc-sys-space);margin:0;overflow-wrap:break-word;overflow-x:hidden;overflow-y:scroll}.wc-c-conversation::-webkit-scrollbar{width:0;height:0}.wc-c-conversation-move,.wc-c-conversation-enter-active,.wc-c-conversation-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-conversation-enter-from,.wc-c-conversation-leave-to{opacity:0}.wc-c-conversation__item+.wc-c-conversation__item{margin-top:var(--wc-sys-space-double)}.wc-c-dialog{padding:0;margin:0;list-style:none;display:flex;flex-wrap:wrap;justify-content:flex-end;padding-top:var(--wc-sys-space);margin:calc(0px - var(--wc-sys-space-quarter))}.wc-c-dialog-move,.wc-c-dialog-enter-active,.wc-c-dialog-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-dialog-enter-from,.wc-c-dialog-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-dialog__item{margin:var(--wc-sys-space-quarter)}.wc-c-divider{--wc-c-divider-color: var(--wc-sys-surface-contrast);--wc-c-divider-font-weight: bold;--wc-c-divider-font-size: var(--wc-sys-font-size);--wc-c-divider-font-family: var(--wc-sys-font);margin:var(--wc-sys-space) auto;color:var(--wc-c-divider-color);font-family:var(--wc-c-divider-font-family);font-size:var(--wc-c-divider-font-size);font-weight:var(--wc-c-divider-font-weight);text-align:center;text-transform:uppercase}.wc-c-file-upload{--wc-c-file-upload-progress-background-color: var(--wc-sys-surface-shade);--wc-c-file-upload-progress-color: var(--wc-sys-primary);--wc-c-file-upload-progress-padding: var(--wc-sys-space-half) var(--wc-sys-space);--wc-c-file-upload-progress-icon-height: var(--wc-sys-space-double);--wc-c-file-upload-progress-icon-margin: var(--wc-sys-space-quarter);--wc-c-file-upload-progress-icon-color: var(--wc-sys-surface-inverted);--wc-c-file-upload-progress-font-size: var(--wc-sys-font-size-small);--wc-c-file-upload-progress-bar-height: var(--wc-sys-space-quarter);--wc-c-file-upload-progress-bar-margin: var(--wc-sys-space-half);--wc-c-file-upload-progress-bar-radius: calc(var(--wc-sys-radius) / 2);display:flex;overflow:hidden;align-items:center;justify-content:center;padding:var(--wc-c-file-upload-progress-padding)}.wc-c-file-upload-move,.wc-c-file-upload-enter-active,.wc-c-file-upload-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-file-upload-enter-from,.wc-c-file-upload-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-file-upload__icon{height:var(--wc-c-file-upload-progress-icon-height);margin:var(--wc-c-file-upload-progress-icon-margin)}.wc-c-file-upload__icon path{fill:var(--wc-c-file-upload-progress-icon-color)}.wc-c-file-upload__data{display:flex;overflow:hidden;width:100%;flex-direction:column}.wc-c-file-upload__header{display:flex;width:100%;font-size:var(--wc-c-file-upload-progress-font-size)}.wc-c-file-upload__header label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wc-c-file-upload__progress{display:flex;width:100%}.wc-c-file-upload__progress progress{width:100%;height:var(--wc-c-file-upload-progress-bar-height);border:none;border-radius:var(--wc-c-file-upload-progress-bar-radius);margin-bottom:var(--wc-c-file-upload-progress-bar-margin);appearance:none;background-color:var(--wc-c-file-upload-progress-background-color)}.wc-c-file-upload__progress progress::-moz-progress-bar{border-radius:var(--wc-c-file-upload-progress-bar-radius);background:var(--wc-c-file-upload-progress-color)}.wc-c-file-upload__progress progress::-webkit-progress-bar{border-radius:var(--wc-c-file-upload-progress-bar-radius);background-color:var(--wc-c-file-upload-progress-background-color)}.wc-c-file-upload__progress progress::-webkit-progress-value{border-radius:var(--wc-c-file-upload-progress-bar-radius);background:var(--wc-c-file-upload-progress-color)}.wc-c-header{--wc-c-header-warning-color: var(--wc-sys-warning-inverted);--wc-c-header-warning-background: var(--wc-sys-warning);display:flex;overflow:hidden;flex-direction:column}.wc-c-header__environment-banner{padding:2px var(--wc-sys-space) 2px var(--wc-sys-space);background-color:var(--wc-c-header-warning-background);color:var(--wc-c-header-warning-color)}.wc-c-header__content{display:flex;min-height:var(--wc-sys-space-quadruple);align-items:center;justify-content:space-between;padding:var(--wc-sys-space);background-color:var(--wc-sys-primary);color:var(--wc-sys-primary-inverted)}.wc-c-header__content>*+*{margin-left:var(--wc-sys-space-half)}.wc-c-icon-button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);--wc-c-icon-button-color: var(--wc-sys-surface-inverted);--wc-c-icon-button-background: var(--wc-sys-surface);--wc-c-icon-button-hover-color: var(--wc-sys-active-inverted);--wc-c-icon-button-focus-color: var(--wc-sys-active-inverted);--wc-c-icon-button-hover-background: var(--wc-sys-active);--wc-c-icon-button-focus-background: var(--wc-sys-active);--wc-c-icon-button-width: var(--wc-sys-space-double);--wc-c-icon-button-height: var(--wc-sys-space-double);--wc-c-icon-button-font-weight: normal;--wc-c-icon-button-font-size: var(--wc-sys-font-size--tiny);--wc-c-icon-button-font-family: var(--wc-sys-font);display:flex;min-width:var(--wc-c-icon-button-width);max-width:fit-content;height:var(--wc-c-icon-button-height);align-items:center;padding:var(--wc-sys-space-quarter);border:0;border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-icon-button-background);color:var(--wc-c-icon-button-color);cursor:pointer;font-family:var(--wc-c-icon-button-font-family);font-size:var(--wc-c-icon-button-font-size);font-weight:var(--wc-c-icon-button-font-weight)}.wc-c-icon-button svg{flex:none}.wc-c-icon-button svg path{transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:currentColor}.wc-c-icon-button:hover{background-color:var(--wc-c-icon-button-hover-background);color:var(--wc-c-icon-button-hover-color)}.wc-c-icon-button:hover svg path{fill:currentColor}.wc-c-icon-button:focus{background-color:var(--wc-c-icon-button-focus-background);color:var(--wc-c-icon-button-focus-color)}.wc-c-icon-button:focus svg path{fill:currentColor}.wc-c-icon-button--primary{--wc-c-icon-button-color: var(--wc-sys-primary-inverted);--wc-c-icon-button-hover-color: var(--wc-sys-active-inverted);--wc-c-icon-button-focus-color: var(--wc-sys-active-inverted);--wc-c-icon-button-background: var(--wc-sys-primary);--wc-c-icon-button-hover-background: var(--wc-sys-active);--wc-c-icon-button-focus-background: var(--wc-sys-active)}.wc-c-input{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);--wc-c-input-font-size: var(--wc-sys-font-size);--wc-c-input-font: var(--wc-sys-font);--wc-c-input-line-height: var(--wc-sys-line-height);--wc-c-input-background: var(--wc-sys-surface);--wc-c-input-color: var(--wc-sys-surface-inverted);--wc-c-input-caret-color: var(--wc-sys-font);--wc-c-input-active-color: var(--wc-sys-active);display:flex;align-items:center;padding:var(--wc-sys-space-half) var(--wc-sys-space);border-color:var(--wc-sys-surface-contrast);border-radius:var(--wc-sys-radius);margin:0;background-color:var(--wc-c-input-background)}.wc-c-input *+*{margin-left:var(--wc-sys-space-quarter)}.wc-c-sheet__content>.wc-c-input{margin:var(--wc-sys-space-half);margin-bottom:0}.wc-c-input[data-state~=focus]{transition:border-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border-color:var(--wc-c-input-active-color)!important}.wc-c-input__field{scrollbar-width:none;max-height:100%;flex:auto;padding:0;border:none;margin:0;background-color:transparent;caret-color:var(--wc-c-input-caret-color);color:var(--wc-c-input-color);font-family:var(--wc-c-input-font);font-size:var(--wc-c-input-font-size);line-height:var(--wc-c-input-line-height);overflow-y:scroll;resize:none}.wc-c-input__field::-webkit-scrollbar{width:0;height:0}.wc-c-input__field::placeholder{color:var(--wc-sys-surface-contrast)}.wc-c-input__field:disabled{background-color:red;opacity:.6}.wc-c-input__field:focus:not(:disabled),.wc-c-input__field:active:not(:disabled){border-color:var(--wc-c-input-active-color)!important;outline:none}.wc-c-input__field::-webkit-search-cancel-button{display:none}.wc-c-input__submit{display:flex;flex:none;align-items:end;align-self:end}.wc-c-input__search{display:flex;margin-right:var(--wc-sys-space-half)}.wc-c-input__search>svg>path{fill:var(--wc-sys-surface-inverted)}.wc-c-loader{display:flex;align-items:center}.wc-c-loader__indicator{padding:0;margin:0;list-style:none;display:inline-flex}cxco-o-chat .wc-c-loader__indicator{grid-column:2}.wc-c-loader__avatar{margin-right:var(--wc-sys-space)}.wc-c-loader__bubble{border-radius:50%;width:var(--wc-sys-space-quarter);height:var(--wc-sys-space-quarter);animation:bounce 1s infinite var(--wc-sys-transition-timing-function) both;background-color:var(--wc-sys-surface-inverted)}.wc-c-loader__bubble:nth-child(2n){animation-delay:.1s}.wc-c-loader__bubble:nth-child(3n){animation-delay:.2s}.wc-c-loader__bubble+.wc-c-loader__bubble{margin-left:var(--wc-sys-space-half)}.wc-c-media{--wc-c-media-font-weight: bold;--wc-c-media-font-size: var(--wc-sys-font-size);--wc-c-media-font-family: var(--wc-sys-font)}.wc-c-media__image{max-width:100%;height:auto;border-radius:var(--wc-sys-radius)}.wc-c-media__title{margin:0;color:var(--wc-c-media-color);font-family:var(--wc-c-media-font-family);font-size:var(--wc-c-media-font-size);font-weight:var(--wc-c-media-font-weight);text-transform:uppercase}.wc-c-menu{--wc-c-menu-color: var(--wc-sys-surface-inverted);--wc-c-menu-hover-color: var(--wc-sys-surface-shade-inverted);--wc-c-menu-focus-color: var(--wc-sys-surface-shade-inverted);--wc-c-menu-active-color: var(--wc-sys-active-inverted);--wc-c-menu-background: var(--wc-sys-surface);--wc-c-menu-hover-background: var(--wc-sys-surface-shade);--wc-c-menu-focus-background: var(--wc-sys-surface-shade);--wc-c-menu-active-background: var(--wc-sys-active);--wc-c-menu-width: var(--wc-sys-space-double);--wc-c-menu-height: var(--wc-sys-space-double);--wc-c-menu-font-weight: normal;--wc-c-menu-font-size: var(--wc-sys-font-size);--wc-c-menu-font-family: var(--wc-sys-font);padding:0;margin:0;list-style:none;scrollbar-width:none;padding:var(--wc-sys-space-half);overflow-x:hidden;overflow-y:scroll;scroll-behavior:smooth}.wc-c-menu::-webkit-scrollbar{width:0;height:0}.wc-c-menu__section{max-height:100%;padding:0;margin-top:0}.wc-c-menu__title{margin:var(--wc-sys-space)}.wc-c-menu__button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);display:flex;width:100%;align-items:center;padding:var(--wc-sys-space-half);border:0;border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-menu-background);color:var(--wc-c-menu-color);cursor:pointer;font-family:var(--wc-c-menu-font-family);font-size:var(--wc-c-menu-font-size);font-weight:var(--wc-c-menu-font-weight)}.wc-c-menu__button svg path{transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:var(--wc-c-menu-color)}.wc-c-menu__button:hover{background-color:var(--wc-c-menu-hover-background);color:var(--wc-c-menu-hover-color)}.wc-c-menu__button:hover svg path{fill:currentColor}.wc-c-menu__button:focus{background-color:var(--wc-c-menu-focus-background);color:var(--wc-c-menu-focus-color)}.wc-c-menu__button:focus svg path{fill:currentColor}.wc-c-menu__button[data-state~=true],.wc-c-menu__button[data-state~=true]:hover,.wc-c-menu__button[data-state~=true]:focus{background-color:var(--wc-c-menu-active-background);color:var(--wc-c-menu-active-color)}.wc-c-menu__button[data-state~=true] svg path,.wc-c-menu__button[data-state~=true]:hover svg path,.wc-c-menu__button[data-state~=true]:focus svg path{fill:currentColor}.wc-c-menu__button>*+*{margin-left:var(--wc-sys-space-half)}.wc-c-message-group[data-layout~=ClientOriginated]{margin-left:var(--wc-sys-space-double);grid-template-columns:1fr}.wc-c-message-group[data-layout~=ClientTerminated]{display:grid;margin-right:var(--wc-sys-space-double);column-gap:var(--wc-sys-space-half);grid-template-columns:min-content auto;grid-template-rows:min-content auto;row-gap:var(--wc-sys-space-quarter)}.wc-c-message-group__agent{flex:none;align-self:end;padding-bottom:var(--wc-sys-space);grid-column:1;grid-row:1}.wc-c-message-group__metadata{display:flex;grid-column:2;grid-row:2}[data-layout~=ClientOriginated] .wc-c-message-group__metadata{justify-content:end;grid-column:1}.wc-c-message-group__messages{padding:0;margin:0;list-style:none;display:flex;min-width:0;flex-direction:column;grid-column:2;grid-row:1}[data-layout~=ClientOriginated] .wc-c-message-group__messages{align-items:end}.wc-c-message-group__messages-move,.wc-c-message-group__messages-enter-active,.wc-c-message-group__messages-leave-active{overflow:hidden;transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-message-group__messages-enter-from,.wc-c-message-group__messages-leave-to{overflow:visible;opacity:0;transform:translate(calc(0px - var(--wc-sys-space)))}[data-layout~=ClientOriginated] .wc-c-message-group__messages-enter-from,[data-layout~=ClientOriginated] .wc-c-message-group__messages-leave-to{transform:translate(var(--wc-sys-space))}.wc-c-message-group__message{max-width:100%}.wc-c-message-group__message+.wc-c-message-group__message{margin-top:var(--wc-sys-space-half)}.wc-c-metadata{padding:0;list-style:none;display:flex;align-items:center;padding:0 var(--wc-sys-space);margin:0;font-size:var(--wc-sys-font-size-tiny)}.wc-c-modal{max-height:100%;padding:var(--wc-sys-space)}.wc-c-modal__footer{padding:0;margin:0;list-style:none;display:flex;width:100%;justify-content:flex-end;padding:var(--wc-sys-space-half);padding-top:var(--wc-sys-space);gap:var(--wc-sys-space-half)}.wc-c-option{--wc-c-option-font-size: var(--wc-sys-font-size);--wc-c-option-font: var(--wc-sys-font);--wc-c-option-color: var(--wc-sys-surface-inverted);--wc-c-option-background: var(--wc-sys-surface);--wc-c-option-hover-background: var(--wc-sys-primary-inverted);--wc-c-option-focus-background: var(--wc-sys-active-inverted);--wc-c-option-hover-color: var(--wc-sys-primary);--wc-c-option-focus-color: var(--wc-sys-active);border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size);transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);padding:var(--wc-sys-space-half) var(--wc-sys-space);border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-option-background);color:var(--wc-c-option-color);cursor:pointer;font-family:var(--wc-c-option-font);font-size:var(--wc-c-option-font-size)}.wc-c-option:hover{background-color:var(--wc-c-option-hover-color);color:var(--wc-c-option-hover-background)}.wc-c-option:focus{background-color:var(--wc-c-option-focus-color);color:var(--wc-c-option-focus-background)}.wc-c-option--clean{border:var(--wc-sys-border-style) transparent var(--wc-sys-border-size)}.wc-c-option--clean:hover,.wc-c-option--clean:focus{border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size)}.wc-c-option--icon{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;align-items:center;padding:var(--wc-sys-space-quarter) var(--wc-sys-space-half);border-radius:var(--wc-sys-radius);text-align:left}.wc-c-option--icon svg{flex:none}.wc-c-option--icon svg path{background:var(--wc-c-option-background);transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:var(--wc-c-option-color)}.wc-c-option--icon:hover{background:var(--wc-c-option-hover-color)}.wc-c-option--icon:hover svg path{fill:var(--wc-c-option-hover-background)}.wc-c-option--icon:focus{background:var(--wc-c-option-focus-color)}.wc-c-option--icon:focus svg path{fill:var(--wc-c-option-focus-background)}.wc-c-option--icon:hover,.wc-c-option--icon:focus{border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size)}.wc-c-option--icon *+*{margin-left:var(--wc-sys-space-half)}@container root (min-width: 48rem){.wc-c-option--icon{padding:var(--wc-sys-space-half) var(--wc-sys-space)}}.wc-c-sheet{--wc-c-sheet-title-font-weight: 600;--wc-c-sheet-title-color: var(--wc-sys-surface-inverted);--wc-c-sheet-title-font-size: var(--wc-sys-font-size-large);--wc-c-sheet-background: var(--wc-sys-surface);--wc-c-sheet-color: var(--wc-sys-surface-inverted);position:absolute;top:0;bottom:0;display:grid;width:100%;height:100%;align-items:center;justify-content:center;background:transparent;grid-template-columns:1fr}.wc-c-sheet-move,.wc-c-sheet-enter-active,.wc-c-sheet-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-sheet-enter-from,.wc-c-sheet-leave-to{opacity:0}.wc-c-sheet__scrim{width:100%;height:100%;background-color:var(--wc-sys-shadow);grid-column:1;grid-row:1;opacity:.3}.wc-c-sheet__container{border-top:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);position:absolute;right:0;bottom:0;left:0;display:grid;width:unset;max-width:100%;height:unset;max-height:100%;padding:0;border:0;border-radius:var(--wc-sys-radius) var(--wc-sys-radius) 0 0;margin:0;background-color:var(--wc-c-sheet-background);color:var(--wc-c-sheet-color);grid-column:1;grid-row:1;grid-template-rows:auto 1fr}.wc-c-sheet__container-move,.wc-c-sheet__container-enter-active,.wc-c-sheet__container-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-sheet__container-enter-from,.wc-c-sheet__container-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-sheet__container[data-state~=fullHeight]{height:100%}.wc-c-sheet__menu{padding:0;list-style:none;margin:0}.wc-c-sheet__header{border-bottom:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;align-items:center;justify-content:space-between;padding:var(--wc-sys-space)}.wc-c-sheet__content{display:flex;min-height:0;flex-direction:column;margin:0;grid-column:1;grid-row:2}.wc-c-sheet__title{flex:auto;margin:0;color:var(--wc-c-sheet-title-color);font-size:var(--wc-c-sheet-title-font-size);font-weight:var(--wc-c-sheet-title-font-weight);text-align:center}.wc-c-snackbar{--wc-c-snackbar-background-color: var(--wc-sys-surface-shade);--wc-c-snackbar-shadow: 0 0 5px 0 rgb(16 30 30 / 10%), 0 2px 7px 0 rgb(16 30 30 / 15%), 0 16px 9px -12px rgb(16 30 30 / 20%);--wc-c-snackbar-warning-color: var(--wc-sys-warning);--wc-c-snackbar-error-color: var(--wc-sys-error);--wc-c-snackbar-success-color: var(--wc-sys-success);--wc-c-snackbar-margin: var(--wc-sys-space);--wc-c-snackbar-border-radius: var(--wc-sys-space-half);--wc-c-snackbar-type-width: var(--wc-sys-space-half);--wc-c-snackbar-content-padding: var(--wc-sys-space-half) var(--wc-sys-space);position:static;z-index:1;display:flex;overflow:hidden;max-width:var(--wc-sys-constrain-size);align-items:center;align-self:end;padding:0;border:none;border-radius:var(--wc-c-snackbar-border-radius);margin:var(--wc-c-snackbar-margin);background-color:var(--wc-c-snackbar-background-color);box-shadow:var(--wc-c-snackbar-shadow);color:var(--wc-sys-surface-inverted);grid-column:1;grid-row:2;justify-self:center}.wc-c-snackbar-move,.wc-c-snackbar-enter-active,.wc-c-snackbar-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-snackbar-enter-from{opacity:0}.wc-c-snackbar-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-snackbar__type{width:var(--wc-c-snackbar-type-width);flex-shrink:0;align-self:stretch}.wc-c-snackbar__type[data-state~=warning]{background-color:var(--wc-c-snackbar-warning-color)}.wc-c-snackbar__type[data-state~=error]{background-color:var(--wc-c-snackbar-error-color)}.wc-c-snackbar__type[data-state~=success]{background-color:var(--wc-c-snackbar-success-color)}.wc-c-snackbar__content{width:100%;padding:var(--wc-c-snackbar-content-padding)}.wc-c-backdrop{display:flex;min-height:0;flex-direction:column}.wc-c-backdrop__backlayer{flex:none;padding-bottom:calc(var(--wc-sys-radius));background-color:var(--wc-sys-primary);color:var(--wc-sys-primary-inverted)}.wc-c-backdrop__frontlayer{position:relative;display:grid;overflow:hidden;min-height:0;flex:auto;border-radius:var(--wc-sys-radius) var(--wc-sys-radius) 0 0;margin-top:calc(0px - var(--wc-sys-radius));background-color:var(--wc-sys-surface);color:var(--wc-sys-surface-inverted);grid-template-rows:1fr auto}.wc-c-chat{display:grid;overflow:hidden;border-radius:var(--wc-sys-radius);box-shadow:0 3px 4px -2px #4a4a4a66,0 6px 9px 1px #4a4a4a40,0 2px 11px 2px #4a4a4a1a;grid-template-rows:1fr;pointer-events:auto}.wc-c-chat-move,.wc-c-chat-enter-active,.wc-c-chat-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-chat-enter-from,.wc-c-chat-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-fab{--wc-c-fab-width: var(--wc-sys-space-triple);--wc-c-fab-height: var(--wc-sys-space-triple);--wc-c-fab-background: var(--wc-sys-primary);--wc-c-fab-color: var(--wc-sys-primary-inverted);--wc-c-fab-hover-background: var(--wc-sys-active);--wc-c-fab-hover-color: var(--wc-sys-active-inverted);border-radius:50%;transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);display:flex;overflow:hidden;width:var(--wc-c-fab-width);height:var(--wc-c-fab-height);align-items:center;justify-content:center;padding:0;border:0;margin:0;margin-top:var(--wc-sys-space);background-color:var(--wc-c-fab-background);box-shadow:0 3px 4px -2px #4a4a4a66,0 6px 9px 1px #4a4a4a40,0 2px 11px 2px #4a4a4a1a;color:var(--wc-c-fab-color);cursor:pointer;pointer-events:auto}.wc-c-fab .wc-c-fab__icon path{fill:currentColor}.wc-c-fab:hover,.wc-c-fab:focus{background-color:var(--wc-c-fab-hover-background);color:var(--wc-c-fab-hover-color)}.wc-c-fab:hover .wc-c-fab__icon path,.wc-c-fab:focus .wc-c-fab__icon path{fill:currentColor}.wc-c-fab__image{max-width:100%;max-height:100%}.wc-c-input--clean{border:0;border-radius:0}.wc-c-input--clean[data-border~=focusTopBorder]{border-top:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);border-color:var(--wc-sys-surface-contrast)}.wc-c-notification{padding:0;margin:0;list-style:none;display:flex;flex-direction:column;align-items:flex-end;pointer-events:none}.wc-c-notification-move,.wc-c-notification-enter-active,.wc-c-notification-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-notification-enter-from,.wc-c-notification-leave-to{opacity:0;transform:translate(var(--wc-sys-space-double))}.wc-c-notification__item{cursor:pointer;pointer-events:auto}.wc-c-notification__item+.wc-c-notification__item{margin-top:var(--wc-sys-space-half)}.wc-c-root{--wc-c-root-z-index: auto;--wc-c-root-max-height: var(--wc-sys-constrain-size);--wc-c-root-max-width: var(--wc-sys-constrain-size);position:fixed;z-index:var(--wc-c-root-z-index);right:0;bottom:0;display:flex;width:100%;height:100%;min-height:64%;box-sizing:border-box;flex-direction:column-reverse;justify-content:flex-start;padding:var(--wc-sys-gutter);font-family:var(--wc-sys-font);font-size:var(--wc-sys-font-size);line-height:var(--wc-sys-line-height);pointer-events:none}@media only screen and (min-width: 38rem){.wc-c-root{max-width:var(--wc-c-root-max-width);max-height:var(--wc-c-root-max-height)}}.wc-c-root .wc-c-chat{flex:auto}.wc-c-root .wc-c-fab{flex:none;align-self:flex-end}.wc-c-root:dir(rtl){right:unset;left:0}
`,
    Db = ot(Ib, [
        ["styles", [Pb]]
    ]),
    $b = {},
    zb = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    Mb = I("title", null, "Message", -1),
    Fb = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "m20.675 16.962 1.271 3.714a1 1 0 0 1-1.27 1.27l-3.714-1.271A9.942 9.942 0 0 1 12 22C6.478 22 2 17.522 2 12S6.478 2 12 2s10 4.478 10 10a9.942 9.942 0 0 1-1.325 4.962Zm-3.065 1.82 1.783.611-.903-2.64.45-.785A7.94 7.94 0 0 0 20 12a8.001 8.001 0 0 0-16 0c0 4.417 3.583 8 8 8a7.94 7.94 0 0 0 3.968-1.06l.785-.45.857.293ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    }, null, -1),
    Ub = [Mb, Fb];

function Bb(e, t) {
    return P(), H("svg", zb, Ub)
}
const jb = ot($b, [
        ["render", Bb]
    ]),
    ad = He(We.FAQ, () => {
        const e = De({
            title: "Frequently Asked Questions"
        });

        function t(n) {
            e.title = n
        }
        return {
            faqConfig: e,
            setFaqTitle: t
        }
    }, {
        persist: {
            key: We.FAQ
        }
    }),
    qb = {
        class: "wc-c-faq",
        role: "region",
        "aria-labelledby": "faqTitle"
    },
    Hb = {
        id: "faqTitle",
        class: "wc-c-faq__title"
    },
    Vb = he({
        __name: "Faq",
        setup(e) {
            const t = xe("app"),
                n = ad(t.pinia),
                s = ts(t.sessionPinia),
                r = Ze(t.sessionPinia),
                i = qt(t.sessionPinia),
                o = (a, c) => async l => {
                    l.preventDefault(), r.state.livechat.active || i.cancel();
                    const u = [cn(c)];
                    t.caic.faq(u, a, c)
                };
            return (a, c) => (P(), H("section", qb, [I("h3", Hb, Re(b(n).faqConfig.title), 1), $(ar, {
                class: "wc-c-faq__list",
                name: "wc-c-faq__list",
                tag: "ol",
                appear: "",
                role: "menu",
                "aria-labelledby": "faqTitle"
            }, {
                default: Y(() => [(P(!0), H(Pe, null, Wn(b(s).faqs, ({
                    id: l,
                    question: u
                }) => (P(), H("li", {
                    key: l,
                    class: "wc-c-faq__item"
                }, [$(Kp, {
                    class: "wc-c-option--icon",
                    "option-action": o(l, u)
                }, {
                    default: Y(() => [$(un, null, {
                        default: Y(() => [$(jb, {
                            "aria-hidden": "true"
                        })]),
                        _: 1
                    }), I("span", null, Re(u), 1)]),
                    _: 2
                }, 1032, ["option-action"])]))), 128))]),
                _: 1
            })]))
        }
    }),
    Gb = {
        key: 0,
        class: "wc-c-menu__section",
        "aria-labelledby": "sheetHeader menuHeader"
    },
    Kb = {
        class: "wc-c-menu",
        role: "menu"
    },
    Wb = ["onClick"],
    cd = he({
        __name: "Menu",
        setup(e) {
            const t = xe("app"),
                n = ce(),
                s = Si(t.pinia),
                r = hr(t.pinia),
                i = hn(t.pinia),
                o = {
                    [ae.RESET]() {
                        r.setContent(ae.RESET), i.setContent(ae.RESET), i.state.isOpen = !0
                    },
                    [ae.LANGUAGE_SELECT]() {
                        i.setContent(ae.LANGUAGE_SELECT), i.state.isOpen = !0
                    }
                },
                a = {
                    [ae.LANGUAGE_SELECT]: Xt(() => Promise.resolve().then(() => s1)),
                    [ae.RESET]: Xt(() => Promise.resolve().then(() => p1))
                };
            return dn(() => {
                n.value && n.value.length > 0 && i.state.isOpen && n.value[0].focus()
            }), (c, l) => b(s).menuConfig.items && b(s).menuConfig.items.length > 0 ? (P(), H("section", Gb, [_t(c.$slots, "default"), I("menu", Kb, [(P(!0), H(Pe, null, Wn(b(s).menuConfig.items, ({
                type: u,
                text: p
            }) => (P(), H("li", {
                key: u,
                class: "wc-c-menu__item",
                role: "menuitem"
            }, [I("button", {
                ref_for: !0,
                ref_key: "menuButton",
                ref: n,
                class: "wc-c-menu__button",
                onClick: o[u]
            }, [$(un, null, {
                default: Y(() => [(P(), Te(ir(a[u]), {
                    "aria-hidden": "true"
                }))]),
                _: 2
            }, 1024), I("span", null, Re(p), 1)], 8, Wb)]))), 128))])])) : Ee("", !0)
        }
    }),
    ld = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: cd
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    Qb = {
        class: "wc-c-chat",
        "data-cmwc-test-id": "chat",
        "aria-labelledby": "agentName agentDescription"
    },
    Yb = {
        role: "menuitem"
    },
    Xb = {
        key: 0,
        class: "wc-c-aside"
    },
    Jb = {
        id: "menuHeader",
        class: "wc-c-menu__title"
    },
    Zb = he({
        __name: "Inline.ce",
        props: {
            instancekey: {}
        },
        setup(e) {
            const {
                instancekey: t
            } = e, n = window.cmwc.getByInstanceKey(t);
            if (!n) throw new Error("Chat instance is undefined ");
            yi("app", n);
            const s = hn(n.pinia),
                r = Me(n.pinia),
                i = Si(n.pinia),
                o = ts(n.sessionPinia),
                a = ce(),
                c = {
                    [At.LANGUAGE]: Xt(() => Promise.resolve().then(() => zd)),
                    [At.MENU]: Xt(() => Promise.resolve().then(() => ld)),
                    [At.MODAL]: Xt(() => Promise.resolve().then(() => Md))
                };
            return Eu(() => {
                !a.value || (r.state.style && fs(a.value, "style", r.state.style, "beforebegin"), r.state.customStyle && fs(a.value, "customStyle", r.state.customStyle, "beforebegin"))
            }), dn(() => {
                qt(n.sessionPinia).resumeStalledQueue()
            }), (l, u) => Ks((P(), H("div", {
                ref_key: "rootElement",
                ref: a,
                class: "wc-c-root"
            }, [I("main", Qb, [$(Yp, null, {
                agent: Y(() => [$(Jp)]),
                action: Y(() => [$(Zp, null, {
                    default: Y(() => [I("li", Yb, [$(en, {
                        class: "wc-c-icon-button--primary",
                        "aria-label": "Chat options \u2026",
                        "aria-expanded": b(s).state.isOpen,
                        onClick: u[0] || (u[0] = p => b(s).toggleSheet()),
                        onKeydown: u[1] || (u[1] = Mt(Sn(p => b(s).toggleSheet(), ["prevent"]), ["enter"]))
                    }, {
                        default: Y(() => [$(id)]),
                        _: 1
                    }, 8, ["aria-expanded"])])]),
                    _: 1
                })]),
                _: 1
            }), $(od), $(Wp), $(rd), $(Gp)]), b(o).enabled ? (P(), H("aside", Xb, [$(Vb), $(cd, null, {
                default: Y(() => [I("h3", Jb, Re(b(i).menuConfig.title), 1)]),
                _: 1
            })])) : Ee("", !0), $(ed, null, {
                header: Y(() => [$(nd, null, {
                    title: Y(() => [or(Re(b(s).state.title), 1)]),
                    _: 1
                })]),
                content: Y(() => [(P(), Te(ir(c[b(s).state.contentType])))]),
                _: 1
            })], 512)), [
                [xo, b(r).state.visible]
            ])
        }
    }),
    e_ = `:host{--wc-ref-primary: #0074e8;--wc-ref-primary-variant: #0658a5;--wc-ref-neutral: #fff;--wc-ref-neutral-variant: #f2f2f2}:host{--wc-sys-primary: var(--wc-ref-primary);--wc-sys-primary-inverted: #fff;--wc-sys-primary-contrast: #d6e4f0;--wc-sys-surface: var(--wc-ref-neutral);--wc-sys-surface-inverted: #000;--wc-sys-surface-contrast: #767676;--wc-sys-surface-shade: var(--wc-ref-neutral-variant);--wc-sys-surface-shade-inverted: #000;--wc-sys-active: var(--wc-ref-primary-variant);--wc-sys-active-inverted: #fff;--wc-sys-shadow: #000;--wc-sys-outline: var(--wc-ref-neutral-variant);--wc-sys-warning: #ffa400;--wc-sys-warning-inverted: #fff;--wc-sys-error: #ff495c;--wc-sys-error-inverted: #fff;--wc-sys-success: #3ddc97;--wc-sys-success-inverted: #fff}:host{--wc-sys-space: 1rem;--wc-sys-space-quarter: calc(var(--wc-sys-space) * .25);--wc-sys-space-half: calc(var(--wc-sys-space) * .5);--wc-sys-space-double: calc(var(--wc-sys-space) * 2);--wc-sys-space-triple: calc(var(--wc-sys-space) * 3);--wc-sys-space-quadruple: calc(var(--wc-sys-space) * 4);--wc-sys-gutter: max(var(--wc-sys-space), 5vmin);--wc-sys-constrain-size: 32rem}:host{--wc-sys-radius: 1rem;--wc-sys-border-style: solid;--wc-sys-border-color: var(--wc-sys-outline);--wc-sys-border-size: 2px}:host{--wc-sys-font: "Nunito";--wc-sys-font-size: 1rem;--wc-sys-font-size-tiny: calc(var(--wc-sys-font-size) * .75);--wc-sys-font-size-small: calc(var(--wc-sys-font-size) * .9);--wc-sys-font-size-large: calc(var(--wc-sys-font-size) * 1.1);--wc-sys-line-height: 1.5}:host{--wc-sys-transition-duration: .2s;--wc-sys-transition-timing-function: ease}@keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-out{0%{opacity:1}to{opacity:0}}@keyframes bounce{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}.sr-only{position:absolute;top:auto;left:-10000px;overflow:hidden;width:1px;height:1px}*,*:before,*:after{box-sizing:inherit}p{margin:0}button{padding:0;border:none;background:transparent}figure{margin:0}a:not([class^=wc-c-]){color:var(--wc-sys-surface-balance)}a:not([class^=wc-c-]):hover,a:not([class^=wc-c-]):focus{opacity:.7}.wc-c-action{padding:0;list-style:none;display:flex;margin:0}.wc-c-action>*+*{margin-left:var(--wc-sys-space-quarter)}@container root (min-width: 48rem){.wc-c-action[data-show=false]{display:none}}.wc-c-agent{--wc-c-agent-name-font-weight: 600;--wc-c-agent-name-color: var(--wc-sys-primary-inverted);--wc-c-agent-name-font-size: var(--wc-sys-font-size-large);--wc-c-agent-description-weight: 400;--wc-c-agent-description-color: var(--wc-sys-primary-inverted);--wc-c-agent-description-font-size: var(--wc-sys-font-size-small);display:flex;align-items:center;gap:0 var(--wc-sys-space)}.wc-c-agent__avatar{flex:none}.wc-c-agent__header{flex:auto}.wc-c-agent__name{margin:0;color:var(--wc-c-agent-name-color);font-size:var(--wc-c-agent-name-font-size);font-weight:var(--wc-c-agent-name-font-weight)}.wc-c-agent__description{margin:0;color:var(--wc-c-agent-description-color);font-size:var(--wc-c-agent-description-font-size);font-weight:var(--wc-c-agent-description-weight)}.wc-c-avatar{border-radius:50%;display:block;width:calc(var(--wc-sys-space-triple) + var(--wc-sys-space-half));height:calc(var(--wc-sys-space-triple) + var(--wc-sys-space-half));background-size:contain}.wc-c-avatar--small{width:var(--wc-sys-space-double);height:var(--wc-sys-space-double)}.wc-c-media,.wc-c-bubble{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);width:fit-content;max-width:100%;padding:var(--wc-sys-space);border-radius:var(--wc-sys-radius);background-color:var(--wc-sys-surface);color:var(--wc-sys-surface-inverted);overflow-x:auto;overflow-y:hidden}@supports (-moz-appearance: none){.wc-c-media,.wc-c-bubble{scrollbar-color:var(--wc-sys-surface-shade) transparent;scrollbar-width:thin}}.wc-c-media::-webkit-scrollbar,.wc-c-bubble::-webkit-scrollbar{width:var(--wc-sys-space-half);height:var(--wc-sys-space-half)}.wc-c-media::-webkit-scrollbar-track,.wc-c-bubble::-webkit-scrollbar-track{border-radius:var(--wc-sys-radius);background-color:transparent}.wc-c-media::-webkit-scrollbar-thumb,.wc-c-bubble::-webkit-scrollbar-thumb{border-radius:var(--wc-sys-radius);background-color:var(--wc-sys-surface-shade)}.wc-c-bubble:has(iframe){width:auto;padding:0}.wc-c-bubble--clean{border:0;box-shadow:0 3px 4px -2px #4a4a4a66,0 6px 9px 1px #4a4a4a40,0 2px 11px 2px #4a4a4a1a}.wc-c-media--primary,.wc-c-bubble--primary{border:0;background-color:var(--wc-sys-primary);color:var(--wc-sys-primary-inverted)}.wc-c-media--primary a,.wc-c-bubble--primary a{color:var(--wc-sys-surface-balance)}.wc-c-media--primary a:hover,.wc-c-bubble--primary a:hover,.wc-c-media--primary a:focus,.wc-c-bubble--primary a:focus{opacity:.7}.wc-c-card{--wc-c-card-border-radius: var(--wc-sys-radius);--wc-c-card-font-size: var(--wc-sys-font-size);border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;max-width:calc(15 * var(--wc-sys-space));max-height:calc(24 * var(--wc-sys-space));flex:1 0 100%;flex-direction:column;padding:var(--wc-sys-space);border-radius:var(--wc-c-card-border-radius);justify-items:center;scroll-snap-align:center;scroll-snap-stop:always}.wc-c-card+.wc-c-card{margin-left:var(--wc-sys-space-half)}.wc-c-card__header{flex-shrink:0;padding:var(--wc-sys-space-half) 0;justify-self:start}.wc-c-card__header>.wc-c-card__title-anchor{color:var(--wc-sys-surface-inverted)}.wc-c-card__description{min-width:0;font-size:var(--wc-c-card-font-size);white-space:nowrap}.wc-c-card__title{overflow:hidden;min-width:0;margin:0;font-size:var(--wc-c-card-font-size);display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-overflow:ellipsis}.wc-c-card__image{max-width:100%;align-self:center;border-radius:var(--wc-c-card-border-radius)}.wc-c-card__image-anchor{display:flex;flex-direction:column}.wc-c-card__quickreplies{display:flex;overflow:hidden;flex-direction:column;flex-grow:1;flex-shrink:0;justify-content:end;padding:0;margin:0;text-overflow:ellipsis}.wc-c-card__quickreplies-item,.wc-c-card__quickreplies-item .wc-c-option{width:100%}.wc-c-card__quickreplies-item+.wc-c-card__quickreplies-item{margin-top:var(--wc-sys-space-half)}.wc-c-card__quickreplies-item>*{overflow:hidden;max-width:100%;font-size:var(--wc-c-card-font-size);text-overflow:ellipsis;white-space:nowrap}.wc-c-carousel-wrapper{--wc-c-carousel-navigation-button-size: var(--wc-sys-space-double);--wc-c-carousel-navigation-button-hover-color: var(--wc-sys-surface);--wc-c-carousel-navigation-button-hover-background: var(--wc-sys-surface-inverted);position:relative}.wc-c-carousel-wrapper *{overflow:hidden;text-overflow:ellipsis}.wc-c-carousel{scrollbar-width:none;display:flex;max-width:100%;height:auto;padding:0 16px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory}.wc-c-carousel::-webkit-scrollbar{width:0;height:0}.wc-c-carousel__navigation{position:absolute;display:flex;align-items:center;justify-content:space-between;inset:0;pointer-events:none}.wc-c-carousel__navigation-button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);animation:fade-in var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);opacity:1;display:flex;width:var(--wc-c-carousel-navigation-button-size);height:var(--wc-c-carousel-navigation-button-size);align-items:center;justify-content:center;border-radius:50%;background-color:var(--wc-sys-surface-inverted);cursor:pointer;pointer-events:auto;visibility:visible}.wc-c-carousel__navigation-button[data-state=initial]{visibility:hidden}.wc-c-carousel__navigation-button svg path{fill:var(--wc-sys-surface)}.wc-c-carousel__navigation-button:disabled{animation:fade-out var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);opacity:0}.wc-c-carousel__navigation-button:disabled:hover{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);background-color:var(--wc-c-carousel-navigation-button-hover-color)}.wc-c-carousel__navigation-button:disabled:hover svg path{fill:var(--wc-c-carousel-navigation-button-hover-background)}.wc-c-carousel__navigation-button:hover:not(:disabled){transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);background-color:var(--wc-c-carousel-navigation-button-hover-color)}.wc-c-carousel__navigation-button:hover:not(:disabled) svg path{fill:var(--wc-c-carousel-navigation-button-hover-background)}.wc-c-carousel .wc-c-option:disabled{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border-style:double;background-color:var(--wc-c-option-hover-color);color:var(--wc-sys-primary-inverted);cursor:pointer;opacity:.7;pointer-events:none}.wc-c-conversation{padding:0;list-style:none;scrollbar-width:none;padding:var(--wc-sys-space);margin:0;overflow-wrap:break-word;overflow-x:hidden;overflow-y:scroll}.wc-c-conversation::-webkit-scrollbar{width:0;height:0}.wc-c-conversation-move,.wc-c-conversation-enter-active,.wc-c-conversation-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-conversation-enter-from,.wc-c-conversation-leave-to{opacity:0}.wc-c-conversation__item+.wc-c-conversation__item{margin-top:var(--wc-sys-space-double)}.wc-c-dialog{padding:0;margin:0;list-style:none;display:flex;flex-wrap:wrap;justify-content:flex-end;padding-top:var(--wc-sys-space);margin:calc(0px - var(--wc-sys-space-quarter))}.wc-c-dialog-move,.wc-c-dialog-enter-active,.wc-c-dialog-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-dialog-enter-from,.wc-c-dialog-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-dialog__item{margin:var(--wc-sys-space-quarter)}.wc-c-divider{--wc-c-divider-color: var(--wc-sys-surface-contrast);--wc-c-divider-font-weight: bold;--wc-c-divider-font-size: var(--wc-sys-font-size);--wc-c-divider-font-family: var(--wc-sys-font);margin:var(--wc-sys-space) auto;color:var(--wc-c-divider-color);font-family:var(--wc-c-divider-font-family);font-size:var(--wc-c-divider-font-size);font-weight:var(--wc-c-divider-font-weight);text-align:center;text-transform:uppercase}.wc-c-file-upload{--wc-c-file-upload-progress-background-color: var(--wc-sys-surface-shade);--wc-c-file-upload-progress-color: var(--wc-sys-primary);--wc-c-file-upload-progress-padding: var(--wc-sys-space-half) var(--wc-sys-space);--wc-c-file-upload-progress-icon-height: var(--wc-sys-space-double);--wc-c-file-upload-progress-icon-margin: var(--wc-sys-space-quarter);--wc-c-file-upload-progress-icon-color: var(--wc-sys-surface-inverted);--wc-c-file-upload-progress-font-size: var(--wc-sys-font-size-small);--wc-c-file-upload-progress-bar-height: var(--wc-sys-space-quarter);--wc-c-file-upload-progress-bar-margin: var(--wc-sys-space-half);--wc-c-file-upload-progress-bar-radius: calc(var(--wc-sys-radius) / 2);display:flex;overflow:hidden;align-items:center;justify-content:center;padding:var(--wc-c-file-upload-progress-padding)}.wc-c-file-upload-move,.wc-c-file-upload-enter-active,.wc-c-file-upload-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-file-upload-enter-from,.wc-c-file-upload-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-file-upload__icon{height:var(--wc-c-file-upload-progress-icon-height);margin:var(--wc-c-file-upload-progress-icon-margin)}.wc-c-file-upload__icon path{fill:var(--wc-c-file-upload-progress-icon-color)}.wc-c-file-upload__data{display:flex;overflow:hidden;width:100%;flex-direction:column}.wc-c-file-upload__header{display:flex;width:100%;font-size:var(--wc-c-file-upload-progress-font-size)}.wc-c-file-upload__header label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wc-c-file-upload__progress{display:flex;width:100%}.wc-c-file-upload__progress progress{width:100%;height:var(--wc-c-file-upload-progress-bar-height);border:none;border-radius:var(--wc-c-file-upload-progress-bar-radius);margin-bottom:var(--wc-c-file-upload-progress-bar-margin);appearance:none;background-color:var(--wc-c-file-upload-progress-background-color)}.wc-c-file-upload__progress progress::-moz-progress-bar{border-radius:var(--wc-c-file-upload-progress-bar-radius);background:var(--wc-c-file-upload-progress-color)}.wc-c-file-upload__progress progress::-webkit-progress-bar{border-radius:var(--wc-c-file-upload-progress-bar-radius);background-color:var(--wc-c-file-upload-progress-background-color)}.wc-c-file-upload__progress progress::-webkit-progress-value{border-radius:var(--wc-c-file-upload-progress-bar-radius);background:var(--wc-c-file-upload-progress-color)}.wc-c-header{--wc-c-header-warning-color: var(--wc-sys-warning-inverted);--wc-c-header-warning-background: var(--wc-sys-warning);display:flex;overflow:hidden;flex-direction:column}.wc-c-header__environment-banner{padding:2px var(--wc-sys-space) 2px var(--wc-sys-space);background-color:var(--wc-c-header-warning-background);color:var(--wc-c-header-warning-color)}.wc-c-header__content{display:flex;min-height:var(--wc-sys-space-quadruple);align-items:center;justify-content:space-between;padding:var(--wc-sys-space);background-color:var(--wc-sys-primary);color:var(--wc-sys-primary-inverted)}.wc-c-header__content>*+*{margin-left:var(--wc-sys-space-half)}.wc-c-icon-button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);--wc-c-icon-button-color: var(--wc-sys-surface-inverted);--wc-c-icon-button-background: var(--wc-sys-surface);--wc-c-icon-button-hover-color: var(--wc-sys-active-inverted);--wc-c-icon-button-focus-color: var(--wc-sys-active-inverted);--wc-c-icon-button-hover-background: var(--wc-sys-active);--wc-c-icon-button-focus-background: var(--wc-sys-active);--wc-c-icon-button-width: var(--wc-sys-space-double);--wc-c-icon-button-height: var(--wc-sys-space-double);--wc-c-icon-button-font-weight: normal;--wc-c-icon-button-font-size: var(--wc-sys-font-size--tiny);--wc-c-icon-button-font-family: var(--wc-sys-font);display:flex;min-width:var(--wc-c-icon-button-width);max-width:fit-content;height:var(--wc-c-icon-button-height);align-items:center;padding:var(--wc-sys-space-quarter);border:0;border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-icon-button-background);color:var(--wc-c-icon-button-color);cursor:pointer;font-family:var(--wc-c-icon-button-font-family);font-size:var(--wc-c-icon-button-font-size);font-weight:var(--wc-c-icon-button-font-weight)}.wc-c-icon-button svg{flex:none}.wc-c-icon-button svg path{transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:currentColor}.wc-c-icon-button:hover{background-color:var(--wc-c-icon-button-hover-background);color:var(--wc-c-icon-button-hover-color)}.wc-c-icon-button:hover svg path{fill:currentColor}.wc-c-icon-button:focus{background-color:var(--wc-c-icon-button-focus-background);color:var(--wc-c-icon-button-focus-color)}.wc-c-icon-button:focus svg path{fill:currentColor}.wc-c-icon-button--primary{--wc-c-icon-button-color: var(--wc-sys-primary-inverted);--wc-c-icon-button-hover-color: var(--wc-sys-active-inverted);--wc-c-icon-button-focus-color: var(--wc-sys-active-inverted);--wc-c-icon-button-background: var(--wc-sys-primary);--wc-c-icon-button-hover-background: var(--wc-sys-active);--wc-c-icon-button-focus-background: var(--wc-sys-active)}.wc-c-input{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);--wc-c-input-font-size: var(--wc-sys-font-size);--wc-c-input-font: var(--wc-sys-font);--wc-c-input-line-height: var(--wc-sys-line-height);--wc-c-input-background: var(--wc-sys-surface);--wc-c-input-color: var(--wc-sys-surface-inverted);--wc-c-input-caret-color: var(--wc-sys-font);--wc-c-input-active-color: var(--wc-sys-active);display:flex;align-items:center;padding:var(--wc-sys-space-half) var(--wc-sys-space);border-color:var(--wc-sys-surface-contrast);border-radius:var(--wc-sys-radius);margin:0;background-color:var(--wc-c-input-background)}.wc-c-input *+*{margin-left:var(--wc-sys-space-quarter)}.wc-c-sheet__content>.wc-c-input{margin:var(--wc-sys-space-half);margin-bottom:0}.wc-c-input[data-state~=focus]{transition:border-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);border-color:var(--wc-c-input-active-color)!important}.wc-c-input__field{scrollbar-width:none;max-height:100%;flex:auto;padding:0;border:none;margin:0;background-color:transparent;caret-color:var(--wc-c-input-caret-color);color:var(--wc-c-input-color);font-family:var(--wc-c-input-font);font-size:var(--wc-c-input-font-size);line-height:var(--wc-c-input-line-height);overflow-y:scroll;resize:none}.wc-c-input__field::-webkit-scrollbar{width:0;height:0}.wc-c-input__field::placeholder{color:var(--wc-sys-surface-contrast)}.wc-c-input__field:disabled{background-color:red;opacity:.6}.wc-c-input__field:focus:not(:disabled),.wc-c-input__field:active:not(:disabled){border-color:var(--wc-c-input-active-color)!important;outline:none}.wc-c-input__field::-webkit-search-cancel-button{display:none}.wc-c-input__submit{display:flex;flex:none;align-items:end;align-self:end}.wc-c-input__search{display:flex;margin-right:var(--wc-sys-space-half)}.wc-c-input__search>svg>path{fill:var(--wc-sys-surface-inverted)}.wc-c-loader{display:flex;align-items:center}.wc-c-loader__indicator{padding:0;margin:0;list-style:none;display:inline-flex}cxco-o-chat .wc-c-loader__indicator{grid-column:2}.wc-c-loader__avatar{margin-right:var(--wc-sys-space)}.wc-c-loader__bubble{border-radius:50%;width:var(--wc-sys-space-quarter);height:var(--wc-sys-space-quarter);animation:bounce 1s infinite var(--wc-sys-transition-timing-function) both;background-color:var(--wc-sys-surface-inverted)}.wc-c-loader__bubble:nth-child(2n){animation-delay:.1s}.wc-c-loader__bubble:nth-child(3n){animation-delay:.2s}.wc-c-loader__bubble+.wc-c-loader__bubble{margin-left:var(--wc-sys-space-half)}.wc-c-media{--wc-c-media-font-weight: bold;--wc-c-media-font-size: var(--wc-sys-font-size);--wc-c-media-font-family: var(--wc-sys-font)}.wc-c-media__image{max-width:100%;height:auto;border-radius:var(--wc-sys-radius)}.wc-c-media__title{margin:0;color:var(--wc-c-media-color);font-family:var(--wc-c-media-font-family);font-size:var(--wc-c-media-font-size);font-weight:var(--wc-c-media-font-weight);text-transform:uppercase}.wc-c-menu{--wc-c-menu-color: var(--wc-sys-surface-inverted);--wc-c-menu-hover-color: var(--wc-sys-surface-shade-inverted);--wc-c-menu-focus-color: var(--wc-sys-surface-shade-inverted);--wc-c-menu-active-color: var(--wc-sys-active-inverted);--wc-c-menu-background: var(--wc-sys-surface);--wc-c-menu-hover-background: var(--wc-sys-surface-shade);--wc-c-menu-focus-background: var(--wc-sys-surface-shade);--wc-c-menu-active-background: var(--wc-sys-active);--wc-c-menu-width: var(--wc-sys-space-double);--wc-c-menu-height: var(--wc-sys-space-double);--wc-c-menu-font-weight: normal;--wc-c-menu-font-size: var(--wc-sys-font-size);--wc-c-menu-font-family: var(--wc-sys-font);padding:0;margin:0;list-style:none;scrollbar-width:none;padding:var(--wc-sys-space-half);overflow-x:hidden;overflow-y:scroll;scroll-behavior:smooth}.wc-c-menu::-webkit-scrollbar{width:0;height:0}.wc-c-menu__section{max-height:100%;padding:0;margin-top:0}.wc-c-menu__title{margin:var(--wc-sys-space)}.wc-c-menu__button{transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);display:flex;width:100%;align-items:center;padding:var(--wc-sys-space-half);border:0;border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-menu-background);color:var(--wc-c-menu-color);cursor:pointer;font-family:var(--wc-c-menu-font-family);font-size:var(--wc-c-menu-font-size);font-weight:var(--wc-c-menu-font-weight)}.wc-c-menu__button svg path{transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:var(--wc-c-menu-color)}.wc-c-menu__button:hover{background-color:var(--wc-c-menu-hover-background);color:var(--wc-c-menu-hover-color)}.wc-c-menu__button:hover svg path{fill:currentColor}.wc-c-menu__button:focus{background-color:var(--wc-c-menu-focus-background);color:var(--wc-c-menu-focus-color)}.wc-c-menu__button:focus svg path{fill:currentColor}.wc-c-menu__button[data-state~=true],.wc-c-menu__button[data-state~=true]:hover,.wc-c-menu__button[data-state~=true]:focus{background-color:var(--wc-c-menu-active-background);color:var(--wc-c-menu-active-color)}.wc-c-menu__button[data-state~=true] svg path,.wc-c-menu__button[data-state~=true]:hover svg path,.wc-c-menu__button[data-state~=true]:focus svg path{fill:currentColor}.wc-c-menu__button>*+*{margin-left:var(--wc-sys-space-half)}.wc-c-message-group[data-layout~=ClientOriginated]{margin-left:var(--wc-sys-space-double);grid-template-columns:1fr}.wc-c-message-group[data-layout~=ClientTerminated]{display:grid;margin-right:var(--wc-sys-space-double);column-gap:var(--wc-sys-space-half);grid-template-columns:min-content auto;grid-template-rows:min-content auto;row-gap:var(--wc-sys-space-quarter)}.wc-c-message-group__agent{flex:none;align-self:end;padding-bottom:var(--wc-sys-space);grid-column:1;grid-row:1}.wc-c-message-group__metadata{display:flex;grid-column:2;grid-row:2}[data-layout~=ClientOriginated] .wc-c-message-group__metadata{justify-content:end;grid-column:1}.wc-c-message-group__messages{padding:0;margin:0;list-style:none;display:flex;min-width:0;flex-direction:column;grid-column:2;grid-row:1}[data-layout~=ClientOriginated] .wc-c-message-group__messages{align-items:end}.wc-c-message-group__messages-move,.wc-c-message-group__messages-enter-active,.wc-c-message-group__messages-leave-active{overflow:hidden;transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-message-group__messages-enter-from,.wc-c-message-group__messages-leave-to{overflow:visible;opacity:0;transform:translate(calc(0px - var(--wc-sys-space)))}[data-layout~=ClientOriginated] .wc-c-message-group__messages-enter-from,[data-layout~=ClientOriginated] .wc-c-message-group__messages-leave-to{transform:translate(var(--wc-sys-space))}.wc-c-message-group__message{max-width:100%}.wc-c-message-group__message+.wc-c-message-group__message{margin-top:var(--wc-sys-space-half)}.wc-c-metadata{padding:0;list-style:none;display:flex;align-items:center;padding:0 var(--wc-sys-space);margin:0;font-size:var(--wc-sys-font-size-tiny)}.wc-c-modal{max-height:100%;padding:var(--wc-sys-space)}.wc-c-modal__footer{padding:0;margin:0;list-style:none;display:flex;width:100%;justify-content:flex-end;padding:var(--wc-sys-space-half);padding-top:var(--wc-sys-space);gap:var(--wc-sys-space-half)}.wc-c-option{--wc-c-option-font-size: var(--wc-sys-font-size);--wc-c-option-font: var(--wc-sys-font);--wc-c-option-color: var(--wc-sys-surface-inverted);--wc-c-option-background: var(--wc-sys-surface);--wc-c-option-hover-background: var(--wc-sys-primary-inverted);--wc-c-option-focus-background: var(--wc-sys-active-inverted);--wc-c-option-hover-color: var(--wc-sys-primary);--wc-c-option-focus-color: var(--wc-sys-active);border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size);transition:background-color var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);padding:var(--wc-sys-space-half) var(--wc-sys-space);border-radius:calc(var(--wc-sys-radius) / 2);background-color:var(--wc-c-option-background);color:var(--wc-c-option-color);cursor:pointer;font-family:var(--wc-c-option-font);font-size:var(--wc-c-option-font-size)}.wc-c-option:hover{background-color:var(--wc-c-option-hover-color);color:var(--wc-c-option-hover-background)}.wc-c-option:focus{background-color:var(--wc-c-option-focus-color);color:var(--wc-c-option-focus-background)}.wc-c-option--clean{border:var(--wc-sys-border-style) transparent var(--wc-sys-border-size)}.wc-c-option--clean:hover,.wc-c-option--clean:focus{border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size)}.wc-c-option--icon{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;align-items:center;padding:var(--wc-sys-space-quarter) var(--wc-sys-space-half);border-radius:var(--wc-sys-radius);text-align:left}.wc-c-option--icon svg{flex:none}.wc-c-option--icon svg path{background:var(--wc-c-option-background);transition:fill var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function);fill:var(--wc-c-option-color)}.wc-c-option--icon:hover{background:var(--wc-c-option-hover-color)}.wc-c-option--icon:hover svg path{fill:var(--wc-c-option-hover-background)}.wc-c-option--icon:focus{background:var(--wc-c-option-focus-color)}.wc-c-option--icon:focus svg path{fill:var(--wc-c-option-focus-background)}.wc-c-option--icon:hover,.wc-c-option--icon:focus{border:var(--wc-sys-border-style) var(--wc-sys-primary) var(--wc-sys-border-size)}.wc-c-option--icon *+*{margin-left:var(--wc-sys-space-half)}@container root (min-width: 48rem){.wc-c-option--icon{padding:var(--wc-sys-space-half) var(--wc-sys-space)}}.wc-c-sheet{--wc-c-sheet-title-font-weight: 600;--wc-c-sheet-title-color: var(--wc-sys-surface-inverted);--wc-c-sheet-title-font-size: var(--wc-sys-font-size-large);--wc-c-sheet-background: var(--wc-sys-surface);--wc-c-sheet-color: var(--wc-sys-surface-inverted);position:absolute;top:0;bottom:0;display:grid;width:100%;height:100%;align-items:center;justify-content:center;background:transparent;grid-template-columns:1fr}.wc-c-sheet-move,.wc-c-sheet-enter-active,.wc-c-sheet-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-sheet-enter-from,.wc-c-sheet-leave-to{opacity:0}.wc-c-sheet__scrim{width:100%;height:100%;background-color:var(--wc-sys-shadow);grid-column:1;grid-row:1;opacity:.3}.wc-c-sheet__container{border-top:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);position:absolute;right:0;bottom:0;left:0;display:grid;width:unset;max-width:100%;height:unset;max-height:100%;padding:0;border:0;border-radius:var(--wc-sys-radius) var(--wc-sys-radius) 0 0;margin:0;background-color:var(--wc-c-sheet-background);color:var(--wc-c-sheet-color);grid-column:1;grid-row:1;grid-template-rows:auto 1fr}.wc-c-sheet__container-move,.wc-c-sheet__container-enter-active,.wc-c-sheet__container-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-sheet__container-enter-from,.wc-c-sheet__container-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-sheet__container[data-state~=fullHeight]{height:100%}.wc-c-sheet__menu{padding:0;list-style:none;margin:0}.wc-c-sheet__header{border-bottom:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;align-items:center;justify-content:space-between;padding:var(--wc-sys-space)}.wc-c-sheet__content{display:flex;min-height:0;flex-direction:column;margin:0;grid-column:1;grid-row:2}.wc-c-sheet__title{flex:auto;margin:0;color:var(--wc-c-sheet-title-color);font-size:var(--wc-c-sheet-title-font-size);font-weight:var(--wc-c-sheet-title-font-weight);text-align:center}.wc-c-snackbar{--wc-c-snackbar-background-color: var(--wc-sys-surface-shade);--wc-c-snackbar-shadow: 0 0 5px 0 rgb(16 30 30 / 10%), 0 2px 7px 0 rgb(16 30 30 / 15%), 0 16px 9px -12px rgb(16 30 30 / 20%);--wc-c-snackbar-warning-color: var(--wc-sys-warning);--wc-c-snackbar-error-color: var(--wc-sys-error);--wc-c-snackbar-success-color: var(--wc-sys-success);--wc-c-snackbar-margin: var(--wc-sys-space);--wc-c-snackbar-border-radius: var(--wc-sys-space-half);--wc-c-snackbar-type-width: var(--wc-sys-space-half);--wc-c-snackbar-content-padding: var(--wc-sys-space-half) var(--wc-sys-space);position:static;z-index:1;display:flex;overflow:hidden;max-width:var(--wc-sys-constrain-size);align-items:center;align-self:end;padding:0;border:none;border-radius:var(--wc-c-snackbar-border-radius);margin:var(--wc-c-snackbar-margin);background-color:var(--wc-c-snackbar-background-color);box-shadow:var(--wc-c-snackbar-shadow);color:var(--wc-sys-surface-inverted);grid-column:1;grid-row:2;justify-self:center}.wc-c-snackbar-move,.wc-c-snackbar-enter-active,.wc-c-snackbar-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-snackbar-enter-from{opacity:0}.wc-c-snackbar-leave-to{opacity:0;transform:translateY(var(--wc-sys-space-double))}.wc-c-snackbar__type{width:var(--wc-c-snackbar-type-width);flex-shrink:0;align-self:stretch}.wc-c-snackbar__type[data-state~=warning]{background-color:var(--wc-c-snackbar-warning-color)}.wc-c-snackbar__type[data-state~=error]{background-color:var(--wc-c-snackbar-error-color)}.wc-c-snackbar__type[data-state~=success]{background-color:var(--wc-c-snackbar-success-color)}.wc-c-snackbar__content{width:100%;padding:var(--wc-c-snackbar-content-padding)}.wc-c-aside{scrollbar-width:none;border-top:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);display:flex;overflow:scroll;flex-direction:column;justify-content:space-between;padding:var(--wc-sys-space-half);background-color:var(--wc-sys-surface);color:var(--wc-sys-surface-inverted);grid-column:1}.wc-c-aside::-webkit-scrollbar{width:0;height:0}.wc-c-aside .wc-c-menu__section{display:none}@container root (min-width: 48rem){.wc-c-aside{width:50cqw;border-top:0;grid-column:2;border-left:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size)}.wc-c-aside .wc-c-menu__section{display:block}}@container root (min-width: 64rem){.wc-c-aside{width:40cqw}}.wc-c-faq{height:calc(var(--wc-sys-space) * 6)}.wc-c-faq__list{padding:0;margin:0;list-style:none;display:flex;flex-wrap:wrap;padding:var(--wc-sys-space-quarter);margin:calc(0px - var(--wc-sys-space-quarter))}.wc-c-faq__list-move,.wc-c-faq__list-enter-active,.wc-c-faq__list-leave-active{transition:opacity var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function),transform var(--wc-sys-transition-duration) var(--wc-sys-transition-timing-function)}.wc-c-faq__list-enter-from{opacity:0}.wc-c-faq__list-leave-to{opacity:0;transform:translateY(calc(0px - var(--wc-sys-space-double)))}.wc-c-faq__item{margin:var(--wc-sys-space-quarter)}.wc-c-faq__title{display:none}@container root (min-width: 48rem){.wc-c-faq{height:unset}.wc-c-faq__title{display:block;margin:var(--wc-sys-space)}}.wc-c-root{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);position:relative;display:grid;overflow:hidden;width:100%;height:100%;box-sizing:border-box;border-radius:var(--wc-sys-radius);container-name:root;container-type:size;font-family:var(--wc-sys-font);font-size:var(--wc-sys-font-size);grid-template-rows:1fr;line-height:var(--wc-sys-line-height)}.wc-c-header{border-radius:var(--wc-sys-radius)}.wc-c-conversation{grid-column:1;grid-row:2}.wc-c-chat{display:grid;width:100%;padding:var(--wc-sys-space);background-color:var(--wc-sys-surface);color:var(--wc-sys-surface-inverted);grid-column:1;grid-template-rows:auto 1fr auto;overflow-x:hidden;overflow-y:auto}@container root (min-width: 48rem){.wc-c-chat{min-width:50cqw;grid-template-rows:auto 1fr auto}}@container root (min-width: 64rem){.wc-c-chat{min-width:60cqw}}@container root (min-width: 48rem){.wc-c-sheet__container{border:var(--wc-sys-border-style) var(--wc-sys-border-color) var(--wc-sys-border-size);scrollbar-width:none;position:relative;width:calc(100% - var(--wc-sys-space));max-width:var(--wc-sys-constrain-size);max-height:var(--wc-sys-constrain-size);align-self:center;border-radius:var(--wc-sys-radius);grid-column:1;grid-row:1;justify-self:center;overflow-y:scroll}.wc-c-sheet__container::-webkit-scrollbar{width:0;height:0}.wc-c-sheet__container[data-state~=fullHeight]{height:calc(100% - var(--wc-sys-space))}}
`,
    t_ = ot(Zb, [
        ["styles", [e_]]
    ]);
var Zs = (e => (e.FLOATING = "webchat", e.INLINE = "webchatInline", e))(Zs || {});
const n_ = {
        webchat: Db,
        webchatInline: t_
    },
    Me = He(We.APP, () => {
        const e = De({
                floatingActionButton: "",
                livechat: {
                    handoverDividerText: ""
                },
                parentSelector: "body",
                style: "",
                customStyle: "",
                minimized: !0,
                snackbar: {
                    active: !1,
                    text: "Warning",
                    type: gt.Type.WARNING
                },
                visible: !0,
                customElementName: "",
                type: Zs.FLOATING,
                CONFIGKEY: void 0,
                INSTANCEKEY: void 0,
                environment: void 0
            }),
            t = ce(!1),
            n = l => {
                e.type = l.type, e.floatingActionButton = l.floatingActionButton, e.livechat.handoverDividerText = l.livechat.handoverDividerText, e.parentSelector = l.parentSelector, e.style = l.style, e.customStyle = l.customStyle
            },
            s = () => {
                e.snackbar = {
                    active: !1,
                    text: "Warning",
                    type: gt.Type.WARNING
                }
            },
            r = (l, u = gt.Type.WARNING) => {
                e.snackbar.active = !0, e.snackbar.text = l, e.snackbar.type = u, Sa(() => {
                    e.snackbar.active = !1
                }, Js.SNACKBAR)
            },
            i = () => {
                s()
            };

        function o() {
            e.minimized = !e.minimized
        }

        function a(l) {
            e.minimized = l
        }

        function c(l) {
            e.visible = l
        }
        return {
            state: e,
            setInstanceState: n,
            resetSnackbar: s,
            resetState: i,
            setSnackbar: r,
            toggleChatWindow: o,
            previewMode: t,
            setMinimized: a,
            setVisible: c
        }
    }, {
        persist: {
            key: We.APP,
            paths: ["state"]
        }
    }),
    ud = e => {
        const t = Me(e);
        return {
            dispatch: (r, i) => {
                const o = document.querySelector(t.state.customElementName);
                if (!o) throw new Error(`Application not mounted on element ${t.state.customElementName}`);
                const a = new CustomEvent(r, {
                    bubbles: !0,
                    composed: !0,
                    detail: i
                });
                o.dispatchEvent(a)
            },
            addListener: (r, i) => {
                window.addEventListener(r, i)
            }
        }
    };
class Ba extends Error {
    constructor(n) {
        super(n);
        be(this, "success");
        this.success = !1
    }
}
class Hr extends Ba {
    constructor(t, n) {
        super(`Expected type "${t}" but received type "${n}"`)
    }
}
class js extends Ba {
    constructor(t) {
        super(t || "Argument cannot be empty")
    }
}
class zo extends Ba {
    constructor(t) {
        super(t)
    }
}
const hs = (e, t) => {
    const n = "object",
        s = "string";
    if (!e) throw new js;
    if (typeof e !== n) throw new Hr(n, typeof e);
    for (const r of Object.keys(e)) {
        if (typeof e[r] !== s) throw new zo(`Value of ${t} '${r}' must be of type '${s}'`);
        if (!e[r]) throw new js(`Value of ${t} '${r}' cannot be empty`)
    }
};
var Kn = (e => (e.CONTEXT = "context", e.CONVERSATION_VARIABLES = "conversation variables", e.USER_IDENTIFIERS = "user identifiers", e))(Kn || {});
const s_ = `@charset "UTF-8";@font-face{font-family:Nunito;font-style:normal;font-weight:400;src:url(https://www.cm.com/fonts/nunito/nunito-400.woff2) format("woff2"),url(https://www.cm.com/fonts/nunito/nunito-400.ttf) format("truetype")}@font-face{font-family:Nunito;font-style:italic;font-weight:400;src:url(https://www.cm.com/fonts/nunito/nunito-400italic.woff2) format("woff2"),url(https://www.cm.com/fonts/nunito/nunito-400italic.ttf) format("truetype")}@font-face{font-family:Nunito;font-style:normal;font-weight:700;src:url(https://www.cm.com/fonts/nunito/nunito-700.woff2) format("woff2"),url(https://www.cm.com/fonts/nunito/nunito-700.ttf) format("truetype")}@font-face{font-family:Nunito;font-style:italic;font-weight:700;src:url(https://www.cm.com/fonts/nunito/nunito-700italic.woff2) format("woff2"),url(https://www.cm.com/fonts/nunito/nunito-700italic.ttf) format("truetype")}
`,
    pd = e => {
        const t = Me(e);
        if (!t.state.INSTANCEKEY) throw new Error("instanceKey not defined");
        if (t.state.type === Zs.FLOATING || t.state.type === Zs.INLINE) {
            const i = dm(n_[t.state.type]);
            customElements.get(t.state.customElementName) || customElements.define(t.state.customElementName, i)
        }
        const n = document.querySelector("[data-web-conversations-preview]"),
            s = n || document.querySelector(t.state.parentSelector);
        if (!s || (s == null ? void 0 : s.querySelector(t.state.customElementName))) return;
        n && (t.previewMode = !0);
        const r = document.createElement(t.state.customElementName);
        r.setAttribute("instanceKey", t.state.INSTANCEKEY), r.setAttribute("data-cmwc-test-id", t.state.INSTANCEKEY), fs(s, "fonts", s_, "afterbegin"), s.appendChild(r)
    },
    r_ = (e, t, n) => {
        var l;
        const s = hn(t),
            r = hr(t),
            i = Bt(n);
        qt(n).pause();
        const a = i.languages.filteredLanguages.find(u => {
            var p;
            return u.languageCode === ((p = e.metadata.translation) == null ? void 0 : p.inputLanguage)
        });
        i.setDetectedLanguage(a);
        const c = a == null ? void 0 : a.name;
        if (c) {
            const u = s.state[ae.LANGUAGE_DETECTED];
            u.title = (l = r.modal[ae.LANGUAGE_DETECTED].title) == null ? void 0 : l.toString().replace(/{language}/g, c), s.setContent(ae.LANGUAGE_DETECTED), r.setContent(ae.LANGUAGE_DETECTED), r.modal.text = r.modal.text.replace(/{language}/g, c), s.state.isOpen = !0
        }
    },
    Ci = He(We.LANGUAGE, () => {
        const e = De({
            placeholder: "Search",
            divider: "The language switched to {language}"
        });
        return {
            languages: e,
            setLanguageTexts: n => {
                e.placeholder = n.placeholder, e.divider = n.divider
            }
        }
    }, {
        persist: {
            key: We.LANGUAGE
        }
    });
async function i_(e) {
    try {
        await $g(Js.PAGE_PUSH), /^https?:\/\//i.test(e) && (window.location.href = e), /^\//.test(e) && (window.location.href = `${window.location.origin.replace(/\/+$/,"")}${e}`)
    } catch (t) {
        console.error(t)
    }
}

function o_(e) {
    return e.metadata !== void 0 && e.metadata !== void 0
}
const a_ = (e, t, n) => () => {
        n && n();
        const s = Bt(e),
            r = Ze(e);
        t.emit(_e.ONLOAD, {
            language: s.languages.selectedLanguage,
            conversationVariables: r.state.conversationVariables,
            context: r.state.contexts
        })
    },
    c_ = (e, t) => ({
        translation: n,
        config: s,
        type: r = Zs.FLOATING
    }) => {
        const i = xs(e),
            o = Np(e),
            a = Si(e),
            c = Ci(e),
            l = hr(e),
            u = ad(e),
            p = Me(e),
            d = Ti(e),
            g = fn(t),
            v = Bt(t),
            w = ts(t);
        p.setInstanceState(s), p.state.type = r, l.setModals(s), o.setInputConfig(s.input), i.setAgentConfig(s.agent), i.setAgent(), g.setDialogConfig(s.dialog), n ? (c.setLanguageTexts(n), v.setLanguages(n)) : s.menu.items = s.menu.items.filter(y => y.type !== "language"), a.setMenuConfig(s.menu), s.faq && (u.setFaqTitle(s.faq.title), w.enableFaqs(s.faq.enabled)), s.fileAttachments && d.setFileConfig(s.fileAttachments), pd(e)
    },
    l_ = (e, t) => {
        const n = qt(t),
            s = lr(t),
            r = fn(t),
            i = ur(t),
            o = Ti(e),
            a = Bt(t),
            c = Ze(t),
            l = Me(e),
            u = ts(t),
            p = xs(e);
        n.cancel(), r.resetDialog(), s.resetConversation(), i.resetNotification(), c.resetState(), l.resetState(), u.resetFaqs(), a.resetLanguage(), o.resetFile(), p.setAgent()
    },
    u_ = (e, t, n) => s => {
        try {
            l_(e, t), Fa(t).setUser(s), n.auth.user = s;
            const i = n.io._destroy;
            n.io._destroy = () => {}, n.disconnect().connect(), n.io._destroy = i, pd(e)
        } catch (r) {
            console.error(r)
        }
    },
    p_ = (e, t, n) => async ({
        conversationMessages: s,
        chat: r
    }) => {
        var i, o, a, c, l, u, p, d, g, v, w, y;
        try {
            const x = Ze(t),
                S = Me(e);
            ud(e).dispatch(Ca.ON_ANSWER, {
                conversationMessages: s,
                chat: r
            });
            const E = fn(t);
            E.flushDialogOptions();
            const V = qt(t);
            if (!o_(r.metadata)) {
                const at = Il(s, {
                    bubbleDelay: (i = r.metadata) == null ? void 0 : i.bubbleDelay
                });
                V.enqueue(at);
                return
            }
            r.metadata.metadata.relatedFaqs && ts(t).setFaqs(r.metadata.metadata.relatedFaqs), (o = r.metadata.metadata.translation) != null && o.newLanguageDetected && r_(r.metadata, e, t);
            const {
                dialogPath: re,
                tDialogState: le,
                agent: F
            } = r.metadata.metadata, q = dw(re);
            pw(t, n, q, r.metadata);
            const X = r.metadata.metadata.isDialogEnd;
            E.setDialogPath(X ? void 0 : re), E.setDialogPathData(X ? void 0 : q), E.setTDialogState(le);
            const we = xs(e);
            we.setAgent(F), (c = (a = r.metadata.metadata.translation) == null ? void 0 : a.original) != null && c.data.answer && (s = Gv(s, (l = r.metadata.metadata.translation) == null ? void 0 : l.original.data.answer));
            const {
                avatarUrl: B,
                name: se,
                description: Ie
            } = we.agent, Qe = Il(s, {
                agent: {
                    avatarUrl: B,
                    name: se,
                    description: Ie
                },
                dialogPath: r.metadata.metadata.dialogPath,
                bubbleDelay: r.metadata.metadata.bubbleDelay
            }), te = Number((p = (u = r.metadata.data) == null ? void 0 : u.outputAdditions) == null ? void 0 : p.ctaDelay), Ae = Number.isNaN(te) ? 0 : te > 6e4 ? 6e4 : te;
            if (Sa(() => {
                    V.enqueue(Qe)
                }, Ae), r.metadata.metadata.isInLiveChat) {
                x.state.livechat.active = !0;
                const at = fr(S.state.livechat.handoverDividerText);
                V.enqueue(at)
            }((v = (g = (d = r.metadata.metadata) == null ? void 0 : d.originalRequest) == null ? void 0 : g.metadata) == null ? void 0 : v.isInLiveChat) === !1 && (x.state.livechat.active = !1);
            const pe = (y = (w = r.metadata.data) == null ? void 0 : w.outputAdditions) == null ? void 0 : y.pagepush;
            typeof pe == "string" && await i_(pe)
        } catch (x) {
            console.error(x)
        }
    }, d_ = e => async ({
        conversationMessages: t,
        chat: n
    }) => {
        try {
            const {
                data: s,
                type: r
            } = n.metadata, i = fn(e), o = qt(e);
            if (i.flushDialogOptions(), r === dt.DIALOG_STEP) {
                const a = fr(i.dialogConfig.chooseAgain.dividerText);
                o.enqueue(a);
                return
            }
            if (t) {
                const a = r === dt.ASK ? s.dialogPath : void 0,
                    c = Kv(t, a);
                o.enqueue(c)
            }
        } catch (s) {
            console.error(s)
        }
    }, f_ = e => () => {
        e && e()
    }, h_ = (e, t) => ({
        languageCode: n,
        showDivider: s
    }) => {
        const r = Bt(t);
        r.languages.disabledTranslation = !1;
        const {
            languages: i
        } = r, o = i.filteredLanguages.find(a => a.languageCode === n);
        if (o) {
            const a = i.filteredLanguages.map(l => ({
                ...l,
                isActive: o.languageCode === l.languageCode
            }));
            r.setFilteredLanguages(a), r.languages.selectedLanguage = n;
            const c = Ci(e);
            if (s) {
                const l = fr(c.languages.divider.replace(/{language}/g, o.nativeName));
                qt(t).enqueue(l)
            }
        }
    }, m_ = e => t => {
        hs(t, Kn.CONTEXT);
        const n = Ze(e);
        n.state.contexts = {
            ...n.state.contexts,
            ...t
        }
    }, g_ = e => t => {
        hs(t, Kn.CONVERSATION_VARIABLES);
        const n = Ze(e);
        n.state.conversationVariables = {
            ...n.state.conversationVariables,
            ...t
        }, n.state.conversationVariablesChanged = !0
    }, w_ = e => t => {
        hs(t, Kn.USER_IDENTIFIERS);
        const n = Ze(e);
        n.state.userProperties = {
            ...n.state.userProperties,
            ...t
        }
    }, v_ = e => t => {
        const n = kp(e);
        n.feedbackStarted = !0, n.feedback.interactionId = t
    }, y_ = (e, t) => () => {
        const n = Me(e),
            s = Ze(t),
            r = qt(t);
        s.state.livechat.active = !0;
        const i = fr(n.state.livechat.handoverDividerText);
        r.enqueue(i)
    }, b_ = (e, t, n, s, r, i) => {
        const o = Fa(t),
            a = Br("https://webchat-api.digitalcx.com/v2", {
                transports: ["websocket"],
                auth: {
                    user: o.user,
                    CONFIGKEY: n,
                    STYLEKEY: r
                }
            });
        return window.addEventListener("pageshow", c => {
            c.persisted && a.connect()
        }), window.addEventListener("pagehide", () => {
            a.disconnect()
        }), a.on(_e.CONFIG, c_(e, t)), a.on(_e.USER, u_(e, t, a)), a.on(_e.USER_LOADED, f_(s)), a.on(_e.ONLOAD, a_(t, a, i)), a.on(_e.SET_LANGUAGE, h_(e, t)), a.on(_e.ADD_CONTEXT, m_(t)), a.on(_e.ADD_CONVERSATION_VARIABLES, g_(t)), a.on(_e.ADD_USER_PROPERTIES, w_(t)), a.on(_e.REQUEST, d_(t)), a.on(_e.RESPONSE, p_(e, t, a)), a.on(_e.HANDOVER, y_(e, t)), a.on(_e.FEEDBACK, v_(t)), a
    };
class Fn {
    constructor(t, n) {
        be(this, "success");
        be(this, "message");
        be(this, "result");
        this.success = !0, this.message = t, this.result = n
    }
}
const __ = (e, t, n, s) => {
    const r = ud(e);
    return {
        close: () => {
            Me(e).setMinimized(!0)
        },
        open: () => {
            Me(e).setMinimized(!1)
        },
        show: () => {
            Me(e).setVisible(!0)
        },
        hide: () => {
            Me(e).setVisible(!1)
        },
        sendMessage: x => {
            const S = "string";
            if (!x) throw new js;
            if (typeof x !== S) throw new Hr(S, typeof x);
            const R = [cn(x)];
            return n.ask(R, x), new Fn(`Successfully sent message '${x}'`)
        },
        sendEvent: x => {
            const S = "string";
            if (!x) throw new js;
            if (typeof x !== S) throw new Hr(S, typeof x);
            return n.sendEvent(x), new Fn(`Successfully sent event '${x}'`)
        },
        addContext: x => {
            hs(x, Kn.CONTEXT);
            const S = Ze(t);
            return S.state.contexts = {
                ...S.state.contexts,
                ...x
            }, s.emit(_e.ADD_CONTEXT, x), new Fn(`Context ${JSON.stringify(x)} set`)
        },
        setLanguage: x => {
            if (!x) throw new js;
            const S = "string";
            if (typeof x !== S) throw new Hr(S, typeof x);
            const {
                state: R
            } = Me(e), E = Bt(t);
            if (!E.languages.translationEnabled) throw new zo(`${R.CONFIGKEY} does not have translation enabled`);
            if (E.languages.supportedLanguages.find(re => re.languageCode === x)) return E.languages.selectedLanguage = x, s.emit(_e.SET_LANGUAGE, {
                languageCode: x,
                showDivider: !1
            }), new Fn(`Successfully set language code to ${x}`);
            throw new zo(`${R.CONFIGKEY} does not have ${x} enabled`)
        },
        getLanguage: () => {
            const {
                languages: x
            } = Bt(t);
            return new Fn("Successfully returned a language code", x.selectedLanguage || x.originalLanguage)
        },
        addConversationVariables: x => {
            hs(x, Kn.CONVERSATION_VARIABLES);
            const S = Ze(t);
            return S.state.conversationVariables = {
                ...S.state.conversationVariables,
                ...x
            }, S.state.conversationVariablesChanged = !0, s.emit(_e.ADD_CONVERSATION_VARIABLES, x), new Fn(`Conversation variable ${JSON.stringify(x)} added`)
        },
        addUserProperties: x => {
            hs(x, Kn.USER_IDENTIFIERS);
            const S = Ze(t);
            return S.state.userProperties = {
                ...S.state.userProperties,
                ...x
            }, s.emit(_e.ADD_USER_PROPERTIES, x), new Fn(`User identifier ${JSON.stringify(x)} added`)
        },
        onAnswer: x => {
            r.addListener(Ca.ON_ANSWER, x)
        }
    }
};

function dd(e, t) {
    return function() {
        return e.apply(t, arguments)
    }
}
const {
    toString: x_
} = Object.prototype, {
    getPrototypeOf: ja
} = Object, Oi = (e => t => {
    const n = x_.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
})(Object.create(null)), Ht = e => (e = e.toLowerCase(), t => Oi(t) === e), Ri = e => t => typeof t === e, {
    isArray: ks
} = Array, er = Ri("undefined");

function k_(e) {
    return e !== null && !er(e) && e.constructor !== null && !er(e.constructor) && bt(e.constructor.isBuffer) && e.constructor.isBuffer(e)
}
const fd = Ht("ArrayBuffer");

function E_(e) {
    let t;
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && fd(e.buffer), t
}
const A_ = Ri("string"),
    bt = Ri("function"),
    hd = Ri("number"),
    Ni = e => e !== null && typeof e == "object",
    T_ = e => e === !0 || e === !1,
    Vr = e => {
        if (Oi(e) !== "object") return !1;
        const t = ja(e);
        return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
    },
    S_ = Ht("Date"),
    C_ = Ht("File"),
    O_ = Ht("Blob"),
    R_ = Ht("FileList"),
    N_ = e => Ni(e) && bt(e.pipe),
    L_ = e => {
        let t;
        return e && (typeof FormData == "function" && e instanceof FormData || bt(e.append) && ((t = Oi(e)) === "formdata" || t === "object" && bt(e.toString) && e.toString() === "[object FormData]"))
    },
    I_ = Ht("URLSearchParams"),
    [P_, D_, $_, z_] = ["ReadableStream", "Request", "Response", "Headers"].map(Ht),
    M_ = e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");

function mr(e, t, {
    allOwnKeys: n = !1
} = {}) {
    if (e === null || typeof e > "u") return;
    let s, r;
    if (typeof e != "object" && (e = [e]), ks(e))
        for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
    else {
        const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
            o = i.length;
        let a;
        for (s = 0; s < o; s++) a = i[s], t.call(null, e[a], a, e)
    }
}

function md(e, t) {
    t = t.toLowerCase();
    const n = Object.keys(e);
    let s = n.length,
        r;
    for (; s-- > 0;)
        if (r = n[s], t === r.toLowerCase()) return r;
    return null
}
const Hn = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(),
    gd = e => !er(e) && e !== Hn;

function Mo() {
    const {
        caseless: e
    } = gd(this) && this || {}, t = {}, n = (s, r) => {
        const i = e && md(t, r) || r;
        Vr(t[i]) && Vr(s) ? t[i] = Mo(t[i], s) : Vr(s) ? t[i] = Mo({}, s) : ks(s) ? t[i] = s.slice() : t[i] = s
    };
    for (let s = 0, r = arguments.length; s < r; s++) arguments[s] && mr(arguments[s], n);
    return t
}
const F_ = (e, t, n, {
        allOwnKeys: s
    } = {}) => (mr(t, (r, i) => {
        n && bt(r) ? e[i] = dd(r, n) : e[i] = r
    }, {
        allOwnKeys: s
    }), e),
    U_ = e => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    B_ = (e, t, n, s) => {
        e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
            value: t.prototype
        }), n && Object.assign(e.prototype, n)
    },
    j_ = (e, t, n, s) => {
        let r, i, o;
        const a = {};
        if (t = t || {}, e == null) return t;
        do {
            for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0;) o = r[i], (!s || s(o, e, t)) && !a[o] && (t[o] = e[o], a[o] = !0);
            e = n !== !1 && ja(e)
        } while (e && (!n || n(e, t)) && e !== Object.prototype);
        return t
    },
    q_ = (e, t, n) => {
        e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
        const s = e.indexOf(t, n);
        return s !== -1 && s === n
    },
    H_ = e => {
        if (!e) return null;
        if (ks(e)) return e;
        let t = e.length;
        if (!hd(t)) return null;
        const n = new Array(t);
        for (; t-- > 0;) n[t] = e[t];
        return n
    },
    V_ = (e => t => e && t instanceof e)(typeof Uint8Array < "u" && ja(Uint8Array)),
    G_ = (e, t) => {
        const s = (e && e[Symbol.iterator]).call(e);
        let r;
        for (;
            (r = s.next()) && !r.done;) {
            const i = r.value;
            t.call(e, i[0], i[1])
        }
    },
    K_ = (e, t) => {
        let n;
        const s = [];
        for (;
            (n = e.exec(t)) !== null;) s.push(n);
        return s
    },
    W_ = Ht("HTMLFormElement"),
    Q_ = e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(n, s, r) {
        return s.toUpperCase() + r
    }),
    Pl = (({
        hasOwnProperty: e
    }) => (t, n) => e.call(t, n))(Object.prototype),
    Y_ = Ht("RegExp"),
    wd = (e, t) => {
        const n = Object.getOwnPropertyDescriptors(e),
            s = {};
        mr(n, (r, i) => {
            let o;
            (o = t(r, i, e)) !== !1 && (s[i] = o || r)
        }), Object.defineProperties(e, s)
    },
    X_ = e => {
        wd(e, (t, n) => {
            if (bt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1) return !1;
            const s = e[n];
            if (!!bt(s)) {
                if (t.enumerable = !1, "writable" in t) {
                    t.writable = !1;
                    return
                }
                t.set || (t.set = () => {
                    throw Error("Can not rewrite read-only method '" + n + "'")
                })
            }
        })
    },
    J_ = (e, t) => {
        const n = {},
            s = r => {
                r.forEach(i => {
                    n[i] = !0
                })
            };
        return ks(e) ? s(e) : s(String(e).split(t)), n
    },
    Z_ = () => {},
    ex = (e, t) => e != null && Number.isFinite(e = +e) ? e : t,
    ro = "abcdefghijklmnopqrstuvwxyz",
    Dl = "0123456789",
    vd = {
        DIGIT: Dl,
        ALPHA: ro,
        ALPHA_DIGIT: ro + ro.toUpperCase() + Dl
    },
    tx = (e = 16, t = vd.ALPHA_DIGIT) => {
        let n = "";
        const {
            length: s
        } = t;
        for (; e--;) n += t[Math.random() * s | 0];
        return n
    };

function nx(e) {
    return !!(e && bt(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator])
}
const sx = e => {
        const t = new Array(10),
            n = (s, r) => {
                if (Ni(s)) {
                    if (t.indexOf(s) >= 0) return;
                    if (!("toJSON" in s)) {
                        t[r] = s;
                        const i = ks(s) ? [] : {};
                        return mr(s, (o, a) => {
                            const c = n(o, r + 1);
                            !er(c) && (i[a] = c)
                        }), t[r] = void 0, i
                    }
                }
                return s
            };
        return n(e, 0)
    },
    rx = Ht("AsyncFunction"),
    ix = e => e && (Ni(e) || bt(e)) && bt(e.then) && bt(e.catch),
    yd = ((e, t) => e ? setImmediate : t ? ((n, s) => (Hn.addEventListener("message", ({
        source: r,
        data: i
    }) => {
        r === Hn && i === n && s.length && s.shift()()
    }, !1), r => {
        s.push(r), Hn.postMessage(n, "*")
    }))(`axios@${Math.random()}`, []) : n => setTimeout(n))(typeof setImmediate == "function", bt(Hn.postMessage)),
    ox = typeof queueMicrotask < "u" ? queueMicrotask.bind(Hn) : typeof process < "u" && process.nextTick || yd,
    _ = {
        isArray: ks,
        isArrayBuffer: fd,
        isBuffer: k_,
        isFormData: L_,
        isArrayBufferView: E_,
        isString: A_,
        isNumber: hd,
        isBoolean: T_,
        isObject: Ni,
        isPlainObject: Vr,
        isReadableStream: P_,
        isRequest: D_,
        isResponse: $_,
        isHeaders: z_,
        isUndefined: er,
        isDate: S_,
        isFile: C_,
        isBlob: O_,
        isRegExp: Y_,
        isFunction: bt,
        isStream: N_,
        isURLSearchParams: I_,
        isTypedArray: V_,
        isFileList: R_,
        forEach: mr,
        merge: Mo,
        extend: F_,
        trim: M_,
        stripBOM: U_,
        inherits: B_,
        toFlatObject: j_,
        kindOf: Oi,
        kindOfTest: Ht,
        endsWith: q_,
        toArray: H_,
        forEachEntry: G_,
        matchAll: K_,
        isHTMLForm: W_,
        hasOwnProperty: Pl,
        hasOwnProp: Pl,
        reduceDescriptors: wd,
        freezeMethods: X_,
        toObjectSet: J_,
        toCamelCase: Q_,
        noop: Z_,
        toFiniteNumber: ex,
        findKey: md,
        global: Hn,
        isContextDefined: gd,
        ALPHABET: vd,
        generateString: tx,
        isSpecCompliantForm: nx,
        toJSONObject: sx,
        isAsyncFn: rx,
        isThenable: ix,
        setImmediate: yd,
        asap: ox
    };

function J(e, t, n, s, r) {
    Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r)
}
_.inherits(J, Error, {
    toJSON: function() {
        return {
            message: this.message,
            name: this.name,
            description: this.description,
            number: this.number,
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            config: _.toJSONObject(this.config),
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        }
    }
});
const bd = J.prototype,
    _d = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(e => {
    _d[e] = {
        value: e
    }
});
Object.defineProperties(J, _d);
Object.defineProperty(bd, "isAxiosError", {
    value: !0
});
J.from = (e, t, n, s, r, i) => {
    const o = Object.create(bd);
    return _.toFlatObject(e, o, function(c) {
        return c !== Error.prototype
    }, a => a !== "isAxiosError"), J.call(o, e.message, t, n, s, r), o.cause = e, o.name = e.name, i && Object.assign(o, i), o
};
const ax = null;

function Fo(e) {
    return _.isPlainObject(e) || _.isArray(e)
}

function xd(e) {
    return _.endsWith(e, "[]") ? e.slice(0, -2) : e
}

function $l(e, t, n) {
    return e ? e.concat(t).map(function(r, i) {
        return r = xd(r), !n && i ? "[" + r + "]" : r
    }).join(n ? "." : "") : t
}

function cx(e) {
    return _.isArray(e) && !e.some(Fo)
}
const lx = _.toFlatObject(_, {}, null, function(t) {
    return /^is[A-Z]/.test(t)
});

function Li(e, t, n) {
    if (!_.isObject(e)) throw new TypeError("target must be an object");
    t = t || new FormData, n = _.toFlatObject(n, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
    }, !1, function(w, y) {
        return !_.isUndefined(y[w])
    });
    const s = n.metaTokens,
        r = n.visitor || u,
        i = n.dots,
        o = n.indexes,
        c = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
    if (!_.isFunction(r)) throw new TypeError("visitor must be a function");

    function l(v) {
        if (v === null) return "";
        if (_.isDate(v)) return v.toISOString();
        if (!c && _.isBlob(v)) throw new J("Blob is not supported. Use a Buffer instead.");
        return _.isArrayBuffer(v) || _.isTypedArray(v) ? c && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v
    }

    function u(v, w, y) {
        let x = v;
        if (v && !y && typeof v == "object") {
            if (_.endsWith(w, "{}")) w = s ? w : w.slice(0, -2), v = JSON.stringify(v);
            else if (_.isArray(v) && cx(v) || (_.isFileList(v) || _.endsWith(w, "[]")) && (x = _.toArray(v))) return w = xd(w), x.forEach(function(R, E) {
                !(_.isUndefined(R) || R === null) && t.append(o === !0 ? $l([w], E, i) : o === null ? w : w + "[]", l(R))
            }), !1
        }
        return Fo(v) ? !0 : (t.append($l(y, w, i), l(v)), !1)
    }
    const p = [],
        d = Object.assign(lx, {
            defaultVisitor: u,
            convertValue: l,
            isVisitable: Fo
        });

    function g(v, w) {
        if (!_.isUndefined(v)) {
            if (p.indexOf(v) !== -1) throw Error("Circular reference detected in " + w.join("."));
            p.push(v), _.forEach(v, function(x, S) {
                (!(_.isUndefined(x) || x === null) && r.call(t, x, _.isString(S) ? S.trim() : S, w, d)) === !0 && g(x, w ? w.concat(S) : [S])
            }), p.pop()
        }
    }
    if (!_.isObject(e)) throw new TypeError("data must be an object");
    return g(e), t
}

function zl(e) {
    const t = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\0"
    };
    return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
        return t[s]
    })
}

function qa(e, t) {
    this._pairs = [], e && Li(e, this, t)
}
const kd = qa.prototype;
kd.append = function(t, n) {
    this._pairs.push([t, n])
};
kd.toString = function(t) {
    const n = t ? function(s) {
        return t.call(this, s, zl)
    } : zl;
    return this._pairs.map(function(r) {
        return n(r[0]) + "=" + n(r[1])
    }, "").join("&")
};

function ux(e) {
    return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}

function Ed(e, t, n) {
    if (!t) return e;
    const s = n && n.encode || ux,
        r = n && n.serialize;
    let i;
    if (r ? i = r(t, n) : i = _.isURLSearchParams(t) ? t.toString() : new qa(t, n).toString(s), i) {
        const o = e.indexOf("#");
        o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i
    }
    return e
}
class px {
    constructor() {
        this.handlers = []
    }
    use(t, n, s) {
        return this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: s ? s.synchronous : !1,
            runWhen: s ? s.runWhen : null
        }), this.handlers.length - 1
    }
    eject(t) {
        this.handlers[t] && (this.handlers[t] = null)
    }
    clear() {
        this.handlers && (this.handlers = [])
    }
    forEach(t) {
        _.forEach(this.handlers, function(s) {
            s !== null && t(s)
        })
    }
}
const Ml = px,
    Ad = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1
    },
    dx = typeof URLSearchParams < "u" ? URLSearchParams : qa,
    fx = typeof FormData < "u" ? FormData : null,
    hx = typeof Blob < "u" ? Blob : null,
    mx = {
        isBrowser: !0,
        classes: {
            URLSearchParams: dx,
            FormData: fx,
            Blob: hx
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
    },
    Ha = typeof window < "u" && typeof document < "u",
    gx = (e => Ha && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(typeof navigator < "u" && navigator.product),
    wx = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(),
    vx = Ha && window.location.href || "http://localhost",
    yx = Object.freeze(Object.defineProperty({
        __proto__: null,
        hasBrowserEnv: Ha,
        hasStandardBrowserWebWorkerEnv: wx,
        hasStandardBrowserEnv: gx,
        origin: vx
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    Ft = {
        ...yx,
        ...mx
    };

function bx(e, t) {
    return Li(e, new Ft.classes.URLSearchParams, Object.assign({
        visitor: function(n, s, r, i) {
            return Ft.isNode && _.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments)
        }
    }, t))
}

function _x(e) {
    return _.matchAll(/\w+|\[(\w*)]/g, e).map(t => t[0] === "[]" ? "" : t[1] || t[0])
}

function xx(e) {
    const t = {},
        n = Object.keys(e);
    let s;
    const r = n.length;
    let i;
    for (s = 0; s < r; s++) i = n[s], t[i] = e[i];
    return t
}

function Td(e) {
    function t(n, s, r, i) {
        let o = n[i++];
        if (o === "__proto__") return !0;
        const a = Number.isFinite(+o),
            c = i >= n.length;
        return o = !o && _.isArray(r) ? r.length : o, c ? (_.hasOwnProp(r, o) ? r[o] = [r[o], s] : r[o] = s, !a) : ((!r[o] || !_.isObject(r[o])) && (r[o] = []), t(n, s, r[o], i) && _.isArray(r[o]) && (r[o] = xx(r[o])), !a)
    }
    if (_.isFormData(e) && _.isFunction(e.entries)) {
        const n = {};
        return _.forEachEntry(e, (s, r) => {
            t(_x(s), r, n, 0)
        }), n
    }
    return null
}

function kx(e, t, n) {
    if (_.isString(e)) try {
        return (t || JSON.parse)(e), _.trim(e)
    } catch (s) {
        if (s.name !== "SyntaxError") throw s
    }
    return (n || JSON.stringify)(e)
}
const Va = {
    transitional: Ad,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function(t, n) {
        const s = n.getContentType() || "",
            r = s.indexOf("application/json") > -1,
            i = _.isObject(t);
        if (i && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t)) return r ? JSON.stringify(Td(t)) : t;
        if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t)) return t;
        if (_.isArrayBufferView(t)) return t.buffer;
        if (_.isURLSearchParams(t)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
        let a;
        if (i) {
            if (s.indexOf("application/x-www-form-urlencoded") > -1) return bx(t, this.formSerializer).toString();
            if ((a = _.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
                const c = this.env && this.env.FormData;
                return Li(a ? {
                    "files[]": t
                } : t, c && new c, this.formSerializer)
            }
        }
        return i || r ? (n.setContentType("application/json", !1), kx(t)) : t
    }],
    transformResponse: [function(t) {
        const n = this.transitional || Va.transitional,
            s = n && n.forcedJSONParsing,
            r = this.responseType === "json";
        if (_.isResponse(t) || _.isReadableStream(t)) return t;
        if (t && _.isString(t) && (s && !this.responseType || r)) {
            const o = !(n && n.silentJSONParsing) && r;
            try {
                return JSON.parse(t)
            } catch (a) {
                if (o) throw a.name === "SyntaxError" ? J.from(a, J.ERR_BAD_RESPONSE, this, null, this.response) : a
            }
        }
        return t
    }],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: Ft.classes.FormData,
        Blob: Ft.classes.Blob
    },
    validateStatus: function(t) {
        return t >= 200 && t < 300
    },
    headers: {
        common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
        }
    }
};
_.forEach(["delete", "get", "head", "post", "put", "patch"], e => {
    Va.headers[e] = {}
});
const Ga = Va,
    Ex = _.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
    Ax = e => {
        const t = {};
        let n, s, r;
        return e && e.split(`
`).forEach(function(o) {
            r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), s = o.substring(r + 1).trim(), !(!n || t[n] && Ex[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s)
        }), t
    },
    Fl = Symbol("internals");

function Ls(e) {
    return e && String(e).trim().toLowerCase()
}

function Gr(e) {
    return e === !1 || e == null ? e : _.isArray(e) ? e.map(Gr) : String(e)
}

function Tx(e) {
    const t = Object.create(null),
        n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let s;
    for (; s = n.exec(e);) t[s[1]] = s[2];
    return t
}
const Sx = e => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());

function io(e, t, n, s, r) {
    if (_.isFunction(s)) return s.call(this, t, n);
    if (r && (t = n), !!_.isString(t)) {
        if (_.isString(s)) return t.indexOf(s) !== -1;
        if (_.isRegExp(s)) return s.test(t)
    }
}

function Cx(e) {
    return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s)
}

function Ox(e, t) {
    const n = _.toCamelCase(" " + t);
    ["get", "set", "has"].forEach(s => {
        Object.defineProperty(e, s + n, {
            value: function(r, i, o) {
                return this[s].call(this, t, r, i, o)
            },
            configurable: !0
        })
    })
}
class Ii {
    constructor(t) {
        t && this.set(t)
    }
    set(t, n, s) {
        const r = this;

        function i(a, c, l) {
            const u = Ls(c);
            if (!u) throw new Error("header name must be a non-empty string");
            const p = _.findKey(r, u);
            (!p || r[p] === void 0 || l === !0 || l === void 0 && r[p] !== !1) && (r[p || c] = Gr(a))
        }
        const o = (a, c) => _.forEach(a, (l, u) => i(l, u, c));
        if (_.isPlainObject(t) || t instanceof this.constructor) o(t, n);
        else if (_.isString(t) && (t = t.trim()) && !Sx(t)) o(Ax(t), n);
        else if (_.isHeaders(t))
            for (const [a, c] of t.entries()) i(c, a, s);
        else t != null && i(n, t, s);
        return this
    }
    get(t, n) {
        if (t = Ls(t), t) {
            const s = _.findKey(this, t);
            if (s) {
                const r = this[s];
                if (!n) return r;
                if (n === !0) return Tx(r);
                if (_.isFunction(n)) return n.call(this, r, s);
                if (_.isRegExp(n)) return n.exec(r);
                throw new TypeError("parser must be boolean|regexp|function")
            }
        }
    }
    has(t, n) {
        if (t = Ls(t), t) {
            const s = _.findKey(this, t);
            return !!(s && this[s] !== void 0 && (!n || io(this, this[s], s, n)))
        }
        return !1
    }
    delete(t, n) {
        const s = this;
        let r = !1;

        function i(o) {
            if (o = Ls(o), o) {
                const a = _.findKey(s, o);
                a && (!n || io(s, s[a], a, n)) && (delete s[a], r = !0)
            }
        }
        return _.isArray(t) ? t.forEach(i) : i(t), r
    }
    clear(t) {
        const n = Object.keys(this);
        let s = n.length,
            r = !1;
        for (; s--;) {
            const i = n[s];
            (!t || io(this, this[i], i, t, !0)) && (delete this[i], r = !0)
        }
        return r
    }
    normalize(t) {
        const n = this,
            s = {};
        return _.forEach(this, (r, i) => {
            const o = _.findKey(s, i);
            if (o) {
                n[o] = Gr(r), delete n[i];
                return
            }
            const a = t ? Cx(i) : String(i).trim();
            a !== i && delete n[i], n[a] = Gr(r), s[a] = !0
        }), this
    }
    concat(...t) {
        return this.constructor.concat(this, ...t)
    }
    toJSON(t) {
        const n = Object.create(null);
        return _.forEach(this, (s, r) => {
            s != null && s !== !1 && (n[r] = t && _.isArray(s) ? s.join(", ") : s)
        }), n
    } [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]()
    }
    toString() {
        return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`)
    }
    get[Symbol.toStringTag]() {
        return "AxiosHeaders"
    }
    static from(t) {
        return t instanceof this ? t : new this(t)
    }
    static concat(t, ...n) {
        const s = new this(t);
        return n.forEach(r => s.set(r)), s
    }
    static accessor(t) {
        const s = (this[Fl] = this[Fl] = {
                accessors: {}
            }).accessors,
            r = this.prototype;

        function i(o) {
            const a = Ls(o);
            s[a] || (Ox(r, o), s[a] = !0)
        }
        return _.isArray(t) ? t.forEach(i) : i(t), this
    }
}
Ii.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(Ii.prototype, ({
    value: e
}, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
        get: () => e,
        set(s) {
            this[n] = s
        }
    }
});
_.freezeMethods(Ii);
const Ut = Ii;

function oo(e, t) {
    const n = this || Ga,
        s = t || n,
        r = Ut.from(s.headers);
    let i = s.data;
    return _.forEach(e, function(a) {
        i = a.call(n, i, r.normalize(), t ? t.status : void 0)
    }), r.normalize(), i
}

function Sd(e) {
    return !!(e && e.__CANCEL__)
}

function Es(e, t, n) {
    J.call(this, e == null ? "canceled" : e, J.ERR_CANCELED, t, n), this.name = "CanceledError"
}
_.inherits(Es, J, {
    __CANCEL__: !0
});

function Cd(e, t, n) {
    const s = n.config.validateStatus;
    !n.status || !s || s(n.status) ? e(n) : t(new J("Request failed with status code " + n.status, [J.ERR_BAD_REQUEST, J.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n))
}

function Rx(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return t && t[1] || ""
}

function Nx(e, t) {
    e = e || 10;
    const n = new Array(e),
        s = new Array(e);
    let r = 0,
        i = 0,
        o;
    return t = t !== void 0 ? t : 1e3,
        function(c) {
            const l = Date.now(),
                u = s[i];
            o || (o = l), n[r] = c, s[r] = l;
            let p = i,
                d = 0;
            for (; p !== r;) d += n[p++], p = p % e;
            if (r = (r + 1) % e, r === i && (i = (i + 1) % e), l - o < t) return;
            const g = u && l - u;
            return g ? Math.round(d * 1e3 / g) : void 0
        }
}

function Lx(e, t) {
    let n = 0,
        s = 1e3 / t,
        r, i;
    const o = (l, u = Date.now()) => {
        n = u, r = null, i && (clearTimeout(i), i = null), e.apply(null, l)
    };
    return [(...l) => {
        const u = Date.now(),
            p = u - n;
        p >= s ? o(l, u) : (r = l, i || (i = setTimeout(() => {
            i = null, o(r)
        }, s - p)))
    }, () => r && o(r)]
}
const oi = (e, t, n = 3) => {
        let s = 0;
        const r = Nx(50, 250);
        return Lx(i => {
            const o = i.loaded,
                a = i.lengthComputable ? i.total : void 0,
                c = o - s,
                l = r(c),
                u = o <= a;
            s = o;
            const p = {
                loaded: o,
                total: a,
                progress: a ? o / a : void 0,
                bytes: c,
                rate: l || void 0,
                estimated: l && a && u ? (a - o) / l : void 0,
                event: i,
                lengthComputable: a != null,
                [t ? "download" : "upload"]: !0
            };
            e(p)
        }, n)
    },
    Ul = (e, t) => {
        const n = e != null;
        return [s => t[0]({
            lengthComputable: n,
            total: e,
            loaded: s
        }), t[1]]
    },
    Bl = e => (...t) => _.asap(() => e(...t)),
    Ix = Ft.hasStandardBrowserEnv ? function() {
        const t = /(msie|trident)/i.test(navigator.userAgent),
            n = document.createElement("a");
        let s;

        function r(i) {
            let o = i;
            return t && (n.setAttribute("href", o), o = n.href), n.setAttribute("href", o), {
                href: n.href,
                protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                host: n.host,
                search: n.search ? n.search.replace(/^\?/, "") : "",
                hash: n.hash ? n.hash.replace(/^#/, "") : "",
                hostname: n.hostname,
                port: n.port,
                pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
            }
        }
        return s = r(window.location.href),
            function(o) {
                const a = _.isString(o) ? r(o) : o;
                return a.protocol === s.protocol && a.host === s.host
            }
    }() : function() {
        return function() {
            return !0
        }
    }(),
    Px = Ft.hasStandardBrowserEnv ? {
        write(e, t, n, s, r, i) {
            const o = [e + "=" + encodeURIComponent(t)];
            _.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), _.isString(s) && o.push("path=" + s), _.isString(r) && o.push("domain=" + r), i === !0 && o.push("secure"), document.cookie = o.join("; ")
        },
        read(e) {
            const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
            return t ? decodeURIComponent(t[3]) : null
        },
        remove(e) {
            this.write(e, "", Date.now() - 864e5)
        }
    } : {
        write() {},
        read() {
            return null
        },
        remove() {}
    };

function Dx(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}

function $x(e, t) {
    return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e
}

function Od(e, t) {
    return e && !Dx(t) ? $x(e, t) : t
}
const jl = e => e instanceof Ut ? {
    ...e
} : e;

function Zn(e, t) {
    t = t || {};
    const n = {};

    function s(l, u, p) {
        return _.isPlainObject(l) && _.isPlainObject(u) ? _.merge.call({
            caseless: p
        }, l, u) : _.isPlainObject(u) ? _.merge({}, u) : _.isArray(u) ? u.slice() : u
    }

    function r(l, u, p) {
        if (_.isUndefined(u)) {
            if (!_.isUndefined(l)) return s(void 0, l, p)
        } else return s(l, u, p)
    }

    function i(l, u) {
        if (!_.isUndefined(u)) return s(void 0, u)
    }

    function o(l, u) {
        if (_.isUndefined(u)) {
            if (!_.isUndefined(l)) return s(void 0, l)
        } else return s(void 0, u)
    }

    function a(l, u, p) {
        if (p in t) return s(l, u);
        if (p in e) return s(void 0, l)
    }
    const c = {
        url: i,
        method: i,
        data: i,
        baseURL: o,
        transformRequest: o,
        transformResponse: o,
        paramsSerializer: o,
        timeout: o,
        timeoutMessage: o,
        withCredentials: o,
        withXSRFToken: o,
        adapter: o,
        responseType: o,
        xsrfCookieName: o,
        xsrfHeaderName: o,
        onUploadProgress: o,
        onDownloadProgress: o,
        decompress: o,
        maxContentLength: o,
        maxBodyLength: o,
        beforeRedirect: o,
        transport: o,
        httpAgent: o,
        httpsAgent: o,
        cancelToken: o,
        socketPath: o,
        responseEncoding: o,
        validateStatus: a,
        headers: (l, u) => r(jl(l), jl(u), !0)
    };
    return _.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
        const p = c[u] || r,
            d = p(e[u], t[u], u);
        _.isUndefined(d) && p !== a || (n[u] = d)
    }), n
}
const Rd = e => {
        const t = Zn({}, e);
        let {
            data: n,
            withXSRFToken: s,
            xsrfHeaderName: r,
            xsrfCookieName: i,
            headers: o,
            auth: a
        } = t;
        t.headers = o = Ut.from(o), t.url = Ed(Od(t.baseURL, t.url), e.params, e.paramsSerializer), a && o.set("Authorization", "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : "")));
        let c;
        if (_.isFormData(n)) {
            if (Ft.hasStandardBrowserEnv || Ft.hasStandardBrowserWebWorkerEnv) o.setContentType(void 0);
            else if ((c = o.getContentType()) !== !1) {
                const [l, ...u] = c ? c.split(";").map(p => p.trim()).filter(Boolean) : [];
                o.setContentType([l || "multipart/form-data", ...u].join("; "))
            }
        }
        if (Ft.hasStandardBrowserEnv && (s && _.isFunction(s) && (s = s(t)), s || s !== !1 && Ix(t.url))) {
            const l = r && i && Px.read(i);
            l && o.set(r, l)
        }
        return t
    },
    zx = typeof XMLHttpRequest < "u",
    Mx = zx && function(e) {
        return new Promise(function(n, s) {
            const r = Rd(e);
            let i = r.data;
            const o = Ut.from(r.headers).normalize();
            let {
                responseType: a,
                onUploadProgress: c,
                onDownloadProgress: l
            } = r, u, p, d, g, v;

            function w() {
                g && g(), v && v(), r.cancelToken && r.cancelToken.unsubscribe(u), r.signal && r.signal.removeEventListener("abort", u)
            }
            let y = new XMLHttpRequest;
            y.open(r.method.toUpperCase(), r.url, !0), y.timeout = r.timeout;

            function x() {
                if (!y) return;
                const R = Ut.from("getAllResponseHeaders" in y && y.getAllResponseHeaders()),
                    V = {
                        data: !a || a === "text" || a === "json" ? y.responseText : y.response,
                        status: y.status,
                        statusText: y.statusText,
                        headers: R,
                        config: e,
                        request: y
                    };
                Cd(function(le) {
                    n(le), w()
                }, function(le) {
                    s(le), w()
                }, V), y = null
            }
            "onloadend" in y ? y.onloadend = x : y.onreadystatechange = function() {
                !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(x)
            }, y.onabort = function() {
                !y || (s(new J("Request aborted", J.ECONNABORTED, e, y)), y = null)
            }, y.onerror = function() {
                s(new J("Network Error", J.ERR_NETWORK, e, y)), y = null
            }, y.ontimeout = function() {
                let E = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
                const V = r.transitional || Ad;
                r.timeoutErrorMessage && (E = r.timeoutErrorMessage), s(new J(E, V.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED, e, y)), y = null
            }, i === void 0 && o.setContentType(null), "setRequestHeader" in y && _.forEach(o.toJSON(), function(E, V) {
                y.setRequestHeader(V, E)
            }), _.isUndefined(r.withCredentials) || (y.withCredentials = !!r.withCredentials), a && a !== "json" && (y.responseType = r.responseType), l && ([d, v] = oi(l, !0), y.addEventListener("progress", d)), c && y.upload && ([p, g] = oi(c), y.upload.addEventListener("progress", p), y.upload.addEventListener("loadend", g)), (r.cancelToken || r.signal) && (u = R => {
                !y || (s(!R || R.type ? new Es(null, e, y) : R), y.abort(), y = null)
            }, r.cancelToken && r.cancelToken.subscribe(u), r.signal && (r.signal.aborted ? u() : r.signal.addEventListener("abort", u)));
            const S = Rx(r.url);
            if (S && Ft.protocols.indexOf(S) === -1) {
                s(new J("Unsupported protocol " + S + ":", J.ERR_BAD_REQUEST, e));
                return
            }
            y.send(i || null)
        })
    },
    Fx = (e, t) => {
        let n = new AbortController,
            s;
        const r = function(c) {
            if (!s) {
                s = !0, o();
                const l = c instanceof Error ? c : this.reason;
                n.abort(l instanceof J ? l : new Es(l instanceof Error ? l.message : l))
            }
        };
        let i = t && setTimeout(() => {
            r(new J(`timeout ${t} of ms exceeded`, J.ETIMEDOUT))
        }, t);
        const o = () => {
            e && (i && clearTimeout(i), i = null, e.forEach(c => {
                c && (c.removeEventListener ? c.removeEventListener("abort", r) : c.unsubscribe(r))
            }), e = null)
        };
        e.forEach(c => c && c.addEventListener && c.addEventListener("abort", r));
        const {
            signal: a
        } = n;
        return a.unsubscribe = o, [a, () => {
            i && clearTimeout(i), i = null
        }]
    },
    Ux = Fx,
    Bx = function*(e, t) {
        let n = e.byteLength;
        if (!t || n < t) {
            yield e;
            return
        }
        let s = 0,
            r;
        for (; s < n;) r = s + t, yield e.slice(s, r), s = r
    },
    jx = async function*(e, t, n) {
        for await (const s of e) yield* Bx(ArrayBuffer.isView(s) ? s : await n(String(s)), t)
    }, ql = (e, t, n, s, r) => {
        const i = jx(e, t, r);
        let o = 0,
            a, c = l => {
                a || (a = !0, s && s(l))
            };
        return new ReadableStream({
            async pull(l) {
                try {
                    const {
                        done: u,
                        value: p
                    } = await i.next();
                    if (u) {
                        c(), l.close();
                        return
                    }
                    let d = p.byteLength;
                    if (n) {
                        let g = o += d;
                        n(g)
                    }
                    l.enqueue(new Uint8Array(p))
                } catch (u) {
                    throw c(u), u
                }
            },
            cancel(l) {
                return c(l), i.return()
            }
        }, {
            highWaterMark: 2
        })
    }, Pi = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Nd = Pi && typeof ReadableStream == "function", Uo = Pi && (typeof TextEncoder == "function" ? (e => t => e.encode(t))(new TextEncoder) : async e => new Uint8Array(await new Response(e).arrayBuffer())), Ld = (e, ...t) => {
        try {
            return !!e(...t)
        } catch {
            return !1
        }
    }, qx = Nd && Ld(() => {
        let e = !1;
        const t = new Request(Ft.origin, {
            body: new ReadableStream,
            method: "POST",
            get duplex() {
                return e = !0, "half"
            }
        }).headers.has("Content-Type");
        return e && !t
    }), Hl = 64 * 1024, Bo = Nd && Ld(() => _.isReadableStream(new Response("").body)), ai = {
        stream: Bo && (e => e.body)
    };
Pi && (e => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(t => {
        !ai[t] && (ai[t] = _.isFunction(e[t]) ? n => n[t]() : (n, s) => {
            throw new J(`Response type '${t}' is not supported`, J.ERR_NOT_SUPPORT, s)
        })
    })
})(new Response);
const Hx = async e => {
    if (e == null) return 0;
    if (_.isBlob(e)) return e.size;
    if (_.isSpecCompliantForm(e)) return (await new Request(e).arrayBuffer()).byteLength;
    if (_.isArrayBufferView(e) || _.isArrayBuffer(e)) return e.byteLength;
    if (_.isURLSearchParams(e) && (e = e + ""), _.isString(e)) return (await Uo(e)).byteLength
}, Vx = async (e, t) => {
    const n = _.toFiniteNumber(e.getContentLength());
    return n == null ? Hx(t) : n
}, Gx = Pi && (async e => {
    let {
        url: t,
        method: n,
        data: s,
        signal: r,
        cancelToken: i,
        timeout: o,
        onDownloadProgress: a,
        onUploadProgress: c,
        responseType: l,
        headers: u,
        withCredentials: p = "same-origin",
        fetchOptions: d
    } = Rd(e);
    l = l ? (l + "").toLowerCase() : "text";
    let [g, v] = r || i || o ? Ux([r, i], o) : [], w, y;
    const x = () => {
        !w && setTimeout(() => {
            g && g.unsubscribe()
        }), w = !0
    };
    let S;
    try {
        if (c && qx && n !== "get" && n !== "head" && (S = await Vx(u, s)) !== 0) {
            let re = new Request(t, {
                    method: "POST",
                    body: s,
                    duplex: "half"
                }),
                le;
            if (_.isFormData(s) && (le = re.headers.get("content-type")) && u.setContentType(le), re.body) {
                const [F, q] = Ul(S, oi(Bl(c)));
                s = ql(re.body, Hl, F, q, Uo)
            }
        }
        _.isString(p) || (p = p ? "include" : "omit"), y = new Request(t, {
            ...d,
            signal: g,
            method: n.toUpperCase(),
            headers: u.normalize().toJSON(),
            body: s,
            duplex: "half",
            credentials: p
        });
        let R = await fetch(y);
        const E = Bo && (l === "stream" || l === "response");
        if (Bo && (a || E)) {
            const re = {};
            ["status", "statusText", "headers"].forEach(X => {
                re[X] = R[X]
            });
            const le = _.toFiniteNumber(R.headers.get("content-length")),
                [F, q] = a && Ul(le, oi(Bl(a), !0)) || [];
            R = new Response(ql(R.body, Hl, F, () => {
                q && q(), E && x()
            }, Uo), re)
        }
        l = l || "text";
        let V = await ai[_.findKey(ai, l) || "text"](R, e);
        return !E && x(), v && v(), await new Promise((re, le) => {
            Cd(re, le, {
                data: V,
                headers: Ut.from(R.headers),
                status: R.status,
                statusText: R.statusText,
                config: e,
                request: y
            })
        })
    } catch (R) {
        throw x(), R && R.name === "TypeError" && /fetch/i.test(R.message) ? Object.assign(new J("Network Error", J.ERR_NETWORK, e, y), {
            cause: R.cause || R
        }) : J.from(R, R && R.code, e, y)
    }
}), jo = {
    http: ax,
    xhr: Mx,
    fetch: Gx
};
_.forEach(jo, (e, t) => {
    if (e) {
        try {
            Object.defineProperty(e, "name", {
                value: t
            })
        } catch {}
        Object.defineProperty(e, "adapterName", {
            value: t
        })
    }
});
const Vl = e => `- ${e}`,
    Kx = e => _.isFunction(e) || e === null || e === !1,
    Id = {
        getAdapter: e => {
            e = _.isArray(e) ? e : [e];
            const {
                length: t
            } = e;
            let n, s;
            const r = {};
            for (let i = 0; i < t; i++) {
                n = e[i];
                let o;
                if (s = n, !Kx(n) && (s = jo[(o = String(n)).toLowerCase()], s === void 0)) throw new J(`Unknown adapter '${o}'`);
                if (s) break;
                r[o || "#" + i] = s
            }
            if (!s) {
                const i = Object.entries(r).map(([a, c]) => `adapter ${a} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build"));
                let o = t ? i.length > 1 ? `since :
` + i.map(Vl).join(`
`) : " " + Vl(i[0]) : "as no adapter specified";
                throw new J("There is no suitable adapter to dispatch the request " + o, "ERR_NOT_SUPPORT")
            }
            return s
        },
        adapters: jo
    };

function ao(e) {
    if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Es(null, e)
}

function Gl(e) {
    return ao(e), e.headers = Ut.from(e.headers), e.data = oo.call(e, e.transformRequest), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Id.getAdapter(e.adapter || Ga.adapter)(e).then(function(s) {
        return ao(e), s.data = oo.call(e, e.transformResponse, s), s.headers = Ut.from(s.headers), s
    }, function(s) {
        return Sd(s) || (ao(e), s && s.response && (s.response.data = oo.call(e, e.transformResponse, s.response), s.response.headers = Ut.from(s.response.headers))), Promise.reject(s)
    })
}
const Pd = "1.7.4",
    Ka = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
    Ka[e] = function(s) {
        return typeof s === e || "a" + (t < 1 ? "n " : " ") + e
    }
});
const Kl = {};
Ka.transitional = function(t, n, s) {
    function r(i, o) {
        return "[Axios v" + Pd + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "")
    }
    return (i, o, a) => {
        if (t === !1) throw new J(r(o, " has been removed" + (n ? " in " + n : "")), J.ERR_DEPRECATED);
        return n && !Kl[o] && (Kl[o] = !0, console.warn(r(o, " has been deprecated since v" + n + " and will be removed in the near future"))), t ? t(i, o, a) : !0
    }
};

function Wx(e, t, n) {
    if (typeof e != "object") throw new J("options must be an object", J.ERR_BAD_OPTION_VALUE);
    const s = Object.keys(e);
    let r = s.length;
    for (; r-- > 0;) {
        const i = s[r],
            o = t[i];
        if (o) {
            const a = e[i],
                c = a === void 0 || o(a, i, e);
            if (c !== !0) throw new J("option " + i + " must be " + c, J.ERR_BAD_OPTION_VALUE);
            continue
        }
        if (n !== !0) throw new J("Unknown option " + i, J.ERR_BAD_OPTION)
    }
}
const qo = {
        assertOptions: Wx,
        validators: Ka
    },
    wn = qo.validators;
class ci {
    constructor(t) {
        this.defaults = t, this.interceptors = {
            request: new Ml,
            response: new Ml
        }
    }
    async request(t, n) {
        try {
            return await this._request(t, n)
        } catch (s) {
            if (s instanceof Error) {
                let r;
                Error.captureStackTrace ? Error.captureStackTrace(r = {}) : r = new Error;
                const i = r.stack ? r.stack.replace(/^.+\n/, "") : "";
                try {
                    s.stack ? i && !String(s.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + i) : s.stack = i
                } catch {}
            }
            throw s
        }
    }
    _request(t, n) {
        typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Zn(this.defaults, n);
        const {
            transitional: s,
            paramsSerializer: r,
            headers: i
        } = n;
        s !== void 0 && qo.assertOptions(s, {
            silentJSONParsing: wn.transitional(wn.boolean),
            forcedJSONParsing: wn.transitional(wn.boolean),
            clarifyTimeoutError: wn.transitional(wn.boolean)
        }, !1), r != null && (_.isFunction(r) ? n.paramsSerializer = {
            serialize: r
        } : qo.assertOptions(r, {
            encode: wn.function,
            serialize: wn.function
        }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
        let o = i && _.merge(i.common, i[n.method]);
        i && _.forEach(["delete", "get", "head", "post", "put", "patch", "common"], v => {
            delete i[v]
        }), n.headers = Ut.concat(o, i);
        const a = [];
        let c = !0;
        this.interceptors.request.forEach(function(w) {
            typeof w.runWhen == "function" && w.runWhen(n) === !1 || (c = c && w.synchronous, a.unshift(w.fulfilled, w.rejected))
        });
        const l = [];
        this.interceptors.response.forEach(function(w) {
            l.push(w.fulfilled, w.rejected)
        });
        let u, p = 0,
            d;
        if (!c) {
            const v = [Gl.bind(this), void 0];
            for (v.unshift.apply(v, a), v.push.apply(v, l), d = v.length, u = Promise.resolve(n); p < d;) u = u.then(v[p++], v[p++]);
            return u
        }
        d = a.length;
        let g = n;
        for (p = 0; p < d;) {
            const v = a[p++],
                w = a[p++];
            try {
                g = v(g)
            } catch (y) {
                w.call(this, y);
                break
            }
        }
        try {
            u = Gl.call(this, g)
        } catch (v) {
            return Promise.reject(v)
        }
        for (p = 0, d = l.length; p < d;) u = u.then(l[p++], l[p++]);
        return u
    }
    getUri(t) {
        t = Zn(this.defaults, t);
        const n = Od(t.baseURL, t.url);
        return Ed(n, t.params, t.paramsSerializer)
    }
}
_.forEach(["delete", "get", "head", "options"], function(t) {
    ci.prototype[t] = function(n, s) {
        return this.request(Zn(s || {}, {
            method: t,
            url: n,
            data: (s || {}).data
        }))
    }
});
_.forEach(["post", "put", "patch"], function(t) {
    function n(s) {
        return function(i, o, a) {
            return this.request(Zn(a || {}, {
                method: t,
                headers: s ? {
                    "Content-Type": "multipart/form-data"
                } : {},
                url: i,
                data: o
            }))
        }
    }
    ci.prototype[t] = n(), ci.prototype[t + "Form"] = n(!0)
});
const Kr = ci;
class Wa {
    constructor(t) {
        if (typeof t != "function") throw new TypeError("executor must be a function.");
        let n;
        this.promise = new Promise(function(i) {
            n = i
        });
        const s = this;
        this.promise.then(r => {
            if (!s._listeners) return;
            let i = s._listeners.length;
            for (; i-- > 0;) s._listeners[i](r);
            s._listeners = null
        }), this.promise.then = r => {
            let i;
            const o = new Promise(a => {
                s.subscribe(a), i = a
            }).then(r);
            return o.cancel = function() {
                s.unsubscribe(i)
            }, o
        }, t(function(i, o, a) {
            s.reason || (s.reason = new Es(i, o, a), n(s.reason))
        })
    }
    throwIfRequested() {
        if (this.reason) throw this.reason
    }
    subscribe(t) {
        if (this.reason) {
            t(this.reason);
            return
        }
        this._listeners ? this._listeners.push(t) : this._listeners = [t]
    }
    unsubscribe(t) {
        if (!this._listeners) return;
        const n = this._listeners.indexOf(t);
        n !== -1 && this._listeners.splice(n, 1)
    }
    static source() {
        let t;
        return {
            token: new Wa(function(r) {
                t = r
            }),
            cancel: t
        }
    }
}
const Qx = Wa;

function Yx(e) {
    return function(n) {
        return e.apply(null, n)
    }
}

function Xx(e) {
    return _.isObject(e) && e.isAxiosError === !0
}
const Ho = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
};
Object.entries(Ho).forEach(([e, t]) => {
    Ho[t] = e
});
const Jx = Ho;

function Dd(e) {
    const t = new Kr(e),
        n = dd(Kr.prototype.request, t);
    return _.extend(n, Kr.prototype, t, {
        allOwnKeys: !0
    }), _.extend(n, t, null, {
        allOwnKeys: !0
    }), n.create = function(r) {
        return Dd(Zn(e, r))
    }, n
}
const Be = Dd(Ga);
Be.Axios = Kr;
Be.CanceledError = Es;
Be.CancelToken = Qx;
Be.isCancel = Sd;
Be.VERSION = Pd;
Be.toFormData = Li;
Be.AxiosError = J;
Be.Cancel = Be.CanceledError;
Be.all = function(t) {
    return Promise.all(t)
};
Be.spread = Yx;
Be.isAxiosError = Xx;
Be.mergeConfig = Zn;
Be.AxiosHeaders = Ut;
Be.formToJSON = e => Td(_.isHTMLForm(e) ? new FormData(e) : e);
Be.getAdapter = Id.getAdapter;
Be.HttpStatusCode = Jx;
Be.default = Be;
const Zx = Be;
var $d = (e => (e[e.upload = 6e4] = "upload", e))($d || {});
const e0 = () => {
        const e = Zx.create({
            baseURL: "https://webchat-api.digitalcx.com/cmupload",
            timeout: $d.upload
        });
        return {
            upload: async (n, s, r) => {
                const i = new FormData;
                return i.append("file", s), await e.post(`/upload/${n}`, i, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    onUploadProgress: r
                })
            }
        }
    },
    t0 = (e, t) => {
        const {
            INSTANCEKEY: n,
            CONFIGKEY: s,
            STYLEKEY: r,
            jsapiFunction: i
        } = e, o = Zc(s), a = Zc(n), c = Me(a);
        c.state.INSTANCEKEY = n, c.state.CONFIGKEY = s, c.state.customElementName = `cmwc-${n}`;
        const l = b_(a, o, s, t, r, i),
            u = Ep(o, l),
            p = e0(),
            d = __(a, o, u, l);
        return {
            socket: l,
            caic: u,
            cmupload: p,
            CONFIGKEY: s,
            pinia: a,
            sessionPinia: o,
            ...d
        }
    },
    n0 = () => {
        let e;
        const t = new Map,
            n = new Map,
            s = async w => new Promise(y => t.set(w.INSTANCEKEY, t0(w, y))), r = (w, y) => `${w}_${y}`, i = w => t.get(w), o = w => i(r(w, w)), a = ({
                config: w,
                style: y
            }) => t.get(`${w}_${y}`), c = w => {
                if (t.has(w)) throw new Error(`webchat instance with instanceKey ${w} is already defined`)
            }, l = async (w, y) => {
                for (const [x, S] of y) {
                    const R = r(w, x);
                    try {
                        if (t.has(R)) throw new Error(`webchat instance with configuration key ${w} and styleKey ${x} is already defined`);
                        await s({
                            INSTANCEKEY: R,
                            CONFIGKEY: w,
                            STYLEKEY: x,
                            jsapiFunction: S
                        }), y.delete(x)
                    } catch (E) {
                        console.error(E)
                    }
                }
            }, u = () => {
                n.forEach((w, y) => {
                    l(y, w), n.delete(y)
                })
            }, p = (w, y, x) => {
                const S = n.get(w);
                return S != null && S.has(y) ? S : (S == null ? void 0 : S.set(y, x)) || new Map().set(y, x)
            }, d = ({
                INSTANCEKEY: w,
                CONFIGKEY: y,
                STYLEKEY: x,
                jsapiFunction: S
            }) => {
                c(w);
                const R = p(y, x, S);
                n.set(y, R)
            };
        return e = {
            add: (w, y) => {
                try {
                    return d({
                        INSTANCEKEY: w,
                        CONFIGKEY: w,
                        STYLEKEY: w,
                        jsapiFunction: y
                    }), e
                } catch (x) {
                    return console.error(x), e
                }
            },
            addShared: (w, y) => {
                try {
                    if (!w.style) throw new Error("No stylekey defined for style");
                    if (!w.config) throw new Error("No configkey defined for config");
                    const {
                        config: x,
                        style: S
                    } = w;
                    return d({
                        INSTANCEKEY: r(x, S),
                        CONFIGKEY: x,
                        STYLEKEY: S,
                        jsapiFunction: y
                    }), e
                } catch (x) {
                    return console.error(x), e
                }
            },
            get: o,
            getByInstanceKey: i,
            getShared: a,
            install: u,
            createInstance: s,
            instances: t,
            installQueue: n
        }, e
    };
var Wl;
(Wl = window.cmwc) != null || (window.cmwc = n0());
const s0 = he({
        __name: "Text",
        props: {
            message: {}
        },
        setup(e) {
            const {
                message: t
            } = e, {
                $type: n,
                direction: s,
                text: r
            } = t;
            return (i, o) => b(r) ? (P(), Te(td, {
                key: 0,
                modifier: b(n) === b(Tt).TEXT && b(s) === b(qe).CLIENT_ORIGINATED ? "wc-c-bubble--primary" : "",
                innerHTML: b(r)
            }, null, 8, ["modifier", "innerHTML"])) : Ee("", !0)
        }
    }),
    r0 = {
        class: "wc-c-media__title"
    },
    i0 = {
        style: {
            "white-space": "nowrap"
        }
    },
    o0 = ["href"],
    a0 = ["src"],
    c0 = he({
        __name: "Media",
        props: {
            message: {}
        },
        setup(e) {
            const {
                message: t
            } = e, n = xe("app"), s = xs(n.pinia), {
                media: r,
                direction: i
            } = t, {
                name: o,
                uri: a,
                mimeType: c
            } = r, {
                name: l,
                extension: u
            } = Vp(o, c), p = c === "image/jpeg" || c === "image/jpg" || c === "image/png";
            return (d, g) => (P(), H("article", {
                class: ms(b(i) === b(qe).CLIENT_ORIGINATED ? "wc-c-media  wc-c-media--primary" : "wc-c-media")
            }, [I("h3", r0, Re(b(i) === b(qe).CLIENT_ORIGINATED ? "you" : b(s).agent.name) + " shared ", 1), b(p) ? Ee("", !0) : (P(), Te(en, {
                key: 0,
                class: ms(b(i) === b(qe).CLIENT_ORIGINATED ? "wc-c-icon-button--primary" : ""),
                href: b(a),
                target: "_blank",
                rel: "noopener noreferrer"
            }, {
                default: Y(() => [$(un, null, {
                    default: Y(() => [$(sd)]),
                    _: 1
                }), I("span", i0, Re(b(l)), 1), or(Re(b(u)), 1)]),
                _: 1
            }, 8, ["class", "href"])), b(p) ? (P(), H("a", {
                key: 1,
                class: "wc-c-media__link",
                href: b(a),
                target: "_blank",
                rel: "noopener noreferrer"
            }, [I("img", {
                class: "wc-c-media__image",
                src: b(a)
            }, null, 8, a0)], 8, o0)) : Ee("", !0)], 2))
        }
    }),
    l0 = {},
    u0 = {
        class: "wc-c-metadata"
    };

function p0(e, t) {
    return P(), H("menu", u0, [_t(e.$slots, "default")])
}
const d0 = ot(l0, [
        ["render", p0]
    ]),
    f0 = {},
    h0 = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    m0 = I("title", null, "Undo", -1),
    g0 = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M12,8 C9.698,8 7.51,9.011 6,10.724 L6,9 C6,8.447 5.552,8 5,8 C4.448,8 4,8.447 4,9 L4,13 C4,13.553 4.448,14 5,14 L9,14 C9.552,14 10,13.553 10,13 C10,12.447 9.552,12 9,12 L7.535,12 C8.667,10.74 10.292,10 12,10 C15.309,10 18,12.691 18,16 C18,16.553 18.448,17 19,17 C19.552,17 20,16.553 20,16 C20,11.589 16.411,8 12,8"
    }, null, -1),
    w0 = [m0, g0];

function v0(e, t) {
    return P(), H("svg", h0, w0)
}
const y0 = ot(f0, [
        ["render", v0]
    ]),
    b0 = ["data-layout", "aria-label"],
    _0 = {
        key: 0,
        class: "wc-c-message-group__agent"
    },
    x0 = ["data-id"],
    k0 = {
        class: "wc-c-message-group__metadata",
        role: "presentation"
    },
    E0 = he({
        __name: "Message",
        props: {
            content: {}
        },
        emits: ["scrollConversation"],
        setup(e, {
            emit: t
        }) {
            const {
                content: n
            } = e, {
                dialogPath: s,
                direction: r,
                agent: i,
                messageItems: o
            } = n, a = xe("app"), c = fn(a.sessionPinia), l = xe("conversationReference"), u = async g => {
                !g || (c.flushDialogOptions(), a.caic.dialogStep(g))
            };

            function p() {
                l != null && l.value && za(l.value.$el)
            }
            const d = {
                [qe.CLIENT_ORIGINATED]: "you answered",
                [qe.CLIENT_TERMINATED]: `${i==null?void 0:i.name} answered`
            };
            return (g, v) => (P(), H("section", {
                class: "wc-c-message-group",
                "data-layout": b(r),
                role: "group",
                "aria-label": d[b(r)]
            }, [b(r) === b(qe).CLIENT_TERMINATED ? (P(), H("figure", _0, [b(i) ? (P(), Te(Xp, {
                key: 0,
                agent: b(i),
                class: "wc-c-avatar--small"
            }, null, 8, ["agent"])) : Ee("", !0)])) : Ee("", !0), $(ar, {
                name: "wc-c-message-group__messages",
                class: "wc-c-message-group__messages",
                "data-cmwc-test-id": "message-group",
                tag: "ol",
                appear: "",
                onEnter: p
            }, {
                default: Y(() => [(P(!0), H(Pe, null, Wn(b(o), w => (P(), H("li", {
                    key: w.id,
                    class: "wc-c-message-group__message",
                    "data-id": w.id
                }, [w.$type === b(Tt).TEXT ? (P(), Te(s0, {
                    key: 0,
                    message: w
                }, null, 8, ["message"])) : Ee("", !0), w.$type === b(Tt).MEDIA ? (P(), Te(c0, {
                    key: 1,
                    message: w
                }, null, 8, ["message"])) : Ee("", !0)], 8, x0))), 128))]),
                _: 1
            }), I("footer", k0, [$(d0, null, {
                default: Y(() => [I("li", null, [b(s) && b(r) === b(qe).CLIENT_ORIGINATED ? (P(), Te(en, {
                    key: 0,
                    onClick: v[0] || (v[0] = w => b(s) ? u(b(s)) : null)
                }, {
                    default: Y(() => [I("span", null, Re(b(c).dialogConfig.chooseAgain.text), 1), $(un, null, {
                        default: Y(() => [$(y0)]),
                        _: 1
                    })]),
                    _: 1
                })) : Ee("", !0)]), _t(g.$slots, "default")]),
                _: 3
            })])], 8, b0))
        }
    }),
    A0 = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: E0
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    T0 = {
        class: "wc-c-divider"
    },
    S0 = he({
        __name: "Divider",
        props: {
            content: {}
        },
        setup(e) {
            return (t, n) => (P(), H("h3", T0, Re(t.content.text), 1))
        }
    }),
    C0 = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: S0
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    O0 = {},
    R0 = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        role: "img"
    },
    N0 = I("title", null, "Search", -1),
    L0 = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M4 10c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6m17.707 10.293-5.395-5.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l5.396 5.395a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414"
    }, null, -1),
    I0 = [N0, L0];

function P0(e, t) {
    return P(), H("svg", R0, I0)
}
const D0 = ot(O0, [
        ["render", P0]
    ]),
    $0 = ["data-state"],
    z0 = {
        class: "wc-c-input__search"
    },
    M0 = ["placeholder"],
    F0 = I("span", {
        id: "search-description",
        class: "sr-only"
    }, " Type to filter available languages ", -1),
    U0 = he({
        __name: "Search",
        props: {
            filter: {
                type: Function
            }
        },
        setup(e) {
            const t = xe("app"),
                {
                    elementState: n,
                    setElementStateOnEvent: s
                } = Rp(),
                r = ce(""),
                i = ce(),
                {
                    languages: o
                } = Ci(t.pinia);
            return dn(() => {
                i.value && i.value.focus()
            }), (a, c) => (P(), H("div", {
                class: "wc-c-input",
                "data-state": [...b(n)],
                role: "search",
                "aria-labelledby": "sheetHeader"
            }, [I("div", z0, [$(un, null, {
                default: Y(() => [$(D0)]),
                _: 1
            })]), Ks(I("input", {
                ref_key: "userInputArea",
                ref: i,
                "onUpdate:modelValue": c[0] || (c[0] = l => r.value = l),
                "aria-controls": "languageList",
                class: "wc-c-input__field",
                placeholder: b(o).placeholder,
                type: "search",
                "aria-label": "Search languages",
                "aria-describedby": "search-description",
                onInput: c[1] || (c[1] = l => a.filter(r.value)),
                onFocus: c[2] || (c[2] = (...l) => b(s) && b(s)(...l)),
                onFocusout: c[3] || (c[3] = (...l) => b(s) && b(s)(...l))
            }, null, 40, M0), [
                [np, r.value]
            ]), F0], 8, $0))
        }
    }),
    B0 = {
        "aria-live": "polite",
        class: "sr-only"
    },
    j0 = {
        id: "languageList",
        class: "wc-c-menu",
        "aria-labelledby": "sheetHeader menuHeader",
        "aria-describedby": "language-instructions"
    },
    q0 = I("span", {
        id: "language-instructions",
        class: "sr-only"
    }, " Select your preferred language from the list below ", -1),
    H0 = ["onClick"],
    V0 = ["data-state", "lang", "aria-checked"],
    G0 = he({
        __name: "Language",
        setup(e) {
            const t = xe("app"),
                n = Bt(t.sessionPinia),
                {
                    languages: s
                } = n;

            function r(o) {
                const a = o.toLowerCase(),
                    c = s.supportedLanguages.filter(({
                        name: l,
                        nativeName: u
                    }) => l.toLowerCase().includes(a) || u.toLowerCase().includes(a));
                n.setFilteredLanguages(c)
            }

            function i(o) {
                fn(t.sessionPinia).flushDialogOptions();
                const c = s.filteredLanguages.find(({
                        languageCode: p
                    }) => p === o),
                    l = s.filteredLanguages.find(p => p.isActive);
                c && (l == null ? void 0 : l.languageCode) !== (c == null ? void 0 : c.languageCode) && t.socket.emit(_e.SET_LANGUAGE, {
                    languageCode: o,
                    showDivider: !0
                });
                const u = hn(t.pinia);
                u.setContent(ae.MENU), u.state.isOpen = !1
            }
            return (o, a) => (P(), H(Pe, null, [$(U0, {
                filter: r
            }), I("div", B0, Re(`${b(s).filteredLanguages.length} ${b(s).filteredLanguages.length>1?"results":"result"}`), 1), I("menu", j0, [q0, (P(!0), H(Pe, null, Wn(b(s).filteredLanguages, ({
                languageCode: c,
                nativeName: l,
                isActive: u
            }) => (P(), H("li", {
                key: c,
                class: "wc-c-menu__item",
                role: "presentation",
                onClick: p => i(c)
            }, [I("button", {
                class: "wc-c-menu__button",
                "data-state": u,
                role: "menuitemradio",
                lang: c,
                "aria-checked": u
            }, Re(l), 9, V0)], 8, H0))), 128))])], 64))
        }
    }),
    zd = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: G0
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    K0 = {
        class: "wc-c-modal"
    },
    W0 = {
        class: "wc-c-modal__footer"
    },
    Q0 = he({
        __name: "Modal",
        setup(e) {
            const t = xe("app"),
                n = ce(),
                s = hr(t.pinia),
                r = Ci(t.pinia),
                i = hn(t.pinia),
                o = Bt(t.sessionPinia),
                a = qt(t.sessionPinia),
                c = {
                    [ae.LANGUAGE_DETECTED]: {
                        accept() {
                            a.resume();
                            const {
                                languages: l
                            } = o, u = r, p = o.languages.detectedLanguage;
                            if (!p) throw new Error("could not find detected language");
                            o.languages.disabledTranslation = !1, o.languages.selectedLanguage = p.languageCode;
                            const d = fr(u.languages.divider.replace(/{language}/g, p.nativeName));
                            a.enqueue(d, !0), a.dequeue(), i.state.isOpen = !1, i.setContent(ae.MENU);
                            const g = l.filteredLanguages.map(v => ({
                                ...v,
                                isActive: p.languageCode === v.languageCode
                            }));
                            o.setFilteredLanguages(g)
                        },
                        decline() {
                            o.setDetectedLanguage(void 0), o.languages.disabledTranslation = !0, a.resume(), a.dequeue(), t.socket.emit(_e.DISABLE_TRANSLATIONS), i.setContent(ae.MENU), i.state.isOpen = !1
                        }
                    },
                    [ae.RESET]: {
                        accept() {
                            t.socket.emit(_e.RESET), i.setContent(ae.MENU), i.state.isOpen = !1
                        },
                        decline() {
                            i.setContent(ae.MENU), i.state.isOpen = !1
                        }
                    }
                };
            return dn(() => {
                n.value && n.value.focus()
            }), (l, u) => {
                var p, d;
                return P(), H("article", K0, [I("p", null, Re(b(s).modal.text), 1), I("footer", W0, [I("button", {
                    ref_key: "modalButton",
                    ref: n,
                    class: "wc-c-option wc-c-option--clean",
                    "aria-label": "Decline",
                    onClick: u[0] || (u[0] = (...g) => c[b(s).modal.active].decline && c[b(s).modal.active].decline(...g))
                }, Re((p = b(s).modal.buttons) == null ? void 0 : p.decline), 513), I("button", {
                    class: "wc-c-option",
                    "aria-label": "Accept",
                    onClick: u[1] || (u[1] = (...g) => c[b(s).modal.active].accept && c[b(s).modal.active].accept(...g))
                }, Re((d = b(s).modal.buttons) == null ? void 0 : d.accept), 1)])])
            }
        }
    }),
    Md = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: Q0
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    Y0 = {},
    X0 = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    J0 = I("title", null, "Language", -1),
    Z0 = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M4.062 13a8.007 8.007 0 0 0 4.475 6.214C7.703 17.61 7.146 15.434 7.025 13H4.062Zm0-2h2.963c.12-2.434.678-4.61 1.512-6.214A8.007 8.007 0 0 0 4.062 11Zm15.876 0a8.007 8.007 0 0 0-4.475-6.214c.834 1.603 1.391 3.78 1.512 6.214h2.963Zm0 2h-2.963c-.12 2.434-.678 4.61-1.512 6.214A8.007 8.007 0 0 0 19.938 13Zm-10.91 0c.11 2.004.551 3.828 1.225 5.177C10.881 19.432 11.553 20 12 20c.448 0 1.119-.568 1.747-1.823.674-1.349 1.115-3.173 1.225-5.177H9.028Zm0-2h5.944c-.11-2.004-.551-3.828-1.225-5.177C13.119 4.568 12.447 4 12 4c-.448 0-1.119.568-1.747 1.823C9.58 7.172 9.138 8.996 9.028 11ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"
    }, null, -1),
    e1 = [J0, Z0];

function t1(e, t) {
    return P(), H("svg", X0, e1)
}
const n1 = ot(Y0, [
        ["render", t1]
    ]),
    s1 = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: n1
    }, Symbol.toStringTag, {
        value: "Module"
    })),
    r1 = {},
    i1 = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        role: "img"
    },
    o1 = I("title", null, "Reset", -1),
    a1 = I("path", {
        fill: "grey",
        "fill-rule": "evenodd",
        d: "M6 8.781V7a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2H7.616c.937-1.83 2.806-3 4.884-3 3.032 0 5.5 2.468 5.5 5.5S15.532 18 12.5 18a1 1 0 1 0 0 2c4.136 0 7.5-3.364 7.5-7.5S16.636 5 12.5 5A7.477 7.477 0 0 0 6 8.781Z"
    }, null, -1),
    c1 = [o1, a1];

function l1(e, t) {
    return P(), H("svg", i1, c1)
}
const u1 = ot(r1, [
        ["render", l1]
    ]),
    p1 = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: u1
    }, Symbol.toStringTag, {
        value: "Module"
    }));