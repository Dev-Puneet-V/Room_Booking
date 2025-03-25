function Sd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const o = Object.getOwnPropertyDescriptor(r, l);
          o &&
            Object.defineProperty(
              e,
              l,
              o.get ? o : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
function xd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Ca = { exports: {} },
  Ml = {},
  Na = { exports: {} },
  F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Cr = Symbol.for("react.element"),
  Ed = Symbol.for("react.portal"),
  kd = Symbol.for("react.fragment"),
  Cd = Symbol.for("react.strict_mode"),
  Nd = Symbol.for("react.profiler"),
  jd = Symbol.for("react.provider"),
  Rd = Symbol.for("react.context"),
  _d = Symbol.for("react.forward_ref"),
  Pd = Symbol.for("react.suspense"),
  Td = Symbol.for("react.memo"),
  Od = Symbol.for("react.lazy"),
  qs = Symbol.iterator;
function Ld(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (qs && e[qs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ja = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Ra = Object.assign,
  _a = {};
function Nn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = _a),
    (this.updater = n || ja);
}
Nn.prototype.isReactComponent = {};
Nn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Nn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Pa() {}
Pa.prototype = Nn.prototype;
function Qi(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = _a),
    (this.updater = n || ja);
}
var Ki = (Qi.prototype = new Pa());
Ki.constructor = Qi;
Ra(Ki, Nn.prototype);
Ki.isPureReactComponent = !0;
var Js = Array.isArray,
  Ta = Object.prototype.hasOwnProperty,
  qi = { current: null },
  Oa = { key: !0, ref: !0, __self: !0, __source: !0 };
function La(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      Ta.call(t, r) && !Oa.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), a = 0; a < s; a++) u[a] = arguments[a + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: Cr,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: qi.current,
  };
}
function Dd(e, t) {
  return {
    $$typeof: Cr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ji(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Cr;
}
function zd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Xs = /\/+/g;
function fo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? zd("" + e.key)
    : t.toString(36);
}
function Yr(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Cr:
          case Ed:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + fo(i, 0) : r),
      Js(l)
        ? ((n = ""),
          e != null && (n = e.replace(Xs, "$&/") + "/"),
          Yr(l, t, n, "", function (a) {
            return a;
          }))
        : l != null &&
          (Ji(l) &&
            (l = Dd(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(Xs, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Js(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var u = r + fo(o, s);
      i += Yr(o, t, n, u, l);
    }
  else if (((u = Ld(e)), typeof u == "function"))
    for (e = u.call(e), s = 0; !(o = e.next()).done; )
      (o = o.value), (u = r + fo(o, s++)), (i += Yr(o, t, n, u, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function Dr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Yr(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function Fd(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var me = { current: null },
  Gr = { transition: null },
  Ad = {
    ReactCurrentDispatcher: me,
    ReactCurrentBatchConfig: Gr,
    ReactCurrentOwner: qi,
  };
function Da() {
  throw Error("act(...) is not supported in production builds of React.");
}
F.Children = {
  map: Dr,
  forEach: function (e, t, n) {
    Dr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Dr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Dr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ji(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
F.Component = Nn;
F.Fragment = kd;
F.Profiler = Nd;
F.PureComponent = Qi;
F.StrictMode = Cd;
F.Suspense = Pd;
F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ad;
F.act = Da;
F.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Ra({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = qi.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (u in t)
      Ta.call(t, u) &&
        !Oa.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var a = 0; a < u; a++) s[a] = arguments[a + 2];
    r.children = s;
  }
  return { $$typeof: Cr, type: e.type, key: l, ref: o, props: r, _owner: i };
};
F.createContext = function (e) {
  return (
    (e = {
      $$typeof: Rd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: jd, _context: e }),
    (e.Consumer = e)
  );
};
F.createElement = La;
F.createFactory = function (e) {
  var t = La.bind(null, e);
  return (t.type = e), t;
};
F.createRef = function () {
  return { current: null };
};
F.forwardRef = function (e) {
  return { $$typeof: _d, render: e };
};
F.isValidElement = Ji;
F.lazy = function (e) {
  return { $$typeof: Od, _payload: { _status: -1, _result: e }, _init: Fd };
};
F.memo = function (e, t) {
  return { $$typeof: Td, type: e, compare: t === void 0 ? null : t };
};
F.startTransition = function (e) {
  var t = Gr.transition;
  Gr.transition = {};
  try {
    e();
  } finally {
    Gr.transition = t;
  }
};
F.unstable_act = Da;
F.useCallback = function (e, t) {
  return me.current.useCallback(e, t);
};
F.useContext = function (e) {
  return me.current.useContext(e);
};
F.useDebugValue = function () {};
F.useDeferredValue = function (e) {
  return me.current.useDeferredValue(e);
};
F.useEffect = function (e, t) {
  return me.current.useEffect(e, t);
};
F.useId = function () {
  return me.current.useId();
};
F.useImperativeHandle = function (e, t, n) {
  return me.current.useImperativeHandle(e, t, n);
};
F.useInsertionEffect = function (e, t) {
  return me.current.useInsertionEffect(e, t);
};
F.useLayoutEffect = function (e, t) {
  return me.current.useLayoutEffect(e, t);
};
F.useMemo = function (e, t) {
  return me.current.useMemo(e, t);
};
F.useReducer = function (e, t, n) {
  return me.current.useReducer(e, t, n);
};
F.useRef = function (e) {
  return me.current.useRef(e);
};
F.useState = function (e) {
  return me.current.useState(e);
};
F.useSyncExternalStore = function (e, t, n) {
  return me.current.useSyncExternalStore(e, t, n);
};
F.useTransition = function () {
  return me.current.useTransition();
};
F.version = "18.3.1";
Na.exports = F;
var C = Na.exports;
const za = xd(C),
  Id = Sd({ __proto__: null, default: za }, [C]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ud = C,
  Md = Symbol.for("react.element"),
  Bd = Symbol.for("react.fragment"),
  $d = Object.prototype.hasOwnProperty,
  Hd = Ud.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Vd = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fa(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) $d.call(t, r) && !Vd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Md,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: Hd.current,
  };
}
Ml.Fragment = Bd;
Ml.jsx = Fa;
Ml.jsxs = Fa;
Ca.exports = Ml;
var c = Ca.exports,
  Vo = {},
  Aa = { exports: {} },
  _e = {},
  Ia = { exports: {} },
  Ua = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, D) {
    var z = T.length;
    T.push(D);
    e: for (; 0 < z; ) {
      var q = (z - 1) >>> 1,
        ne = T[q];
      if (0 < l(ne, D)) (T[q] = D), (T[z] = ne), (z = q);
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var D = T[0],
      z = T.pop();
    if (z !== D) {
      T[0] = z;
      e: for (var q = 0, ne = T.length, Or = ne >>> 1; q < Or; ) {
        var Ot = 2 * (q + 1) - 1,
          co = T[Ot],
          Lt = Ot + 1,
          Lr = T[Lt];
        if (0 > l(co, z))
          Lt < ne && 0 > l(Lr, co)
            ? ((T[q] = Lr), (T[Lt] = z), (q = Lt))
            : ((T[q] = co), (T[Ot] = z), (q = Ot));
        else if (Lt < ne && 0 > l(Lr, z)) (T[q] = Lr), (T[Lt] = z), (q = Lt);
        else break e;
      }
    }
    return D;
  }
  function l(T, D) {
    var z = T.sortIndex - D.sortIndex;
    return z !== 0 ? z : T.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var u = [],
    a = [],
    f = 1,
    p = null,
    v = 3,
    w = !1,
    g = !1,
    y = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(T) {
    for (var D = n(a); D !== null; ) {
      if (D.callback === null) r(a);
      else if (D.startTime <= T)
        r(a), (D.sortIndex = D.expirationTime), t(u, D);
      else break;
      D = n(a);
    }
  }
  function E(T) {
    if (((y = !1), h(T), !g))
      if (n(u) !== null) (g = !0), uo(S);
      else {
        var D = n(a);
        D !== null && ao(E, D.startTime - T);
      }
  }
  function S(T, D) {
    (g = !1), y && ((y = !1), m(_), (_ = -1)), (w = !0);
    var z = v;
    try {
      for (
        h(D), p = n(u);
        p !== null && (!(p.expirationTime > D) || (T && !Z()));

      ) {
        var q = p.callback;
        if (typeof q == "function") {
          (p.callback = null), (v = p.priorityLevel);
          var ne = q(p.expirationTime <= D);
          (D = e.unstable_now()),
            typeof ne == "function" ? (p.callback = ne) : p === n(u) && r(u),
            h(D);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var Or = !0;
      else {
        var Ot = n(a);
        Ot !== null && ao(E, Ot.startTime - D), (Or = !1);
      }
      return Or;
    } finally {
      (p = null), (v = z), (w = !1);
    }
  }
  var R = !1,
    j = null,
    _ = -1,
    I = 5,
    O = -1;
  function Z() {
    return !(e.unstable_now() - O < I);
  }
  function zn() {
    if (j !== null) {
      var T = e.unstable_now();
      O = T;
      var D = !0;
      try {
        D = j(!0, T);
      } finally {
        D ? Fn() : ((R = !1), (j = null));
      }
    } else R = !1;
  }
  var Fn;
  if (typeof d == "function")
    Fn = function () {
      d(zn);
    };
  else if (typeof MessageChannel < "u") {
    var Ks = new MessageChannel(),
      wd = Ks.port2;
    (Ks.port1.onmessage = zn),
      (Fn = function () {
        wd.postMessage(null);
      });
  } else
    Fn = function () {
      x(zn, 0);
    };
  function uo(T) {
    (j = T), R || ((R = !0), Fn());
  }
  function ao(T, D) {
    _ = x(function () {
      T(e.unstable_now());
    }, D);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      g || w || ((g = !0), uo(S));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (I = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (T) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = v;
      }
      var z = v;
      v = D;
      try {
        return T();
      } finally {
        v = z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, D) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var z = v;
      v = T;
      try {
        return D();
      } finally {
        v = z;
      }
    }),
    (e.unstable_scheduleCallback = function (T, D, z) {
      var q = e.unstable_now();
      switch (
        (typeof z == "object" && z !== null
          ? ((z = z.delay), (z = typeof z == "number" && 0 < z ? q + z : q))
          : (z = q),
        T)
      ) {
        case 1:
          var ne = -1;
          break;
        case 2:
          ne = 250;
          break;
        case 5:
          ne = 1073741823;
          break;
        case 4:
          ne = 1e4;
          break;
        default:
          ne = 5e3;
      }
      return (
        (ne = z + ne),
        (T = {
          id: f++,
          callback: D,
          priorityLevel: T,
          startTime: z,
          expirationTime: ne,
          sortIndex: -1,
        }),
        z > q
          ? ((T.sortIndex = z),
            t(a, T),
            n(u) === null &&
              T === n(a) &&
              (y ? (m(_), (_ = -1)) : (y = !0), ao(E, z - q)))
          : ((T.sortIndex = ne), t(u, T), g || w || ((g = !0), uo(S))),
        T
      );
    }),
    (e.unstable_shouldYield = Z),
    (e.unstable_wrapCallback = function (T) {
      var D = v;
      return function () {
        var z = v;
        v = D;
        try {
          return T.apply(this, arguments);
        } finally {
          v = z;
        }
      };
    });
})(Ua);
Ia.exports = Ua;
var Wd = Ia.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qd = C,
  Re = Wd;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Ma = new Set(),
  lr = {};
function Jt(e, t) {
  yn(e, t), yn(e + "Capture", t);
}
function yn(e, t) {
  for (lr[e] = t, e = 0; e < t.length; e++) Ma.add(t[e]);
}
var tt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Wo = Object.prototype.hasOwnProperty,
  Kd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ys = {},
  Gs = {};
function qd(e) {
  return Wo.call(Gs, e)
    ? !0
    : Wo.call(Ys, e)
    ? !1
    : Kd.test(e)
    ? (Gs[e] = !0)
    : ((Ys[e] = !0), !1);
}
function Jd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Xd(e, t, n, r) {
  if (t === null || typeof t > "u" || Jd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ve(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    se[e] = new ve(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  se[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  se[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  se[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    se[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  se[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  se[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  se[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  se[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Xi = /[\-:]([a-z])/g;
function Yi(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xi, Yi);
    se[t] = new ve(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Xi, Yi);
    se[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Xi, Yi);
  se[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
se.xlinkHref = new ve(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Gi(e, t, n, r) {
  var l = se.hasOwnProperty(t) ? se[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Xd(t, n, l, r) && (n = null),
    r || l === null
      ? qd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = Qd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  zr = Symbol.for("react.element"),
  bt = Symbol.for("react.portal"),
  en = Symbol.for("react.fragment"),
  Zi = Symbol.for("react.strict_mode"),
  Qo = Symbol.for("react.profiler"),
  Ba = Symbol.for("react.provider"),
  $a = Symbol.for("react.context"),
  bi = Symbol.for("react.forward_ref"),
  Ko = Symbol.for("react.suspense"),
  qo = Symbol.for("react.suspense_list"),
  es = Symbol.for("react.memo"),
  at = Symbol.for("react.lazy"),
  Ha = Symbol.for("react.offscreen"),
  Zs = Symbol.iterator;
function An(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zs && e[Zs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Q = Object.assign,
  po;
function Qn(e) {
  if (po === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      po = (t && t[1]) || "";
    }
  return (
    `
` +
    po +
    e
  );
}
var ho = !1;
function mo(e, t) {
  if (!e || ho) return "";
  ho = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var l = a.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          s = o.length - 1;
        1 <= i && 0 <= s && l[i] !== o[s];

      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (l[i] !== o[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || l[i] !== o[s])) {
                var u =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    (ho = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Qn(e) : "";
}
function Yd(e) {
  switch (e.tag) {
    case 5:
      return Qn(e.type);
    case 16:
      return Qn("Lazy");
    case 13:
      return Qn("Suspense");
    case 19:
      return Qn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = mo(e.type, !1)), e;
    case 11:
      return (e = mo(e.type.render, !1)), e;
    case 1:
      return (e = mo(e.type, !0)), e;
    default:
      return "";
  }
}
function Jo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case en:
      return "Fragment";
    case bt:
      return "Portal";
    case Qo:
      return "Profiler";
    case Zi:
      return "StrictMode";
    case Ko:
      return "Suspense";
    case qo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case $a:
        return (e.displayName || "Context") + ".Consumer";
      case Ba:
        return (e._context.displayName || "Context") + ".Provider";
      case bi:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case es:
        return (
          (t = e.displayName || null), t !== null ? t : Jo(e.type) || "Memo"
        );
      case at:
        (t = e._payload), (e = e._init);
        try {
          return Jo(e(t));
        } catch {}
    }
  return null;
}
function Gd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Jo(t);
    case 8:
      return t === Zi ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Nt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Va(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Zd(e) {
  var t = Va(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Fr(e) {
  e._valueTracker || (e._valueTracker = Zd(e));
}
function Wa(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Va(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function fl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Xo(e, t) {
  var n = t.checked;
  return Q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function bs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Nt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Qa(e, t) {
  (t = t.checked), t != null && Gi(e, "checked", t, !1);
}
function Yo(e, t) {
  Qa(e, t);
  var n = Nt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Go(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Go(e, t.type, Nt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function eu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Go(e, t, n) {
  (t !== "number" || fl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Kn = Array.isArray;
function dn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Nt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Zo(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return Q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function tu(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Kn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Nt(n) };
}
function Ka(e, t) {
  var n = Nt(t.value),
    r = Nt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function nu(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function qa(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function bo(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? qa(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ar,
  Ja = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ar = Ar || document.createElement("div"),
          Ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ar.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function or(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Xn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  bd = ["Webkit", "ms", "Moz", "O"];
Object.keys(Xn).forEach(function (e) {
  bd.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Xn[t] = Xn[e]);
  });
});
function Xa(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Xn.hasOwnProperty(e) && Xn[e])
    ? ("" + t).trim()
    : t + "px";
}
function Ya(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Xa(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var ep = Q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function ei(e, t) {
  if (t) {
    if (ep[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function ti(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ni = null;
function ts(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ri = null,
  pn = null,
  hn = null;
function ru(e) {
  if ((e = Rr(e))) {
    if (typeof ri != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = Wl(t)), ri(e.stateNode, e.type, t));
  }
}
function Ga(e) {
  pn ? (hn ? hn.push(e) : (hn = [e])) : (pn = e);
}
function Za() {
  if (pn) {
    var e = pn,
      t = hn;
    if (((hn = pn = null), ru(e), t)) for (e = 0; e < t.length; e++) ru(t[e]);
  }
}
function ba(e, t) {
  return e(t);
}
function ec() {}
var vo = !1;
function tc(e, t, n) {
  if (vo) return e(t, n);
  vo = !0;
  try {
    return ba(e, t, n);
  } finally {
    (vo = !1), (pn !== null || hn !== null) && (ec(), Za());
  }
}
function ir(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Wl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var li = !1;
if (tt)
  try {
    var In = {};
    Object.defineProperty(In, "passive", {
      get: function () {
        li = !0;
      },
    }),
      window.addEventListener("test", In, In),
      window.removeEventListener("test", In, In);
  } catch {
    li = !1;
  }
function tp(e, t, n, r, l, o, i, s, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (f) {
    this.onError(f);
  }
}
var Yn = !1,
  dl = null,
  pl = !1,
  oi = null,
  np = {
    onError: function (e) {
      (Yn = !0), (dl = e);
    },
  };
function rp(e, t, n, r, l, o, i, s, u) {
  (Yn = !1), (dl = null), tp.apply(np, arguments);
}
function lp(e, t, n, r, l, o, i, s, u) {
  if ((rp.apply(this, arguments), Yn)) {
    if (Yn) {
      var a = dl;
      (Yn = !1), (dl = null);
    } else throw Error(N(198));
    pl || ((pl = !0), (oi = a));
  }
}
function Xt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function nc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function lu(e) {
  if (Xt(e) !== e) throw Error(N(188));
}
function op(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Xt(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return lu(l), e;
        if (o === r) return lu(l), t;
        o = o.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (s === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (s === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function rc(e) {
  return (e = op(e)), e !== null ? lc(e) : null;
}
function lc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = lc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var oc = Re.unstable_scheduleCallback,
  ou = Re.unstable_cancelCallback,
  ip = Re.unstable_shouldYield,
  sp = Re.unstable_requestPaint,
  J = Re.unstable_now,
  up = Re.unstable_getCurrentPriorityLevel,
  ns = Re.unstable_ImmediatePriority,
  ic = Re.unstable_UserBlockingPriority,
  hl = Re.unstable_NormalPriority,
  ap = Re.unstable_LowPriority,
  sc = Re.unstable_IdlePriority,
  Bl = null,
  Je = null;
function cp(e) {
  if (Je && typeof Je.onCommitFiberRoot == "function")
    try {
      Je.onCommitFiberRoot(Bl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Be = Math.clz32 ? Math.clz32 : pp,
  fp = Math.log,
  dp = Math.LN2;
function pp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((fp(e) / dp) | 0)) | 0;
}
var Ir = 64,
  Ur = 4194304;
function qn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ml(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? (r = qn(s)) : ((o &= i), o !== 0 && (r = qn(o)));
  } else (i = n & ~l), i !== 0 ? (r = qn(i)) : o !== 0 && (r = qn(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Be(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function hp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function mp(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Be(o),
      s = 1 << i,
      u = l[i];
    u === -1
      ? (!(s & n) || s & r) && (l[i] = hp(s, t))
      : u <= t && (e.expiredLanes |= s),
      (o &= ~s);
  }
}
function ii(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function uc() {
  var e = Ir;
  return (Ir <<= 1), !(Ir & 4194240) && (Ir = 64), e;
}
function go(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Nr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Be(t)),
    (e[t] = n);
}
function vp(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Be(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function rs(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Be(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var U = 0;
function ac(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var cc,
  ls,
  fc,
  dc,
  pc,
  si = !1,
  Mr = [],
  vt = null,
  gt = null,
  yt = null,
  sr = new Map(),
  ur = new Map(),
  ft = [],
  gp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function iu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      vt = null;
      break;
    case "dragenter":
    case "dragleave":
      gt = null;
      break;
    case "mouseover":
    case "mouseout":
      yt = null;
      break;
    case "pointerover":
    case "pointerout":
      sr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ur.delete(t.pointerId);
  }
}
function Un(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = Rr(t)), t !== null && ls(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function yp(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (vt = Un(vt, e, t, n, r, l)), !0;
    case "dragenter":
      return (gt = Un(gt, e, t, n, r, l)), !0;
    case "mouseover":
      return (yt = Un(yt, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return sr.set(o, Un(sr.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), ur.set(o, Un(ur.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function hc(e) {
  var t = Ft(e.target);
  if (t !== null) {
    var n = Xt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = nc(n)), t !== null)) {
          (e.blockedOn = t),
            pc(e.priority, function () {
              fc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Zr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ui(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (ni = r), n.target.dispatchEvent(r), (ni = null);
    } else return (t = Rr(n)), t !== null && ls(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function su(e, t, n) {
  Zr(e) && n.delete(t);
}
function wp() {
  (si = !1),
    vt !== null && Zr(vt) && (vt = null),
    gt !== null && Zr(gt) && (gt = null),
    yt !== null && Zr(yt) && (yt = null),
    sr.forEach(su),
    ur.forEach(su);
}
function Mn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    si ||
      ((si = !0),
      Re.unstable_scheduleCallback(Re.unstable_NormalPriority, wp)));
}
function ar(e) {
  function t(l) {
    return Mn(l, e);
  }
  if (0 < Mr.length) {
    Mn(Mr[0], e);
    for (var n = 1; n < Mr.length; n++) {
      var r = Mr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    vt !== null && Mn(vt, e),
      gt !== null && Mn(gt, e),
      yt !== null && Mn(yt, e),
      sr.forEach(t),
      ur.forEach(t),
      n = 0;
    n < ft.length;
    n++
  )
    (r = ft[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ft.length && ((n = ft[0]), n.blockedOn === null); )
    hc(n), n.blockedOn === null && ft.shift();
}
var mn = ot.ReactCurrentBatchConfig,
  vl = !0;
function Sp(e, t, n, r) {
  var l = U,
    o = mn.transition;
  mn.transition = null;
  try {
    (U = 1), os(e, t, n, r);
  } finally {
    (U = l), (mn.transition = o);
  }
}
function xp(e, t, n, r) {
  var l = U,
    o = mn.transition;
  mn.transition = null;
  try {
    (U = 4), os(e, t, n, r);
  } finally {
    (U = l), (mn.transition = o);
  }
}
function os(e, t, n, r) {
  if (vl) {
    var l = ui(e, t, n, r);
    if (l === null) Ro(e, t, r, gl, n), iu(e, r);
    else if (yp(l, e, t, n, r)) r.stopPropagation();
    else if ((iu(e, r), t & 4 && -1 < gp.indexOf(e))) {
      for (; l !== null; ) {
        var o = Rr(l);
        if (
          (o !== null && cc(o),
          (o = ui(e, t, n, r)),
          o === null && Ro(e, t, r, gl, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Ro(e, t, r, null, n);
  }
}
var gl = null;
function ui(e, t, n, r) {
  if (((gl = null), (e = ts(r)), (e = Ft(e)), e !== null))
    if (((t = Xt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = nc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (gl = e), null;
}
function mc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (up()) {
        case ns:
          return 1;
        case ic:
          return 4;
        case hl:
        case ap:
          return 16;
        case sc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var pt = null,
  is = null,
  br = null;
function vc() {
  if (br) return br;
  var e,
    t = is,
    n = t.length,
    r,
    l = "value" in pt ? pt.value : pt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (br = l.slice(e, 1 < r ? 1 - r : void 0));
}
function el(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Br() {
  return !0;
}
function uu() {
  return !1;
}
function Pe(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Br
        : uu),
      (this.isPropagationStopped = uu),
      this
    );
  }
  return (
    Q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Br));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Br));
      },
      persist: function () {},
      isPersistent: Br,
    }),
    t
  );
}
var jn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ss = Pe(jn),
  jr = Q({}, jn, { view: 0, detail: 0 }),
  Ep = Pe(jr),
  yo,
  wo,
  Bn,
  $l = Q({}, jr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: us,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Bn &&
            (Bn && e.type === "mousemove"
              ? ((yo = e.screenX - Bn.screenX), (wo = e.screenY - Bn.screenY))
              : (wo = yo = 0),
            (Bn = e)),
          yo);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : wo;
    },
  }),
  au = Pe($l),
  kp = Q({}, $l, { dataTransfer: 0 }),
  Cp = Pe(kp),
  Np = Q({}, jr, { relatedTarget: 0 }),
  So = Pe(Np),
  jp = Q({}, jn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Rp = Pe(jp),
  _p = Q({}, jn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Pp = Pe(_p),
  Tp = Q({}, jn, { data: 0 }),
  cu = Pe(Tp),
  Op = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Lp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Dp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function zp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Dp[e]) ? !!t[e] : !1;
}
function us() {
  return zp;
}
var Fp = Q({}, jr, {
    key: function (e) {
      if (e.key) {
        var t = Op[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = el(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Lp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: us,
    charCode: function (e) {
      return e.type === "keypress" ? el(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? el(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Ap = Pe(Fp),
  Ip = Q({}, $l, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  fu = Pe(Ip),
  Up = Q({}, jr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: us,
  }),
  Mp = Pe(Up),
  Bp = Q({}, jn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  $p = Pe(Bp),
  Hp = Q({}, $l, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vp = Pe(Hp),
  Wp = [9, 13, 27, 32],
  as = tt && "CompositionEvent" in window,
  Gn = null;
tt && "documentMode" in document && (Gn = document.documentMode);
var Qp = tt && "TextEvent" in window && !Gn,
  gc = tt && (!as || (Gn && 8 < Gn && 11 >= Gn)),
  du = " ",
  pu = !1;
function yc(e, t) {
  switch (e) {
    case "keyup":
      return Wp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function wc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var tn = !1;
function Kp(e, t) {
  switch (e) {
    case "compositionend":
      return wc(t);
    case "keypress":
      return t.which !== 32 ? null : ((pu = !0), du);
    case "textInput":
      return (e = t.data), e === du && pu ? null : e;
    default:
      return null;
  }
}
function qp(e, t) {
  if (tn)
    return e === "compositionend" || (!as && yc(e, t))
      ? ((e = vc()), (br = is = pt = null), (tn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return gc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Jp = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function hu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Jp[e.type] : t === "textarea";
}
function Sc(e, t, n, r) {
  Ga(r),
    (t = yl(t, "onChange")),
    0 < t.length &&
      ((n = new ss("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Zn = null,
  cr = null;
function Xp(e) {
  Oc(e, 0);
}
function Hl(e) {
  var t = ln(e);
  if (Wa(t)) return e;
}
function Yp(e, t) {
  if (e === "change") return t;
}
var xc = !1;
if (tt) {
  var xo;
  if (tt) {
    var Eo = "oninput" in document;
    if (!Eo) {
      var mu = document.createElement("div");
      mu.setAttribute("oninput", "return;"),
        (Eo = typeof mu.oninput == "function");
    }
    xo = Eo;
  } else xo = !1;
  xc = xo && (!document.documentMode || 9 < document.documentMode);
}
function vu() {
  Zn && (Zn.detachEvent("onpropertychange", Ec), (cr = Zn = null));
}
function Ec(e) {
  if (e.propertyName === "value" && Hl(cr)) {
    var t = [];
    Sc(t, cr, e, ts(e)), tc(Xp, t);
  }
}
function Gp(e, t, n) {
  e === "focusin"
    ? (vu(), (Zn = t), (cr = n), Zn.attachEvent("onpropertychange", Ec))
    : e === "focusout" && vu();
}
function Zp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Hl(cr);
}
function bp(e, t) {
  if (e === "click") return Hl(t);
}
function eh(e, t) {
  if (e === "input" || e === "change") return Hl(t);
}
function th(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var He = typeof Object.is == "function" ? Object.is : th;
function fr(e, t) {
  if (He(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Wo.call(t, l) || !He(e[l], t[l])) return !1;
  }
  return !0;
}
function gu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function yu(e, t) {
  var n = gu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = gu(n);
  }
}
function kc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? kc(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Cc() {
  for (var e = window, t = fl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = fl(e.document);
  }
  return t;
}
function cs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function nh(e) {
  var t = Cc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    kc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && cs(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = yu(n, o));
        var i = yu(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var rh = tt && "documentMode" in document && 11 >= document.documentMode,
  nn = null,
  ai = null,
  bn = null,
  ci = !1;
function wu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ci ||
    nn == null ||
    nn !== fl(r) ||
    ((r = nn),
    "selectionStart" in r && cs(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (bn && fr(bn, r)) ||
      ((bn = r),
      (r = yl(ai, "onSelect")),
      0 < r.length &&
        ((t = new ss("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = nn))));
}
function $r(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var rn = {
    animationend: $r("Animation", "AnimationEnd"),
    animationiteration: $r("Animation", "AnimationIteration"),
    animationstart: $r("Animation", "AnimationStart"),
    transitionend: $r("Transition", "TransitionEnd"),
  },
  ko = {},
  Nc = {};
tt &&
  ((Nc = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete rn.animationend.animation,
    delete rn.animationiteration.animation,
    delete rn.animationstart.animation),
  "TransitionEvent" in window || delete rn.transitionend.transition);
function Vl(e) {
  if (ko[e]) return ko[e];
  if (!rn[e]) return e;
  var t = rn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Nc) return (ko[e] = t[n]);
  return e;
}
var jc = Vl("animationend"),
  Rc = Vl("animationiteration"),
  _c = Vl("animationstart"),
  Pc = Vl("transitionend"),
  Tc = new Map(),
  Su =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Rt(e, t) {
  Tc.set(e, t), Jt(t, [e]);
}
for (var Co = 0; Co < Su.length; Co++) {
  var No = Su[Co],
    lh = No.toLowerCase(),
    oh = No[0].toUpperCase() + No.slice(1);
  Rt(lh, "on" + oh);
}
Rt(jc, "onAnimationEnd");
Rt(Rc, "onAnimationIteration");
Rt(_c, "onAnimationStart");
Rt("dblclick", "onDoubleClick");
Rt("focusin", "onFocus");
Rt("focusout", "onBlur");
Rt(Pc, "onTransitionEnd");
yn("onMouseEnter", ["mouseout", "mouseover"]);
yn("onMouseLeave", ["mouseout", "mouseover"]);
yn("onPointerEnter", ["pointerout", "pointerover"]);
yn("onPointerLeave", ["pointerout", "pointerover"]);
Jt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Jt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Jt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Jt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Jt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Jn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  ih = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jn));
function xu(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), lp(r, t, void 0, e), (e.currentTarget = null);
}
function Oc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            u = s.instance,
            a = s.currentTarget;
          if (((s = s.listener), u !== o && l.isPropagationStopped())) break e;
          xu(l, s, a), (o = u);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((s = r[i]),
            (u = s.instance),
            (a = s.currentTarget),
            (s = s.listener),
            u !== o && l.isPropagationStopped())
          )
            break e;
          xu(l, s, a), (o = u);
        }
    }
  }
  if (pl) throw ((e = oi), (pl = !1), (oi = null), e);
}
function B(e, t) {
  var n = t[mi];
  n === void 0 && (n = t[mi] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Lc(t, e, 2, !1), n.add(r));
}
function jo(e, t, n) {
  var r = 0;
  t && (r |= 4), Lc(n, e, r, t);
}
var Hr = "_reactListening" + Math.random().toString(36).slice(2);
function dr(e) {
  if (!e[Hr]) {
    (e[Hr] = !0),
      Ma.forEach(function (n) {
        n !== "selectionchange" && (ih.has(n) || jo(n, !1, e), jo(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Hr] || ((t[Hr] = !0), jo("selectionchange", !1, t));
  }
}
function Lc(e, t, n, r) {
  switch (mc(t)) {
    case 1:
      var l = Sp;
      break;
    case 4:
      l = xp;
      break;
    default:
      l = os;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !li ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Ro(e, t, n, r, l) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var u = i.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = i.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = Ft(s)), i === null)) return;
          if (((u = i.tag), u === 5 || u === 6)) {
            r = o = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  tc(function () {
    var a = o,
      f = ts(n),
      p = [];
    e: {
      var v = Tc.get(e);
      if (v !== void 0) {
        var w = ss,
          g = e;
        switch (e) {
          case "keypress":
            if (el(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = Ap;
            break;
          case "focusin":
            (g = "focus"), (w = So);
            break;
          case "focusout":
            (g = "blur"), (w = So);
            break;
          case "beforeblur":
          case "afterblur":
            w = So;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = au;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = Cp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Mp;
            break;
          case jc:
          case Rc:
          case _c:
            w = Rp;
            break;
          case Pc:
            w = $p;
            break;
          case "scroll":
            w = Ep;
            break;
          case "wheel":
            w = Vp;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = Pp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = fu;
        }
        var y = (t & 4) !== 0,
          x = !y && e === "scroll",
          m = y ? (v !== null ? v + "Capture" : null) : v;
        y = [];
        for (var d = a, h; d !== null; ) {
          h = d;
          var E = h.stateNode;
          if (
            (h.tag === 5 &&
              E !== null &&
              ((h = E),
              m !== null && ((E = ir(d, m)), E != null && y.push(pr(d, E, h)))),
            x)
          )
            break;
          d = d.return;
        }
        0 < y.length &&
          ((v = new w(v, g, null, n, f)), p.push({ event: v, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          v &&
            n !== ni &&
            (g = n.relatedTarget || n.fromElement) &&
            (Ft(g) || g[nt]))
        )
          break e;
        if (
          (w || v) &&
          ((v =
            f.window === f
              ? f
              : (v = f.ownerDocument)
              ? v.defaultView || v.parentWindow
              : window),
          w
            ? ((g = n.relatedTarget || n.toElement),
              (w = a),
              (g = g ? Ft(g) : null),
              g !== null &&
                ((x = Xt(g)), g !== x || (g.tag !== 5 && g.tag !== 6)) &&
                (g = null))
            : ((w = null), (g = a)),
          w !== g)
        ) {
          if (
            ((y = au),
            (E = "onMouseLeave"),
            (m = "onMouseEnter"),
            (d = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = fu),
              (E = "onPointerLeave"),
              (m = "onPointerEnter"),
              (d = "pointer")),
            (x = w == null ? v : ln(w)),
            (h = g == null ? v : ln(g)),
            (v = new y(E, d + "leave", w, n, f)),
            (v.target = x),
            (v.relatedTarget = h),
            (E = null),
            Ft(f) === a &&
              ((y = new y(m, d + "enter", g, n, f)),
              (y.target = h),
              (y.relatedTarget = x),
              (E = y)),
            (x = E),
            w && g)
          )
            t: {
              for (y = w, m = g, d = 0, h = y; h; h = Gt(h)) d++;
              for (h = 0, E = m; E; E = Gt(E)) h++;
              for (; 0 < d - h; ) (y = Gt(y)), d--;
              for (; 0 < h - d; ) (m = Gt(m)), h--;
              for (; d--; ) {
                if (y === m || (m !== null && y === m.alternate)) break t;
                (y = Gt(y)), (m = Gt(m));
              }
              y = null;
            }
          else y = null;
          w !== null && Eu(p, v, w, y, !1),
            g !== null && x !== null && Eu(p, x, g, y, !0);
        }
      }
      e: {
        if (
          ((v = a ? ln(a) : window),
          (w = v.nodeName && v.nodeName.toLowerCase()),
          w === "select" || (w === "input" && v.type === "file"))
        )
          var S = Yp;
        else if (hu(v))
          if (xc) S = eh;
          else {
            S = Zp;
            var R = Gp;
          }
        else
          (w = v.nodeName) &&
            w.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (S = bp);
        if (S && (S = S(e, a))) {
          Sc(p, S, n, f);
          break e;
        }
        R && R(e, v, a),
          e === "focusout" &&
            (R = v._wrapperState) &&
            R.controlled &&
            v.type === "number" &&
            Go(v, "number", v.value);
      }
      switch (((R = a ? ln(a) : window), e)) {
        case "focusin":
          (hu(R) || R.contentEditable === "true") &&
            ((nn = R), (ai = a), (bn = null));
          break;
        case "focusout":
          bn = ai = nn = null;
          break;
        case "mousedown":
          ci = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (ci = !1), wu(p, n, f);
          break;
        case "selectionchange":
          if (rh) break;
        case "keydown":
        case "keyup":
          wu(p, n, f);
      }
      var j;
      if (as)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        tn
          ? yc(e, n) && (_ = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ &&
        (gc &&
          n.locale !== "ko" &&
          (tn || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && tn && (j = vc())
            : ((pt = f),
              (is = "value" in pt ? pt.value : pt.textContent),
              (tn = !0))),
        (R = yl(a, _)),
        0 < R.length &&
          ((_ = new cu(_, e, null, n, f)),
          p.push({ event: _, listeners: R }),
          j ? (_.data = j) : ((j = wc(n)), j !== null && (_.data = j)))),
        (j = Qp ? Kp(e, n) : qp(e, n)) &&
          ((a = yl(a, "onBeforeInput")),
          0 < a.length &&
            ((f = new cu("onBeforeInput", "beforeinput", null, n, f)),
            p.push({ event: f, listeners: a }),
            (f.data = j)));
    }
    Oc(p, t);
  });
}
function pr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function yl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = ir(e, n)),
      o != null && r.unshift(pr(e, o, l)),
      (o = ir(e, t)),
      o != null && r.push(pr(e, o, l))),
      (e = e.return);
  }
  return r;
}
function Gt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Eu(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n,
      u = s.alternate,
      a = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 &&
      a !== null &&
      ((s = a),
      l
        ? ((u = ir(n, o)), u != null && i.unshift(pr(n, u, s)))
        : l || ((u = ir(n, o)), u != null && i.push(pr(n, u, s)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var sh = /\r\n?/g,
  uh = /\u0000|\uFFFD/g;
function ku(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      sh,
      `
`
    )
    .replace(uh, "");
}
function Vr(e, t, n) {
  if (((t = ku(t)), ku(e) !== t && n)) throw Error(N(425));
}
function wl() {}
var fi = null,
  di = null;
function pi(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var hi = typeof setTimeout == "function" ? setTimeout : void 0,
  ah = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Cu = typeof Promise == "function" ? Promise : void 0,
  ch =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Cu < "u"
      ? function (e) {
          return Cu.resolve(null).then(e).catch(fh);
        }
      : hi;
function fh(e) {
  setTimeout(function () {
    throw e;
  });
}
function _o(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), ar(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  ar(t);
}
function wt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Nu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Rn = Math.random().toString(36).slice(2),
  qe = "__reactFiber$" + Rn,
  hr = "__reactProps$" + Rn,
  nt = "__reactContainer$" + Rn,
  mi = "__reactEvents$" + Rn,
  dh = "__reactListeners$" + Rn,
  ph = "__reactHandles$" + Rn;
function Ft(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[nt] || n[qe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Nu(e); e !== null; ) {
          if ((n = e[qe])) return n;
          e = Nu(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Rr(e) {
  return (
    (e = e[qe] || e[nt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function ln(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function Wl(e) {
  return e[hr] || null;
}
var vi = [],
  on = -1;
function _t(e) {
  return { current: e };
}
function $(e) {
  0 > on || ((e.current = vi[on]), (vi[on] = null), on--);
}
function M(e, t) {
  on++, (vi[on] = e.current), (e.current = t);
}
var jt = {},
  de = _t(jt),
  we = _t(!1),
  Ht = jt;
function wn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Se(e) {
  return (e = e.childContextTypes), e != null;
}
function Sl() {
  $(we), $(de);
}
function ju(e, t, n) {
  if (de.current !== jt) throw Error(N(168));
  M(de, t), M(we, n);
}
function Dc(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, Gd(e) || "Unknown", l));
  return Q({}, n, r);
}
function xl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || jt),
    (Ht = de.current),
    M(de, e),
    M(we, we.current),
    !0
  );
}
function Ru(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n
    ? ((e = Dc(e, t, Ht)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      $(we),
      $(de),
      M(de, e))
    : $(we),
    M(we, n);
}
var Ge = null,
  Ql = !1,
  Po = !1;
function zc(e) {
  Ge === null ? (Ge = [e]) : Ge.push(e);
}
function hh(e) {
  (Ql = !0), zc(e);
}
function Pt() {
  if (!Po && Ge !== null) {
    Po = !0;
    var e = 0,
      t = U;
    try {
      var n = Ge;
      for (U = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ge = null), (Ql = !1);
    } catch (l) {
      throw (Ge !== null && (Ge = Ge.slice(e + 1)), oc(ns, Pt), l);
    } finally {
      (U = t), (Po = !1);
    }
  }
  return null;
}
var sn = [],
  un = 0,
  El = null,
  kl = 0,
  Te = [],
  Oe = 0,
  Vt = null,
  Ze = 1,
  be = "";
function Dt(e, t) {
  (sn[un++] = kl), (sn[un++] = El), (El = e), (kl = t);
}
function Fc(e, t, n) {
  (Te[Oe++] = Ze), (Te[Oe++] = be), (Te[Oe++] = Vt), (Vt = e);
  var r = Ze;
  e = be;
  var l = 32 - Be(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - Be(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (Ze = (1 << (32 - Be(t) + l)) | (n << l) | r),
      (be = o + e);
  } else (Ze = (1 << o) | (n << l) | r), (be = e);
}
function fs(e) {
  e.return !== null && (Dt(e, 1), Fc(e, 1, 0));
}
function ds(e) {
  for (; e === El; )
    (El = sn[--un]), (sn[un] = null), (kl = sn[--un]), (sn[un] = null);
  for (; e === Vt; )
    (Vt = Te[--Oe]),
      (Te[Oe] = null),
      (be = Te[--Oe]),
      (Te[Oe] = null),
      (Ze = Te[--Oe]),
      (Te[Oe] = null);
}
var Ne = null,
  Ce = null,
  H = !1,
  Me = null;
function Ac(e, t) {
  var n = Le(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function _u(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ne = e), (Ce = wt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ne = e), (Ce = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Vt !== null ? { id: Ze, overflow: be } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Le(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ne = e),
            (Ce = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function gi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function yi(e) {
  if (H) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!_u(e, t)) {
        if (gi(e)) throw Error(N(418));
        t = wt(n.nextSibling);
        var r = Ne;
        t && _u(e, t)
          ? Ac(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (H = !1), (Ne = e));
      }
    } else {
      if (gi(e)) throw Error(N(418));
      (e.flags = (e.flags & -4097) | 2), (H = !1), (Ne = e);
    }
  }
}
function Pu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ne = e;
}
function Wr(e) {
  if (e !== Ne) return !1;
  if (!H) return Pu(e), (H = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !pi(e.type, e.memoizedProps))),
    t && (t = Ce))
  ) {
    if (gi(e)) throw (Ic(), Error(N(418)));
    for (; t; ) Ac(e, t), (t = wt(t.nextSibling));
  }
  if ((Pu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = wt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = Ne ? wt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ic() {
  for (var e = Ce; e; ) e = wt(e.nextSibling);
}
function Sn() {
  (Ce = Ne = null), (H = !1);
}
function ps(e) {
  Me === null ? (Me = [e]) : Me.push(e);
}
var mh = ot.ReactCurrentBatchConfig;
function $n(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var s = l.refs;
            i === null ? delete s[o] : (s[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Qr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Tu(e) {
  var t = e._init;
  return t(e._payload);
}
function Uc(e) {
  function t(m, d) {
    if (e) {
      var h = m.deletions;
      h === null ? ((m.deletions = [d]), (m.flags |= 16)) : h.push(d);
    }
  }
  function n(m, d) {
    if (!e) return null;
    for (; d !== null; ) t(m, d), (d = d.sibling);
    return null;
  }
  function r(m, d) {
    for (m = new Map(); d !== null; )
      d.key !== null ? m.set(d.key, d) : m.set(d.index, d), (d = d.sibling);
    return m;
  }
  function l(m, d) {
    return (m = kt(m, d)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, d, h) {
    return (
      (m.index = h),
      e
        ? ((h = m.alternate),
          h !== null
            ? ((h = h.index), h < d ? ((m.flags |= 2), d) : h)
            : ((m.flags |= 2), d))
        : ((m.flags |= 1048576), d)
    );
  }
  function i(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function s(m, d, h, E) {
    return d === null || d.tag !== 6
      ? ((d = Ao(h, m.mode, E)), (d.return = m), d)
      : ((d = l(d, h)), (d.return = m), d);
  }
  function u(m, d, h, E) {
    var S = h.type;
    return S === en
      ? f(m, d, h.props.children, E, h.key)
      : d !== null &&
        (d.elementType === S ||
          (typeof S == "object" &&
            S !== null &&
            S.$$typeof === at &&
            Tu(S) === d.type))
      ? ((E = l(d, h.props)), (E.ref = $n(m, d, h)), (E.return = m), E)
      : ((E = sl(h.type, h.key, h.props, null, m.mode, E)),
        (E.ref = $n(m, d, h)),
        (E.return = m),
        E);
  }
  function a(m, d, h, E) {
    return d === null ||
      d.tag !== 4 ||
      d.stateNode.containerInfo !== h.containerInfo ||
      d.stateNode.implementation !== h.implementation
      ? ((d = Io(h, m.mode, E)), (d.return = m), d)
      : ((d = l(d, h.children || [])), (d.return = m), d);
  }
  function f(m, d, h, E, S) {
    return d === null || d.tag !== 7
      ? ((d = Bt(h, m.mode, E, S)), (d.return = m), d)
      : ((d = l(d, h)), (d.return = m), d);
  }
  function p(m, d, h) {
    if ((typeof d == "string" && d !== "") || typeof d == "number")
      return (d = Ao("" + d, m.mode, h)), (d.return = m), d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case zr:
          return (
            (h = sl(d.type, d.key, d.props, null, m.mode, h)),
            (h.ref = $n(m, null, d)),
            (h.return = m),
            h
          );
        case bt:
          return (d = Io(d, m.mode, h)), (d.return = m), d;
        case at:
          var E = d._init;
          return p(m, E(d._payload), h);
      }
      if (Kn(d) || An(d))
        return (d = Bt(d, m.mode, h, null)), (d.return = m), d;
      Qr(m, d);
    }
    return null;
  }
  function v(m, d, h, E) {
    var S = d !== null ? d.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return S !== null ? null : s(m, d, "" + h, E);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case zr:
          return h.key === S ? u(m, d, h, E) : null;
        case bt:
          return h.key === S ? a(m, d, h, E) : null;
        case at:
          return (S = h._init), v(m, d, S(h._payload), E);
      }
      if (Kn(h) || An(h)) return S !== null ? null : f(m, d, h, E, null);
      Qr(m, h);
    }
    return null;
  }
  function w(m, d, h, E, S) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (m = m.get(h) || null), s(d, m, "" + E, S);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case zr:
          return (m = m.get(E.key === null ? h : E.key) || null), u(d, m, E, S);
        case bt:
          return (m = m.get(E.key === null ? h : E.key) || null), a(d, m, E, S);
        case at:
          var R = E._init;
          return w(m, d, h, R(E._payload), S);
      }
      if (Kn(E) || An(E)) return (m = m.get(h) || null), f(d, m, E, S, null);
      Qr(d, E);
    }
    return null;
  }
  function g(m, d, h, E) {
    for (
      var S = null, R = null, j = d, _ = (d = 0), I = null;
      j !== null && _ < h.length;
      _++
    ) {
      j.index > _ ? ((I = j), (j = null)) : (I = j.sibling);
      var O = v(m, j, h[_], E);
      if (O === null) {
        j === null && (j = I);
        break;
      }
      e && j && O.alternate === null && t(m, j),
        (d = o(O, d, _)),
        R === null ? (S = O) : (R.sibling = O),
        (R = O),
        (j = I);
    }
    if (_ === h.length) return n(m, j), H && Dt(m, _), S;
    if (j === null) {
      for (; _ < h.length; _++)
        (j = p(m, h[_], E)),
          j !== null &&
            ((d = o(j, d, _)), R === null ? (S = j) : (R.sibling = j), (R = j));
      return H && Dt(m, _), S;
    }
    for (j = r(m, j); _ < h.length; _++)
      (I = w(j, m, _, h[_], E)),
        I !== null &&
          (e && I.alternate !== null && j.delete(I.key === null ? _ : I.key),
          (d = o(I, d, _)),
          R === null ? (S = I) : (R.sibling = I),
          (R = I));
    return (
      e &&
        j.forEach(function (Z) {
          return t(m, Z);
        }),
      H && Dt(m, _),
      S
    );
  }
  function y(m, d, h, E) {
    var S = An(h);
    if (typeof S != "function") throw Error(N(150));
    if (((h = S.call(h)), h == null)) throw Error(N(151));
    for (
      var R = (S = null), j = d, _ = (d = 0), I = null, O = h.next();
      j !== null && !O.done;
      _++, O = h.next()
    ) {
      j.index > _ ? ((I = j), (j = null)) : (I = j.sibling);
      var Z = v(m, j, O.value, E);
      if (Z === null) {
        j === null && (j = I);
        break;
      }
      e && j && Z.alternate === null && t(m, j),
        (d = o(Z, d, _)),
        R === null ? (S = Z) : (R.sibling = Z),
        (R = Z),
        (j = I);
    }
    if (O.done) return n(m, j), H && Dt(m, _), S;
    if (j === null) {
      for (; !O.done; _++, O = h.next())
        (O = p(m, O.value, E)),
          O !== null &&
            ((d = o(O, d, _)), R === null ? (S = O) : (R.sibling = O), (R = O));
      return H && Dt(m, _), S;
    }
    for (j = r(m, j); !O.done; _++, O = h.next())
      (O = w(j, m, _, O.value, E)),
        O !== null &&
          (e && O.alternate !== null && j.delete(O.key === null ? _ : O.key),
          (d = o(O, d, _)),
          R === null ? (S = O) : (R.sibling = O),
          (R = O));
    return (
      e &&
        j.forEach(function (zn) {
          return t(m, zn);
        }),
      H && Dt(m, _),
      S
    );
  }
  function x(m, d, h, E) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === en &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case zr:
          e: {
            for (var S = h.key, R = d; R !== null; ) {
              if (R.key === S) {
                if (((S = h.type), S === en)) {
                  if (R.tag === 7) {
                    n(m, R.sibling),
                      (d = l(R, h.props.children)),
                      (d.return = m),
                      (m = d);
                    break e;
                  }
                } else if (
                  R.elementType === S ||
                  (typeof S == "object" &&
                    S !== null &&
                    S.$$typeof === at &&
                    Tu(S) === R.type)
                ) {
                  n(m, R.sibling),
                    (d = l(R, h.props)),
                    (d.ref = $n(m, R, h)),
                    (d.return = m),
                    (m = d);
                  break e;
                }
                n(m, R);
                break;
              } else t(m, R);
              R = R.sibling;
            }
            h.type === en
              ? ((d = Bt(h.props.children, m.mode, E, h.key)),
                (d.return = m),
                (m = d))
              : ((E = sl(h.type, h.key, h.props, null, m.mode, E)),
                (E.ref = $n(m, d, h)),
                (E.return = m),
                (m = E));
          }
          return i(m);
        case bt:
          e: {
            for (R = h.key; d !== null; ) {
              if (d.key === R)
                if (
                  d.tag === 4 &&
                  d.stateNode.containerInfo === h.containerInfo &&
                  d.stateNode.implementation === h.implementation
                ) {
                  n(m, d.sibling),
                    (d = l(d, h.children || [])),
                    (d.return = m),
                    (m = d);
                  break e;
                } else {
                  n(m, d);
                  break;
                }
              else t(m, d);
              d = d.sibling;
            }
            (d = Io(h, m.mode, E)), (d.return = m), (m = d);
          }
          return i(m);
        case at:
          return (R = h._init), x(m, d, R(h._payload), E);
      }
      if (Kn(h)) return g(m, d, h, E);
      if (An(h)) return y(m, d, h, E);
      Qr(m, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        d !== null && d.tag === 6
          ? (n(m, d.sibling), (d = l(d, h)), (d.return = m), (m = d))
          : (n(m, d), (d = Ao(h, m.mode, E)), (d.return = m), (m = d)),
        i(m))
      : n(m, d);
  }
  return x;
}
var xn = Uc(!0),
  Mc = Uc(!1),
  Cl = _t(null),
  Nl = null,
  an = null,
  hs = null;
function ms() {
  hs = an = Nl = null;
}
function vs(e) {
  var t = Cl.current;
  $(Cl), (e._currentValue = t);
}
function wi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function vn(e, t) {
  (Nl = e),
    (hs = an = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ye = !0), (e.firstContext = null));
}
function ze(e) {
  var t = e._currentValue;
  if (hs !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), an === null)) {
      if (Nl === null) throw Error(N(308));
      (an = e), (Nl.dependencies = { lanes: 0, firstContext: e });
    } else an = an.next = e;
  return t;
}
var At = null;
function gs(e) {
  At === null ? (At = [e]) : At.push(e);
}
function Bc(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), gs(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    rt(e, r)
  );
}
function rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var ct = !1;
function ys(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function $c(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function et(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function St(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), A & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      rt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), gs(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    rt(e, n)
  );
}
function tl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), rs(e, n);
  }
}
function Ou(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function jl(e, t, n, r) {
  var l = e.updateQueue;
  ct = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s,
      a = u.next;
    (u.next = null), i === null ? (o = a) : (i.next = a), (i = u);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (s = f.lastBaseUpdate),
      s !== i &&
        (s === null ? (f.firstBaseUpdate = a) : (s.next = a),
        (f.lastBaseUpdate = u)));
  }
  if (o !== null) {
    var p = l.baseState;
    (i = 0), (f = a = u = null), (s = o);
    do {
      var v = s.lane,
        w = s.eventTime;
      if ((r & v) === v) {
        f !== null &&
          (f = f.next =
            {
              eventTime: w,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var g = e,
            y = s;
          switch (((v = t), (w = n), y.tag)) {
            case 1:
              if (((g = y.payload), typeof g == "function")) {
                p = g.call(w, p, v);
                break e;
              }
              p = g;
              break e;
            case 3:
              g.flags = (g.flags & -65537) | 128;
            case 0:
              if (
                ((g = y.payload),
                (v = typeof g == "function" ? g.call(w, p, v) : g),
                v == null)
              )
                break e;
              p = Q({}, p, v);
              break e;
            case 2:
              ct = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (v = l.effects),
          v === null ? (l.effects = [s]) : v.push(s));
      } else
        (w = {
          eventTime: w,
          lane: v,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          f === null ? ((a = f = w), (u = p)) : (f = f.next = w),
          (i |= v);
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        (v = s),
          (s = v.next),
          (v.next = null),
          (l.lastBaseUpdate = v),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (u = p),
      (l.baseState = u),
      (l.firstBaseUpdate = a),
      (l.lastBaseUpdate = f),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (Qt |= i), (e.lanes = i), (e.memoizedState = p);
  }
}
function Lu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(N(191, l));
        l.call(r);
      }
    }
}
var _r = {},
  Xe = _t(_r),
  mr = _t(_r),
  vr = _t(_r);
function It(e) {
  if (e === _r) throw Error(N(174));
  return e;
}
function ws(e, t) {
  switch ((M(vr, t), M(mr, e), M(Xe, _r), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : bo(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = bo(t, e));
  }
  $(Xe), M(Xe, t);
}
function En() {
  $(Xe), $(mr), $(vr);
}
function Hc(e) {
  It(vr.current);
  var t = It(Xe.current),
    n = bo(t, e.type);
  t !== n && (M(mr, e), M(Xe, n));
}
function Ss(e) {
  mr.current === e && ($(Xe), $(mr));
}
var V = _t(0);
function Rl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var To = [];
function xs() {
  for (var e = 0; e < To.length; e++)
    To[e]._workInProgressVersionPrimary = null;
  To.length = 0;
}
var nl = ot.ReactCurrentDispatcher,
  Oo = ot.ReactCurrentBatchConfig,
  Wt = 0,
  W = null,
  b = null,
  re = null,
  _l = !1,
  er = !1,
  gr = 0,
  vh = 0;
function ue() {
  throw Error(N(321));
}
function Es(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!He(e[n], t[n])) return !1;
  return !0;
}
function ks(e, t, n, r, l, o) {
  if (
    ((Wt = o),
    (W = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (nl.current = e === null || e.memoizedState === null ? Sh : xh),
    (e = n(r, l)),
    er)
  ) {
    o = 0;
    do {
      if (((er = !1), (gr = 0), 25 <= o)) throw Error(N(301));
      (o += 1),
        (re = b = null),
        (t.updateQueue = null),
        (nl.current = Eh),
        (e = n(r, l));
    } while (er);
  }
  if (
    ((nl.current = Pl),
    (t = b !== null && b.next !== null),
    (Wt = 0),
    (re = b = W = null),
    (_l = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function Cs() {
  var e = gr !== 0;
  return (gr = 0), e;
}
function Ke() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return re === null ? (W.memoizedState = re = e) : (re = re.next = e), re;
}
function Fe() {
  if (b === null) {
    var e = W.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = b.next;
  var t = re === null ? W.memoizedState : re.next;
  if (t !== null) (re = t), (b = e);
  else {
    if (e === null) throw Error(N(310));
    (b = e),
      (e = {
        memoizedState: b.memoizedState,
        baseState: b.baseState,
        baseQueue: b.baseQueue,
        queue: b.queue,
        next: null,
      }),
      re === null ? (W.memoizedState = re = e) : (re = re.next = e);
  }
  return re;
}
function yr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Lo(e) {
  var t = Fe(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = b,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var s = (i = null),
      u = null,
      a = o;
    do {
      var f = a.lane;
      if ((Wt & f) === f)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var p = {
          lane: f,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        u === null ? ((s = u = p), (i = r)) : (u = u.next = p),
          (W.lanes |= f),
          (Qt |= f);
      }
      a = a.next;
    } while (a !== null && a !== o);
    u === null ? (i = r) : (u.next = s),
      He(r, t.memoizedState) || (ye = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (W.lanes |= o), (Qt |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Do(e) {
  var t = Fe(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    He(o, t.memoizedState) || (ye = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function Vc() {}
function Wc(e, t) {
  var n = W,
    r = Fe(),
    l = t(),
    o = !He(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (ye = !0)),
    (r = r.queue),
    Ns(qc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (re !== null && re.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      wr(9, Kc.bind(null, n, r, l, t), void 0, null),
      le === null)
    )
      throw Error(N(349));
    Wt & 30 || Qc(n, t, l);
  }
  return l;
}
function Qc(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = W.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (W.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Kc(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Jc(t) && Xc(e);
}
function qc(e, t, n) {
  return n(function () {
    Jc(t) && Xc(e);
  });
}
function Jc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !He(e, n);
  } catch {
    return !0;
  }
}
function Xc(e) {
  var t = rt(e, 1);
  t !== null && $e(t, e, 1, -1);
}
function Du(e) {
  var t = Ke();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: yr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = wh.bind(null, W, e)),
    [t.memoizedState, e]
  );
}
function wr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = W.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (W.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Yc() {
  return Fe().memoizedState;
}
function rl(e, t, n, r) {
  var l = Ke();
  (W.flags |= e),
    (l.memoizedState = wr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Kl(e, t, n, r) {
  var l = Fe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (b !== null) {
    var i = b.memoizedState;
    if (((o = i.destroy), r !== null && Es(r, i.deps))) {
      l.memoizedState = wr(t, n, o, r);
      return;
    }
  }
  (W.flags |= e), (l.memoizedState = wr(1 | t, n, o, r));
}
function zu(e, t) {
  return rl(8390656, 8, e, t);
}
function Ns(e, t) {
  return Kl(2048, 8, e, t);
}
function Gc(e, t) {
  return Kl(4, 2, e, t);
}
function Zc(e, t) {
  return Kl(4, 4, e, t);
}
function bc(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function ef(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Kl(4, 4, bc.bind(null, t, e), n)
  );
}
function js() {}
function tf(e, t) {
  var n = Fe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Es(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function nf(e, t) {
  var n = Fe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Es(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function rf(e, t, n) {
  return Wt & 21
    ? (He(n, t) || ((n = uc()), (W.lanes |= n), (Qt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ye = !0)), (e.memoizedState = n));
}
function gh(e, t) {
  var n = U;
  (U = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Oo.transition;
  Oo.transition = {};
  try {
    e(!1), t();
  } finally {
    (U = n), (Oo.transition = r);
  }
}
function lf() {
  return Fe().memoizedState;
}
function yh(e, t, n) {
  var r = Et(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    of(e))
  )
    sf(t, n);
  else if (((n = Bc(e, t, n, r)), n !== null)) {
    var l = he();
    $e(n, e, r, l), uf(n, t, r);
  }
}
function wh(e, t, n) {
  var r = Et(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (of(e)) sf(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), He(s, i))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), gs(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Bc(e, t, l, r)),
      n !== null && ((l = he()), $e(n, e, r, l), uf(n, t, r));
  }
}
function of(e) {
  var t = e.alternate;
  return e === W || (t !== null && t === W);
}
function sf(e, t) {
  er = _l = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function uf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), rs(e, n);
  }
}
var Pl = {
    readContext: ze,
    useCallback: ue,
    useContext: ue,
    useEffect: ue,
    useImperativeHandle: ue,
    useInsertionEffect: ue,
    useLayoutEffect: ue,
    useMemo: ue,
    useReducer: ue,
    useRef: ue,
    useState: ue,
    useDebugValue: ue,
    useDeferredValue: ue,
    useTransition: ue,
    useMutableSource: ue,
    useSyncExternalStore: ue,
    useId: ue,
    unstable_isNewReconciler: !1,
  },
  Sh = {
    readContext: ze,
    useCallback: function (e, t) {
      return (Ke().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: ze,
    useEffect: zu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        rl(4194308, 4, bc.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return rl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return rl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ke();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ke();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = yh.bind(null, W, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ke();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Du,
    useDebugValue: js,
    useDeferredValue: function (e) {
      return (Ke().memoizedState = e);
    },
    useTransition: function () {
      var e = Du(!1),
        t = e[0];
      return (e = gh.bind(null, e[1])), (Ke().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = W,
        l = Ke();
      if (H) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), le === null)) throw Error(N(349));
        Wt & 30 || Qc(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        zu(qc.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        wr(9, Kc.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ke(),
        t = le.identifierPrefix;
      if (H) {
        var n = be,
          r = Ze;
        (n = (r & ~(1 << (32 - Be(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = gr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = vh++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  xh = {
    readContext: ze,
    useCallback: tf,
    useContext: ze,
    useEffect: Ns,
    useImperativeHandle: ef,
    useInsertionEffect: Gc,
    useLayoutEffect: Zc,
    useMemo: nf,
    useReducer: Lo,
    useRef: Yc,
    useState: function () {
      return Lo(yr);
    },
    useDebugValue: js,
    useDeferredValue: function (e) {
      var t = Fe();
      return rf(t, b.memoizedState, e);
    },
    useTransition: function () {
      var e = Lo(yr)[0],
        t = Fe().memoizedState;
      return [e, t];
    },
    useMutableSource: Vc,
    useSyncExternalStore: Wc,
    useId: lf,
    unstable_isNewReconciler: !1,
  },
  Eh = {
    readContext: ze,
    useCallback: tf,
    useContext: ze,
    useEffect: Ns,
    useImperativeHandle: ef,
    useInsertionEffect: Gc,
    useLayoutEffect: Zc,
    useMemo: nf,
    useReducer: Do,
    useRef: Yc,
    useState: function () {
      return Do(yr);
    },
    useDebugValue: js,
    useDeferredValue: function (e) {
      var t = Fe();
      return b === null ? (t.memoizedState = e) : rf(t, b.memoizedState, e);
    },
    useTransition: function () {
      var e = Do(yr)[0],
        t = Fe().memoizedState;
      return [e, t];
    },
    useMutableSource: Vc,
    useSyncExternalStore: Wc,
    useId: lf,
    unstable_isNewReconciler: !1,
  };
function Ie(e, t) {
  if (e && e.defaultProps) {
    (t = Q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Si(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ql = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Xt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = he(),
      l = Et(e),
      o = et(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = St(e, o, l)),
      t !== null && ($e(t, e, l, r), tl(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = he(),
      l = Et(e),
      o = et(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = St(e, o, l)),
      t !== null && ($e(t, e, l, r), tl(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = he(),
      r = Et(e),
      l = et(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = St(e, l, r)),
      t !== null && ($e(t, e, r, n), tl(t, e, r));
  },
};
function Fu(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !fr(n, r) || !fr(l, o)
      : !0
  );
}
function af(e, t, n) {
  var r = !1,
    l = jt,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = ze(o))
      : ((l = Se(t) ? Ht : de.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? wn(e, l) : jt)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = ql),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Au(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && ql.enqueueReplaceState(t, t.state, null);
}
function xi(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), ys(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = ze(o))
    : ((o = Se(t) ? Ht : de.current), (l.context = wn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Si(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && ql.enqueueReplaceState(l, l.state, null),
      jl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function kn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Yd(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function zo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ei(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var kh = typeof WeakMap == "function" ? WeakMap : Map;
function cf(e, t, n) {
  (n = et(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Ol || ((Ol = !0), (Li = r)), Ei(e, t);
    }),
    n
  );
}
function ff(e, t, n) {
  (n = et(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Ei(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Ei(e, t),
          typeof r != "function" &&
            (xt === null ? (xt = new Set([this])) : xt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function Iu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new kh();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = Ih.bind(null, e, t, n)), t.then(e, e));
}
function Uu(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Mu(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = et(-1, 1)), (t.tag = 2), St(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Ch = ot.ReactCurrentOwner,
  ye = !1;
function pe(e, t, n, r) {
  t.child = e === null ? Mc(t, null, n, r) : xn(t, e.child, n, r);
}
function Bu(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    vn(t, l),
    (r = ks(e, t, n, r, o, l)),
    (n = Cs()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        lt(e, t, l))
      : (H && n && fs(t), (t.flags |= 1), pe(e, t, r, l), t.child)
  );
}
function $u(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !zs(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), df(e, t, o, r, l))
      : ((e = sl(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & l))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : fr), n(i, r) && e.ref === t.ref)
    )
      return lt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = kt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function df(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (fr(o, r) && e.ref === t.ref)
      if (((ye = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        e.flags & 131072 && (ye = !0);
      else return (t.lanes = e.lanes), lt(e, t, l);
  }
  return ki(e, t, n, r, l);
}
function pf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        M(fn, ke),
        (ke |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          M(fn, ke),
          (ke |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        M(fn, ke),
        (ke |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      M(fn, ke),
      (ke |= r);
  return pe(e, t, l, n), t.child;
}
function hf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ki(e, t, n, r, l) {
  var o = Se(n) ? Ht : de.current;
  return (
    (o = wn(t, o)),
    vn(t, l),
    (n = ks(e, t, n, r, o, l)),
    (r = Cs()),
    e !== null && !ye
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        lt(e, t, l))
      : (H && r && fs(t), (t.flags |= 1), pe(e, t, n, l), t.child)
  );
}
function Hu(e, t, n, r, l) {
  if (Se(n)) {
    var o = !0;
    xl(t);
  } else o = !1;
  if ((vn(t, l), t.stateNode === null))
    ll(e, t), af(t, n, r), xi(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var u = i.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = ze(a))
      : ((a = Se(n) ? Ht : de.current), (a = wn(t, a)));
    var f = n.getDerivedStateFromProps,
      p =
        typeof f == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    p ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || u !== a) && Au(t, i, r, a)),
      (ct = !1);
    var v = t.memoizedState;
    (i.state = v),
      jl(t, r, i, l),
      (u = t.memoizedState),
      s !== r || v !== u || we.current || ct
        ? (typeof f == "function" && (Si(t, n, f, r), (u = t.memoizedState)),
          (s = ct || Fu(t, n, s, r, v, u, a))
            ? (p ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (i.props = r),
          (i.state = u),
          (i.context = a),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      $c(e, t),
      (s = t.memoizedProps),
      (a = t.type === t.elementType ? s : Ie(t.type, s)),
      (i.props = a),
      (p = t.pendingProps),
      (v = i.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = ze(u))
        : ((u = Se(n) ? Ht : de.current), (u = wn(t, u)));
    var w = n.getDerivedStateFromProps;
    (f =
      typeof w == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== p || v !== u) && Au(t, i, r, u)),
      (ct = !1),
      (v = t.memoizedState),
      (i.state = v),
      jl(t, r, i, l);
    var g = t.memoizedState;
    s !== p || v !== g || we.current || ct
      ? (typeof w == "function" && (Si(t, n, w, r), (g = t.memoizedState)),
        (a = ct || Fu(t, n, a, r, v, g, u) || !1)
          ? (f ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, g, u),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, g, u)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = g)),
        (i.props = r),
        (i.state = g),
        (i.context = u),
        (r = a))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ci(e, t, n, r, o, l);
}
function Ci(e, t, n, r, l, o) {
  hf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Ru(t, n, !1), lt(e, t, o);
  (r = t.stateNode), (Ch.current = t);
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = xn(t, e.child, null, o)), (t.child = xn(t, null, s, o)))
      : pe(e, t, s, o),
    (t.memoizedState = r.state),
    l && Ru(t, n, !0),
    t.child
  );
}
function mf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? ju(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ju(e, t.context, !1),
    ws(e, t.containerInfo);
}
function Vu(e, t, n, r, l) {
  return Sn(), ps(l), (t.flags |= 256), pe(e, t, n, r), t.child;
}
var Ni = { dehydrated: null, treeContext: null, retryLane: 0 };
function ji(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function vf(e, t, n) {
  var r = t.pendingProps,
    l = V.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    M(V, l & 1),
    e === null)
  )
    return (
      yi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = Yl(i, r, 0, null)),
              (e = Bt(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = ji(n)),
              (t.memoizedState = Ni),
              e)
            : Rs(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null)))
    return Nh(e, t, i, r, s, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (s = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = kt(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (o = kt(s, o)) : ((o = Bt(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? ji(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ni),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = kt(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Rs(e, t) {
  return (
    (t = Yl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Kr(e, t, n, r) {
  return (
    r !== null && ps(r),
    xn(t, e.child, null, n),
    (e = Rs(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Nh(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = zo(Error(N(422)))), Kr(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = Yl({ mode: "visible", children: r.children }, l, 0, null)),
        (o = Bt(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && xn(t, e.child, null, i),
        (t.child.memoizedState = ji(i)),
        (t.memoizedState = Ni),
        o);
  if (!(t.mode & 1)) return Kr(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (o = Error(N(419))), (r = zo(o, r, void 0)), Kr(e, t, i, r);
  }
  if (((s = (i & e.childLanes) !== 0), ye || s)) {
    if (((r = le), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | i) ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), rt(e, l), $e(r, e, l, -1));
    }
    return Ds(), (r = zo(Error(N(421)))), Kr(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Uh.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ce = wt(l.nextSibling)),
      (Ne = t),
      (H = !0),
      (Me = null),
      e !== null &&
        ((Te[Oe++] = Ze),
        (Te[Oe++] = be),
        (Te[Oe++] = Vt),
        (Ze = e.id),
        (be = e.overflow),
        (Vt = t)),
      (t = Rs(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Wu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), wi(e.return, t, n);
}
function Fo(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function gf(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((pe(e, t, r.children, n), (r = V.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Wu(e, n, t);
        else if (e.tag === 19) Wu(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((M(V, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && Rl(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          Fo(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Rl(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        Fo(t, !0, n, null, o);
        break;
      case "together":
        Fo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ll(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function lt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Qt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = kt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = kt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function jh(e, t, n) {
  switch (t.tag) {
    case 3:
      mf(t), Sn();
      break;
    case 5:
      Hc(t);
      break;
    case 1:
      Se(t.type) && xl(t);
      break;
    case 4:
      ws(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      M(Cl, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (M(V, V.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? vf(e, t, n)
          : (M(V, V.current & 1),
            (e = lt(e, t, n)),
            e !== null ? e.sibling : null);
      M(V, V.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return gf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        M(V, V.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), pf(e, t, n);
  }
  return lt(e, t, n);
}
var yf, Ri, wf, Sf;
yf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Ri = function () {};
wf = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), It(Xe.current);
    var o = null;
    switch (n) {
      case "input":
        (l = Xo(e, l)), (r = Xo(e, r)), (o = []);
        break;
      case "select":
        (l = Q({}, l, { value: void 0 })),
          (r = Q({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = Zo(e, l)), (r = Zo(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = wl);
    }
    ei(n, r);
    var i;
    n = null;
    for (a in l)
      if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null)
        if (a === "style") {
          var s = l[a];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (lr.hasOwnProperty(a)
              ? o || (o = [])
              : (o = o || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (
        ((s = l != null ? l[a] : void 0),
        r.hasOwnProperty(a) && u !== s && (u != null || s != null))
      )
        if (a === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (u && u.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in u)
              u.hasOwnProperty(i) &&
                s[i] !== u[i] &&
                (n || (n = {}), (n[i] = u[i]));
          } else n || (o || (o = []), o.push(a, n)), (n = u);
        else
          a === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (s = s ? s.__html : void 0),
              u != null && s !== u && (o = o || []).push(a, u))
            : a === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (o = o || []).push(a, "" + u)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (lr.hasOwnProperty(a)
                ? (u != null && a === "onScroll" && B("scroll", e),
                  o || s === u || (o = []))
                : (o = o || []).push(a, u));
    }
    n && (o = o || []).push("style", n);
    var a = o;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
Sf = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Hn(e, t) {
  if (!H)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ae(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Rh(e, t, n) {
  var r = t.pendingProps;
  switch ((ds(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return ae(t), null;
    case 1:
      return Se(t.type) && Sl(), ae(t), null;
    case 3:
      return (
        (r = t.stateNode),
        En(),
        $(we),
        $(de),
        xs(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Wr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Me !== null && (Fi(Me), (Me = null)))),
        Ri(e, t),
        ae(t),
        null
      );
    case 5:
      Ss(t);
      var l = It(vr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        wf(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return ae(t), null;
        }
        if (((e = It(Xe.current)), Wr(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[qe] = t), (r[hr] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              B("cancel", r), B("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              B("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Jn.length; l++) B(Jn[l], r);
              break;
            case "source":
              B("error", r);
              break;
            case "img":
            case "image":
            case "link":
              B("error", r), B("load", r);
              break;
            case "details":
              B("toggle", r);
              break;
            case "input":
              bs(r, o), B("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                B("invalid", r);
              break;
            case "textarea":
              tu(r, o), B("invalid", r);
          }
          ei(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var s = o[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Vr(r.textContent, s, e),
                    (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 &&
                      Vr(r.textContent, s, e),
                    (l = ["children", "" + s]))
                : lr.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  B("scroll", r);
            }
          switch (n) {
            case "input":
              Fr(r), eu(r, o, !0);
              break;
            case "textarea":
              Fr(r), nu(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = wl);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = qa(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[qe] = t),
            (e[hr] = r),
            yf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = ti(n, r)), n)) {
              case "dialog":
                B("cancel", e), B("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                B("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Jn.length; l++) B(Jn[l], e);
                l = r;
                break;
              case "source":
                B("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                B("error", e), B("load", e), (l = r);
                break;
              case "details":
                B("toggle", e), (l = r);
                break;
              case "input":
                bs(e, r), (l = Xo(e, r)), B("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Q({}, r, { value: void 0 })),
                  B("invalid", e);
                break;
              case "textarea":
                tu(e, r), (l = Zo(e, r)), B("invalid", e);
                break;
              default:
                l = r;
            }
            ei(n, l), (s = l);
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var u = s[o];
                o === "style"
                  ? Ya(e, u)
                  : o === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && Ja(e, u))
                  : o === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && or(e, u)
                    : typeof u == "number" && or(e, "" + u)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (lr.hasOwnProperty(o)
                      ? u != null && o === "onScroll" && B("scroll", e)
                      : u != null && Gi(e, o, u, i));
              }
            switch (n) {
              case "input":
                Fr(e), eu(e, r, !1);
                break;
              case "textarea":
                Fr(e), nu(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Nt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? dn(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      dn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = wl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return ae(t), null;
    case 6:
      if (e && t.stateNode != null) Sf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = It(vr.current)), It(Xe.current), Wr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[qe] = t),
            (o = r.nodeValue !== n) && ((e = Ne), e !== null))
          )
            switch (e.tag) {
              case 3:
                Vr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Vr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[qe] = t),
            (t.stateNode = r);
      }
      return ae(t), null;
    case 13:
      if (
        ($(V),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (H && Ce !== null && t.mode & 1 && !(t.flags & 128))
          Ic(), Sn(), (t.flags |= 98560), (o = !1);
        else if (((o = Wr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(N(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(N(317));
            o[qe] = t;
          } else
            Sn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          ae(t), (o = !1);
        } else Me !== null && (Fi(Me), (Me = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || V.current & 1 ? te === 0 && (te = 3) : Ds())),
          t.updateQueue !== null && (t.flags |= 4),
          ae(t),
          null);
    case 4:
      return (
        En(), Ri(e, t), e === null && dr(t.stateNode.containerInfo), ae(t), null
      );
    case 10:
      return vs(t.type._context), ae(t), null;
    case 17:
      return Se(t.type) && Sl(), ae(t), null;
    case 19:
      if (($(V), (o = t.memoizedState), o === null)) return ae(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) Hn(o, !1);
        else {
          if (te !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Rl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Hn(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return M(V, (V.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            J() > Cn &&
            ((t.flags |= 128), (r = !0), Hn(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Rl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Hn(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !H)
            )
              return ae(t), null;
          } else
            2 * J() - o.renderingStartTime > Cn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Hn(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = J()),
          (t.sibling = null),
          (n = V.current),
          M(V, r ? (n & 1) | 2 : n & 1),
          t)
        : (ae(t), null);
    case 22:
    case 23:
      return (
        Ls(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? ke & 1073741824 && (ae(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ae(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function _h(e, t) {
  switch ((ds(t), t.tag)) {
    case 1:
      return (
        Se(t.type) && Sl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        En(),
        $(we),
        $(de),
        xs(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Ss(t), null;
    case 13:
      if (($(V), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(N(340));
        Sn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return $(V), null;
    case 4:
      return En(), null;
    case 10:
      return vs(t.type._context), null;
    case 22:
    case 23:
      return Ls(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var qr = !1,
  ce = !1,
  Ph = typeof WeakSet == "function" ? WeakSet : Set,
  P = null;
function cn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        K(e, t, r);
      }
    else n.current = null;
}
function _i(e, t, n) {
  try {
    n();
  } catch (r) {
    K(e, t, r);
  }
}
var Qu = !1;
function Th(e, t) {
  if (((fi = vl), (e = Cc()), cs(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            u = -1,
            a = 0,
            f = 0,
            p = e,
            v = null;
          t: for (;;) {
            for (
              var w;
              p !== n || (l !== 0 && p.nodeType !== 3) || (s = i + l),
                p !== o || (r !== 0 && p.nodeType !== 3) || (u = i + r),
                p.nodeType === 3 && (i += p.nodeValue.length),
                (w = p.firstChild) !== null;

            )
              (v = p), (p = w);
            for (;;) {
              if (p === e) break t;
              if (
                (v === n && ++a === l && (s = i),
                v === o && ++f === r && (u = i),
                (w = p.nextSibling) !== null)
              )
                break;
              (p = v), (v = p.parentNode);
            }
            p = w;
          }
          n = s === -1 || u === -1 ? null : { start: s, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (di = { focusedElem: e, selectionRange: n }, vl = !1, P = t; P !== null; )
    if (((t = P), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (P = e);
    else
      for (; P !== null; ) {
        t = P;
        try {
          var g = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (g !== null) {
                  var y = g.memoizedProps,
                    x = g.memoizedState,
                    m = t.stateNode,
                    d = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : Ie(t.type, y),
                      x
                    );
                  m.__reactInternalSnapshotBeforeUpdate = d;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (E) {
          K(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (P = e);
          break;
        }
        P = t.return;
      }
  return (g = Qu), (Qu = !1), g;
}
function tr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && _i(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Jl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Pi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function xf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), xf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[qe], delete t[hr], delete t[mi], delete t[dh], delete t[ph])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Ef(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ku(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ef(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ti(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = wl));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ti(e, t, n), e = e.sibling; e !== null; ) Ti(e, t, n), (e = e.sibling);
}
function Oi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Oi(e, t, n), e = e.sibling; e !== null; ) Oi(e, t, n), (e = e.sibling);
}
var oe = null,
  Ue = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) kf(e, t, n), (n = n.sibling);
}
function kf(e, t, n) {
  if (Je && typeof Je.onCommitFiberUnmount == "function")
    try {
      Je.onCommitFiberUnmount(Bl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ce || cn(n, t);
    case 6:
      var r = oe,
        l = Ue;
      (oe = null),
        st(e, t, n),
        (oe = r),
        (Ue = l),
        oe !== null &&
          (Ue
            ? ((e = oe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null &&
        (Ue
          ? ((e = oe),
            (n = n.stateNode),
            e.nodeType === 8
              ? _o(e.parentNode, n)
              : e.nodeType === 1 && _o(e, n),
            ar(e))
          : _o(oe, n.stateNode));
      break;
    case 4:
      (r = oe),
        (l = Ue),
        (oe = n.stateNode.containerInfo),
        (Ue = !0),
        st(e, t, n),
        (oe = r),
        (Ue = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ce &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && _i(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (
        !ce &&
        (cn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          K(n, t, s);
        }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ce = (r = ce) || n.memoizedState !== null), st(e, t, n), (ce = r))
        : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function qu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Ph()),
      t.forEach(function (r) {
        var l = Mh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ae(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          s = i;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (oe = s.stateNode), (Ue = !1);
              break e;
            case 3:
              (oe = s.stateNode.containerInfo), (Ue = !0);
              break e;
            case 4:
              (oe = s.stateNode.containerInfo), (Ue = !0);
              break e;
          }
          s = s.return;
        }
        if (oe === null) throw Error(N(160));
        kf(o, i, l), (oe = null), (Ue = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (a) {
        K(l, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Cf(t, e), (t = t.sibling);
}
function Cf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ae(t, e), We(e), r & 4)) {
        try {
          tr(3, e, e.return), Jl(3, e);
        } catch (y) {
          K(e, e.return, y);
        }
        try {
          tr(5, e, e.return);
        } catch (y) {
          K(e, e.return, y);
        }
      }
      break;
    case 1:
      Ae(t, e), We(e), r & 512 && n !== null && cn(n, n.return);
      break;
    case 5:
      if (
        (Ae(t, e),
        We(e),
        r & 512 && n !== null && cn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          or(l, "");
        } catch (y) {
          K(e, e.return, y);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          s = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            s === "input" && o.type === "radio" && o.name != null && Qa(l, o),
              ti(s, i);
            var a = ti(s, o);
            for (i = 0; i < u.length; i += 2) {
              var f = u[i],
                p = u[i + 1];
              f === "style"
                ? Ya(l, p)
                : f === "dangerouslySetInnerHTML"
                ? Ja(l, p)
                : f === "children"
                ? or(l, p)
                : Gi(l, f, p, a);
            }
            switch (s) {
              case "input":
                Yo(l, o);
                break;
              case "textarea":
                Ka(l, o);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var w = o.value;
                w != null
                  ? dn(l, !!o.multiple, w, !1)
                  : v !== !!o.multiple &&
                    (o.defaultValue != null
                      ? dn(l, !!o.multiple, o.defaultValue, !0)
                      : dn(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[hr] = o;
          } catch (y) {
            K(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((Ae(t, e), We(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (y) {
          K(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (Ae(t, e), We(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ar(t.containerInfo);
        } catch (y) {
          K(e, e.return, y);
        }
      break;
    case 4:
      Ae(t, e), We(e);
      break;
    case 13:
      Ae(t, e),
        We(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Ts = J())),
        r & 4 && qu(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ce = (a = ce) || f), Ae(t, e), (ce = a)) : Ae(t, e),
        We(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !f && e.mode & 1)
        )
          for (P = e, f = e.child; f !== null; ) {
            for (p = P = f; P !== null; ) {
              switch (((v = P), (w = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  tr(4, v, v.return);
                  break;
                case 1:
                  cn(v, v.return);
                  var g = v.stateNode;
                  if (typeof g.componentWillUnmount == "function") {
                    (r = v), (n = v.return);
                    try {
                      (t = r),
                        (g.props = t.memoizedProps),
                        (g.state = t.memoizedState),
                        g.componentWillUnmount();
                    } catch (y) {
                      K(r, n, y);
                    }
                  }
                  break;
                case 5:
                  cn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    Xu(p);
                    continue;
                  }
              }
              w !== null ? ((w.return = v), (P = w)) : Xu(p);
            }
            f = f.sibling;
          }
        e: for (f = null, p = e; ; ) {
          if (p.tag === 5) {
            if (f === null) {
              f = p;
              try {
                (l = p.stateNode),
                  a
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = p.stateNode),
                      (u = p.memoizedProps.style),
                      (i =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (s.style.display = Xa("display", i)));
              } catch (y) {
                K(e, e.return, y);
              }
            }
          } else if (p.tag === 6) {
            if (f === null)
              try {
                p.stateNode.nodeValue = a ? "" : p.memoizedProps;
              } catch (y) {
                K(e, e.return, y);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            (p.child.return = p), (p = p.child);
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            f === p && (f = null), (p = p.return);
          }
          f === p && (f = null), (p.sibling.return = p.return), (p = p.sibling);
        }
      }
      break;
    case 19:
      Ae(t, e), We(e), r & 4 && qu(e);
      break;
    case 21:
      break;
    default:
      Ae(t, e), We(e);
  }
}
function We(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ef(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (or(l, ""), (r.flags &= -33));
          var o = Ku(e);
          Oi(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = Ku(e);
          Ti(e, s, i);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      K(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Oh(e, t, n) {
  (P = e), Nf(e);
}
function Nf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; P !== null; ) {
    var l = P,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || qr;
      if (!i) {
        var s = l.alternate,
          u = (s !== null && s.memoizedState !== null) || ce;
        s = qr;
        var a = ce;
        if (((qr = i), (ce = u) && !a))
          for (P = l; P !== null; )
            (i = P),
              (u = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Yu(l)
                : u !== null
                ? ((u.return = i), (P = u))
                : Yu(l);
        for (; o !== null; ) (P = o), Nf(o), (o = o.sibling);
        (P = l), (qr = s), (ce = a);
      }
      Ju(e);
    } else
      l.subtreeFlags & 8772 && o !== null ? ((o.return = l), (P = o)) : Ju(e);
  }
}
function Ju(e) {
  for (; P !== null; ) {
    var t = P;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ce || Jl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ce)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ie(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Lu(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Lu(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate;
                if (a !== null) {
                  var f = a.memoizedState;
                  if (f !== null) {
                    var p = f.dehydrated;
                    p !== null && ar(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        ce || (t.flags & 512 && Pi(t));
      } catch (v) {
        K(t, t.return, v);
      }
    }
    if (t === e) {
      P = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function Xu(e) {
  for (; P !== null; ) {
    var t = P;
    if (t === e) {
      P = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (P = n);
      break;
    }
    P = t.return;
  }
}
function Yu(e) {
  for (; P !== null; ) {
    var t = P;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Jl(4, t);
          } catch (u) {
            K(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              K(t, l, u);
            }
          }
          var o = t.return;
          try {
            Pi(t);
          } catch (u) {
            K(t, o, u);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Pi(t);
          } catch (u) {
            K(t, i, u);
          }
      }
    } catch (u) {
      K(t, t.return, u);
    }
    if (t === e) {
      P = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (P = s);
      break;
    }
    P = t.return;
  }
}
var Lh = Math.ceil,
  Tl = ot.ReactCurrentDispatcher,
  _s = ot.ReactCurrentOwner,
  De = ot.ReactCurrentBatchConfig,
  A = 0,
  le = null,
  G = null,
  ie = 0,
  ke = 0,
  fn = _t(0),
  te = 0,
  Sr = null,
  Qt = 0,
  Xl = 0,
  Ps = 0,
  nr = null,
  ge = null,
  Ts = 0,
  Cn = 1 / 0,
  Ye = null,
  Ol = !1,
  Li = null,
  xt = null,
  Jr = !1,
  ht = null,
  Ll = 0,
  rr = 0,
  Di = null,
  ol = -1,
  il = 0;
function he() {
  return A & 6 ? J() : ol !== -1 ? ol : (ol = J());
}
function Et(e) {
  return e.mode & 1
    ? A & 2 && ie !== 0
      ? ie & -ie
      : mh.transition !== null
      ? (il === 0 && (il = uc()), il)
      : ((e = U),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : mc(e.type))),
        e)
    : 1;
}
function $e(e, t, n, r) {
  if (50 < rr) throw ((rr = 0), (Di = null), Error(N(185)));
  Nr(e, n, r),
    (!(A & 2) || e !== le) &&
      (e === le && (!(A & 2) && (Xl |= n), te === 4 && dt(e, ie)),
      xe(e, r),
      n === 1 && A === 0 && !(t.mode & 1) && ((Cn = J() + 500), Ql && Pt()));
}
function xe(e, t) {
  var n = e.callbackNode;
  mp(e, t);
  var r = ml(e, e === le ? ie : 0);
  if (r === 0)
    n !== null && ou(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ou(n), t === 1))
      e.tag === 0 ? hh(Gu.bind(null, e)) : zc(Gu.bind(null, e)),
        ch(function () {
          !(A & 6) && Pt();
        }),
        (n = null);
    else {
      switch (ac(r)) {
        case 1:
          n = ns;
          break;
        case 4:
          n = ic;
          break;
        case 16:
          n = hl;
          break;
        case 536870912:
          n = sc;
          break;
        default:
          n = hl;
      }
      n = Df(n, jf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function jf(e, t) {
  if (((ol = -1), (il = 0), A & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (gn() && e.callbackNode !== n) return null;
  var r = ml(e, e === le ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Dl(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var o = _f();
    (le !== e || ie !== t) && ((Ye = null), (Cn = J() + 500), Mt(e, t));
    do
      try {
        Fh();
        break;
      } catch (s) {
        Rf(e, s);
      }
    while (!0);
    ms(),
      (Tl.current = o),
      (A = l),
      G !== null ? (t = 0) : ((le = null), (ie = 0), (t = te));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = ii(e)), l !== 0 && ((r = l), (t = zi(e, l)))), t === 1)
    )
      throw ((n = Sr), Mt(e, 0), dt(e, r), xe(e, J()), n);
    if (t === 6) dt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Dh(l) &&
          ((t = Dl(e, r)),
          t === 2 && ((o = ii(e)), o !== 0 && ((r = o), (t = zi(e, o)))),
          t === 1))
      )
        throw ((n = Sr), Mt(e, 0), dt(e, r), xe(e, J()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          zt(e, ge, Ye);
          break;
        case 3:
          if (
            (dt(e, r), (r & 130023424) === r && ((t = Ts + 500 - J()), 10 < t))
          ) {
            if (ml(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              he(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = hi(zt.bind(null, e, ge, Ye), t);
            break;
          }
          zt(e, ge, Ye);
          break;
        case 4:
          if ((dt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Be(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = J() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Lh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = hi(zt.bind(null, e, ge, Ye), r);
            break;
          }
          zt(e, ge, Ye);
          break;
        case 5:
          zt(e, ge, Ye);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return xe(e, J()), e.callbackNode === n ? jf.bind(null, e) : null;
}
function zi(e, t) {
  var n = nr;
  return (
    e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256),
    (e = Dl(e, t)),
    e !== 2 && ((t = ge), (ge = n), t !== null && Fi(t)),
    e
  );
}
function Fi(e) {
  ge === null ? (ge = e) : ge.push.apply(ge, e);
}
function Dh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!He(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function dt(e, t) {
  for (
    t &= ~Ps,
      t &= ~Xl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Be(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Gu(e) {
  if (A & 6) throw Error(N(327));
  gn();
  var t = ml(e, 0);
  if (!(t & 1)) return xe(e, J()), null;
  var n = Dl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ii(e);
    r !== 0 && ((t = r), (n = zi(e, r)));
  }
  if (n === 1) throw ((n = Sr), Mt(e, 0), dt(e, t), xe(e, J()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    zt(e, ge, Ye),
    xe(e, J()),
    null
  );
}
function Os(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    (A = n), A === 0 && ((Cn = J() + 500), Ql && Pt());
  }
}
function Kt(e) {
  ht !== null && ht.tag === 0 && !(A & 6) && gn();
  var t = A;
  A |= 1;
  var n = De.transition,
    r = U;
  try {
    if (((De.transition = null), (U = 1), e)) return e();
  } finally {
    (U = r), (De.transition = n), (A = t), !(A & 6) && Pt();
  }
}
function Ls() {
  (ke = fn.current), $(fn);
}
function Mt(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ah(n)), G !== null))
    for (n = G.return; n !== null; ) {
      var r = n;
      switch ((ds(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Sl();
          break;
        case 3:
          En(), $(we), $(de), xs();
          break;
        case 5:
          Ss(r);
          break;
        case 4:
          En();
          break;
        case 13:
          $(V);
          break;
        case 19:
          $(V);
          break;
        case 10:
          vs(r.type._context);
          break;
        case 22:
        case 23:
          Ls();
      }
      n = n.return;
    }
  if (
    ((le = e),
    (G = e = kt(e.current, null)),
    (ie = ke = t),
    (te = 0),
    (Sr = null),
    (Ps = Xl = Qt = 0),
    (ge = nr = null),
    At !== null)
  ) {
    for (t = 0; t < At.length; t++)
      if (((n = At[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    At = null;
  }
  return e;
}
function Rf(e, t) {
  do {
    var n = G;
    try {
      if ((ms(), (nl.current = Pl), _l)) {
        for (var r = W.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        _l = !1;
      }
      if (
        ((Wt = 0),
        (re = b = W = null),
        (er = !1),
        (gr = 0),
        (_s.current = null),
        n === null || n.return === null)
      ) {
        (te = 1), (Sr = t), (G = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          s = n,
          u = t;
        if (
          ((t = ie),
          (s.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var a = u,
            f = s,
            p = f.tag;
          if (!(f.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var v = f.alternate;
            v
              ? ((f.updateQueue = v.updateQueue),
                (f.memoizedState = v.memoizedState),
                (f.lanes = v.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var w = Uu(i);
          if (w !== null) {
            (w.flags &= -257),
              Mu(w, i, s, o, t),
              w.mode & 1 && Iu(o, a, t),
              (t = w),
              (u = a);
            var g = t.updateQueue;
            if (g === null) {
              var y = new Set();
              y.add(u), (t.updateQueue = y);
            } else g.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Iu(o, a, t), Ds();
              break e;
            }
            u = Error(N(426));
          }
        } else if (H && s.mode & 1) {
          var x = Uu(i);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Mu(x, i, s, o, t),
              ps(kn(u, s));
            break e;
          }
        }
        (o = u = kn(u, s)),
          te !== 4 && (te = 2),
          nr === null ? (nr = [o]) : nr.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = cf(o, u, t);
              Ou(o, m);
              break e;
            case 1:
              s = u;
              var d = o.type,
                h = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof d.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (xt === null || !xt.has(h))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var E = ff(o, s, t);
                Ou(o, E);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      Tf(n);
    } catch (S) {
      (t = S), G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function _f() {
  var e = Tl.current;
  return (Tl.current = Pl), e === null ? Pl : e;
}
function Ds() {
  (te === 0 || te === 3 || te === 2) && (te = 4),
    le === null || (!(Qt & 268435455) && !(Xl & 268435455)) || dt(le, ie);
}
function Dl(e, t) {
  var n = A;
  A |= 2;
  var r = _f();
  (le !== e || ie !== t) && ((Ye = null), Mt(e, t));
  do
    try {
      zh();
      break;
    } catch (l) {
      Rf(e, l);
    }
  while (!0);
  if ((ms(), (A = n), (Tl.current = r), G !== null)) throw Error(N(261));
  return (le = null), (ie = 0), te;
}
function zh() {
  for (; G !== null; ) Pf(G);
}
function Fh() {
  for (; G !== null && !ip(); ) Pf(G);
}
function Pf(e) {
  var t = Lf(e.alternate, e, ke);
  (e.memoizedProps = e.pendingProps),
    t === null ? Tf(e) : (G = t),
    (_s.current = null);
}
function Tf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = _h(n, t)), n !== null)) {
        (n.flags &= 32767), (G = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (te = 6), (G = null);
        return;
      }
    } else if (((n = Rh(n, t, ke)), n !== null)) {
      G = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function zt(e, t, n) {
  var r = U,
    l = De.transition;
  try {
    (De.transition = null), (U = 1), Ah(e, t, n, r);
  } finally {
    (De.transition = l), (U = r);
  }
  return null;
}
function Ah(e, t, n, r) {
  do gn();
  while (ht !== null);
  if (A & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (vp(e, o),
    e === le && ((G = le = null), (ie = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Jr ||
      ((Jr = !0),
      Df(hl, function () {
        return gn(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = De.transition), (De.transition = null);
    var i = U;
    U = 1;
    var s = A;
    (A |= 4),
      (_s.current = null),
      Th(e, n),
      Cf(n, e),
      nh(di),
      (vl = !!fi),
      (di = fi = null),
      (e.current = n),
      Oh(n),
      sp(),
      (A = s),
      (U = i),
      (De.transition = o);
  } else e.current = n;
  if (
    (Jr && ((Jr = !1), (ht = e), (Ll = l)),
    (o = e.pendingLanes),
    o === 0 && (xt = null),
    cp(n.stateNode),
    xe(e, J()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ol) throw ((Ol = !1), (e = Li), (Li = null), e);
  return (
    Ll & 1 && e.tag !== 0 && gn(),
    (o = e.pendingLanes),
    o & 1 ? (e === Di ? rr++ : ((rr = 0), (Di = e))) : (rr = 0),
    Pt(),
    null
  );
}
function gn() {
  if (ht !== null) {
    var e = ac(Ll),
      t = De.transition,
      n = U;
    try {
      if (((De.transition = null), (U = 16 > e ? 16 : e), ht === null))
        var r = !1;
      else {
        if (((e = ht), (ht = null), (Ll = 0), A & 6)) throw Error(N(331));
        var l = A;
        for (A |= 4, P = e.current; P !== null; ) {
          var o = P,
            i = o.child;
          if (P.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var a = s[u];
                for (P = a; P !== null; ) {
                  var f = P;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      tr(8, f, o);
                  }
                  var p = f.child;
                  if (p !== null) (p.return = f), (P = p);
                  else
                    for (; P !== null; ) {
                      f = P;
                      var v = f.sibling,
                        w = f.return;
                      if ((xf(f), f === a)) {
                        P = null;
                        break;
                      }
                      if (v !== null) {
                        (v.return = w), (P = v);
                        break;
                      }
                      P = w;
                    }
                }
              }
              var g = o.alternate;
              if (g !== null) {
                var y = g.child;
                if (y !== null) {
                  g.child = null;
                  do {
                    var x = y.sibling;
                    (y.sibling = null), (y = x);
                  } while (y !== null);
                }
              }
              P = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (P = i);
          else
            e: for (; P !== null; ) {
              if (((o = P), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    tr(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), (P = m);
                break e;
              }
              P = o.return;
            }
        }
        var d = e.current;
        for (P = d; P !== null; ) {
          i = P;
          var h = i.child;
          if (i.subtreeFlags & 2064 && h !== null) (h.return = i), (P = h);
          else
            e: for (i = d; P !== null; ) {
              if (((s = P), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Jl(9, s);
                  }
                } catch (S) {
                  K(s, s.return, S);
                }
              if (s === i) {
                P = null;
                break e;
              }
              var E = s.sibling;
              if (E !== null) {
                (E.return = s.return), (P = E);
                break e;
              }
              P = s.return;
            }
        }
        if (
          ((A = l), Pt(), Je && typeof Je.onPostCommitFiberRoot == "function")
        )
          try {
            Je.onPostCommitFiberRoot(Bl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (U = n), (De.transition = t);
    }
  }
  return !1;
}
function Zu(e, t, n) {
  (t = kn(n, t)),
    (t = cf(e, t, 1)),
    (e = St(e, t, 1)),
    (t = he()),
    e !== null && (Nr(e, 1, t), xe(e, t));
}
function K(e, t, n) {
  if (e.tag === 3) Zu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Zu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (xt === null || !xt.has(r)))
        ) {
          (e = kn(n, e)),
            (e = ff(t, e, 1)),
            (t = St(t, e, 1)),
            (e = he()),
            t !== null && (Nr(t, 1, e), xe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Ih(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = he()),
    (e.pingedLanes |= e.suspendedLanes & n),
    le === e &&
      (ie & n) === n &&
      (te === 4 || (te === 3 && (ie & 130023424) === ie && 500 > J() - Ts)
        ? Mt(e, 0)
        : (Ps |= n)),
    xe(e, t);
}
function Of(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ur), (Ur <<= 1), !(Ur & 130023424) && (Ur = 4194304))
      : (t = 1));
  var n = he();
  (e = rt(e, t)), e !== null && (Nr(e, t, n), xe(e, n));
}
function Uh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Of(e, n);
}
function Mh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  r !== null && r.delete(t), Of(e, n);
}
var Lf;
Lf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || we.current) ye = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (ye = !1), jh(e, t, n);
      ye = !!(e.flags & 131072);
    }
  else (ye = !1), H && t.flags & 1048576 && Fc(t, kl, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ll(e, t), (e = t.pendingProps);
      var l = wn(t, de.current);
      vn(t, n), (l = ks(null, t, r, e, l, n));
      var o = Cs();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Se(r) ? ((o = !0), xl(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            ys(t),
            (l.updater = ql),
            (t.stateNode = l),
            (l._reactInternals = t),
            xi(t, r, e, n),
            (t = Ci(null, t, r, !0, o, n)))
          : ((t.tag = 0), H && o && fs(t), pe(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ll(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = $h(r)),
          (e = Ie(r, e)),
          l)
        ) {
          case 0:
            t = ki(null, t, r, e, n);
            break e;
          case 1:
            t = Hu(null, t, r, e, n);
            break e;
          case 11:
            t = Bu(null, t, r, e, n);
            break e;
          case 14:
            t = $u(null, t, r, Ie(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        ki(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        Hu(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((mf(t), e === null)) throw Error(N(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          $c(e, t),
          jl(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = kn(Error(N(423)), t)), (t = Vu(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = kn(Error(N(424)), t)), (t = Vu(e, t, r, n, l));
            break e;
          } else
            for (
              Ce = wt(t.stateNode.containerInfo.firstChild),
                Ne = t,
                H = !0,
                Me = null,
                n = Mc(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Sn(), r === l)) {
            t = lt(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Hc(t),
        e === null && yi(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        pi(r, l) ? (i = null) : o !== null && pi(r, o) && (t.flags |= 32),
        hf(e, t),
        pe(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && yi(t), null;
    case 13:
      return vf(e, t, n);
    case 4:
      return (
        ws(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = xn(t, null, r, n)) : pe(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        Bu(e, t, r, l, n)
      );
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          M(Cl, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (He(o.value, i)) {
            if (o.children === l.children && !we.current) {
              t = lt(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                i = o.child;
                for (var u = s.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (o.tag === 1) {
                      (u = et(-1, n & -n)), (u.tag = 2);
                      var a = o.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var f = a.pending;
                        f === null
                          ? (u.next = u)
                          : ((u.next = f.next), (f.next = u)),
                          (a.pending = u);
                      }
                    }
                    (o.lanes |= n),
                      (u = o.alternate),
                      u !== null && (u.lanes |= n),
                      wi(o.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(N(341));
                (i.lanes |= n),
                  (s = i.alternate),
                  s !== null && (s.lanes |= n),
                  wi(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        pe(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        vn(t, n),
        (l = ze(l)),
        (r = r(l)),
        (t.flags |= 1),
        pe(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ie(r, t.pendingProps)),
        (l = Ie(r.type, l)),
        $u(e, t, r, l, n)
      );
    case 15:
      return df(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ie(r, l)),
        ll(e, t),
        (t.tag = 1),
        Se(r) ? ((e = !0), xl(t)) : (e = !1),
        vn(t, n),
        af(t, r, l),
        xi(t, r, l, n),
        Ci(null, t, r, !0, e, n)
      );
    case 19:
      return gf(e, t, n);
    case 22:
      return pf(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function Df(e, t) {
  return oc(e, t);
}
function Bh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Le(e, t, n, r) {
  return new Bh(e, t, n, r);
}
function zs(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function $h(e) {
  if (typeof e == "function") return zs(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === bi)) return 11;
    if (e === es) return 14;
  }
  return 2;
}
function kt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Le(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function sl(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) zs(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case en:
        return Bt(n.children, l, o, t);
      case Zi:
        (i = 8), (l |= 8);
        break;
      case Qo:
        return (
          (e = Le(12, n, t, l | 2)), (e.elementType = Qo), (e.lanes = o), e
        );
      case Ko:
        return (e = Le(13, n, t, l)), (e.elementType = Ko), (e.lanes = o), e;
      case qo:
        return (e = Le(19, n, t, l)), (e.elementType = qo), (e.lanes = o), e;
      case Ha:
        return Yl(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Ba:
              i = 10;
              break e;
            case $a:
              i = 9;
              break e;
            case bi:
              i = 11;
              break e;
            case es:
              i = 14;
              break e;
            case at:
              (i = 16), (r = null);
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Le(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Bt(e, t, n, r) {
  return (e = Le(7, e, r, t)), (e.lanes = n), e;
}
function Yl(e, t, n, r) {
  return (
    (e = Le(22, e, r, t)),
    (e.elementType = Ha),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Ao(e, t, n) {
  return (e = Le(6, e, null, t)), (e.lanes = n), e;
}
function Io(e, t, n) {
  return (
    (t = Le(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Hh(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = go(0)),
    (this.expirationTimes = go(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = go(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Fs(e, t, n, r, l, o, i, s, u) {
  return (
    (e = new Hh(e, t, n, s, u)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Le(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    ys(o),
    e
  );
}
function Vh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: bt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function zf(e) {
  if (!e) return jt;
  e = e._reactInternals;
  e: {
    if (Xt(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Se(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Se(n)) return Dc(e, n, t);
  }
  return t;
}
function Ff(e, t, n, r, l, o, i, s, u) {
  return (
    (e = Fs(n, r, !0, e, l, o, i, s, u)),
    (e.context = zf(null)),
    (n = e.current),
    (r = he()),
    (l = Et(n)),
    (o = et(r, l)),
    (o.callback = t ?? null),
    St(n, o, l),
    (e.current.lanes = l),
    Nr(e, l, r),
    xe(e, r),
    e
  );
}
function Gl(e, t, n, r) {
  var l = t.current,
    o = he(),
    i = Et(l);
  return (
    (n = zf(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = et(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = St(l, t, i)),
    e !== null && ($e(e, l, i, o), tl(e, l, i)),
    i
  );
}
function zl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function bu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function As(e, t) {
  bu(e, t), (e = e.alternate) && bu(e, t);
}
function Wh() {
  return null;
}
var Af =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Is(e) {
  this._internalRoot = e;
}
Zl.prototype.render = Is.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Gl(e, t, null, null);
};
Zl.prototype.unmount = Is.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Kt(function () {
      Gl(null, e, null, null);
    }),
      (t[nt] = null);
  }
};
function Zl(e) {
  this._internalRoot = e;
}
Zl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = dc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ft.length && t !== 0 && t < ft[n].priority; n++);
    ft.splice(n, 0, e), n === 0 && hc(e);
  }
};
function Us(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function bl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function ea() {}
function Qh(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var a = zl(i);
        o.call(a);
      };
    }
    var i = Ff(t, r, e, 0, null, !1, !1, "", ea);
    return (
      (e._reactRootContainer = i),
      (e[nt] = i.current),
      dr(e.nodeType === 8 ? e.parentNode : e),
      Kt(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var a = zl(u);
      s.call(a);
    };
  }
  var u = Fs(e, 0, !1, null, null, !1, !1, "", ea);
  return (
    (e._reactRootContainer = u),
    (e[nt] = u.current),
    dr(e.nodeType === 8 ? e.parentNode : e),
    Kt(function () {
      Gl(t, u, n, r);
    }),
    u
  );
}
function eo(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var u = zl(i);
        s.call(u);
      };
    }
    Gl(t, i, e, l);
  } else i = Qh(n, t, e, l, r);
  return zl(i);
}
cc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = qn(t.pendingLanes);
        n !== 0 &&
          (rs(t, n | 1), xe(t, J()), !(A & 6) && ((Cn = J() + 500), Pt()));
      }
      break;
    case 13:
      Kt(function () {
        var r = rt(e, 1);
        if (r !== null) {
          var l = he();
          $e(r, e, 1, l);
        }
      }),
        As(e, 1);
  }
};
ls = function (e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var n = he();
      $e(t, e, 134217728, n);
    }
    As(e, 134217728);
  }
};
fc = function (e) {
  if (e.tag === 13) {
    var t = Et(e),
      n = rt(e, t);
    if (n !== null) {
      var r = he();
      $e(n, e, t, r);
    }
    As(e, t);
  }
};
dc = function () {
  return U;
};
pc = function (e, t) {
  var n = U;
  try {
    return (U = e), t();
  } finally {
    U = n;
  }
};
ri = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Yo(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = Wl(r);
            if (!l) throw Error(N(90));
            Wa(r), Yo(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ka(e, n);
      break;
    case "select":
      (t = n.value), t != null && dn(e, !!n.multiple, t, !1);
  }
};
ba = Os;
ec = Kt;
var Kh = { usingClientEntryPoint: !1, Events: [Rr, ln, Wl, Ga, Za, Os] },
  Vn = {
    findFiberByHostInstance: Ft,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  qh = {
    bundleType: Vn.bundleType,
    version: Vn.version,
    rendererPackageName: Vn.rendererPackageName,
    rendererConfig: Vn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ot.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = rc(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Vn.findFiberByHostInstance || Wh,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Xr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Xr.isDisabled && Xr.supportsFiber)
    try {
      (Bl = Xr.inject(qh)), (Je = Xr);
    } catch {}
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kh;
_e.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Us(t)) throw Error(N(200));
  return Vh(e, t, null, n);
};
_e.createRoot = function (e, t) {
  if (!Us(e)) throw Error(N(299));
  var n = !1,
    r = "",
    l = Af;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Fs(e, 1, !1, null, null, n, !1, r, l)),
    (e[nt] = t.current),
    dr(e.nodeType === 8 ? e.parentNode : e),
    new Is(t)
  );
};
_e.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (e = rc(t)), (e = e === null ? null : e.stateNode), e;
};
_e.flushSync = function (e) {
  return Kt(e);
};
_e.hydrate = function (e, t, n) {
  if (!bl(t)) throw Error(N(200));
  return eo(null, e, t, !0, n);
};
_e.hydrateRoot = function (e, t, n) {
  if (!Us(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = Af;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = Ff(t, null, e, 1, n ?? null, l, !1, o, i)),
    (e[nt] = t.current),
    dr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new Zl(t);
};
_e.render = function (e, t, n) {
  if (!bl(t)) throw Error(N(200));
  return eo(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function (e) {
  if (!bl(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (Kt(function () {
        eo(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[nt] = null);
        });
      }),
      !0)
    : !1;
};
_e.unstable_batchedUpdates = Os;
_e.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!bl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return eo(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function If() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(If);
    } catch (e) {
      console.error(e);
    }
}
If(), (Aa.exports = _e);
var Jh = Aa.exports,
  ta = Jh;
(Vo.createRoot = ta.createRoot), (Vo.hydrateRoot = ta.hydrateRoot);
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function xr() {
  return (
    (xr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    xr.apply(this, arguments)
  );
}
var mt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(mt || (mt = {}));
const na = "popstate";
function Xh(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: o, search: i, hash: s } = r.location;
    return Ai(
      "",
      { pathname: o, search: i, hash: s },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : Fl(l);
  }
  return Gh(t, n, null, e);
}
function X(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Uf(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Yh() {
  return Math.random().toString(36).substr(2, 8);
}
function ra(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Ai(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    xr(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? _n(t) : t,
      { state: n, key: (t && t.key) || r || Yh() }
    )
  );
}
function Fl(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function _n(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function Gh(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: o = !1 } = r,
    i = l.history,
    s = mt.Pop,
    u = null,
    a = f();
  a == null && ((a = 0), i.replaceState(xr({}, i.state, { idx: a }), ""));
  function f() {
    return (i.state || { idx: null }).idx;
  }
  function p() {
    s = mt.Pop;
    let x = f(),
      m = x == null ? null : x - a;
    (a = x), u && u({ action: s, location: y.location, delta: m });
  }
  function v(x, m) {
    s = mt.Push;
    let d = Ai(y.location, x, m);
    a = f() + 1;
    let h = ra(d, a),
      E = y.createHref(d);
    try {
      i.pushState(h, "", E);
    } catch (S) {
      if (S instanceof DOMException && S.name === "DataCloneError") throw S;
      l.location.assign(E);
    }
    o && u && u({ action: s, location: y.location, delta: 1 });
  }
  function w(x, m) {
    s = mt.Replace;
    let d = Ai(y.location, x, m);
    a = f();
    let h = ra(d, a),
      E = y.createHref(d);
    i.replaceState(h, "", E),
      o && u && u({ action: s, location: y.location, delta: 0 });
  }
  function g(x) {
    let m = l.location.origin !== "null" ? l.location.origin : l.location.href,
      d = typeof x == "string" ? x : Fl(x);
    return (
      (d = d.replace(/ $/, "%20")),
      X(
        m,
        "No window.location.(origin|href) available to create URL for href: " +
          d
      ),
      new URL(d, m)
    );
  }
  let y = {
    get action() {
      return s;
    },
    get location() {
      return e(l, i);
    },
    listen(x) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(na, p),
        (u = x),
        () => {
          l.removeEventListener(na, p), (u = null);
        }
      );
    },
    createHref(x) {
      return t(l, x);
    },
    createURL: g,
    encodeLocation(x) {
      let m = g(x);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: v,
    replace: w,
    go(x) {
      return i.go(x);
    },
  };
  return y;
}
var la;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(la || (la = {}));
function Zh(e, t, n) {
  return n === void 0 && (n = "/"), bh(e, t, n);
}
function bh(e, t, n, r) {
  let l = typeof t == "string" ? _n(t) : t,
    o = Ms(l.pathname || "/", n);
  if (o == null) return null;
  let i = Mf(e);
  em(i);
  let s = null;
  for (let u = 0; s == null && u < i.length; ++u) {
    let a = dm(o);
    s = am(i[u], a);
  }
  return s;
}
function Mf(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (o, i, s) => {
    let u = {
      relativePath: s === void 0 ? o.path || "" : s,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    u.relativePath.startsWith("/") &&
      (X(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let a = Ct([r, u.relativePath]),
      f = n.concat(u);
    o.children &&
      o.children.length > 0 &&
      (X(
        o.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + a + '".')
      ),
      Mf(o.children, t, f, a)),
      !(o.path == null && !o.index) &&
        t.push({ path: a, score: sm(a, o.index), routesMeta: f });
  };
  return (
    e.forEach((o, i) => {
      var s;
      if (o.path === "" || !((s = o.path) != null && s.includes("?"))) l(o, i);
      else for (let u of Bf(o.path)) l(o, i, u);
    }),
    t
  );
}
function Bf(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [o, ""] : [o];
  let i = Bf(r.join("/")),
    s = [];
  return (
    s.push(...i.map((u) => (u === "" ? o : [o, u].join("/")))),
    l && s.push(...i),
    s.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function em(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : um(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const tm = /^:[\w-]+$/,
  nm = 3,
  rm = 2,
  lm = 1,
  om = 10,
  im = -2,
  oa = (e) => e === "*";
function sm(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(oa) && (r += im),
    t && (r += rm),
    n
      .filter((l) => !oa(l))
      .reduce((l, o) => l + (tm.test(o) ? nm : o === "" ? lm : om), r)
  );
}
function um(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function am(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    o = "/",
    i = [];
  for (let s = 0; s < r.length; ++s) {
    let u = r[s],
      a = s === r.length - 1,
      f = o === "/" ? t : t.slice(o.length) || "/",
      p = cm(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: a },
        f
      ),
      v = u.route;
    if (!p) return null;
    Object.assign(l, p.params),
      i.push({
        params: l,
        pathname: Ct([o, p.pathname]),
        pathnameBase: vm(Ct([o, p.pathnameBase])),
        route: v,
      }),
      p.pathnameBase !== "/" && (o = Ct([o, p.pathnameBase]));
  }
  return i;
}
function cm(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = fm(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let o = l[0],
    i = o.replace(/(.)\/+$/, "$1"),
    s = l.slice(1);
  return {
    params: r.reduce((a, f, p) => {
      let { paramName: v, isOptional: w } = f;
      if (v === "*") {
        let y = s[p] || "";
        i = o.slice(0, o.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const g = s[p];
      return (
        w && !g ? (a[v] = void 0) : (a[v] = (g || "").replace(/%2F/g, "/")), a
      );
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function fm(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Uf(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, s, u) => (
            r.push({ paramName: s, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function dm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Uf(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Ms(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function pm(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? _n(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : hm(n, t)) : t,
    search: gm(r),
    hash: ym(l),
  };
}
function hm(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Uo(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function mm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Bs(e, t) {
  let n = mm(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function $s(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = _n(e))
    : ((l = xr({}, e)),
      X(
        !l.pathname || !l.pathname.includes("?"),
        Uo("?", "pathname", "search", l)
      ),
      X(
        !l.pathname || !l.pathname.includes("#"),
        Uo("#", "pathname", "hash", l)
      ),
      X(!l.search || !l.search.includes("#"), Uo("#", "search", "hash", l)));
  let o = e === "" || l.pathname === "",
    i = o ? "/" : l.pathname,
    s;
  if (i == null) s = n;
  else {
    let p = t.length - 1;
    if (!r && i.startsWith("..")) {
      let v = i.split("/");
      for (; v[0] === ".."; ) v.shift(), (p -= 1);
      l.pathname = v.join("/");
    }
    s = p >= 0 ? t[p] : "/";
  }
  let u = pm(l, s),
    a = i && i !== "/" && i.endsWith("/"),
    f = (o || i === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (a || f) && (u.pathname += "/"), u;
}
const Ct = (e) => e.join("/").replace(/\/\/+/g, "/"),
  vm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  gm = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  ym = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function wm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const $f = ["post", "put", "patch", "delete"];
new Set($f);
const Sm = ["get", ...$f];
new Set(Sm);
/**
 * React Router v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Er() {
  return (
    (Er = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Er.apply(this, arguments)
  );
}
const Hs = C.createContext(null),
  xm = C.createContext(null),
  Tt = C.createContext(null),
  to = C.createContext(null),
  it = C.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Hf = C.createContext(null);
function Em(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Pn() || X(!1);
  let { basename: r, navigator: l } = C.useContext(Tt),
    { hash: o, pathname: i, search: s } = Wf(e, { relative: n }),
    u = i;
  return (
    r !== "/" && (u = i === "/" ? r : Ct([r, i])),
    l.createHref({ pathname: u, search: s, hash: o })
  );
}
function Pn() {
  return C.useContext(to) != null;
}
function Tn() {
  return Pn() || X(!1), C.useContext(to).location;
}
function Vf(e) {
  C.useContext(Tt).static || C.useLayoutEffect(e);
}
function On() {
  let { isDataRoute: e } = C.useContext(it);
  return e ? Am() : km();
}
function km() {
  Pn() || X(!1);
  let e = C.useContext(Hs),
    { basename: t, future: n, navigator: r } = C.useContext(Tt),
    { matches: l } = C.useContext(it),
    { pathname: o } = Tn(),
    i = JSON.stringify(Bs(l, n.v7_relativeSplatPath)),
    s = C.useRef(!1);
  return (
    Vf(() => {
      s.current = !0;
    }),
    C.useCallback(
      function (a, f) {
        if ((f === void 0 && (f = {}), !s.current)) return;
        if (typeof a == "number") {
          r.go(a);
          return;
        }
        let p = $s(a, JSON.parse(i), o, f.relative === "path");
        e == null &&
          t !== "/" &&
          (p.pathname = p.pathname === "/" ? t : Ct([t, p.pathname])),
          (f.replace ? r.replace : r.push)(p, f.state, f);
      },
      [t, r, i, o, e]
    )
  );
}
function Cm() {
  let { matches: e } = C.useContext(it),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Wf(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = C.useContext(Tt),
    { matches: l } = C.useContext(it),
    { pathname: o } = Tn(),
    i = JSON.stringify(Bs(l, r.v7_relativeSplatPath));
  return C.useMemo(() => $s(e, JSON.parse(i), o, n === "path"), [e, i, o, n]);
}
function Nm(e, t) {
  return jm(e, t);
}
function jm(e, t, n, r) {
  Pn() || X(!1);
  let { navigator: l, static: o } = C.useContext(Tt),
    { matches: i } = C.useContext(it),
    s = i[i.length - 1],
    u = s ? s.params : {};
  s && s.pathname;
  let a = s ? s.pathnameBase : "/";
  s && s.route;
  let f = Tn(),
    p;
  if (t) {
    var v;
    let m = typeof t == "string" ? _n(t) : t;
    a === "/" || ((v = m.pathname) != null && v.startsWith(a)) || X(!1),
      (p = m);
  } else p = f;
  let w = p.pathname || "/",
    g = w;
  if (a !== "/") {
    let m = a.replace(/^\//, "").split("/");
    g = "/" + w.replace(/^\//, "").split("/").slice(m.length).join("/");
  }
  let y = Zh(e, { pathname: g }),
    x = Om(
      y &&
        y.map((m) =>
          Object.assign({}, m, {
            params: Object.assign({}, u, m.params),
            pathname: Ct([
              a,
              l.encodeLocation
                ? l.encodeLocation(m.pathname).pathname
                : m.pathname,
            ]),
            pathnameBase:
              m.pathnameBase === "/"
                ? a
                : Ct([
                    a,
                    l.encodeLocation
                      ? l.encodeLocation(m.pathnameBase).pathname
                      : m.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && x
    ? C.createElement(
        to.Provider,
        {
          value: {
            location: Er(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              p
            ),
            navigationType: mt.Pop,
          },
        },
        x
      )
    : x;
}
function Rm() {
  let e = Fm(),
    t = wm(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return C.createElement(
    C.Fragment,
    null,
    C.createElement("h2", null, "Unexpected Application Error!"),
    C.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? C.createElement("pre", { style: l }, n) : null,
    null
  );
}
const _m = C.createElement(Rm, null);
class Pm extends C.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? C.createElement(
          it.Provider,
          { value: this.props.routeContext },
          C.createElement(Hf.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Tm(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = C.useContext(Hs);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    C.createElement(it.Provider, { value: t }, r)
  );
}
function Om(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var o;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (o = r) != null &&
      o.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let i = e,
    s = (l = n) == null ? void 0 : l.errors;
  if (s != null) {
    let f = i.findIndex(
      (p) => p.route.id && (s == null ? void 0 : s[p.route.id]) !== void 0
    );
    f >= 0 || X(!1), (i = i.slice(0, Math.min(i.length, f + 1)));
  }
  let u = !1,
    a = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < i.length; f++) {
      let p = i[f];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (a = f),
        p.route.id)
      ) {
        let { loaderData: v, errors: w } = n,
          g =
            p.route.loader &&
            v[p.route.id] === void 0 &&
            (!w || w[p.route.id] === void 0);
        if (p.route.lazy || g) {
          (u = !0), a >= 0 ? (i = i.slice(0, a + 1)) : (i = [i[0]]);
          break;
        }
      }
    }
  return i.reduceRight((f, p, v) => {
    let w,
      g = !1,
      y = null,
      x = null;
    n &&
      ((w = s && p.route.id ? s[p.route.id] : void 0),
      (y = p.route.errorElement || _m),
      u &&
        (a < 0 && v === 0
          ? (Im("route-fallback"), (g = !0), (x = null))
          : a === v &&
            ((g = !0), (x = p.route.hydrateFallbackElement || null))));
    let m = t.concat(i.slice(0, v + 1)),
      d = () => {
        let h;
        return (
          w
            ? (h = y)
            : g
            ? (h = x)
            : p.route.Component
            ? (h = C.createElement(p.route.Component, null))
            : p.route.element
            ? (h = p.route.element)
            : (h = f),
          C.createElement(Tm, {
            match: p,
            routeContext: { outlet: f, matches: m, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || v === 0)
      ? C.createElement(Pm, {
          location: n.location,
          revalidation: n.revalidation,
          component: y,
          error: w,
          children: d(),
          routeContext: { outlet: null, matches: m, isDataRoute: !0 },
        })
      : d();
  }, null);
}
var Qf = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Qf || {}),
  Kf = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Kf || {});
function Lm(e) {
  let t = C.useContext(Hs);
  return t || X(!1), t;
}
function Dm(e) {
  let t = C.useContext(xm);
  return t || X(!1), t;
}
function zm(e) {
  let t = C.useContext(it);
  return t || X(!1), t;
}
function qf(e) {
  let t = zm(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || X(!1), n.route.id;
}
function Fm() {
  var e;
  let t = C.useContext(Hf),
    n = Dm(),
    r = qf();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Am() {
  let { router: e } = Lm(Qf.UseNavigateStable),
    t = qf(Kf.UseNavigateStable),
    n = C.useRef(!1);
  return (
    Vf(() => {
      n.current = !0;
    }),
    C.useCallback(
      function (l, o) {
        o === void 0 && (o = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, Er({ fromRouteId: t }, o)));
      },
      [e, t]
    )
  );
}
const ia = {};
function Im(e, t, n) {
  ia[e] || (ia[e] = !0);
}
function Um(e, t) {
  e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath;
}
function Al(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  Pn() || X(!1);
  let { future: o, static: i } = C.useContext(Tt),
    { matches: s } = C.useContext(it),
    { pathname: u } = Tn(),
    a = On(),
    f = $s(t, Bs(s, o.v7_relativeSplatPath), u, l === "path"),
    p = JSON.stringify(f);
  return (
    C.useEffect(
      () => a(JSON.parse(p), { replace: n, state: r, relative: l }),
      [a, p, l, n, r]
    ),
    null
  );
}
function ut(e) {
  X(!1);
}
function Mm(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = mt.Pop,
    navigator: o,
    static: i = !1,
    future: s,
  } = e;
  Pn() && X(!1);
  let u = t.replace(/^\/*/, "/"),
    a = C.useMemo(
      () => ({
        basename: u,
        navigator: o,
        static: i,
        future: Er({ v7_relativeSplatPath: !1 }, s),
      }),
      [u, s, o, i]
    );
  typeof r == "string" && (r = _n(r));
  let {
      pathname: f = "/",
      search: p = "",
      hash: v = "",
      state: w = null,
      key: g = "default",
    } = r,
    y = C.useMemo(() => {
      let x = Ms(f, u);
      return x == null
        ? null
        : {
            location: { pathname: x, search: p, hash: v, state: w, key: g },
            navigationType: l,
          };
    }, [u, f, p, v, w, g, l]);
  return y == null
    ? null
    : C.createElement(
        Tt.Provider,
        { value: a },
        C.createElement(to.Provider, { children: n, value: y })
      );
}
function Bm(e) {
  let { children: t, location: n } = e;
  return Nm(Ii(t), n);
}
new Promise(() => {});
function Ii(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    C.Children.forEach(e, (r, l) => {
      if (!C.isValidElement(r)) return;
      let o = [...t, l];
      if (r.type === C.Fragment) {
        n.push.apply(n, Ii(r.props.children, o));
        return;
      }
      r.type !== ut && X(!1), !r.props.index || !r.props.children || X(!1);
      let i = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (i.children = Ii(r.props.children, o)), n.push(i);
    }),
    n
  );
}
/**
 * React Router DOM v6.30.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ui() {
  return (
    (Ui = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ui.apply(this, arguments)
  );
}
function $m(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    o;
  for (o = 0; o < r.length; o++)
    (l = r[o]), !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function Hm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Vm(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Hm(e);
}
const Wm = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  Qm = "6";
try {
  window.__reactRouterVersion = Qm;
} catch {}
const Km = "startTransition",
  sa = Id[Km];
function qm(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    o = C.useRef();
  o.current == null && (o.current = Xh({ window: l, v5Compat: !0 }));
  let i = o.current,
    [s, u] = C.useState({ action: i.action, location: i.location }),
    { v7_startTransition: a } = r || {},
    f = C.useCallback(
      (p) => {
        a && sa ? sa(() => u(p)) : u(p);
      },
      [u, a]
    );
  return (
    C.useLayoutEffect(() => i.listen(f), [i, f]),
    C.useEffect(() => Um(r), [r]),
    C.createElement(Mm, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: i,
      future: r,
    })
  );
}
const Jm =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Xm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Zt = C.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: o,
        replace: i,
        state: s,
        target: u,
        to: a,
        preventScrollReset: f,
        viewTransition: p,
      } = t,
      v = $m(t, Wm),
      { basename: w } = C.useContext(Tt),
      g,
      y = !1;
    if (typeof a == "string" && Xm.test(a) && ((g = a), Jm))
      try {
        let h = new URL(window.location.href),
          E = a.startsWith("//") ? new URL(h.protocol + a) : new URL(a),
          S = Ms(E.pathname, w);
        E.origin === h.origin && S != null
          ? (a = S + E.search + E.hash)
          : (y = !0);
      } catch {}
    let x = Em(a, { relative: l }),
      m = Ym(a, {
        replace: i,
        state: s,
        target: u,
        preventScrollReset: f,
        relative: l,
        viewTransition: p,
      });
    function d(h) {
      r && r(h), h.defaultPrevented || m(h);
    }
    return C.createElement(
      "a",
      Ui({}, v, { href: g || x, onClick: y || o ? r : d, ref: n, target: u })
    );
  });
var ua;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(ua || (ua = {}));
var aa;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(aa || (aa = {}));
function Ym(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: o,
      relative: i,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    u = On(),
    a = Tn(),
    f = Wf(e, { relative: i });
  return C.useCallback(
    (p) => {
      if (Vm(p, n)) {
        p.preventDefault();
        let v = r !== void 0 ? r : Fl(a) === Fl(f);
        u(e, {
          replace: v,
          state: l,
          preventScrollReset: o,
          relative: i,
          viewTransition: s,
        });
      }
    },
    [a, u, f, r, l, n, e, o, i, s]
  );
}
function Jf(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Gm } = Object.prototype,
  { getPrototypeOf: Vs } = Object,
  no = ((e) => (t) => {
    const n = Gm.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Ve = (e) => ((e = e.toLowerCase()), (t) => no(t) === e),
  ro = (e) => (t) => typeof t === e,
  { isArray: Ln } = Array,
  kr = ro("undefined");
function Zm(e) {
  return (
    e !== null &&
    !kr(e) &&
    e.constructor !== null &&
    !kr(e.constructor) &&
    je(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Xf = Ve("ArrayBuffer");
function bm(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Xf(e.buffer)),
    t
  );
}
const ev = ro("string"),
  je = ro("function"),
  Yf = ro("number"),
  lo = (e) => e !== null && typeof e == "object",
  tv = (e) => e === !0 || e === !1,
  ul = (e) => {
    if (no(e) !== "object") return !1;
    const t = Vs(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  nv = Ve("Date"),
  rv = Ve("File"),
  lv = Ve("Blob"),
  ov = Ve("FileList"),
  iv = (e) => lo(e) && je(e.pipe),
  sv = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (je(e.append) &&
          ((t = no(e)) === "formdata" ||
            (t === "object" &&
              je(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  uv = Ve("URLSearchParams"),
  [av, cv, fv, dv] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Ve
  ),
  pv = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Pr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, l;
  if ((typeof e != "object" && (e = [e]), Ln(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let s;
    for (r = 0; r < i; r++) (s = o[r]), t.call(null, e[s], s, e);
  }
}
function Gf(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    l;
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l;
  return null;
}
const Ut =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Zf = (e) => !kr(e) && e !== Ut;
function Mi() {
  const { caseless: e } = (Zf(this) && this) || {},
    t = {},
    n = (r, l) => {
      const o = (e && Gf(t, l)) || l;
      ul(t[o]) && ul(r)
        ? (t[o] = Mi(t[o], r))
        : ul(r)
        ? (t[o] = Mi({}, r))
        : Ln(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, l = arguments.length; r < l; r++)
    arguments[r] && Pr(arguments[r], n);
  return t;
}
const hv = (e, t, n, { allOwnKeys: r } = {}) => (
    Pr(
      t,
      (l, o) => {
        n && je(l) ? (e[o] = Jf(l, n)) : (e[o] = l);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  mv = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  vv = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  gv = (e, t, n, r) => {
    let l, o, i;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), o = l.length; o-- > 0; )
        (i = l[o]), (!r || r(i, e, t)) && !s[i] && ((t[i] = e[i]), (s[i] = !0));
      e = n !== !1 && Vs(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  yv = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  wv = (e) => {
    if (!e) return null;
    if (Ln(e)) return e;
    let t = e.length;
    if (!Yf(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Sv = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Vs(Uint8Array)),
  xv = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let l;
    for (; (l = r.next()) && !l.done; ) {
      const o = l.value;
      t.call(e, o[0], o[1]);
    }
  },
  Ev = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  kv = Ve("HTMLFormElement"),
  Cv = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l;
    }),
  ca = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  Nv = Ve("RegExp"),
  bf = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    Pr(n, (l, o) => {
      let i;
      (i = t(l, o, e)) !== !1 && (r[o] = i || l);
    }),
      Object.defineProperties(e, r);
  },
  jv = (e) => {
    bf(e, (t, n) => {
      if (je(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (je(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Rv = (e, t) => {
    const n = {},
      r = (l) => {
        l.forEach((o) => {
          n[o] = !0;
        });
      };
    return Ln(e) ? r(e) : r(String(e).split(t)), n;
  },
  _v = () => {},
  Pv = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Tv(e) {
  return !!(
    e &&
    je(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const Ov = (e) => {
    const t = new Array(10),
      n = (r, l) => {
        if (lo(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[l] = r;
            const o = Ln(r) ? [] : {};
            return (
              Pr(r, (i, s) => {
                const u = n(i, l + 1);
                !kr(u) && (o[s] = u);
              }),
              (t[l] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Lv = Ve("AsyncFunction"),
  Dv = (e) => e && (lo(e) || je(e)) && je(e.then) && je(e.catch),
  ed = ((e, t) =>
    e
      ? setImmediate
      : t
      ? ((n, r) => (
          Ut.addEventListener(
            "message",
            ({ source: l, data: o }) => {
              l === Ut && o === n && r.length && r.shift()();
            },
            !1
          ),
          (l) => {
            r.push(l), Ut.postMessage(n, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    je(Ut.postMessage)
  ),
  zv =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ut)
      : (typeof process < "u" && process.nextTick) || ed,
  k = {
    isArray: Ln,
    isArrayBuffer: Xf,
    isBuffer: Zm,
    isFormData: sv,
    isArrayBufferView: bm,
    isString: ev,
    isNumber: Yf,
    isBoolean: tv,
    isObject: lo,
    isPlainObject: ul,
    isReadableStream: av,
    isRequest: cv,
    isResponse: fv,
    isHeaders: dv,
    isUndefined: kr,
    isDate: nv,
    isFile: rv,
    isBlob: lv,
    isRegExp: Nv,
    isFunction: je,
    isStream: iv,
    isURLSearchParams: uv,
    isTypedArray: Sv,
    isFileList: ov,
    forEach: Pr,
    merge: Mi,
    extend: hv,
    trim: pv,
    stripBOM: mv,
    inherits: vv,
    toFlatObject: gv,
    kindOf: no,
    kindOfTest: Ve,
    endsWith: yv,
    toArray: wv,
    forEachEntry: xv,
    matchAll: Ev,
    isHTMLForm: kv,
    hasOwnProperty: ca,
    hasOwnProp: ca,
    reduceDescriptors: bf,
    freezeMethods: jv,
    toObjectSet: Rv,
    toCamelCase: Cv,
    noop: _v,
    toFiniteNumber: Pv,
    findKey: Gf,
    global: Ut,
    isContextDefined: Zf,
    isSpecCompliantForm: Tv,
    toJSONObject: Ov,
    isAsyncFn: Lv,
    isThenable: Dv,
    setImmediate: ed,
    asap: zv,
  };
function L(e, t, n, r, l) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    l && ((this.response = l), (this.status = l.status ? l.status : null));
}
k.inherits(L, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: k.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const td = L.prototype,
  nd = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  nd[e] = { value: e };
});
Object.defineProperties(L, nd);
Object.defineProperty(td, "isAxiosError", { value: !0 });
L.from = (e, t, n, r, l, o) => {
  const i = Object.create(td);
  return (
    k.toFlatObject(
      e,
      i,
      function (u) {
        return u !== Error.prototype;
      },
      (s) => s !== "isAxiosError"
    ),
    L.call(i, e.message, t, n, r, l),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const Fv = null;
function Bi(e) {
  return k.isPlainObject(e) || k.isArray(e);
}
function rd(e) {
  return k.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function fa(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, o) {
          return (l = rd(l)), !n && o ? "[" + l + "]" : l;
        })
        .join(n ? "." : "")
    : t;
}
function Av(e) {
  return k.isArray(e) && !e.some(Bi);
}
const Iv = k.toFlatObject(k, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function oo(e, t, n) {
  if (!k.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = k.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, x) {
        return !k.isUndefined(x[y]);
      }
    ));
  const r = n.metaTokens,
    l = n.visitor || f,
    o = n.dots,
    i = n.indexes,
    u = (n.Blob || (typeof Blob < "u" && Blob)) && k.isSpecCompliantForm(t);
  if (!k.isFunction(l)) throw new TypeError("visitor must be a function");
  function a(g) {
    if (g === null) return "";
    if (k.isDate(g)) return g.toISOString();
    if (!u && k.isBlob(g))
      throw new L("Blob is not supported. Use a Buffer instead.");
    return k.isArrayBuffer(g) || k.isTypedArray(g)
      ? u && typeof Blob == "function"
        ? new Blob([g])
        : Buffer.from(g)
      : g;
  }
  function f(g, y, x) {
    let m = g;
    if (g && !x && typeof g == "object") {
      if (k.endsWith(y, "{}"))
        (y = r ? y : y.slice(0, -2)), (g = JSON.stringify(g));
      else if (
        (k.isArray(g) && Av(g)) ||
        ((k.isFileList(g) || k.endsWith(y, "[]")) && (m = k.toArray(g)))
      )
        return (
          (y = rd(y)),
          m.forEach(function (h, E) {
            !(k.isUndefined(h) || h === null) &&
              t.append(
                i === !0 ? fa([y], E, o) : i === null ? y : y + "[]",
                a(h)
              );
          }),
          !1
        );
    }
    return Bi(g) ? !0 : (t.append(fa(x, y, o), a(g)), !1);
  }
  const p = [],
    v = Object.assign(Iv, {
      defaultVisitor: f,
      convertValue: a,
      isVisitable: Bi,
    });
  function w(g, y) {
    if (!k.isUndefined(g)) {
      if (p.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      p.push(g),
        k.forEach(g, function (m, d) {
          (!(k.isUndefined(m) || m === null) &&
            l.call(t, m, k.isString(d) ? d.trim() : d, y, v)) === !0 &&
            w(m, y ? y.concat(d) : [d]);
        }),
        p.pop();
    }
  }
  if (!k.isObject(e)) throw new TypeError("data must be an object");
  return w(e), t;
}
function da(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Ws(e, t) {
  (this._pairs = []), e && oo(e, this, t);
}
const ld = Ws.prototype;
ld.append = function (t, n) {
  this._pairs.push([t, n]);
};
ld.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, da);
      }
    : da;
  return this._pairs
    .map(function (l) {
      return n(l[0]) + "=" + n(l[1]);
    }, "")
    .join("&");
};
function Uv(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function od(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || Uv;
  k.isFunction(n) && (n = { serialize: n });
  const l = n && n.serialize;
  let o;
  if (
    (l
      ? (o = l(t, n))
      : (o = k.isURLSearchParams(t) ? t.toString() : new Ws(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class pa {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    k.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const id = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Mv = typeof URLSearchParams < "u" ? URLSearchParams : Ws,
  Bv = typeof FormData < "u" ? FormData : null,
  $v = typeof Blob < "u" ? Blob : null,
  Hv = {
    isBrowser: !0,
    classes: { URLSearchParams: Mv, FormData: Bv, Blob: $v },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Qs = typeof window < "u" && typeof document < "u",
  $i = (typeof navigator == "object" && navigator) || void 0,
  Vv =
    Qs &&
    (!$i || ["ReactNative", "NativeScript", "NS"].indexOf($i.product) < 0),
  Wv =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Qv = (Qs && window.location.href) || "http:localhost",
  Kv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Qs,
        hasStandardBrowserEnv: Vv,
        hasStandardBrowserWebWorkerEnv: Wv,
        navigator: $i,
        origin: Qv,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  fe = { ...Kv, ...Hv };
function qv(e, t) {
  return oo(
    e,
    new fe.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, l, o) {
          return fe.isNode && k.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function Jv(e) {
  return k
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Xv(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const l = n.length;
  let o;
  for (r = 0; r < l; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function sd(e) {
  function t(n, r, l, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const s = Number.isFinite(+i),
      u = o >= n.length;
    return (
      (i = !i && k.isArray(l) ? l.length : i),
      u
        ? (k.hasOwnProp(l, i) ? (l[i] = [l[i], r]) : (l[i] = r), !s)
        : ((!l[i] || !k.isObject(l[i])) && (l[i] = []),
          t(n, r, l[i], o) && k.isArray(l[i]) && (l[i] = Xv(l[i])),
          !s)
    );
  }
  if (k.isFormData(e) && k.isFunction(e.entries)) {
    const n = {};
    return (
      k.forEachEntry(e, (r, l) => {
        t(Jv(r), l, n, 0);
      }),
      n
    );
  }
  return null;
}
function Yv(e, t, n) {
  if (k.isString(e))
    try {
      return (t || JSON.parse)(e), k.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const Tr = {
  transitional: id,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        l = r.indexOf("application/json") > -1,
        o = k.isObject(t);
      if ((o && k.isHTMLForm(t) && (t = new FormData(t)), k.isFormData(t)))
        return l ? JSON.stringify(sd(t)) : t;
      if (
        k.isArrayBuffer(t) ||
        k.isBuffer(t) ||
        k.isStream(t) ||
        k.isFile(t) ||
        k.isBlob(t) ||
        k.isReadableStream(t)
      )
        return t;
      if (k.isArrayBufferView(t)) return t.buffer;
      if (k.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let s;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return qv(t, this.formSerializer).toString();
        if ((s = k.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return oo(
            s ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || l ? (n.setContentType("application/json", !1), Yv(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || Tr.transitional,
        r = n && n.forcedJSONParsing,
        l = this.responseType === "json";
      if (k.isResponse(t) || k.isReadableStream(t)) return t;
      if (t && k.isString(t) && ((r && !this.responseType) || l)) {
        const i = !(n && n.silentJSONParsing) && l;
        try {
          return JSON.parse(t);
        } catch (s) {
          if (i)
            throw s.name === "SyntaxError"
              ? L.from(s, L.ERR_BAD_RESPONSE, this, null, this.response)
              : s;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: fe.classes.FormData, Blob: fe.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
k.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Tr.headers[e] = {};
});
const Gv = k.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Zv = (e) => {
    const t = {};
    let n, r, l;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (l = i.indexOf(":")),
              (n = i.substring(0, l).trim().toLowerCase()),
              (r = i.substring(l + 1).trim()),
              !(!n || (t[n] && Gv[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  ha = Symbol("internals");
function Wn(e) {
  return e && String(e).trim().toLowerCase();
}
function al(e) {
  return e === !1 || e == null ? e : k.isArray(e) ? e.map(al) : String(e);
}
function bv(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const eg = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Mo(e, t, n, r, l) {
  if (k.isFunction(r)) return r.call(this, t, n);
  if ((l && (t = n), !!k.isString(t))) {
    if (k.isString(r)) return t.indexOf(r) !== -1;
    if (k.isRegExp(r)) return r.test(t);
  }
}
function tg(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function ng(e, t) {
  const n = k.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (l, o, i) {
        return this[r].call(this, t, l, o, i);
      },
      configurable: !0,
    });
  });
}
let Ee = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const l = this;
    function o(s, u, a) {
      const f = Wn(u);
      if (!f) throw new Error("header name must be a non-empty string");
      const p = k.findKey(l, f);
      (!p || l[p] === void 0 || a === !0 || (a === void 0 && l[p] !== !1)) &&
        (l[p || u] = al(s));
    }
    const i = (s, u) => k.forEach(s, (a, f) => o(a, f, u));
    if (k.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (k.isString(t) && (t = t.trim()) && !eg(t)) i(Zv(t), n);
    else if (k.isHeaders(t)) for (const [s, u] of t.entries()) o(u, s, r);
    else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Wn(t)), t)) {
      const r = k.findKey(this, t);
      if (r) {
        const l = this[r];
        if (!n) return l;
        if (n === !0) return bv(l);
        if (k.isFunction(n)) return n.call(this, l, r);
        if (k.isRegExp(n)) return n.exec(l);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Wn(t)), t)) {
      const r = k.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Mo(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let l = !1;
    function o(i) {
      if (((i = Wn(i)), i)) {
        const s = k.findKey(r, i);
        s && (!n || Mo(r, r[s], s, n)) && (delete r[s], (l = !0));
      }
    }
    return k.isArray(t) ? t.forEach(o) : o(t), l;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      l = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || Mo(this, this[o], o, t, !0)) && (delete this[o], (l = !0));
    }
    return l;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      k.forEach(this, (l, o) => {
        const i = k.findKey(r, o);
        if (i) {
          (n[i] = al(l)), delete n[o];
          return;
        }
        const s = t ? tg(o) : String(o).trim();
        s !== o && delete n[o], (n[s] = al(l)), (r[s] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      k.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && k.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((l) => r.set(l)), r;
  }
  static accessor(t) {
    const r = (this[ha] = this[ha] = { accessors: {} }).accessors,
      l = this.prototype;
    function o(i) {
      const s = Wn(i);
      r[s] || (ng(l, i), (r[s] = !0));
    }
    return k.isArray(t) ? t.forEach(o) : o(t), this;
  }
};
Ee.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
k.reduceDescriptors(Ee.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
k.freezeMethods(Ee);
function Bo(e, t) {
  const n = this || Tr,
    r = t || n,
    l = Ee.from(r.headers);
  let o = r.data;
  return (
    k.forEach(e, function (s) {
      o = s.call(n, o, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    o
  );
}
function ud(e) {
  return !!(e && e.__CANCEL__);
}
function Dn(e, t, n) {
  L.call(this, e ?? "canceled", L.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
k.inherits(Dn, L, { __CANCEL__: !0 });
function ad(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new L(
          "Request failed with status code " + n.status,
          [L.ERR_BAD_REQUEST, L.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function rg(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function lg(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let l = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const a = Date.now(),
        f = r[o];
      i || (i = a), (n[l] = u), (r[l] = a);
      let p = o,
        v = 0;
      for (; p !== l; ) (v += n[p++]), (p = p % e);
      if (((l = (l + 1) % e), l === o && (o = (o + 1) % e), a - i < t)) return;
      const w = f && a - f;
      return w ? Math.round((v * 1e3) / w) : void 0;
    }
  );
}
function og(e, t) {
  let n = 0,
    r = 1e3 / t,
    l,
    o;
  const i = (a, f = Date.now()) => {
    (n = f), (l = null), o && (clearTimeout(o), (o = null)), e.apply(null, a);
  };
  return [
    (...a) => {
      const f = Date.now(),
        p = f - n;
      p >= r
        ? i(a, f)
        : ((l = a),
          o ||
            (o = setTimeout(() => {
              (o = null), i(l);
            }, r - p)));
    },
    () => l && i(l),
  ];
}
const Il = (e, t, n = 3) => {
    let r = 0;
    const l = lg(50, 250);
    return og((o) => {
      const i = o.loaded,
        s = o.lengthComputable ? o.total : void 0,
        u = i - r,
        a = l(u),
        f = i <= s;
      r = i;
      const p = {
        loaded: i,
        total: s,
        progress: s ? i / s : void 0,
        bytes: u,
        rate: a || void 0,
        estimated: a && s && f ? (s - i) / a : void 0,
        event: o,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(p);
    }, n);
  },
  ma = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  va =
    (e) =>
    (...t) =>
      k.asap(() => e(...t)),
  ig = fe.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, fe.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(fe.origin),
        fe.navigator && /(msie|trident)/i.test(fe.navigator.userAgent)
      )
    : () => !0,
  sg = fe.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, l, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          k.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            k.isString(r) && i.push("path=" + r),
            k.isString(l) && i.push("domain=" + l),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function ug(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ag(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function cd(e, t, n) {
  let r = !ug(t);
  return e && (r || n == !1) ? ag(e, t) : t;
}
const ga = (e) => (e instanceof Ee ? { ...e } : e);
function qt(e, t) {
  t = t || {};
  const n = {};
  function r(a, f, p, v) {
    return k.isPlainObject(a) && k.isPlainObject(f)
      ? k.merge.call({ caseless: v }, a, f)
      : k.isPlainObject(f)
      ? k.merge({}, f)
      : k.isArray(f)
      ? f.slice()
      : f;
  }
  function l(a, f, p, v) {
    if (k.isUndefined(f)) {
      if (!k.isUndefined(a)) return r(void 0, a, p, v);
    } else return r(a, f, p, v);
  }
  function o(a, f) {
    if (!k.isUndefined(f)) return r(void 0, f);
  }
  function i(a, f) {
    if (k.isUndefined(f)) {
      if (!k.isUndefined(a)) return r(void 0, a);
    } else return r(void 0, f);
  }
  function s(a, f, p) {
    if (p in t) return r(a, f);
    if (p in e) return r(void 0, a);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: s,
    headers: (a, f, p) => l(ga(a), ga(f), p, !0),
  };
  return (
    k.forEach(Object.keys(Object.assign({}, e, t)), function (f) {
      const p = u[f] || l,
        v = p(e[f], t[f], f);
      (k.isUndefined(v) && p !== s) || (n[f] = v);
    }),
    n
  );
}
const fd = (e) => {
    const t = qt({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: l,
      xsrfCookieName: o,
      headers: i,
      auth: s,
    } = t;
    (t.headers = i = Ee.from(i)),
      (t.url = od(
        cd(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      s &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (s.username || "") +
                ":" +
                (s.password ? unescape(encodeURIComponent(s.password)) : "")
            )
        );
    let u;
    if (k.isFormData(n)) {
      if (fe.hasStandardBrowserEnv || fe.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((u = i.getContentType()) !== !1) {
        const [a, ...f] = u
          ? u
              .split(";")
              .map((p) => p.trim())
              .filter(Boolean)
          : [];
        i.setContentType([a || "multipart/form-data", ...f].join("; "));
      }
    }
    if (
      fe.hasStandardBrowserEnv &&
      (r && k.isFunction(r) && (r = r(t)), r || (r !== !1 && ig(t.url)))
    ) {
      const a = l && o && sg.read(o);
      a && i.set(l, a);
    }
    return t;
  },
  cg = typeof XMLHttpRequest < "u",
  fg =
    cg &&
    function (e) {
      return new Promise(function (n, r) {
        const l = fd(e);
        let o = l.data;
        const i = Ee.from(l.headers).normalize();
        let { responseType: s, onUploadProgress: u, onDownloadProgress: a } = l,
          f,
          p,
          v,
          w,
          g;
        function y() {
          w && w(),
            g && g(),
            l.cancelToken && l.cancelToken.unsubscribe(f),
            l.signal && l.signal.removeEventListener("abort", f);
        }
        let x = new XMLHttpRequest();
        x.open(l.method.toUpperCase(), l.url, !0), (x.timeout = l.timeout);
        function m() {
          if (!x) return;
          const h = Ee.from(
              "getAllResponseHeaders" in x && x.getAllResponseHeaders()
            ),
            S = {
              data:
                !s || s === "text" || s === "json"
                  ? x.responseText
                  : x.response,
              status: x.status,
              statusText: x.statusText,
              headers: h,
              config: e,
              request: x,
            };
          ad(
            function (j) {
              n(j), y();
            },
            function (j) {
              r(j), y();
            },
            S
          ),
            (x = null);
        }
        "onloadend" in x
          ? (x.onloadend = m)
          : (x.onreadystatechange = function () {
              !x ||
                x.readyState !== 4 ||
                (x.status === 0 &&
                  !(x.responseURL && x.responseURL.indexOf("file:") === 0)) ||
                setTimeout(m);
            }),
          (x.onabort = function () {
            x &&
              (r(new L("Request aborted", L.ECONNABORTED, e, x)), (x = null));
          }),
          (x.onerror = function () {
            r(new L("Network Error", L.ERR_NETWORK, e, x)), (x = null);
          }),
          (x.ontimeout = function () {
            let E = l.timeout
              ? "timeout of " + l.timeout + "ms exceeded"
              : "timeout exceeded";
            const S = l.transitional || id;
            l.timeoutErrorMessage && (E = l.timeoutErrorMessage),
              r(
                new L(
                  E,
                  S.clarifyTimeoutError ? L.ETIMEDOUT : L.ECONNABORTED,
                  e,
                  x
                )
              ),
              (x = null);
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in x &&
            k.forEach(i.toJSON(), function (E, S) {
              x.setRequestHeader(S, E);
            }),
          k.isUndefined(l.withCredentials) ||
            (x.withCredentials = !!l.withCredentials),
          s && s !== "json" && (x.responseType = l.responseType),
          a && (([v, g] = Il(a, !0)), x.addEventListener("progress", v)),
          u &&
            x.upload &&
            (([p, w] = Il(u)),
            x.upload.addEventListener("progress", p),
            x.upload.addEventListener("loadend", w)),
          (l.cancelToken || l.signal) &&
            ((f = (h) => {
              x &&
                (r(!h || h.type ? new Dn(null, e, x) : h),
                x.abort(),
                (x = null));
            }),
            l.cancelToken && l.cancelToken.subscribe(f),
            l.signal &&
              (l.signal.aborted ? f() : l.signal.addEventListener("abort", f)));
        const d = rg(l.url);
        if (d && fe.protocols.indexOf(d) === -1) {
          r(new L("Unsupported protocol " + d + ":", L.ERR_BAD_REQUEST, e));
          return;
        }
        x.send(o || null);
      });
    },
  dg = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        l;
      const o = function (a) {
        if (!l) {
          (l = !0), s();
          const f = a instanceof Error ? a : this.reason;
          r.abort(
            f instanceof L ? f : new Dn(f instanceof Error ? f.message : f)
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          (i = null), o(new L(`timeout ${t} of ms exceeded`, L.ETIMEDOUT));
        }, t);
      const s = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((a) => {
            a.unsubscribe
              ? a.unsubscribe(o)
              : a.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((a) => a.addEventListener("abort", o));
      const { signal: u } = r;
      return (u.unsubscribe = () => k.asap(s)), u;
    }
  },
  pg = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      l;
    for (; r < n; ) (l = r + t), yield e.slice(r, l), (r = l);
  },
  hg = async function* (e, t) {
    for await (const n of mg(e)) yield* pg(n, t);
  },
  mg = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  ya = (e, t, n, r) => {
    const l = hg(e, t);
    let o = 0,
      i,
      s = (u) => {
        i || ((i = !0), r && r(u));
      };
    return new ReadableStream(
      {
        async pull(u) {
          try {
            const { done: a, value: f } = await l.next();
            if (a) {
              s(), u.close();
              return;
            }
            let p = f.byteLength;
            if (n) {
              let v = (o += p);
              n(v);
            }
            u.enqueue(new Uint8Array(f));
          } catch (a) {
            throw (s(a), a);
          }
        },
        cancel(u) {
          return s(u), l.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  io =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  dd = io && typeof ReadableStream == "function",
  vg =
    io &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  pd = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  gg =
    dd &&
    pd(() => {
      let e = !1;
      const t = new Request(fe.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (e = !0), "half";
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  wa = 64 * 1024,
  Hi = dd && pd(() => k.isReadableStream(new Response("").body)),
  Ul = { stream: Hi && ((e) => e.body) };
io &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Ul[t] &&
        (Ul[t] = k.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new L(
                `Response type '${t}' is not supported`,
                L.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const yg = async (e) => {
    if (e == null) return 0;
    if (k.isBlob(e)) return e.size;
    if (k.isSpecCompliantForm(e))
      return (
        await new Request(fe.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (k.isArrayBufferView(e) || k.isArrayBuffer(e)) return e.byteLength;
    if ((k.isURLSearchParams(e) && (e = e + ""), k.isString(e)))
      return (await vg(e)).byteLength;
  },
  wg = async (e, t) => {
    const n = k.toFiniteNumber(e.getContentLength());
    return n ?? yg(t);
  },
  Sg =
    io &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: l,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: s,
        onUploadProgress: u,
        responseType: a,
        headers: f,
        withCredentials: p = "same-origin",
        fetchOptions: v,
      } = fd(e);
      a = a ? (a + "").toLowerCase() : "text";
      let w = dg([l, o && o.toAbortSignal()], i),
        g;
      const y =
        w &&
        w.unsubscribe &&
        (() => {
          w.unsubscribe();
        });
      let x;
      try {
        if (
          u &&
          gg &&
          n !== "get" &&
          n !== "head" &&
          (x = await wg(f, r)) !== 0
        ) {
          let S = new Request(t, { method: "POST", body: r, duplex: "half" }),
            R;
          if (
            (k.isFormData(r) &&
              (R = S.headers.get("content-type")) &&
              f.setContentType(R),
            S.body)
          ) {
            const [j, _] = ma(x, Il(va(u)));
            r = ya(S.body, wa, j, _);
          }
        }
        k.isString(p) || (p = p ? "include" : "omit");
        const m = "credentials" in Request.prototype;
        g = new Request(t, {
          ...v,
          signal: w,
          method: n.toUpperCase(),
          headers: f.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: m ? p : void 0,
        });
        let d = await fetch(g);
        const h = Hi && (a === "stream" || a === "response");
        if (Hi && (s || (h && y))) {
          const S = {};
          ["status", "statusText", "headers"].forEach((I) => {
            S[I] = d[I];
          });
          const R = k.toFiniteNumber(d.headers.get("content-length")),
            [j, _] = (s && ma(R, Il(va(s), !0))) || [];
          d = new Response(
            ya(d.body, wa, j, () => {
              _ && _(), y && y();
            }),
            S
          );
        }
        a = a || "text";
        let E = await Ul[k.findKey(Ul, a) || "text"](d, e);
        return (
          !h && y && y(),
          await new Promise((S, R) => {
            ad(S, R, {
              data: E,
              headers: Ee.from(d.headers),
              status: d.status,
              statusText: d.statusText,
              config: e,
              request: g,
            });
          })
        );
      } catch (m) {
        throw (
          (y && y(),
          m && m.name === "TypeError" && /fetch/i.test(m.message)
            ? Object.assign(new L("Network Error", L.ERR_NETWORK, e, g), {
                cause: m.cause || m,
              })
            : L.from(m, m && m.code, e, g))
        );
      }
    }),
  Vi = { http: Fv, xhr: fg, fetch: Sg };
k.forEach(Vi, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Sa = (e) => `- ${e}`,
  xg = (e) => k.isFunction(e) || e === null || e === !1,
  hd = {
    getAdapter: (e) => {
      e = k.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const l = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !xg(n) && ((r = Vi[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new L(`Unknown adapter '${i}'`);
        if (r) break;
        l[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(l).map(
          ([s, u]) =>
            `adapter ${s} ` +
            (u === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(Sa).join(`
`)
            : " " + Sa(o[0])
          : "as no adapter specified";
        throw new L(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: Vi,
  };
function $o(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Dn(null, e);
}
function xa(e) {
  return (
    $o(e),
    (e.headers = Ee.from(e.headers)),
    (e.data = Bo.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    hd
      .getAdapter(e.adapter || Tr.adapter)(e)
      .then(
        function (r) {
          return (
            $o(e),
            (r.data = Bo.call(e, e.transformResponse, r)),
            (r.headers = Ee.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            ud(r) ||
              ($o(e),
              r &&
                r.response &&
                ((r.response.data = Bo.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = Ee.from(r.response.headers)))),
            Promise.reject(r)
          );
        }
      )
  );
}
const md = "1.8.4",
  so = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    so[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Ea = {};
so.transitional = function (t, n, r) {
  function l(o, i) {
    return (
      "[Axios v" +
      md +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, s) => {
    if (t === !1)
      throw new L(
        l(i, " has been removed" + (n ? " in " + n : "")),
        L.ERR_DEPRECATED
      );
    return (
      n &&
        !Ea[i] &&
        ((Ea[i] = !0),
        console.warn(
          l(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, s) : !0
    );
  };
};
so.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Eg(e, t, n) {
  if (typeof e != "object")
    throw new L("options must be an object", L.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let l = r.length;
  for (; l-- > 0; ) {
    const o = r[l],
      i = t[o];
    if (i) {
      const s = e[o],
        u = s === void 0 || i(s, o, e);
      if (u !== !0)
        throw new L("option " + o + " must be " + u, L.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new L("Unknown option " + o, L.ERR_BAD_OPTION);
  }
}
const cl = { assertOptions: Eg, validators: so },
  Qe = cl.validators;
let $t = class {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new pa(), response: new pa() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let l = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(l)
          : (l = new Error());
        const o = l.stack ? l.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = qt(this.defaults, n));
    const { transitional: r, paramsSerializer: l, headers: o } = n;
    r !== void 0 &&
      cl.assertOptions(
        r,
        {
          silentJSONParsing: Qe.transitional(Qe.boolean),
          forcedJSONParsing: Qe.transitional(Qe.boolean),
          clarifyTimeoutError: Qe.transitional(Qe.boolean),
        },
        !1
      ),
      l != null &&
        (k.isFunction(l)
          ? (n.paramsSerializer = { serialize: l })
          : cl.assertOptions(
              l,
              { encode: Qe.function, serialize: Qe.function },
              !0
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      cl.assertOptions(
        n,
        {
          baseUrl: Qe.spelling("baseURL"),
          withXsrfToken: Qe.spelling("withXSRFToken"),
        },
        !0
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = o && k.merge(o.common, o[n.method]);
    o &&
      k.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (g) => {
          delete o[g];
        }
      ),
      (n.headers = Ee.concat(i, o));
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function (y) {
      (typeof y.runWhen == "function" && y.runWhen(n) === !1) ||
        ((u = u && y.synchronous), s.unshift(y.fulfilled, y.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function (y) {
      a.push(y.fulfilled, y.rejected);
    });
    let f,
      p = 0,
      v;
    if (!u) {
      const g = [xa.bind(this), void 0];
      for (
        g.unshift.apply(g, s),
          g.push.apply(g, a),
          v = g.length,
          f = Promise.resolve(n);
        p < v;

      )
        f = f.then(g[p++], g[p++]);
      return f;
    }
    v = s.length;
    let w = n;
    for (p = 0; p < v; ) {
      const g = s[p++],
        y = s[p++];
      try {
        w = g(w);
      } catch (x) {
        y.call(this, x);
        break;
      }
    }
    try {
      f = xa.call(this, w);
    } catch (g) {
      return Promise.reject(g);
    }
    for (p = 0, v = a.length; p < v; ) f = f.then(a[p++], a[p++]);
    return f;
  }
  getUri(t) {
    t = qt(this.defaults, t);
    const n = cd(t.baseURL, t.url, t.allowAbsoluteUrls);
    return od(n, t.params, t.paramsSerializer);
  }
};
k.forEach(["delete", "get", "head", "options"], function (t) {
  $t.prototype[t] = function (n, r) {
    return this.request(
      qt(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
k.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, s) {
      return this.request(
        qt(s || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  ($t.prototype[t] = n()), ($t.prototype[t + "Form"] = n(!0));
});
let kg = class vd {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((l) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](l);
      r._listeners = null;
    }),
      (this.promise.then = (l) => {
        let o;
        const i = new Promise((s) => {
          r.subscribe(s), (o = s);
        }).then(l);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, s) {
        r.reason || ((r.reason = new Dn(o, i, s)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new vd(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
};
function Cg(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Ng(e) {
  return k.isObject(e) && e.isAxiosError === !0;
}
const Wi = {
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
  NetworkAuthenticationRequired: 511,
};
Object.entries(Wi).forEach(([e, t]) => {
  Wi[t] = e;
});
function gd(e) {
  const t = new $t(e),
    n = Jf($t.prototype.request, t);
  return (
    k.extend(n, $t.prototype, t, { allOwnKeys: !0 }),
    k.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (l) {
      return gd(qt(e, l));
    }),
    n
  );
}
const Y = gd(Tr);
Y.Axios = $t;
Y.CanceledError = Dn;
Y.CancelToken = kg;
Y.isCancel = ud;
Y.VERSION = md;
Y.toFormData = oo;
Y.AxiosError = L;
Y.Cancel = Y.CanceledError;
Y.all = function (t) {
  return Promise.all(t);
};
Y.spread = Cg;
Y.isAxiosError = Ng;
Y.mergeConfig = qt;
Y.AxiosHeaders = Ee;
Y.formToJSON = (e) => sd(k.isHTMLForm(e) ? new FormData(e) : e);
Y.getAdapter = hd.getAdapter;
Y.HttpStatusCode = Wi;
Y.default = Y;
const {
    Axios: Ig,
    AxiosError: Ug,
    CanceledError: Mg,
    isCancel: Bg,
    CancelToken: $g,
    VERSION: Hg,
    all: Vg,
    Cancel: Wg,
    isAxiosError: Qg,
    spread: Kg,
    toFormData: qg,
    AxiosHeaders: Jg,
    HttpStatusCode: Xg,
    formToJSON: Yg,
    getAdapter: Gg,
    mergeConfig: Zg,
  } = Y,
  ee = Y.create({
    baseURL: "https://room-booking-sc8r.onrender.com/api/v1",
    headers: { "Content-Type": "application/json" },
    withCredentials: !0,
  });
ee.interceptors.response.use(
  (e) => e,
  (e) => {
    var t;
    return (
      ((t = e.response) == null ? void 0 : t.status) === 401 &&
        (window.location.pathname.includes("/login") ||
          (window.location.href = "/login")),
      Promise.reject(e)
    );
  }
);
const yd = C.createContext(null),
  jg = ({ children: e }) => {
    const [t, n] = C.useState(() => {
        const v = localStorage.getItem("user");
        return v ? JSON.parse(v) : null;
      }),
      [r, l] = C.useState(() => !!localStorage.getItem("user")),
      [o, i] = C.useState(!0);
    C.useEffect(() => {
      s();
    }, []);
    const s = async () => {
        try {
          const v = await ee.get("/auth/check");
          if (v.data.authenticated) {
            const w = { ...v.data.user, type: v.data.user.type };
            n(w), l(!0), localStorage.setItem("user", JSON.stringify(w));
          } else n(null), l(!1), localStorage.removeItem("user");
        } catch (v) {
          console.error("Auth check failed:", v),
            n(null),
            l(!1),
            localStorage.removeItem("user");
        } finally {
          i(!1);
        }
      },
      p = {
        user: t,
        isAuthenticated: r,
        loading: o,
        login: async (v, w, g) => {
          var y;
          try {
            const x = await ee.post("/auth/login", {
                email: v,
                password: w,
                type: g || "guest",
              }),
              m = { ...x.data.user, type: g || "guest" };
            return (
              n(m),
              l(!0),
              localStorage.setItem("user", JSON.stringify(m)),
              x.data
            );
          } catch (x) {
            throw ((y = x.response) == null ? void 0 : y.data) || x;
          }
        },
        register: async (v, w, g) => {
          var y;
          try {
            return (
              await ee.post("/auth/register", {
                email: v,
                password: w,
                type: g || "guest",
              })
            ).data;
          } catch (x) {
            throw ((y = x.response) == null ? void 0 : y.data) || x;
          }
        },
        logout: async () => {
          try {
            await ee.post("/auth/logout"),
              n(null),
              l(!1),
              localStorage.removeItem("user");
          } catch (v) {
            throw (console.error("Logout failed:", v), v);
          }
        },
      };
    return o
      ? c.jsx("div", { children: "Loading..." })
      : c.jsx(yd.Provider, { value: p, children: e });
  },
  Yt = () => {
    const e = C.useContext(yd);
    if (!e) throw new Error("useAuth must be used within an AuthProvider");
    return e;
  },
  Rg = () => {
    const { isAuthenticated: e, user: t, logout: n } = Yt(),
      r = On(),
      l = async () => {
        try {
          await n(), r("/login");
        } catch (o) {
          console.error("Logout failed:", o);
        }
      };
    return c.jsxs("nav", {
      className: "navbar",
      children: [
        c.jsx(Zt, {
          to: "/",
          className: "nav-brand",
          children: "Hotel Booking",
        }),
        c.jsx("div", {
          className: "nav-links",
          children: e
            ? c.jsxs(c.Fragment, {
                children: [
                  c.jsx(Zt, {
                    to: "/rooms",
                    className: "nav-link",
                    children: "Rooms",
                  }),
                  (t == null ? void 0 : t.type) === "guest" &&
                    c.jsx(Zt, {
                      to: "/dashboard",
                      className: "nav-link",
                      children: "Dashboard",
                    }),
                  (t == null ? void 0 : t.type) === "admin" &&
                    c.jsx(Zt, {
                      to: "/manage-rooms",
                      className: "nav-link",
                      children: "Manage Rooms",
                    }),
                  c.jsx("span", {
                    className: "user-email",
                    children: t == null ? void 0 : t.email,
                  }),
                  c.jsx("button", {
                    onClick: l,
                    className: "nav-button",
                    children: "Logout",
                  }),
                ],
              })
            : c.jsxs(c.Fragment, {
                children: [
                  c.jsx(Zt, {
                    to: "/login",
                    className: "nav-link",
                    children: "Login",
                  }),
                  c.jsx(Zt, {
                    to: "/register",
                    className: "nav-link",
                    children: "Register",
                  }),
                ],
              }),
        }),
      ],
    });
  },
  ka = ({ isRegister: e = !1 }) => {
    const [t, n] = C.useState(e),
      [r, l] = C.useState(""),
      [o, i] = C.useState(""),
      [s, u] = C.useState("guest"),
      [a, f] = C.useState(""),
      { login: p, register: v } = Yt(),
      w = On(),
      g = Tn(),
      y = async (x) => {
        var m, d;
        x.preventDefault(), f("");
        try {
          if (t) await v(r, o, s), n(!1);
          else {
            await p(r, o, s);
            const h =
              ((d = (m = g.state) == null ? void 0 : m.from) == null
                ? void 0
                : d.pathname) || "/rooms";
            w(h, { replace: !0 });
          }
        } catch (h) {
          f(h.message || "An error occurred");
        }
      };
    return c.jsx("div", {
      className: "auth-container",
      children: c.jsxs("div", {
        className: "auth-box",
        children: [
          c.jsx("h2", { children: t ? "Register" : "Login" }),
          a && c.jsx("div", { className: "error-message", children: a }),
          c.jsxs("form", {
            onSubmit: y,
            className: "auth-form",
            children: [
              c.jsxs("div", {
                className: "form-group",
                children: [
                  c.jsx("label", { htmlFor: "email", children: "Email" }),
                  c.jsx("input", {
                    type: "email",
                    id: "email",
                    value: r,
                    onChange: (x) => l(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "form-group",
                children: [
                  c.jsx("label", { htmlFor: "password", children: "Password" }),
                  c.jsx("input", {
                    type: "password",
                    id: "password",
                    value: o,
                    onChange: (x) => i(x.target.value),
                    required: !0,
                  }),
                ],
              }),
              !t &&
                c.jsxs("div", {
                  className: "form-group",
                  children: [
                    c.jsx("label", { htmlFor: "role", children: "Role" }),
                    c.jsxs("select", {
                      id: "role",
                      value: s,
                      onChange: (x) => u(x.target.value),
                      children: [
                        c.jsx("option", { value: "guest", children: "Guest" }),
                        c.jsx("option", { value: "admin", children: "Admin" }),
                      ],
                    }),
                  ],
                }),
              c.jsx("button", {
                type: "submit",
                className: "auth-button",
                children: t ? "Register" : "Login",
              }),
            ],
          }),
          c.jsxs("p", {
            className: "auth-switch",
            children: [
              t ? "Already have an account?" : "Don't have an account?",
              c.jsx("button", {
                className: "switch-button",
                onClick: () => n(!t),
                children: t ? "Login" : "Register",
              }),
            ],
          }),
        ],
      }),
    });
  },
  _g = () => {
    const e = On(),
      { user: t } = Yt(),
      [n, r] = C.useState([]),
      [l, o] = C.useState(!0),
      [i, s] = C.useState(null),
      [u, a] = C.useState(!1),
      [f, p] = C.useState(null),
      [v, w] = C.useState(!1),
      [g, y] = C.useState(null);
    C.useEffect(() => {
      x();
    }, []);
    const x = async () => {
        var h, E;
        try {
          o(!0);
          const S = await ee.get("/room");
          r(S.data), s(null);
        } catch (S) {
          s(
            ((E = (h = S.response) == null ? void 0 : h.data) == null
              ? void 0
              : E.message) || "Failed to fetch rooms"
          );
        } finally {
          o(!1);
        }
      },
      m = async (h) => {
        var E, S;
        if ((t == null ? void 0 : t.type) === "admin") p(h), y({ ...h }), a(!0);
        else
          try {
            await ee.post(`/room/${h.number}/view`), e(`/booking/${h.number}`);
          } catch (R) {
            s(
              ((S = (E = R.response) == null ? void 0 : E.data) == null
                ? void 0
                : S.message) || "Failed to view room"
            );
          }
      },
      d = async (h) => {
        var E, S;
        h.preventDefault();
        try {
          await ee.put(`/room/${f.number}`, {
            type: g.type,
            price: g.cost,
            status: g.status,
            image_url: g.image,
          }),
            await x(),
            a(!1),
            w(!1),
            p(null),
            y(null);
        } catch (R) {
          s(
            ((S = (E = R.response) == null ? void 0 : E.data) == null
              ? void 0
              : S.message) || "Failed to update room"
          );
        }
      };
    return l
      ? c.jsx("div", { className: "loading", children: "Loading rooms..." })
      : i
      ? c.jsx("div", { className: "error", children: i })
      : c.jsxs("div", {
          className: "room-list",
          children: [
            c.jsx("h1", { children: "Available Rooms" }),
            c.jsx("div", {
              className: "room-grid",
              children: n.map((h) =>
                c.jsxs(
                  "div",
                  {
                    className: "room-card",
                    children: [
                      c.jsx("img", {
                        src:
                          h.image || `/images/room-${h.type.toLowerCase()}.jpg`,
                        alt: `Room ${h.number}`,
                        className: "room-image",
                      }),
                      c.jsxs("div", {
                        className: "room-info",
                        children: [
                          c.jsxs("h2", { children: ["Room ", h.number] }),
                          c.jsx("p", {
                            className: "room-type",
                            children: h.type,
                          }),
                          c.jsxs("p", {
                            className: "room-price",
                            children: ["₹", h.cost, "/night"],
                          }),
                          c.jsx("span", {
                            className: `room-status ${h.status.toLowerCase()}`,
                            children: h.status,
                          }),
                          c.jsx("button", {
                            onClick: () => m(h),
                            className:
                              (t == null ? void 0 : t.type) === "admin"
                                ? "admin-view-btn"
                                : "view-btn",
                            disabled:
                              (h.status !== "Empty" &&
                                (t == null ? void 0 : t.type) !== "admin") ||
                              (h.status === "Occupied" &&
                                (t == null ? void 0 : t.type) === "admin"),
                            children:
                              (t == null ? void 0 : t.type) === "admin"
                                ? "Manage Room"
                                : "View Room",
                          }),
                        ],
                      }),
                    ],
                  },
                  h.number
                )
              ),
            }),
            u &&
              f &&
              (t == null ? void 0 : t.type) === "admin" &&
              c.jsx("div", {
                className: "modal-overlay",
                children: c.jsxs("div", {
                  className: "modal",
                  children: [
                    c.jsxs("div", {
                      className: "modal-header",
                      children: [
                        c.jsx("h2", {
                          children: v
                            ? "Edit Room"
                            : `Room ${f.number} Details`,
                        }),
                        c.jsx("button", {
                          className: "close-btn",
                          onClick: () => {
                            a(!1), w(!1), p(null), y(null);
                          },
                          children: "×",
                        }),
                      ],
                    }),
                    v
                      ? c.jsxs("form", {
                          onSubmit: d,
                          className: "edit-form",
                          children: [
                            c.jsxs("div", {
                              className: "form-group",
                              children: [
                                c.jsx("label", { children: "Room Type:" }),
                                c.jsxs("select", {
                                  value: g.type,
                                  onChange: (h) =>
                                    y({ ...g, type: h.target.value }),
                                  required: !0,
                                  children: [
                                    c.jsx("option", {
                                      value: "Single",
                                      children: "Single",
                                    }),
                                    c.jsx("option", {
                                      value: "Double",
                                      children: "Double",
                                    }),
                                    c.jsx("option", {
                                      value: "Suite",
                                      children: "Suite",
                                    }),
                                    c.jsx("option", {
                                      value: "Deluxe",
                                      children: "Deluxe",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "form-group",
                              children: [
                                c.jsx("label", {
                                  children: "Price per Night:",
                                }),
                                c.jsx("input", {
                                  type: "number",
                                  value: g.cost,
                                  onChange: (h) =>
                                    y({ ...g, cost: h.target.value }),
                                  required: !0,
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "form-group",
                              children: [
                                c.jsx("label", { children: "Status:" }),
                                c.jsxs("select", {
                                  value: g.status,
                                  onChange: (h) =>
                                    y({ ...g, status: h.target.value }),
                                  required: !0,
                                  children: [
                                    c.jsx("option", {
                                      value: "Empty",
                                      children: "Empty",
                                    }),
                                    c.jsx("option", {
                                      value: "Occupied",
                                      children: "Occupied",
                                    }),
                                    c.jsx("option", {
                                      value: "Under maintenance",
                                      children: "Maintenance",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "form-group",
                              children: [
                                c.jsx("label", { children: "Image URL:" }),
                                c.jsx("input", {
                                  type: "text",
                                  value: g.image,
                                  onChange: (h) =>
                                    y({ ...g, image: h.target.value }),
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "form-actions",
                              children: [
                                c.jsx("button", {
                                  type: "submit",
                                  className: "save-btn",
                                  children: "Save Changes",
                                }),
                                c.jsx("button", {
                                  type: "button",
                                  className: "cancel-btn",
                                  onClick: () => {
                                    w(!1), y({ ...f });
                                  },
                                  children: "Cancel",
                                }),
                              ],
                            }),
                          ],
                        })
                      : c.jsxs("div", {
                          className: "room-details",
                          children: [
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Room Number:" }),
                                c.jsx("span", { children: f.number }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Type:" }),
                                c.jsx("span", { children: f.type }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Price per Night:" }),
                                c.jsxs("span", { children: ["₹", f.cost] }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Status:" }),
                                c.jsx("span", {
                                  className: `status-badge ${f.status.toLowerCase()}`,
                                  children: f.status,
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Total Bookings:" }),
                                c.jsx("span", {
                                  children: f.total_bookings || 0,
                                }),
                              ],
                            }),
                            c.jsxs("div", {
                              className: "detail-row",
                              children: [
                                c.jsx("span", { children: "Views:" }),
                                c.jsx("span", { children: f.views || 0 }),
                              ],
                            }),
                            c.jsx("button", {
                              className: "edit-btn",
                              onClick: () => w(!0),
                              children: "Edit Room",
                            }),
                          ],
                        }),
                  ],
                }),
              }),
          ],
        });
  },
  Pg = () => {
    const { roomId: e } = Cm(),
      t = On(),
      { user: n } = Yt(),
      [r, l] = C.useState(null),
      [o, i] = C.useState(!0),
      [s, u] = C.useState(""),
      [a, f] = C.useState({ checkIn: "", checkOut: "", guests: 1 });
    C.useEffect(() => {
      let g = !0;
      const y = async () => {
        var m, d;
        try {
          i(!0);
          const h = await ee.post(`/room/${e}/view`);
          if (!h.data.data) throw new Error("Room is no longer available");
          g && (l(h.data.data), u(""));
        } catch (h) {
          g &&
            (u(
              ((d = (m = h.response) == null ? void 0 : m.data) == null
                ? void 0
                : d.message) || h.message
            ),
            setTimeout(() => t("/rooms"), 2e3));
        } finally {
          g && i(!1);
        }
      };
      y();
      const x = setInterval(y, 4 * 60 * 1e3);
      return () => {
        (g = !1),
          clearInterval(x),
          (r == null ? void 0 : r.viewer_user_id) ===
            (n == null ? void 0 : n.id) &&
            ee.patch(`/room/${e}/unlock`).catch(console.error);
      };
    }, [e, n, t]);
    const p = async (g) => {
      var y, x, m, d;
      g.preventDefault();
      try {
        const h = new Date(a.checkIn),
          E = new Date(a.checkOut),
          S = Math.ceil((E - h) / (1e3 * 60 * 60 * 24)),
          R = r.cost * S,
          j = await ee.post(`/room/${e}/book`, {
            from_date: a.checkIn,
            days: S,
            amount: R,
          });
        if (
          !((x = (y = j.data) == null ? void 0 : y.data) != null && x.orderId)
        )
          throw new Error("Failed to create booking");
        const _ = {
          key: "rzp_test_r9x0083Lr1W1nI",
          amount: j.data.data.amount * 100,
          currency: j.data.data.currency,
          order_id: j.data.data.orderId,
          name: "Hotel Room Booking",
          description: `Room ${j.data.data.room.number} Booking`,
          handler: function (O) {
            window.location.href = "/dashboard";
          },
          prefill: { name: n.name, email: n.email, contact: n.phone || "" },
          notes: { booking_id: j.data.data.bookingId },
          theme: { color: "#4CAF50" },
        };
        new window.Razorpay(_).open();
      } catch (h) {
        u(
          ((d = (m = h.response) == null ? void 0 : m.data) == null
            ? void 0
            : d.message) || "Failed to create booking"
        );
      }
    };
    if (
      (C.useEffect(() => {
        r &&
          r.viewer_user_id !== (n == null ? void 0 : n.id) &&
          (u("You don't have access to book this room"),
          setTimeout(() => t("/rooms"), 2e3));
      }, [r, n, t]),
      o)
    )
      return c.jsx("div", {
        className: "loading",
        children: "Loading room details...",
      });
    if (s) return c.jsx("div", { className: "error", children: s });
    if (!r) return null;
    const v = new Date().toISOString().split("T")[0],
      w = a.checkIn
        ? new Date(new Date(a.checkIn).getTime() + 864e5)
            .toISOString()
            .split("T")[0]
        : new Date(new Date().getTime() + 864e5).toISOString().split("T")[0];
    return c.jsxs("div", {
      className: "booking-container",
      children: [
        c.jsxs("div", {
          className: "room-preview",
          children: [
            c.jsx("img", {
              src: r.image || `/images/room-${r.type.toLowerCase()}.jpg`,
              alt: `Room ${r.number}`,
              className: "room-image",
            }),
            c.jsxs("div", {
              className: "room-details",
              children: [
                c.jsxs("h2", { children: ["Room ", r.number] }),
                c.jsx("p", { className: "room-type", children: r.type }),
                c.jsxs("p", {
                  className: "room-price",
                  children: ["₹", r.cost, "/night"],
                }),
                c.jsx("span", {
                  className: `room-status ${r.status.toLowerCase()}`,
                  children: r.status,
                }),
                c.jsxs("p", {
                  className: "lock-info",
                  children: [
                    "Room locked for your booking until",
                    " ",
                    new Date(r.lock_until).toLocaleTimeString(),
                  ],
                }),
              ],
            }),
          ],
        }),
        c.jsxs("form", {
          onSubmit: p,
          className: "booking-form",
          children: [
            c.jsx("h3", { children: "Book Your Stay" }),
            c.jsxs("div", {
              className: "date-picker",
              children: [
                c.jsxs("div", {
                  className: "form-group",
                  children: [
                    c.jsx("label", { children: "Check-in Date" }),
                    c.jsx("input", {
                      type: "date",
                      min: v,
                      value: a.checkIn,
                      onChange: (g) => f({ ...a, checkIn: g.target.value }),
                      required: !0,
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "form-group",
                  children: [
                    c.jsx("label", { children: "Check-out Date" }),
                    c.jsx("input", {
                      type: "date",
                      min: w,
                      value: a.checkOut,
                      onChange: (g) => f({ ...a, checkOut: g.target.value }),
                      required: !0,
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className: "form-group",
              children: [
                c.jsx("label", { children: "Number of Guests" }),
                c.jsx("input", {
                  type: "number",
                  min: "1",
                  max: r.capacity || 2,
                  value: a.guests,
                  onChange: (g) =>
                    f({ ...a, guests: parseInt(g.target.value) }),
                  required: !0,
                }),
              ],
            }),
            c.jsxs("div", {
              className: "price-summary",
              children: [
                c.jsx("h4", { children: "Price Summary" }),
                c.jsxs("div", {
                  className: "price-details",
                  children: [
                    c.jsx("span", { children: "Room Rate" }),
                    c.jsxs("span", { children: ["₹", r.cost, "/night"] }),
                  ],
                }),
                a.checkIn &&
                  a.checkOut &&
                  c.jsxs("div", {
                    className: "price-details total",
                    children: [
                      c.jsx("span", { children: "Total" }),
                      c.jsxs("span", {
                        children: ["₹", Tg(r.cost, a.checkIn, a.checkOut)],
                      }),
                    ],
                  }),
              ],
            }),
            c.jsx("button", {
              type: "submit",
              className: "book-button",
              disabled: !r.lock_until || new Date(r.lock_until) <= new Date(),
              children: "Proceed to Payment",
            }),
          ],
        }),
      ],
    });
  },
  Tg = (e, t, n) => {
    const r = new Date(t),
      l = new Date(n),
      o = Math.ceil((l - r) / (1e3 * 60 * 60 * 24));
    return e * o;
  },
  Og = () => {
    const { user: e } = Yt(),
      [t, n] = C.useState([]),
      [r, l] = C.useState([]),
      [o, i] = C.useState(!0),
      [s, u] = C.useState(null),
      [a, f] = C.useState(!1),
      [p, v] = C.useState(null),
      [w, g] = C.useState({
        number: "",
        type: "",
        price: "",
        status: "Empty",
        image_url: "",
      });
    C.useEffect(() => {
      y();
    }, []);
    const y = async () => {
        var S, R;
        try {
          i(!0);
          const [j, _] = await Promise.all([
            ee.get("/room"),
            ee.get("/booking/user"),
          ]);
          n(j.data), l(_.data), u(null);
        } catch (j) {
          u(
            ((R = (S = j.response) == null ? void 0 : S.data) == null
              ? void 0
              : R.message) || "Failed to fetch data"
          );
        } finally {
          i(!1);
        }
      },
      x = async (S) => {
        var R, j;
        S.preventDefault();
        try {
          p ? await ee.put(`/room/${p.number}`, w) : await ee.post("/room", w),
            y(),
            f(!1),
            v(null),
            g({
              number: "",
              type: "",
              price: "",
              status: "Empty",
              image_url: "",
            });
        } catch (_) {
          u(
            ((j = (R = _.response) == null ? void 0 : R.data) == null
              ? void 0
              : j.message) || "Failed to save room"
          );
        }
      },
      m = async (S) => {
        var R, j;
        if (window.confirm("Are you sure you want to delete this room?"))
          try {
            await ee.delete(`/room/${S}`), y();
          } catch (_) {
            u(
              ((j = (R = _.response) == null ? void 0 : R.data) == null
                ? void 0
                : j.message) || "Failed to delete room"
            );
          }
      },
      d = (S) => {
        v(S), g(S), f(!0);
      },
      h = () => {
        if ((e == null ? void 0 : e.type) === "admin") {
          const S = t.length,
            R = t.filter((O) => O.status === "Empty").length,
            j = t.filter((O) => O.status === "Occupied").length,
            _ = t.filter((O) => O.status === "Maintenance").length,
            I = r.reduce((O, Z) => O + Z.amount, 0);
          return {
            totalRooms: S,
            emptyRooms: R,
            occupiedRooms: j,
            maintenanceRooms: _,
            totalRevenue: I,
          };
        } else {
          const S = r.filter((O) => O.status === "confirmed"),
            R = S.length,
            j = new Date();
          j.setHours(0, 0, 0, 0);
          const _ = S.filter((O) => {
              const Z = new Date(O.from_date);
              return Z.setHours(0, 0, 0, 0), Z >= j;
            }).length,
            I = S.filter((O) => {
              const Z = new Date(O.end_date);
              return Z.setHours(0, 0, 0, 0), Z < j;
            }).length;
          return {
            totalBookings: R,
            upcomingBookings: _,
            completedBookings: I,
          };
        }
      };
    if (o)
      return c.jsx("div", {
        className: "loading",
        children: "Loading dashboard...",
      });
    if (s) return c.jsx("div", { className: "error", children: s });
    const E = h();
    return (e == null ? void 0 : e.type) === "admin"
      ? c.jsxs("div", {
          className: "dashboard",
          children: [
            c.jsx("h1", { children: "Admin Dashboard" }),
            c.jsxs("div", {
              className: "stats-section",
              children: [
                c.jsx("h2", { children: "Hotel Statistics" }),
                c.jsxs("div", {
                  className: "stats-grid",
                  children: [
                    c.jsxs("div", {
                      className: "stat-card",
                      children: [
                        c.jsx("h3", { children: "Total Rooms" }),
                        c.jsx("p", { children: E.totalRooms }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "stat-card",
                      children: [
                        c.jsx("h3", { children: "Available Rooms" }),
                        c.jsx("p", { children: E.emptyRooms }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "stat-card",
                      children: [
                        c.jsx("h3", { children: "Occupied Rooms" }),
                        c.jsx("p", { children: E.occupiedRooms }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "stat-card",
                      children: [
                        c.jsx("h3", { children: "Under Maintenance" }),
                        c.jsx("p", { children: E.maintenanceRooms }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "stat-card highlight",
                      children: [
                        c.jsx("h3", { children: "Total Revenue" }),
                        c.jsxs("p", { children: ["₹", E.totalRevenue] }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className: "admin-section",
              children: [
                c.jsxs("div", {
                  className: "section-header",
                  children: [
                    c.jsx("h2", { children: "Room Management" }),
                    c.jsx("button", {
                      onClick: () => f(!0),
                      className: "add-room-btn",
                      children: "Add New Room",
                    }),
                  ],
                }),
                a &&
                  c.jsxs("form", {
                    onSubmit: x,
                    className: "room-form",
                    children: [
                      c.jsx("input", {
                        type: "text",
                        placeholder: "Room Number",
                        value: w.number,
                        onChange: (S) => g({ ...w, number: S.target.value }),
                        disabled: p,
                        required: !0,
                      }),
                      c.jsxs("select", {
                        value: w.type,
                        onChange: (S) => g({ ...w, type: S.target.value }),
                        required: !0,
                        children: [
                          c.jsx("option", {
                            value: "",
                            children: "Select Room Type",
                          }),
                          c.jsx("option", {
                            value: "Single",
                            children: "Single",
                          }),
                          c.jsx("option", {
                            value: "Double",
                            children: "Double",
                          }),
                          c.jsx("option", {
                            value: "Deluxe",
                            children: "Deluxe",
                          }),
                          c.jsx("option", {
                            value: "Suite",
                            children: "Suite",
                          }),
                        ],
                      }),
                      c.jsx("input", {
                        type: "number",
                        placeholder: "Price per Night",
                        value: w.price,
                        onChange: (S) => g({ ...w, price: S.target.value }),
                        required: !0,
                      }),
                      c.jsxs("select", {
                        value: w.status,
                        onChange: (S) => g({ ...w, status: S.target.value }),
                        children: [
                          c.jsx("option", {
                            value: "Empty",
                            children: "Empty",
                          }),
                          c.jsx("option", {
                            value: "Occupied",
                            children: "Occupied",
                          }),
                          c.jsx("option", {
                            value: "Under maintenance",
                            children: "Maintenance",
                          }),
                        ],
                      }),
                      c.jsx("input", {
                        type: "text",
                        placeholder: "Image URL",
                        value: w.image,
                        onChange: (S) => g({ ...w, image_url: S.target.value }),
                      }),
                      c.jsxs("div", {
                        className: "form-buttons",
                        children: [
                          c.jsxs("button", {
                            type: "submit",
                            className: "submit-btn",
                            children: [p ? "Update" : "Create", " Room"],
                          }),
                          c.jsx("button", {
                            type: "button",
                            className: "cancel-btn",
                            onClick: () => {
                              f(!1),
                                v(null),
                                g({
                                  number: "",
                                  type: "",
                                  price: "",
                                  status: "Empty",
                                  image_url: "",
                                });
                            },
                            children: "Cancel",
                          }),
                        ],
                      }),
                    ],
                  }),
                c.jsx("div", {
                  className: "rooms-table",
                  children: c.jsxs("table", {
                    children: [
                      c.jsx("thead", {
                        children: c.jsxs("tr", {
                          children: [
                            c.jsx("th", { children: "Room" }),
                            c.jsx("th", { children: "Type" }),
                            c.jsx("th", { children: "Price" }),
                            c.jsx("th", { children: "Status" }),
                            c.jsx("th", { children: "Actions" }),
                          ],
                        }),
                      }),
                      c.jsx("tbody", {
                        children: t.map((S) =>
                          c.jsxs(
                            "tr",
                            {
                              children: [
                                c.jsx("td", { children: S.number }),
                                c.jsx("td", { children: S.type }),
                                c.jsxs("td", { children: ["₹", S.cost] }),
                                c.jsx("td", {
                                  children: c.jsx("span", {
                                    className: `status-badge ${S.status.toLowerCase()}`,
                                    children: S.status,
                                  }),
                                }),
                                c.jsxs("td", {
                                  className: "action-buttons",
                                  children: [
                                    c.jsx("button", {
                                      onClick: () => d(S),
                                      className: "edit-btn",
                                      children: "Edit",
                                    }),
                                    c.jsx("button", {
                                      onClick: () => m(S.number),
                                      className: "delete-btn",
                                      children: "Delete",
                                    }),
                                  ],
                                }),
                              ],
                            },
                            S.number
                          )
                        ),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        })
      : (e == null ? void 0 : e.type) === "guest" ||
        (e == null ? void 0 : e.type) === "user"
      ? c.jsxs("div", {
          className: "dashboard guest-dashboard",
          children: [
            c.jsxs("div", {
              className: "dashboard-header",
              children: [
                c.jsx("h1", { children: "My Dashboard" }),
                c.jsxs("p", { children: ["Welcome back, ", e.name, "!"] }),
              ],
            }),
            c.jsxs("div", {
              className: "summary-cards",
              children: [
                c.jsxs("div", {
                  className: "summary-card",
                  children: [
                    c.jsx("h3", { children: "Total Bookings" }),
                    c.jsx("p", {
                      className: "number",
                      children: E.totalBookings,
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "summary-card",
                  children: [
                    c.jsx("h3", { children: "Upcoming Stays" }),
                    c.jsx("p", {
                      className: "number",
                      children: E.upcomingBookings,
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "summary-card",
                  children: [
                    c.jsx("h3", { children: "Completed Stays" }),
                    c.jsx("p", {
                      className: "number",
                      children: E.completedBookings,
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className: "bookings-section",
              children: [
                c.jsx("h2", { children: "My Bookings" }),
                r.length === 0
                  ? c.jsxs("div", {
                      className: "no-bookings",
                      children: [
                        c.jsx("p", {
                          children: "You haven't made any bookings yet.",
                        }),
                        c.jsx("button", {
                          onClick: () => (window.location.href = "/rooms"),
                          className: "book-now-btn",
                          children: "Book a Room",
                        }),
                      ],
                    })
                  : c.jsx("div", {
                      className: "bookings-grid",
                      children: r
                        .filter((S) => S.status === "confirmed")
                        .map((S) =>
                          c.jsx(
                            "div",
                            {
                              className: "booking-card",
                              children: c.jsxs("div", {
                                className: "booking-info",
                                children: [
                                  c.jsxs("h3", {
                                    children: ["Room ", S.room_number],
                                  }),
                                  c.jsx("p", {
                                    className: "room-type",
                                    children: S.room_type,
                                  }),
                                  c.jsxs("div", {
                                    className: "booking-dates",
                                    children: [
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("span", {
                                            children: "Check In:",
                                          }),
                                          c.jsx("p", {
                                            children: new Date(
                                              S.from_date
                                            ).toLocaleDateString(),
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        children: [
                                          c.jsx("span", {
                                            children: "Check Out:",
                                          }),
                                          c.jsx("p", {
                                            children: new Date(
                                              S.end_date
                                            ).toLocaleDateString(),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    className: "booking-footer",
                                    children: [
                                      c.jsx("span", {
                                        className: `booking-status ${S.status.toLowerCase()}`,
                                        children: S.status,
                                      }),
                                      c.jsxs("span", {
                                        className: "booking-amount",
                                        children: ["₹", S.amount],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            S.id
                          )
                        ),
                    }),
              ],
            }),
          ],
        })
      : c.jsx("div", { children: "Please log in to view your dashboard." });
  },
  Lg = () => {
    const [e, t] = C.useState([]),
      [n, r] = C.useState(!0),
      [l, o] = C.useState(null),
      [i, s] = C.useState(!1),
      [u, a] = C.useState({
        number: "",
        type: "Single",
        price: "",
        status: "Empty",
        image_url: "",
      });
    C.useEffect(() => {
      f();
    }, []);
    const f = async () => {
        var w, g;
        try {
          const y = await ee.get("/room");
          t(y.data);
        } catch (y) {
          o(
            ((g = (w = y.response) == null ? void 0 : w.data) == null
              ? void 0
              : g.message) || "Failed to fetch rooms"
          );
        } finally {
          r(!1);
        }
      },
      p = async (w) => {
        var g, y;
        w.preventDefault();
        try {
          await ee.post("/room", u),
            s(!1),
            a({
              number: "",
              type: "Single",
              price: "",
              status: "Empty",
              image_url: "",
            }),
            f();
        } catch (x) {
          o(
            ((y = (g = x.response) == null ? void 0 : g.data) == null
              ? void 0
              : y.message) || "Failed to create room"
          );
        }
      },
      v = async (w) => {
        var g, y;
        if (window.confirm("Are you sure you want to delete this room?"))
          try {
            await ee.delete(`/room/${w}`), f();
          } catch (x) {
            o(
              ((y = (g = x.response) == null ? void 0 : g.data) == null
                ? void 0
                : y.message) || "Failed to delete room"
            );
          }
      };
    return n
      ? c.jsx("div", { children: "Loading..." })
      : l
      ? c.jsx("div", { className: "error", children: l })
      : c.jsxs("div", {
          className: "room-management",
          children: [
            c.jsxs("div", {
              className: "header",
              children: [
                c.jsx("h2", { children: "Room Management" }),
                c.jsx("button", {
                  onClick: () => s(!0),
                  className: "add-btn",
                  children: "Add New Room",
                }),
              ],
            }),
            i &&
              c.jsxs("form", {
                onSubmit: p,
                className: "room-form",
                children: [
                  c.jsxs("div", {
                    className: "form-group",
                    children: [
                      c.jsx("label", { children: "Room Number:" }),
                      c.jsx("input", {
                        type: "text",
                        value: u.number,
                        onChange: (w) => a({ ...u, number: w.target.value }),
                        required: !0,
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "form-group",
                    children: [
                      c.jsx("label", { children: "Room Type:" }),
                      c.jsxs("select", {
                        value: u.type,
                        onChange: (w) => a({ ...u, type: w.target.value }),
                        required: !0,
                        children: [
                          c.jsx("option", {
                            value: "Single",
                            children: "Single",
                          }),
                          c.jsx("option", {
                            value: "Double",
                            children: "Double",
                          }),
                          c.jsx("option", {
                            value: "Deluxe",
                            children: "Deluxe",
                          }),
                          c.jsx("option", {
                            value: "Suite",
                            children: "Suite",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "form-group",
                    children: [
                      c.jsx("label", { children: "Price per Night:" }),
                      c.jsx("input", {
                        type: "number",
                        value: u.price,
                        onChange: (w) => a({ ...u, price: w.target.value }),
                        required: !0,
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "form-group",
                    children: [
                      c.jsx("label", { children: "Image URL:" }),
                      c.jsx("input", {
                        type: "text",
                        value: u.image,
                        onChange: (w) => a({ ...u, image_url: w.target.value }),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "form-buttons",
                    children: [
                      c.jsx("button", {
                        type: "submit",
                        className: "submit-btn",
                        children: "Create Room",
                      }),
                      c.jsx("button", {
                        type: "button",
                        onClick: () => s(!1),
                        className: "cancel-btn",
                        children: "Cancel",
                      }),
                    ],
                  }),
                ],
              }),
            c.jsx("div", {
              className: "rooms-table",
              children: c.jsxs("table", {
                children: [
                  c.jsx("thead", {
                    children: c.jsxs("tr", {
                      children: [
                        c.jsx("th", { children: "Room Number" }),
                        c.jsx("th", { children: "Type" }),
                        c.jsx("th", { children: "Price" }),
                        c.jsx("th", { children: "Status" }),
                        c.jsx("th", { children: "Actions" }),
                      ],
                    }),
                  }),
                  c.jsx("tbody", {
                    children: e.map((w) =>
                      c.jsxs(
                        "tr",
                        {
                          children: [
                            c.jsx("td", { children: w.number }),
                            c.jsx("td", { children: w.type }),
                            c.jsxs("td", { children: ["₹", w.cost] }),
                            c.jsx("td", {
                              children: c.jsx("span", {
                                className: `status ${w.status.toLowerCase()}`,
                                children: w.status,
                              }),
                            }),
                            c.jsx("td", {
                              children: c.jsx("button", {
                                onClick: () => v(w.number),
                                className: "delete-btn",
                                children: "Delete",
                              }),
                            }),
                          ],
                        },
                        w.number
                      )
                    ),
                  }),
                ],
              }),
            }),
          ],
        });
  },
  Ho = ({ children: e }) => {
    const { isAuthenticated: t } = Yt();
    return t ? e : c.jsx(Al, { to: "/login" });
  },
  Dg = ({ children: e }) => {
    const { isAuthenticated: t, user: n } = Yt();
    return t
      ? (n == null ? void 0 : n.type) !== "admin"
        ? c.jsx(Al, { to: "/dashboard" })
        : e
      : c.jsx(Al, { to: "/login" });
  };
function zg() {
  return c.jsx(jg, {
    children: c.jsx(qm, {
      children: c.jsxs("div", {
        className: "app",
        children: [
          c.jsx(Rg, {}),
          c.jsx("main", {
            className: "main-content",
            children: c.jsxs(Bm, {
              children: [
                c.jsx(ut, { path: "/login", element: c.jsx(ka, {}) }),
                c.jsx(ut, {
                  path: "/register",
                  element: c.jsx(ka, { isRegister: !0 }),
                }),
                c.jsx(ut, {
                  path: "/rooms",
                  element: c.jsx(Ho, { children: c.jsx(_g, {}) }),
                }),
                c.jsx(ut, {
                  path: "/booking/:roomId",
                  element: c.jsx(Ho, { children: c.jsx(Pg, {}) }),
                }),
                c.jsx(ut, {
                  path: "/dashboard",
                  element: c.jsx(Ho, { children: c.jsx(Og, {}) }),
                }),
                c.jsx(ut, {
                  path: "/manage-rooms",
                  element: c.jsx(Dg, { children: c.jsx(Lg, {}) }),
                }),
                c.jsx(ut, { path: "/", element: c.jsx(Al, { to: "/rooms" }) }),
              ],
            }),
          }),
        ],
      }),
    }),
  });
}
Vo.createRoot(document.getElementById("root")).render(
  c.jsx(za.StrictMode, { children: c.jsx(zg, {}) })
);
