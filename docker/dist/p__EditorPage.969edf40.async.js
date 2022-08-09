(self.webpackChunkant_design_pro = self.webpackChunkant_design_pro || []).push([[201], {
  2981: function (pe, re, e) {
    "use strict";
    e.r(re), e.d(re, {
      default: function () {
        return tr
      }
    });
    var T = e(59250), ne = e(13013), o = e(57663), y = e(71577), le = e(98858), Q = e(4914), ue = e(30887),
      te = e(54689), de = e(34792), J = e(48086), Y = e(3182), O = e(2824), ce = e(402), se = e(72031), P = e(94043),
      n = e.n(P), r = e(67294), s = e(86582), a = e(69610), p = e(54941), x = e(81306), d = e(72936), G = e(18106),
      k = e(58634), K = e(29656), we = e(4631), ae = e(71707), nr = e(48991), sr = e(20017), ar = e(88657),
      ir = e(89700), or = e(35688), lr = e(9898), ur = e(82801), cr = e(93411), dr = e(99762), fr = e(36629),
      hr = e(5321), pr = e(7999), vr = e(960), mr = e(88386), gr = e(69109), je = e(69816), Ee = e(25782),
      be = e(24616), Te = e(21444), Pe = e(38296), j = e(21010), Re = function () {
        var R = (0, Y.Z)(n().mark(function I(Z, i, f, m, C) {
          var v;
          return n().wrap(function (D) {
            for (; ;) switch (D.prev = D.next) {
              case 0:
                return v = "/server/V1/editor/run/interactive/", D.abrupt("return", (0, j.WY)(v, {
                  method: "post",
                  data: {id: Z, lang: i, filelist: f, course_id: m, user_id: C}
                }));
              case 2:
              case"end":
                return D.stop()
            }
          }, I)
        }));
        return function (Z, i, f, m, C) {
          return R.apply(this, arguments)
        }
      }(), yr = null, $e = function () {
        var R = (0, Y.Z)(n().mark(function I(Z) {
          var i;
          return n().wrap(function (m) {
            for (; ;) switch (m.prev = m.next) {
              case 0:
                return i = "/server/V1/editor/terminate/", m.abrupt("return", (0, j.WY)(i, {
                  method: "post",
                  data: {id: Z}
                }));
              case 2:
              case"end":
                return m.stop()
            }
          }, I)
        }));
        return function (Z) {
          return R.apply(this, arguments)
        }
      }(), Fe = function () {
        var R = (0, Y.Z)(n().mark(function I(Z) {
          var i;
          return n().wrap(function (m) {
            for (; ;) switch (m.prev = m.next) {
              case 0:
                return i = "/server/V1/editor/pic/", m.abrupt("return", (0, j.WY)(i, {method: "post", data: {path: Z}}));
              case 2:
              case"end":
                return m.stop()
            }
          }, I)
        }));
        return function (Z) {
          return R.apply(this, arguments)
        }
      }(), De = e(1798), F = e.n(De), Ie = e(77596), Ve = e(37476), Ae = e(5966), Me = e(64317), xr = e(5029),
      t = e(85893), Oe = k.Z.TabPane, ve = [{
        title: "main.py",
        content: "",
        key: "0",
        closable: !1,
        lang: "python",
        placeholder: (0, j.Kd)() == "zh-CN" ? "\u4EE3\u7801\u8F93\u5165\u533A..." : "code goes here"
      }, {
        title: "requirements.txt", content: "", key: "1", closable: !1, lang: "properties", placeholder: `To add dependencies of the program as the following format:
'''
matplotlib
python-dateutil>=2.7
cycler==0.10
six>=1.5
'''`
      }], We = function (R) {
        (0, x.Z)(Z, R);
        var I = (0, d.Z)(Z);

        function Z() {
          var i;
          (0, a.Z)(this, Z);
          for (var f = arguments.length, m = new Array(f), C = 0; C < f; C++) m[C] = arguments[C];
          return i = I.call.apply(I, [this].concat(m)), i.state = {
            id: "",
            isFullScreen: !1,
            disable: !1,
            input: "",
            activeKey: ve[0].key,
            panes: ve,
            modalVisit: !1
          }, i.rootRef = r.createRef(), i.ws = r.createRef(null), i.restFormRef = r.createRef(), i.fullScreen = function () {
            i.state.isFullScreen || i.rootRef.current.requestFullscreen()
          }, i.exitFullScreen = function () {
            document.exitFullscreen()
          }, i.handeleRun = function () {
            if (i.state.id) i.terminate(); else {
              var v = (0, Ie.x0)().replace(/-/g, "");
              F().publish("id", {id: v}), i.setState({id: v})
            }
          }, i.runcode = (0, Y.Z)(n().mark(function v() {
            var w, D, A, E, c;
            return n().wrap(function (h) {
              for (; ;) switch (h.prev = h.next) {
                case 0:
                  return D = i.state, A = D.id, E = D.panes, c = E.map(function (S) {
                    return {title: S.title, content: S.content, id: S.key}
                  }), h.next = 4, Re(A, E[0].lang, c, i.props.courseid, i.props.currentUser.userid);
                case 4:
                  w = h.sent, w.error_code != 200 && J.default.error(w.msg);
                case 6:
                case"end":
                  return h.stop()
              }
            }, v)
          })), i.terminate = (0, Y.Z)(n().mark(function v() {
            var w;
            return n().wrap(function (A) {
              for (; ;) switch (A.prev = A.next) {
                case 0:
                  return i.setState({disable: !0}), A.next = 3, $e(i.state.id);
                case 3:
                  w = A.sent, w.error_code !== 200 && J.default.error("Something wrong happens. Please try again later"), F().publish("id", {id: ""}), i.setState({id: ""}), i.ws.current = 0, setTimeout(function () {
                    i.setState({disable: !1})
                  }, 1e3);
                case 9:
                case"end":
                  return A.stop()
              }
            }, v)
          })), i.onChange = function (v) {
            i.setState({activeKey: v})
          }, i.onEdit = function (v, w) {
            console.log(w, v), i[w](v)
          }, i.add = function () {
            i.setState({modalVisit: !0})
          }, i.remove = function (v) {
            var w = i.state, D = w.panes, A = w.activeKey, E = A, c;
            D.forEach(function (h, S) {
              h.key === v && (c = S - 1)
            });
            var z = D.filter(function (h) {
              return h.key !== v
            });
            z.length && E === v && (c >= 0 ? E = z[c].key : E = z[0].key), i.setState({panes: z, activeKey: E})
          }, i
        }

        return (0, p.Z)(Z, [{
          key: "componentDidMount", value: function () {
            var f = this;
            console.log(this.props, "==="), F().subscribe("editor", function (m, C) {
              f.setState(C)
            }), F().subscribe("newFile", function (m, C) {
              console.log(C), f.setState({
                panes: [].concat((0, s.Z)(f.state.panes), [{
                  title: C.filename,
                  content: C.content,
                  key: String(f.state.panes.length - 1),
                  closable: !0,
                  lang: "python"
                }])
              })
            }), F().subscribe("ws", function (m, C) {
              C.ws != f.ws.current && (f.ws.current = C.ws, C.ws === 1 && f.runcode())
            }), window.onresize = function () {
              document.fullscreenElement ? f.setState({isFullScreen: !0}) : f.setState({isFullScreen: !1})
            }
          }
        }, {
          key: "render", value: function () {
            var f = this, m = this.state, C = m.id, v = m.disable, w = m.isFullScreen, D = m.modalVisit,
              A = (0, t.jsxs)(t.Fragment, {
                children: [(0, t.jsx)(y.Z, {
                  ghost: !0,
                  type: "primary",
                  disabled: v,
                  onClick: this.handeleRun,
                  icon: C ? (0, t.jsx)(je.Z, {}) : (0, t.jsx)(Ee.Z, {}),
                  children: C ? "Edit" : "Run"
                }), (0, t.jsx)(y.Z, {icon: (0, t.jsx)(be.Z, {})}), w ? (0, t.jsx)(y.Z, {
                  icon: (0, t.jsx)(Te.Z, {}),
                  onClick: this.exitFullScreen
                }) : (0, t.jsx)(y.Z, {icon: (0, t.jsx)(Pe.Z, {}), onClick: this.fullScreen})]
              }), E = this.state, c = E.panes, z = E.activeKey;
            return (0, t.jsxs)(t.Fragment, {
              children: [(0, t.jsxs)(Ve.Z, {
                title: (0, t.jsx)(j._H, {id: "pages.editor.newFile"}),
                visible: D,
                formRef: this.restFormRef,
                width: "500px",
                onVisibleChange: function (S) {
                  return f.setState({modalVisit: S})
                },
                submitter: {
                  searchConfig: {
                    submitText: (0, t.jsx)(j._H, {id: "pages.common.confirm"}),
                    resetText: (0, t.jsx)(j._H, {id: "pages.common.cancel"})
                  }, resetButtonProps: {
                    onClick: function () {
                      var S;
                      (S = f.restFormRef.current) === null || S === void 0 || S.resetFields(), f.setState({modalVisit: !1})
                    }
                  }
                },
                onFinish: function () {
                  var h = (0, Y.Z)(n().mark(function S(W) {
                    var L, U, $;
                    return n().wrap(function (g) {
                      for (; ;) switch (g.prev = g.next) {
                        case 0:
                          U = "".concat(c.length), $ = (0, s.Z)(c), $.push({
                            title: W.filename,
                            content: "",
                            key: U,
                            lang: W.lang,
                            closable: !0,
                            placeholder: (0, j.Kd)() == "zh-CN" ? "\u4EE3\u7801\u8F93\u5165\u533A" : "code goes here"
                          }), f.setState({
                            panes: $,
                            activeKey: U,
                            modalVisit: !1
                          }), (L = f.restFormRef.current) === null || L === void 0 || L.resetFields();
                        case 5:
                        case"end":
                          return g.stop()
                      }
                    }, S)
                  }));
                  return function (S) {
                    return h.apply(this, arguments)
                  }
                }(),
                children: [(0, t.jsx)(Ae.Z, {
                  width: "md",
                  name: "filename",
                  label: (0, t.jsx)(j._H, {id: "pages.editor.filename"}),
                  placeholder: (0, j.Kd)() == "zh-CN" ? "\u8BF7\u8F93\u5165\u65B0\u5EFA\u7684\u6587\u4EF6\u540D" : "please input the filename"
                }), (0, t.jsx)(Me.Z, {
                  name: "lang",
                  label: (0, t.jsx)(j._H, {id: "pages.editor.lang"}),
                  valueEnum: {
                    python: "python",
                    java: "java",
                    c: "c",
                    "c++": "c++",
                    shell: "shell",
                    properties: "properties",
                    css: "css"
                  },
                  initialValue: this.state.panes[0].lang,
                  width: "sm",
                  placeholder: "Please select a programme language",
                  rules: [{required: !0, message: "Please select a programme language!"}]
                })]
              }), (0, t.jsx)(k.Z, {
                type: "editable-card",
                onChange: this.onChange,
                activeKey: z,
                onEdit: this.onEdit,
                tabBarExtraContent: A,
                children: c.map(function (h) {
                  return (0, t.jsx)(Oe, {
                    tab: h.title,
                    closable: h.closable,
                    children: (0, t.jsx)("div", {
                      ref: f.rootRef,
                      children: (0, t.jsx)(K.fk, {
                        className: "editor",
                        value: h.content,
                        options: {
                          mode: h.lang,
                          theme: "darcula",
                          autofocus: !0,
                          styleActiveLine: !0,
                          lineNumbers: !0,
                          smartIndent: !0,
                          lineWrapping: !0,
                          foldGutter: !0,
                          placeholder: h.placeholder,
                          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                          matchBrackets: !0,
                          autoCloseBrackets: !0,
                          fullScreen: w,
                          scrollbarStyle: "simple",
                          cursorScrollMargin: 5,
                          extraKeys: {
                            Ctrl: "autocomplete", "Ctrl-S": function (W) {
                              W.codeSave(W)
                            }, "Ctrl-Z": function (W) {
                              W.undo()
                            }, F8: function (W) {
                              W.redo()
                            }
                          }
                        },
                        onBeforeChange: function (W, L, U) {
                          var $ = c;
                          $[parseInt(h.key)].content = U, f.setState({panes: (0, s.Z)($)})
                        }
                      })
                    })
                  }, h.key)
                })
              })]
            })
          }
        }]), Z
      }(r.Component), Ye = e(6700), Ke = e(93488), Be = e(57551), Cr = e(43358), me = e(34041), Sr = e(31149),
      ie = e(57895), He = me.Z.Option;

    function Ne() {
      var R = (0, r.useState)(""), I = (0, O.Z)(R, 2), Z = I[0], i = I[1], f = (0, r.useState)(""), m = (0, O.Z)(f, 2),
        C = m[0], v = m[1], w = (0, r.useState)(0), D = (0, O.Z)(w, 2), A = D[0], E = D[1], c = (0, r.useRef)(null),
        z = (0, r.useRef)(null), h = (0, r.useRef)(""), S = (0, r.useRef)("");
      (0, r.useEffect)(function () {
        F().subscribe("id", function (g, l) {
          i(l.id)
        })
      }), (0, r.useEffect)(function () {
        if (Z) v(""), F().publish("showRes", {error_code: 0}), c.current = new WebSocket("ws://47.111.13.213:8001/V1/editor/".concat(Z, "/")), c.current.onopen = function (l) {
          F().publish("ws", {ws: 1})
        }, c.current.onerror = function (l) {
          c.current = null, F().publish("ws", {ws: null}), F().publish("id", {id: ""}), J.default.error("Something wrong happens. Please try again later")
        }, c.current.onclose = function (l) {
          c.current = null, F().publish("ws", {ws: null}), F().publish("id", {id: ""})
        }, c.current.onmessage = function (l) {
          var u = JSON.parse(l.data);
          if (u.message == "output") {
            var b = h.current + u.data;
            h.current = b, v(b), S.current = b
          } else u.message == "result" ? (F().publish("showRes", {
            error_code: 200,
            output: u.data
          }), F().publish("editor", {id: ""}), i("")) : u.message == "warning" ? (F().publish("showRes", {
            error_code: 410,
            output: u.data
          }), F().publish("editor", {id: ""}), i("")) : u.message == "error" ? (F().publish("showRes", {
            error_code: 500,
            output: u.data
          }), F().publish("editor", {id: ""}), i("")) : u.message == "pic" ? F().publish("showPic", {url: u.data}) : u.message == "file" && F().publish("newFile", {
            filename: u.filename,
            content: u.data
          })
        }; else {
          var g;
          (g = c.current) === null || g === void 0 || g.close(), F().publish("ws", {ws: null}), c.current = null, h.current = "", S.current = "", E(0)
        }
      }, [Z]);
      var W = function (l, u, b) {
        (u.origin === "setValue" || typeof u.origin == "undefined") && (l.focus(), l.execCommand("goDocEnd"), E(l.lastLine()))
      }, L = function (l) {
        l.getCursor().line < A && l.execCommand("goDocEnd")
      }, U = function (l, u) {
        if (u === "Enter") {
          var b = h.current.replace(S.current, "");
          S.current = h.current, c.current.send(b)
        }
      }, $ = (0, t.jsx)(t.Fragment, {
        children: (0, t.jsx)(me.Z, {
          className: "selectMode",
          defaultValue: "Interactive",
          style: {width: 180},
          children: (0, t.jsx)(He, {value: "Interactive", children: (0, t.jsx)(j._H, {id: "pages.editor.terminal"})})
        })
      }), _ = {
        mode: "shell",
        readOnly: Z ? !1 : "nocursor",
        theme: "darcula",
        cursorScrollMargin: 5,
        smartIndent: !1,
        scrollbarStyle: "simple",
        placeholder: (0, j.Kd)() == "zh-CN" ? "\u83B7\u53D6\u952E\u76D8\u8F93\u5165..." : "input goes here",
        autofocus: C,
        lineNumbers: !0,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
      };
      return (0, t.jsx)(ie.ZP, {
        title: "Input / Output / Terminal",
        ghost: !0,
        extra: $,
        children: (0, t.jsx)(K.fk, {
          ref: z,
          className: "input",
          value: C,
          options: _,
          onBeforeChange: function (l, u, b) {
            v(b), h.current = b
          },
          onCursorActivity: function (l) {
            L(l)
          },
          onChange: function (l, u, b) {
            W(l, u, b)
          },
          onFocus: function (l) {
            l.scrollIntoView()
          },
          onKeyHandled: function (l, u) {
            U(l, u)
          }
        })
      })
    }

    var Zr = e(57338), ze = e(25084), wr = e(12968), Ue = e(84737), jr = e(17462), Le = e(76772), Er = e(49111),
      ge = e(19650), br = e(71194), Ge = e(50146), Tr = e(7359), ye = e(27279), Pr = e(47673), Qe = e(4107),
      Je = e(30381), xe = e.n(Je), Ce = e(49657), fe = Qe.Z.TextArea, Se = ye.Z.Panel;

    function Xe(R) {
      var I = (0, r.useState)(""), Z = (0, O.Z)(I, 2), i = Z[0], f = Z[1], m = (0, r.useState)(""), C = (0, O.Z)(m, 2),
        v = C[0], w = C[1], D = (0, r.useState)("info"), A = (0, O.Z)(D, 2), E = A[0], c = A[1],
        z = (0, r.useState)(!1), h = (0, O.Z)(z, 2), S = h[0], W = h[1], L = (0, r.useState)([]), U = (0, O.Z)(L, 2),
        $ = U[0], _ = U[1], g = (0, r.useState)(!1), l = (0, O.Z)(g, 2), u = l[0], b = l[1];
      (0, r.useEffect)(function () {
        console.log(R, 8888), PubSub.subscribe("showRes", function (M, V) {
          var H = V.output;
          V.error_code == 200 ? (c("success"), X()) : V.error_code == 410 || V.error_code == 408 ? c("warning") : V.error_code == 500 ? c("error") : c("info"), w(H)
        }), PubSub.subscribe("showPic", function (M, V) {
          var H = {url: V.url, key: $.length};
          _([].concat((0, s.Z)($), [H])), b(!0)
        }), PubSub.subscribe("id", function (M, V) {
          V.id != i && f(V.id)
        })
      }), (0, r.useEffect)(function () {
        i && $.length > 0 && B($)
      }, [i]);
      var N = function () {
        W(!0)
      }, q = function () {
        W(!1)
      }, B = function () {
        var M = (0, Y.Z)(n().mark(function V(H) {
          return n().wrap(function (ee) {
            for (; ;) switch (ee.prev = ee.next) {
              case 0:
                return console.log(H), b(!1), ee.next = 4, Fe(H[0].url.substring(0, H[0].url.lastIndexOf("\\")));
              case 4:
                _([]);
              case 5:
              case"end":
                return ee.stop()
            }
          }, V)
        }));
        return function (H) {
          return M.apply(this, arguments)
        }
      }(), X = function () {
        var M = (0, Y.Z)(n().mark(function V() {
          var H, he, ee;
          return n().wrap(function (oe) {
            for (; ;) switch (oe.prev = oe.next) {
              case 0:
                return H = R.id, he = R.related_topic, oe.next = 3, (0, Ce.QB)({
                  topic: he,
                  course_id: H,
                  last_practice_time: xe()().format("YYYY-MM-DD HH:mm:ss")
                });
              case 3:
                ee = oe.sent, console.log(ee, 4444);
              case 5:
              case"end":
                return oe.stop()
            }
          }, V)
        }));
        return function () {
          return M.apply(this, arguments)
        }
      }();
      return (0, t.jsxs)(t.Fragment, {
        children: [(0, t.jsxs)(ye.Z, {
          bordered: !1,
          ghost: !0,
          className: "reshint",
          defaultActiveKey: ["2"],
          children: [(0, t.jsx)(Se, {
            header: (0, t.jsx)(j._H, {id: "pages.editor.showHints"}),
            children: (0, t.jsx)("div", {children: R.hint})
          }, "1"), (0, t.jsx)(Se, {
            header: (0, t.jsx)(j._H, {id: "pages.editor.result"}),
            className: E,
            extra: (0, t.jsxs)(ge.Z, {
              children: [(0, t.jsxs)(y.Z, {
                size: "small",
                type: "ghost",
                onClick: N,
                children: [" ", (0, t.jsx)(j._H, {id: "pages.editor.detail"})]
              }), (0, t.jsx)(Ge.Z, {
                visible: S,
                title: E,
                onCancel: q,
                width: 800,
                footer: "",
                children: (0, t.jsx)(fe, {
                  value: E == "info" ? (0, j.Kd)() == "zh-CN" ? "--- \u7ED3\u679C\u5C06\u4F1A\u663E\u793A\u5728\u8FD9\u91CC ---" : "--- Results will be shown here ---" : v ? (0, t.jsx)(fe, {
                    value: v,
                    autoSize: !0,
                    bordered: !1,
                    status: "error"
                  }) : "", autoSize: !0, bordered: !1, status: "error"
                })
              })]
            }),
            children: (0, t.jsx)(Le.Z, {
              message: E,
              description: E == "info" ? (0, j.Kd)() == "zh-CN" ? "--- \u7ED3\u679C\u5C06\u4F1A\u663E\u793A\u5728\u8FD9\u91CC ---" : "--- Results will be shown here ---" : v ? (0, t.jsx)(fe, {
                value: v,
                autoSize: !0,
                bordered: !1,
                status: "error"
              }) : "",
              type: E,
              showIcon: !0
            })
          }, "2")]
        }), (0, t.jsx)("div", {
          className: "site-drawer-render-in-current-wrapper",
          children: (0, t.jsx)(ze.Z, {
            placement: "right",
            onClose: function () {
              return B($)
            },
            onCancel: function () {
              return B($)
            },
            visible: u,
            getContainer: !1,
            style: {position: "absolute"},
            children: (0, t.jsx)(ge.Z, {
              direction: "vertical",
              size: "middle",
              style: {display: "flex"},
              children: $.map(function (M, V, H) {
                return (0, t.jsx)(Ue.Z, {src: "/server/".concat($.length > 0 ? M.url : ""), width: "290px"})
              })
            })
          })
        })]
      })
    }

    var ke = e(65278), Ze = e(11021), _e = e(72757), qe = e(5234), er = e.n(qe), rr = se.Z.Title;

    function tr(R) {
      var I = this, Z = (0, r.useState)([]), i = (0, O.Z)(Z, 2), f = i[0], m = i[1], C = (0, r.useState)(""),
        v = (0, O.Z)(C, 2), w = v[0], D = v[1], A = (0, r.useState)({}), E = (0, O.Z)(A, 2), c = E[0], z = E[1],
        h = (0, j.tT)("@@initialState"), S = h.initialState, W = h.setInitialState;
      (0, r.useEffect)(function () {
        L(), U()
      }, []);
      var L = function () {
        var g = (0, Y.Z)(n().mark(function l() {
          var u, b, N, q, B;
          return n().wrap(function (M) {
            for (; ;) switch (M.prev = M.next) {
              case 0:
                return u = R.match.params, b = u.id, N = u.related_topic, M.next = 3, (0, Ze.G$)(N);
              case 3:
                q = M.sent, B = q.course_list, B = B.map(function (V) {
                  var H = V.fields;
                  return H.id = V.pk, H
                }), m(B), D(N), $(N, b);
              case 9:
              case"end":
                return M.stop()
            }
          }, l)
        }));
        return function () {
          return g.apply(this, arguments)
        }
      }(), U = function () {
        var g = (0, Y.Z)(n().mark(function l() {
          var u, b, N, q;
          return n().wrap(function (X) {
            for (; ;) switch (X.prev = X.next) {
              case 0:
                return u = R.match.params, b = u.id, N = u.related_topic, X.next = 3, (0, Ce.PB)({
                  topic: N,
                  course_id: b,
                  last_practice_time: xe()().format("YYYY-MM-DD HH:mm:ss")
                });
              case 3:
                q = X.sent;
              case 4:
              case"end":
                return X.stop()
            }
          }, l)
        }));
        return function () {
          return g.apply(this, arguments)
        }
      }(), $ = function () {
        var g = (0, Y.Z)(n().mark(function l(u, b) {
          var N;
          return n().wrap(function (B) {
            for (; ;) switch (B.prev = B.next) {
              case 0:
                return R.history.push("".concat(b)), B.next = 3, (0, Ze.Sp)(u, b);
              case 3:
                N = B.sent, N.error_code == 200 ? z(N.data) : J.default.error(N.msg);
              case 5:
              case"end":
                return B.stop()
            }
          }, l)
        }));
        return function (u, b) {
          return g.apply(this, arguments)
        }
      }(), _ = (0, t.jsx)(te.Z, {
        onClick: function (l) {
          var u = l.key;
          return $(w, +u)
        }, children: typeof f == "object" ? f.map(function (g) {
          return (0, t.jsx)(te.Z.Item, {children: (0, t.jsx)("a", {target: "_blank", children: g.title})}, g.id)
        }) : []
      });
      return (0, t.jsx)(ke.ZP, {
        overlayClassName: "editorpage",
        ghost: !0,
        minHeight: "800px",
        header: {title: (0, t.jsx)(rr, {children: c.title}), breadcrumb: {}},
        content: (0, t.jsxs)(Q.Z, {
          size: "middle",
          column: 3,
          children: [(0, t.jsx)(Q.Z.Item, {
            label: (0, t.jsx)(j._H, {id: "pages.common.relatedTopic"}),
            children: w
          }), (0, t.jsx)(Q.Z.Item, {
            label: (0, t.jsx)(j._H, {id: "pages.common.updateDate"}),
            children: c.update_date
          }), (0, t.jsx)(Q.Z.Item, {
            label: (0, t.jsx)(j._H, {id: "pages.common.views"}),
            children: (0, t.jsx)("a", {children: c.views})
          })]
        }),
        extra: [(0, t.jsxs)(y.Z, {
          onClick: function () {
            return $(w, c.id - 1)
          }, disabled: c.id - 1 < 1, children: [(0, t.jsx)(Ye.Z, {}), " ", (0, t.jsx)(j._H, {id: "pages.editor.last"})]
        }, "3"), (0, t.jsxs)(y.Z, {
          onClick: function () {
            return $(w, c.id + 1)
          },
          disabled: c.id + 1 > f.length,
          children: [" ", (0, t.jsx)(j._H, {id: "pages.editor.next"}), (0, t.jsx)(Ke.Z, {})]
        }, "2"), (0, t.jsx)(ne.Z, {
          overlay: _,
          children: (0, t.jsx)("a", {
            className: "ant-dropdown-link", onClick: function (l) {
              return l.preventDefault()
            }, children: (0, t.jsx)(y.Z, {children: (0, t.jsx)(Be.Z, {})})
          })
        }, "1")],
        children: (0, t.jsxs)(ie.ZP, {
          ghost: !0,
          gutter: 15,
          style: {minHeight: 1e3},
          className: "custom-dark",
          children: [(0, t.jsx)(ie.ZP, {
            colSpan: 7,
            style: {minHeight: 600},
            className: "course",
            ghost: !0,
            children: (0, t.jsx)(_e.CKEditor, {
              editor: er(),
              disabled: !0,
              data: c.content,
              config: {toolbar: {items: []}},
              onError: function (l) {
                var u = l.willEditorRestart;
                u && I.editor.ui.view.toolbar.element.remove()
              }
            })
          }), (0, t.jsxs)(ie.ZP, {
            ghost: !0,
            colSpan: 11,
            children: [(0, t.jsx)(We, {currentUser: S.currentUser, courseid: R.match.params.id}), (0, t.jsx)(Ne, {})]
          }), (0, t.jsx)(ie.ZP, {
            ghost: !0,
            colSpan: 6,
            children: (0, t.jsx)(Xe, {
              hint: c == null ? void 0 : c.hint,
              related_topic: R.match.params.related_topic,
              id: R.match.params.id
            })
          })]
        })
      })
    }
  }, 11021: function (pe, re, e) {
    "use strict";
    e.d(re, {
      D0: function () {
        return le
      }, wA: function () {
        return Q
      }, tu: function () {
        return ue
      }, rq: function () {
        return te
      }, xH: function () {
        return de
      }, G$: function () {
        return J
      }, Sp: function () {
        return Y
      }, A: function () {
        return O
      }, BK: function () {
        return ce
      }, BW: function () {
        return se
      }, EI: function () {
        return P
      }
    });
    var T = e(3182), ne = e(94043), o = e.n(ne), y = e(21010), le = function () {
      var n = (0, T.Z)(o().mark(function r(s) {
        var a;
        return o().wrap(function (x) {
          for (; ;) switch (x.prev = x.next) {
            case 0:
              return a = "/server/V1/course/topicsByTeacher/?teacher_id=".concat(s), x.abrupt("return", (0, y.WY)(a));
            case 2:
            case"end":
              return x.stop()
          }
        }, r)
      }));
      return function (s) {
        return n.apply(this, arguments)
      }
    }(), Q = function () {
      var n = (0, T.Z)(o().mark(function r(s, a) {
        var p;
        return o().wrap(function (d) {
          for (; ;) switch (d.prev = d.next) {
            case 0:
              return p = "/server/V1/course/edit/", d.abrupt("return", (0, y.WY)(p, {
                method: "post",
                data: {request_entity: "Topic", content: {topic_id: s, topic_info: a}}
              }));
            case 2:
            case"end":
              return d.stop()
          }
        }, r)
      }));
      return function (s, a) {
        return n.apply(this, arguments)
      }
    }(), ue = function () {
      var n = (0, T.Z)(o().mark(function r(s, a, p, x, d, G, k) {
        var K;
        return o().wrap(function (ae) {
          for (; ;) switch (ae.prev = ae.next) {
            case 0:
              return K = "/server/V1/course/edit/", ae.abrupt("return", (0, y.WY)(K, {
                method: "post",
                data: {
                  request_entity: "Course",
                  content: {id: s, related_topic: a, title: p, content: x, answer: d, hint: G, teacher_id: k}
                }
              }));
            case 2:
            case"end":
              return ae.stop()
          }
        }, r)
      }));
      return function (s, a, p, x, d, G, k) {
        return n.apply(this, arguments)
      }
    }(), te = function () {
      var n = (0, T.Z)(o().mark(function r(s, a, p, x, d) {
        var G;
        return o().wrap(function (K) {
          for (; ;) switch (K.prev = K.next) {
            case 0:
              return G = "/server/V1/course/create/", K.abrupt("return", (0, y.WY)(G, {
                method: "post",
                data: {
                  request_entity: "Topic",
                  content: {topic_title: s, topic_content: a, topic_description: p, topic_img: x, teacher_id: d}
                }
              }));
            case 2:
            case"end":
              return K.stop()
          }
        }, r)
      }));
      return function (s, a, p, x, d) {
        return n.apply(this, arguments)
      }
    }(), de = function () {
      var n = (0, T.Z)(o().mark(function r(s, a, p, x, d) {
        var G;
        return o().wrap(function (K) {
          for (; ;) switch (K.prev = K.next) {
            case 0:
              return G = "/server/V1/course/create/", K.abrupt("return", (0, y.WY)(G, {
                method: "post",
                data: {request_entity: "Course", content: {related_topic: s, title: a, content: p, answer: x, hint: d}}
              }));
            case 2:
            case"end":
              return K.stop()
          }
        }, r)
      }));
      return function (s, a, p, x, d) {
        return n.apply(this, arguments)
      }
    }(), J = function () {
      var n = (0, T.Z)(o().mark(function r(s) {
        var a;
        return o().wrap(function (x) {
          for (; ;) switch (x.prev = x.next) {
            case 0:
              return a = "/server/V1/course/courses/".concat(s, "/"), x.abrupt("return", (0, y.WY)(a));
            case 2:
            case"end":
              return x.stop()
          }
        }, r)
      }));
      return function (s) {
        return n.apply(this, arguments)
      }
    }(), Y = function () {
      var n = (0, T.Z)(o().mark(function r(s, a) {
        var p;
        return o().wrap(function (d) {
          for (; ;) switch (d.prev = d.next) {
            case 0:
              return p = "/server/V1/course/courseDetail/".concat(s, "/").concat(a, "/"), d.abrupt("return", (0, y.WY)(p));
            case 2:
            case"end":
              return d.stop()
          }
        }, r)
      }));
      return function (s, a) {
        return n.apply(this, arguments)
      }
    }(), O = function () {
      var n = (0, T.Z)(o().mark(function r(s, a) {
        var p;
        return o().wrap(function (d) {
          for (; ;) switch (d.prev = d.next) {
            case 0:
              return p = "/server/V1/course/delete/", d.abrupt("return", (0, y.WY)(p, {
                method: "post",
                data: {request_entity: "Course", related_topic: s, content: a}
              }));
            case 2:
            case"end":
              return d.stop()
          }
        }, r)
      }));
      return function (s, a) {
        return n.apply(this, arguments)
      }
    }(), ce = function () {
      var n = (0, T.Z)(o().mark(function r(s) {
        var a;
        return o().wrap(function (x) {
          for (; ;) switch (x.prev = x.next) {
            case 0:
              return a = "/server/V1/course/delete/", x.abrupt("return", (0, y.WY)(a, {
                method: "post",
                data: {request_entity: "Topic", content: s}
              }));
            case 2:
            case"end":
              return x.stop()
          }
        }, r)
      }));
      return function (s) {
        return n.apply(this, arguments)
      }
    }(), se = function () {
      var n = (0, T.Z)(o().mark(function r(s, a) {
        var p;
        return o().wrap(function (d) {
          for (; ;) switch (d.prev = d.next) {
            case 0:
              return p = "/server/V1/course/sort/", d.abrupt("return", (0, y.WY)(p, {
                method: "post",
                data: {request_entity: "Course", related_topic: s, content: a}
              }));
            case 2:
            case"end":
              return d.stop()
          }
        }, r)
      }));
      return function (s, a) {
        return n.apply(this, arguments)
      }
    }(), P = function () {
      var n = (0, T.Z)(o().mark(function r(s, a) {
        var p;
        return o().wrap(function (d) {
          for (; ;) switch (d.prev = d.next) {
            case 0:
              return p = "/server/V1/course/delete_img/", d.abrupt("return", (0, y.WY)(p, {
                method: "post",
                data: {request_entity: a, fname: s}
              }));
            case 2:
            case"end":
              return d.stop()
          }
        }, r)
      }));
      return function (s, a) {
        return n.apply(this, arguments)
      }
    }()
  }, 49657: function (pe, re, e) {
    "use strict";
    e.d(re, {
      BN: function () {
        return le
      }, XQ: function () {
        return Q
      }, yC: function () {
        return ue
      }, UE: function () {
        return te
      }, QB: function () {
        return J
      }, PB: function () {
        return Y
      }, ei: function () {
        return O
      }, G7: function () {
        return ce
      }, P4: function () {
        return se
      }
    });
    var T = e(3182), ne = e(94043), o = e.n(ne), y = e(21010), le = function () {
      var P = (0, T.Z)(o().mark(function n() {
        return o().wrap(function (s) {
          for (; ;) switch (s.prev = s.next) {
            case 0:
              return s.abrupt("return", (0, y.WY)("/server/V1/course/topic/6", {method: "GET"}));
            case 1:
            case"end":
              return s.stop()
          }
        }, n)
      }));
      return function () {
        return P.apply(this, arguments)
      }
    }(), Q = function () {
      var P = (0, T.Z)(o().mark(function n() {
        return o().wrap(function (s) {
          for (; ;) switch (s.prev = s.next) {
            case 0:
              return s.abrupt("return", (0, y.WY)("/server/V1/course/topic/all", {method: "GET"}));
            case 1:
            case"end":
              return s.stop()
          }
        }, n)
      }));
      return function () {
        return P.apply(this, arguments)
      }
    }(), ue = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        var s;
        return o().wrap(function (p) {
          for (; ;) switch (p.prev = p.next) {
            case 0:
              return s = "/server/V1/course/search/".concat(r), p.abrupt("return", (0, y.WY)(s));
            case 2:
            case"end":
              return p.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }(), te = function () {
      var P = (0, T.Z)(o().mark(function n() {
        return o().wrap(function (s) {
          for (; ;) switch (s.prev = s.next) {
            case 0:
              return s.abrupt("return", (0, y.WY)("/server/V1/course/newtopic/", {method: "GET"}));
            case 1:
            case"end":
              return s.stop()
          }
        }, n)
      }));
      return function () {
        return P.apply(this, arguments)
      }
    }(), de = null, J = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        return o().wrap(function (a) {
          for (; ;) switch (a.prev = a.next) {
            case 0:
              return console.log(r), a.abrupt("return", (0, y.WY)("/server/V1/course/add_user_progress/", {
                method: "POST",
                data: r,
                headers: {
                  Token: localStorage.getItem("token"),
                  currentAuthority: localStorage.getItem("currentAuthority")
                }
              }));
            case 2:
            case"end":
              return a.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }(), Y = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        return o().wrap(function (a) {
          for (; ;) switch (a.prev = a.next) {
            case 0:
              return console.log(r), a.abrupt("return", (0, y.WY)("/server/V1/course/change_user_progress/", {
                method: "POST",
                data: r,
                headers: {
                  Token: localStorage.getItem("token"),
                  currentAuthority: localStorage.getItem("currentAuthority")
                }
              }));
            case 2:
            case"end":
              return a.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }(), O = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        return o().wrap(function (a) {
          for (; ;) switch (a.prev = a.next) {
            case 0:
              return console.log(r), a.abrupt("return", (0, y.WY)("/server/V1/course/remove_user_progress/", {
                method: "POST",
                data: r,
                headers: {
                  Token: localStorage.getItem("token"),
                  currentAuthority: localStorage.getItem("currentAuthority")
                }
              }));
            case 2:
            case"end":
              return a.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }(), ce = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        return o().wrap(function (a) {
          for (; ;) switch (a.prev = a.next) {
            case 0:
              return console.log(r), a.abrupt("return", (0, y.WY)("/server/V1/course/add_user_collection/", {
                method: "POST",
                data: r,
                headers: {
                  Token: localStorage.getItem("token"),
                  currentAuthority: localStorage.getItem("currentAuthority")
                }
              }));
            case 2:
            case"end":
              return a.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }(), se = function () {
      var P = (0, T.Z)(o().mark(function n(r) {
        return o().wrap(function (a) {
          for (; ;) switch (a.prev = a.next) {
            case 0:
              return console.log(r), a.abrupt("return", (0, y.WY)("/server/V1/course/delete_user_collection/", {
                method: "POST",
                data: r,
                headers: {
                  Token: localStorage.getItem("token"),
                  currentAuthority: localStorage.getItem("currentAuthority")
                }
              }));
            case 2:
            case"end":
              return a.stop()
          }
        }, n)
      }));
      return function (r) {
        return P.apply(this, arguments)
      }
    }()
  }
}]);
