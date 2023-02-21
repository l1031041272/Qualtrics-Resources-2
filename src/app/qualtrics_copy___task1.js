var items = {
    'issue1' : {name_JA: '${e://Field/issue1_name}', img_url: '${e://Field/issue1_img}'},
    'issue2' : {name_JA: '${e://Field/issue2_name}', img_url: '${e://Field/issue2_img}'},
    'issue3' : {name_JA: '${e://Field/issue3_name}', img_url: '${e://Field/issue3_img}'},
    'issue4' : {name_JA: '${e://Field/issue4_name}', img_url: '${e://Field/issue4_img}'}
};



Qualtrics.SurveyEngine.addOnload(function() /*ページが読み込まれたときに実行するJavaScriptをここに配置してください*/
{
    jQuery(".QuestionBody").css({width: '1200px ' });
    jQuery("#"+this.questionId+"Separator.Separator").css({margin: '0px ' ,height: '0px',border:'0px'});

    this.questionclick = function(event,element)
    {
        console.log("Element="+element);
        if (element.type == 'button') {
            // stopTimer();
            //this.enableNextButton();
            // this.setChoiceValue(1, valence1_text);
            // this.setChoiceValue(2, valence2_text);
            // this.setChoiceValue(3, valence3_text);
            // this.setChoiceValue(4, valence4_text);
            // this.setChoiceValue(5, valence5_text);
            // this.setChoiceValue(6, valence6_text);
            // this.setChoiceValue(7, valence7_text);
            // this.setChoiceValue(8, valence8_text);
        }
    };

    this.hideNextButton();


    /**
     * @license jCanvas v21.0.1F
     * Copyright 2017 Caleb Evans
     * Released under the MIT license
     */

    !function (a, b, c) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? module.exports = function (a, b) { return c(a, b) } : c(a, b) }("undefined" != typeof window ? window.jQuery : {}, "undefined" != typeof window ? window : this, function (a, b) {
        "use strict"; function c(a) { var b, c = this; for (b in a) Object.prototype.hasOwnProperty.call(a, b) && (c[b] = a[b]); return c } function d() { ra(this, d.baseDefaults) } function e(a) { return "string" === ta(a) } function f(a) { return "function" === ta(a) } function g(a) { return !isNaN(pa(a)) && !isNaN(qa(a)) } function h(a) { return a && a.getContext ? a.getContext("2d") : null } function i(a) { var b, c; for (b in a) Object.prototype.hasOwnProperty.call(a, b) && (c = a[b], "string" === ta(c) && g(c) && "text" !== b && (a[b] = qa(c))); void 0 !== a.text && (a.text = String(a.text)) } function j(a) { return a = ra({}, a), a.masks = a.masks.slice(0), a } function k(a, b) { var c; a.save(), c = j(b.transforms), b.savedTransforms.push(c) } function l(a, b) { 0 === b.savedTransforms.length ? b.transforms = j(Fa) : (a.restore(), b.transforms = b.savedTransforms.pop()) } function m(a, b, c, d) { c[d] && (f(c[d]) ? b[d] = c[d].call(a, c) : b[d] = c[d]) } function n(a, b, c) { m(a, b, c, "fillStyle"), m(a, b, c, "strokeStyle"), b.lineWidth = c.strokeWidth, c.rounded ? b.lineCap = b.lineJoin = "round" : (b.lineCap = c.strokeCap, b.lineJoin = c.strokeJoin, b.miterLimit = c.miterLimit), c.strokeDash || (c.strokeDash = []), b.setLineDash && b.setLineDash(c.strokeDash), b.webkitLineDash = c.strokeDash, b.lineDashOffset = b.webkitLineDashOffset = b.mozDashOffset = c.strokeDashOffset, b.shadowOffsetX = c.shadowX, b.shadowOffsetY = c.shadowY, b.shadowBlur = c.shadowBlur, b.shadowColor = c.shadowColor, b.globalAlpha = c.opacity, b.globalCompositeOperation = c.compositing, c.imageSmoothing && (b.imageSmoothingEnabled = c.imageSmoothing) } function o(a, b, c) { c.mask && (c.autosave && k(a, b), a.clip(), b.transforms.masks.push(c._args)) } function p(a, b) { b._transformed && a.restore() } function q(a, b, c) { var d; c.closed && b.closePath(), c.shadowStroke && 0 !== c.strokeWidth ? (b.stroke(), b.fill(), b.shadowColor = "transparent", b.shadowBlur = 0, b.stroke()) : (b.fill(), "transparent" !== c.fillStyle && (b.shadowColor = "transparent"), 0 !== c.strokeWidth && b.stroke()), c.closed || b.closePath(), p(b, c), c.mask && (d = s(a), o(b, d, c)) } function r(a, b, c, d, e) { c._toRad = c.inDegrees ? va / 180 : 1, c._transformed = !0, b.save(), c.fromCenter || c._centered || void 0 === d || (void 0 === e && (e = d), c.x += d / 2, c.y += e / 2, c._centered = !0), c.rotate && S(b, c, null), 1 === c.scale && 1 === c.scaleX && 1 === c.scaleY || T(b, c, null), (c.translate || c.translateX || c.translateY) && U(b, c, null) } function s(b) { var c, d = Ea.dataCache; return d._canvas === b && d._data ? c = d._data : (c = a.data(b, "jCanvas"), c || (c = { canvas: b, layers: [], layer: { names: {}, groups: {} }, eventHooks: {}, intersecting: [], lastIntersected: null, cursor: a(b).css("cursor"), drag: { layer: null, dragging: !1 }, event: { type: null, x: null, y: null }, events: {}, transforms: j(Fa), savedTransforms: [], animating: !1, animated: null, pixelRatio: 1, scaled: !1, redrawOnMousemove: !1 }, a.data(b, "jCanvas", c)), d._canvas = b, d._data = c), c } function t(a, b, c) { var d; for (d in Ia.events) Object.prototype.hasOwnProperty.call(Ia.events, d) && (c[d] || c.cursors && c.cursors[d]) && v(a, b, c, d); b.events.mouseout || (a.bind("mouseout.jCanvas", function () { var c, d = b.drag.layer; for (d && (b.drag = {}, G(a, b, d, "dragcancel")), c = 0; c < b.layers.length; c += 1)d = b.layers[c], d._hovered && a.triggerLayerEvent(b.layers[c], "mouseout"); a.drawLayers() }), b.events.mouseout = !0) } function u(a, b, c, d) { Ia.events[d](a, b), c._event = !0 } function v(a, b, c, d) { u(a, b, c, d), "mouseover" !== d && "mouseout" !== d && "mousemove" !== d || (b.redrawOnMousemove = !0) } function w(a, b, c) { var d, e, f; if (c.draggable || c.cursors) { for (d = ["mousedown", "mousemove", "mouseup"], f = 0; f < d.length; f += 1)e = d[f], u(a, b, c, e); c._event = !0 } } function x(a, b, c, d) { var f = b.layer.names; d ? void 0 !== d.name && e(c.name) && c.name !== d.name && delete f[c.name] : d = c, e(d.name) && (f[d.name] = c) } function y(a, b, c, d) { var e, f, g, h, i, j = b.layer.groups; if (d) { if (void 0 !== d.groups && null !== c.groups) for (g = 0; g < c.groups.length; g += 1)if (f = c.groups[g], e = j[f]) { for (i = 0; i < e.length; i += 1)if (e[i] === c) { h = i, e.splice(i, 1); break } 0 === e.length && delete j[f] } } else d = c; if (void 0 !== d.groups && null !== d.groups) for (g = 0; g < d.groups.length; g += 1)f = d.groups[g], e = j[f], e || (e = j[f] = [], e.name = f), void 0 === h && (h = e.length), e.splice(h, 0, c) } function z(a) { var b, c, d, e; for (b = null, c = a.intersecting.length - 1; c >= 0; c -= 1)if (b = a.intersecting[c], b._masks) { for (e = b._masks.length - 1; e >= 0; e -= 1)if (d = b._masks[e], !d.intersects) { b.intersects = !1; break } if (b.intersects && !b.intangible) break } return b && b.intangible && (b = null), b } function A(a, b, c, d) { c && c.visible && c._method && (c._next = d || null, c._method && c._method.call(a, c)) } function B(a, b, c) { var d, e, f, g, h, i, j, k, l, m; if (g = b.drag, e = g.layer, h = e && e.dragGroups || [], d = b.layers, "mousemove" === c || "touchmove" === c) { if (g.dragging || (g.dragging = !0, e.dragging = !0, e.bringToFront && (d.splice(e.index, 1), e.index = d.push(e)), e._startX = e.x, e._startY = e.y, e._endX = e._eventX, e._endY = e._eventY, G(a, b, e, "dragstart")), g.dragging) for (l = e._eventX - (e._endX - e._startX), m = e._eventY - (e._endY - e._startY), e.updateDragX && (l = e.updateDragX.call(a[0], e, l)), e.updateDragY && (m = e.updateDragY.call(a[0], e, m)), e.dx = l - e.x, e.dy = m - e.y, "y" !== e.restrictDragToAxis && (e.x = l), "x" !== e.restrictDragToAxis && (e.y = m), G(a, b, e, "drag"), k = 0; k < h.length; k += 1)if (j = h[k], i = b.layer.groups[j], e.groups && i) for (f = 0; f < i.length; f += 1)i[f] !== e && ("y" !== e.restrictDragToAxis && "y" !== i[f].restrictDragToAxis && (i[f].x += e.dx), "x" !== e.restrictDragToAxis && "x" !== i[f].restrictDragToAxis && (i[f].y += e.dy)) } else "mouseup" !== c && "touchend" !== c || (g.dragging && (e.dragging = !1, g.dragging = !1, b.redrawOnMousemove = b.originalRedrawOnMousemove, G(a, b, e, "dragstop")), b.drag = {}) } function C(b, c, d) { var e; c.cursors && (e = c.cursors[d]), -1 !== a.inArray(e, Ga.cursors) && (e = Ga.prefix + e), e && b.css({ cursor: e }) } function D(a, b) { a.css({ cursor: b.cursor }) } function E(a, b, c, d, e) { d[c] && b._running && !b._running[c] && (b._running[c] = !0, d[c].call(a[0], b, e), b._running[c] = !1) } function F(b, c) { return !(b.disableEvents || b.intangible && -1 !== a.inArray(c, Ha)) } function G(a, b, c, d, e) { F(c, d) && ("mouseout" !== d && C(a, c, d), E(a, c, d, c, e), E(a, c, d, b.eventHooks, e), E(a, c, d, Ia.eventHooks, e)) } function H(b, d, f, g) { var h, j, k, l = d._layer ? f : d; return d._args = f, (d.draggable || d.dragGroups) && (d.layer = !0, d.draggable = !0), d._method || (g ? d._method = g : d.method ? d._method = a.fn[d.method] : d.type && (d._method = a.fn[Da.drawings[d.type]])), d.layer && !d._layer ? (h = a(b), j = s(b), k = j.layers, (null === l.name || e(l.name) && void 0 === j.layer.names[l.name]) && (i(d), l = new c(d), l.canvas = b, l.layer = !0, l._layer = !0, l._running = {}, null !== l.data ? l.data = ra({}, l.data) : l.data = {}, null !== l.groups ? l.groups = l.groups.slice(0) : l.groups = [], x(h, j, l), y(h, j, l), t(h, j, l), w(h, j, l), d._event = l._event, l._method === a.fn.drawText && h.measureText(l), null === l.index && (l.index = k.length), k.splice(l.index, 0, l), d._args = l, G(h, j, l, "add"))) : d.layer || i(d), l } function I(a) { var b, c; for (c = 0; c < Ga.props.length; c += 1)b = Ga.props[c], a[b] = a["_" + b] } function J(a, b) { var c, d; for (d = 0; d < Ga.props.length; d += 1)c = Ga.props[d], void 0 !== a[c] && (a["_" + c] = a[c], Ga.propsObj[c] = !0, b && delete a[c]) } function K(a, b, c) { var d, e, g, h; for (d in c) if (Object.prototype.hasOwnProperty.call(c, d) && (e = c[d], f(e) && (c[d] = e.call(a, b, d)), "object" === ta(e) && ua(e))) { for (g in e) Object.prototype.hasOwnProperty.call(e, g) && (h = e[g], void 0 !== b[d] && (b[d + "." + g] = b[d][g], c[d + "." + g] = h)); delete c[d] } return c } function L(a) { var b; for (b in a) Object.prototype.hasOwnProperty.call(a, b) && -1 !== b.indexOf(".") && delete a[b] } function M(b) { var c, d, e = [], f = 1; return "transparent" === b ? b = "rgba(0, 0, 0, 0)" : b.match(/^([a-z]+|#[0-9a-f]+)$/gi) && (d = ka.head, c = d.style.color, d.style.color = b, b = a.css(d, "color"), d.style.color = c), b.match(/^rgb/gi) && (e = b.match(/(\d+(\.\d+)?)/gi), b.match(/%/gi) && (f = 2.55), e[0] *= f, e[1] *= f, e[2] *= f, void 0 !== e[3] ? e[3] = qa(e[3]) : e[3] = 1), e } function N(a) { var b, c = 3; for ("array" !== ta(a.start) && (a.start = M(a.start), a.end = M(a.end)), a.now = [], 1 === a.start[3] && 1 === a.end[3] || (c = 4), b = 0; b < c; b += 1)a.now[b] = a.start[b] + (a.end[b] - a.start[b]) * a.pos, b < 3 && (a.now[b] = wa(a.now[b])); 1 !== a.start[3] || 1 !== a.end[3] ? a.now = "rgba(" + a.now.join(",") + ")" : (a.now.slice(0, 3), a.now = "rgb(" + a.now.join(",") + ")"), a.elem.nodeName ? a.elem.style[a.prop] = a.now : a.elem[a.prop] = a.now } function O(a) { return Da.touchEvents[a] && (a = Da.touchEvents[a]), a } function P(a) { return Da.mouseEvents[a] && (a = Da.mouseEvents[a]), a } function Q(a) { Ia.events[a] = function (b, c) { function d(a) { g.x = a.offsetX, g.y = a.offsetY, g.type = e, g.event = a, ("mousemove" !== a.type || c.redrawOnMousemove || c.drag.dragging) && b.drawLayers({ resetFire: !0 }), a.preventDefault() } var e, f, g; g = c.event, e = "mouseover" === a || "mouseout" === a ? "mousemove" : a, f = O(e), c.events[e] || (f !== e ? b.bind(e + ".jCanvas " + f + ".jCanvas", d) : b.bind(e + ".jCanvas", d), c.events[e] = !0) } } function R(a, b, c) { var d, e, f, g, h, i, j, k; (d = c._args) && (e = s(a), f = e.event, null !== f.x && null !== f.y && (i = f.x * e.pixelRatio, j = f.y * e.pixelRatio, g = b.isPointInPath(i, j) || b.isPointInStroke && b.isPointInStroke(i, j)), h = e.transforms, d.eventX = f.x, d.eventY = f.y, d.event = f.event, k = e.transforms.rotate, i = d.eventX, j = d.eventY, 0 !== k ? (d._eventX = i * za(-k) - j * ya(-k), d._eventY = j * za(-k) + i * ya(-k)) : (d._eventX = i, d._eventY = j), d._eventX /= h.scaleX, d._eventY /= h.scaleY, g && e.intersecting.push(d), d.intersects = Boolean(g)) } function S(a, b, c) { b._toRad = b.inDegrees ? va / 180 : 1, a.translate(b.x, b.y), a.rotate(b.rotate * b._toRad), a.translate(-b.x, -b.y), c && (c.rotate += b.rotate * b._toRad) } function T(a, b, c) { 1 !== b.scale && (b.scaleX = b.scaleY = b.scale), a.translate(b.x, b.y), a.scale(b.scaleX, b.scaleY), a.translate(-b.x, -b.y), c && (c.scaleX *= b.scaleX, c.scaleY *= b.scaleY) } function U(a, b, c) { b.translate && (b.translateX = b.translateY = b.translate), a.translate(b.translateX, b.translateY), c && (c.translateX += b.translateX, c.translateY += b.translateY) } function V(a) { for (; a < 0;)a += 2 * va; return a } function W(a, b) { return a.x + a.radius * za(b) } function X(a, b) { return a.y + a.radius * ya(b) } function Y(a, b, c, d) { var e, f, g, h, i, j, k, l, m, n, o; c === d ? (m = 0, n = 0) : (m = c.x, n = c.y), d.inDegrees || 360 !== d.end || (d.end = 2 * va), d.start *= c._toRad, d.end *= c._toRad, d.start -= va / 2, d.end -= va / 2, o = va / 180, d.ccw && (o *= -1), e = W(d, d.start + o), f = X(d, d.start + o), g = W(d, d.start), h = X(d, d.start), $(a, b, c, d, e, f, g, h), b.arc(d.x + m, d.y + n, d.radius, d.start, d.end, d.ccw), i = W(d, d.end + o), j = X(d, d.end + o), k = W(d, d.end), l = X(d, d.end), _(a, b, c, d, k, l, i, j) } function Z(a, b, c, d, e, f, g, h) { var i, j, k, l, m, n, o; d.arrowRadius && !c.closed && (o = Aa(h - f, g - e), o -= va, m = c.strokeWidth * za(o), n = c.strokeWidth * ya(o), i = g + d.arrowRadius * za(o + d.arrowAngle / 2), j = h + d.arrowRadius * ya(o + d.arrowAngle / 2), k = g + d.arrowRadius * za(o - d.arrowAngle / 2), l = h + d.arrowRadius * ya(o - d.arrowAngle / 2), b.moveTo(i - m, j - n), b.lineTo(g - m, h - n), b.lineTo(k - m, l - n), b.moveTo(g - m, h - n), b.lineTo(g + m, h + n), b.moveTo(g, h)) } function $(a, b, c, d, e, f, g, h) { d._arrowAngleConverted || (d.arrowAngle *= c._toRad, d._arrowAngleConverted = !0), d.startArrow && Z(a, b, c, d, e, f, g, h) } function _(a, b, c, d, e, f, g, h) { d._arrowAngleConverted || (d.arrowAngle *= c._toRad, d._arrowAngleConverted = !0), d.endArrow && Z(a, b, c, d, e, f, g, h) } function aa(a, b, c, d) { var e, f, g; for (e = 2, $(a, b, c, d, d.x2 + c.x, d.y2 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ;) { if (f = d["x" + e], g = d["y" + e], void 0 === f || void 0 === g) break; b.lineTo(f + c.x, g + c.y), e += 1 } e -= 1, _(a, b, c, d, d["x" + (e - 1)] + c.x, d["y" + (e - 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y) } function ba(a, b, c, d) { var e, f, g, h, i; for (e = 2, $(a, b, c, d, d.cx1 + c.x, d.cy1 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ;) { if (f = d["x" + e], g = d["y" + e], h = d["cx" + (e - 1)], i = d["cy" + (e - 1)], void 0 === f || void 0 === g || void 0 === h || void 0 === i) break; b.quadraticCurveTo(h + c.x, i + c.y, f + c.x, g + c.y), e += 1 } e -= 1, _(a, b, c, d, d["cx" + (e - 1)] + c.x, d["cy" + (e - 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y) } function ca(a, b, c, d) { var e, f, g, h, i, j, k, l; for (e = 2, f = 1, $(a, b, c, d, d.cx1 + c.x, d.cy1 + c.y, d.x1 + c.x, d.y1 + c.y), void 0 !== d.x1 && void 0 !== d.y1 && b.moveTo(d.x1 + c.x, d.y1 + c.y); ;) { if (g = d["x" + e], h = d["y" + e], i = d["cx" + f], j = d["cy" + f], k = d["cx" + (f + 1)], l = d["cy" + (f + 1)], void 0 === g || void 0 === h || void 0 === i || void 0 === j || void 0 === k || void 0 === l) break; b.bezierCurveTo(i + c.x, j + c.y, k + c.x, l + c.y, g + c.x, h + c.y), e += 1, f += 2 } e -= 1, f -= 2, _(a, b, c, d, d["cx" + (f + 1)] + c.x, d["cy" + (f + 1)] + c.y, d["x" + e] + c.x, d["y" + e] + c.y) } function da(a, b, c) { return b *= a._toRad, b -= va / 2, c * za(b) } function ea(a, b, c) { return b *= a._toRad, b -= va / 2, c * ya(b) } function fa(a, b, c, d) { var e, f, g, h, i, j, k, l, m, n, o; for (c === d ? (h = 0, i = 0) : (h = c.x, i = c.y), e = 1, j = l = n = d.x + h, k = m = o = d.y + i, $(a, b, c, d, j + da(c, d.a1, d.l1), k + ea(c, d.a1, d.l1), j, k), void 0 !== d.x && void 0 !== d.y && b.moveTo(j, k); ;) { if (f = d["a" + e], g = d["l" + e], void 0 === f || void 0 === g) break; l = n, m = o, n += da(c, f, g), o += ea(c, f, g), b.lineTo(n, o), e += 1 } _(a, b, c, d, l, m, n, o) } function ga(a, b, c) { isNaN(pa(c.fontSize)) || (c.fontSize += "px"), b.font = c.fontStyle + " " + c.fontSize + " " + c.fontFamily } function ha(b, c, d, e) { var f, g, h, i = Ea.propCache; if (i.text === d.text && i.fontStyle === d.fontStyle && i.fontSize === d.fontSize && i.fontFamily === d.fontFamily && i.maxWidth === d.maxWidth && i.lineHeight === d.lineHeight) d.width = i.width, d.height = i.height; else { for (d.width = c.measureText(e[0]).width, h = 1; h < e.length; h += 1)(g = c.measureText(e[h]).width) > d.width && (d.width = g); f = b.style.fontSize, b.style.fontSize = d.fontSize, d.height = qa(a.css(b, "fontSize")) * e.length * d.lineHeight, b.style.fontSize = f } } function ia(a, b) { var c, d, e, f, g, h, i = String(b.text), j = b.maxWidth, k = i.split("\n"), l = []; for (e = 0; e < k.length; e += 1) { if (f = k[e], g = f.split(" "), c = [], d = "", 1 === g.length || a.measureText(f).width < j) c = [f]; else { for (h = 0; h < g.length; h += 1)a.measureText(d + g[h]).width > j && ("" !== d && c.push(d), d = ""), d += g[h], h !== g.length - 1 && (d += " "); c.push(d) } l = l.concat(c.join("\n").replace(/((\n))|($)/gi, "$2").split("\n")) } return l } var ja, ka = b.document, la = b.Image, ma = b.Array, na = b.getComputedStyle, oa = b.Math, pa = b.Number, qa = b.parseFloat, ra = a.extend, sa = a.inArray, ta = function (a) { return Object.prototype.toString.call(a).slice(8, -1).toLowerCase() }, ua = a.isPlainObject, va = oa.PI, wa = oa.round, xa = oa.abs, ya = oa.sin, za = oa.cos, Aa = oa.atan2, Ba = ma.prototype.slice, Ca = a.event.fix, Da = {}, Ea = { dataCache: {}, propCache: {}, imageCache: {} }, Fa = { rotate: 0, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, masks: [] }, Ga = {}, Ha = ["mousedown", "mousemove", "mouseup", "mouseover", "mouseout", "touchstart", "touchmove", "touchend"], Ia = { events: {}, eventHooks: {}, future: {} }; d.baseDefaults = { align: "center", arrowAngle: 90, arrowRadius: 0, autosave: !0, baseline: "middle", bringToFront: !1, ccw: !1, closed: !1, compositing: "source-over", concavity: 0, cornerRadius: 0, count: 1, cropFromCenter: !0, crossOrigin: null, cursors: null, disableEvents: !1, draggable: !1, dragGroups: null, groups: null, data: null, dx: null, dy: null, end: 360, eventX: null, eventY: null, fillStyle: "transparent", fontStyle: "normal", fontSize: "12pt", fontFamily: "sans-serif", fromCenter: !0, height: null, imageSmoothing: !0, inDegrees: !0, intangible: !1, index: null, letterSpacing: null, lineHeight: 1, layer: !1, mask: !1, maxWidth: null, miterLimit: 10, name: null, opacity: 1, r1: null, r2: null, radius: 0, repeat: "repeat", respectAlign: !1, restrictDragToAxis: null, rotate: 0, rounded: !1, scale: 1, scaleX: 1, scaleY: 1, shadowBlur: 0, shadowColor: "transparent", shadowStroke: !1, shadowX: 0, shadowY: 0, sHeight: null, sides: 0, source: "", spread: 0, start: 0, strokeCap: "butt", strokeDash: null, strokeDashOffset: 0, strokeJoin: "miter", strokeStyle: "transparent", strokeWidth: 1, sWidth: null, sx: null, sy: null, text: "", translate: 0, translateX: 0, translateY: 0, type: null, visible: !0, width: null, x: 0, y: 0 }, ja = new d, c.prototype = ja, Ia.extend = function (b) { return b.name && (b.props && ra(ja, b.props), a.fn[b.name] = function a(d) { var e, f, g, i, j = this; for (f = 0; f < j.length; f += 1)e = j[f], (g = h(e)) && (i = new c(d), H(e, i, d, a), n(e, g, i), b.fn.call(e, g, i)); return j }, b.type && (Da.drawings[b.type] = b.name)), a.fn[b.name] }, a.fn.getEventHooks = function () { var a, b, c = this, d = {}; return 0 !== c.length && (a = c[0], b = s(a), d = b.eventHooks), d }, a.fn.setEventHooks = function (a) { var b, c, d = this; for (b = 0; b < d.length; b += 1)c = s(d[b]), ra(c.eventHooks, a); return d }, a.fn.getLayers = function (a) { var b, c, d, e, g, h = this, i = []; if (0 !== h.length) if (b = h[0], c = s(b), d = c.layers, f(a)) for (g = 0; g < d.length; g += 1)e = d[g], a.call(b, e) && i.push(e); else i = d; return i }, a.fn.getLayer = function (a) { var b, c, d, f, g, h, i = this; if (0 !== i.length) if (b = i[0], c = s(b), d = c.layers, h = ta(a), a && a.layer) f = a; else if ("number" === h) a < 0 && (a = d.length + a), f = d[a]; else if ("regexp" === h) { for (g = 0; g < d.length; g += 1)if (e(d[g].name) && d[g].name.match(a)) { f = d[g]; break } } else f = c.layer.names[a]; return f }, a.fn.getLayerGroup = function (a) { var b, c, d, e, f, g = this, h = ta(a); if (0 !== g.length) if (b = g[0], "array" === h) f = a; else if ("regexp" === h) { c = s(b), d = c.layer.groups; for (e in d) if (e.match(a)) { f = d[e]; break } } else c = s(b), f = c.layer.groups[a]; return f }, a.fn.getLayerIndex = function (a) { var b = this, c = b.getLayers(), d = b.getLayer(a); return sa(d, c) }, a.fn.setLayer = function (b, c) { var d, e, f, h, j, k, l, m = this; for (e = 0; e < m.length; e += 1)if (d = a(m[e]), f = s(m[e]), h = a(m[e]).getLayer(b)) { x(d, f, h, c), y(d, f, h, c), i(c); for (j in c) Object.prototype.hasOwnProperty.call(c, j) && (k = c[j], l = ta(k), "object" === l && ua(k) ? (h[j] = ra({}, k), i(h[j])) : "array" === l ? h[j] = k.slice(0) : "string" === l ? 0 === k.indexOf("+=") ? h[j] += qa(k.substr(2)) : 0 === k.indexOf("-=") ? h[j] -= qa(k.substr(2)) : !isNaN(k) && g(k) && "text" !== j ? h[j] = qa(k) : h[j] = k : h[j] = k); t(d, f, h), w(d, f, h), !1 === a.isEmptyObject(c) && G(d, f, h, "change", c) } return m }, a.fn.setLayers = function (b, c) { var d, e, f, g, h = this; for (e = 0; e < h.length; e += 1)for (d = a(h[e]), f = d.getLayers(c), g = 0; g < f.length; g += 1)d.setLayer(f[g], b); return h }, a.fn.setLayerGroup = function (b, c) { var d, e, f, g, h = this; for (e = 0; e < h.length; e += 1)if (d = a(h[e]), f = d.getLayerGroup(b)) for (g = 0; g < f.length; g += 1)d.setLayer(f[g], c); return h }, a.fn.moveLayer = function (b, c) { var d, e, f, g, h, i = this; for (e = 0; e < i.length; e += 1)d = a(i[e]), f = s(i[e]), g = f.layers, (h = d.getLayer(b)) && (h.index = sa(h, g), g.splice(h.index, 1), g.splice(c, 0, h), c < 0 && (c = g.length + c), h.index = c, G(d, f, h, "move")); return i }, a.fn.removeLayer = function (b) { var c, d, e, f, g, h = this; for (d = 0; d < h.length; d += 1)c = a(h[d]), e = s(h[d]), f = c.getLayers(), (g = c.getLayer(b)) && (g.index = sa(g, f), f.splice(g.index, 1), delete g._layer, x(c, e, g, { name: null }), y(c, e, g, { groups: null }), G(c, e, g, "remove")); return h }, a.fn.removeLayers = function (b) { var c, d, e, f, g, h, i = this; for (d = 0; d < i.length; d += 1) { for (c = a(i[d]), e = s(i[d]), f = c.getLayers(b).slice(0), h = 0; h < f.length; h += 1)g = f[h], c.removeLayer(g); e.layer.names = {}, e.layer.groups = {} } return i }, a.fn.removeLayerGroup = function (b) { var c, d, e, f, g = this; if (void 0 !== b) for (d = 0; d < g.length; d += 1)if (c = a(g[d]), e = c.getLayerGroup(b)) for (e = e.slice(0), f = 0; f < e.length; f += 1)c.removeLayer(e[f]); return g }, a.fn.addLayerToGroup = function (b, c) { var d, e, f, g = this, h = [c]; for (e = 0; e < g.length; e += 1)d = a(g[e]), f = d.getLayer(b), f.groups && (h = f.groups.slice(0), -1 === sa(c, f.groups) && h.push(c)), d.setLayer(f, { groups: h }); return g }, a.fn.removeLayerFromGroup = function (b, c) { var d, e, f, g, h = this, i = []; for (e = 0; e < h.length; e += 1)d = a(h[e]), f = d.getLayer(b), f.groups && -1 !== (g = sa(c, f.groups)) && (i = f.groups.slice(0), i.splice(g, 1), d.setLayer(f, { groups: i })); return h }, Ga.cursors = ["grab", "grabbing", "zoom-in", "zoom-out"], Ga.prefix = function () { var a = na(ka.documentElement, ""); return "-" + (Ba.call(a).join("").match(/-(moz|webkit|ms)-/) || "" === a.OLink && ["", "o"])[1] + "-" }(), a.fn.triggerLayerEvent = function (b, c) { var d, e, f, g = this; for (e = 0; e < g.length; e += 1)d = a(g[e]), f = s(g[e]), (b = d.getLayer(b)) && G(d, f, b, c); return g }, a.fn.drawLayer = function (b) { var c, d, e, f, g = this; for (c = 0; c < g.length; c += 1)e = a(g[c]), (d = h(g[c])) && (f = e.getLayer(b), A(e, d, f)); return g }, a.fn.drawLayers = function (b) { var c, d, e, f, g, i, k, l, m, n, o, p, q, r = this, t = b || {}; for (l = t.index, l || (l = 0), d = 0; d < r.length; d += 1)if (c = a(r[d]), e = h(r[d])) { for (n = s(r[d]), !1 !== t.clear && c.clearCanvas(), t.complete && (n.drawLayersComplete = t.complete), f = n.layers, k = l; k < f.length; k += 1)if (g = f[k], g.index = k, t.resetFire && (g._fired = !1), A(c, e, g, k + 1), g._masks = n.transforms.masks.slice(0), g._method === a.fn.drawImage && g.visible) { q = !0; break } if (q) continue; m = k, t.complete && (t.complete.call(r[d]), delete n.drawLayersComplete), g = z(n), o = n.event, p = o.type, n.drag.layer && B(c, n, p), i = n.lastIntersected, null === i || g === i || !i._hovered || i._fired || n.drag.dragging || (n.lastIntersected = null, i._fired = !0, i._hovered = !1, G(c, n, i, "mouseout"), D(c, n)), g && (g[p] || (p = P(p)), g._event && g.intersects && (n.lastIntersected = g, (g.mouseover || g.mouseout || g.cursors) && !n.drag.dragging && (g._hovered || g._fired || (g._fired = !0, g._hovered = !0, G(c, n, g, "mouseover"))), g._fired || (g._fired = !0, o.type = null, G(c, n, g, p)), !g.draggable || g.disableEvents || "mousedown" !== p && "touchstart" !== p || (n.drag.layer = g, n.originalRedrawOnMousemove = n.redrawOnMousemove, n.redrawOnMousemove = !0))), null !== g || n.drag.dragging || D(c, n), m === f.length && (n.intersecting.length = 0, n.transforms = j(Fa), n.savedTransforms.length = 0) } return r }, a.fn.addLayer = function (a) { var b, d, e = this; for (b = 0; b < e.length; b += 1)h(e[b]) && (d = new c(a), d.layer = !0, H(e[b], d, a)); return e }, Ga.props = ["width", "height", "opacity", "lineHeight"], Ga.propsObj = {}, a.fn.animateLayer = function () { var b, c, d, e, g, i = this, j = Ba.call(arguments, 0); for ("object" === ta(j[2]) ? (j.splice(2, 0, j[2].duration || null), j.splice(3, 0, j[3].easing || null), j.splice(4, 0, j[4].complete || null), j.splice(5, 0, j[5].step || null)) : (void 0 === j[2] ? (j.splice(2, 0, null), j.splice(3, 0, null), j.splice(4, 0, null)) : f(j[2]) && (j.splice(2, 0, null), j.splice(3, 0, null)), void 0 === j[3] ? (j[3] = null, j.splice(4, 0, null)) : f(j[3]) && j.splice(3, 0, null)), c = 0; c < i.length; c += 1)b = a(i[c]), h(i[c]) && (d = s(i[c]), (e = b.getLayer(j[0])) && e._method !== a.fn.draw && (g = ra({}, j[1]), g = K(i[c], e, g), J(g, !0), J(e), e.style = Ga.propsObj, a(e).animate(g, { duration: j[2], easing: a.easing[j[3]] ? j[3] : null, complete: function (a, b, c) { return function () { I(c), L(c), b.animating && b.animated !== c || a.drawLayers(), c._animating = !1, b.animating = !1, b.animated = null, j[4] && j[4].call(a[0], c), G(a, b, c, "animateend") } }(b, d, e), step: function (a, b, c) { return function (d, e) { var f, g, h, i = !1; "_" === e.prop[0] && (i = !0, e.prop = e.prop.replace("_", ""), c[e.prop] = c["_" + e.prop]), -1 !== e.prop.indexOf(".") && (f = e.prop.split("."), g = f[0], h = f[1], c[g] && (c[g][h] = e.now)), c._pos !== e.pos && (c._pos = e.pos, c._animating || b.animating || (c._animating = !0, b.animating = !0, b.animated = c), b.animating && b.animated !== c || a.drawLayers()), j[5] && j[5].call(a[0], d, e, c), G(a, b, c, "animate", e), i && (e.prop = "_" + e.prop) } }(b, d, e) }), G(b, d, e, "animatestart"))); return i }, a.fn.animateLayerGroup = function (b) { var c, d, e, f, g = this, h = Ba.call(arguments, 0); for (d = 0; d < g.length; d += 1)if (c = a(g[d]), e = c.getLayerGroup(b)) for (f = 0; f < e.length; f += 1)h[0] = e[f], c.animateLayer.apply(c, h); return g }, a.fn.delayLayer = function (b, c) { var d, e, f, g, h = this; for (c = c || 0, e = 0; e < h.length; e += 1)d = a(h[e]), f = s(h[e]), (g = d.getLayer(b)) && (a(g).delay(c), G(d, f, g, "delay")); return h }, a.fn.delayLayerGroup = function (b, c) { var d, e, f, g, h, i = this; for (c = c || 0, e = 0; e < i.length; e += 1)if (d = a(i[e]), f = d.getLayerGroup(b)) for (h = 0; h < f.length; h += 1)g = f[h], d.delayLayer(g, c); return i }, a.fn.stopLayer = function (b, c) { var d, e, f, g, h = this; for (e = 0; e < h.length; e += 1)d = a(h[e]), f = s(h[e]), (g = d.getLayer(b)) && (a(g).stop(c), G(d, f, g, "stop")); return h }, a.fn.stopLayerGroup = function (b, c) { var d, e, f, g, h, i = this; for (e = 0; e < i.length; e += 1)if (d = a(i[e]), f = d.getLayerGroup(b)) for (h = 0; h < f.length; h += 1)g = f[h], d.stopLayer(g, c); return i }, function (b) { var c; for (c = 0; c < b.length; c += 1)a.fx.step[b[c]] = N }(["color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "fillStyle", "outlineColor", "strokeStyle", "shadowColor"]), Da.touchEvents = { mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove" }, Da.mouseEvents = { touchstart: "mousedown", touchend: "mouseup", touchmove: "mousemove" }, function (a) { var b; for (b = 0; b < a.length; b += 1)Q(a[b]) }(["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "touchstart", "touchmove", "touchend", "pointerdown", "pointermove", "pointerup", "contextmenu"]), a.event.fix = function (b) { var c, d, e; if (b = Ca.call(a.event, b), d = b.originalEvent) if (e = d.changedTouches, void 0 !== b.pageX && void 0 === b.offsetX) try { c = a(b.currentTarget).offset(), c && (b.offsetX = b.pageX - c.left, b.offsetY = b.pageY - c.top) } catch (a) { } else if (e) try { c = a(b.currentTarget).offset(), c && (b.offsetX = e[0].pageX - c.left, b.offsetY = e[0].pageY - c.top) } catch (a) { } return b }, Da.drawings = { arc: "drawArc", bezier: "drawBezier", ellipse: "drawEllipse", function: "draw", image: "drawImage", line: "drawLine", path: "drawPath", polygon: "drawPolygon", slice: "drawSlice", quadratic: "drawQuadratic", rectangle: "drawRect", text: "drawText", vector: "drawVector", save: "saveCanvas", restore: "restoreCanvas", rotate: "rotateCanvas", scale: "scaleCanvas", translate: "translateCanvas" }, a.fn.draw = function a(b) { var d, e, f = this, g = new c(b); if (Da.drawings[g.type] && "function" !== g.type) f[Da.drawings[g.type]](b); else for (d = 0; d < f.length; d += 1)(e = h(f[d])) && (g = new c(b), H(f[d], g, b, a), g.visible && g.fn && g.fn.call(f[d], e, g)); return f }, a.fn.clearCanvas = function a(b) { var d, e, f = this, g = new c(b); for (d = 0; d < f.length; d += 1)(e = h(f[d])) && (null === g.width || null === g.height ? (e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, f[d].width, f[d].height), e.restore()) : (H(f[d], g, b, a), r(f[d], e, g, g.width, g.height), e.clearRect(g.x - g.width / 2, g.y - g.height / 2, g.width, g.height), p(e, g))); return f }, a.fn.saveCanvas = function a(b) { var d, e, f, g, i, j = this; for (d = 0; d < j.length; d += 1)if (e = h(j[d])) for (g = s(j[d]), f = new c(b), H(j[d], f, b, a), i = 0; i < f.count; i += 1)k(e, g); return j }, a.fn.restoreCanvas = function a(b) { var d, e, f, g, i, j = this; for (d = 0; d < j.length; d += 1)if (e = h(j[d])) for (g = s(j[d]), f = new c(b), H(j[d], f, b, a), i = 0; i < f.count; i += 1)l(e, g); return j }, a.fn.rotateCanvas = function a(b) { var d, e, f, g, i = this; for (d = 0; d < i.length; d += 1)(e = h(i[d])) && (g = s(i[d]), f = new c(b), H(i[d], f, b, a), f.autosave && k(e, g), S(e, f, g.transforms)); return i }, a.fn.scaleCanvas = function a(b) { var d, e, f, g, i = this; for (d = 0; d < i.length; d += 1)(e = h(i[d])) && (g = s(i[d]), f = new c(b), H(i[d], f, b, a), f.autosave && k(e, g), T(e, f, g.transforms)); return i }, a.fn.translateCanvas = function a(b) { var d, e, f, g, i = this; for (d = 0; d < i.length; d += 1)(e = h(i[d])) && (g = s(i[d]), f = new c(b), H(i[d], f, b, a), f.autosave && k(e, g), U(e, f, g.transforms)); return i }, a.fn.drawRect = function a(b) { var d, e, f, g, i, j, k, l, m, o = this; for (d = 0; d < o.length; d += 1)(e = h(o[d])) && (f = new c(b), H(o[d], f, b, a), f.visible && (r(o[d], e, f, f.width, f.height), n(o[d], e, f), e.beginPath(), f.width && f.height && (g = f.x - f.width / 2, i = f.y - f.height / 2, l = xa(f.cornerRadius), l ? (j = f.x + f.width / 2, k = f.y + f.height / 2, f.width < 0 && (m = g, g = j, j = m), f.height < 0 && (m = i, i = k, k = m), j - g - 2 * l < 0 && (l = (j - g) / 2), k - i - 2 * l < 0 && (l = (k - i) / 2), e.moveTo(g + l, i), e.lineTo(j - l, i), e.arc(j - l, i + l, l, 3 * va / 2, 2 * va, !1), e.lineTo(j, k - l), e.arc(j - l, k - l, l, 0, va / 2, !1), e.lineTo(g + l, k), e.arc(g + l, k - l, l, va / 2, va, !1), e.lineTo(g, i + l), e.arc(g + l, i + l, l, va, 3 * va / 2, !1), f.closed = !0) : e.rect(g, i, f.width, f.height)), R(o[d], e, f), q(o[d], e, f))); return o }, a.fn.drawArc = function a(b) { var d, e, f, g = this; for (d = 0; d < g.length; d += 1)(e = h(g[d])) && (f = new c(b), H(g[d], f, b, a), f.visible && (r(g[d], e, f, 2 * f.radius), n(g[d], e, f), e.beginPath(), Y(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f))); return g }, a.fn.drawEllipse = function a(b) { var d, e, f, g, i, j = this; for (d = 0; d < j.length; d += 1)(e = h(j[d])) && (f = new c(b), H(j[d], f, b, a), f.visible && (r(j[d], e, f, f.width, f.height), n(j[d], e, f), g = f.width * (4 / 3), i = f.height, e.beginPath(), e.moveTo(f.x, f.y - i / 2), e.bezierCurveTo(f.x - g / 2, f.y - i / 2, f.x - g / 2, f.y + i / 2, f.x, f.y + i / 2), e.bezierCurveTo(f.x + g / 2, f.y + i / 2, f.x + g / 2, f.y - i / 2, f.x, f.y - i / 2), R(j[d], e, f), f.closed = !0, q(j[d], e, f))); return j }, a.fn.drawPolygon = function a(b) { var d, e, f, g, i, j, k, l, m, o, p = this; for (d = 0; d < p.length; d += 1)if ((e = h(p[d])) && (f = new c(b), H(p[d], f, b, a), f.visible)) { for (r(p[d], e, f, 2 * f.radius), n(p[d], e, f), i = 2 * va / f.sides, j = i / 2, g = j + va / 2, k = f.radius * za(j), e.beginPath(), o = 0; o < f.sides; o += 1)l = f.x + f.radius * za(g), m = f.y + f.radius * ya(g), e.lineTo(l, m), f.concavity && (l = f.x + (k + -k * f.concavity) * za(g + j), m = f.y + (k + -k * f.concavity) * ya(g + j), e.lineTo(l, m)), g += i; R(p[d], e, f), f.closed = !0, q(p[d], e, f) } return p }, a.fn.drawSlice = function a(b) { var d, e, f, g, i, j, k = this; for (d = 0; d < k.length; d += 1)(e = h(k[d])) && (f = new c(b), H(k[d], f, b, a), f.visible && (r(k[d], e, f, 2 * f.radius), n(k[d], e, f), f.start *= f._toRad, f.end *= f._toRad, f.start -= va / 2, f.end -= va / 2, f.start = V(f.start), f.end = V(f.end), f.end < f.start && (f.end += 2 * va), g = (f.start + f.end) / 2, i = f.radius * f.spread * za(g), j = f.radius * f.spread * ya(g), f.x += i, f.y += j, e.beginPath(), e.arc(f.x, f.y, f.radius, f.start, f.end, f.ccw), e.lineTo(f.x, f.y), R(k[d], e, f), f.closed = !0, q(k[d], e, f))); return k }, a.fn.drawLine = function a(b) { var d, e, f, g = this; for (d = 0; d < g.length; d += 1)(e = h(g[d])) && (f = new c(b), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), aa(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f))); return g }, a.fn.drawQuadratic = function a(b) { var d, e, f, g = this; for (d = 0; d < g.length; d += 1)(e = h(g[d])) && (f = new c(b), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), ba(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f))); return g }, a.fn.drawBezier = function a(b) { var d, e, f, g = this; for (d = 0; d < g.length; d += 1)(e = h(g[d])) && (f = new c(b), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), ca(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f))); return g }, a.fn.drawVector = function a(b) { var d, e, f, g = this; for (d = 0; d < g.length; d += 1)(e = h(g[d])) && (f = new c(b), H(g[d], f, b, a), f.visible && (r(g[d], e, f), n(g[d], e, f), e.beginPath(), fa(g[d], e, f, f), R(g[d], e, f), q(g[d], e, f))); return g }, a.fn.drawPath = function a(b) { var d, e, f, g, i, j = this; for (d = 0; d < j.length; d += 1)if ((e = h(j[d])) && (f = new c(b), H(j[d], f, b, a), f.visible)) { for (r(j[d], e, f), n(j[d], e, f), e.beginPath(), g = 1; ;) { if (void 0 === (i = f["p" + g])) break; i = new c(i), "line" === i.type ? aa(j[d], e, f, i) : "quadratic" === i.type ? ba(j[d], e, f, i) : "bezier" === i.type ? ca(j[d], e, f, i) : "vector" === i.type ? fa(j[d], e, f, i) : "arc" === i.type && Y(j[d], e, f, i), g += 1 } R(j[d], e, f), q(j[d], e, f) } return j }, a.fn.drawText = function a(b) { var d, e, f, g, i, j, k, l, m, o, q, s, t, u, v = this; for (d = 0; d < v.length; d += 1)if ((e = h(v[d])) && (f = new c(b), H(v[d], f, b, a), f.visible)) { if (e.textBaseline = f.baseline, e.textAlign = f.align, ga(v[d], e, f), i = null !== f.maxWidth ? ia(e, f) : f.text.toString().split("\n"), ha(v[d], e, f, i), g && (g.width = f.width, g.height = f.height), r(v[d], e, f, f.width, f.height), n(v[d], e, f), t = f.x, "left" === f.align ? f.respectAlign ? f.x += f.width / 2 : t -= f.width / 2 : "right" === f.align && (f.respectAlign ? f.x -= f.width / 2 : t += f.width / 2), f.radius) for (l = qa(f.fontSize), null === f.letterSpacing && (f.letterSpacing = l / 500), k = 0; k < i.length; k += 1) { for (e.save(), e.translate(f.x, f.y), j = i[k], f.flipArcText && (o = j.split(""), o.reverse(), j = o.join("")), m = j.length, e.rotate(-va * f.letterSpacing * (m - 1) / 2), s = 0; s < m; s += 1)q = j[s], 0 !== s && e.rotate(va * f.letterSpacing), e.save(), e.translate(0, -f.radius), f.flipArcText && e.scale(-1, -1), e.fillText(q, 0, 0), "transparent" !== f.fillStyle && (e.shadowColor = "transparent"), 0 !== f.strokeWidth && e.strokeText(q, 0, 0), e.restore(); f.radius -= l, f.letterSpacing += l / (1e3 * va), e.restore() } else for (k = 0; k < i.length; k += 1)j = i[k], u = f.y + k * f.height / i.length - (i.length - 1) * f.height / i.length / 2, e.shadowColor = f.shadowColor, e.fillText(j, t, u), "transparent" !== f.fillStyle && (e.shadowColor = "transparent"), 0 !== f.strokeWidth && e.strokeText(j, t, u); u = 0, "top" === f.baseline ? u += f.height / 2 : "bottom" === f.baseline && (u -= f.height / 2), f._event && (e.beginPath(), e.rect(f.x - f.width / 2, f.y - f.height / 2 + u, f.width, f.height), R(v[d], e, f), e.closePath()), p(e, f) } return Ea.propCache = f, v }, a.fn.measureText = function (a) { var b, d, e, f = this; return d = f.getLayer(a), (!d || d && !d._layer) && (d = new c(a)), b = h(f[0]), b && (ga(f[0], b, d), e = null !== d.maxWidth ? ia(b, d) : d.text.split("\n"), ha(f[0], b, d, e)), d }, a.fn.drawImage = function b(d) { function e(a, b, c, d, e) { null === d.width && null === d.sWidth && (d.width = d.sWidth = q.width), null === d.height && null === d.sHeight && (d.height = d.sHeight = q.height), e && (e.width = d.width, e.height = d.height), null !== d.sWidth && null !== d.sHeight && null !== d.sx && null !== d.sy ? (null === d.width && (d.width = d.sWidth), null === d.height && (d.height = d.sHeight), d.cropFromCenter && (d.sx += d.sWidth / 2, d.sy += d.sHeight / 2), d.sy - d.sHeight / 2 < 0 && (d.sy = d.sHeight / 2), d.sy + d.sHeight / 2 > q.height && (d.sy = q.height - d.sHeight / 2), d.sx - d.sWidth / 2 < 0 && (d.sx = d.sWidth / 2), d.sx + d.sWidth / 2 > q.width && (d.sx = q.width - d.sWidth / 2), r(a, b, d, d.width, d.height), n(a, b, d), b.drawImage(q, d.sx - d.sWidth / 2, d.sy - d.sHeight / 2, d.sWidth, d.sHeight, d.x - d.width / 2, d.y - d.height / 2, d.width, d.height)) : (r(a, b, d, d.width, d.height), n(a, b, d), b.drawImage(q, d.x - d.width / 2, d.y - d.height / 2, d.width, d.height)), b.beginPath(), b.rect(d.x - d.width / 2, d.y - d.height / 2, d.width, d.height), R(a, b, d), b.closePath(), p(b, d), o(b, c, d) } function f(b, c, d, f, g) { return function () { var h = a(b); if (e(b, c, d, f, g), f.layer ? G(h, d, g, "load") : f.load && f.load.call(h[0], g), f.layer && (g._masks = d.transforms.masks.slice(0), f._next)) { var i = d.drawLayersComplete; delete d.drawLayersComplete, h.drawLayers({ clear: !1, resetFire: !0, index: f._next, complete: i }) } } } var g, i, j, k, l, m, q, t, u, v = this, w = Ea.imageCache; for (i = 0; i < v.length; i += 1)g = v[i], (j = h(v[i])) && (k = s(v[i]), l = new c(d), m = H(v[i], l, d, b), l.visible && (u = l.source, t = u.getContext, u.src || t ? q = u : u && (w[u] && w[u].complete ? q = w[u] : (q = new la, u.match(/^data:/i) || (q.crossOrigin = l.crossOrigin), q.src = u, w[u] = q)), q && (q.complete || t ? f(g, j, k, l, m)() : (q.onload = f(g, j, k, l, m), q.src = q.src)))); return v },
            a.fn.createPattern = function (b) { function d() { k = e.createPattern(i, g.repeat), g.load && g.load.call(m[0], k) } var e, g, i, j, k, l, m = this; return e = h(m[0]), e ? (g = new c(b), l = g.source, f(l) ? (i = a("<canvas />")[0], i.width = g.width, i.height = g.height, j = h(i), l.call(i, j), d()) : (j = l.getContext, l.src || j ? i = l : (i = new la, l.match(/^data:/i) || (i.crossOrigin = g.crossOrigin), i.src = l), i.complete || j ? d() : (i.onload = d, i.src = i.src))) : k = null, k }, a.fn.createGradient = function (a) { var b, d, e, f, g, i, j, k, l, m, n = this, o = []; if (d = new c(a), b = h(n[0])) { for (d.x1 = d.x1 || 0, d.y1 = d.y1 || 0, d.x2 = d.x2 || 0, d.y2 = d.y2 || 0, e = null !== d.r1 && null !== d.r2 ? b.createRadialGradient(d.x1, d.y1, d.r1, d.x2, d.y2, d.r2) : b.createLinearGradient(d.x1, d.y1, d.x2, d.y2), j = 1; void 0 !== d["c" + j]; j += 1)void 0 !== d["s" + j] ? o.push(d["s" + j]) : o.push(null); for (f = o.length, null === o[0] && (o[0] = 0), null === o[f - 1] && (o[f - 1] = 1), j = 0; j < f; j += 1) { if (null !== o[j]) { for (l = 1, m = 0, g = o[j], k = j + 1; k < f; k += 1) { if (null !== o[k]) { i = o[k]; break } l += 1 } g > i && (o[k] = o[j]) } else null === o[j] && (m += 1, o[j] = g + m * ((i - g) / l)); e.addColorStop(o[j], d["c" + (j + 1)]) } } else e = null; return e }, a.fn.setPixels = function a(b) { var d, e, f, g, i, j, k, l, m, n, o = this; for (e = 0; e < o.length; e += 1)if (d = o[e], f = h(d), g = s(o[e]), f && (i = new c(b), H(d, i, b, a), r(o[e], f, i, i.width, i.height), null !== i.width && null !== i.height || (i.width = d.width, i.height = d.height, i.x = i.width / 2, i.y = i.height / 2), 0 !== i.width && 0 !== i.height)) { if (k = f.getImageData((i.x - i.width / 2) * g.pixelRatio, (i.y - i.height / 2) * g.pixelRatio, i.width * g.pixelRatio, i.height * g.pixelRatio), l = k.data, n = l.length, i.each) for (m = 0; m < n; m += 4)j = { r: l[m], g: l[m + 1], b: l[m + 2], a: l[m + 3] }, i.each.call(d, j, i), l[m] = j.r, l[m + 1] = j.g, l[m + 2] = j.b, l[m + 3] = j.a; f.putImageData(k, (i.x - i.width / 2) * g.pixelRatio, (i.y - i.height / 2) * g.pixelRatio), f.restore() } return o }, a.fn.getCanvasImage = function (a, b) { var c, d = this, e = null; return 0 !== d.length && (c = d[0], c.toDataURL && (void 0 === b && (b = 1), e = c.toDataURL("image/" + a, b))), e }, a.fn.detectPixelRatio = function (a) { var c, d, e, f, g, i, j, k, l, m = this; for (d = 0; d < m.length; d += 1)c = m[d], e = h(c), l = s(m[d]), l.scaled || (f = b.devicePixelRatio || 1, g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1, i = f / g, 1 !== i && (j = c.width, k = c.height, c.width = j * i, c.height = k * i, c.style.width = j + "px", c.style.height = k + "px", e.scale(i, i)), l.pixelRatio = i, l.scaled = !0, a && a.call(c, i)); return m }, Ia.clearCache = function () { var a; for (a in Ea) Object.prototype.hasOwnProperty.call(Ea, a) && (Ea[a] = {}) }, a.support.canvas = void 0 !== a("<canvas />")[0].getContext, ra(Ia, { defaults: ja, setGlobalProps: n, transformShape: r, detectEvents: R, closePath: q, setCanvasFont: ga, measureText: ha }), a.jCanvas = Ia, a.jCanvasObject = c
    });

    //Sliderの値をセット
    var valence1= 0;
    var valence2= 0;
    var valence3= 0;
    var valence4= 0;
    var valence5= 0;
    var valence6= 0;
    var valence7= 0;
    var valence8= 0;
    var valence1_text = valence1.toFixed();
    var valence2_text = valence2.toFixed();
    var valence3_text = valence3.toFixed();
    var valence4_text = valence4.toFixed();
    var valence5_text = valence5.toFixed();
    var valence6_text = valence6.toFixed();
    var valence7_text = valence7.toFixed();
    var valence8_text = valence8.toFixed();
    var total = 0;

    var item_num = 4;//アイテム種類

    var that = this;



    //リミット
    // var limit = $('input:hidden[name="Limit"]').val();
    // var limit = 2;
    var limit = $('input:hidden[name="Limit"]').val();

    //個数
    var item1_number = 7; //金
    var item2_number = 5; //銀
    var item3_number = 5; //バナナ
    var item4_number = 5; //香辛料
    //ポイント
    // var op_item1_point = 2;
    // var op_item2_point = 1;
    // var op_item3_point = 0;
    // var op_item4_point = -1;

    // var my_item1_point = 2;
    // var my_item2_point = -1;
    // var my_item3_point = 1;
    // var my_item4_point = 0;
    var op_item1_point = 2;
    var op_item2_point = 0;
    var op_item3_point = -1;
    var op_item4_point = 1;

    var my_item1_point = 2;
    var my_item2_point = 1;
    var my_item3_point = 0;
    var my_item4_point = -1;




    var startTime = performance.now();
    console.log("startTime="+startTime);
    var endTime;
    var passed_time_task1;



    item1_image = items["${e://Field/participant_preference_1st}"].img_url;
    item2_image = items["${e://Field/participant_preference_2nd}"].img_url;
    item3_image = items["${e://Field/participant_preference_3rd}"].img_url;
    item4_image = items["${e://Field/participant_preference_4th}"].img_url;







//pixi_Test
    const position = {
        boxWidth: 1000,
        // boxHeight: 700,
        boxHeight: 1000,
        // modelScale: 0.45,
        modelScale: 0.15,
        modelX: 0,
        // modelY: 500,
        modelY: 500,
    };


//////////////////////////////////////



//VOICEVOXのサーバーアドレス 　サーバーはngrok等でhttps化しないとだめ　
    const serverURL = "localhost://41080";
    //const serverURL = "https://a48e-2400-2651-41c2-1500-4405-5e59-5c98-3b57.jp.ngrok.io";
    const debug = false;
    //const modelPath = "https://cdn.jsdelivr.net/gh/edu-053/AgentInteractionResources@39f3aed18d17f3ff893b842a2c5bef6e19af406e/Resources/Hiyori_free_2/hiyori_free_t08_2.model3.json";
    const modelPath = "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/dist/Resources/AModel/AModel/amodel.model3.json";

    //画面の縦横100%にする
    const skinInner = document.querySelector(".SkinInner");
    skinInner.classList.add("expand-section1");
    //画面の背景色変更
    if (debug === true) {
        skinInner.classList.add("bg-success");
        const body = document.getElementById("SurveyEngineBody");
        body.classList.add("bg-success");
    }

    //背景色
    //const jfe = document.querySelector(".JFE");
    //jfe.classList.add("bg-danger");
    //次ボタンを隠す
    this.hideNextButton();
    const requiredResources = [
        "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
        "https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js",
        //"https://e-sato.net/hiyori_3d_pixi/js/IndexLibrary.js",
        "https://cdn.jsdelivr.net/gh/l1031041272/Qualtrics-Resources-2@master/dist/js/IndexLibrary.js",
    ];

    const loadScript = (idx) => {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if (idx + 1 < requiredResources.length) {
                loadScript(idx + 1);
            }
            else {
                initExp();
            }
        });
    };

    const initExp = () => {
        //インスタンス作成＆DOMLoad操作
        console.log("ロード");
        indexLibrary = new IndexLibrary(debug, serverURL, modelPath, position);
        indexLibrary.onload();
        indexLibrary.set_limit(limit);

    };

    console.log("ロード");
    console.log("スクリプト読み込み");
    loadScript(0);



    // console.log("index_limit",indexLibrary.limit);

//////////////////////////




    //スライダーバーが右端か左端かを決める
    for(var i=1; i<5; i++){
        if($('input:hidden[name="slider'+i+'_init"]').val()=="0"){
            eval("var pre_"+i+"value=0;");
        }
        else if($('input:hidden[name="slider'+i+'_init"]').val()=="1"){
            eval("var pre_"+i+"value = item"+i+"_number;");
        }
        console.log("pre"+i+"value="+eval("pre_"+i+"value"));
    }

    var position_task1_agent_preference_1st=pre_1value+",";
    var position_task1_agent_preference_3rd=pre_2value+",";
    var position_task1_agent_preference_4th=pre_3value+",";
    var position_task1_agent_preference_2nd=pre_4value+",";

    var slider_history_time_task1_agent_preference_1st="";
    var slider_history_time_task1_agent_preference_3rd="";
    var slider_history_time_task1_agent_preference_4th="";
    var slider_history_time_task1_agent_preference_2nd="";







    // for(var i=1; i<item1_number+1; i++){
    //   $('#myitem1').append('<img src="'+item1_image+'" width="40" height="40" id="myitem1_'+i+'">');
    //   $('#opitem1').append('<img src="'+item1_image+'" width="40" height="40" id="opitem1_'+i+'">');
    //   $('#myitem1_'+i).hide();
    //   $('#opitem1_'+i).hide();
    // }

    // for(var i=1; i<item2_number+1; i++){
    //   $('#myitem2').append('<img src="'+item2_image+'" width="40" height="40" id="myitem2_'+i+'">');
    //   $('#opitem2').append('<img src="'+item2_image+'" width="40" height="40" id="opitem2_'+i+'">');
    //   $('#myitem2_'+i).hide();
    //   $('#opitem2_'+i).hide();
    // }

    // for(var i=1; i<item3_number+1; i++){
    //   $('#myitem3').append('<img src="'+item3_image+'" width="40" height="40" id="myitem3_'+i+'">');
    //   $('#opitem3').append('<img src="'+item3_image+'" width="40" height="40" id="opitem3_'+i+'">');
    //   $('#myitem3_'+i).hide();
    //   $('#opitem3_'+i).hide();
    // }

    // for(var i=1; i<item4_number+1; i++){
    //   $('#myitem4').append('<img src="'+item4_image+'" width="40" height="40" id="myitem4_'+i+'">');
    //   $('#opitem4').append('<img src="'+item4_image+'" width="40" height="40" id="opitem4_'+i+'">');
    //   $('#myitem4_'+i).hide();
    //   $('#opitem4_'+i).hide();
    // }

    // //初期位置用画像表示
    // for(var i=1; i<5; i++){
    //   for(var j=1; j<eval("pre_"+i+"value+1"); j++){
    //     $('#opitem'+i+'_'+j).show();
    //   }
    //   for(var j=1; j<eval("item"+i+"_number-pre_"+i+"value+1"); j++){
    //     $('#myitem'+i+'_'+j).show();
    //   }
    // }

    //初期点数計算
    for(var i=1; i<5; i++){
        $("#item"+i+"_value").text(eval("pre_"+i+"value")+"個×？点");
        $("#my_item"+i+"_value").text(eval("item"+i+"_number-pre_"+i+"value")+"個×"+eval("my_item"+i+"_point")+"点");
    }
    var init_total = (item1_number-pre_1value)*my_item1_point+(item2_number-pre_2value)*my_item2_point+(item3_number-pre_3value)*my_item3_point+(item4_number-pre_4value)*my_item4_point;
    console.log("init_total="+init_total);
    $("#my_total_point").text(init_total+"点");



    //3Dテーブル配置用の画面のサイズ
    var hsize = $(window).height();
    var wsize = $(window).width();
    var slider_div_size = $("#slider_div").width();

    //画面の中心
    var center = wsize/2;




    //スライダー配置
    for(var i=1;i<item_num+1;i++){
        $('#slider_div').append('<div class="slider_zone" id="slider_zone'+i+'"><div class="item_image item'+i+'_image op_item" id="item'+i+'_image_op"></div><input type="range" class="slider item'+i+'" id="item'+i+'" min="0"><div class="item_image item'+i+'_image my_item" id="item'+i+'_image_my"></div>');
    }

    //スライダーアイテム数設定
    for(var i=1;i<item_num+1;i++){
        $('#item'+i).attr('max', eval('item'+i+'_number'));
        $('#item'+i).attr('value',eval('item'+i+'_number'));
    }

    //アイテム画像
    for(var i=1;i<item_num+1;i++){
        for(var j=1;j<eval('item'+i+'_number')+1;j++){
            $('#item'+i+'_image_op').append('<img class="item op_item_image" id="op_image'+i+'_'+j+'" src="'+eval("item"+i+"_image")+'" width="25" height="25" >');
            // $('#op_image'+i+'_'+j).css("margin-top",25+'px');
            $('#op_image'+i+'_'+j).css("margin-left",-10+'px');
            // if(j != 1){
            //   $('#op_image'+i+'_'+j).css("margin-left",-10+'px');
            // }
            $('#op_image'+i+'_'+j).hide();
            $('#item'+i+'_image_my').append('<img class="item my_item_image" id="my_image'+i+'_'+j+'" src="'+eval("item"+i+"_image")+'" width="40" height="40" >');
            $('#my_image'+i+'_'+j).css("margin-left",-20+'px');
            $('#my_image'+i+'_'+j).hide();
        }
    }

    //初期位置用スライダー、画像表示
    for(var i=1; i<5; i++){
        for(var j=1; j<eval("pre_"+i+"value+1"); j++){
            $('#op_image'+i+'_'+j).show();
        }

        for(var j=1; j<eval("item"+i+"_number-pre_"+i+"value+1"); j++){
            $('#my_image'+i+'_'+j).show();
        }
        //  スライダー
        $("#item"+i).val(eval("item"+i+"_number-pre_"+i+"value"));
    }


    //点数表初期化
    for(var i=1; i<item_num+1; i++){
        $("#point_table_item"+i).html('<img src="'+eval("item"+i+"_image")+'" width="40" height="40" ">');
        // $("#agent_item"+i+"_point").html(eval("op_item"+i+"_point")+"点");
        // $("#human_item"+i+"_point").html(eval("my_item"+i+"_point")+"点");
    }
    point_table_update();


    //台
//https://dev-lib.com/how-to-css-trapezoid/
//幅
// var width = slider_interval*item_num+300;
    var table_width = 750;
// var table_height = $("#slider_zone1").width();
    var table_height = $("#item1").width()+100;
    var table_decrease = 200;
// console.log("slider_zone1="+$("#slider_zone1").width());

// $(".my_item").css("width",table_width/4);
// $(".my_item").css("height",table_width/4);
// $(".op_item").css("width",(table_width-table_decrease*2)/4);
// $(".op_item").css("height",(table_width-table_decrease*2)/4);


    /*
    $('#table').css("width",table_width+"px");
    $('#table').css("border-bottom",table_height+"px solid #EAEFF8");
    // $('#table').css("left",(center-width/2)+"px");
    $('#table').css("border-left",table_decrease+"px solid transparent");
    $('#table').css("border-right",table_decrease+"px solid transparent");
    */

//台のライン
    var x1 = table_decrease;
    var y1 = 0;
    var x2 = table_width-table_decrease;
// var y2 = $('#table').offset().top+table_height;
    var y2 = y1;
    var x3 = x2+table_decrease;
    var y3 = y2 + table_height;
    var x4 = x1 - table_decrease;
    var y4 = y3;

    var up_separate_x = (x2-x1)/(item_num+1);//上辺を5等分(アイテム数＋1)
    var down_separate_x = (x3-x4)/(item_num+1);//下辺を5等分(アイテム数＋1)

    console.log("x1="+x1);
    console.log("y1="+y1);
    console.log("x2="+x2);
    console.log("y2="+y2);
    console.log("x3="+x3);
    console.log("y3="+y3);
    console.log("x4="+x4);
    console.log("y4="+y4);




//ラインを引く(ガイドライン入り)
// $("#table_line").append('<svg  width="660" height="400" id="demo_svg"><line id="line" x1="'+x1+'" y1="'+y1+'" x2='+x2+' y2='+y2+' stroke="#000" stroke-width="5px"/><line id="line" x1="'+x2+'" y1="'+y2+'" x2='+x3+' y2='+y3+' stroke="#000" stroke-width="5px"/><line id="line" x1="'+x3+'" y1="'+y3+'" x2='+x4+' y2='+y4+' stroke="#000" stroke-width="5px"/><line id="line" x1="'+x4+'" y1="'+y4+'" x2='+x1+' y2='+y1+' stroke="#000" stroke-width="5px"/><line id="line1" x1="'+(x1+up_separate_x*1)+'" y1="'+y1+'" x2='+(x4+down_separate_x*1)+' y2='+y4+' stroke="#000" stroke-width="5px"/><line id="line2" x1="'+(x1+up_separate_x*2)+'" y1="'+y1+'" x2='+(x4+down_separate_x*2)+' y2='+y4+' stroke="#000" stroke-width="5px"/><line id="line3" x1="'+(x1+up_separate_x*3)+'" y1="'+y1+'" x2='+(x4+down_separate_x*3)+' y2='+y4+' stroke="#000" stroke-width="5px"/><line id="line4" x1="'+(x1+up_separate_x*4)+'" y1="'+y1+'" x2='+(x4+down_separate_x*4)+' y2='+y4+' stroke="#000" stroke-width="5px"/><line id="line5" x1="'+x1+'" y1="'+y1+'" x2='+x3+' y2='+y3+' stroke="#000" stroke-width="5px"/><line id="line6" x1="'+x2+'" y1="'+y2+'" x2='+x4+' y2='+y4+' stroke="#000" stroke-width="5px"/></svg>');

//ラインを引く
    $("#table_line").append('<svg  width="'+table_width+'" height="'+table_height+'" id="demo_svg"><polygon points="'+x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+' '+x4+','+y4+'" stroke="black" fill="none"></polygon></svg>');



// var line_x1 = $("#line").prop("x1");
// var line_x2 = $("#line").prop("x2");

// console.log("line_x1="+line_x1.x1);
// console.log("line_x2="+line_x2);





//提案位置調整
    var select_height = $('#select').height();
    $('#select').css("margin-top",-select_height+"px");




    var slider_div_position1 = $("#slider_zone1").position().left;
    var zone1_h = $("#slider_zone1").height();
    var slider_div_position2 = $("#slider_zone2").position().left;
    var hei = $("#slider_div").height();
// console.log("slider_div_position1="+slider_div_position1);
// console.log("slider_div_position2="+slider_div_position2);
// console.log("height="+hei);
// console.log("sliderzone1_h="+zone1_h);



    /*
    //slider_divとtable(台)の位置調整
    var slider_div_height_half = Number($("#slider_div").height())/2;
    // console.log("slider_div_height="+$("#slider_div").height());
    // console.log("slider_div_height_half="+slider_div_height_half);
    var table_half = table_height/2;
    // console.log("table_half="+table_half);
    var slider_table_diff = table_half-slider_div_height_half;
    console.log("slider_table_diff="+slider_table_diff);
    $("#slider_div").css("margin-top",slider_table_diff);
    */



//スライダーバーの傾き
    var rotate1 = 90;
    var rotate2 = 90;
    var rotate3 = 90;
    var rotate4 = 90;
    var deg;





// console.log('width: ' + $('#table').width());
    var off = $('#table').offset();
// for(i=1;i<item_num+1;i++){
//   console.log("position1="+position1);
//   deg =  get_deg((position1+slider_interval*(i-1)),width,table_height,center,table_decrease);
//   console.log("deg="+deg);
//   eval("rotate"+i+"=deg+90");
//   console.log("rotate="+eval("rotate"+i));
//   $('#slider_zone'+i).css("top",(-slider_interval/2)+"px");
//   $('#slider_zone'+i).css({transform: 'rotate('+eval("rotate"+i)+'deg)'});
//   $('.item'+i+'_image').css({transform: 'rotate('+eval("-rotate"+i)+'deg)'})
// }
// var slider_div_center =  ($("#slider_div").height())/2;
// for(i=1;i<item_num+1;i++){
//   var slider_zone_position = $("#slider_zone"+i).position().left;
//   var slider_zone_center = $("#slider_zone"+i).height()/2;
//   var slider_position = slider_zone_position + slider_zone_center;
//   console.log("slider_div_center="+slider_div_center);
//   console.log("slider_position"+i+"="+slider_position);
//   deg =  get_deg(slider_position,table_width,table_height,slider_div_center,table_decrease);
//   console.log("deg"+i+"="+deg);
//   $('#slider_zone'+i).css({transform: 'rotate(deg)'});
// }
    var offset = $('#table').offset();

    var table_top_left = offset.left+table_decrease;
    var table_bottom_left = offset.left;
    var table_top_len = table_width-table_decrease*2;
    var slider_top_interval = table_top_len/(item_num+1);
    var slider_bottom_interval = table_width/(item_num+1);

// console.log("table_top_left"+table_top_left);
// console.log("table_bottom_left"+table_bottom_left);
// console.log("table_top_len"+table_top_len);
// console.log("slider_top_interval"+slider_top_interval);
// console.log("slider_bottom_interval"+slider_bottom_interval);


// for(i=1;i<item_num+1;i++){
//   var slider_zone_position = $("#slider_zone"+i).position().left;
//   var slider_zone_center = $("#slider_zone"+i).height()/2;
//   console.log("#slider_zone"+i+"="+$("#slider_zone"+i).position().left);
//   console.log("slider_zone_position"+i+"="+slider_zone_position);
//   console.log("slider_zone_center"+i+"="+slider_zone_center);
//   var slider_position = slider_zone_position + slider_zone_center;
//   // var slider_position = 50;
//   console.log("slider_position"+i+"="+slider_position);
//   deg =  get_deg(slider_position,table_width,table_height,slider_div_center,table_decrease);
//   console.log("deg"+i+"="+deg);
//   $('#slider_zone'+i).css({transform: 'rotate('+deg+'deg)'});
//   $('.item'+i+'_image').css({transform: 'rotate('+(-90-deg)+'deg)'});
//   //角度を考慮したスライダーの長さ
//   var len = $("#slider_zone"+i).width();
//   var cos = Math.cos(deg*(Math.PI/180));
//   $("#slider_zone"+i).width(len/cos);

// }
    var slider_top_position = table_top_left+50;
    var slider_bottom_position = table_bottom_left+50;
    var deg;


// $('#slider_zone1').css("margin-top","27px");//test




//slider_divとtable(台)の位置調整(対角線の交点が台の中心)
//x1,y1とx3,y3を通る直線
    //傾き
    var a1 = get_slope(x1,y1,x3,y3);
    //切片
    var b1 = get_intercept(x1,y1,x3,y3);

//x2,y2とx4,y4を通る直線
    //傾き
    var a2 = get_slope(x2,y2,x4,y4);
    //切片
    var b2 = get_intercept(x2,y2,x4,y4);

//二直線(対角線)の交点
    var intercection_x = (b1-b2)/(a2-a1);
    var intercection_y = (a2*b1-a1*b2)/(a2-a1);

    var slider_div_height_half = Number($("#slider_div").height())/2;
// console.log("slider_div_height="+$("#slider_div").height());
// console.log("slider_div_height_half="+slider_div_height_half);
    var table_half = table_height/2;
// console.log("intercection_y="+intercection_y);
// var slider_table_diff = table_half-slider_div_height_half;
    var slider_table_diff =intercection_y-slider_div_height_half;
// console.log("slider_table_diff="+slider_table_diff);
    $("#slider_div").css("margin-top",slider_table_diff);


//台と提案ボタンの位置調整\
// $(".main_board").append("<div id=adjust_box style=height:"+(table_height-slider_table_diff)+"px;></div>");


//スライダーの位置調整, 回転基準位置設定
    for(i=1;i<(item_num+1);i++){
        var x_top = x1+up_separate_x*i;//スライダーバーが通る座標
        var y_top = y1;
        var x_bottom = x4+down_separate_x*i;
        var y_bottom = y4;
        var center_x = get_line_x(x_top,y_top,x_bottom,y_bottom,intercection_y);
        // var x_slider = $('#item'+i).position();

        //スライダーバーの回転基準位置
        var xpos_rotate = $("#item"+i+"_image_op").width()+((table_width-table_decrease*2)/((table_width-table_decrease*2)+table_width))*$(".slider").width()
        var ypos_rotate =  0.5*$("#slider_zone"+i).height();

        //回転基準位置設定
        $('#slider_zone'+i).css({
            'transform-origin':         xpos_rotate + 'px ' + ypos_rotate + 'px 0px',
            '-webkit-transform-origin': xpos_rotate + 'px ' + ypos_rotate + 'px 0px'
        });

        // console.log("x_slider"+i+"_top="+x_slider.top);
        // console.log("x_slider"+i+"_left="+x_slider.left);
        // //-(0.5*$("#slider_zone"+i).width())
        // //-((table_width-table_decrease*2)/((table_width-table_decrease*2)+table_width))*$(".slider_zone").width()
        // // -((table_width-table_decrease*2)/((table_width-table_decrease*2)+table_width))*$(".slider_zone").width()
        // console.log("ue="+(table_width-table_decrease*2));
        // console.log("sita="+((table_width-table_decrease*2)+table_width));
        // console.log("hi="+((table_width-table_decrease*2)/((table_width-table_decrease*2)+table_width)));
        // console.log("slider_zone="+$(".slider").width());
        $("#slider_zone"+i).css("left",center_x-xpos_rotate);
        // var test = $(".slider_zone").width();
        // console.log("test="+test);
        $("#slider_zone"+i).css("top",-0.5*$("#slider_zone"+i).height());
        // var obj = $('#item'+i).closest();
        // console.dir(i+"="+JSON.stringify(obj));

    }

//スライダーバーを回転
    for(i=1;i<item_num+1;i++){
        slider_top_position += slider_top_interval;
        slider_bottom_position += slider_bottom_interval;
        deg=90+get_deg(slider_top_position,slider_bottom_position,table_height);
        $('#slider_zone'+i).css({transform: 'rotate('+deg+'deg)'});
        $('#item'+i+'_image_op').css({transform: 'rotate('+(-deg)+'deg) scale(-1,-1)'});
        $('#item'+i+'_image_my').css({transform: 'rotate('+(-deg)+'deg)'});
        // $("#table_line").append('<svg  width="660" height="400" class="demo_svg"><line id="line'+i+'" x1="'+slider_top_position+'" y1="'+0+'" x2='+slider_bottom_position+' y2='+table_height+' stroke="#000" stroke-width="5px"/></svg>');
        // console.log("slider_top_position="+slider_top_position);
        // console.log("slider_bottom_position="+slider_bottom_position);
    }
    $('.op_item_image').css({transform:'rotate(180deg)'});


//二点から直線の傾きを出す
    function get_slope(x1,y1,x2,y2){
        var slope = (y2-y1)/(x2-x1);
        return slope;
    }

//二点から直線の切片を出す
    function get_intercept(x1,y1,x2,y2){
        var slope = get_slope(x1,y1,x2,y2);
        var intercept = -slope*x1+y1;
        return intercept;
    }

//二点の座標を通る直線にy座標を代入し、x座標を返す

    function get_line_x(x1,y1,x2,y2,y){
        var slope = get_slope(x1,y1,x2,y2);
        var intercept = get_intercept(x1,y1,x2,y2);
        var x = (y-intercept)/slope;
        return x;
    }

//テーブルの位置調整
    $("#table").css("width",$("#table_line").width()+"px");
    $("#table").css("height",table_height+"px");


//中心の位置から距離をとって角度を出す関数(ボツ)
// function get_deg(position,table_width,table_height,center,decrease){
//   var degree,rad;
//   var cos_b = Math.cos(Math.atan(table_height/decrease));
//   var c = table_width/2;
//   var ccos_b2 = Math.pow(c/cos_b,2);
//   var c2 = Math.pow(c,2);

//   var a = Math.sqrt(ccos_b2-c2);
//   console.log("a="+a);
//   rad = Math.atan((center-position)/a);
//   console.log("cent-posi="+(center-position));
//   degree = rad*(180/Math.PI);
//   return degree;
// }

//テーブル上の分割から角度を出す関数
    function get_deg(top_position, bottom_position, table_height){
        var degree,rad;
        rad = Math.atan((top_position-bottom_position)/table_height);
        degree = rad*(180/Math.PI);
        return degree;
    }



    var table_z = $("#table").css("z-index");
    var slider_div_z = $("#slider_div").css("z-index");
    var select_z = $("#select").css("z-index");

// console.log("table_z="+table_z);
// console.log("slider_div_z="+slider_div_z);
// console.log("select_z="+select_z);





    //要因１　表情(0:False, 1:True)

    var f_emo = $('input:hidden[name="F_EMO"]').val();
    //要因２　瞬き(0:False, 1:True)
    var f_bli = $('input:hidden[name="F_BLI"]').val();

    console.log("FF: ", f_emo + "//" + f_bli);



    //初期値を設定
    $.jCanvas.defaults.fromCenter = false;
    $.jCanvas.defaults.layer = true;
    var elem = document.getElementById("image01");


    this.hideChoices (); //ここでqualtrics側のスライダーを消している。
    this.disableNextButton();





    function point_table_update(){
        for(i=1;i<item_num+1;i++){
            $("#agent_item"+i+"_point").html((eval("item"+i+"_number")-$("#item"+i).val())+"×？点");
            $("#human_item"+i+"_point").html($("#item"+i).val()+"×"+eval("my_item"+i+"_point")+"点");
        }
        $("#agent_total_point").html("？点");
        $("#human_total_point").html(get_participants_total()+"点");

    }


    //スライダー変更中
    $('#item1').on('input change', function() {
        for(i=0;i<item1_number;i++){$('#my_image1_'+(i+1)).hide();}
        for(i=0;i<item1_number;i++){$('#op_image1_'+(i+1)).hide();}

        // stopFacialTimer()
        // stopTimer();
        // startTimer();
        my_item1_num = $(this).val();
        item1_num = item1_number-my_item1_num;

        for(i=0;i<my_item1_num;i++){$('#my_image1_'+(i+1)).show();}
        for(i=0;i<item1_num;i++){$('#op_image1_'+(i+1)).show();}

        //人間側操作履歴
        position_task1_agent_preference_1st=add_history(position_task1_agent_preference_1st, pre_1value, my_item1_num);
        console.log("history="+position_task1_agent_preference_1st);
        pre_1value=my_item1_num;

        //エージェント側操作履歴
        slider_history_time_task1_agent_preference_1st=add_time_history(slider_history_time_task1_agent_preference_1st);
        console.log("time_history="+slider_history_time_task1_agent_preference_1st);

        valence1 = $(this).val();
        valence5 = item1_number-$(this).val();

        total = get_agent_total();
        console.log("total="+total);
        // faceDraw(total,f_emo,f_bli);

        //App.tsに受け渡し用
        // console.log("index_limit",indexLibrary.limit);
        indexLibrary.set_agentpoint(total);
        // console.log("index_total",indexLibrary.agent_point);
        indexLibrary.App_set_point();

        point_table_update();
    });

    $('#item2').on('input change', function() {
        for(i=0;i<item2_number;i++){$('#my_image2_'+(i+1)).hide();}
        for(i=0;i<item2_number;i++){$('#op_image2_'+(i+1)).hide();}

        // stopFacialTimer()
        // stopTimer();
        // startTimer();
        my_item2_num = $(this).val();
        item2_num = item2_number-my_item2_num;

        for(i=0;i<my_item2_num;i++){$('#my_image2_'+(i+1)).show();}
        for(i=0;i<item2_num;i++){$('#op_image2_'+(i+1)).show();}

        //人間側操作履歴
        position_task1_agent_preference_3rd=add_history(position_task1_agent_preference_3rd, pre_2value, my_item2_num);
        console.log("history="+position_task1_agent_preference_3rd);
        pre_2value=my_item2_num;

        //エージェント側操作履歴
        slider_history_time_task1_agent_preference_2nd=add_time_history(slider_history_time_task1_agent_preference_2nd);
        console.log("time_history="+slider_history_time_task1_agent_preference_2nd);

        valence2 = $(this).val();
        valence6 = item2_number-$(this).val();

        total = get_agent_total();
        console.log("total="+total);
        // faceDraw(total,f_emo,f_bli);

        // console.log("index_limit",indexLibrary.limit);
        indexLibrary.set_agentpoint(total);
        // console.log("index_total",indexLibrary.agent_point);
        indexLibrary.App_set_point();

        point_table_update();
    });

    $('#item3').on('input change', function() {
        for(i=0;i<item3_number;i++){$('#my_image3_'+(i+1)).hide();}
        for(i=0;i<item3_number;i++){$('#op_image3_'+(i+1)).hide();}

        // stopFacialTimer()
        // stopTimer();
        // startTimer();
        my_item3_num = $(this).val();
        item3_num = item3_number-my_item3_num;

        for(i=0;i<my_item3_num;i++){$('#my_image3_'+(i+1)).show();}
        for(i=0;i<item3_num;i++){$('#op_image3_'+(i+1)).show();}

        //人間側操作履歴
        position_task1_agent_preference_4th=add_history(position_task1_agent_preference_4th, pre_3value, my_item3_num);
        console.log("history="+position_task1_agent_preference_4th);
        pre_3value=my_item3_num;

        //エージェント側操作履歴
        slider_history_time_task1_agent_preference_3rd=add_time_history(slider_history_time_task1_agent_preference_3rd);
        console.log("time_history="+slider_history_time_task1_agent_preference_3rd);

        valence3 = $(this).val();
        valence7 = item3_number-$(this).val();

        total = get_agent_total();
        console.log("total="+total);
        // faceDraw(total,f_emo,f_bli);

        // console.log("index_limit",indexLibrary.limit);
        indexLibrary.set_agentpoint(total);
        // console.log("index_total",indexLibrary.agent_point);
        indexLibrary.App_set_point();

        point_table_update();
    });


    $('#item4').on('input change', function() {
        for(i=0;i<item4_number;i++){$('#my_image4_'+(i+1)).hide();}
        for(i=0;i<item4_number;i++){$('#op_image4_'+(i+1)).hide();}

        // stopFacialTimer()
        // stopTimer();
        // startTimer();
        my_item4_num = $(this).val();
        item4_num = item4_number-my_item4_num;

        for(i=0;i<my_item4_num;i++){$('#my_image4_'+(i+1)).show();}
        for(i=0;i<item4_num;i++){$('#op_image4_'+(i+1)).show();}

        //人間側操作履歴
        position_task1_agent_preference_2nd=add_history(position_task1_agent_preference_2nd, pre_4value, my_item4_num);
        console.log("history="+position_task1_agent_preference_2nd);
        pre_4value=my_item4_num;

        //エージェント側操作履歴
        slider_history_time_task1_agent_preference_4th=add_time_history(slider_history_time_task1_agent_preference_4th);
        console.log("time_history="+slider_history_time_task1_agent_preference_4th);

        valence4 = $(this).val();
        valence8 = item4_number-$(this).val();

        total = get_agent_total();
        console.log("total="+total);
        // faceDraw(total,f_emo,f_bli);

        // console.log("index_limit",indexLibrary.limit);
        indexLibrary.set_agentpoint(total);
        // console.log("index_total",indexLibrary.agent_point);
        indexLibrary.App_set_point();

        point_table_update();
    });




    // // スライダーをセット
    // $(document).ready(function () {
    //   var item1_count = document.getElementById('item1_value');
    //   var item2_count = document.getElementById('item2_value');
    //   var item3_count = document.getElementById('item3_value');
    //   var item4_count = document.getElementById('item4_value');

    //   var my_item1 = document.getElementById('my_item1_value');
    //   var my_item2 = document.getElementById('my_item2_value');
    //   var my_item3 = document.getElementById('my_item3_value');
    //   var my_item4 = document.getElementById('my_item4_value');








    //   // var my_item1_point = document.getElementById('my_item1_point')
    //   // var my_item2_point = document.getElementById('my_item2_point')
    //   // var my_item3_point = document.getElementById('my_item3_point')
    //   // var my_item4_point = document.getElementById('my_item4_point')

    //   var my_total_point = document.getElementById('my_total_point');
    //   var op_total_point = document.getElementById('op_total_point');



    //   $("#slider1").slider({
    //     value: pre_1value,
    //     min: 0,
    //     max: item1_number,　// 金額の最大値
    //     step: 1,
    //     range: "min",
    //     //orientation: "vertical",


    //     change: function (event, ui) { //スライダー変更

    //     for(var i=1; i<item1_number+1; i++){$('#myitem1_'+i).hide();}
    //     for(var i=1; i<item1_number+1; i++){$('#opitem1_'+i).hide();}

    //     total = get_total();
    //     mytotal = get_total_point();
    //     //item1_count.innerHTML = ui.value+"個×"+op_item1_point+"点";
    //     item1_count.innerHTML = ui.value+"個×？点";
    //     my_item1.innerHTML = item1_number-ui.value+"個×"+my_item1_point+"点";
    //     // my_item1_point.innerHTML = (item1-ui.value)*my_item1_point;
    //     my_total_point.innerHTML = mytotal+"点";
    //     //op_total_point.innerHTML = total;
    //   	valence1 = ui.value;
    // 	valence1_text = valence1.toFixed();
    //   valence5 = item1_number-ui.value;
    //   valence5_text = valence5.toFixed();

    //   position_task1_agent_preference_1st=add_history(position_task1_agent_preference_1st, pre_1value, ui.value);
    //   pre_1value=ui.value;
    //   console.log("history="+position_task1_agent_preference_1st);

    //   slider_history_time_task1_agent_preference_1st=add_time_history(slider_history_time_task1_agent_preference_1st);
    //   console.log("time_history="+slider_history_time_task1_agent_preference_1st);



    //   for(var i=1; i<item1_number-ui.value+1; i++){$('#myitem1_'+i).show();}
    //   for(var i=1; i<ui.value+1; i++){$('#opitem1_'+i).show();}


    // 	//console.log("VAL: ",valence1);

    //     // faceDraw(total,f_emo,f_bli);
    //   //console.log("TOTAL: ",get_total());
    //     //faceDraw(ui.value,f_emo,f_bli);
    //     if (total > limit){
    //       faceDraw(total,f_emo,f_bli);
    //     }else{
    //       faceDraw(0,f_emo,f_bli);
    //     }

    //     },

    //     slide: function (event, ui) {// 変更中
    //       for(var i=1; i<item1_number+1; i++){$('#myitem1_'+i).hide();}
    //       for(var i=1; i<item1_number+1; i++){$('#opitem1_'+i).hide();}

    //       total = get_total();
    //       mytotal = get_total_point();


    //       //item1_count.innerHTML = ui.value+"個×"+op_item1_point+"点";
    //       item1_count.innerHTML = ui.value+"個×？点";
    //       my_item1.innerHTML = item1_number-ui.value+"個×"+my_item1_point+"点";
    //       // my_item1_point.innerHTML = (item1-ui.value)*my_item1_point;
    //       my_total_point.innerHTML = mytotal+"点";
    //       //op_total_point.innerHTML = total;
    //     valence1 = ui.value;
    //     valence1_text = valence1.toFixed();
    //         valence5 = item1_number-ui.value
    //   valence5_text = valence5.toFixed();

    //     for(var i=1; i<item1_number-ui.value+1; i++){$('#myitem1_'+i).show();}
    //     for(var i=1; i<ui.value+1; i++){$('#opitem1_'+i).show();}


    //     //faceDraw(total,f_emo,0);
    //     if (total > limit){
    //       faceDraw(total,f_emo,f_bli);
    //     }else{
    //       faceDraw(0,f_emo,f_bli);
    //     }
    //       //faceDraw(ui.value, f_emo, 0); // 変更中はまばたきなし
    //     }
    //   });


    //   $("#slider2").slider({
    //     value: pre_2value,
    //     min: 0,
    //     max: item2_number,　// 金額の最大値
    //     step: 1,
    //     range: "min",
    //     //orientation: "vertical",

    //     change: function (event, ui) { //スライダー変更

    //       for(var i=1; i<item2_number+1; i++){$('#myitem2_'+i).hide();}
    //       for(var i=1; i<item2_number+1; i++){$('#opitem2_'+i).hide();}

    //           total = get_total();
    //           mytotal = get_total_point();
    //           //item2_count.innerHTML = ui.value+"個×"+op_item2_point+"点";
    //           item2_count.innerHTML = ui.value+"個×？点";
    //           my_item2.innerHTML = item2_number-ui.value+"個×"+my_item2_point+"点";
    //           // my_item2_point.innerHTML = (item2-ui.value)*my_item2_point;
    //           my_total_point.innerHTML = mytotal+"点";
    //           //op_total_point.innerHTML = total;

    //           valence2 = ui.value;
    //         valence2_text = valence2.toFixed();
    //         valence6 = item2_number-ui.value
    //         valence6_text = valence6.toFixed();

    //         position_task1_agent_preference_3rd=add_history(position_task1_agent_preference_3rd, pre_2value, ui.value);
    //         pre_2value=ui.value;

    //         slider_history_time_task1_agent_preference_3rd=add_time_history(slider_history_time_task1_agent_preference_3rd);



    //         for(var i=1; i<item2_number-ui.value+1; i++){$('#myitem2_'+i).show();}
    //         for(var i=1; i<ui.value+1; i++){$('#opitem2_'+i).show();}

    //         //faceDraw(total,f_emo,f_bli);
    //         if (total > limit){
    //           faceDraw(total,f_emo,f_bli);
    //       }else{
    //           faceDraw(0,f_emo,f_bli);
    //       }
    //         //console.log("VAL2: ",valence2);
    //         //  faceDraw(ui.value,f_emo,f_bli);
    //     },

    //     slide: function (event, ui) {// 変更中

    //       for(var i=1; i<item2_number+1; i++){$('#myitem2_'+i).hide();}
    //       for(var i=1; i<item2_number+1; i++){$('#opitem2_'+i).hide();}

    //       total = get_total();
    //       mytotal = get_total_point();
    //      //item2_count.innerHTML = ui.value+"個×"+op_item2_point+"点";
    //       item2_count.innerHTML = ui.value+"個×？点";
    //       my_item2.innerHTML = item2_number-ui.value+"個×"+my_item2_point+"点";
    //       // my_item2_point.innerHTML = (item2-ui.value)*my_item2_point;
    //       my_total_point.innerHTML = mytotal+"点";
    //       //op_total_point.innerHTML = total;
    //       valence2 = ui.value;
    //     valence2_text = valence2.toFixed();
    //     valence6 = item2_number-ui.value
    //   valence6_text = valence6.toFixed();

    //       for(var i=1; i<item2_number-ui.value+1; i++){$('#myitem2_'+i).show();}
    //       for(var i=1; i<ui.value+1; i++){$('#opitem2_'+i).show();}
    //       //faceDraw(ui.value, f_emo, 0); // 変更中はまばたきなし
    //     //faceDraw(total,f_emo,0);
    //     if (total > limit){
    //       faceDraw(total,f_emo,f_bli);
    //     }else{
    //       faceDraw(0,f_emo,f_bli);
    //     }
    //     }
    //   });


    //   $("#slider3").slider({
    //     value: pre_3value,
    //     min: 0,
    //     max: item3_number,　// 金額の最大値
    //     step: 1,
    //     range: "min",
    //     //orientation: "vertical",

    //     change: function (event, ui) { //スライダー変更

    //       for(var i=1; i<item3_number+1; i++){$('#myitem3_'+i).hide();}
    //       for(var i=1; i<item3_number+1; i++){$('#opitem3_'+i).hide();}

    //           total = get_total();
    //           mytotal = get_total_point();
    //           //item3_count.innerHTML = ui.value+"個×"+op_item3_point+"点";
    //           item3_count.innerHTML = ui.value+"個×？点";
    //           my_item3.innerHTML = item3_number-ui.value+"個×"+my_item3_point+"点";
    //           // my_item3_point.innerHTML = (item3-ui.value)*my_item3_point;
    //           my_total_point.innerHTML = mytotal+"点";
    //           //op_total_point.innerHTML = total;
    //           valence3 = ui.value;
    //         valence3_text = valence3.toFixed();
    //         valence7 = item3_number-ui.value
    //         valence7_text = valence7.toFixed();

    //         position_task1_agent_preference_4th=add_history(position_task1_agent_preference_4th, pre_3value, ui.value);
    //         pre_3value=ui.value;

    //         slider_history_time_task1_agent_preference_4th=add_time_history(slider_history_time_task1_agent_preference_4th);

    //         for(var i=1; i<item3_number-ui.value+1; i++){$('#myitem3_'+i).show();}
    //       for(var i=1; i<ui.value+1; i++){$('#opitem3_'+i).show();}


    //         if (total > limit){
    //           faceDraw(total,f_emo,f_bli);
    //         }else{
    //           faceDraw(0,f_emo,f_bli);
    //         }
    //         //faceDraw(total,f_emo,f_bli);
    //         //console.log("VAL3: ",valence3);
    //         //  faceDraw(ui.value,f_emo,f_bli);
    //     },

    //     slide: function (event, ui) {// 変更中

    //       for(var i=1; i<item3_number+1; i++){$('#myitem3_'+i).hide();}
    //       for(var i=1; i<item3_number+1; i++){$('#opitem3_'+i).hide();}

    //       total = get_total();
    //       mytotal = get_total_point();
    //       //item3_count.innerHTML = ui.value+"個×"+op_item3_point+"点";
    //       item3_count.innerHTML = ui.value+"個×？点";
    //       my_item3.innerHTML = item3_number-ui.value+"個×"+my_item3_point+"点";
    //       // my_item3_point.innerHTML = (item3-ui.value)*my_item3_point;
    //       my_total_point.innerHTML = mytotal+"点";
    //       //op_total_point.innerHTML = total;
    //       valence3 = ui.value;
    //     valence3_text = valence3.toFixed();
    //     valence7 = item3_number-ui.value
    //   valence7_text = valence7.toFixed();

    //     for(var i=1; i<item3_number-ui.value+1; i++){$('#myitem3_'+i).show();}
    //       for(var i=1; i<ui.value+1; i++){$('#opitem3_'+i).show();}
    //     //  faceDraw(ui.value, f_emo, 0); // 変更中はまばたきなし

    //     //faceDraw(total,f_emo,0);
    //     if (total > limit){
    //       faceDraw(total,f_emo,f_bli);
    //     }else{
    //       faceDraw(0,f_emo,f_bli);
    //     }
    //     }
    //   });


    //    $("#slider4").slider({
    //      value: pre_4value,
    //      min: 0,
    //      max: item4_number,　// 金額の最大値
    //      step: 1,
    //      range: "min",
    //      //orientation: "vertical",

    //      change: function (event, ui) { //スライダー変更

    //       for(var i=1; i<item4_number+1; i++){$('#myitem4_'+i).hide();}
    //       for(var i=1; i<item4_number+1; i++){$('#opitem4_'+i).hide();}

    //            total = get_total();
    //            mytotal = get_total_point();
    //            //item4_count.innerHTML = ui.value+"個×"+op_item4_point+"点";
    //            item4_count.innerHTML = ui.value+"個×？点";
    //            my_item4.innerHTML = item4_number-ui.value+"個×"+my_item4_point+"点";
    //           //  my_item4_point.innerHTML = (item4-ui.value)*my_item4_point;
    //           my_total_point.innerHTML = mytotal+"点";
    //           //op_total_point.innerHTML = total;
    //            valence4 = ui.value;
    //           valence4_text = valence4.toFixed();
    //           valence8 = item4_number-ui.value
    //           valence8_text = valence8.toFixed();

    //           position_task1_agent_preference_2nd=add_history(position_task1_agent_preference_2nd, pre_4value, ui.value);
    //           pre_4value=ui.value;

    //           slider_history_time_task1_agent_preference_2nd=add_time_history(slider_history_time_task1_agent_preference_2nd);

    //          for(var i=1; i<item4_number-ui.value+1; i++){$('#myitem4_'+i).show();}
    //       for(var i=1; i<ui.value+1; i++){$('#opitem4_'+i).show();}

    //          //console.log("VAL4: ",valence4);
    //           // faceDraw(ui.value,f_emo,f_bli);
    //           if (total > limit){
    //             faceDraw(total,f_emo,f_bli);
    //           }else{
    //             faceDraw(0,f_emo,f_bli);
    //           }
    //           //faceDraw(total,f_emo,f_bli);
    //      },

    //      slide: function (event, ui) {// 変更中

    //       for(var i=1; i<item4_number+1; i++){$('#myitem4_'+i).hide();}
    //       for(var i=1; i<item4_number+1; i++){$('#opitem4_'+i).hide();}
    //        total = get_total();
    //        mytotal = get_total_point();
    //        //item4_count.innerHTML = ui.value+"個×"+op_item4_point+"点";
    //        item4_count.innerHTML = ui.value+"個×？点";
    //        my_item4.innerHTML = item4_number-ui.value+"個×"+my_item4_point+"点";
    //       //  my_item4_point.innerHTML = (item4-ui.value)*my_item4_point;
    //       my_total_point.innerHTML = mytotal+"点";
    //       //op_total_point.innerHTML = total;
    //        valence4 = ui.value;
    //      valence4_text = valence4.toFixed();

    //     valence8 = item4_number-ui.value
    //     valence8_text = valence8.toFixed();
    //       // faceDraw(ui.value, f_emo, 0); // 変更中はまばたきなし

    //       for(var i=1; i<item4_number-ui.value+1; i++){$('#myitem4_'+i).show();}
    //       for(var i=1; i<ui.value+1; i++){$('#opitem4_'+i).show();}

    //       if (total > limit){
    //         faceDraw(total,f_emo,f_bli);
    //       }else{
    //         faceDraw(0,f_emo,f_bli);
    //     }
    //       //faceDraw(total,f_emo,0);
    //      }
    //    });

    // });




    //timer 切り替え関数
    var changeFace = function () {
        // var val = $("#slider1").slider("option", "value");
        // faceDraw(val, f_emo, f_bli);
        total = get_agent_total();
        //faceDraw(total,f_emo,f_bli);
        if (total > limit){
            faceDraw(total,f_emo,f_bli);
        }else{
            faceDraw(0,f_emo,f_bli);
        }

    };


    /*
    //timer set
    var milsec = 3700;
    function stopTimer() {
      clearInterval(timeSet);
    }
    function startTimer() {
      setInterval(changeFace, milsec);
    }
    var timeSet = setInterval(changeFace, milsec);
    */

    /*

    //表情をセット
    var gen_x2 =640;
    var gen_y2 = 400;
    var i_array_0 = [
      "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4OBBa5ZC1FuXhzw",// ここがセンター

    ];

    var i_array_b_0 = [  // b pattern
      "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4OBBa5ZC1FuXhzw",
      "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4OBBa5ZC1FuXhzw"// center


    ];

    var i_array_c_0 = [
      "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5sVmldhWnhJ4A4K"

    ];

// var i_array_1 = [ //blink pattern A
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bsaT3g9KdB1XMDc", //angry

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ex36kge2fWJgT9I", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ex36kge2fWJgT9I", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9RhC7tuScqETNnE",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8xdHMfBbbQXppky",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8xdHMfBbbQXppky",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6DzisdzgarXTeIe",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_01GBT8IWkKaijH0",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_01GBT8IWkKaijH0",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2gxROKfITVwMfYy",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2gxROKfITVwMfYy",

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_08QVyU8BIV1SEM6",　// ここがセンター
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_08QVyU8BIV1SEM6",  // 22にするためにセンターを増やす

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6JMWwNBs1khaJQW",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6JMWwNBs1khaJQW",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ahKsXAXNSwFJlY2",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8faXGWRkRGhRcyO",//喜びの最小(3-2)
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6hxvNYgjz91uDBQ",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_08ODZ3fIAmcYYku",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_78wU9LBhzifsneS",  //happy
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6JXZpjbchfjif3g",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8qymgh3vkw0Kz5Q",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk",

//  ];
// var i_array_1 = [ //blink pattern A
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bsaT3g9KdB1XMDc", //angry


//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8faXGWRkRGhRcyO",//喜びの最小(3-2)
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_aXChgQcVqXpWjH0",//205
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2rEZ9x5M9lY6q6a",//2075
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8GP6cUaXILI0PMW",//3
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8GP6cUaXILI0PMW",//3
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eVh9MtmrR3qlJsO",//4
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eVh9MtmrR3qlJsO",//4
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bjYr8xvvMc8fwHA",//405
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bjYr8xvvMc8fwHA",//405
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0J7ocEwXPUljuU6",//5
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0J7ocEwXPUljuU6",//5
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eVwUzTy6EQCMyxM",//505
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eVwUzTy6EQCMyxM",//505
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6gtO8nEKMuJ8jsy",//6
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6gtO8nEKMuJ8jsy",//6
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_243YvMR4NvljrU2",//605
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_243YvMR4NvljrU2",//605
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4GBb5x78IwsvfsW",//7
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4GBb5x78IwsvfsW",//7
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8HUokL1LLUxSTeS",//705
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8HUokL1LLUxSTeS",//705
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk",//max
//     "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk"//max


//   ];
var i_array_1 = [ //blink pattern A
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bsaT3g9KdB1XMDc", //angry


  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_emNADjqx7f5R2Fo",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_emNADjqx7f5R2Fo",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE"
];

//  var i_array_b_1 = [  // b pattern
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bpvDzflb56f6VCK", //angry

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8iFW6ZBpWGslv2S", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8iFW6ZBpWGslv2S", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0AmMSK7Q3SStc5E",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b3EmmlKHBR6Odka",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b3EmmlKHBR6Odka",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bk3sa8yXgTr8aQS",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6zXW5r7irZp4c5g",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6zXW5r7irZp4c5g",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0DpqS6cGYB7gpCu",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3PItLm4jUYfBuw6",

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5sVmldhWnhJ4A4K",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5sVmldhWnhJ4A4K",

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3xZhrs9xhrxrRaK",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3xZhrs9xhrxrRaK",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8kXB86T2LmZ5LHU",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7QXl9Ft7YUJNlsy",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eXtV7t03H5QVI9g",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_25MMMSgu7ICMnY2",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_d0VcAhmbMBGzUQC",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6LsuQSejxV0mD66",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6yg9TKOv8nsj0Gi",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk",

//  ];
var i_array_b_1 = [  // b pattern
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bsaT3g9KdB1XMDc", //angry


  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_emNADjqx7f5R2Fo",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_emNADjqx7f5R2Fo",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_38hhwnYXQEzlP9k",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bgvYouZey2lSb0a",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_22V1i488ri4uZdI",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9pLIa3T1fkoA5wy",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_02HD8EOonQgvuOW",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4MKqe2pG6H6KP9c",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b89sEu4hhAIGcpE"

];

//  var i_array_c_1 = [ // blibk no
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_86cAcFStvlr5IWy", //angry

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ex36kge2fWJgT9I", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ex36kge2fWJgT9I", // sad
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_89bcwSRF1BZ2u6W",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4Z41JTlWvbz3uNU",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4Z41JTlWvbz3uNU",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1zXutcPWaMjYtQG",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1SIRolaixTjx3mu",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1SIRolaixTjx3mu",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3ecvOhKNIVGIyIS",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8pNgJQAImuh1lZA",

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5sVmldhWnhJ4A4K",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5sVmldhWnhJ4A4K",

//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3xZhrs9xhrxrRaK",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3xZhrs9xhrxrRaK",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8kXB86T2LmZ5LHU",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7QXl9Ft7YUJNlsy",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eXtV7t03H5QVI9g",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_25MMMSgu7ICMnY2",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_d0VcAhmbMBGzUQC",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6LsuQSejxV0mD66",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_6yg9TKOv8nsj0Gi",
//    "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_di13us2LRU2iRVk",
//  ];
var i_array_c_1 = [ // blibk no
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bsaT3g9KdB1XMDc", //angry


  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0PMH2Jg0n8NFutg",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0PMH2Jg0n8NFutg",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bxX6lVvF9cLKbd4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bxX6lVvF9cLKbd4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bxX6lVvF9cLKbd4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cOQ3iAfniIMbwH4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cOQ3iAfniIMbwH4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cOQ3iAfniIMbwH4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eXV4titGtmILvjU",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eXV4titGtmILvjU",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eXV4titGtmILvjU",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1SrLwXOC9G7hHam",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1SrLwXOC9G7hHam",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1SrLwXOC9G7hHam",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_diLYlJFhcJu4tNA",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_diLYlJFhcJu4tNA",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_diLYlJFhcJu4tNA",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_elB0Qvilyu5j5t4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_elB0Qvilyu5j5t4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_elB0Qvilyu5j5t4",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3pDtcnipjhzgSXA",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3pDtcnipjhzgSXA",
  "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3pDtcnipjhzgSXA"
];

    function rnd_ar() { //配列をランダムに入れ替える
      var rand = Math.floor(Math.random() * 9);
      var seed = rand % 3;
      return seed ;
    };

    function faceDraw(yy, fact01, fact02) { //表情を描画する //yy=金額, fact01=表情, fact02=まばたき
      //yの変換
      // num = 50; //変換係数
      // //image_y = Math.floor(yy / num);
      // image_y = yy;
      // var rand = Math.floor( Math.random() * i_array_b_1.length)

      //yの変換
      var sumitem = item1_number*op_item1_point + item2_number*op_item2_point + item3_number*op_item3_point + item4_number*op_item4_point;
      num = sumitem-limit; //変換係数
      //リミットを基準とした特典
      if(yy <= limit){
          image_y = 0;
      }else{
          image_y = Math.ceil(((yy - limit) / num)*(i_array_1.length-1));
          if ( image_y == 0){
            image_y = 1;
          }
          if (image_y >= i_array_1.length){
              image_y = i_array_1.length - 1;
          }
      }
      //画像の取り出し
      var answer = rnd_ar(); //0 or 1 or 2
      if(fact01 == 0) { // face no move.
        if( fact02 == 0) { // blink no
          var center_i = i_array_c_0[0];
        }else { //blink yes
          if (answer == 0) {
            var center_i = i_array_0[0];
          }
          else if (answer == 1) {
            var center_i = i_array_b_0[0];
          }
          else {
            var center_i = i_array_c_0[0];
          };

        }
      }else {
        if( fact02 == 0) { //blink no
          var center_i = i_array_c_1[image_y];
        }else if(answer == 0) {
          var center_i = i_array_1[image_y];
        }
        else if(answer == 1){
          var center_i = i_array_b_1[image_y];
        }
        else {
          var center_i = i_array_c_1[image_y];
        };
      }
      console.log("Ans:", answer);
      console.log("F1/F2:", f_emo + "////" + f_bli);
      console.log("Indx:", image_y);
      console.log("face:", center_i);
      elem.src = center_i;

    }
*/

    // function get_total(){
    //   var total = ($("#slider1").slider("option","value"))*op_item1_point+($("#slider2").slider("option","value"))*op_item2_point+($("#slider3").slider("option","value"))*op_item3_point+($("#slider4").slider("option","value"))*op_item4_point;
    //   return total;
    // }
    function get_participants_total(){
        var participants_total_point = 0;
        for(i=1;i<item_num+1;i++){
            eval ("participants_total_point += ($('#item"+i+"').val())*my_item"+i+"_point")
        }
        return participants_total_point;
    }

    function get_agent_total(){
        var agent_total_point = 0;
        for(i=1;i<item_num+1;i++){
            eval ("agent_total_point += (item"+i+"_number-$('#item"+i+"').val())*op_item"+i+"_point")
        }
        return agent_total_point;
    }

    // function get_total_point(){
    //   var total_point = (item1_number-$("#slider1").slider("option","value"))*my_item1_point+(item2_number-$("#slider2").slider("option","value"))*my_item2_point+(item3_number-$("#slider3").slider("option","value"))*my_item3_point+(item4_number-$("#slider4").slider("option","value"))*my_item4_point;
    //   console.log("TOTAL_POINT: ",total);
    //   return total_point;
    // }

    function add_history(history, pre_value, now_value){

        var history_value = pre_value - now_value;
        console.log("pre_value="+pre_value);
        console.log("now_value="+now_value);
        console.log("add_history="+history_value);
        // if(history_value<0){
        //   for(var i=0;i<Math.abs(history_value);i++){
        //     history += "R";
        //   }
        //   history += "|";
        //   console.log("add_historyR="+history);
        // }
        // else if(history_value>0){
        //   for(var i=0;i<history_value;i++){
        //     history += "L";
        //   }
        //   history += "|";
        //   console.log("add_historyL="+history);
        // }
        history += now_value + ",";
        return history;
    }

    function add_time_history(history){
        var time = (performance.now()-startTime)/1000;
        console.log("Time="+time);
        history+=time.toFixed(3)+",";
        return history;
    }

    // function arrayShuffle(array) {
    //   for(var i = (array.length - 1); 0 < i; i--){

    //     // 0〜(i+1)の範囲で値を取得
    //     var r = Math.floor(Math.random() * (i + 1));

    //     // 要素の並び替えを実行
    //     var tmp = array[i];
    //     array[i] = array[r];
    //     array[r] = tmp;
    //   }
    //   return array;
    // }


    //face draw 初期状態
    // faceDraw(valence1, f_emo, f_bli);
    // stopTimer();
    // startTimer();
    this.setChoiceValue(1, valence1);
    this.setChoiceValue(2, valence2);
    this.setChoiceValue(3, valence3);
    this.setChoiceValue(4, valence4);
    this.setChoiceValue(5, valence5);
    this.setChoiceValue(6, valence6);
    this.setChoiceValue(7, valence7);
    this.setChoiceValue(8, valence8);


    //ボタンの動作
//     $('#select').click(function() {


//         $('#slider1').css('visibility','hidden');
//         $('#slider2').css('visibility','hidden');
// 	      $('#slider3').css('visibility','hidden');
// 	      $('#slider4').css('visibility','hidden');

//         var participant_point_task1 = get_total_point();
//         var agent_point_task1 = get_total();

//         console.log("participant_point_task1="+participant_point_task1);
//         console.log("agent_point_task1="+agent_point_task1);

//         Qualtrics.SurveyEngine.addEmbeddedData("position_task1_agent_preference_1st", position_task1_agent_preference_1st);
//         Qualtrics.SurveyEngine.addEmbeddedData("position_task1_agent_preference_3rd", position_task1_agent_preference_3rd);
//         Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_4th", position_task1_agent_preference_4th);
//         Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_2nd", position_task1_agent_preference_2nd);

//         Qualtrics.SurveyEngine.setEmbeddedData("participant_point_task1", participant_point_task1);
//         Qualtrics.SurveyEngine.setEmbeddedData("agent_point_task1", agent_point_task1);

//         if(agent_point_task1>limit){Qualtrics.SurveyEngine.setEmbeddedData("agent_decision_task1", "agent_decision_task1");console.log("agent_decision_task1");}
//         else{Qualtrics.SurveyEngine.setEmbeddedData("agent_decision_task1", "refuse");console.log("refuse");}

//         Qualtrics.SurveyEngine.enableNextButton();



//         Qualtrics.SurveyEngine.setEmbeddedData("passed_time_task11", performance.now()/1000);
//         console.log("passed_time_task11="+performance.now()/1000);
// //----- end of function ---------------

// });

    var dialog = document.getElementById('dialog');
    var yes = document.getElementById('yes');
    var cancel = document.getElementById('cancel');

    var suggestion_button_img=["https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_37see1hsKpzpuAK", //no_push
        "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_bln2nk0YWrbZU5E", //pushed
        "https://rc1userv5pwvgnvtxbwj.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b28iR0DizQNxbYG"  //bright
    ]

    $('#select').click(function() {
        dialog.style.display = 'block';
        //$('#last_check').html('<strong>div要素内を丸ごと書き換えました。</strong>'+$( "#slider1" ).slider('value'));
    });

//提案ボタンにマウスオーバーした時の処理
// $('#suggestion_button').mouseover(function() {
//    $("#suggestion_button").attr('src',suggestion_button_img[2]);
// }).mouseout(function() {
//   $("#suggestion_button").attr('src',suggestion_button_img[0]);
// });

    //提案ボタンを押したときの処理
    $('#suggestion_button').click(function() {

        dialog.style.display = 'block';
        $("#suggestion_button").attr('src',suggestion_button_img[1]);
        setTimeout(function(){
            $("#suggestion_button").attr('src',suggestion_button_img[0]);
        },500);

        //$('#last_check').html('<strong>div要素内を丸ごと書き換えました。</strong>'+$( "#slider1" ).slider('value'));
    });

    $("#yes").click(function() {
        end_work();
    });

    $("#cancel").click(function() {
        dialog.style.display = 'none';

    });
// $('#zoom_in').click(function(){
//   var zoom = Number($('#all').css('zoom'))+0.1;
//   $('#all').css('zoom',zoom);
// });

// $('#zoom_out').click(function(){
//   var zoom = Number($('#all').css('zoom'))-0.1;
//   $('#all').css('zoom',zoom);
// });
    //this.enableNextButton();
//this.setChoiceValue(1, valence);

    function end_work(){
        // stopTimer();
        that.enableNextButton();
        that.setChoiceValue(1, valence1_text);
        that.setChoiceValue(2, valence2_text);
        that.setChoiceValue(3, valence3_text);
        that.setChoiceValue(4, valence4_text);
        that.setChoiceValue(5, valence5_text);
        that.setChoiceValue(6, valence6_text);
        that.setChoiceValue(7, valence7_text);
        that.setChoiceValue(8, valence8_text);



        $('#slider1').css('visibility','hidden');
        $('#slider2').css('visibility','hidden');
        $('#slider3').css('visibility','hidden');
        $('#slider4').css('visibility','hidden');

        // var participant_point_task1 = get_total_point();
        var participant_point_task1 = get_participants_total();
        var agent_point_task1 = get_agent_total();

        console.log("participant_point_task1="+participant_point_task1);
        console.log("agent_point_task1="+agent_point_task1);

        Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_1st", position_task1_agent_preference_1st);
        Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_3rd", position_task1_agent_preference_3rd);
        Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_4th", position_task1_agent_preference_4th);
        Qualtrics.SurveyEngine.setEmbeddedData("position_task1_agent_preference_2nd", position_task1_agent_preference_2nd);



        var array1 = position_task1_agent_preference_1st.split(',');
        var array2 = position_task1_agent_preference_2nd.split(',');
        var array3 = position_task1_agent_preference_3rd.split(',');
        var array4 = position_task1_agent_preference_4th.split(',');
        // lengthが0にはならない。slider(初期位置が0,1)を一回も動かさないでも絶対に
        if(array1.length > 3){
            Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_1st",item1_number - Number(array1[array1.length -2]));
        }else{
            if($('input:hidden[name="slider'+1+'_init"]').val()=="0"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_1st", Number(0));
            }
            else if($('input:hidden[name="slider'+1+'_init"]').val()=="1"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_1st", Number(item1_number));
            }
        }
        if(array2.length > 3){
            Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_2nd",item2_number - Number(array2[array2.length -2]));
        }else{
            if($('input:hidden[name="slider'+4+'_init"]').val()=="0"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_2nd", Number(0));
            }
            else if($('input:hidden[name="slider'+4+'_init"]').val()=="1"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_2nd", Number(item2_number));
            }
        }
        if(array3.length > 3){
            Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_3rd",item3_number - Number(array3[array3.length -2]));
        }else{
            if($('input:hidden[name="slider'+2+'_init"]').val()=="0"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_3rd", Number(0));
            }
            else if($('input:hidden[name="slider'+2+'_init"]').val()=="1"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_3rd", Number(item3_number));
            }
        }
        if(array4.length > 3){
            Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_4th",item4_number - Number(array4[array4.length -2]));
        }else{
            if($('input:hidden[name="slider'+3+'_init"]').val()=="0"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_4th", Number(0));
            }
            else if($('input:hidden[name="slider'+3+'_init"]').val()=="1"){
                Qualtrics.SurveyEngine.setEmbeddedData("offer_task1_agent_preference_4th", Number(item4_number));
            }
        }




        Qualtrics.SurveyEngine.setEmbeddedData("slider_history_time_task1_agent_preference_1st", slider_history_time_task1_agent_preference_1st);
        Qualtrics.SurveyEngine.setEmbeddedData("slider_history_time_task1_agent_preference_3rd", slider_history_time_task1_agent_preference_3rd);
        Qualtrics.SurveyEngine.setEmbeddedData("slider_history_time_task1_agent_preference_4th", slider_history_time_task1_agent_preference_4th);
        Qualtrics.SurveyEngine.setEmbeddedData("slider_history_time_task1_agent_preference_2nd", slider_history_time_task1_agent_preference_2nd);

        Qualtrics.SurveyEngine.setEmbeddedData("participant_point_task1", participant_point_task1);
        Qualtrics.SurveyEngine.setEmbeddedData("agent_point_task1", agent_point_task1);

        if(agent_point_task1>=limit){Qualtrics.SurveyEngine.setEmbeddedData("agent_decision_task1", "accept");console.log("agent_decision_task1");}
        else{Qualtrics.SurveyEngine.setEmbeddedData("agent_decision_task1", "refuse");console.log("refuse");}


        endTime=performance.now();

        Qualtrics.SurveyEngine.setEmbeddedData("passed_time_task1", (endTime-startTime)/1000);
        console.log("passed_time_task1="+performance.now()/1000);

        that.clickNextButton();

    }



});

Qualtrics.SurveyEngine.addOnReady(function()  /*ページが完全に表示されたときに実行するJavaScriptをここに配置してください*/
{
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()  /*ページの読み込みが解除されたときに実行するJavaScriptをここに配置してください*/
{
    /*Place your JavaScript here to run when the page is unloaded*/

});