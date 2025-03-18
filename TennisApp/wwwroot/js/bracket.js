!(function () {
    var t = {
        7335: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.setupConnection = e.getFinalConnection = e.getBracketConnection = e.addParticipantImage = e.addParticipantOrigin = e.setupLoss = e.setupWin = e.setupBye = e.setupHint = e.createRankingHeaders = e.createCell = e.createRow = e.createTable = e.createResultContainer = e.createNameContainer = e.createParticipantContainer = e.createOpponentsContainer = e.createChildCountLabel = e.createMatchLabel = e.createMatchContainer = e.createRoundContainer = e.createRoundsContainer = e.createGroupContainer = e.createBracketContainer = e.createEliminationContainer = e.createRoundRobinContainer = e.createPopoverTitle = e.createTitle = void 0);
            const r = n(3886),
                o = n(1491);
            (e.createTitle = function (t) {
                const e = document.createElement("h1");
                return (e.innerText = t), e;
            }),
                (e.createPopoverTitle = function (t) {
                    const e = document.createElement("h4");
                    return (e.innerText = t), e;
                }),
                (e.createRoundRobinContainer = function (t) {
                    const e = document.createElement("div");
                    return e.classList.add("round-robin"), e.setAttribute("data-stage-id", t.toString()), e;
                }),
                (e.createEliminationContainer = function (t) {
                    const e = document.createElement("div");
                    return e.classList.add("elimination"), e.setAttribute("data-stage-id", t.toString()), e;
                }),
                (e.createBracketContainer = function (t, e) {
                    const n = document.createElement("section");
                    if ((n.classList.add("bracket"), t && n.setAttribute("data-group-id", t.toString()), e)) {
                        const t = document.createElement("h2");
                        (t.innerText = e), n.append(t);
                    }
                    return n;
                }),
                (e.createGroupContainer = function (t, e) {
                    const n = document.createElement("h2");
                    n.innerText = e;
                    const r = document.createElement("section");
                    return r.classList.add("group"), r.setAttribute("data-group-id", t.toString()), r.append(n), r;
                }),
                (e.createRoundsContainer = function () {
                    const t = document.createElement("div");
                    return t.classList.add("rounds"), t;
                }),
                (e.createRoundContainer = function (t, e) {
                    const n = document.createElement("h3");
                    n.innerText = e;
                    const r = document.createElement("article");
                    return r.classList.add("round"), r.setAttribute("data-round-id", t.toString()), r.append(n), r;
                }),
                (e.createMatchContainer = function (t) {
                    const e = document.createElement("div");
                    return (
                        e.classList.add("match"),
                        t && ((0, r.isMatchGame)(t) ? e.setAttribute("data-match-game-id", t.id.toString()) : e.setAttribute("data-match-id", t.id.toString()), e.setAttribute("data-match-status", t.status.toString())),
                        e
                    );
                }),
                (e.createMatchLabel = function (t, e, n) {
                    const r = document.createElement("span");
                    return (r.innerText = t || ""), (r.title = e), n && r.addEventListener("click", n), r;
                }),
                (e.createChildCountLabel = function (t, e) {
                    const n = document.createElement("span");
                    return (n.innerText = t), e && n.addEventListener("click", e), n;
                }),
                (e.createOpponentsContainer = function (t) {
                    const e = document.createElement("div");
                    return e.classList.add("opponents"), t && e.addEventListener("click", t), e;
                }),
                (e.createParticipantContainer = function (t) {
                    const e = document.createElement("div");
                    return e.classList.add("participant"), null != t && e.setAttribute("data-participant-id", t.toString()), e;
                }),
                (e.createNameContainer = function () {
                    const t = document.createElement("div");
                    return t.classList.add("name"), t;
                }),
                (e.createResultContainer = function () {
                    const t = document.createElement("div");
                    return t.classList.add("result"), t;
                }),
                (e.createTable = function () {
                    return document.createElement("table");
                }),
                (e.createRow = function () {
                    return document.createElement("tr");
                }),
                (e.createCell = function (t) {
                    const e = document.createElement("td");
                    return (e.innerText = String(t)), e;
                }),
                (e.createRankingHeaders = function (t) {
                    const e = document.createElement("tr"),
                        n = t[0];
                    for (const t in n) {
                        const n = t,
                            o = (0, r.rankingHeader)(n),
                            i = document.createElement("th");
                        (i.innerText = o.text), i.setAttribute("title", o.tooltip), e.append(i);
                    }
                    return e;
                }),
                (e.setupHint = function (t, e) {
                    t.classList.add("hint"), (t.innerText = e), (t.title = e);
                }),
                (e.setupBye = function (t) {
                    (t.innerText = (0, o.t)("common.bye")), t.classList.add("bye");
                }),
                (e.setupWin = function (t, e, n) {
                    n.result && "win" === n.result && (t.classList.add("win"), void 0 === n.score && (e.innerText = (0, o.t)("abbreviations.win")));
                }),
                (e.setupLoss = function (t, e, n) {
                    ((n.result && "loss" === n.result) || n.forfeit) && (t.classList.add("loss"), n.forfeit ? (e.innerText = (0, o.t)("abbreviations.forfeit")) : void 0 === n.score && (e.innerText = (0, o.t)("abbreviations.loss")));
                }),
                (e.addParticipantOrigin = function (t, e, n) {
                    const r = document.createElement("span");
                    "before" === n ? ((r.innerText = `${e} `), t.prepend(r)) : "after" === n && ((r.innerText = ` (${e})`), t.append(r));
                }),
                (e.addParticipantImage = function (t, e) {
                    const n = document.createElement("img");
                    (n.src = e), t.prepend(n);
                }),
                (e.getBracketConnection = function (t, e, n, r, o, i) {
                    var a, s, u;
                    const c = { connectPrevious: !1, connectNext: !1 };
                    return (
                        "loser_bracket" === o
                            ? ((c.connectPrevious = e > 1 && (e % 2 == 1 ? "square" : "straight")), (c.connectNext = e < n && (e % 2 == 0 ? "square" : "straight")))
                            : ((c.connectPrevious = e > 1 && "square"), (c.connectNext = e < n ? "square" : !!i && "straight")),
                        t ||
                        2 !== e ||
                        (("single_bracket" === o || "winner_bracket" === o) &&
                            void 0 === (null === (a = r.opponent1) || void 0 === a ? void 0 : a.position) &&
                            void 0 === (null === (s = r.opponent2) || void 0 === s ? void 0 : s.position) &&
                            (c.connectPrevious = !1),
                            "loser_bracket" === o && void 0 === (null === (u = r.opponent2) || void 0 === u ? void 0 : u.position) && (c.connectPrevious = !1)),
                        c
                    );
                }),
                (e.getFinalConnection = function (t, e, n) {
                    return { connectPrevious: "grand_final" === t && 1 === e && "straight", connectNext: 2 === n && 1 === e && "straight" };
                }),
                (e.setupConnection = function (t, e, n) {
                    n.connectPrevious && t.classList.add("connect-previous"),
                        n.connectNext && e.classList.add("connect-next"),
                        "straight" === n.connectPrevious && t.classList.add("straight"),
                        "straight" === n.connectNext && e.classList.add("straight");
                });
        },
        3886: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.isMatchGame = e.isMatch = e.getRanking = e.rankingHeader = e.isMajorRound = e.getOriginAbbreviation = e.completeWithBlankMatches = e.findRoot = e.sortBy = e.splitByWithLeftovers = e.splitBy = void 0);
            const r = n(1491);
            function o(t, e, n, r) {
                if (!n || null === n.id) return;
                const o = t[n.id] || { rank: 0, id: 0, played: 0, wins: 0, draws: 0, losses: 0, forfeits: 0, scoreFor: 0, scoreAgainst: 0, scoreDifference: 0, points: 0 };
                (o.id = n.id),
                    (n.forfeit || n.result) && o.played++,
                    "win" === n.result && o.wins++,
                    "draw" === n.result && o.draws++,
                    "loss" === n.result && o.losses++,
                    n.forfeit && o.forfeits++,
                    (o.scoreFor += n.score || 0),
                    (o.scoreAgainst += (r && r.score) || 0),
                    (o.scoreDifference = o.scoreFor - o.scoreAgainst),
                    (o.points = e(o)),
                    (t[n.id] = o);
            }
            function i(t) {
                return "child_count" in t;
            }
            (e.splitBy = function (t, e) {
                const n = {};
                for (const r of t) {
                    const t = r[e];
                    n[t] || (n[t] = []), n[t].push(r);
                }
                return Object.values(n);
            }),
                (e.splitByWithLeftovers = function (t, e) {
                    var n;
                    const r = {};
                    for (const o of t) {
                        const t = null !== (n = o[e]) && void 0 !== n ? n : "-1";
                        r[t] || (r[t] = []), r[t].push(o);
                    }
                    const o = [
                        ...Object.entries(r)
                            .filter(([t]) => "-1" !== t)
                            .map(([t, e]) => e),
                    ];
                    return (o[-1] = r[-1]), o;
                }),
                (e.sortBy = function (t, e) {
                    return [...t].sort((t, n) => t[e] - n[e]);
                }),
                (e.findRoot = function (t) {
                    const e = document.querySelectorAll(t || ".brackets-viewer");
                    if (0 === e.length) throw Error("Root not found. You must have at least one root element.");
                    if (e.length > 1) throw Error("Multiple possible roots were found. Please use `config.selector` to choose a specific root.");
                    const n = e[0];
                    if (!n.classList.contains("brackets-viewer")) throw Error("The selected root must have a `.brackets-viewer` class.");
                    return n;
                }),
                (e.completeWithBlankMatches = function (t, e, n) {
                    if (!n) return { matches: e, fromToornament: !1 };
                    let r = [];
                    return (
                        ("single_bracket" !== t && "winner_bracket" !== t) ||
                        (r = n
                            .map((t) => {
                                var e, n;
                                return [(null === (e = t.opponent1) || void 0 === e ? void 0 : e.position) || null, (null === (n = t.opponent2) || void 0 === n ? void 0 : n.position) || null];
                            })
                            .flat()),
                        "loser_bracket" === t &&
                        (r = n.map((t) => {
                            var e;
                            return (null === (e = t.opponent2) || void 0 === e ? void 0 : e.position) || null;
                        })),
                        0 === r.filter((t) => null !== t).length ? { matches: e, fromToornament: !1 } : { matches: r.map((t) => (t && e.find((e) => e.number === t)) || null), fromToornament: !0 }
                    );
                }),
                (e.getOriginAbbreviation = function (t, e, n, o) {
                    return (
                        (n = n || -1),
                        (e && "loser_bracket" === t && 1 === n) || "single_bracket" === t || ("winner_bracket" === t && 1 === n)
                            ? (0, r.t)("abbreviations.seed")
                            : "loser_bracket" === t && n % 2 == 0 && "opponent1" === o
                                ? (0, r.t)("abbreviations.position")
                                : null
                    );
                }),
                (e.isMajorRound = function (t) {
                    return 1 === t || t % 2 == 0;
                }),
                (e.rankingHeader = function (t) {
                    return (0, r.t)(`ranking.${t}`, { returnObjects: !0 });
                }),
                (e.getRanking = function (t, e) {
                    e = e || ((t) => 3 * t.wins + 1 * t.draws + 0 * t.losses);
                    const n = {};
                    for (const r of t) o(n, e, r.opponent1, r.opponent2), o(n, e, r.opponent2, r.opponent1);
                    return (function (t) {
                        const e = Object.values(t).sort((t, e) => (t.points !== e.points ? e.points - t.points : e.played - t.played)),
                            n = { value: 0, lastPoints: -1 };
                        for (const t of e) (t.rank = n.lastPoints !== t.points ? ++n.value : n.value), (n.lastPoints = t.points);
                        return e;
                    })(n);
                }),
                (e.isMatch = i),
                (e.isMatchGame = function (t) {
                    return !i(t);
                });
        },
        1491: function (t, e, n) {
            "use strict";
            var r =
                (this && this.__importDefault) ||
                function (t) {
                    return t && t.__esModule ? t : { default: t };
                };
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.getLoserBracketRoundName = e.getWinnerBracketRoundName = e.getRoundName = e.getBracketName = e.getGroupName = e.getMatchStatus = e.getFinalMatchLabel = e.getMatchLabel = e.getFinalOriginHint = e.getOriginHint = e.toI18nKey = e.t = e.addLocale = e.locales = void 0);
            const o = r(n(6073)),
                i = r(n(13)),
                a = n(7021),
                s = n(3886),
                u = r(n(9583)),
                c = r(n(8159));
            function l(t, e) {
                return o.default.t(t, e);
            }
            function d(t) {
                return t.replace("_", "-");
            }
            (e.locales = { en: u.default, fr: c.default }),
                o.default.use(i.default).init({ fallbackLng: "en", debug: !1, resources: { en: { translation: e.locales.en }, fr: { translation: e.locales.fr } } }),
                (e.addLocale = async function (t, e) {
                    o.default.addResourceBundle(t, "translation", e, !0, !0), await o.default.changeLanguage();
                }),
                (e.t = l),
                (e.toI18nKey = d),
                (e.getOriginHint = function (t, e, n, r) {
                    if (1 === t) {
                        if ("single_bracket" === r) return (t) => l("origin-hint.seed", { position: t });
                        if ("winner_bracket" === r) return (t) => l("origin-hint.seed", { position: t });
                        if ("loser_bracket" === r && n) return (t) => l("origin-hint.seed", { position: t });
                    }
                    if ((0, s.isMajorRound)(t) && "loser_bracket" === r) {
                        if (t === e - 2) return (t) => l("origin-hint.winner-bracket-semi-final", { position: t });
                        if (t === e) return () => l("origin-hint.winner-bracket-final");
                        const r = Math.ceil((t + 1) / 2);
                        return n ? (t) => l("origin-hint.winner-bracket", { round: r - 1, position: t }) : (t) => l("origin-hint.winner-bracket", { round: r, position: t });
                    }
                }),
                (e.getFinalOriginHint = function (t, e, n) {
                    return "single_elimination" === t
                        ? (t) => l("origin-hint.consolation-final", { position: t })
                        : "grand_final" === e
                            ? 1 === n
                                ? () => l("origin-hint.grand-final")
                                : void 0
                            : (t) => l(1 === t ? "origin-hint.double-elimination-consolation-final-opponent-1" : "origin-hint.double-elimination-consolation-final-opponent-2");
                }),
                (e.getMatchLabel = function (t, e, n, r) {
                    if (void 0 === e || void 0 === n || void 0 === r) return l("match-label.default", { matchNumber: t });
                    const o = l("winner_bracket" === r ? "match-label.winner-bracket" : "loser_bracket" === r ? "match-label.loser-bracket" : "match-label.standard-bracket"),
                        i = e === n - 1,
                        a = e === n;
                    if ("single_bracket" === r) {
                        if (i) return l("match-label.standard-bracket-semi-final", { matchNumber: t });
                        if (a) return l("match-label.standard-bracket-final");
                    }
                    return i
                        ? l("match-label.double-elimination-semi-final", { matchPrefix: o, matchNumber: t })
                        : a
                            ? l("match-label.double-elimination-final", { matchPrefix: o })
                            : l("match-label.double-elimination", { matchPrefix: o, roundNumber: e, matchNumber: t });
                }),
                (e.getFinalMatchLabel = function (t, e, n) {
                    return "consolation_final" === t ? l("match-label.consolation-final") : 1 === n ? l("match-label.grand-final-single") : l("match-label.grand-final", { roundNumber: e });
                }),
                (e.getMatchStatus = function (t) {
                    switch (t) {
                        case a.Status.Locked:
                            return l("match-status.locked");
                        case a.Status.Waiting:
                            return l("match-status.waiting");
                        case a.Status.Ready:
                            return l("match-status.ready");
                        case a.Status.Running:
                            return l("match-status.running");
                        case a.Status.Completed:
                            return l("match-status.completed");
                        case a.Status.Archived:
                            return l("match-status.archived");
                        default:
                            return "Unknown status";
                    }
                }),
                (e.getGroupName = function (t) {
                    return l("common.group-name", { groupNumber: t });
                }),
                (e.getBracketName = function (t, e) {
                    switch (e) {
                        case "winner_bracket":
                        case "loser_bracket":
                            return l(`common.group-name-${d(e)}`, { stage: t });
                        default:
                            return;
                    }
                }),
                (e.getRoundName = function ({ roundNumber: t, roundCount: e }, n) {
                    return t === e ? n("common.round-name-final") : n("common.round-name", { roundNumber: t });
                }),
                (e.getWinnerBracketRoundName = function ({ roundNumber: t, roundCount: e }, n) {
                    return t === e ? n("common.round-name-winner-bracket-final") : n("common.round-name-winner-bracket", { roundNumber: t });
                }),
                (e.getLoserBracketRoundName = function ({ roundNumber: t, roundCount: e }, n) {
                    return t === e ? n("common.round-name-loser-bracket-final") : n("common.round-name-loser-bracket", { roundNumber: t });
                });
        },
        825: function (t, e, n) {
            "use strict";
            var r =
                (this && this.__createBinding) ||
                (Object.create
                    ? function (t, e, n, r) {
                        void 0 === r && (r = n);
                        var o = Object.getOwnPropertyDescriptor(e, n);
                        (o && !("get" in o ? !e.__esModule : o.writable || o.configurable)) ||
                            (o = {
                                enumerable: !0,
                                get: function () {
                                    return e[n];
                                },
                            }),
                            Object.defineProperty(t, r, o);
                    }
                    : function (t, e, n, r) {
                        void 0 === r && (r = n), (t[r] = e[n]);
                    }),
                o =
                    (this && this.__setModuleDefault) ||
                    (Object.create
                        ? function (t, e) {
                            Object.defineProperty(t, "default", { enumerable: !0, value: e });
                        }
                        : function (t, e) {
                            t.default = e;
                        }),
                i =
                    (this && this.__importStar) ||
                    function (t) {
                        if (t && t.__esModule) return t;
                        var e = {};
                        if (null != t) for (var n in t) "default" !== n && Object.prototype.hasOwnProperty.call(t, n) && r(e, t, n);
                        return o(e, t), e;
                    };
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.BracketsViewer = void 0), n(1016);
            const a = n(7021),
                s = n(3886),
                u = i(n(7335)),
                c = i(n(1491)),
                l = n(9037);
            e.BracketsViewer = class {
                constructor() {
                    (this.participantRefs = {}),
                        (this.participants = []),
                        (this.participantImages = []),
                        (this.skipFirstRound = !1),
                        (this.alwaysConnectFirstRound = !1),
                        (this._onMatchClick = (t) => { }),
                        (this._onMatchLabelClick = (t) => { });
                }
                getRoundName(t, e) {
                    var n, r;
                    return (null === (r = (n = this.config).customRoundName) || void 0 === r ? void 0 : r.call(n, t, c.t)) || e(t, c.t);
                }
                set onMatchClicked(t) {
                    this._onMatchClick = t;
                }
                async render(t, e) {
                    var n, r, o, i, a, u, c, l, d, p;
                    if ("string" == typeof t) throw Error("Using a CSS selector as the first argument is deprecated. Please look here: https://github.com/Drarig29/brackets-viewer.js");
                    const f = document.createDocumentFragment();
                    if (
                        ((this.config = {
                            customRoundName: null == e ? void 0 : e.customRoundName,
                            participantOriginPlacement: null !== (n = null == e ? void 0 : e.participantOriginPlacement) && void 0 !== n ? n : "before",
                            separatedChildCountLabel: null !== (r = null == e ? void 0 : e.separatedChildCountLabel) && void 0 !== r && r,
                            showSlotsOrigin: null === (o = null == e ? void 0 : e.showSlotsOrigin) || void 0 === o || o,
                            showLowerBracketSlotsOrigin: null === (i = null == e ? void 0 : e.showLowerBracketSlotsOrigin) || void 0 === i || i,
                            showPopoverOnMatchLabelClick: null === (a = null == e ? void 0 : e.showPopoverOnMatchLabelClick) || void 0 === a || a,
                            highlightParticipantOnHover: null === (u = null == e ? void 0 : e.highlightParticipantOnHover) || void 0 === u || u,
                            showRankingTable: null === (c = null == e ? void 0 : e.showRankingTable) || void 0 === c || c,
                        }),
                            (null == e ? void 0 : e.onMatchClick) && (this._onMatchClick = e.onMatchClick),
                            (null == e ? void 0 : e.onMatchLabelClick) && (this._onMatchLabelClick = e.onMatchLabelClick),
                            !(null === (l = t.stages) || void 0 === l ? void 0 : l.length))
                    )
                        throw Error("The `data.stages` array is either empty or undefined");
                    if (!(null === (d = t.participants) || void 0 === d ? void 0 : d.length)) throw Error("The `data.participants` array is either empty or undefined");
                    if (!(null === (p = t.matches) || void 0 === p ? void 0 : p.length)) throw Error("The `data.matches` array is either empty or undefined");
                    (this.participants = t.participants),
                        t.participants.forEach((t) => (this.participantRefs[t.id] = [])),
                        (this.popover = document.createElement("div")),
                        this.popover.setAttribute("popover", "auto"),
                        this.popover.addEventListener("toggle", (t) => {
                            "closed" === t.newState && this.clearPreviousPopoverSelections();
                        }),
                        f.append(this.popover),
                        t.stages.forEach((e) =>
                            this.renderStage(f, {
                                ...t,
                                stages: [e],
                                matches: t.matches.filter((t) => t.stage_id === e.id).map((n) => ({ ...n, metadata: { stageType: e.type, games: t.matchGames.filter((t) => t.parent_id === n.id) } })),
                            })
                        );
                    const h = (0, s.findRoot)(null == e ? void 0 : e.selector);
                    (null == e ? void 0 : e.clear) && (h.innerHTML = ""), h.append(f);
                }
                updateMatch(t) {
                    var e, n, r, o, i, a;
                    const s = document.querySelector(`[data-match-id='${t.id}']`);
                    if (!s) throw Error("Match not found.");
                    s.setAttribute("data-match-status", t.status.toString());
                    const u = s.querySelector(".participant:nth-of-type(1) .result");
                    u && (null === (e = t.opponent1) || void 0 === e ? void 0 : e.score) && (u.innerHTML = null === (r = null === (n = t.opponent1) || void 0 === n ? void 0 : n.score) || void 0 === r ? void 0 : r.toString());
                    const c = s.querySelector(".participant:nth-of-type(2) .result");
                    c && (null === (o = t.opponent2) || void 0 === o ? void 0 : o.score) && (c.innerHTML = null === (a = null === (i = t.opponent2) || void 0 === i ? void 0 : i.score) || void 0 === a ? void 0 : a.toString());
                }
                setParticipantImages(t) {
                    this.participantImages = t;
                }
                async addLocale(t, e) {
                    await c.addLocale(t, e);
                }
                renderStage(t, e) {
                    var n;
                    const r = e.stages[0];
                    if (!(null === (n = e.matches) || void 0 === n ? void 0 : n.length)) throw Error(`No matches found for stage ${r.id}`);
                    const o = (0, s.splitByWithLeftovers)(e.matches, "group_id");
                    switch (((this.stage = r), (this.skipFirstRound = r.settings.skipFirstRound || !1), r.type)) {
                        case "round_robin":
                            this.renderRoundRobin(t, r, o);
                            break;
                        case "single_elimination":
                        case "double_elimination":
                            this.renderElimination(t, r, o);
                            break;
                        default:
                            throw Error(`Unknown bracket type: ${r.type}`);
                    }
                    this.renderConsolationMatches(t, r, o);
                }
                renderRoundRobin(t, e, n) {
                    const r = u.createRoundRobinContainer(e.id);
                    r.append(u.createTitle(e.name));
                    let o = 1;
                    for (const t of n) {
                        const e = t[0].group_id,
                            n = u.createGroupContainer(e, c.getGroupName(o++)),
                            i = (0, s.splitBy)(t, "round_id").map((t) => (0, s.sortBy)(t, "number"));
                        let a = 1;
                        for (const t of i) {
                            const e = t[0].round_id,
                                r = this.getRoundName({ roundNumber: a, roundCount: 0, groupType: c.toI18nKey("round_robin") }, c.getRoundName),
                                o = u.createRoundContainer(e, r);
                            for (const e of t) o.append(this.createMatch(e, !0));
                            n.append(o), a++;
                        }
                        this.config.showRankingTable && n.append(this.createRanking(t)), r.append(n);
                    }
                    t.append(r);
                }
                renderElimination(t, e, n) {
                    const r = u.createEliminationContainer(e.id);
                    r.append(u.createTitle(e.name)), "single_elimination" === e.type ? this.renderSingleElimination(r, n) : this.renderDoubleElimination(r, n), t.append(r);
                }
                renderConsolationMatches(t, e, n) {
                    const r = n[-1];
                    if (!(null == r ? void 0 : r.length)) return;
                    const o = u.createBracketContainer(void 0, c.t("common.consolation")),
                        i = u.createRoundsContainer();
                    let a = 0;
                    for (const t of r) i.append(this.createMatch({ ...t, metadata: { label: c.t("match-label.default", { matchNumber: ++a }), stageType: e.type, games: [] } }, !0));
                    o.append(i), t.append(o);
                }
                renderSingleElimination(t, e) {
                    const n = (0, s.splitBy)(e[0], "round_id").map((t) => (0, s.sortBy)(t, "number")),
                        { hasFinal: r, connectFinal: o, finalMatches: i } = this.getFinalInfoSingleElimination(e);
                    this.renderBracket(t, n, c.getRoundName, "single_bracket", o), r && this.renderFinal(t, "consolation_final", i);
                }
                renderDoubleElimination(t, e) {
                    const n = void 0 !== e[1],
                        r = (0, s.splitBy)(e[0], "round_id").map((t) => (0, s.sortBy)(t, "number")),
                        { hasFinal: o, connectFinal: i, grandFinalMatches: a, consolationFinalMatches: u } = this.getFinalInfoDoubleElimination(e);
                    if ((this.renderBracket(t, r, c.getWinnerBracketRoundName, "winner_bracket", i), n)) {
                        const n = (0, s.splitBy)(e[1], "round_id").map((t) => (0, s.sortBy)(t, "number"));
                        this.renderBracket(t, n, c.getLoserBracketRoundName, "loser_bracket");
                    }
                    o && (this.renderFinal(t, "grand_final", a), this.renderFinal(t, "consolation_final", u));
                }
                getFinalInfoSingleElimination(t) {
                    var e;
                    return { hasFinal: void 0 !== t[1], connectFinal: !1, finalMatches: (0, s.sortBy)(null !== (e = t[1]) && void 0 !== e ? e : [], "number") };
                }
                getFinalInfoDoubleElimination(t) {
                    var e;
                    const n = void 0 !== t[2],
                        r = (0, s.sortBy)(null !== (e = t[2]) && void 0 !== e ? e : [], "number"),
                        o = r.filter((t) => 1 === t.number),
                        i = r.filter((t) => 2 === t.number);
                    return { hasFinal: n, connectFinal: o.length > 0, grandFinalMatches: o, consolationFinalMatches: i };
                }
                renderBracket(t, e, n, r, o) {
                    const i = e[0][0].group_id,
                        a = e.length,
                        d = u.createBracketContainer(i, c.getBracketName(this.stage, r)),
                        p = u.createRoundsContainer(),
                        { matches: f, fromToornament: h } = (0, s.completeWithBlankMatches)(r, e[0], e[1]);
                    this.alwaysConnectFirstRound = !h;
                    for (let t = 0; t < e.length; t++) {
                        const i = e[t][0].round_id,
                            s = t + 1,
                            d = this.getRoundName({ roundNumber: s, roundCount: a, fractionOfFinal: l.helpers.getFractionOfFinal(s, a), groupType: c.toI18nKey(r) }, n),
                            g = u.createRoundContainer(i, d),
                            m = h && 1 === s ? f : e[t];
                        for (const t of m) g.append((t && this.createBracketMatch({ ...t, metadata: { ...t.metadata, roundNumber: s, roundCount: a, matchLocation: r, connectFinal: o } })) || this.skipBracketMatch());
                        p.append(g);
                    }
                    d.append(p), t.append(d);
                }
                renderFinal(t, e, n) {
                    if (0 === n.length) return;
                    const r = t.querySelector(".bracket .rounds");
                    if (!r) throw Error("Upper bracket not found.");
                    const o = n[0].opponent1,
                        i = null === (null == o ? void 0 : o.id) || "win" === (null == o ? void 0 : o.result) ? 1 : 2,
                        a = n.slice(0, i),
                        s = a.length,
                        l = ({ roundNumber: t, roundCount: n }) => c.getFinalMatchLabel(e, t, n);
                    for (let t = 0; t < a.length; t++) {
                        const n = t + 1,
                            o = this.getRoundName({ roundNumber: n, roundCount: s, groupType: c.toI18nKey("final_group"), finalType: c.toI18nKey(e) }, l),
                            i = { ...a[t], metadata: { ...a[t].metadata, roundNumber: n, roundCount: s, matchLocation: "final_group" } },
                            d = u.createRoundContainer(i.round_id, o);
                        d.append(this.createFinalMatch(e, i)), r.append(d);
                    }
                }
                createRanking(t) {
                    const e = u.createTable(),
                        n = (0, s.getRanking)(t);
                    e.append(u.createRankingHeaders(n));
                    for (const t of n) e.append(this.createRankingRow(t));
                    return e;
                }
                createRankingRow(t) {
                    const e = u.createRow(),
                        n = 0 === t.played;
                    for (const r in t) {
                        const o = r,
                            i = t[o];
                        if ("id" === o) {
                            const t = this.participants.find((t) => t.id === i);
                            if (void 0 !== t) {
                                const n = u.createCell(t.name);
                                this.setupMouseHover(t.id, n, !0), e.append(n);
                                continue;
                            }
                        }
                        !n || ("rank" !== o && "points" !== o) ? e.append(u.createCell(i)) : e.append(u.createCell("-"));
                    }
                    return e;
                }
                createBracketMatch(t) {
                    const { roundNumber: e, roundCount: n, matchLocation: r, connectFinal: o } = t.metadata;
                    if (void 0 === e || void 0 === n || void 0 === r) throw Error(`The match's internal data is missing roundNumber, roundCount or matchLocation: ${JSON.stringify(t)}`);
                    const i = u.getBracketConnection(this.alwaysConnectFirstRound, e, n, t, r, o),
                        a = c.getMatchLabel(t.number, e, n, r),
                        s = c.getOriginHint(e, n, this.skipFirstRound, r);
                    return (t.metadata.connection = i), (t.metadata.label = a), (t.metadata.originHint = s), this.createMatch(t, !0);
                }
                createFinalMatch(t, e) {
                    const { roundNumber: n, roundCount: r } = e.metadata;
                    if (void 0 === n || void 0 === r) throw Error(`The match's internal data is missing roundNumber or roundCount: ${JSON.stringify(e)}`);
                    const o = u.getFinalConnection(t, n, r),
                        i = c.getFinalMatchLabel(t, n, r),
                        a = c.getFinalOriginHint(e.metadata.stageType, t, n);
                    return (e.metadata.connection = o), (e.metadata.label = i), (e.metadata.originHint = a), this.createMatch(e, !0);
                }
                skipBracketMatch() {
                    const t = u.createMatchContainer(),
                        e = u.createOpponentsContainer(),
                        n = this.createParticipant(null, !0),
                        r = this.createParticipant(null, !0);
                    return e.append(n, r), t.append(e), (t.style.visibility = "hidden"), t;
                }
                createMatch(t, e) {
                    const n = u.createMatchContainer(t),
                        r = (0, s.isMatch)(t) ? u.createOpponentsContainer(() => this._onMatchClick(t)) : u.createOpponentsContainer();
                    if (((0, s.isMatch)(t) && t.status >= a.Status.Completed && (t.metadata.originHint = void 0), (0, s.isMatch)(t))) {
                        const { originHint: n, matchLocation: o, roundNumber: i } = t.metadata,
                            a = this.createParticipant(t.opponent1, e, "opponent1", n, o, i),
                            s = this.createParticipant(t.opponent2, e, "opponent2", n, o, i);
                        this.renderMatchLabel(r, t), r.append(a, s);
                    } else {
                        const n = this.createParticipant(t.opponent1, e, "opponent1"),
                            o = this.createParticipant(t.opponent2, e, "opponent2");
                        this.renderMatchLabel(r, t), r.append(n, o);
                    }
                    if ((n.append(r), (0, s.isMatch)(t))) {
                        if (!t.metadata.connection) return n;
                        u.setupConnection(r, n, t.metadata.connection);
                    }
                    return n;
                }
                createParticipant(t, e, n, r, o, i) {
                    const a = { participant: u.createParticipantContainer(t && t.id), name: u.createNameContainer(), result: u.createResultContainer() };
                    return null == t ? u.setupBye(a.name) : this.renderParticipant(a, t, n, r, o, i), a.participant.append(a.name, a.result), t && null !== t.id && this.setupMouseHover(t.id, a.participant, e), a.participant;
                }
                renderParticipant(t, e, n, r, o, i) {
                    const a = this.participants.find((t) => t.id === e.id);
                    a ? ((t.name.innerText = a.name), t.participant.setAttribute("title", a.name), this.renderParticipantImage(t.name, a.id), this.renderParticipantOrigin(t.name, e, n, o, i)) : this.renderHint(t.name, e, r, o),
                        (t.result.innerText = `${void 0 === e.score ? "-" : e.score}`),
                        u.setupWin(t.participant, t.result, e),
                        u.setupLoss(t.participant, t.result, e);
                }
                renderParticipantImage(t, e) {
                    const n = this.participantImages.find((t) => t.participantId === e);
                    n && u.addParticipantImage(t, n.imageUrl);
                }
                renderMatchLabel(t, e) {
                    const { label: n } = e.metadata;
                    if ((0, s.isMatchGame)(e)) return void t.append(u.createMatchLabel(n, c.getMatchStatus(e.status)));
                    const r = (n) => {
                        n.stopPropagation(), this._onMatchLabelClick(e), e.child_count > 0 && this.config.showPopoverOnMatchLabelClick && (this.clearPreviousPopoverSelections(), t.classList.add("popover-selected"), this.showPopover(e));
                    };
                    if (this.config.separatedChildCountLabel)
                        return t.append(u.createMatchLabel(n, c.getMatchStatus(e.status), r)), void (e.child_count > 0 && t.append(u.createChildCountLabel(c.t("common.best-of-x", { x: e.child_count }), r)));
                    if (e.child_count > 0) {
                        const o = c.t("common.best-of-x", { x: e.child_count }),
                            i = n ? `${n}, ${o}` : o;
                        t.append(u.createMatchLabel(i, c.getMatchStatus(e.status), r));
                    }
                }
                showPopover(t) {
                    this.popover.innerText = "";
                    const { roundNumber: e, roundCount: n, matchLocation: r } = t.metadata,
                        o = c.getMatchLabel(t.number, e, n, r),
                        i = u.createPopoverTitle(o);
                    this.popover.append(i);
                    for (const e of t.metadata.games) {
                        const t = c.t("match-label.match-game", { gameNumber: e.number }),
                            n = this.createMatch({ ...e, metadata: { label: t } }, !1);
                        this.popover.append(n);
                    }
                    try {
                        this.popover.togglePopover();
                    } catch { }
                }
                renderHint(t, e, n, r) {
                    void 0 !== n && void 0 !== e.position && this.config.showSlotsOrigin && (this.config.showLowerBracketSlotsOrigin || "loser_bracket" !== r) && u.setupHint(t, n(e.position));
                }
                renderParticipantOrigin(t, e, n, r, o) {
                    if (void 0 === e.position || void 0 === r) return;
                    if (!this.config.participantOriginPlacement || "none" === this.config.participantOriginPlacement) return;
                    if (!this.config.showSlotsOrigin) return;
                    if (!this.config.showLowerBracketSlotsOrigin && "loser_bracket" === r) return;
                    const i = (0, s.getOriginAbbreviation)(r, this.skipFirstRound, o, n);
                    if (!i) return;
                    const a = `${i}${e.position}`;
                    u.addParticipantOrigin(t, a, this.config.participantOriginPlacement);
                }
                setupMouseHover(t, e, n) {
                    if (!this.config.highlightParticipantOnHover) return;
                    const r = (t) => {
                        e.addEventListener("mouseenter", () => {
                            t.forEach((t) => t.classList.add("hover"));
                        }),
                            e.addEventListener("mouseleave", () => {
                                t.forEach((t) => t.classList.remove("hover"));
                            });
                    };
                    if (!n) return void r([e]);
                    const o = this.participantRefs[t];
                    if (!o) throw Error(`The participant (id: ${t}) does not exist in the participants table.`);
                    o.push(e), r(o);
                }
                clearPreviousPopoverSelections() {
                    var t;
                    null === (t = document.querySelector(".opponents.popover-selected")) || void 0 === t || t.classList.remove("popover-selected");
                }
            };
        },
        945: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.BaseGetter = void 0);
            const r = n(4487);
            e.BaseGetter = class {
                constructor(t) {
                    this.storage = t;
                }
                async getOrderedRounds(t) {
                    if (!(null == t ? void 0 : t.settings.size)) throw Error("The stage has no size.");
                    return "single_elimination" === t.type ? this.getOrderedRoundsSingleElimination(t.id) : this.getOrderedRoundsDoubleElimination(t.id);
                }
                async getOrderedRoundsSingleElimination(t) {
                    return [await this.getUpperBracketFirstRound(t)];
                }
                async getOrderedRoundsDoubleElimination(t) {
                    const e = await this.storage.select("round", { stage_id: t });
                    if (!e) throw Error("Error getting rounds.");
                    const n = await this.getLoserBracket(t);
                    if (!n) throw Error("Loser bracket not found.");
                    const o = e[0],
                        i = e.filter((t) => t.group_id === n.id);
                    return [o, ...i.filter((t) => r.isOrderingSupportedLoserBracket(t.number, i.length))];
                }
                async getRoundPositionalInfo(t) {
                    const e = await this.storage.select("round", t);
                    if (!e) throw Error("Round not found.");
                    const n = await this.storage.select("round", { group_id: e.group_id });
                    if (!n) throw Error("Error getting rounds.");
                    return { roundNumber: e.number, roundCount: n.length };
                }
                async getPreviousMatches(t, e, n, r) {
                    return "loser_bracket" === e ? this.getPreviousMatchesLB(t, n, r) : "final_group" === e ? this.getPreviousMatchesFinal(t, n, r) : 1 === r ? [] : this.getMatchesBeforeMajorRound(t, r);
                }
                async getPreviousMatchesFinal(t, e, n) {
                    return "single_elimination" === e.type ? this.getPreviousMatchesFinalSingleElimination(t, e) : this.getPreviousMatchesFinalDoubleElimination(t, n);
                }
                async getPreviousMatchesFinalSingleElimination(t, e) {
                    const n = await this.getUpperBracket(t.stage_id),
                        o = r.getUpperBracketRoundCount(e.settings.size),
                        i = await this.storage.selectFirst("round", { group_id: n.id, number: o - 1 });
                    if (!i) throw Error("Semi finals round not found.");
                    const a = await this.storage.select("match", { round_id: i.id });
                    if (!a) throw Error("Error getting semi final matches.");
                    return a;
                }
                async getPreviousMatchesFinalDoubleElimination(t, e) {
                    if (e > 1) return [await this.findMatch(t.group_id, e - 1, 1)];
                    const n = await this.getUpperBracket(t.stage_id),
                        r = await this.getLastRound(n.id),
                        o = await this.storage.selectFirst("match", { round_id: r.id, number: 1 });
                    if (!o) throw Error("Match not found.");
                    const i = await this.getLoserBracket(t.stage_id);
                    if (!i) throw Error("Loser bracket not found.");
                    const a = await this.getLastRound(i.id),
                        s = await this.storage.selectFirst("match", { round_id: a.id, number: 1 });
                    if (!s) throw Error("Match not found.");
                    return [o, s];
                }
                async getPreviousMatchesLB(t, e, n) {
                    if (e.settings.skipFirstRound && 1 === n) return [];
                    if (r.hasBye(t)) return [];
                    const o = await this.getUpperBracket(t.stage_id),
                        i = Math.ceil((n + 1) / 2),
                        a = e.settings.skipFirstRound ? i - 1 : i;
                    return 1 === n ? this.getMatchesBeforeFirstRoundLB(t, o.id, a) : n % 2 == 0 ? this.getMatchesBeforeMinorRoundLB(t, o.id, n, a) : this.getMatchesBeforeMajorRound(t, n);
                }
                async getMatchesBeforeMajorRound(t, e) {
                    return [await this.findMatch(t.group_id, e - 1, 2 * t.number - 1), await this.findMatch(t.group_id, e - 1, 2 * t.number)];
                }
                async getMatchesBeforeFirstRoundLB(t, e, n) {
                    return [await this.findMatch(e, n, r.getOriginPosition(t, "opponent1")), await this.findMatch(e, n, r.getOriginPosition(t, "opponent2"))];
                }
                async getMatchesBeforeMinorRoundLB(t, e, n, o) {
                    const i = r.getOriginPosition(t, "opponent1");
                    return [await this.findMatch(e, o, i), await this.findMatch(t.group_id, n - 1, t.number)];
                }
                async getNextMatches(t, e, n, r, o) {
                    switch (e) {
                        case "single_bracket":
                            return this.getNextMatchesUpperBracket(t, n.type, r, o);
                        case "winner_bracket":
                            return this.getNextMatchesWB(t, n, r, o);
                        case "loser_bracket":
                            return this.getNextMatchesLB(t, n.type, r, o);
                        case "final_group":
                            return this.getNextMatchesFinal(t, r, o);
                        default:
                            throw Error("Unknown bracket kind.");
                    }
                }
                async getNextMatchesWB(t, e, n, o) {
                    const i = await this.getLoserBracket(t.stage_id);
                    if (null === i) return [];
                    const a = e.settings.skipFirstRound ? n + 1 : n,
                        s = a > 1 ? 2 * (a - 1) : 1,
                        u = e.settings.size,
                        c = r.getLoserOrdering(e.settings.seedOrdering, s),
                        l = r.findLoserMatchNumber(u, s, t.number, c);
                    return [...(await this.getNextMatchesUpperBracket(t, e.type, n, o)), await this.findMatch(i.id, s, l)];
                }
                async getNextMatchesUpperBracket(t, e, n, r) {
                    return "single_elimination" === e
                        ? this.getNextMatchesUpperBracketSingleElimination(t, e, n, r)
                        : "double_elimination" === e && n === r
                            ? [await this.getFirstMatchFinal(t, e)]
                            : [await this.getDiagonalMatch(t.group_id, n, t.number)];
                }
                async getNextMatchesUpperBracketSingleElimination(t, e, n, r) {
                    if (n === r - 1) {
                        const r = await this.getFirstMatchFinal(t, e);
                        return [await this.getDiagonalMatch(t.group_id, n, t.number), ...(r ? [r] : [])];
                    }
                    return n === r ? [] : [await this.getDiagonalMatch(t.group_id, n, t.number)];
                }
                async getNextMatchesLB(t, e, n, r) {
                    if (n === r) {
                        const n = await this.getFirstMatchFinal(t, e);
                        return n ? [n] : [];
                    }
                    return n % 2 == 1 ? this.getMatchAfterMajorRoundLB(t, n) : this.getMatchAfterMinorRoundLB(t, n);
                }
                async getFirstMatchFinal(t, e) {
                    const n = await this.getFinalGroupId(t.stage_id, e);
                    return null === n ? null : this.findMatch(n, 1, 1);
                }
                async getNextMatchesFinal(t, e, n) {
                    return e === n ? [] : [await this.findMatch(t.group_id, e + 1, 1)];
                }
                async getMatchAfterMajorRoundLB(t, e) {
                    return [await this.getParallelMatch(t.group_id, e, t.number)];
                }
                async getMatchAfterMinorRoundLB(t, e) {
                    return [await this.getDiagonalMatch(t.group_id, e, t.number)];
                }
                static getSeedingOrdering(t, e) {
                    return "round_robin" === t ? e.getRoundRobinOrdering() : e.getStandardBracketFirstRoundOrdering();
                }
                async getSeedingMatches(t, e) {
                    if ("round_robin" === e) return this.storage.select("match", { stage_id: t });
                    try {
                        const e = await this.getUpperBracketFirstRound(t);
                        return this.storage.select("match", { round_id: e.id });
                    } catch {
                        return [];
                    }
                }
                async getUpperBracketFirstRound(t) {
                    const e = await this.storage.selectFirst("round", { stage_id: t, number: 1 }, !1);
                    if (!e) throw Error("Round not found.");
                    return e;
                }
                async getLastRound(t) {
                    const e = await this.storage.selectLast("round", { group_id: t }, !1);
                    if (!e) throw Error("Error getting rounds.");
                    return e;
                }
                async getFinalGroupId(t, e) {
                    const n = "single_elimination" === e ? 2 : 3,
                        r = await this.storage.selectFirst("group", { stage_id: t, number: n });
                    return r ? r.id : null;
                }
                async getUpperBracket(t) {
                    const e = await this.storage.selectFirst("group", { stage_id: t, number: 1 });
                    if (!e) throw Error("Winner bracket not found.");
                    return e;
                }
                async getLoserBracket(t) {
                    return this.storage.selectFirst("group", { stage_id: t, number: 2 });
                }
                async getDiagonalMatch(t, e, n) {
                    return this.findMatch(t, e + 1, r.getDiagonalMatchNumber(n));
                }
                async getParallelMatch(t, e, n) {
                    return this.findMatch(t, e + 1, n);
                }
                async findMatch(t, e, n) {
                    const r = await this.storage.selectFirst("round", { group_id: t, number: e });
                    if (!r) throw Error("Round not found.");
                    const o = await this.storage.selectFirst("match", { round_id: r.id, number: n });
                    if (!o) throw Error("Match not found.");
                    return o;
                }
                async findMatchGame(t) {
                    if (void 0 !== t.id) {
                        const e = await this.storage.select("match_game", t.id);
                        if (!e) throw Error("Match game not found.");
                        return e;
                    }
                    if (void 0 !== t.parent_id && t.number) {
                        const e = await this.storage.selectFirst("match_game", { parent_id: t.parent_id, number: t.number });
                        if (!e) throw Error("Match game not found.");
                        return e;
                    }
                    throw Error("No match game id nor parent id and number given.");
                }
            };
        },
        4267: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.StageCreator = e.create = void 0);
            const r = n(2644),
                o = n(4487);
            e.create = async function (t) {
                return new i(this.storage, t).run();
            };
            class i {
                constructor(t, e) {
                    if (
                        ((this.storage = t),
                            (this.stage = e),
                            (this.stage.settings = this.stage.settings || {}),
                            (this.seedOrdering = this.stage.settings.seedOrdering || []),
                            (this.updateMode = !1),
                            (this.enableByesInUpdate = !1),
                            !this.stage.name)
                    )
                        throw Error("You must provide a name for the stage.");
                    if (void 0 === this.stage.tournamentId) throw Error("You must provide a tournament id for the stage.");
                    "round_robin" === e.type && (this.stage.settings.roundRobinMode = this.stage.settings.roundRobinMode || "simple"),
                        "single_elimination" === e.type && (this.stage.settings.consolationFinal = this.stage.settings.consolationFinal || !1),
                        "double_elimination" === e.type && (this.stage.settings.grandFinal = this.stage.settings.grandFinal || "none"),
                        (this.stage.settings.matchesChildCount = this.stage.settings.matchesChildCount || 0);
                }
                async run() {
                    let t;
                    switch (this.stage.type) {
                        case "round_robin":
                            t = await this.roundRobin();
                            break;
                        case "single_elimination":
                            t = await this.singleElimination();
                            break;
                        case "double_elimination":
                            t = await this.doubleElimination();
                            break;
                        default:
                            throw Error("Unknown stage type.");
                    }
                    if (-1 === t.id) throw Error("Something went wrong when creating the stage.");
                    return await this.ensureSeedOrdering(t.id), t;
                }
                setExisting(t, e) {
                    (this.updateMode = !0), (this.currentStageId = t), (this.enableByesInUpdate = e);
                }
                async roundRobin() {
                    const t = await this.getRoundRobinGroups(),
                        e = await this.createStage();
                    for (let n = 0; n < t.length; n++) await this.createRoundRobinGroup(e.id, n + 1, t[n]);
                    return e;
                }
                async singleElimination() {
                    var t, e;
                    if (Array.isArray(null === (t = this.stage.settings) || void 0 === t ? void 0 : t.seedOrdering) && 1 !== (null === (e = this.stage.settings) || void 0 === e ? void 0 : e.seedOrdering.length))
                        throw Error("You must specify one seed ordering method.");
                    const n = await this.getSlots(),
                        o = await this.createStage(),
                        i = this.getStandardBracketFirstRoundOrdering(),
                        a = r.ordering[i](n),
                        { losers: s } = await this.createStandardBracket(o.id, 1, a);
                    return await this.createConsolationFinal(o.id, s), o;
                }
                async doubleElimination() {
                    var t;
                    if (this.stage.settings && Array.isArray(this.stage.settings.seedOrdering) && this.stage.settings.seedOrdering.length < 1) throw Error("You must specify at least one seed ordering method.");
                    const e = await this.getSlots(),
                        n = await this.createStage(),
                        o = this.getStandardBracketFirstRoundOrdering(),
                        i = r.ordering[o](e);
                    return (null === (t = this.stage.settings) || void 0 === t ? void 0 : t.skipFirstRound) ? await this.createDoubleEliminationSkipFirstRound(n.id, i) : await this.createDoubleElimination(n.id, i), n;
                }
                async createDoubleEliminationSkipFirstRound(t, e) {
                    var n;
                    const { even: r, odd: i } = o.splitByParity(e),
                        { losers: a, winner: s } = await this.createStandardBracket(t, 1, r);
                    if (o.isDoubleEliminationNecessary(null === (n = this.stage.settings) || void 0 === n ? void 0 : n.size)) {
                        const e = await this.createLowerBracket(t, 2, [i, ...a]);
                        await this.createGrandFinal(t, s, e);
                    }
                }
                async createDoubleElimination(t, e) {
                    var n;
                    const { losers: r, winner: i } = await this.createStandardBracket(t, 1, e);
                    if (o.isDoubleEliminationNecessary(null === (n = this.stage.settings) || void 0 === n ? void 0 : n.size)) {
                        const e = await this.createLowerBracket(t, 2, r);
                        await this.createGrandFinal(t, i, e);
                    }
                }
                async createRoundRobinGroup(t, e, n) {
                    var r;
                    const i = await this.insertGroup({ stage_id: t, number: e });
                    if (-1 === i) throw Error("Could not insert the group.");
                    const a = o.makeRoundRobinMatches(n, null === (r = this.stage.settings) || void 0 === r ? void 0 : r.roundRobinMode);
                    for (let e = 0; e < a.length; e++) await this.createRound(t, i, e + 1, a[0].length, a[e]);
                }
                async createStandardBracket(t, e, n) {
                    const r = o.getUpperBracketRoundCount(n.length),
                        i = await this.insertGroup({ stage_id: t, number: e });
                    if (-1 === i) throw Error("Could not insert the group.");
                    let a = o.makePairs(n),
                        s = 1;
                    const u = [];
                    for (let e = r - 1; e >= 0; e--) {
                        const n = Math.pow(2, e);
                        (a = this.getCurrentDuels(a, n)), u.push(a.map(o.byeLoser)), await this.createRound(t, i, s++, n, a);
                    }
                    return { losers: u, winner: o.byeWinner(a[0]) };
                }
                async createLowerBracket(t, e, n) {
                    var i;
                    const a = null === (i = this.stage.settings) || void 0 === i ? void 0 : i.size,
                        s = o.getRoundPairCount(a);
                    let u = 0;
                    const c = this.getMajorOrdering(a),
                        l = r.ordering[c](n[u++]),
                        d = await this.insertGroup({ stage_id: t, number: e });
                    if (-1 === d) throw Error("Could not insert the group.");
                    let p = o.makePairs(l),
                        f = 1;
                    for (let e = 0; e < s; e++) {
                        const r = Math.pow(2, s - e - 1);
                        (p = this.getCurrentDuels(p, r, !0)), await this.createRound(t, d, f++, r, p);
                        const o = this.getMinorOrdering(a, e, s);
                        (p = this.getCurrentDuels(p, r, !1, n[u++], o)), await this.createRound(t, d, f++, r, p);
                    }
                    return o.byeWinnerToGrandFinal(p[0]);
                }
                async createUniqueMatchBracket(t, e, n) {
                    const r = await this.insertGroup({ stage_id: t, number: e });
                    if (-1 === r) throw Error("Could not insert the group.");
                    for (let e = 0; e < n.length; e++) await this.createRound(t, r, e + 1, 1, [n[e]]);
                }
                async createRound(t, e, n, r, o) {
                    const i = this.getMatchesChildCount(),
                        a = await this.insertRound({ number: n, stage_id: t, group_id: e });
                    if (-1 === a) throw Error("Could not insert the round.");
                    for (let n = 0; n < r; n++) await this.createMatch(t, e, a, n + 1, o[n], i);
                }
                async createMatch(t, e, n, r, i, a) {
                    const s = o.toResultWithPosition(i[0]),
                        u = o.toResultWithPosition(i[1]);
                    if ("round_robin" === this.stage.type && null === s && null === u) return;
                    let c = null,
                        l = o.getMatchStatus(i);
                    if (this.updateMode) {
                        c = await this.storage.selectFirst("match", { round_id: n, number: r });
                        const t = null == c ? void 0 : c.child_count;
                        if (((a = void 0 === t ? a : t), c)) {
                            const t = o.getMatchStatus(c);
                            t > l && (l = t);
                        }
                    }
                    const d = await this.insertMatch({ number: r, stage_id: t, group_id: e, round_id: n, child_count: a, status: l, opponent1: s, opponent2: u }, c);
                    if (-1 === d) throw Error("Could not insert the match.");
                    for (let e = 0; e < a; e++)
                        if (-1 === (await this.insertMatchGame({ number: e + 1, stage_id: t, parent_id: d, status: l, opponent1: o.toResult(i[0]), opponent2: o.toResult(i[1]) }))) throw Error("Could not insert the match game.");
                }
                getCurrentDuels(t, e, n, r, i) {
                    return (void 0 !== n && !n) || t.length !== e ? (void 0 === n || n ? o.transitionToMajor(t) : o.transitionToMinor(t, r, i)) : t;
                }
                async getSlots(t) {
                    var e;
                    let n = this.stage.seedingIds || this.stage.seeding;
                    const r = (null === (e = this.stage.settings) || void 0 === e ? void 0 : e.size) || (null == n ? void 0 : n.length) || 0;
                    if ((o.ensureValidSize(this.stage.type, r), r && !n)) return Array.from(Array(r), (t, e) => ({ id: null, position: e + 1 }));
                    if (!n) throw Error("Either size or seeding must be given.");
                    return (
                        (this.stage.settings = { ...this.stage.settings, size: r }),
                        o.ensureNoDuplicates(n),
                        (n = o.fixSeeding(n, r)),
                        "round_robin" !== this.stage.type && this.stage.settings.balanceByes && (n = o.balanceByes(n, this.stage.settings.size)),
                        (this.stage.seeding = n),
                        void 0 !== this.stage.seedingIds || o.isSeedingWithIds(n) ? this.getSlotsUsingIds(n, t) : this.getSlotsUsingNames(n, t)
                    );
                }
                async getSlotsUsingNames(t, e) {
                    const n = o.extractParticipantsFromSeeding(this.stage.tournamentId, t);
                    if (!(await this.registerParticipants(n))) throw Error("Error registering the participants.");
                    const r = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
                    if (!r) throw Error("Error getting registered participant.");
                    return o.mapParticipantsNamesToDatabase(t, r, e);
                }
                async getSlotsUsingIds(t, e) {
                    const n = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
                    if (!n) throw Error("No available participants.");
                    return o.mapParticipantsIdsToDatabase(t, n, e);
                }
                async getStageNumber() {
                    const t = await this.storage.select("stage", { tournament_id: this.stage.tournamentId }),
                        e =
                            null == t
                                ? void 0
                                : t.map((t) => {
                                    var e;
                                    return null !== (e = t.number) && void 0 !== e ? e : 0;
                                });
                    if (void 0 !== this.stage.number) {
                        if (null == e ? void 0 : e.includes(this.stage.number)) throw Error("The given stage number already exists.");
                        return this.stage.number;
                    }
                    return (null == e ? void 0 : e.length) ? Math.max(...e) + 1 : 1;
                }
                getMatchesChildCount() {
                    var t;
                    return (null === (t = this.stage.settings) || void 0 === t ? void 0 : t.matchesChildCount) ? this.stage.settings.matchesChildCount : 0;
                }
                getOrdering(t, e, n) {
                    var r;
                    if (!(null === (r = this.stage.settings) || void 0 === r ? void 0 : r.seedOrdering)) return this.seedOrdering.push(n), n;
                    const o = this.stage.settings.seedOrdering[t];
                    if (!o) return this.seedOrdering.push(n), n;
                    if ("elimination" === e && o.match(/^groups\./)) throw Error("You must specify a seed ordering method without a 'groups' prefix");
                    if ("groups" === e && "natural" !== o && !o.match(/^groups\./)) throw Error("You must specify a seed ordering method with a 'groups' prefix");
                    return o;
                }
                async getRoundRobinGroups() {
                    var t, e, n, i, a;
                    if (void 0 === (null === (t = this.stage.settings) || void 0 === t ? void 0 : t.groupCount) || !Number.isInteger(this.stage.settings.groupCount)) throw Error("You must specify a group count for round-robin stages.");
                    if (this.stage.settings.groupCount <= 0) throw Error("You must provide a strictly positive group count.");
                    if (null === (e = this.stage.settings) || void 0 === e ? void 0 : e.manualOrdering) {
                        if ((null === (n = this.stage.settings) || void 0 === n ? void 0 : n.manualOrdering.length) !== (null === (i = this.stage.settings) || void 0 === i ? void 0 : i.groupCount))
                            throw Error("Group count in the manual ordering does not correspond to the given group count.");
                        const t = null === (a = this.stage.settings) || void 0 === a ? void 0 : a.manualOrdering.flat(),
                            e = await this.getSlots(t);
                        return o.makeGroups(e, this.stage.settings.groupCount);
                    }
                    if (Array.isArray(this.stage.settings.seedOrdering) && 1 !== this.stage.settings.seedOrdering.length) throw Error("You must specify one seed ordering method.");
                    const s = this.getRoundRobinOrdering(),
                        u = await this.getSlots(),
                        c = r.ordering[s](u, this.stage.settings.groupCount);
                    return o.makeGroups(c, this.stage.settings.groupCount);
                }
                getRoundRobinOrdering() {
                    return this.getOrdering(0, "groups", "groups.effort_balanced");
                }
                getStandardBracketFirstRoundOrdering() {
                    return this.getOrdering(0, "elimination", "inner_outer");
                }
                getMajorOrdering(t) {
                    var e;
                    return this.getOrdering(1, "elimination", (null === (e = r.defaultMinorOrdering[t]) || void 0 === e ? void 0 : e[0]) || "natural");
                }
                getMinorOrdering(t, e, n) {
                    var o;
                    if (e !== n - 1) return this.getOrdering(2 + e, "elimination", (null === (o = r.defaultMinorOrdering[t]) || void 0 === o ? void 0 : o[1 + e]) || "natural");
                }
                async insertStage(t) {
                    let e = null;
                    if (this.updateMode) {
                        if (((e = await this.storage.select("stage", this.currentStageId)), !e)) throw Error("Stage not found.");
                        const n = { ...e, ...t, settings: { ...e.settings, ...t.settings } };
                        if (!(await this.storage.update("stage", this.currentStageId, n))) throw Error("Could not update the stage.");
                    }
                    return e ? e.id : this.storage.insert("stage", t);
                }
                async insertGroup(t) {
                    let e = null;
                    return this.updateMode && (e = await this.storage.selectFirst("group", { stage_id: t.stage_id, number: t.number })), e ? e.id : this.storage.insert("group", t);
                }
                async insertRound(t) {
                    let e = null;
                    return this.updateMode && (e = await this.storage.selectFirst("round", { group_id: t.group_id, number: t.number })), e ? e.id : this.storage.insert("round", t);
                }
                async insertMatch(t, e) {
                    if (!e) return this.storage.insert("match", t);
                    const n = o.getUpdatedMatchResults(t, e, this.enableByesInUpdate);
                    if (!(await this.storage.update("match", e.id, n))) throw Error("Could not update the match.");
                    return e.id;
                }
                async insertMatchGame(t) {
                    let e = null;
                    if ((this.updateMode && (e = await this.storage.selectFirst("match_game", { parent_id: t.parent_id, number: t.number })), !e)) return this.storage.insert("match_game", t);
                    const n = o.getUpdatedMatchResults(t, e, this.enableByesInUpdate);
                    if (!(await this.storage.update("match_game", e.id, n))) throw Error("Could not update the match game.");
                    return e.id;
                }
                async registerParticipants(t) {
                    const e = await this.storage.select("participant", { tournament_id: this.stage.tournamentId });
                    if (!e || 0 === e.length) return this.storage.insert("participant", t);
                    for (const n of t) if (!e.some((t) => t.name === n.name) && -1 === (await this.storage.insert("participant", n))) return !1;
                    return !0;
                }
                async createStage() {
                    const t = await this.getStageNumber(),
                        e = { tournament_id: this.stage.tournamentId, name: this.stage.name, type: this.stage.type, number: t, settings: this.stage.settings || {} },
                        n = await this.insertStage(e);
                    if (-1 === n) throw Error("Could not insert the stage.");
                    return { ...e, id: n };
                }
                async createConsolationFinal(t, e) {
                    var n;
                    if (!(null === (n = this.stage.settings) || void 0 === n ? void 0 : n.consolationFinal)) return;
                    const r = e[e.length - 2];
                    await this.createUniqueMatchBracket(t, 2, [r]);
                }
                async createGrandFinal(t, e, n) {
                    var r;
                    const o = null === (r = this.stage.settings) || void 0 === r ? void 0 : r.grandFinal;
                    if ("none" === o) return;
                    const i = [[e, n]];
                    "double" === o && i.push([{ id: null }, { id: null }]), await this.createUniqueMatchBracket(t, 3, i);
                }
                async ensureSeedOrdering(t) {
                    var e, n;
                    if ((null === (n = null === (e = this.stage.settings) || void 0 === e ? void 0 : e.seedOrdering) || void 0 === n ? void 0 : n.length) === this.seedOrdering.length) return;
                    const r = await this.storage.select("stage", t);
                    if (!r) throw Error("Stage not found.");
                    const o = { ...r, settings: { ...r.settings, seedOrdering: this.seedOrdering } };
                    if (!(await this.storage.update("stage", t, o))) throw Error("Could not update the stage.");
                }
            }
            e.StageCreator = i;
        },
        3517: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.BaseUpdater = void 0);
            const r = n(7021),
                o = n(2644),
                i = n(4267),
                a = n(945),
                s = n(3576),
                u = n(4487);
            class c extends a.BaseGetter {
                async updateSeeding(t, { seeding: e, seedingIds: n }) {
                    var r, s;
                    const u = await this.storage.select("stage", t);
                    if (!u) throw Error("Stage not found.");
                    const l = null !== (s = null === (r = n || e) || void 0 === r ? void 0 : r.length) && void 0 !== s ? s : 0,
                        d = new i.StageCreator(this.storage, {
                            name: u.name,
                            tournamentId: u.tournament_id,
                            type: u.type,
                            settings: { ...u.settings, ...(0 === l ? {} : { size: l }) },
                            ...(n ? { seedingIds: n } : { seeding: null != e ? e : void 0 }),
                        });
                    d.setExisting(t, !1);
                    const p = a.BaseGetter.getSeedingOrdering(u.type, d),
                        f = await d.getSlots(),
                        h = await this.getSeedingMatches(u.id, u.type);
                    if (!h) throw Error("Error getting matches associated to the seeding.");
                    const g = o.ordering[p](f);
                    c.assertCanUpdateSeeding(h, g), await d.run();
                }
                async confirmCurrentSeeding(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    const n = new s.Get(this.storage),
                        r = await n.seeding(t),
                        o = u.convertSlotsToSeeding(r.map(u.convertTBDtoBYE)),
                        a = new i.StageCreator(this.storage, { name: e.name, tournamentId: e.tournament_id, type: e.type, settings: e.settings, seeding: o });
                    a.setExisting(t, !0), await a.run();
                }
                async updateParentMatch(t, e) {
                    const n = await this.storage.select("match", t);
                    if (!n) throw Error("Parent not found.");
                    const r = await this.storage.select("match_game", { parent_id: t });
                    if (!r) throw Error("No match games.");
                    const o = u.getChildGamesResults(r),
                        i = u.getParentMatchResults(n, o);
                    u.setParentMatchCompleted(i, n.child_count, e), await this.updateMatch(n, i, !0);
                }
                static assertCanUpdateSeeding(t, e) {
                    var n, o;
                    let i = 0;
                    for (const a of t) {
                        if (a.status === r.Status.Archived) throw Error("A match of round 1 is archived, which means round 2 was started.");
                        const t = e[i++],
                            s = e[i++];
                        if (
                            u.isMatchParticipantLocked(a) &&
                            ((null === (n = a.opponent1) || void 0 === n ? void 0 : n.id) !== (null == t ? void 0 : t.id) || (null === (o = a.opponent2) || void 0 === o ? void 0 : o.id) !== (null == s ? void 0 : s.id))
                        )
                            throw Error("A match is locked.");
                    }
                }
                async updateRelatedMatches(t, e, n) {
                    const { roundNumber: r, roundCount: o } = await this.getRoundPositionalInfo(t.round_id),
                        i = await this.storage.select("stage", t.stage_id);
                    if (!i) throw Error("Stage not found.");
                    const a = await this.storage.select("group", t.group_id);
                    if (!a) throw Error("Group not found.");
                    const s = u.getMatchLocation(i.type, a.number);
                    e && (await this.updatePrevious(t, s, i, r)), n && (await this.updateNext(t, s, i, r, o));
                }
                async updateMatch(t, e, n) {
                    if (!n && u.isMatchUpdateLocked(t)) throw Error("The match is locked.");
                    const r = await this.storage.select("stage", t.stage_id);
                    if (!r) throw Error("Stage not found.");
                    const o = u.isRoundRobin(r),
                        { statusChanged: i, resultChanged: a } = u.setMatchResults(t, e, o);
                    await this.applyMatchUpdate(t), (i || a) && (u.isRoundRobin(r) || (await this.updateRelatedMatches(t, i, a)));
                }
                async updateMatchGame(t, e) {
                    if (u.isMatchUpdateLocked(t)) throw Error("The match game is locked.");
                    const n = await this.storage.select("stage", t.stage_id);
                    if (!n) throw Error("Stage not found.");
                    const r = u.isRoundRobin(n);
                    if ((u.setMatchResults(t, e, r), !(await this.storage.update("match_game", t.id, t)))) throw Error("Could not update the match game.");
                    await this.updateParentMatch(t.parent_id, r);
                }
                async applyMatchUpdate(t) {
                    if (!(await this.storage.update("match", t.id, t))) throw Error("Could not update the match.");
                    if (0 === t.child_count) return;
                    const e = { opponent1: u.toResult(t.opponent1), opponent2: u.toResult(t.opponent2) };
                    if (((t.status <= r.Status.Ready || t.status === r.Status.Archived) && (e.status = t.status), !(await this.storage.update("match_game", { parent_id: t.id }, e)))) throw Error("Could not update the match game.");
                }
                async updatePrevious(t, e, n, o) {
                    const i = await this.getPreviousMatches(t, e, n, o);
                    0 !== i.length && (t.status >= r.Status.Running ? await this.archiveMatches(i) : await this.resetMatchesStatus(i));
                }
                async archiveMatches(t) {
                    for (const e of t) e.status !== r.Status.Archived && ((e.status = r.Status.Archived), await this.applyMatchUpdate(e));
                }
                async resetMatchesStatus(t) {
                    for (const e of t) (e.status = u.getMatchStatus(e)), await this.applyMatchUpdate(e);
                }
                async updateNext(t, e, n, o, i) {
                    const a = await this.getNextMatches(t, e, n, o, i);
                    if (0 === a.length) return void (t.status === r.Status.Completed && (await this.archiveMatches([t])));
                    const s = u.getMatchResult(t),
                        c = n.settings.skipFirstRound && "winner_bracket" === e ? o + 1 : o;
                    s ? await this.applyToNextMatches(u.setNextOpponent, t, e, c, i, a, s) : await this.applyToNextMatches(u.resetNextOpponent, t, e, c, i, a);
                }
                async applyToNextMatches(t, e, n, r, o, i, a) {
                    if ("final_group" === n) {
                        if (!i[0]) throw Error("First next match is null.");
                        return t(i[0], "opponent1", e, "opponent1"), t(i[0], "opponent2", e, "opponent2"), void (await this.applyMatchUpdate(i[0]));
                    }
                    const s = u.getNextSide(e.number, r, o, n);
                    if ((i[0] && (t(i[0], s, e, a), await this.propagateByeWinners(i[0])), 2 === i.length)) {
                        if (!i[1]) throw Error("Second next match is null.");
                        if ("single_bracket" === n) t(i[1], s, e, a && u.getOtherSide(a)), await this.applyMatchUpdate(i[1]);
                        else {
                            const n = u.getNextSideLoserBracket(e.number, i[1], r);
                            t(i[1], n, e, a && u.getOtherSide(a)), await this.propagateByeWinners(i[1]);
                        }
                    }
                }
                async propagateByeWinners(t) {
                    u.setMatchResults(t, t, !1), await this.applyMatchUpdate(t), u.hasBye(t) && (await this.updateRelatedMatches(t, !0, !0));
                }
            }
            e.BaseUpdater = c;
        },
        9765: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Create = void 0);
            const r = n(4267);
            e.Create = class {
                constructor(t) {
                    this.storage = t;
                }
                async stage(t) {
                    return new r.StageCreator(this.storage, t).run();
                }
            };
        },
        4378: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.Delete = void 0),
                (e.Delete = class {
                    constructor(t) {
                        this.storage = t;
                    }
                    async stage(t) {
                        if (!(await this.storage.delete("match_game", { stage_id: t }))) throw Error("Could not delete match games.");
                        if (!(await this.storage.delete("match", { stage_id: t }))) throw Error("Could not delete matches.");
                        if (!(await this.storage.delete("round", { stage_id: t }))) throw Error("Could not delete rounds.");
                        if (!(await this.storage.delete("group", { stage_id: t }))) throw Error("Could not delete groups.");
                        if (!(await this.storage.delete("stage", { id: t }))) throw Error("Could not delete the stage.");
                    }
                    async tournament(t) {
                        const e = await this.storage.select("stage", { tournament_id: t });
                        if (!e) throw Error("Error getting the stages.");
                        for (const t of e) await this.stage(t.id);
                    }
                });
        },
        4063: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Find = void 0);
            const r = n(945),
                o = n(4487);
            class i extends r.BaseGetter {
                async upperBracket(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    switch (e.type) {
                        case "round_robin":
                            throw Error("Round-robin stages do not have an upper bracket.");
                        case "single_elimination":
                        case "double_elimination":
                            return this.getUpperBracket(t);
                        default:
                            throw Error("Unknown stage type.");
                    }
                }
                async loserBracket(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    switch (e.type) {
                        case "round_robin":
                            throw Error("Round-robin stages do not have a loser bracket.");
                        case "single_elimination":
                            throw Error("Single elimination stages do not have a loser bracket.");
                        case "double_elimination":
                            const e = await this.getLoserBracket(t);
                            if (!e) throw Error("Loser bracket not found.");
                            return e;
                        default:
                            throw Error("Unknown stage type.");
                    }
                }
                async previousMatches(t, e) {
                    const n = await this.storage.select("match", t);
                    if (!n) throw Error("Match not found.");
                    const r = await this.storage.select("stage", n.stage_id);
                    if (!r) throw Error("Stage not found.");
                    const i = await this.storage.select("group", n.group_id);
                    if (!i) throw Error("Group not found.");
                    const a = await this.storage.select("round", n.round_id);
                    if (!a) throw Error("Round not found.");
                    const s = o.getMatchLocation(r.type, i.number),
                        u = await this.getPreviousMatches(n, s, r, a.number);
                    return void 0 !== e ? u.filter((t) => o.isParticipantInMatch(t, e)) : u;
                }
                async nextMatches(t, e) {
                    const n = await this.storage.select("match", t);
                    if (!n) throw Error("Match not found.");
                    const r = await this.storage.select("stage", n.stage_id);
                    if (!r) throw Error("Stage not found.");
                    const i = await this.storage.select("group", n.group_id);
                    if (!i) throw Error("Group not found.");
                    const { roundNumber: a, roundCount: s } = await this.getRoundPositionalInfo(n.round_id),
                        u = o.getMatchLocation(r.type, i.number),
                        c = o.getNonNull(await this.getNextMatches(n, u, r, a, s));
                    if (void 0 !== e) {
                        const t = o.getLoser(n);
                        if ("single_elimination" === r.type && (null == t ? void 0 : t.id) === e) return [];
                        if ("double_elimination" === r.type) {
                            const [r, i] = c;
                            if ((null == t ? void 0 : t.id) === e) return i ? [i] : [];
                            const a = o.getWinner(n);
                            if ((null == a ? void 0 : a.id) === e) return [r];
                            throw Error("The participant does not belong to this match.");
                        }
                    }
                    return c;
                }
                async match(t, e, n) {
                    return this.findMatch(t, e, n);
                }
                async matchGame(t) {
                    return this.findMatchGame(t);
                }
            }
            e.Find = i;
        },
        3576: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Get = void 0);
            const r = n(7021),
                o = n(945),
                i = n(4487);
            class a extends o.BaseGetter {
                async stageData(t) {
                    const e = await this.getStageSpecificData(t),
                        n = await this.storage.select("participant", { tournament_id: e.stage.tournament_id });
                    if (!n) throw Error("Error getting participants.");
                    return { stage: [e.stage], group: e.groups, round: e.rounds, match: e.matches, match_game: e.matchGames, participant: n };
                }
                async tournamentData(t) {
                    const e = await this.storage.select("stage", { tournament_id: t });
                    if (!e) throw Error("Error getting stages.");
                    const n = await Promise.all(e.map((t) => this.getStageSpecificData(t.id))),
                        r = await this.storage.select("participant", { tournament_id: t });
                    if (!r) throw Error("Error getting participants.");
                    return {
                        stage: e,
                        group: n.reduce((t, e) => [...t, ...e.groups], []),
                        round: n.reduce((t, e) => [...t, ...e.rounds], []),
                        match: n.reduce((t, e) => [...t, ...e.matches], []),
                        match_game: n.reduce((t, e) => [...t, ...e.matchGames], []),
                        participant: r,
                    };
                }
                async matchGames(t) {
                    const e = t.filter((t) => t.child_count > 0),
                        n = await Promise.all(e.map((t) => this.storage.select("match_game", { parent_id: t.id })));
                    if (n.some((t) => null === t)) throw Error("Error getting match games.");
                    return i.getNonNull(n).flat();
                }
                async currentStage(t) {
                    const e = await this.storage.select("stage", { tournament_id: t });
                    if (!e) throw Error("Error getting stages.");
                    for (const t of e) {
                        const e = await this.storage.select("match", { stage_id: t.id });
                        if (!e) throw Error("Error getting matches.");
                        if (!e.every((t) => t.status >= r.Status.Completed)) return t;
                    }
                    return null;
                }
                async currentRound(t) {
                    const e = await this.storage.select("match", { stage_id: t });
                    if (!e) throw Error("Error getting matches.");
                    const n = i.splitBy(e, "round_id");
                    for (const t of n) {
                        if (t.every((t) => t.status >= r.Status.Completed)) continue;
                        const e = await this.storage.select("round", t[0].round_id);
                        if (!e) throw Error("Round not found.");
                        return e;
                    }
                    return null;
                }
                async currentMatches(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    if ("single_elimination" !== e.type) throw Error("Not implemented for round robin and double elimination. Ask if needed.");
                    const n = await this.storage.select("match", { stage_id: t });
                    if (!n) throw Error("Error getting matches.");
                    const r = i.splitBy(n, "round_id"),
                        o = i.getUpperBracketRoundCount(e.settings.size);
                    let a = -1;
                    const s = [];
                    for (const t of r) {
                        if ((a++, e.settings.consolationFinal && a === o - 1)) {
                            const [e] = t,
                                [n] = r[a + 1],
                                o = [e, n];
                            return o.every((t) => !i.isMatchOngoing(t)) ? [] : o.filter((t) => i.isMatchOngoing(t));
                        }
                        t.every((t) => !i.isMatchOngoing(t)) || s.push(...t.filter((t) => i.isMatchOngoing(t)));
                    }
                    return s;
                }
                async seeding(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    const n = (t) => {
                        if (null === t) return null;
                        const { id: e, position: n } = t;
                        return { id: e, position: n };
                    };
                    return "round_robin" === e.type ? (await this.roundRobinSeeding(e)).map(n) : (await this.eliminationSeeding(e)).map(n);
                }
                async finalStandings(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    switch (e.type) {
                        case "round_robin":
                            throw Error("A round-robin stage does not have standings.");
                        case "single_elimination":
                            return this.singleEliminationStandings(t);
                        case "double_elimination":
                            return this.doubleEliminationStandings(t);
                        default:
                            throw Error("Unknown stage type.");
                    }
                }
                async roundRobinSeeding(t) {
                    if (void 0 === t.settings.size) throw Error("The size of the seeding is undefined.");
                    const e = await this.storage.select("match", { stage_id: t.id });
                    if (!e) throw Error("Error getting matches.");
                    const n = i.convertMatchesToSeeding(e);
                    if (n.length < t.settings.size) {
                        const e = t.settings.size - n.length;
                        for (let t = 0; t < e; t++) n.push(null);
                    }
                    const r = i.uniqueBy(n, (t) => t && t.position);
                    return i.setArraySize(r, t.settings.size, null);
                }
                async eliminationSeeding(t) {
                    const e = await this.storage.selectFirst("round", { stage_id: t.id, number: 1 }, !1);
                    if (!e) throw Error("Error getting the first round.");
                    const n = await this.storage.select("match", { round_id: e.id });
                    if (!n) throw Error("Error getting matches.");
                    return i.convertMatchesToSeeding(n);
                }
                async singleEliminationStandings(t) {
                    var e;
                    const n = [],
                        { stage: r, group: o, match: a, participant: u } = await this.stageData(t),
                        [c] = r,
                        [l, d] = o,
                        p = a.filter((t) => t.group_id === l.id).pop();
                    if (!p) throw Error("Final not found.");
                    n[0] = [i.findParticipant(u, s(p))];
                    const f = i.getLosers(
                        u,
                        a.filter((t) => t.group_id === l.id)
                    );
                    if ((n.push(...f.reverse()), null === (e = c.settings) || void 0 === e ? void 0 : e.consolationFinal)) {
                        const t = a.filter((t) => t.group_id === d.id).pop();
                        if (!t) throw Error("Consolation final not found.");
                        const e = i.findParticipant(u, s(t)),
                            r = i.findParticipant(u, i.getLoser(t));
                        n.splice(2, 1, [e], [r]);
                    }
                    return i.makeFinalStandings(n);
                }
                async doubleEliminationStandings(t) {
                    var e, n;
                    const r = [],
                        { stage: o, group: a, match: u, participant: c } = await this.stageData(t),
                        [l] = o,
                        [d, p, f] = a;
                    if ("none" === (null === (e = l.settings) || void 0 === e ? void 0 : e.grandFinal)) {
                        const t = u.filter((t) => t.group_id === d.id).pop();
                        if (!t) throw Error("WB final not found.");
                        const e = u.filter((t) => t.group_id === p.id).pop();
                        if (!e) throw Error("LB final not found.");
                        (r[0] = [i.findParticipant(c, s(t))]), (r[1] = [i.findParticipant(c, s(e))]);
                    } else {
                        const t = u.filter((t) => t.group_id === f.id),
                            e = i.getGrandFinalDecisiveMatch((null === (n = l.settings) || void 0 === n ? void 0 : n.grandFinal) || "none", t);
                        (r[0] = [i.findParticipant(c, s(e))]), (r[1] = [i.findParticipant(c, i.getLoser(e))]);
                    }
                    const h = i.getLosers(
                        c,
                        u.filter((t) => t.group_id === p.id)
                    );
                    return r.push(...h.reverse()), i.makeFinalStandings(r);
                }
                async getStageSpecificData(t) {
                    const e = await this.storage.select("stage", t);
                    if (!e) throw Error("Stage not found.");
                    const n = await this.storage.select("group", { stage_id: t });
                    if (!n) throw Error("Error getting groups.");
                    const r = await this.storage.select("round", { stage_id: t });
                    if (!r) throw Error("Error getting rounds.");
                    const o = await this.storage.select("match", { stage_id: t });
                    if (!o) throw Error("Error getting matches.");
                    return { stage: e, groups: n, rounds: r, matches: o, matchGames: await this.matchGames(o) };
                }
            }
            e.Get = a;
            const s = (t) => {
                const e = i.getWinner(t);
                if (!e) throw Error("The final match does not have a winner.");
                return e;
            };
        },
        4487: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.getOriginPosition = e.getOpponentId = e.setExtraFields = e.resetMatchResults = e.setMatchResults = e.getMatchStatus = e.hasBye = e.isMatchParticipantLocked = e.isMatchUpdateLocked = e.isMatchByeCompleted = e.isMatchWinCompleted = e.isMatchDrawCompleted = e.isMatchResultCompleted = e.isMatchForfeitCompleted = e.isMatchOngoing = e.isMatchCompleted = e.isMatchStarted = e.isMatchPending = e.getOtherSide = e.getSide = e.isParticipantInMatch = e.findPosition = e.getMatchResult = e.byeLoser = e.byeWinnerToGrandFinal = e.byeWinner = e.getLoser = e.getWinner = e.toResultWithPosition = e.toResult = e.convertTBDtoBYE = e.ensureNotTied = e.ensureValidSize = e.fixSeeding = e.ensureEquallySized = e.ensureNoDuplicates = e.ensureEvenSized = e.makePairs = e.setArraySize = e.normalizeParticipant = e.makeNormalizedIdMapping = e.normalizeIds = e.balanceByes = e.makeGroups = e.assertRoundRobin = e.makeRoundRobinDistribution = e.makeRoundRobinMatches = e.splitByParity = e.splitBy = e.isDefined = void 0),
                (e.isRoundCompleted = e.ensureNotRoundRobin = e.isRoundRobin = e.minScoreToWinBestOfX = e.getNearestPowerOfTwo = e.getDiagonalMatchNumber = e.getLowerBracketRoundCount = e.getLoserOrdering = e.getLoserRoundLoserCount = e.getLoserRoundMatchCount = e.findLoserMatchNumber = e.isDoubleEliminationNecessary = e.getRoundPairCount = e.getUpperBracketRoundCount = e.isOrderingSupportedLoserBracket = e.isOrderingSupportedUpperBracket = e.ensureOrderingSupported = e.getSeedCount = e.getSeeds = e.getChildGamesResults = e.getUpdatedMatchResults = e.getParentMatchResults = e.setParentMatchCompleted = e.transitionToMinor = e.transitionToMajor = e.uniqueBy = e.getNonNull = e.sortSeeding = e.convertSlotsToSeeding = e.convertMatchesToSeeding = e.mapParticipantsToDatabase = e.mapParticipantsIdsToDatabase = e.mapParticipantsNamesToDatabase = e.extractParticipantsFromSeeding = e.isSeedingWithIds = e.setForfeits = e.setResults = e.setCompleted = e.setScores = e.invertOpponents = e.handleGivenStatus = e.handleOpponentsInversion = e.resetNextOpponent = e.setNextOpponent = e.getNextSideLoserBracket = e.getNextSide = e.findParticipant = e.getGrandFinalDecisiveMatch = e.makeFinalStandings = e.getLosers = void 0),
                (e.getFractionOfFinal = e.getMatchLocation = e.isFinalGroup = e.isLoserBracket = e.isWinnerBracket = void 0);
            const r = n(7021),
                o = n(2644);
            function i(t) {
                return null != t;
            }
            function a(t) {
                const e = t.length,
                    n = e % 2 == 0 ? e : e + 1,
                    r = n - 1,
                    o = n / 2,
                    i = [];
                for (let a = 0; a < r; a++) {
                    const r = [];
                    for (let i = 0; i < o; i++) {
                        if (0 === i && e % 2 == 1) continue;
                        const o = [(a - i - 1 + n) % (n - 1), 0 === i ? n - 1 : (a + i) % (n - 1)];
                        r.push([t[o[0]], t[o[1]]]);
                    }
                    i.push(r);
                }
                return i;
            }
            function s(t) {
                let e = 0;
                return t.reduce((t, n) => ({ ...t, [n.id]: e++ }), {});
            }
            function u(t, e) {
                return null === t ? null : { ...t, id: null !== t.id ? e[t.id] : null };
            }
            function c(t, e, n) {
                return Array.from(Array(e), (e, r) => t[r] || n);
            }
            function l(t) {
                const e = p(t);
                return e ? t[h(e)] : null;
            }
            function d(t) {
                return null === t[0] && null === t[1] ? null : null === t[0] && null !== t[1] ? { id: t[1].id } : null !== t[0] && null === t[1] ? { id: t[0].id } : { id: null };
            }
            function p(t) {
                var e, n;
                if (!m(t)) return null;
                if (y(t)) return null;
                if (null === t.opponent1 && null === t.opponent2) return null;
                let r = null;
                if (
                    (("win" === (null === (e = t.opponent1) || void 0 === e ? void 0 : e.result) || null === t.opponent2 || t.opponent2.forfeit) && (r = "opponent1"),
                        "win" === (null === (n = t.opponent2) || void 0 === n ? void 0 : n.result) || null === t.opponent1 || t.opponent1.forfeit)
                ) {
                    if (null !== r) throw Error("There are two winners.");
                    r = "opponent2";
                }
                return r;
            }
            function f(t) {
                return t % 2 == 1 ? "opponent1" : "opponent2";
            }
            function h(t) {
                return "opponent1" === t ? "opponent2" : "opponent1";
            }
            function g(t) {
                var e, n;
                return void 0 !== (null === (e = t.opponent1) || void 0 === e ? void 0 : e.score) || void 0 !== (null === (n = t.opponent2) || void 0 === n ? void 0 : n.score);
            }
            function m(t) {
                return k(t) || v(t) || b(t);
            }
            function v(t) {
                var e, n;
                return void 0 !== (null === (e = t.opponent1) || void 0 === e ? void 0 : e.forfeit) || void 0 !== (null === (n = t.opponent2) || void 0 === n ? void 0 : n.forfeit);
            }
            function b(t) {
                return y(t) || w(t);
            }
            function y(t) {
                var e, n;
                return "draw" === (null === (e = t.opponent1) || void 0 === e ? void 0 : e.result) && "draw" === (null === (n = t.opponent2) || void 0 === n ? void 0 : n.result);
            }
            function w(t) {
                var e, n, r, o;
                return (
                    "win" === (null === (e = t.opponent1) || void 0 === e ? void 0 : e.result) ||
                    "win" === (null === (n = t.opponent2) || void 0 === n ? void 0 : n.result) ||
                    "loss" === (null === (r = t.opponent1) || void 0 === r ? void 0 : r.result) ||
                    "loss" === (null === (o = t.opponent2) || void 0 === o ? void 0 : o.result)
                );
            }
            function k(t) {
                var e, n;
                return (
                    (null === t.opponent1 && null !== (null === (e = t.opponent2) || void 0 === e ? void 0 : e.id)) ||
                    (null === t.opponent2 && null !== (null === (n = t.opponent1) || void 0 === n ? void 0 : n.id)) ||
                    (null === t.opponent1 && null === t.opponent2)
                );
            }
            function S(t) {
                return null === t.opponent1 || null === t.opponent2;
            }
            function O(t) {
                var e, n, o, i;
                const a = Array.isArray(t) ? { opponent1: t[0], opponent2: t[1] } : t;
                return S(a) || (null === (null === (e = a.opponent1) || void 0 === e ? void 0 : e.id) && null === (null === (n = a.opponent2) || void 0 === n ? void 0 : n.id))
                    ? r.Status.Locked
                    : null === (null === (o = a.opponent1) || void 0 === o ? void 0 : o.id) || null === (null === (i = a.opponent2) || void 0 === i ? void 0 : i.id)
                        ? r.Status.Waiting
                        : m(a)
                            ? r.Status.Completed
                            : g(a)
                                ? r.Status.Running
                                : r.Status.Ready;
            }
            function M(t) {
                t.opponent1 && ((t.opponent1.forfeit = void 0), (t.opponent1.result = void 0)), t.opponent2 && ((t.opponent2.forfeit = void 0), (t.opponent2.result = void 0)), (t.status = O(t));
            }
            function _(t, e) {
                const n = (t, e, n) => {
                    t &&
                        e &&
                        Object.keys(e)
                            .filter((t) => !n.includes(t))
                            .forEach((n) => {
                                t[n] = e[n];
                            });
                },
                    r = ["id", "score", "position", "forfeit", "result"];
                n(t, e, ["id", "number", "stage_id", "group_id", "round_id", "status", "opponent1", "opponent2", "child_count", "parent_id"]), n(t.opponent1, e.opponent1, r), n(t.opponent2, e.opponent2, r);
            }
            function x(t, e) {
                const n = t[e];
                return n && n.id;
            }
            function E(t, e) {
                if (!e) throw Error("Cannot find a BYE participant.");
                const n = t.find((t) => t.id === (null == e ? void 0 : e.id));
                if (!n) throw Error("Participant not found.");
                return n;
            }
            function R(t, e) {
                var n, r, o, a;
                const s = null === (n = e.opponent1) || void 0 === n ? void 0 : n.id,
                    u = null === (r = e.opponent2) || void 0 === r ? void 0 : r.id,
                    c = null === (o = t.opponent1) || void 0 === o ? void 0 : o.id,
                    l = null === (a = t.opponent2) || void 0 === a ? void 0 : a.id;
                if (i(s) && s !== c && s !== l) throw Error("The given opponent1 ID does not exist in this match.");
                if (i(u) && u !== c && u !== l) throw Error("The given opponent2 ID does not exist in this match.");
                ((i(s) && s === l) || (i(u) && u === c)) && C(e);
            }
            function P(t, e) {
                var n, o, i, a;
                if (e.status === r.Status.Running) null === (n = t.opponent1) || void 0 === n || delete n.result, null === (o = t.opponent2) || void 0 === o || delete o.result, (t.status = r.Status.Running);
                else if (e.status === r.Status.Completed) {
                    if (void 0 === (null === (i = e.opponent1) || void 0 === i ? void 0 : i.score) || void 0 === (null === (a = e.opponent2) || void 0 === a ? void 0 : a.score)) return;
                    e.opponent1.score > e.opponent2.score ? (e.opponent1.result = "win") : e.opponent2.score > e.opponent1.score ? (e.opponent2.result = "win") : ((e.opponent1.result = "draw"), (e.opponent2.result = "draw")),
                        (t.status = r.Status.Completed);
                }
            }
            function C(t) {
                [t.opponent1, t.opponent2] = [t.opponent2, t.opponent1];
            }
            function L(t, e) {
                var n, o, i, a;
                if (
                    (null === (n = e.opponent1) || void 0 === n ? void 0 : n.score) === (null === (o = t.opponent1) || void 0 === o ? void 0 : o.score) &&
                    (null === (i = e.opponent2) || void 0 === i ? void 0 : i.score) === (null === (a = t.opponent2) || void 0 === a ? void 0 : a.score)
                )
                    return !1;
                const s = t.status;
                return (t.status = r.Status.Running), e.opponent1 && t.opponent1 && (t.opponent1.score = e.opponent1.score), e.opponent2 && t.opponent2 && (t.opponent2.score = e.opponent2.score), t.status !== s;
            }
            function N(t, e, n) {
                (t.status = r.Status.Completed),
                    j(t, e, "win", "loss", n),
                    j(t, e, "loss", "win", n),
                    j(t, e, "draw", "draw", n),
                    t.opponent1 && !t.opponent2 && (t.opponent1.result = "win"),
                    !t.opponent1 && t.opponent2 && (t.opponent2.result = "win"),
                    F(t, e);
            }
            function j(t, e, n, r, o) {
                var i, a;
                if (e.opponent1 && e.opponent2) {
                    if ("win" === e.opponent1.result && "win" === e.opponent2.result) throw Error("There are two winners.");
                    if ("loss" === e.opponent1.result && "loss" === e.opponent2.result) throw Error("There are two losers.");
                    if (!o && !0 === e.opponent1.forfeit && !0 === e.opponent2.forfeit) throw Error("There are two forfeits.");
                }
                (null === (i = e.opponent1) || void 0 === i ? void 0 : i.result) === n &&
                    (t.opponent1 ? (t.opponent1.result = n) : (t.opponent1 = { id: null, result: n }), t.opponent2 ? (t.opponent2.result = r) : (t.opponent2 = { id: null, result: r })),
                    (null === (a = e.opponent2) || void 0 === a ? void 0 : a.result) === n &&
                    (t.opponent2 ? (t.opponent2.result = n) : (t.opponent2 = { id: null, result: n }), t.opponent1 ? (t.opponent1.result = r) : (t.opponent1 = { id: null, result: r }));
            }
            function F(t, e) {
                var n, r, o, i;
                if (!0 === (null === (n = e.opponent1) || void 0 === n ? void 0 : n.forfeit) && !0 === (null === (r = e.opponent2) || void 0 === r ? void 0 : r.forfeit))
                    return t.opponent1 && (t.opponent1.forfeit = !0), void (t.opponent2 && (t.opponent2.forfeit = !0));
                !0 === (null === (o = e.opponent1) || void 0 === o ? void 0 : o.forfeit) && (t.opponent1 && (t.opponent1.forfeit = !0), t.opponent2 ? (t.opponent2.result = "win") : (t.opponent2 = { id: null, result: "win" })),
                    !0 === (null === (i = e.opponent2) || void 0 === i ? void 0 : i.forfeit) && (t.opponent2 && (t.opponent2.forfeit = !0), t.opponent1 ? (t.opponent1.result = "win") : (t.opponent1 = { id: null, result: "win" }));
            }
            function B(t, e, n, r) {
                const o = e.map((e, r) => {
                    if (null === e) return null;
                    const o = n.find((n) => ("object" == typeof e ? n[t] === e[t] : n[t] === e));
                    if (!o) throw Error(`Participant ${t} not found in database.`);
                    return { id: o.id, position: r + 1 };
                });
                if (!r) return o;
                if (r.length !== o.length) throw Error("Not enough seeds in at least one group of the manual ordering.");
                return r.map((t) => o[t - 1]);
            }
            function D(t) {
                const e = t.filter((t) => null !== t);
                if ((e.sort((t, e) => t.position - e.position), e.length === t.length)) return e;
                const n = Object.fromEntries(e.map((t) => [t.position - 1, t]));
                return Array.from({ length: t.length }, (t, e) => n[e] || null);
            }
            function T(t) {
                return t.filter((t) => null !== t);
            }
            function A(t, e, n, r) {
                return I(t, e, n), 1 === e ? 2 * r : r;
            }
            function I(t, e, n) {
                if (t && !G(e, n)) throw Error("This round does not support ordering.");
                if (!t && !U(e)) throw Error("This round does not support ordering.");
            }
            function U(t) {
                return 1 === t;
            }
            function G(t, e) {
                return 1 === t || (t % 2 == 0 && t < e);
            }
            function $(t) {
                return Math.log2(t);
            }
            function z(t) {
                return $(t) - 1;
            }
            function W(t, e) {
                const n = Math.ceil(e / 2) - 1,
                    r = z(t);
                return Math.pow(2, r - n - 1);
            }
            function H(t, e) {
                const n = W(t, e);
                return 1 === e ? 2 * n : n;
            }
            function V(t) {
                return Math.pow(2, Math.ceil(Math.log2(t)));
            }
            function q(t) {
                return (t + 1) / 2;
            }
            function K(t) {
                return "round_robin" === t.type;
            }
            function J(t, e) {
                return "double_elimination" === t && 1 === e;
            }
            function Y(t, e) {
                return "double_elimination" === t && 2 === e;
            }
            function Q(t, e) {
                return ("single_elimination" === t && 2 === e) || ("double_elimination" === t && 3 === e);
            }
            (e.isDefined = i),
                (e.splitBy = function (t, e) {
                    const n = {};
                    for (const r of t) {
                        const t = r[e];
                        n[t] || (n[t] = []), n[t].push(r);
                    }
                    return Object.values(n);
                }),
                (e.splitByParity = function (t) {
                    return { even: t.filter((t, e) => e % 2 == 0), odd: t.filter((t, e) => e % 2 == 1) };
                }),
                (e.makeRoundRobinMatches = function (t, e = "simple") {
                    const n = a(t);
                    if ("simple" === e) return n;
                    const r = n.map((t) => [...t].reverse()).reverse();
                    return [...n, ...r];
                }),
                (e.makeRoundRobinDistribution = a),
                (e.assertRoundRobin = function (t, e) {
                    const n = t.length,
                        r = Math.floor(n / 2),
                        o = n % 2 == 0 ? n - 1 : n;
                    if (e.length !== o) throw Error("Round count is wrong");
                    if (!e.every((t) => t.length === r)) throw Error("Not every round has the good number of matches");
                    const i = Object.fromEntries(t.map((t) => [t, new Set()]));
                    for (const t of e) {
                        const e = new Set();
                        for (const n of t) {
                            if (2 !== n.length) throw Error("One match is not a pair");
                            if (e.has(n[0])) throw Error("This team is already playing");
                            if ((e.add(n[0]), e.has(n[1]))) throw Error("This team is already playing");
                            if ((e.add(n[1]), i[n[0]].has(n[1]))) throw Error("The team has already matched this team");
                            if ((i[n[0]].add(n[1]), i[n[1]].has(n[0]))) throw Error("The team has already matched this team");
                            i[n[1]].add(n[0]);
                        }
                    }
                }),
                (e.makeGroups = function (t, e) {
                    const n = Math.ceil(t.length / e),
                        r = [];
                    for (let e = 0; e < t.length; e++) e % n == 0 && r.push([]), r[r.length - 1].push(t[e]);
                    return r;
                }),
                (e.balanceByes = function (t, e) {
                    if (((t = t.filter((t) => null !== t)), (e = e || V(t.length)), t.length < e / 2))
                        return c(
                            t.flatMap((t) => [t, null]),
                            e,
                            null
                        );
                    const n = t.length,
                        r = e - n,
                        o = t
                            .slice(0, n - r)
                            .filter((t, e) => e % 2 == 0)
                            .map((e, n) => [t[2 * n], t[2 * n + 1]]),
                        i = t.slice(n - r, n).map((t) => [t, null]);
                    return c([...o.flat(), ...i.flat()], e, null);
                }),
                (e.normalizeIds = function (t) {
                    const e = { participant: s(t.participant), stage: s(t.stage), group: s(t.group), round: s(t.round), match: s(t.match), match_game: s(t.match_game) };
                    return {
                        participant: t.participant.map((t) => ({ ...t, id: e.participant[t.id] })),
                        stage: t.stage.map((t) => ({ ...t, id: e.stage[t.id] })),
                        group: t.group.map((t) => ({ ...t, id: e.group[t.id], stage_id: e.stage[t.stage_id] })),
                        round: t.round.map((t) => ({ ...t, id: e.round[t.id], stage_id: e.stage[t.stage_id], group_id: e.group[t.group_id] })),
                        match: t.match.map((t) => ({
                            ...t,
                            id: e.match[t.id],
                            stage_id: e.stage[t.stage_id],
                            group_id: e.group[t.group_id],
                            round_id: e.round[t.round_id],
                            opponent1: u(t.opponent1, e.participant),
                            opponent2: u(t.opponent2, e.participant),
                        })),
                        match_game: t.match_game.map((t) => ({
                            ...t,
                            id: e.match_game[t.id],
                            stage_id: e.stage[t.stage_id],
                            parent_id: e.match[t.parent_id],
                            opponent1: u(t.opponent1, e.participant),
                            opponent2: u(t.opponent2, e.participant),
                        })),
                    };
                }),
                (e.makeNormalizedIdMapping = s),
                (e.normalizeParticipant = u),
                (e.setArraySize = c),
                (e.makePairs = function (t) {
                    return t.map((e, n) => (n % 2 == 0 ? [t[n], t[n + 1]] : [])).filter((t) => 2 === t.length);
                }),
                (e.ensureEvenSized = function (t) {
                    if (t.length % 2 == 1) throw Error("Array size must be even.");
                }),
                (e.ensureNoDuplicates = function (t) {
                    const e = T(t);
                    if (
                        e.filter((t, n) => {
                            const r = JSON.stringify(t);
                            return e.findIndex((t) => JSON.stringify(t) === r) === n;
                        }).length < e.length
                    )
                        throw new Error("The seeding has a duplicate participant.");
                }),
                (e.ensureEquallySized = function (t, e) {
                    if (t.length !== e.length) throw Error("Arrays' size must be equal.");
                }),
                (e.fixSeeding = function (t, e) {
                    if (t.length > e) throw Error("The seeding has more participants than the size of the stage.");
                    return t.length < e ? c(t, e, null) : t;
                }),
                (e.ensureValidSize = function (t, e) {
                    if (0 === e) throw Error("Impossible to create an empty stage. If you want an empty seeding, just set the size of the stage.");
                    if (e < 2) throw Error("Impossible to create a stage with less than 2 participants.");
                    if ("round_robin" !== t && !Number.isInteger(Math.log2(e))) throw Error("The library only supports a participant count which is a power of two.");
                }),
                (e.ensureNotTied = function (t) {
                    if (t[0] === t[1]) throw Error(`${t[0]} and ${t[1]} are tied. It cannot be.`);
                }),
                (e.convertTBDtoBYE = function (t) {
                    return null === t || null === (null == t ? void 0 : t.id) ? null : t;
                }),
                (e.toResult = function (t) {
                    return t && { id: t.id };
                }),
                (e.toResultWithPosition = function (t) {
                    return t && { id: t.id, position: t.position };
                }),
                (e.getWinner = function (t) {
                    const e = p(t);
                    return e ? t[e] : null;
                }),
                (e.getLoser = l),
                (e.byeWinner = d),
                (e.byeWinnerToGrandFinal = function (t) {
                    const e = d(t);
                    return e && (e.position = 1), e;
                }),
                (e.byeLoser = function (t, e) {
                    return null === t[0] || null === t[1] ? null : { id: null, position: e + 1 };
                }),
                (e.getMatchResult = p),
                (e.findPosition = function (t, e) {
                    var n, r;
                    for (const o of t) {
                        if ((null === (n = o.opponent1) || void 0 === n ? void 0 : n.position) === e) return o.opponent1;
                        if ((null === (r = o.opponent2) || void 0 === r ? void 0 : r.position) === e) return o.opponent2;
                    }
                    return null;
                }),
                (e.isParticipantInMatch = function (t, e) {
                    return [t.opponent1, t.opponent2].some((t) => (null == t ? void 0 : t.id) === e);
                }),
                (e.getSide = f),
                (e.getOtherSide = h),
                (e.isMatchPending = function (t) {
                    var e, n;
                    return !(null === (e = t.opponent1) || void 0 === e ? void 0 : e.id) || !(null === (n = t.opponent2) || void 0 === n ? void 0 : n.id);
                }),
                (e.isMatchStarted = g),
                (e.isMatchCompleted = m),
                (e.isMatchOngoing = function (t) {
                    return [r.Status.Ready, r.Status.Running].includes(t.status);
                }),
                (e.isMatchForfeitCompleted = v),
                (e.isMatchResultCompleted = b),
                (e.isMatchDrawCompleted = y),
                (e.isMatchWinCompleted = w),
                (e.isMatchByeCompleted = k),
                (e.isMatchUpdateLocked = function (t) {
                    return t.status === r.Status.Locked || t.status === r.Status.Waiting || t.status === r.Status.Archived;
                }),
                (e.isMatchParticipantLocked = function (t) {
                    return t.status >= r.Status.Running;
                }),
                (e.hasBye = S),
                (e.getMatchStatus = O),
                (e.setMatchResults = function (t, e, n) {
                    var r, o;
                    if ((P(t, e), !n && ("draw" === (null === (r = e.opponent1) || void 0 === r ? void 0 : r.result) || "draw" === (null === (o = e.opponent2) || void 0 === o ? void 0 : o.result))))
                        throw Error("Having a draw is forbidden in an elimination tournament.");
                    const i = m(e),
                        a = m(t);
                    _(t, e), R(t, e);
                    const s = L(t, e);
                    return i && a
                        ? (N(t, e, n), { statusChanged: !1, resultChanged: !0 })
                        : i && !a
                            ? (N(t, e, n), { statusChanged: !0, resultChanged: !0 })
                            : !i && a
                                ? (M(t), { statusChanged: !0, resultChanged: !0 })
                                : { statusChanged: s, resultChanged: !1 };
                }),
                (e.resetMatchResults = M),
                (e.setExtraFields = _),
                (e.getOpponentId = x),
                (e.getOriginPosition = function (t, e) {
                    var n;
                    const r = null === (n = t[e]) || void 0 === n ? void 0 : n.position;
                    if (void 0 === r) throw Error("Position is undefined.");
                    return r;
                }),
                (e.getLosers = function (t, e) {
                    const n = [];
                    let r = null,
                        o = -1;
                    for (const i of e) {
                        i.round_id !== r && ((r = i.round_id), o++, (n[o] = []));
                        const e = l(i);
                        null !== e && n[o].push(E(t, e));
                    }
                    return n;
                }),
                (e.makeFinalStandings = function (t) {
                    const e = [];
                    let n = 1;
                    for (const r of t) {
                        for (const t of r) e.push({ id: t.id, name: t.name, rank: n });
                        n++;
                    }
                    return e;
                }),
                (e.getGrandFinalDecisiveMatch = function (t, e) {
                    if ("simple" === t) return e[0];
                    if ("double" === t) return "opponent2" === p(e[0]) ? e[1] : e[0];
                    throw Error("The Grand Final is disabled.");
                }),
                (e.findParticipant = E),
                (e.getNextSide = function (t, e, n, r) {
                    return ("loser_bracket" === r && e % 2 == 1) || ("loser_bracket" === r && e === n) ? "opponent2" : f(t);
                }),
                (e.getNextSideLoserBracket = function (t, e, n) {
                    var r;
                    return n > 1 || (null === (r = e.opponent1) || void 0 === r ? void 0 : r.position) === t ? "opponent1" : "opponent2";
                }),
                (e.setNextOpponent = function (t, e, n, r) {
                    var o;
                    (t[e] = n[r] && { id: x(n, r), position: null === (o = t[e]) || void 0 === o ? void 0 : o.position }), (t.status = O(t));
                }),
                (e.resetNextOpponent = function (t, e) {
                    var n;
                    (t[e] = t[e] && { id: null, position: null === (n = t[e]) || void 0 === n ? void 0 : n.position }), (t.status = r.Status.Locked);
                }),
                (e.handleOpponentsInversion = R),
                (e.handleGivenStatus = P),
                (e.invertOpponents = C),
                (e.setScores = L),
                (e.setCompleted = N),
                (e.setResults = j),
                (e.setForfeits = F),
                (e.isSeedingWithIds = function (t) {
                    return t.some((t) => "number" == typeof t);
                }),
                (e.extractParticipantsFromSeeding = function (t, e) {
                    return e.filter((t) => null !== t).map((e) => ("string" == typeof e ? { tournament_id: t, name: e } : { ...e, tournament_id: t, name: e.name }));
                }),
                (e.mapParticipantsNamesToDatabase = function (t, e, n) {
                    return B("name", t, e, n);
                }),
                (e.mapParticipantsIdsToDatabase = function (t, e, n) {
                    return B("id", t, e, n);
                }),
                (e.mapParticipantsToDatabase = B),
                (e.convertMatchesToSeeding = function (t) {
                    return D([].concat(...t.map((t) => [t.opponent1, t.opponent2])));
                }),
                (e.convertSlotsToSeeding = function (t) {
                    return t.map((t) => (null === t || null === t.id ? null : t.id));
                }),
                (e.sortSeeding = D),
                (e.getNonNull = T),
                (e.uniqueBy = function (t, e) {
                    const n = new Set();
                    return t.filter((t) => {
                        const r = e(t);
                        return !r || (!n.has(r) && (n.add(r), !0));
                    });
                }),
                (e.transitionToMajor = function (t) {
                    const e = t.length / 2,
                        n = [];
                    for (let r = 0; r < e; r++) {
                        const e = 2 * r;
                        n.push([d(t[e]), d(t[e + 1])]);
                    }
                    return n;
                }),
                (e.transitionToMinor = function (t, e, n) {
                    const r = n ? o.ordering[n](e) : e,
                        i = t.length,
                        a = [];
                    for (let e = 0; e < i; e++) {
                        const n = e;
                        a.push([r[n], d(t[n])]);
                    }
                    return a;
                }),
                (e.setParentMatchCompleted = function (t, e, n) {
                    var r, o;
                    if (void 0 === (null === (r = t.opponent1) || void 0 === r ? void 0 : r.score) || void 0 === (null === (o = t.opponent2) || void 0 === o ? void 0 : o.score))
                        throw Error("Either opponent1, opponent2 or their scores are falsy.");
                    const i = q(e);
                    if (t.opponent1.score >= i) t.opponent1.result = "win";
                    else if (t.opponent2.score >= i) t.opponent2.result = "win";
                    else if (t.opponent1.score === t.opponent2.score && t.opponent1.score + t.opponent2.score > e - 1) {
                        if (n) return (t.opponent1.result = "draw"), void (t.opponent2.result = "draw");
                        throw Error("Match games result in a tie for the parent match.");
                    }
                }),
                (e.getParentMatchResults = function (t, e) {
                    return { opponent1: { id: t.opponent1 && t.opponent1.id, score: e.opponent1 }, opponent2: { id: t.opponent2 && t.opponent2.id, score: e.opponent2 } };
                }),
                (e.getUpdatedMatchResults = function (t, e, n) {
                    return {
                        ...e,
                        ...t,
                        ...(n
                            ? { opponent1: null === t.opponent1 ? null : { ...e.opponent1, ...t.opponent1 }, opponent2: null === t.opponent2 ? null : { ...e.opponent2, ...t.opponent2 } }
                            : { opponent1: null === t.opponent1 ? { id: null } : { ...e.opponent1, ...t.opponent1 }, opponent2: null === t.opponent2 ? { id: null } : { ...e.opponent2, ...t.opponent2 } }),
                    };
                }),
                (e.getChildGamesResults = function (t) {
                    const e = { opponent1: 0, opponent2: 0 };
                    for (const n of t) {
                        const t = p(n);
                        "opponent1" === t ? e.opponent1++ : "opponent2" === t && e.opponent2++;
                    }
                    return e;
                }),
                (e.getSeeds = function (t, e, n, r) {
                    const o = A(t, e, n, r);
                    return Array.from(Array(o), (t, e) => e + 1);
                }),
                (e.getSeedCount = A),
                (e.ensureOrderingSupported = I),
                (e.isOrderingSupportedUpperBracket = U),
                (e.isOrderingSupportedLoserBracket = G),
                (e.getUpperBracketRoundCount = $),
                (e.getRoundPairCount = z),
                (e.isDoubleEliminationNecessary = function (t) {
                    return t > 2;
                }),
                (e.findLoserMatchNumber = function (t, e, n, r) {
                    const i = H(t, e),
                        a = Array.from(Array(i), (t, e) => e + 1),
                        s = (r ? o.ordering[r](a) : a).indexOf(n) + 1;
                    return 1 === e ? Math.ceil(s / 2) : s;
                }),
                (e.getLoserRoundMatchCount = W),
                (e.getLoserRoundLoserCount = H),
                (e.getLoserOrdering = function (t, e) {
                    return t[1 + Math.floor(e / 2)];
                }),
                (e.getLowerBracketRoundCount = function (t) {
                    return 2 * z(t);
                }),
                (e.getDiagonalMatchNumber = function (t) {
                    return Math.ceil(t / 2);
                }),
                (e.getNearestPowerOfTwo = V),
                (e.minScoreToWinBestOfX = q),
                (e.isRoundRobin = K),
                (e.ensureNotRoundRobin = function (t) {
                    if (K(t)) throw Error("Impossible to update ordering in a round-robin stage.");
                }),
                (e.isRoundCompleted = function (t) {
                    return t.every((t) => t.status >= r.Status.Completed);
                }),
                (e.isWinnerBracket = J),
                (e.isLoserBracket = Y),
                (e.isFinalGroup = Q),
                (e.getMatchLocation = function (t, e) {
                    return J(t, e) ? "winner_bracket" : Y(t, e) ? "loser_bracket" : Q(t, e) ? "final_group" : "single_bracket";
                }),
                (e.getFractionOfFinal = function (t, e) {
                    if (t > e) throw Error(`There are more rounds than possible. ${JSON.stringify({ roundNumber: t, roundCount: e })}`);
                    return 1 / Math.pow(2, e - t);
                });
        },
        9037: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.helpers = e.BracketsManager = void 0);
            const r = n(6076);
            Object.defineProperty(e, "BracketsManager", {
                enumerable: !0,
                get: function () {
                    return r.BracketsManager;
                },
            });
            const o = n(4487);
            e.helpers = o;
        },
        6076: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.BracketsManager = void 0);
            const r = n(9765),
                o = n(3576),
                i = n(2011),
                a = n(4378),
                s = n(4063),
                u = n(5369),
                c = n(7429),
                l = n(4487);
            e.BracketsManager = class {
                constructor(t, e) {
                    (this.verbose = !1),
                        (this.verbose = null != e && e),
                        (this.storage = t),
                        this.instrumentStorage(),
                        (this.storage.selectFirst = async (t, e, n = !0) => {
                            var r;
                            const o = await this.storage.select(t, e);
                            if (!o || 0 === o.length) return null;
                            if (n && o.length > 1) throw Error(`Selecting ${JSON.stringify(e)} on table "${t}" must return a unique value.`);
                            return null !== (r = o[0]) && void 0 !== r ? r : null;
                        }),
                        (this.storage.selectLast = async (t, e, n = !0) => {
                            var r;
                            const o = await this.storage.select(t, e);
                            if (!o || 0 === o.length) return null;
                            if (n && o.length > 1) throw Error(`Selecting ${JSON.stringify(e)} on table "${t}" must return a unique value.`);
                            return null !== (r = o[o.length - 1]) && void 0 !== r ? r : null;
                        });
                    const n = new r.Create(this.storage).stage.bind(this);
                    (this.create = Object.assign(n, { stage: n })),
                        (this.get = new o.Get(this.storage)),
                        (this.update = new i.Update(this.storage)),
                        (this.delete = new a.Delete(this.storage)),
                        (this.find = new s.Find(this.storage)),
                        (this.reset = new u.Reset(this.storage));
                }
                async import(t, e = !1) {
                    if ((e && (t = l.normalizeIds(t)), !(await this.storage.delete("participant")))) throw Error("Could not empty the participant table.");
                    if (!(await this.storage.insert("participant", t.participant))) throw Error("Could not import participants.");
                    if (!(await this.storage.delete("stage"))) throw Error("Could not empty the stage table.");
                    if (!(await this.storage.insert("stage", t.stage))) throw Error("Could not import stages.");
                    if (!(await this.storage.delete("group"))) throw Error("Could not empty the group table.");
                    if (!(await this.storage.insert("group", t.group))) throw Error("Could not import groups.");
                    if (!(await this.storage.delete("round"))) throw Error("Could not empty the round table.");
                    if (!(await this.storage.insert("round", t.round))) throw Error("Could not import rounds.");
                    if (!(await this.storage.delete("match"))) throw Error("Could not empty the match table.");
                    if (!(await this.storage.insert("match", t.match))) throw Error("Could not import matches.");
                    if (!(await this.storage.delete("match_game"))) throw Error("Could not empty the match_game table.");
                    if (!(await this.storage.insert("match_game", t.match_game))) throw Error("Could not import match games.");
                }
                async export() {
                    const t = await this.storage.select("participant");
                    if (!t) throw Error("Error getting participants.");
                    const e = await this.storage.select("stage");
                    if (!e) throw Error("Error getting stages.");
                    const n = await this.storage.select("group");
                    if (!n) throw Error("Error getting groups.");
                    const r = await this.storage.select("round");
                    if (!r) throw Error("Error getting rounds.");
                    const o = await this.storage.select("match");
                    if (!o) throw Error("Error getting matches.");
                    return { participant: t, stage: e, group: n, round: r, match: o, match_game: await this.get.matchGames(o) };
                }
                instrumentStorage() {
                    const t = this.storage,
                        e = ["insert", "select", "update", "delete"];
                    for (const n of Object.getOwnPropertyNames(Object.getPrototypeOf(t))) {
                        if (!e.includes(n)) continue;
                        const r = t[n].bind(t);
                        t[n] = async (t, ...e) => {
                            const o = this.verbose;
                            let i, a;
                            o && ((i = (0, c.v4)()), (a = Date.now()), console.log(`${i} ${n.toUpperCase()} "${t}" args: ${JSON.stringify(e)}`));
                            const s = await r(t, ...e);
                            if (o) {
                                const t = Date.now() - a;
                                console.log(`${i} ${t}ms - Returned ${JSON.stringify(s)}`);
                            }
                            return s;
                        };
                    }
                }
            };
        },
        2644: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.defaultMinorOrdering = e.ordering = void 0),
                (e.ordering = {
                    natural: (t) => [...t],
                    reverse: (t) => [...t].reverse(),
                    half_shift: (t) => [...t.slice(t.length / 2), ...t.slice(0, t.length / 2)],
                    reverse_half_shift: (t) => [...t.slice(0, t.length / 2).reverse(), ...t.slice(t.length / 2).reverse()],
                    pair_flip: (t) => {
                        const e = [];
                        for (let n = 0; n < t.length; n += 2) e.push(t[n + 1], t[n]);
                        return e;
                    },
                    inner_outer: (t) => {
                        if (2 === t.length) return t;
                        const e = t.length / 4,
                            n = [t.slice(e, 2 * e), t.slice(2 * e, 3 * e)],
                            r = [t.slice(0, e), t.slice(3 * e, 4 * e)],
                            o = {
                                inner(t) {
                                    return [t[0].pop(), t[1].shift()];
                                },
                                outer(t) {
                                    return [t[0].shift(), t[1].pop()];
                                },
                            },
                            i = [];
                        function a(t, e) {
                            t[0].length > 0 && t[1].length > 0 && i.push(...o[e](t));
                        }
                        for (let t = 0; t < e / 2; t++) a(r, "outer"), a(n, "inner"), a(r, "inner"), a(n, "outer");
                        return i;
                    },
                    "groups.effort_balanced": (t, e) => {
                        const n = [];
                        let r = 0,
                            o = 0;
                        for (; n.length < t.length;) n.push(t[r]), (r += e), r >= t.length && (r = ++o);
                        return n;
                    },
                    "groups.seed_optimized": (t, e) => {
                        const n = Array.from(Array(e), (t) => []);
                        for (let r = 0; r < t.length / e; r++)
                            if (r % 2 == 0) for (let o = 0; o < e; o++) n[o].push(t[r * e + o]);
                            else for (let o = 0; o < e; o++) n[e - o - 1].push(t[r * e + o]);
                        return n.flat();
                    },
                    "groups.bracket_optimized": () => {
                        throw Error("Not implemented.");
                    },
                }),
                (e.defaultMinorOrdering = {
                    4: ["natural", "reverse"],
                    8: ["natural", "reverse", "natural"],
                    16: ["natural", "reverse_half_shift", "reverse", "natural"],
                    32: ["natural", "reverse", "half_shift", "natural", "natural"],
                    64: ["natural", "reverse", "half_shift", "reverse", "natural", "natural"],
                    128: ["natural", "reverse", "half_shift", "pair_flip", "pair_flip", "pair_flip", "natural"],
                });
        },
        5369: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Reset = void 0);
            const r = n(7021),
                o = n(3517),
                i = n(4487);
            class a extends o.BaseUpdater {
                async matchResults(t) {
                    const e = await this.storage.select("match", t);
                    if (!e) throw Error("Match not found.");
                    if (!i.isMatchForfeitCompleted(e) && e.child_count > 0) throw Error("The parent match is controlled by its child games and its result cannot be reset.");
                    const n = await this.storage.select("stage", e.stage_id);
                    if (!n) throw Error("Stage not found.");
                    const o = await this.storage.select("group", e.group_id);
                    if (!o) throw Error("Group not found.");
                    const { roundNumber: a, roundCount: s } = await this.getRoundPositionalInfo(e.round_id),
                        u = i.getMatchLocation(n.type, o.number);
                    if ((await this.getNextMatches(e, u, n, a, s)).some((t) => t && t.status >= r.Status.Running && !i.isMatchByeCompleted(t))) throw Error("The match is locked.");
                    i.resetMatchResults(e), await this.applyMatchUpdate(e), i.isRoundRobin(n) || (await this.updateRelatedMatches(e, !0, !0));
                }
                async matchGameResults(t) {
                    const e = await this.storage.select("match_game", t);
                    if (!e) throw Error("Match game not found.");
                    const n = await this.storage.select("stage", e.stage_id);
                    if (!n) throw Error("Stage not found.");
                    const r = i.isRoundRobin(n);
                    if ((i.resetMatchResults(e), !(await this.storage.update("match_game", e.id, e)))) throw Error("Could not update the match game.");
                    await this.updateParentMatch(e.parent_id, r);
                }
                async seeding(t) {
                    await this.updateSeeding(t, { seeding: null });
                }
            }
            e.Reset = a;
        },
        2011: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.Update = void 0);
            const r = n(7021),
                o = n(2644),
                i = n(3517),
                a = n(4487);
            class s extends i.BaseUpdater {
                async match(t) {
                    if (void 0 === t.id) throw Error("No match id given.");
                    const e = await this.storage.select("match", t.id);
                    if (!e) throw Error("Match not found.");
                    await this.updateMatch(e, t);
                }
                async matchGame(t) {
                    const e = await this.findMatchGame(t);
                    await this.updateMatchGame(e, t);
                }
                async ordering(t, e) {
                    const n = await this.storage.select("stage", t);
                    if (!n) throw Error("Stage not found.");
                    a.ensureNotRoundRobin(n);
                    const r = await this.getOrderedRounds(n);
                    if (e.length !== r.length) throw Error("The count of seed orderings is incorrect.");
                    for (let t = 0; t < r.length; t++) await this.updateRoundOrdering(r[t], e[t]);
                }
                async roundOrdering(t, e) {
                    const n = await this.storage.select("round", t);
                    if (!n) throw Error("This round does not exist.");
                    const r = await this.storage.select("stage", n.stage_id);
                    if (!r) throw Error("Stage not found.");
                    a.ensureNotRoundRobin(r), await this.updateRoundOrdering(n, e);
                }
                async matchChildCount(t, e, n) {
                    switch (t) {
                        case "stage":
                            await this.updateStageMatchChildCount(e, n);
                            break;
                        case "group":
                            await this.updateGroupMatchChildCount(e, n);
                            break;
                        case "round":
                            await this.updateRoundMatchChildCount(e, n);
                            break;
                        case "match":
                            const t = await this.storage.select("match", e);
                            if (!t) throw Error("Match not found.");
                            await this.adjustMatchChildGames(t, n);
                            break;
                        default:
                            throw Error("Unknown child count level.");
                    }
                }
                async seeding(t, e) {
                    await this.updateSeeding(t, { seeding: e });
                }
                async seedingIds(t, e) {
                    await this.updateSeeding(t, { seedingIds: e });
                }
                async confirmSeeding(t) {
                    await this.confirmCurrentSeeding(t);
                }
                async updateRoundOrdering(t, e) {
                    const n = await this.storage.select("match", { round_id: t.id });
                    if (!n) throw Error("This round has no match.");
                    if (n.some((t) => t.status > r.Status.Ready)) throw Error("At least one match has started or is completed.");
                    const i = await this.storage.select("stage", t.stage_id);
                    if (!i) throw Error("Stage not found.");
                    if (void 0 === i.settings.size) throw Error("Undefined stage size.");
                    const s = await this.storage.select("group", t.group_id);
                    if (!s) throw Error("Group not found.");
                    const u = a.isLoserBracket(i.type, s.number),
                        c = a.getLowerBracketRoundCount(i.settings.size),
                        l = a.getSeeds(u, t.number, c, n.length),
                        d = o.ordering[e](l);
                    await this.applyRoundOrdering(t.number, n, d);
                }
                async updateStageMatchChildCount(t, e) {
                    if (!(await this.storage.update("match", { stage_id: t }, { child_count: e }))) throw Error("Could not update the match.");
                    const n = await this.storage.select("match", { stage_id: t });
                    if (!n) throw Error("This stage has no match.");
                    for (const t of n) await this.adjustMatchChildGames(t, e);
                }
                async updateGroupMatchChildCount(t, e) {
                    if (!(await this.storage.update("match", { group_id: t }, { child_count: e }))) throw Error("Could not update the match.");
                    const n = await this.storage.select("match", { group_id: t });
                    if (!n) throw Error("This group has no match.");
                    for (const t of n) await this.adjustMatchChildGames(t, e);
                }
                async updateRoundMatchChildCount(t, e) {
                    if (!(await this.storage.update("match", { round_id: t }, { child_count: e }))) throw Error("Could not update the match.");
                    const n = await this.storage.select("match", { round_id: t });
                    if (!n) throw Error("This round has no match.");
                    for (const t of n) await this.adjustMatchChildGames(t, e);
                }
                async applyRoundOrdering(t, e, n) {
                    for (const r of e) {
                        const o = { ...r };
                        if (((o.opponent1 = a.findPosition(e, n.shift())), 1 === t && (o.opponent2 = a.findPosition(e, n.shift())), !(await this.storage.update("match", o.id, o)))) throw Error("Could not update the match.");
                    }
                }
                async adjustMatchChildGames(t, e) {
                    const n = await this.storage.select("match_game", { parent_id: t.id });
                    let r = n ? n.length : 0;
                    for (; r < e;) {
                        if (-1 === (await this.storage.insert("match_game", { number: r + 1, stage_id: t.stage_id, parent_id: t.id, status: t.status, opponent1: { id: null }, opponent2: { id: null } })))
                            throw Error("Could not adjust the match games when inserting.");
                        r++;
                    }
                    for (; r > e;) {
                        if (!(await this.storage.delete("match_game", { parent_id: t.id, number: r }))) throw Error("Could not adjust the match games when deleting.");
                        r--;
                    }
                    if (!(await this.storage.update("match", t.id, { ...t, child_count: e }))) throw Error("Could not update the match.");
                }
            }
            e.Update = s;
        },
        2038: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.InMemoryDatabase = void 0);
            const r = n(3188)();
            e.InMemoryDatabase = class {
                data = { participant: [], stage: [], group: [], round: [], match: [], match_game: [] };
                setData(t) {
                    this.data = t;
                }
                makeFilter(t) {
                    return (e) => {
                        let n = !0;
                        for (const r of Object.keys(t)) n = n && e[r] === t[r];
                        return n;
                    };
                }
                reset() {
                    this.data = { participant: [], stage: [], group: [], round: [], match: [], match_game: [] };
                }
                insert(t, e) {
                    let n = this.data[t].length > 0 ? Math.max(...this.data[t].map((t) => t.id)) + 1 : 0;
                    if (!Array.isArray(e)) {
                        try {
                            this.data[t].push({ id: n, ...e });
                        } catch (t) {
                            return new Promise((t) => {
                                t(-1);
                            });
                        }
                        return new Promise((t) => {
                            t(n);
                        });
                    }
                    try {
                        e.map((e) => {
                            this.data[t].push({ id: n++, ...e });
                        });
                    } catch (t) {
                        return new Promise((t) => {
                            t(!1);
                        });
                    }
                    return new Promise((t) => {
                        t(!0);
                    });
                }
                select(t, e) {
                    try {
                        return new Promise(
                            void 0 === e
                                ? (e) => {
                                    e(this.data[t].map(r));
                                }
                                : "number" == typeof e
                                    ? (n) => {
                                        n(r(this.data[t].find((t) => t.id === e)));
                                    }
                                    : (n) => {
                                        n(this.data[t].filter(this.makeFilter(e)).map(r));
                                    }
                        );
                    } catch (t) {
                        return new Promise((t) => {
                            t(null);
                        });
                    }
                }
                update(t, e, n) {
                    if ("number" == typeof e)
                        try {
                            return (
                                (this.data[t][e] = n),
                                new Promise((t) => {
                                    t(!0);
                                })
                            );
                        } catch (t) {
                            return new Promise((t) => {
                                t(!1);
                            });
                        }
                    const r = this.data[t].filter(this.makeFilter(e));
                    return r
                        ? (r.forEach((e) => {
                            const r = this.data[t][e.id];
                            for (const t in n) r[t] && "object" == typeof r[t] && "object" == typeof n[t] ? Object.assign(r[t], n[t]) : (r[t] = n[t]);
                            this.data[t][e.id] = r;
                        }),
                            new Promise((t) => {
                                t(!0);
                            }))
                        : new Promise((t) => {
                            t(!1);
                        });
                }
                delete(t, e) {
                    const n = this.data[t];
                    if (!n)
                        return new Promise((t) => {
                            t(!1);
                        });
                    if (!e)
                        return (
                            (this.data[t] = []),
                            new Promise((t) => {
                                t(!0);
                            })
                        );
                    const r = this.makeFilter(e);
                    return (
                        (this.data[t] = n.filter((t) => !r(t))),
                        new Promise((t) => {
                            t(!0);
                        })
                    );
                }
            };
        },
        7021: function (t, e, n) {
            "use strict";
            var r =
                (this && this.__createBinding) ||
                (Object.create
                    ? function (t, e, n, r) {
                        void 0 === r && (r = n);
                        var o = Object.getOwnPropertyDescriptor(e, n);
                        (o && !("get" in o ? !e.__esModule : o.writable || o.configurable)) ||
                            (o = {
                                enumerable: !0,
                                get: function () {
                                    return e[n];
                                },
                            }),
                            Object.defineProperty(t, r, o);
                    }
                    : function (t, e, n, r) {
                        void 0 === r && (r = n), (t[r] = e[n]);
                    }),
                o =
                    (this && this.__exportStar) ||
                    function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || r(e, t, n);
                    };
            Object.defineProperty(e, "__esModule", { value: !0 }), o(n(5118), e), o(n(7677), e), o(n(7121), e), o(n(2854), e);
        },
        7677: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 });
        },
        2854: function (t, e) {
            "use strict";
            var n;
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.Status = void 0),
                ((n = e.Status || (e.Status = {}))[(n.Locked = 0)] = "Locked"),
                (n[(n.Waiting = 1)] = "Waiting"),
                (n[(n.Ready = 2)] = "Ready"),
                (n[(n.Running = 3)] = "Running"),
                (n[(n.Completed = 4)] = "Completed"),
                (n[(n.Archived = 5)] = "Archived");
        },
        7121: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 });
        },
        5118: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 });
        },
        13: function (t, e, n) {
            "use strict";
            var r = n(6690),
                o = n(9728);
            function i(t) {
                return t && "object" == typeof t && "default" in t ? t : { default: t };
            }
            var a = i(r),
                s = i(o),
                u = [],
                c = u.forEach,
                l = u.slice,
                d = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,
                p = {
                    name: "cookie",
                    lookup: function (t) {
                        var e;
                        if (t.lookupCookie && "undefined" != typeof document) {
                            var n = (function (t) {
                                for (var e = "".concat(t, "="), n = document.cookie.split(";"), r = 0; r < n.length; r++) {
                                    for (var o = n[r]; " " === o.charAt(0);) o = o.substring(1, o.length);
                                    if (0 === o.indexOf(e)) return o.substring(e.length, o.length);
                                }
                                return null;
                            })(t.lookupCookie);
                            n && (e = n);
                        }
                        return e;
                    },
                    cacheUserLanguage: function (t, e) {
                        e.lookupCookie &&
                            "undefined" != typeof document &&
                            (function (t, e, n, r) {
                                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : { path: "/", sameSite: "strict" };
                                n && ((o.expires = new Date()), o.expires.setTime(o.expires.getTime() + 60 * n * 1e3)),
                                    r && (o.domain = r),
                                    (document.cookie = (function (t, e, n) {
                                        var r = n || {};
                                        r.path = r.path || "/";
                                        var o = encodeURIComponent(e),
                                            i = "".concat(t, "=").concat(o);
                                        if (r.maxAge > 0) {
                                            var a = r.maxAge - 0;
                                            if (Number.isNaN(a)) throw new Error("maxAge should be a Number");
                                            i += "; Max-Age=".concat(Math.floor(a));
                                        }
                                        if (r.domain) {
                                            if (!d.test(r.domain)) throw new TypeError("option domain is invalid");
                                            i += "; Domain=".concat(r.domain);
                                        }
                                        if (r.path) {
                                            if (!d.test(r.path)) throw new TypeError("option path is invalid");
                                            i += "; Path=".concat(r.path);
                                        }
                                        if (r.expires) {
                                            if ("function" != typeof r.expires.toUTCString) throw new TypeError("option expires is invalid");
                                            i += "; Expires=".concat(r.expires.toUTCString());
                                        }
                                        if ((r.httpOnly && (i += "; HttpOnly"), r.secure && (i += "; Secure"), r.sameSite))
                                            switch ("string" == typeof r.sameSite ? r.sameSite.toLowerCase() : r.sameSite) {
                                                case !0:
                                                    i += "; SameSite=Strict";
                                                    break;
                                                case "lax":
                                                    i += "; SameSite=Lax";
                                                    break;
                                                case "strict":
                                                    i += "; SameSite=Strict";
                                                    break;
                                                case "none":
                                                    i += "; SameSite=None";
                                                    break;
                                                default:
                                                    throw new TypeError("option sameSite is invalid");
                                            }
                                        return i;
                                    })(t, encodeURIComponent(e), o));
                            })(e.lookupCookie, t, e.cookieMinutes, e.cookieDomain, e.cookieOptions);
                    },
                },
                f = {
                    name: "querystring",
                    lookup: function (t) {
                        var e;
                        if ("undefined" != typeof window) {
                            var n = window.location.search;
                            !window.location.search && window.location.hash && window.location.hash.indexOf("?") > -1 && (n = window.location.hash.substring(window.location.hash.indexOf("?")));
                            for (var r = n.substring(1).split("&"), o = 0; o < r.length; o++) {
                                var i = r[o].indexOf("=");
                                i > 0 && r[o].substring(0, i) === t.lookupQuerystring && (e = r[o].substring(i + 1));
                            }
                        }
                        return e;
                    },
                },
                h = null,
                g = function () {
                    if (null !== h) return h;
                    try {
                        h = "undefined" !== window && null !== window.localStorage;
                        var t = "i18next.translate.boo";
                        window.localStorage.setItem(t, "foo"), window.localStorage.removeItem(t);
                    } catch (t) {
                        h = !1;
                    }
                    return h;
                },
                m = {
                    name: "localStorage",
                    lookup: function (t) {
                        var e;
                        if (t.lookupLocalStorage && g()) {
                            var n = window.localStorage.getItem(t.lookupLocalStorage);
                            n && (e = n);
                        }
                        return e;
                    },
                    cacheUserLanguage: function (t, e) {
                        e.lookupLocalStorage && g() && window.localStorage.setItem(e.lookupLocalStorage, t);
                    },
                },
                v = null,
                b = function () {
                    if (null !== v) return v;
                    try {
                        v = "undefined" !== window && null !== window.sessionStorage;
                        var t = "i18next.translate.boo";
                        window.sessionStorage.setItem(t, "foo"), window.sessionStorage.removeItem(t);
                    } catch (t) {
                        v = !1;
                    }
                    return v;
                },
                y = {
                    name: "sessionStorage",
                    lookup: function (t) {
                        var e;
                        if (t.lookupSessionStorage && b()) {
                            var n = window.sessionStorage.getItem(t.lookupSessionStorage);
                            n && (e = n);
                        }
                        return e;
                    },
                    cacheUserLanguage: function (t, e) {
                        e.lookupSessionStorage && b() && window.sessionStorage.setItem(e.lookupSessionStorage, t);
                    },
                },
                w = {
                    name: "navigator",
                    lookup: function (t) {
                        var e = [];
                        if ("undefined" != typeof navigator) {
                            if (navigator.languages) for (var n = 0; n < navigator.languages.length; n++) e.push(navigator.languages[n]);
                            navigator.userLanguage && e.push(navigator.userLanguage), navigator.language && e.push(navigator.language);
                        }
                        return e.length > 0 ? e : void 0;
                    },
                },
                k = {
                    name: "htmlTag",
                    lookup: function (t) {
                        var e,
                            n = t.htmlTag || ("undefined" != typeof document ? document.documentElement : null);
                        return n && "function" == typeof n.getAttribute && (e = n.getAttribute("lang")), e;
                    },
                },
                S = {
                    name: "path",
                    lookup: function (t) {
                        var e;
                        if ("undefined" != typeof window) {
                            var n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
                            if (n instanceof Array)
                                if ("number" == typeof t.lookupFromPathIndex) {
                                    if ("string" != typeof n[t.lookupFromPathIndex]) return;
                                    e = n[t.lookupFromPathIndex].replace("/", "");
                                } else e = n[0].replace("/", "");
                        }
                        return e;
                    },
                },
                O = {
                    name: "subdomain",
                    lookup: function (t) {
                        var e = "number" == typeof t.lookupFromSubdomainIndex ? t.lookupFromSubdomainIndex + 1 : 1,
                            n = "undefined" != typeof window && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
                        if (n) return n[e];
                    },
                },
                M = (function () {
                    function t(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        a.default(this, t), (this.type = "languageDetector"), (this.detectors = {}), this.init(e, n);
                    }
                    return (
                        s.default(t, [
                            {
                                key: "init",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                    (this.services = t),
                                        (this.options = (function (t) {
                                            return (
                                                c.call(l.call(arguments, 1), function (e) {
                                                    if (e) for (var n in e) void 0 === t[n] && (t[n] = e[n]);
                                                }),
                                                t
                                            );
                                        })(e, this.options || {}, {
                                            order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
                                            lookupQuerystring: "lng",
                                            lookupCookie: "i18next",
                                            lookupLocalStorage: "i18nextLng",
                                            lookupSessionStorage: "i18nextLng",
                                            caches: ["localStorage"],
                                            excludeCacheFor: ["cimode"],
                                        })),
                                        this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
                                        (this.i18nOptions = n),
                                        this.addDetector(p),
                                        this.addDetector(f),
                                        this.addDetector(m),
                                        this.addDetector(y),
                                        this.addDetector(w),
                                        this.addDetector(k),
                                        this.addDetector(S),
                                        this.addDetector(O);
                                },
                            },
                            {
                                key: "addDetector",
                                value: function (t) {
                                    this.detectors[t.name] = t;
                                },
                            },
                            {
                                key: "detect",
                                value: function (t) {
                                    var e = this;
                                    t || (t = this.options.order);
                                    var n = [];
                                    return (
                                        t.forEach(function (t) {
                                            if (e.detectors[t]) {
                                                var r = e.detectors[t].lookup(e.options);
                                                r && "string" == typeof r && (r = [r]), r && (n = n.concat(r));
                                            }
                                        }),
                                        this.services.languageUtils.getBestMatchFromCodes ? n : n.length > 0 ? n[0] : null
                                    );
                                },
                            },
                            {
                                key: "cacheUserLanguage",
                                value: function (t, e) {
                                    var n = this;
                                    e || (e = this.options.caches),
                                        e &&
                                        ((this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(t) > -1) ||
                                            e.forEach(function (e) {
                                                n.detectors[e] && n.detectors[e].cacheUserLanguage(t, n.options);
                                            }));
                                },
                            },
                        ]),
                        t
                    );
                })();
            (M.type = "languageDetector"), (t.exports = M);
        },
        6073: function (t, e, n) {
            "use strict";
            var r = n(8698),
                o = n(6690),
                i = n(9728),
                a = n(6115),
                s = n(1655),
                u = n(4993),
                c = n(3808),
                l = n(8416),
                d = n(1589);
            function p(t) {
                return t && "object" == typeof t && "default" in t ? t : { default: t };
            }
            var f = p(r),
                h = p(o),
                g = p(i),
                m = p(a),
                v = p(s),
                b = p(u),
                y = p(c),
                w = p(l),
                k = p(d);
            function S(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function O(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? S(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : S(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            var M = {
                type: "logger",
                log: function (t) {
                    this.output("log", t);
                },
                warn: function (t) {
                    this.output("warn", t);
                },
                error: function (t) {
                    this.output("error", t);
                },
                output: function (t, e) {
                    console && console[t] && console[t].apply(console, e);
                },
            },
                _ = (function () {
                    function t(e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        h.default(this, t), this.init(e, n);
                    }
                    return (
                        g.default(t, [
                            {
                                key: "init",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    (this.prefix = e.prefix || "i18next:"), (this.logger = t || M), (this.options = e), (this.debug = e.debug);
                                },
                            },
                            {
                                key: "setDebug",
                                value: function (t) {
                                    this.debug = t;
                                },
                            },
                            {
                                key: "log",
                                value: function () {
                                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                    return this.forward(e, "log", "", !0);
                                },
                            },
                            {
                                key: "warn",
                                value: function () {
                                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                    return this.forward(e, "warn", "", !0);
                                },
                            },
                            {
                                key: "error",
                                value: function () {
                                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                    return this.forward(e, "error", "");
                                },
                            },
                            {
                                key: "deprecate",
                                value: function () {
                                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                                    return this.forward(e, "warn", "WARNING DEPRECATED: ", !0);
                                },
                            },
                            {
                                key: "forward",
                                value: function (t, e, n, r) {
                                    return r && !this.debug ? null : ("string" == typeof t[0] && (t[0] = "".concat(n).concat(this.prefix, " ").concat(t[0])), this.logger[e](t));
                                },
                            },
                            {
                                key: "create",
                                value: function (e) {
                                    return new t(this.logger, O(O({}, { prefix: "".concat(this.prefix, ":").concat(e, ":") }), this.options));
                                },
                            },
                            {
                                key: "clone",
                                value: function (e) {
                                    return ((e = e || this.options).prefix = e.prefix || this.prefix), new t(this.logger, e);
                                },
                            },
                        ]),
                        t
                    );
                })(),
                x = new _(),
                E = (function () {
                    function t() {
                        h.default(this, t), (this.observers = {});
                    }
                    return (
                        g.default(t, [
                            {
                                key: "on",
                                value: function (t, e) {
                                    var n = this;
                                    return (
                                        t.split(" ").forEach(function (t) {
                                            (n.observers[t] = n.observers[t] || []), n.observers[t].push(e);
                                        }),
                                        this
                                    );
                                },
                            },
                            {
                                key: "off",
                                value: function (t, e) {
                                    this.observers[t] &&
                                        (e
                                            ? (this.observers[t] = this.observers[t].filter(function (t) {
                                                return t !== e;
                                            }))
                                            : delete this.observers[t]);
                                },
                            },
                            {
                                key: "emit",
                                value: function (t) {
                                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                                    this.observers[t] &&
                                        [].concat(this.observers[t]).forEach(function (t) {
                                            t.apply(void 0, n);
                                        }),
                                        this.observers["*"] &&
                                        [].concat(this.observers["*"]).forEach(function (e) {
                                            e.apply(e, [t].concat(n));
                                        });
                                },
                            },
                        ]),
                        t
                    );
                })();
            function R() {
                var t,
                    e,
                    n = new Promise(function (n, r) {
                        (t = n), (e = r);
                    });
                return (n.resolve = t), (n.reject = e), n;
            }
            function P(t) {
                return null == t ? "" : "" + t;
            }
            function C(t, e, n) {
                function r(t) {
                    return t && t.indexOf("###") > -1 ? t.replace(/###/g, ".") : t;
                }
                function o() {
                    return !t || "string" == typeof t;
                }
                for (var i = "string" != typeof e ? [].concat(e) : e.split("."); i.length > 1;) {
                    if (o()) return {};
                    var a = r(i.shift());
                    !t[a] && n && (t[a] = new n()), (t = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : {});
                }
                return o() ? {} : { obj: t, k: r(i.shift()) };
            }
            function L(t, e, n) {
                var r = C(t, e, Object);
                r.obj[r.k] = n;
            }
            function N(t, e) {
                var n = C(t, e),
                    r = n.obj,
                    o = n.k;
                if (r) return r[o];
            }
            function j(t, e, n) {
                var r = N(t, n);
                return void 0 !== r ? r : N(e, n);
            }
            function F(t, e, n) {
                for (var r in e)
                    "__proto__" !== r && "constructor" !== r && (r in t ? ("string" == typeof t[r] || t[r] instanceof String || "string" == typeof e[r] || e[r] instanceof String ? n && (t[r] = e[r]) : F(t[r], e[r], n)) : (t[r] = e[r]));
                return t;
            }
            function B(t) {
                return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }
            var D = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
            function T(t) {
                return "string" == typeof t
                    ? t.replace(/[&<>"'\/]/g, function (t) {
                        return D[t];
                    })
                    : t;
            }
            var A = "undefined" != typeof window && window.navigator && void 0 === window.navigator.userAgentData && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1,
                I = [" ", ",", "?", "!", ";"];
            function U(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function G(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? U(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : U(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            function $(t, e) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
                if (t) {
                    if (t[e]) return t[e];
                    for (var r = e.split(n), o = t, i = 0; i < r.length; ++i) {
                        if (!o) return;
                        if ("string" == typeof o[r[i]] && i + 1 < r.length) return;
                        if (void 0 === o[r[i]]) {
                            for (var a = 2, s = r.slice(i, i + a).join(n), u = o[s]; void 0 === u && r.length > i + a;) a++, (u = o[(s = r.slice(i, i + a).join(n))]);
                            if (void 0 === u) return;
                            if (null === u) return null;
                            if (e.endsWith(s)) {
                                if ("string" == typeof u) return u;
                                if (s && "string" == typeof u[s]) return u[s];
                            }
                            var c = r.slice(i + a).join(n);
                            return c ? $(u, c, n) : void 0;
                        }
                        o = o[r[i]];
                    }
                    return o;
                }
            }
            var z = (function (t) {
                v.default(o, t);
                var e,
                    n,
                    r =
                        ((e = o),
                            (n = (function () {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    r = y.default(e);
                                if (n) {
                                    var o = y.default(this).constructor;
                                    t = Reflect.construct(r, arguments, o);
                                } else t = r.apply(this, arguments);
                                return b.default(this, t);
                            });
                function o(t) {
                    var e,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { ns: ["translation"], defaultNS: "translation" };
                    return (
                        h.default(this, o),
                        (e = r.call(this)),
                        A && E.call(m.default(e)),
                        (e.data = t || {}),
                        (e.options = n),
                        void 0 === e.options.keySeparator && (e.options.keySeparator = "."),
                        void 0 === e.options.ignoreJSONStructure && (e.options.ignoreJSONStructure = !0),
                        e
                    );
                }
                return (
                    g.default(o, [
                        {
                            key: "addNamespaces",
                            value: function (t) {
                                this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
                            },
                        },
                        {
                            key: "removeNamespaces",
                            value: function (t) {
                                var e = this.options.ns.indexOf(t);
                                e > -1 && this.options.ns.splice(e, 1);
                            },
                        },
                        {
                            key: "getResource",
                            value: function (t, e, n) {
                                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                                    o = void 0 !== r.keySeparator ? r.keySeparator : this.options.keySeparator,
                                    i = void 0 !== r.ignoreJSONStructure ? r.ignoreJSONStructure : this.options.ignoreJSONStructure,
                                    a = [t, e];
                                n && "string" != typeof n && (a = a.concat(n)), n && "string" == typeof n && (a = a.concat(o ? n.split(o) : n)), t.indexOf(".") > -1 && (a = t.split("."));
                                var s = N(this.data, a);
                                return s || !i || "string" != typeof n ? s : $(this.data && this.data[t] && this.data[t][e], n, o);
                            },
                        },
                        {
                            key: "addResource",
                            value: function (t, e, n, r) {
                                var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : { silent: !1 },
                                    i = this.options.keySeparator;
                                void 0 === i && (i = ".");
                                var a = [t, e];
                                n && (a = a.concat(i ? n.split(i) : n)), t.indexOf(".") > -1 && ((r = e), (e = (a = t.split("."))[1])), this.addNamespaces(e), L(this.data, a, r), o.silent || this.emit("added", t, e, n, r);
                            },
                        },
                        {
                            key: "addResources",
                            value: function (t, e, n) {
                                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : { silent: !1 };
                                for (var o in n) ("string" != typeof n[o] && "[object Array]" !== Object.prototype.toString.apply(n[o])) || this.addResource(t, e, o, n[o], { silent: !0 });
                                r.silent || this.emit("added", t, e, n);
                            },
                        },
                        {
                            key: "addResourceBundle",
                            value: function (t, e, n, r, o) {
                                var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : { silent: !1 },
                                    a = [t, e];
                                t.indexOf(".") > -1 && ((r = n), (n = e), (e = (a = t.split("."))[1])), this.addNamespaces(e);
                                var s = N(this.data, a) || {};
                                r ? F(s, n, o) : (s = G(G({}, s), n)), L(this.data, a, s), i.silent || this.emit("added", t, e, n);
                            },
                        },
                        {
                            key: "removeResourceBundle",
                            value: function (t, e) {
                                this.hasResourceBundle(t, e) && delete this.data[t][e], this.removeNamespaces(e), this.emit("removed", t, e);
                            },
                        },
                        {
                            key: "hasResourceBundle",
                            value: function (t, e) {
                                return void 0 !== this.getResource(t, e);
                            },
                        },
                        {
                            key: "getResourceBundle",
                            value: function (t, e) {
                                return e || (e = this.options.defaultNS), "v1" === this.options.compatibilityAPI ? G(G({}, {}), this.getResource(t, e)) : this.getResource(t, e);
                            },
                        },
                        {
                            key: "getDataByLanguage",
                            value: function (t) {
                                return this.data[t];
                            },
                        },
                        {
                            key: "hasLanguageSomeTranslations",
                            value: function (t) {
                                var e = this.getDataByLanguage(t);
                                return !!((e && Object.keys(e)) || []).find(function (t) {
                                    return e[t] && Object.keys(e[t]).length > 0;
                                });
                            },
                        },
                        {
                            key: "toJSON",
                            value: function () {
                                return this.data;
                            },
                        },
                    ]),
                    o
                );
            })(E),
                W = {
                    processors: {},
                    addPostProcessor: function (t) {
                        this.processors[t.name] = t;
                    },
                    handle: function (t, e, n, r, o) {
                        var i = this;
                        return (
                            t.forEach(function (t) {
                                i.processors[t] && (e = i.processors[t].process(e, n, r, o));
                            }),
                            e
                        );
                    },
                };
            function H(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function V(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? H(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : H(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            var q = {},
                K = (function (t) {
                    v.default(o, t);
                    var e,
                        n,
                        r =
                            ((e = o),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        r = y.default(e);
                                    if (n) {
                                        var o = y.default(this).constructor;
                                        t = Reflect.construct(r, arguments, o);
                                    } else t = r.apply(this, arguments);
                                    return b.default(this, t);
                                });
                    function o(t) {
                        var e,
                            n,
                            i,
                            a,
                            s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return (
                            h.default(this, o),
                            (e = r.call(this)),
                            A && E.call(m.default(e)),
                            (n = ["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"]),
                            (i = t),
                            (a = m.default(e)),
                            n.forEach(function (t) {
                                i[t] && (a[t] = i[t]);
                            }),
                            (e.options = s),
                            void 0 === e.options.keySeparator && (e.options.keySeparator = "."),
                            (e.logger = x.create("translator")),
                            e
                        );
                    }
                    return (
                        g.default(
                            o,
                            [
                                {
                                    key: "changeLanguage",
                                    value: function (t) {
                                        t && (this.language = t);
                                    },
                                },
                                {
                                    key: "exists",
                                    value: function (t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { interpolation: {} };
                                        if (null == t) return !1;
                                        var n = this.resolve(t, e);
                                        return n && void 0 !== n.res;
                                    },
                                },
                                {
                                    key: "extractFromKey",
                                    value: function (t, e) {
                                        var n = void 0 !== e.nsSeparator ? e.nsSeparator : this.options.nsSeparator;
                                        void 0 === n && (n = ":");
                                        var r = void 0 !== e.keySeparator ? e.keySeparator : this.options.keySeparator,
                                            o = e.ns || this.options.defaultNS || [],
                                            i = n && t.indexOf(n) > -1,
                                            a = !(
                                                this.options.userDefinedKeySeparator ||
                                                e.keySeparator ||
                                                this.options.userDefinedNsSeparator ||
                                                e.nsSeparator ||
                                                (function (t, e, n) {
                                                    (e = e || ""), (n = n || "");
                                                    var r = I.filter(function (t) {
                                                        return e.indexOf(t) < 0 && n.indexOf(t) < 0;
                                                    });
                                                    if (0 === r.length) return !0;
                                                    var o = new RegExp(
                                                        "(".concat(
                                                            r
                                                                .map(function (t) {
                                                                    return "?" === t ? "\\?" : t;
                                                                })
                                                                .join("|"),
                                                            ")"
                                                        )
                                                    ),
                                                        i = !o.test(t);
                                                    if (!i) {
                                                        var a = t.indexOf(n);
                                                        a > 0 && !o.test(t.substring(0, a)) && (i = !0);
                                                    }
                                                    return i;
                                                })(t, n, r)
                                            );
                                        if (i && !a) {
                                            var s = t.match(this.interpolator.nestingRegexp);
                                            if (s && s.length > 0) return { key: t, namespaces: o };
                                            var u = t.split(n);
                                            (n !== r || (n === r && this.options.ns.indexOf(u[0]) > -1)) && (o = u.shift()), (t = u.join(r));
                                        }
                                        return "string" == typeof o && (o = [o]), { key: t, namespaces: o };
                                    },
                                },
                                {
                                    key: "translate",
                                    value: function (t, e, n) {
                                        var r = this;
                                        if (("object" !== f.default(e) && this.options.overloadTranslationOptionHandler && (e = this.options.overloadTranslationOptionHandler(arguments)), e || (e = {}), null == t)) return "";
                                        Array.isArray(t) || (t = [String(t)]);
                                        var i = void 0 !== e.returnDetails ? e.returnDetails : this.options.returnDetails,
                                            a = void 0 !== e.keySeparator ? e.keySeparator : this.options.keySeparator,
                                            s = this.extractFromKey(t[t.length - 1], e),
                                            u = s.key,
                                            c = s.namespaces,
                                            l = c[c.length - 1],
                                            d = e.lng || this.language,
                                            p = e.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                                        if (d && "cimode" === d.toLowerCase()) {
                                            if (p) {
                                                var h = e.nsSeparator || this.options.nsSeparator;
                                                return i ? ((g.res = "".concat(l).concat(h).concat(u)), g) : "".concat(l).concat(h).concat(u);
                                            }
                                            return i ? ((g.res = u), g) : u;
                                        }
                                        var g = this.resolve(t, e),
                                            m = g && g.res,
                                            v = (g && g.usedKey) || u,
                                            b = (g && g.exactUsedKey) || u,
                                            y = Object.prototype.toString.apply(m),
                                            w = void 0 !== e.joinArrays ? e.joinArrays : this.options.joinArrays,
                                            k = !this.i18nFormat || this.i18nFormat.handleAsObject;
                                        if (
                                            k &&
                                            m &&
                                            "string" != typeof m &&
                                            "boolean" != typeof m &&
                                            "number" != typeof m &&
                                            ["[object Number]", "[object Function]", "[object RegExp]"].indexOf(y) < 0 &&
                                            ("string" != typeof w || "[object Array]" !== y)
                                        ) {
                                            if (!e.returnObjects && !this.options.returnObjects) {
                                                this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                                                var S = this.options.returnedObjectHandler
                                                    ? this.options.returnedObjectHandler(v, m, V(V({}, e), {}, { ns: c }))
                                                    : "key '".concat(u, " (").concat(this.language, ")' returned an object instead of string.");
                                                return i ? ((g.res = S), g) : S;
                                            }
                                            if (a) {
                                                var O = "[object Array]" === y,
                                                    M = O ? [] : {},
                                                    _ = O ? b : v;
                                                for (var x in m)
                                                    if (Object.prototype.hasOwnProperty.call(m, x)) {
                                                        var E = "".concat(_).concat(a).concat(x);
                                                        (M[x] = this.translate(E, V(V({}, e), { joinArrays: !1, ns: c }))), M[x] === E && (M[x] = m[x]);
                                                    }
                                                m = M;
                                            }
                                        } else if (k && "string" == typeof w && "[object Array]" === y) (m = m.join(w)) && (m = this.extendTranslation(m, t, e, n));
                                        else {
                                            var R = !1,
                                                P = !1,
                                                C = void 0 !== e.count && "string" != typeof e.count,
                                                L = o.hasDefaultValue(e),
                                                N = C ? this.pluralResolver.getSuffix(d, e.count, e) : "",
                                                j = e["defaultValue".concat(N)] || e.defaultValue;
                                            !this.isValidLookup(m) && L && ((R = !0), (m = j)), this.isValidLookup(m) || ((P = !0), (m = u));
                                            var F = (e.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && P ? void 0 : m,
                                                B = L && j !== m && this.options.updateMissing;
                                            if (P || R || B) {
                                                if ((this.logger.log(B ? "updateKey" : "missingKey", d, l, u, B ? j : m), a)) {
                                                    var D = this.resolve(u, V(V({}, e), {}, { keySeparator: !1 }));
                                                    D &&
                                                        D.res &&
                                                        this.logger.warn(
                                                            "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
                                                        );
                                                }
                                                var T = [],
                                                    A = this.languageUtils.getFallbackCodes(this.options.fallbackLng, e.lng || this.language);
                                                if ("fallback" === this.options.saveMissingTo && A && A[0]) for (var I = 0; I < A.length; I++) T.push(A[I]);
                                                else "all" === this.options.saveMissingTo ? (T = this.languageUtils.toResolveHierarchy(e.lng || this.language)) : T.push(e.lng || this.language);
                                                var U = function (t, n, o) {
                                                    var i = L && o !== m ? o : F;
                                                    r.options.missingKeyHandler ? r.options.missingKeyHandler(t, l, n, i, B, e) : r.backendConnector && r.backendConnector.saveMissing && r.backendConnector.saveMissing(t, l, n, i, B, e),
                                                        r.emit("missingKey", t, l, n, m);
                                                };
                                                this.options.saveMissing &&
                                                    (this.options.saveMissingPlurals && C
                                                        ? T.forEach(function (t) {
                                                            r.pluralResolver.getSuffixes(t, e).forEach(function (n) {
                                                                U([t], u + n, e["defaultValue".concat(n)] || j);
                                                            });
                                                        })
                                                        : U(T, u, j));
                                            }
                                            (m = this.extendTranslation(m, t, e, g, n)),
                                                P && m === u && this.options.appendNamespaceToMissingKey && (m = "".concat(l, ":").concat(u)),
                                                (P || R) &&
                                                this.options.parseMissingKeyHandler &&
                                                (m =
                                                    "v1" !== this.options.compatibilityAPI
                                                        ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(l, ":").concat(u) : u, R ? m : void 0)
                                                        : this.options.parseMissingKeyHandler(m));
                                        }
                                        return i ? ((g.res = m), g) : m;
                                    },
                                },
                                {
                                    key: "extendTranslation",
                                    value: function (t, e, n, r, o) {
                                        var i = this;
                                        if (this.i18nFormat && this.i18nFormat.parse) t = this.i18nFormat.parse(t, V(V({}, this.options.interpolation.defaultVariables), n), r.usedLng, r.usedNS, r.usedKey, { resolved: r });
                                        else if (!n.skipInterpolation) {
                                            n.interpolation && this.interpolator.init(V(V({}, n), { interpolation: V(V({}, this.options.interpolation), n.interpolation) }));
                                            var a,
                                                s = "string" == typeof t && (n && n.interpolation && void 0 !== n.interpolation.skipOnVariables ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                                            if (s) {
                                                var u = t.match(this.interpolator.nestingRegexp);
                                                a = u && u.length;
                                            }
                                            var c = n.replace && "string" != typeof n.replace ? n.replace : n;
                                            if ((this.options.interpolation.defaultVariables && (c = V(V({}, this.options.interpolation.defaultVariables), c)), (t = this.interpolator.interpolate(t, c, n.lng || this.language, n)), s)) {
                                                var l = t.match(this.interpolator.nestingRegexp);
                                                a < (l && l.length) && (n.nest = !1);
                                            }
                                            !1 !== n.nest &&
                                                (t = this.interpolator.nest(
                                                    t,
                                                    function () {
                                                        for (var t = arguments.length, r = new Array(t), a = 0; a < t; a++) r[a] = arguments[a];
                                                        return o && o[0] === r[0] && !n.context
                                                            ? (i.logger.warn("It seems you are nesting recursively key: ".concat(r[0], " in key: ").concat(e[0])), null)
                                                            : i.translate.apply(i, r.concat([e]));
                                                    },
                                                    n
                                                )),
                                                n.interpolation && this.interpolator.reset();
                                        }
                                        var d = n.postProcess || this.options.postProcess,
                                            p = "string" == typeof d ? [d] : d;
                                        return null != t && p && p.length && !1 !== n.applyPostProcessor && (t = W.handle(p, t, e, this.options && this.options.postProcessPassResolved ? V({ i18nResolved: r }, n) : n, this)), t;
                                    },
                                },
                                {
                                    key: "resolve",
                                    value: function (t) {
                                        var e,
                                            n,
                                            r,
                                            o,
                                            i,
                                            a = this,
                                            s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                        return (
                                            "string" == typeof t && (t = [t]),
                                            t.forEach(function (t) {
                                                if (!a.isValidLookup(e)) {
                                                    var u = a.extractFromKey(t, s),
                                                        c = u.key;
                                                    n = c;
                                                    var l = u.namespaces;
                                                    a.options.fallbackNS && (l = l.concat(a.options.fallbackNS));
                                                    var d = void 0 !== s.count && "string" != typeof s.count,
                                                        p = d && !s.ordinal && 0 === s.count && a.pluralResolver.shouldUseIntlApi(),
                                                        f = void 0 !== s.context && ("string" == typeof s.context || "number" == typeof s.context) && "" !== s.context,
                                                        h = s.lngs ? s.lngs : a.languageUtils.toResolveHierarchy(s.lng || a.language, s.fallbackLng);
                                                    l.forEach(function (t) {
                                                        a.isValidLookup(e) ||
                                                            ((i = t),
                                                                !q["".concat(h[0], "-").concat(t)] &&
                                                                a.utils &&
                                                                a.utils.hasLoadedNamespace &&
                                                                !a.utils.hasLoadedNamespace(i) &&
                                                                ((q["".concat(h[0], "-").concat(t)] = !0),
                                                                    a.logger.warn(
                                                                        'key "'.concat(n, '" for languages "').concat(h.join(", "), '" won\'t get resolved as namespace "').concat(i, '" was not yet loaded'),
                                                                        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
                                                                    )),
                                                                h.forEach(function (n) {
                                                                    if (!a.isValidLookup(e)) {
                                                                        o = n;
                                                                        var i,
                                                                            u = [c];
                                                                        if (a.i18nFormat && a.i18nFormat.addLookupKeys) a.i18nFormat.addLookupKeys(u, c, n, t, s);
                                                                        else {
                                                                            var l;
                                                                            d && (l = a.pluralResolver.getSuffix(n, s.count, s));
                                                                            var h = "".concat(a.options.pluralSeparator, "zero");
                                                                            if ((d && (u.push(c + l), p && u.push(c + h)), f)) {
                                                                                var g = "".concat(c).concat(a.options.contextSeparator).concat(s.context);
                                                                                u.push(g), d && (u.push(g + l), p && u.push(g + h));
                                                                            }
                                                                        }
                                                                        for (; (i = u.pop());) a.isValidLookup(e) || ((r = i), (e = a.getResource(n, t, i, s)));
                                                                    }
                                                                }));
                                                    });
                                                }
                                            }),
                                            { res: e, usedKey: n, exactUsedKey: r, usedLng: o, usedNS: i }
                                        );
                                    },
                                },
                                {
                                    key: "isValidLookup",
                                    value: function (t) {
                                        return !(void 0 === t || (!this.options.returnNull && null === t) || (!this.options.returnEmptyString && "" === t));
                                    },
                                },
                                {
                                    key: "getResource",
                                    value: function (t, e, n) {
                                        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                                        return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(t, e, n, r) : this.resourceStore.getResource(t, e, n, r);
                                    },
                                },
                            ],
                            [
                                {
                                    key: "hasDefaultValue",
                                    value: function (t) {
                                        var e = "defaultValue";
                                        for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n) && e === n.substring(0, e.length) && void 0 !== t[n]) return !0;
                                        return !1;
                                    },
                                },
                            ]
                        ),
                        o
                    );
                })(E);
            function J(t) {
                return t.charAt(0).toUpperCase() + t.slice(1);
            }
            var Y = (function () {
                function t(e) {
                    h.default(this, t), (this.options = e), (this.supportedLngs = this.options.supportedLngs || !1), (this.logger = x.create("languageUtils"));
                }
                return (
                    g.default(t, [
                        {
                            key: "getScriptPartFromCode",
                            value: function (t) {
                                if (!t || t.indexOf("-") < 0) return null;
                                var e = t.split("-");
                                return 2 === e.length ? null : (e.pop(), "x" === e[e.length - 1].toLowerCase() ? null : this.formatLanguageCode(e.join("-")));
                            },
                        },
                        {
                            key: "getLanguagePartFromCode",
                            value: function (t) {
                                if (!t || t.indexOf("-") < 0) return t;
                                var e = t.split("-");
                                return this.formatLanguageCode(e[0]);
                            },
                        },
                        {
                            key: "formatLanguageCode",
                            value: function (t) {
                                if ("string" == typeof t && t.indexOf("-") > -1) {
                                    var e = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
                                        n = t.split("-");
                                    return (
                                        this.options.lowerCaseLng
                                            ? (n = n.map(function (t) {
                                                return t.toLowerCase();
                                            }))
                                            : 2 === n.length
                                                ? ((n[0] = n[0].toLowerCase()), (n[1] = n[1].toUpperCase()), e.indexOf(n[1].toLowerCase()) > -1 && (n[1] = J(n[1].toLowerCase())))
                                                : 3 === n.length &&
                                                ((n[0] = n[0].toLowerCase()),
                                                    2 === n[1].length && (n[1] = n[1].toUpperCase()),
                                                    "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()),
                                                    e.indexOf(n[1].toLowerCase()) > -1 && (n[1] = J(n[1].toLowerCase())),
                                                    e.indexOf(n[2].toLowerCase()) > -1 && (n[2] = J(n[2].toLowerCase()))),
                                        n.join("-")
                                    );
                                }
                                return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
                            },
                        },
                        {
                            key: "isSupportedCode",
                            value: function (t) {
                                return (
                                    ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)),
                                    !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1
                                );
                            },
                        },
                        {
                            key: "getBestMatchFromCodes",
                            value: function (t) {
                                var e,
                                    n = this;
                                return t
                                    ? (t.forEach(function (t) {
                                        if (!e) {
                                            var r = n.formatLanguageCode(t);
                                            (n.options.supportedLngs && !n.isSupportedCode(r)) || (e = r);
                                        }
                                    }),
                                        !e &&
                                        this.options.supportedLngs &&
                                        t.forEach(function (t) {
                                            if (!e) {
                                                var r = n.getLanguagePartFromCode(t);
                                                if (n.isSupportedCode(r)) return (e = r);
                                                e = n.options.supportedLngs.find(function (t) {
                                                    if (0 === t.indexOf(r)) return t;
                                                });
                                            }
                                        }),
                                        e || (e = this.getFallbackCodes(this.options.fallbackLng)[0]),
                                        e)
                                    : null;
                            },
                        },
                        {
                            key: "getFallbackCodes",
                            value: function (t, e) {
                                if (!t) return [];
                                if (("function" == typeof t && (t = t(e)), "string" == typeof t && (t = [t]), "[object Array]" === Object.prototype.toString.apply(t))) return t;
                                if (!e) return t.default || [];
                                var n = t[e];
                                return n || (n = t[this.getScriptPartFromCode(e)]), n || (n = t[this.formatLanguageCode(e)]), n || (n = t[this.getLanguagePartFromCode(e)]), n || (n = t.default), n || [];
                            },
                        },
                        {
                            key: "toResolveHierarchy",
                            value: function (t, e) {
                                var n = this,
                                    r = this.getFallbackCodes(e || this.options.fallbackLng || [], t),
                                    o = [],
                                    i = function (t) {
                                        t && (n.isSupportedCode(t) ? o.push(t) : n.logger.warn("rejecting language code not found in supportedLngs: ".concat(t)));
                                    };
                                return (
                                    "string" == typeof t && t.indexOf("-") > -1
                                        ? ("languageOnly" !== this.options.load && i(this.formatLanguageCode(t)),
                                            "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && i(this.getScriptPartFromCode(t)),
                                            "currentOnly" !== this.options.load && i(this.getLanguagePartFromCode(t)))
                                        : "string" == typeof t && i(this.formatLanguageCode(t)),
                                    r.forEach(function (t) {
                                        o.indexOf(t) < 0 && i(n.formatLanguageCode(t));
                                    }),
                                    o
                                );
                            },
                        },
                    ]),
                    t
                );
            })(),
                Q = [
                    { lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"], nr: [1, 2], fc: 1 },
                    {
                        lngs: [
                            "af",
                            "an",
                            "ast",
                            "az",
                            "bg",
                            "bn",
                            "ca",
                            "da",
                            "de",
                            "dev",
                            "el",
                            "en",
                            "eo",
                            "es",
                            "et",
                            "eu",
                            "fi",
                            "fo",
                            "fur",
                            "fy",
                            "gl",
                            "gu",
                            "ha",
                            "hi",
                            "hu",
                            "hy",
                            "ia",
                            "it",
                            "kk",
                            "kn",
                            "ku",
                            "lb",
                            "mai",
                            "ml",
                            "mn",
                            "mr",
                            "nah",
                            "nap",
                            "nb",
                            "ne",
                            "nl",
                            "nn",
                            "no",
                            "nso",
                            "pa",
                            "pap",
                            "pms",
                            "ps",
                            "pt-PT",
                            "rm",
                            "sco",
                            "se",
                            "si",
                            "so",
                            "son",
                            "sq",
                            "sv",
                            "sw",
                            "ta",
                            "te",
                            "tk",
                            "ur",
                            "yo",
                        ],
                        nr: [1, 2],
                        fc: 2,
                    },
                    { lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"], nr: [1], fc: 3 },
                    { lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"], nr: [1, 2, 5], fc: 4 },
                    { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
                    { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 },
                    { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 },
                    { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 },
                    { lngs: ["fr"], nr: [1, 2], fc: 9 },
                    { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 },
                    { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 },
                    { lngs: ["is"], nr: [1, 2], fc: 12 },
                    { lngs: ["jv"], nr: [0, 1], fc: 13 },
                    { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 },
                    { lngs: ["lt"], nr: [1, 2, 10], fc: 15 },
                    { lngs: ["lv"], nr: [1, 2, 0], fc: 16 },
                    { lngs: ["mk"], nr: [1, 2], fc: 17 },
                    { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 },
                    { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 },
                    { lngs: ["or"], nr: [2, 1], fc: 2 },
                    { lngs: ["ro"], nr: [1, 2, 20], fc: 20 },
                    { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 },
                    { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 },
                ],
                X = {
                    1: function (t) {
                        return Number(t > 1);
                    },
                    2: function (t) {
                        return Number(1 != t);
                    },
                    3: function (t) {
                        return 0;
                    },
                    4: function (t) {
                        return Number(t % 10 == 1 && t % 100 != 11 ? 0 : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2);
                    },
                    5: function (t) {
                        return Number(0 == t ? 0 : 1 == t ? 1 : 2 == t ? 2 : t % 100 >= 3 && t % 100 <= 10 ? 3 : t % 100 >= 11 ? 4 : 5);
                    },
                    6: function (t) {
                        return Number(1 == t ? 0 : t >= 2 && t <= 4 ? 1 : 2);
                    },
                    7: function (t) {
                        return Number(1 == t ? 0 : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2);
                    },
                    8: function (t) {
                        return Number(1 == t ? 0 : 2 == t ? 1 : 8 != t && 11 != t ? 2 : 3);
                    },
                    9: function (t) {
                        return Number(t >= 2);
                    },
                    10: function (t) {
                        return Number(1 == t ? 0 : 2 == t ? 1 : t < 7 ? 2 : t < 11 ? 3 : 4);
                    },
                    11: function (t) {
                        return Number(1 == t || 11 == t ? 0 : 2 == t || 12 == t ? 1 : t > 2 && t < 20 ? 2 : 3);
                    },
                    12: function (t) {
                        return Number(t % 10 != 1 || t % 100 == 11);
                    },
                    13: function (t) {
                        return Number(0 !== t);
                    },
                    14: function (t) {
                        return Number(1 == t ? 0 : 2 == t ? 1 : 3 == t ? 2 : 3);
                    },
                    15: function (t) {
                        return Number(t % 10 == 1 && t % 100 != 11 ? 0 : t % 10 >= 2 && (t % 100 < 10 || t % 100 >= 20) ? 1 : 2);
                    },
                    16: function (t) {
                        return Number(t % 10 == 1 && t % 100 != 11 ? 0 : 0 !== t ? 1 : 2);
                    },
                    17: function (t) {
                        return Number(1 == t || (t % 10 == 1 && t % 100 != 11) ? 0 : 1);
                    },
                    18: function (t) {
                        return Number(0 == t ? 0 : 1 == t ? 1 : 2);
                    },
                    19: function (t) {
                        return Number(1 == t ? 0 : 0 == t || (t % 100 > 1 && t % 100 < 11) ? 1 : t % 100 > 10 && t % 100 < 20 ? 2 : 3);
                    },
                    20: function (t) {
                        return Number(1 == t ? 0 : 0 == t || (t % 100 > 0 && t % 100 < 20) ? 1 : 2);
                    },
                    21: function (t) {
                        return Number(t % 100 == 1 ? 1 : t % 100 == 2 ? 2 : t % 100 == 3 || t % 100 == 4 ? 3 : 0);
                    },
                    22: function (t) {
                        return Number(1 == t ? 0 : 2 == t ? 1 : (t < 0 || t > 10) && t % 10 == 0 ? 2 : 3);
                    },
                },
                Z = ["v1", "v2", "v3"],
                tt = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 },
                et = (function () {
                    function t(e) {
                        var n,
                            r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        h.default(this, t),
                            (this.languageUtils = e),
                            (this.options = r),
                            (this.logger = x.create("pluralResolver")),
                            (this.options.compatibilityJSON && "v4" !== this.options.compatibilityJSON) ||
                            ("undefined" != typeof Intl && Intl.PluralRules) ||
                            ((this.options.compatibilityJSON = "v3"),
                                this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),
                            (this.rules =
                                ((n = {}),
                                    Q.forEach(function (t) {
                                        t.lngs.forEach(function (e) {
                                            n[e] = { numbers: t.nr, plurals: X[t.fc] };
                                        });
                                    }),
                                    n));
                    }
                    return (
                        g.default(t, [
                            {
                                key: "addRule",
                                value: function (t, e) {
                                    this.rules[t] = e;
                                },
                            },
                            {
                                key: "getRule",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                    if (this.shouldUseIntlApi())
                                        try {
                                            return new Intl.PluralRules(t, { type: e.ordinal ? "ordinal" : "cardinal" });
                                        } catch (t) {
                                            return;
                                        }
                                    return this.rules[t] || this.rules[this.languageUtils.getLanguagePartFromCode(t)];
                                },
                            },
                            {
                                key: "needsPlural",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                        n = this.getRule(t, e);
                                    return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1;
                                },
                            },
                            {
                                key: "getPluralFormsOfKey",
                                value: function (t, e) {
                                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                    return this.getSuffixes(t, n).map(function (t) {
                                        return "".concat(e).concat(t);
                                    });
                                },
                            },
                            {
                                key: "getSuffixes",
                                value: function (t) {
                                    var e = this,
                                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                        r = this.getRule(t, n);
                                    return r
                                        ? this.shouldUseIntlApi()
                                            ? r
                                                .resolvedOptions()
                                                .pluralCategories.sort(function (t, e) {
                                                    return tt[t] - tt[e];
                                                })
                                                .map(function (t) {
                                                    return "".concat(e.options.prepend).concat(t);
                                                })
                                            : r.numbers.map(function (r) {
                                                return e.getSuffix(t, r, n);
                                            })
                                        : [];
                                },
                            },
                            {
                                key: "getSuffix",
                                value: function (t, e) {
                                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                        r = this.getRule(t, n);
                                    return r ? (this.shouldUseIntlApi() ? "".concat(this.options.prepend).concat(r.select(e)) : this.getSuffixRetroCompatible(r, e)) : (this.logger.warn("no plural rule found for: ".concat(t)), "");
                                },
                            },
                            {
                                key: "getSuffixRetroCompatible",
                                value: function (t, e) {
                                    var n = this,
                                        r = t.noAbs ? t.plurals(e) : t.plurals(Math.abs(e)),
                                        o = t.numbers[r];
                                    this.options.simplifyPluralSuffix && 2 === t.numbers.length && 1 === t.numbers[0] && (2 === o ? (o = "plural") : 1 === o && (o = ""));
                                    var i = function () {
                                        return n.options.prepend && o.toString() ? n.options.prepend + o.toString() : o.toString();
                                    };
                                    return "v1" === this.options.compatibilityJSON
                                        ? 1 === o
                                            ? ""
                                            : "number" == typeof o
                                                ? "_plural_".concat(o.toString())
                                                : i()
                                        : "v2" === this.options.compatibilityJSON || (this.options.simplifyPluralSuffix && 2 === t.numbers.length && 1 === t.numbers[0])
                                            ? i()
                                            : this.options.prepend && r.toString()
                                                ? this.options.prepend + r.toString()
                                                : r.toString();
                                },
                            },
                            {
                                key: "shouldUseIntlApi",
                                value: function () {
                                    return !Z.includes(this.options.compatibilityJSON);
                                },
                            },
                        ]),
                        t
                    );
                })();
            function nt(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function rt(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? nt(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : nt(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            var ot = (function () {
                function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    h.default(this, t),
                        (this.logger = x.create("interpolator")),
                        (this.options = e),
                        (this.format =
                            (e.interpolation && e.interpolation.format) ||
                            function (t) {
                                return t;
                            }),
                        this.init(e);
                }
                return (
                    g.default(t, [
                        {
                            key: "init",
                            value: function () {
                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                t.interpolation || (t.interpolation = { escapeValue: !0 });
                                var e = t.interpolation;
                                (this.escape = void 0 !== e.escape ? e.escape : T),
                                    (this.escapeValue = void 0 === e.escapeValue || e.escapeValue),
                                    (this.useRawValueToEscape = void 0 !== e.useRawValueToEscape && e.useRawValueToEscape),
                                    (this.prefix = e.prefix ? B(e.prefix) : e.prefixEscaped || "{{"),
                                    (this.suffix = e.suffix ? B(e.suffix) : e.suffixEscaped || "}}"),
                                    (this.formatSeparator = e.formatSeparator ? e.formatSeparator : e.formatSeparator || ","),
                                    (this.unescapePrefix = e.unescapeSuffix ? "" : e.unescapePrefix || "-"),
                                    (this.unescapeSuffix = this.unescapePrefix ? "" : e.unescapeSuffix || ""),
                                    (this.nestingPrefix = e.nestingPrefix ? B(e.nestingPrefix) : e.nestingPrefixEscaped || B("$t(")),
                                    (this.nestingSuffix = e.nestingSuffix ? B(e.nestingSuffix) : e.nestingSuffixEscaped || B(")")),
                                    (this.nestingOptionsSeparator = e.nestingOptionsSeparator ? e.nestingOptionsSeparator : e.nestingOptionsSeparator || ","),
                                    (this.maxReplaces = e.maxReplaces ? e.maxReplaces : 1e3),
                                    (this.alwaysFormat = void 0 !== e.alwaysFormat && e.alwaysFormat),
                                    this.resetRegExp();
                            },
                        },
                        {
                            key: "reset",
                            value: function () {
                                this.options && this.init(this.options);
                            },
                        },
                        {
                            key: "resetRegExp",
                            value: function () {
                                var t = "".concat(this.prefix, "(.+?)").concat(this.suffix);
                                this.regexp = new RegExp(t, "g");
                                var e = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
                                this.regexpUnescape = new RegExp(e, "g");
                                var n = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
                                this.nestingRegexp = new RegExp(n, "g");
                            },
                        },
                        {
                            key: "interpolate",
                            value: function (t, e, n, r) {
                                var o,
                                    i,
                                    a,
                                    s = this,
                                    u = (this.options && this.options.interpolation && this.options.interpolation.defaultVariables) || {};
                                function c(t) {
                                    return t.replace(/\$/g, "$$$$");
                                }
                                var l = function (t) {
                                    if (t.indexOf(s.formatSeparator) < 0) {
                                        var o = j(e, u, t);
                                        return s.alwaysFormat ? s.format(o, void 0, n, rt(rt(rt({}, r), e), {}, { interpolationkey: t })) : o;
                                    }
                                    var i = t.split(s.formatSeparator),
                                        a = i.shift().trim(),
                                        c = i.join(s.formatSeparator).trim();
                                    return s.format(j(e, u, a), c, n, rt(rt(rt({}, r), e), {}, { interpolationkey: a }));
                                };
                                this.resetRegExp();
                                var d = (r && r.missingInterpolationHandler) || this.options.missingInterpolationHandler,
                                    p = r && r.interpolation && void 0 !== r.interpolation.skipOnVariables ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                                return (
                                    [
                                        {
                                            regex: this.regexpUnescape,
                                            safeValue: function (t) {
                                                return c(t);
                                            },
                                        },
                                        {
                                            regex: this.regexp,
                                            safeValue: function (t) {
                                                return s.escapeValue ? c(s.escape(t)) : c(t);
                                            },
                                        },
                                    ].forEach(function (e) {
                                        for (a = 0; (o = e.regex.exec(t));) {
                                            var n = o[1].trim();
                                            if (void 0 === (i = l(n)))
                                                if ("function" == typeof d) {
                                                    var u = d(t, o, r);
                                                    i = "string" == typeof u ? u : "";
                                                } else if (r && r.hasOwnProperty(n)) i = "";
                                                else {
                                                    if (p) {
                                                        i = o[0];
                                                        continue;
                                                    }
                                                    s.logger.warn("missed to pass in variable ".concat(n, " for interpolating ").concat(t)), (i = "");
                                                }
                                            else "string" == typeof i || s.useRawValueToEscape || (i = P(i));
                                            var c = e.safeValue(i);
                                            if (((t = t.replace(o[0], c)), p ? ((e.regex.lastIndex += i.length), (e.regex.lastIndex -= o[0].length)) : (e.regex.lastIndex = 0), ++a >= s.maxReplaces)) break;
                                        }
                                    }),
                                    t
                                );
                            },
                        },
                        {
                            key: "nest",
                            value: function (t, e) {
                                var n,
                                    r,
                                    o = this,
                                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                    a = rt({}, i);
                                function s(t, e) {
                                    var n = this.nestingOptionsSeparator;
                                    if (t.indexOf(n) < 0) return t;
                                    var r = t.split(new RegExp("".concat(n, "[ ]*{"))),
                                        o = "{".concat(r[1]);
                                    t = r[0];
                                    var i = (o = this.interpolate(o, a)).match(/'/g),
                                        s = o.match(/"/g);
                                    ((i && i.length % 2 == 0 && !s) || s.length % 2 != 0) && (o = o.replace(/'/g, '"'));
                                    try {
                                        (a = JSON.parse(o)), e && (a = rt(rt({}, e), a));
                                    } catch (e) {
                                        return this.logger.warn("failed parsing options string in nesting for key ".concat(t), e), "".concat(t).concat(n).concat(o);
                                    }
                                    return delete a.defaultValue, t;
                                }
                                for (a.applyPostProcessor = !1, delete a.defaultValue; (n = this.nestingRegexp.exec(t));) {
                                    var u = [],
                                        c = !1;
                                    if (-1 !== n[0].indexOf(this.formatSeparator) && !/{.*}/.test(n[1])) {
                                        var l = n[1].split(this.formatSeparator).map(function (t) {
                                            return t.trim();
                                        });
                                        (n[1] = l.shift()), (u = l), (c = !0);
                                    }
                                    if ((r = e(s.call(this, n[1].trim(), a), a)) && n[0] === t && "string" != typeof r) return r;
                                    "string" != typeof r && (r = P(r)),
                                        r || (this.logger.warn("missed to resolve ".concat(n[1], " for nesting ").concat(t)), (r = "")),
                                        c &&
                                        (r = u.reduce(function (t, e) {
                                            return o.format(t, e, i.lng, rt(rt({}, i), {}, { interpolationkey: n[1].trim() }));
                                        }, r.trim())),
                                        (t = t.replace(n[0], r)),
                                        (this.regexp.lastIndex = 0);
                                }
                                return t;
                            },
                        },
                    ]),
                    t
                );
            })();
            function it(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function at(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? it(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : it(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            function st(t) {
                var e = {};
                return function (n, r, o) {
                    var i = r + JSON.stringify(o),
                        a = e[i];
                    return a || ((a = t(r, o)), (e[i] = a)), a(n);
                };
            }
            var ut = (function () {
                function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    h.default(this, t),
                        (this.logger = x.create("formatter")),
                        (this.options = e),
                        (this.formats = {
                            number: st(function (t, e) {
                                var n = new Intl.NumberFormat(t, e);
                                return function (t) {
                                    return n.format(t);
                                };
                            }),
                            currency: st(function (t, e) {
                                var n = new Intl.NumberFormat(t, at(at({}, e), {}, { style: "currency" }));
                                return function (t) {
                                    return n.format(t);
                                };
                            }),
                            datetime: st(function (t, e) {
                                var n = new Intl.DateTimeFormat(t, at({}, e));
                                return function (t) {
                                    return n.format(t);
                                };
                            }),
                            relativetime: st(function (t, e) {
                                var n = new Intl.RelativeTimeFormat(t, at({}, e));
                                return function (t) {
                                    return n.format(t, e.range || "day");
                                };
                            }),
                            list: st(function (t, e) {
                                var n = new Intl.ListFormat(t, at({}, e));
                                return function (t) {
                                    return n.format(t);
                                };
                            }),
                        }),
                        this.init(e);
                }
                return (
                    g.default(t, [
                        {
                            key: "init",
                            value: function (t) {
                                var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { interpolation: {} }).interpolation;
                                this.formatSeparator = e.formatSeparator ? e.formatSeparator : e.formatSeparator || ",";
                            },
                        },
                        {
                            key: "add",
                            value: function (t, e) {
                                this.formats[t.toLowerCase().trim()] = e;
                            },
                        },
                        {
                            key: "addCached",
                            value: function (t, e) {
                                this.formats[t.toLowerCase().trim()] = st(e);
                            },
                        },
                        {
                            key: "format",
                            value: function (t, e, n, r) {
                                var o = this;
                                return e.split(this.formatSeparator).reduce(function (t, e) {
                                    var i = (function (t) {
                                        var e = t.toLowerCase().trim(),
                                            n = {};
                                        if (t.indexOf("(") > -1) {
                                            var r = t.split("(");
                                            e = r[0].toLowerCase().trim();
                                            var o = r[1].substring(0, r[1].length - 1);
                                            "currency" === e && o.indexOf(":") < 0
                                                ? n.currency || (n.currency = o.trim())
                                                : "relativetime" === e && o.indexOf(":") < 0
                                                    ? n.range || (n.range = o.trim())
                                                    : o.split(";").forEach(function (t) {
                                                        if (t) {
                                                            var e = t.split(":"),
                                                                r = k.default(e),
                                                                o = r[0],
                                                                i = r
                                                                    .slice(1)
                                                                    .join(":")
                                                                    .trim()
                                                                    .replace(/^'+|'+$/g, "");
                                                            n[o.trim()] || (n[o.trim()] = i), "false" === i && (n[o.trim()] = !1), "true" === i && (n[o.trim()] = !0), isNaN(i) || (n[o.trim()] = parseInt(i, 10));
                                                        }
                                                    });
                                        }
                                        return { formatName: e, formatOptions: n };
                                    })(e),
                                        a = i.formatName,
                                        s = i.formatOptions;
                                    if (o.formats[a]) {
                                        var u = t;
                                        try {
                                            var c = (r && r.formatParams && r.formatParams[r.interpolationkey]) || {},
                                                l = c.locale || c.lng || r.locale || r.lng || n;
                                            u = o.formats[a](t, l, at(at(at({}, s), r), c));
                                        } catch (t) {
                                            o.logger.warn(t);
                                        }
                                        return u;
                                    }
                                    return o.logger.warn("there was no format function for ".concat(a)), t;
                                }, t);
                            },
                        },
                    ]),
                    t
                );
            })();
            function ct(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function lt(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? ct(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : ct(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            var dt = (function (t) {
                v.default(o, t);
                var e,
                    n,
                    r =
                        ((e = o),
                            (n = (function () {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    r = y.default(e);
                                if (n) {
                                    var o = y.default(this).constructor;
                                    t = Reflect.construct(r, arguments, o);
                                } else t = r.apply(this, arguments);
                                return b.default(this, t);
                            });
                function o(t, e, n) {
                    var i,
                        a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    return (
                        h.default(this, o),
                        (i = r.call(this)),
                        A && E.call(m.default(i)),
                        (i.backend = t),
                        (i.store = e),
                        (i.services = n),
                        (i.languageUtils = n.languageUtils),
                        (i.options = a),
                        (i.logger = x.create("backendConnector")),
                        (i.waitingReads = []),
                        (i.maxParallelReads = a.maxParallelReads || 10),
                        (i.readingCalls = 0),
                        (i.maxRetries = a.maxRetries >= 0 ? a.maxRetries : 5),
                        (i.retryTimeout = a.retryTimeout >= 1 ? a.retryTimeout : 350),
                        (i.state = {}),
                        (i.queue = []),
                        i.backend && i.backend.init && i.backend.init(n, a.backend, a),
                        i
                    );
                }
                return (
                    g.default(o, [
                        {
                            key: "queueLoad",
                            value: function (t, e, n, r) {
                                var o = this,
                                    i = {},
                                    a = {},
                                    s = {},
                                    u = {};
                                return (
                                    t.forEach(function (t) {
                                        var r = !0;
                                        e.forEach(function (e) {
                                            var s = "".concat(t, "|").concat(e);
                                            !n.reload && o.store.hasResourceBundle(t, e)
                                                ? (o.state[s] = 2)
                                                : o.state[s] < 0 ||
                                                (1 === o.state[s] ? void 0 === a[s] && (a[s] = !0) : ((o.state[s] = 1), (r = !1), void 0 === a[s] && (a[s] = !0), void 0 === i[s] && (i[s] = !0), void 0 === u[e] && (u[e] = !0)));
                                        }),
                                            r || (s[t] = !0);
                                    }),
                                    (Object.keys(i).length || Object.keys(a).length) && this.queue.push({ pending: a, pendingCount: Object.keys(a).length, loaded: {}, errors: [], callback: r }),
                                    { toLoad: Object.keys(i), pending: Object.keys(a), toLoadLanguages: Object.keys(s), toLoadNamespaces: Object.keys(u) }
                                );
                            },
                        },
                        {
                            key: "loaded",
                            value: function (t, e, n) {
                                var r = t.split("|"),
                                    o = r[0],
                                    i = r[1];
                                e && this.emit("failedLoading", o, i, e), n && this.store.addResourceBundle(o, i, n), (this.state[t] = e ? -1 : 2);
                                var a = {};
                                this.queue.forEach(function (n) {
                                    var r, s, u, c, l;
                                    (r = n.loaded),
                                        (s = i),
                                        ((c = (u = C(r, [o], Object)).obj)[(l = u.k)] = c[l] || []),
                                        c[l].push(s),
                                        (function (t, e) {
                                            void 0 !== t.pending[e] && (delete t.pending[e], t.pendingCount--);
                                        })(n, t),
                                        e && n.errors.push(e),
                                        0 !== n.pendingCount ||
                                        n.done ||
                                        (Object.keys(n.loaded).forEach(function (t) {
                                            a[t] || (a[t] = {});
                                            var e = n.loaded[t];
                                            e.length &&
                                                e.forEach(function (e) {
                                                    void 0 === a[t][e] && (a[t][e] = !0);
                                                });
                                        }),
                                            (n.done = !0),
                                            n.errors.length ? n.callback(n.errors) : n.callback());
                                }),
                                    this.emit("loaded", a),
                                    (this.queue = this.queue.filter(function (t) {
                                        return !t.done;
                                    }));
                            },
                        },
                        {
                            key: "read",
                            value: function (t, e, n) {
                                var r = this,
                                    o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                                    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout,
                                    a = arguments.length > 5 ? arguments[5] : void 0;
                                return t.length
                                    ? this.readingCalls >= this.maxParallelReads
                                        ? void this.waitingReads.push({ lng: t, ns: e, fcName: n, tried: o, wait: i, callback: a })
                                        : (this.readingCalls++,
                                            this.backend[n](t, e, function (s, u) {
                                                if ((r.readingCalls--, r.waitingReads.length > 0)) {
                                                    var c = r.waitingReads.shift();
                                                    r.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback);
                                                }
                                                s && u && o < r.maxRetries
                                                    ? setTimeout(function () {
                                                        r.read.call(r, t, e, n, o + 1, 2 * i, a);
                                                    }, i)
                                                    : a(s, u);
                                            }))
                                    : a(null, {});
                            },
                        },
                        {
                            key: "prepareLoading",
                            value: function (t, e) {
                                var n = this,
                                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                    o = arguments.length > 3 ? arguments[3] : void 0;
                                if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), o && o();
                                "string" == typeof t && (t = this.languageUtils.toResolveHierarchy(t)), "string" == typeof e && (e = [e]);
                                var i = this.queueLoad(t, e, r, o);
                                if (!i.toLoad.length) return i.pending.length || o(), null;
                                i.toLoad.forEach(function (t) {
                                    n.loadOne(t);
                                });
                            },
                        },
                        {
                            key: "load",
                            value: function (t, e, n) {
                                this.prepareLoading(t, e, {}, n);
                            },
                        },
                        {
                            key: "reload",
                            value: function (t, e, n) {
                                this.prepareLoading(t, e, { reload: !0 }, n);
                            },
                        },
                        {
                            key: "loadOne",
                            value: function (t) {
                                var e = this,
                                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                                    r = t.split("|"),
                                    o = r[0],
                                    i = r[1];
                                this.read(o, i, "read", void 0, void 0, function (r, a) {
                                    r && e.logger.warn("".concat(n, "loading namespace ").concat(i, " for language ").concat(o, " failed"), r),
                                        !r && a && e.logger.log("".concat(n, "loaded namespace ").concat(i, " for language ").concat(o), a),
                                        e.loaded(t, r, a);
                                });
                            },
                        },
                        {
                            key: "saveMissing",
                            value: function (t, e, n, r, o) {
                                var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                                this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(e)
                                    ? this.logger.warn(
                                        'did not save key "'.concat(n, '" as the namespace "').concat(e, '" was not yet loaded'),
                                        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
                                    )
                                    : null != n && "" !== n && (this.backend && this.backend.create && this.backend.create(t, e, n, r, null, lt(lt({}, i), {}, { isUpdate: o })), t && t[0] && this.store.addResource(t[0], e, n, r));
                            },
                        },
                    ]),
                    o
                );
            })(E);
            function pt(t) {
                return (
                    "string" == typeof t.ns && (t.ns = [t.ns]),
                    "string" == typeof t.fallbackLng && (t.fallbackLng = [t.fallbackLng]),
                    "string" == typeof t.fallbackNS && (t.fallbackNS = [t.fallbackNS]),
                    t.supportedLngs && t.supportedLngs.indexOf("cimode") < 0 && (t.supportedLngs = t.supportedLngs.concat(["cimode"])),
                    t
                );
            }
            function ft(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e &&
                        (r = r.filter(function (e) {
                            return Object.getOwnPropertyDescriptor(t, e).enumerable;
                        })),
                        n.push.apply(n, r);
                }
                return n;
            }
            function ht(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2
                        ? ft(Object(n), !0).forEach(function (e) {
                            w.default(t, e, n[e]);
                        })
                        : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : ft(Object(n)).forEach(function (e) {
                                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                            });
                }
                return t;
            }
            function gt() { }
            var mt = (function (t) {
                v.default(o, t);
                var e,
                    n,
                    r =
                        ((e = o),
                            (n = (function () {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })), !0;
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    r = y.default(e);
                                if (n) {
                                    var o = y.default(this).constructor;
                                    t = Reflect.construct(r, arguments, o);
                                } else t = r.apply(this, arguments);
                                return b.default(this, t);
                            });
                function o() {
                    var t,
                        e,
                        n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        i = arguments.length > 1 ? arguments[1] : void 0;
                    if (
                        (h.default(this, o),
                            (t = r.call(this)),
                            A && E.call(m.default(t)),
                            (t.options = pt(n)),
                            (t.services = {}),
                            (t.logger = x),
                            (t.modules = { external: [] }),
                            (e = m.default(t)),
                            Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(function (t) {
                                "function" == typeof e[t] && (e[t] = e[t].bind(e));
                            }),
                            i && !t.isInitialized && !n.isClone)
                    ) {
                        if (!t.options.initImmediate) return t.init(n, i), b.default(t, m.default(t));
                        setTimeout(function () {
                            t.init(n, i);
                        }, 0);
                    }
                    return t;
                }
                return (
                    g.default(o, [
                        {
                            key: "init",
                            value: function () {
                                var t = this,
                                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                    n = arguments.length > 1 ? arguments[1] : void 0;
                                "function" == typeof e && ((n = e), (e = {})), !e.defaultNS && !1 !== e.defaultNS && e.ns && ("string" == typeof e.ns ? (e.defaultNS = e.ns) : e.ns.indexOf("translation") < 0 && (e.defaultNS = e.ns[0]));
                                var r = {
                                    debug: !1,
                                    initImmediate: !0,
                                    ns: ["translation"],
                                    defaultNS: ["translation"],
                                    fallbackLng: ["dev"],
                                    fallbackNS: !1,
                                    supportedLngs: !1,
                                    nonExplicitSupportedLngs: !1,
                                    load: "all",
                                    preload: !1,
                                    simplifyPluralSuffix: !0,
                                    keySeparator: ".",
                                    nsSeparator: ":",
                                    pluralSeparator: "_",
                                    contextSeparator: "_",
                                    partialBundledLanguages: !1,
                                    saveMissing: !1,
                                    updateMissing: !1,
                                    saveMissingTo: "fallback",
                                    saveMissingPlurals: !0,
                                    missingKeyHandler: !1,
                                    missingInterpolationHandler: !1,
                                    postProcess: !1,
                                    postProcessPassResolved: !1,
                                    returnNull: !0,
                                    returnEmptyString: !0,
                                    returnObjects: !1,
                                    joinArrays: !1,
                                    returnedObjectHandler: !1,
                                    parseMissingKeyHandler: !1,
                                    appendNamespaceToMissingKey: !1,
                                    appendNamespaceToCIMode: !1,
                                    overloadTranslationOptionHandler: function (t) {
                                        var e = {};
                                        if (
                                            ("object" === f.default(t[1]) && (e = t[1]),
                                                "string" == typeof t[1] && (e.defaultValue = t[1]),
                                                "string" == typeof t[2] && (e.tDescription = t[2]),
                                                "object" === f.default(t[2]) || "object" === f.default(t[3]))
                                        ) {
                                            var n = t[3] || t[2];
                                            Object.keys(n).forEach(function (t) {
                                                e[t] = n[t];
                                            });
                                        }
                                        return e;
                                    },
                                    interpolation: {
                                        escapeValue: !0,
                                        format: function (t, e, n, r) {
                                            return t;
                                        },
                                        prefix: "{{",
                                        suffix: "}}",
                                        formatSeparator: ",",
                                        unescapePrefix: "-",
                                        nestingPrefix: "$t(",
                                        nestingSuffix: ")",
                                        nestingOptionsSeparator: ",",
                                        maxReplaces: 1e3,
                                        skipOnVariables: !0,
                                    },
                                };
                                function o(t) {
                                    return t ? ("function" == typeof t ? new t() : t) : null;
                                }
                                if (
                                    ((this.options = ht(ht(ht({}, r), this.options), pt(e))),
                                        "v1" !== this.options.compatibilityAPI && (this.options.interpolation = ht(ht({}, r.interpolation), this.options.interpolation)),
                                        void 0 !== e.keySeparator && (this.options.userDefinedKeySeparator = e.keySeparator),
                                        void 0 !== e.nsSeparator && (this.options.userDefinedNsSeparator = e.nsSeparator),
                                        !this.options.isClone)
                                ) {
                                    var i;
                                    this.modules.logger ? x.init(o(this.modules.logger), this.options) : x.init(null, this.options), this.modules.formatter ? (i = this.modules.formatter) : "undefined" != typeof Intl && (i = ut);
                                    var a = new Y(this.options);
                                    this.store = new z(this.options.resources, this.options);
                                    var s = this.services;
                                    (s.logger = x),
                                        (s.resourceStore = this.store),
                                        (s.languageUtils = a),
                                        (s.pluralResolver = new et(a, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON, simplifyPluralSuffix: this.options.simplifyPluralSuffix })),
                                        !i ||
                                        (this.options.interpolation.format && this.options.interpolation.format !== r.interpolation.format) ||
                                        ((s.formatter = o(i)), s.formatter.init(s, this.options), (this.options.interpolation.format = s.formatter.format.bind(s.formatter))),
                                        (s.interpolator = new ot(this.options)),
                                        (s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
                                        (s.backendConnector = new dt(o(this.modules.backend), s.resourceStore, s, this.options)),
                                        s.backendConnector.on("*", function (e) {
                                            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                                            t.emit.apply(t, [e].concat(r));
                                        }),
                                        this.modules.languageDetector && ((s.languageDetector = o(this.modules.languageDetector)), s.languageDetector.init(s, this.options.detection, this.options)),
                                        this.modules.i18nFormat && ((s.i18nFormat = o(this.modules.i18nFormat)), s.i18nFormat.init && s.i18nFormat.init(this)),
                                        (this.translator = new K(this.services, this.options)),
                                        this.translator.on("*", function (e) {
                                            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
                                            t.emit.apply(t, [e].concat(r));
                                        }),
                                        this.modules.external.forEach(function (e) {
                                            e.init && e.init(t);
                                        });
                                }
                                if (((this.format = this.options.interpolation.format), n || (n = gt), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng)) {
                                    var u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                                    u.length > 0 && "dev" !== u[0] && (this.options.lng = u[0]);
                                }
                                this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined"),
                                    ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(function (e) {
                                        t[e] = function () {
                                            var n;
                                            return (n = t.store)[e].apply(n, arguments);
                                        };
                                    }),
                                    ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(function (e) {
                                        t[e] = function () {
                                            var n;
                                            return (n = t.store)[e].apply(n, arguments), t;
                                        };
                                    });
                                var c = R(),
                                    l = function () {
                                        var e = function (e, r) {
                                            t.isInitialized && !t.initializedStoreOnce && t.logger.warn("init: i18next is already initialized. You should call init just once!"),
                                                (t.isInitialized = !0),
                                                t.options.isClone || t.logger.log("initialized", t.options),
                                                t.emit("initialized", t.options),
                                                c.resolve(r),
                                                n(e, r);
                                        };
                                        if (t.languages && "v1" !== t.options.compatibilityAPI && !t.isInitialized) return e(null, t.t.bind(t));
                                        t.changeLanguage(t.options.lng, e);
                                    };
                                return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), c;
                            },
                        },
                        {
                            key: "loadResources",
                            value: function (t) {
                                var e = this,
                                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : gt,
                                    r = "string" == typeof t ? t : this.language;
                                if (("function" == typeof t && (n = t), !this.options.resources || this.options.partialBundledLanguages)) {
                                    if (r && "cimode" === r.toLowerCase()) return n();
                                    var o = [],
                                        i = function (t) {
                                            t &&
                                                e.services.languageUtils.toResolveHierarchy(t).forEach(function (t) {
                                                    o.indexOf(t) < 0 && o.push(t);
                                                });
                                        };
                                    r
                                        ? i(r)
                                        : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(function (t) {
                                            return i(t);
                                        }),
                                        this.options.preload &&
                                        this.options.preload.forEach(function (t) {
                                            return i(t);
                                        }),
                                        this.services.backendConnector.load(o, this.options.ns, function (t) {
                                            t || e.resolvedLanguage || !e.language || e.setResolvedLanguage(e.language), n(t);
                                        });
                                } else n(null);
                            },
                        },
                        {
                            key: "reloadResources",
                            value: function (t, e, n) {
                                var r = R();
                                return (
                                    t || (t = this.languages),
                                    e || (e = this.options.ns),
                                    n || (n = gt),
                                    this.services.backendConnector.reload(t, e, function (t) {
                                        r.resolve(), n(t);
                                    }),
                                    r
                                );
                            },
                        },
                        {
                            key: "use",
                            value: function (t) {
                                if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                                if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                                return (
                                    "backend" === t.type && (this.modules.backend = t),
                                    ("logger" === t.type || (t.log && t.warn && t.error)) && (this.modules.logger = t),
                                    "languageDetector" === t.type && (this.modules.languageDetector = t),
                                    "i18nFormat" === t.type && (this.modules.i18nFormat = t),
                                    "postProcessor" === t.type && W.addPostProcessor(t),
                                    "formatter" === t.type && (this.modules.formatter = t),
                                    "3rdParty" === t.type && this.modules.external.push(t),
                                    this
                                );
                            },
                        },
                        {
                            key: "setResolvedLanguage",
                            value: function (t) {
                                if (t && this.languages && !(["cimode", "dev"].indexOf(t) > -1))
                                    for (var e = 0; e < this.languages.length; e++) {
                                        var n = this.languages[e];
                                        if (!(["cimode", "dev"].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
                                            this.resolvedLanguage = n;
                                            break;
                                        }
                                    }
                            },
                        },
                        {
                            key: "changeLanguage",
                            value: function (t, e) {
                                var n = this;
                                this.isLanguageChangingTo = t;
                                var r = R();
                                this.emit("languageChanging", t);
                                var o = function (t) {
                                    (n.language = t), (n.languages = n.services.languageUtils.toResolveHierarchy(t)), (n.resolvedLanguage = void 0), n.setResolvedLanguage(t);
                                },
                                    i = function (i) {
                                        t || i || !n.services.languageDetector || (i = []);
                                        var a = "string" == typeof i ? i : n.services.languageUtils.getBestMatchFromCodes(i);
                                        a && (n.language || o(a), n.translator.language || n.translator.changeLanguage(a), n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(a)),
                                            n.loadResources(a, function (t) {
                                                !(function (t, i) {
                                                    i ? (o(i), n.translator.changeLanguage(i), (n.isLanguageChangingTo = void 0), n.emit("languageChanged", i), n.logger.log("languageChanged", i)) : (n.isLanguageChangingTo = void 0),
                                                        r.resolve(function () {
                                                            return n.t.apply(n, arguments);
                                                        }),
                                                        e &&
                                                        e(t, function () {
                                                            return n.t.apply(n, arguments);
                                                        });
                                                })(t, a);
                                            });
                                    };
                                return (
                                    t || !this.services.languageDetector || this.services.languageDetector.async
                                        ? !t && this.services.languageDetector && this.services.languageDetector.async
                                            ? this.services.languageDetector.detect(i)
                                            : i(t)
                                        : i(this.services.languageDetector.detect()),
                                    r
                                );
                            },
                        },
                        {
                            key: "getFixedT",
                            value: function (t, e, n) {
                                var r = this,
                                    o = function t(e, o) {
                                        var i;
                                        if ("object" !== f.default(o)) {
                                            for (var a = arguments.length, s = new Array(a > 2 ? a - 2 : 0), u = 2; u < a; u++) s[u - 2] = arguments[u];
                                            i = r.options.overloadTranslationOptionHandler([e, o].concat(s));
                                        } else i = ht({}, o);
                                        (i.lng = i.lng || t.lng), (i.lngs = i.lngs || t.lngs), (i.ns = i.ns || t.ns), (i.keyPrefix = i.keyPrefix || n || t.keyPrefix);
                                        var c = r.options.keySeparator || ".",
                                            l = i.keyPrefix ? "".concat(i.keyPrefix).concat(c).concat(e) : e;
                                        return r.t(l, i);
                                    };
                                return "string" == typeof t ? (o.lng = t) : (o.lngs = t), (o.ns = e), (o.keyPrefix = n), o;
                            },
                        },
                        {
                            key: "t",
                            value: function () {
                                var t;
                                return this.translator && (t = this.translator).translate.apply(t, arguments);
                            },
                        },
                        {
                            key: "exists",
                            value: function () {
                                var t;
                                return this.translator && (t = this.translator).exists.apply(t, arguments);
                            },
                        },
                        {
                            key: "setDefaultNamespace",
                            value: function (t) {
                                this.options.defaultNS = t;
                            },
                        },
                        {
                            key: "hasLoadedNamespace",
                            value: function (t) {
                                var e = this,
                                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
                                if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
                                var r = this.resolvedLanguage || this.languages[0],
                                    o = !!this.options && this.options.fallbackLng,
                                    i = this.languages[this.languages.length - 1];
                                if ("cimode" === r.toLowerCase()) return !0;
                                var a = function (t, n) {
                                    var r = e.services.backendConnector.state["".concat(t, "|").concat(n)];
                                    return -1 === r || 2 === r;
                                };
                                if (n.precheck) {
                                    var s = n.precheck(this, a);
                                    if (void 0 !== s) return s;
                                }
                                return !(!this.hasResourceBundle(r, t) && this.services.backendConnector.backend && (!this.options.resources || this.options.partialBundledLanguages) && (!a(r, t) || (o && !a(i, t))));
                            },
                        },
                        {
                            key: "loadNamespaces",
                            value: function (t, e) {
                                var n = this,
                                    r = R();
                                return this.options.ns
                                    ? ("string" == typeof t && (t = [t]),
                                        t.forEach(function (t) {
                                            n.options.ns.indexOf(t) < 0 && n.options.ns.push(t);
                                        }),
                                        this.loadResources(function (t) {
                                            r.resolve(), e && e(t);
                                        }),
                                        r)
                                    : (e && e(), Promise.resolve());
                            },
                        },
                        {
                            key: "loadLanguages",
                            value: function (t, e) {
                                var n = R();
                                "string" == typeof t && (t = [t]);
                                var r = this.options.preload || [],
                                    o = t.filter(function (t) {
                                        return r.indexOf(t) < 0;
                                    });
                                return o.length
                                    ? ((this.options.preload = r.concat(o)),
                                        this.loadResources(function (t) {
                                            n.resolve(), e && e(t);
                                        }),
                                        n)
                                    : (e && e(), Promise.resolve());
                            },
                        },
                        {
                            key: "dir",
                            value: function (t) {
                                return (
                                    t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)),
                                    t
                                        ? [
                                            "ar",
                                            "shu",
                                            "sqr",
                                            "ssh",
                                            "xaa",
                                            "yhd",
                                            "yud",
                                            "aao",
                                            "abh",
                                            "abv",
                                            "acm",
                                            "acq",
                                            "acw",
                                            "acx",
                                            "acy",
                                            "adf",
                                            "ads",
                                            "aeb",
                                            "aec",
                                            "afb",
                                            "ajp",
                                            "apc",
                                            "apd",
                                            "arb",
                                            "arq",
                                            "ars",
                                            "ary",
                                            "arz",
                                            "auz",
                                            "avl",
                                            "ayh",
                                            "ayl",
                                            "ayn",
                                            "ayp",
                                            "bbz",
                                            "pga",
                                            "he",
                                            "iw",
                                            "ps",
                                            "pbt",
                                            "pbu",
                                            "pst",
                                            "prp",
                                            "prd",
                                            "ug",
                                            "ur",
                                            "ydd",
                                            "yds",
                                            "yih",
                                            "ji",
                                            "yi",
                                            "hbo",
                                            "men",
                                            "xmn",
                                            "fa",
                                            "jpr",
                                            "peo",
                                            "pes",
                                            "prs",
                                            "dv",
                                            "sam",
                                            "ckb",
                                        ].indexOf(this.services.languageUtils.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1
                                            ? "rtl"
                                            : "ltr"
                                        : "rtl"
                                );
                            },
                        },
                        {
                            key: "cloneInstance",
                            value: function () {
                                var t = this,
                                    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : gt,
                                    r = ht(ht(ht({}, this.options), e), { isClone: !0 }),
                                    i = new o(r);
                                return (
                                    (void 0 === e.debug && void 0 === e.prefix) || (i.logger = i.logger.clone(e)),
                                    ["store", "services", "language"].forEach(function (e) {
                                        i[e] = t[e];
                                    }),
                                    (i.services = ht({}, this.services)),
                                    (i.services.utils = { hasLoadedNamespace: i.hasLoadedNamespace.bind(i) }),
                                    (i.translator = new K(i.services, i.options)),
                                    i.translator.on("*", function (t) {
                                        for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                                        i.emit.apply(i, [t].concat(n));
                                    }),
                                    i.init(r, n),
                                    (i.translator.options = i.options),
                                    (i.translator.backendConnector.services.utils = { hasLoadedNamespace: i.hasLoadedNamespace.bind(i) }),
                                    i
                                );
                            },
                        },
                        {
                            key: "toJSON",
                            value: function () {
                                return { options: this.options, store: this.store, language: this.language, languages: this.languages, resolvedLanguage: this.resolvedLanguage };
                            },
                        },
                    ]),
                    o
                );
            })(E);
            w.default(mt, "createInstance", function () {
                return new mt(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, arguments.length > 1 ? arguments[1] : void 0);
            });
            var vt = mt.createInstance();
            (vt.createInstance = mt.createInstance), (t.exports = vt);
        },
        1016: function (t, e, n) {
            "use strict";
            n.r(e);
        },
        3188: function (t) {
            "use strict";
            function e(t) {
                return t instanceof Buffer ? Buffer.from(t) : new t.constructor(t.buffer.slice(), t.byteOffset, t.length);
            }
            t.exports = function (t) {
                return (t = t || {}).circles
                    ? (function (t) {
                        var n = [],
                            r = [];
                        return t.proto
                            ? function t(i) {
                                if ("object" != typeof i || null === i) return i;
                                if (i instanceof Date) return new Date(i);
                                if (Array.isArray(i)) return o(i, t);
                                if (i instanceof Map) return new Map(o(Array.from(i), t));
                                if (i instanceof Set) return new Set(o(Array.from(i), t));
                                var a = {};
                                for (var s in (n.push(i), r.push(a), i)) {
                                    var u = i[s];
                                    if ("object" != typeof u || null === u) a[s] = u;
                                    else if (u instanceof Date) a[s] = new Date(u);
                                    else if (u instanceof Map) a[s] = new Map(o(Array.from(u), t));
                                    else if (u instanceof Set) a[s] = new Set(o(Array.from(u), t));
                                    else if (ArrayBuffer.isView(u)) a[s] = e(u);
                                    else {
                                        var c = n.indexOf(u);
                                        a[s] = -1 !== c ? r[c] : t(u);
                                    }
                                }
                                return n.pop(), r.pop(), a;
                            }
                            : function t(i) {
                                if ("object" != typeof i || null === i) return i;
                                if (i instanceof Date) return new Date(i);
                                if (Array.isArray(i)) return o(i, t);
                                if (i instanceof Map) return new Map(o(Array.from(i), t));
                                if (i instanceof Set) return new Set(o(Array.from(i), t));
                                var a = {};
                                for (var s in (n.push(i), r.push(a), i))
                                    if (!1 !== Object.hasOwnProperty.call(i, s)) {
                                        var u = i[s];
                                        if ("object" != typeof u || null === u) a[s] = u;
                                        else if (u instanceof Date) a[s] = new Date(u);
                                        else if (u instanceof Map) a[s] = new Map(o(Array.from(u), t));
                                        else if (u instanceof Set) a[s] = new Set(o(Array.from(u), t));
                                        else if (ArrayBuffer.isView(u)) a[s] = e(u);
                                        else {
                                            var c = n.indexOf(u);
                                            a[s] = -1 !== c ? r[c] : t(u);
                                        }
                                    }
                                return n.pop(), r.pop(), a;
                            };
                        function o(t, o) {
                            for (var i = Object.keys(t), a = new Array(i.length), s = 0; s < i.length; s++) {
                                var u = i[s],
                                    c = t[u];
                                if ("object" != typeof c || null === c) a[u] = c;
                                else if (c instanceof Date) a[u] = new Date(c);
                                else if (ArrayBuffer.isView(c)) a[u] = e(c);
                                else {
                                    var l = n.indexOf(c);
                                    a[u] = -1 !== l ? r[l] : o(c);
                                }
                            }
                            return a;
                        }
                    })(t)
                    : t.proto
                        ? function t(r) {
                            if ("object" != typeof r || null === r) return r;
                            if (r instanceof Date) return new Date(r);
                            if (Array.isArray(r)) return n(r, t);
                            if (r instanceof Map) return new Map(n(Array.from(r), t));
                            if (r instanceof Set) return new Set(n(Array.from(r), t));
                            var o = {};
                            for (var i in r) {
                                var a = r[i];
                                "object" != typeof a || null === a
                                    ? (o[i] = a)
                                    : a instanceof Date
                                        ? (o[i] = new Date(a))
                                        : a instanceof Map
                                            ? (o[i] = new Map(n(Array.from(a), t)))
                                            : a instanceof Set
                                                ? (o[i] = new Set(n(Array.from(a), t)))
                                                : ArrayBuffer.isView(a)
                                                    ? (o[i] = e(a))
                                                    : (o[i] = t(a));
                            }
                            return o;
                        }
                        : function t(r) {
                            if ("object" != typeof r || null === r) return r;
                            if (r instanceof Date) return new Date(r);
                            if (Array.isArray(r)) return n(r, t);
                            if (r instanceof Map) return new Map(n(Array.from(r), t));
                            if (r instanceof Set) return new Set(n(Array.from(r), t));
                            var o = {};
                            for (var i in r)
                                if (!1 !== Object.hasOwnProperty.call(r, i)) {
                                    var a = r[i];
                                    "object" != typeof a || null === a
                                        ? (o[i] = a)
                                        : a instanceof Date
                                            ? (o[i] = new Date(a))
                                            : a instanceof Map
                                                ? (o[i] = new Map(n(Array.from(a), t)))
                                                : a instanceof Set
                                                    ? (o[i] = new Set(n(Array.from(a), t)))
                                                    : ArrayBuffer.isView(a)
                                                        ? (o[i] = e(a))
                                                        : (o[i] = t(a));
                                }
                            return o;
                        };
                function n(t, n) {
                    for (var r = Object.keys(t), o = new Array(r.length), i = 0; i < r.length; i++) {
                        var a = r[i],
                            s = t[a];
                        "object" != typeof s || null === s ? (o[a] = s) : s instanceof Date ? (o[a] = new Date(s)) : ArrayBuffer.isView(s) ? (o[a] = e(s)) : (o[a] = n(s));
                    }
                    return o;
                }
            };
        },
        7429: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                Object.defineProperty(e, "NIL", {
                    enumerable: !0,
                    get: function () {
                        return s.default;
                    },
                }),
                Object.defineProperty(e, "parse", {
                    enumerable: !0,
                    get: function () {
                        return d.default;
                    },
                }),
                Object.defineProperty(e, "stringify", {
                    enumerable: !0,
                    get: function () {
                        return l.default;
                    },
                }),
                Object.defineProperty(e, "v1", {
                    enumerable: !0,
                    get: function () {
                        return r.default;
                    },
                }),
                Object.defineProperty(e, "v3", {
                    enumerable: !0,
                    get: function () {
                        return o.default;
                    },
                }),
                Object.defineProperty(e, "v4", {
                    enumerable: !0,
                    get: function () {
                        return i.default;
                    },
                }),
                Object.defineProperty(e, "v5", {
                    enumerable: !0,
                    get: function () {
                        return a.default;
                    },
                }),
                Object.defineProperty(e, "validate", {
                    enumerable: !0,
                    get: function () {
                        return c.default;
                    },
                }),
                Object.defineProperty(e, "version", {
                    enumerable: !0,
                    get: function () {
                        return u.default;
                    },
                });
            var r = p(n(3990)),
                o = p(n(8237)),
                i = p(n(5355)),
                a = p(n(3764)),
                s = p(n(6314)),
                u = p(n(8464)),
                c = p(n(6435)),
                l = p(n(4008)),
                d = p(n(8222));
            function p(t) {
                return t && t.__esModule ? t : { default: t };
            }
        },
        4163: function (t, e) {
            "use strict";
            function n(t) {
                return 14 + (((t + 64) >>> 9) << 4) + 1;
            }
            function r(t, e) {
                const n = (65535 & t) + (65535 & e);
                return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n);
            }
            function o(t, e, n, o, i, a) {
                return r(((s = r(r(e, t), r(o, a))) << (u = i)) | (s >>> (32 - u)), n);
                var s, u;
            }
            function i(t, e, n, r, i, a, s) {
                return o((e & n) | (~e & r), t, e, i, a, s);
            }
            function a(t, e, n, r, i, a, s) {
                return o((e & r) | (n & ~r), t, e, i, a, s);
            }
            function s(t, e, n, r, i, a, s) {
                return o(e ^ n ^ r, t, e, i, a, s);
            }
            function u(t, e, n, r, i, a, s) {
                return o(n ^ (e | ~r), t, e, i, a, s);
            }
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            e.default = function (t) {
                if ("string" == typeof t) {
                    const e = unescape(encodeURIComponent(t));
                    t = new Uint8Array(e.length);
                    for (let n = 0; n < e.length; ++n) t[n] = e.charCodeAt(n);
                }
                return (function (t) {
                    const e = [],
                        n = 32 * t.length,
                        r = "0123456789abcdef";
                    for (let o = 0; o < n; o += 8) {
                        const n = (t[o >> 5] >>> o % 32) & 255,
                            i = parseInt(r.charAt((n >>> 4) & 15) + r.charAt(15 & n), 16);
                        e.push(i);
                    }
                    return e;
                })(
                    (function (t, e) {
                        (t[e >> 5] |= 128 << e % 32), (t[n(e) - 1] = e);
                        let o = 1732584193,
                            c = -271733879,
                            l = -1732584194,
                            d = 271733878;
                        for (let e = 0; e < t.length; e += 16) {
                            const n = o,
                                p = c,
                                f = l,
                                h = d;
                            (o = i(o, c, l, d, t[e], 7, -680876936)),
                                (d = i(d, o, c, l, t[e + 1], 12, -389564586)),
                                (l = i(l, d, o, c, t[e + 2], 17, 606105819)),
                                (c = i(c, l, d, o, t[e + 3], 22, -1044525330)),
                                (o = i(o, c, l, d, t[e + 4], 7, -176418897)),
                                (d = i(d, o, c, l, t[e + 5], 12, 1200080426)),
                                (l = i(l, d, o, c, t[e + 6], 17, -1473231341)),
                                (c = i(c, l, d, o, t[e + 7], 22, -45705983)),
                                (o = i(o, c, l, d, t[e + 8], 7, 1770035416)),
                                (d = i(d, o, c, l, t[e + 9], 12, -1958414417)),
                                (l = i(l, d, o, c, t[e + 10], 17, -42063)),
                                (c = i(c, l, d, o, t[e + 11], 22, -1990404162)),
                                (o = i(o, c, l, d, t[e + 12], 7, 1804603682)),
                                (d = i(d, o, c, l, t[e + 13], 12, -40341101)),
                                (l = i(l, d, o, c, t[e + 14], 17, -1502002290)),
                                (c = i(c, l, d, o, t[e + 15], 22, 1236535329)),
                                (o = a(o, c, l, d, t[e + 1], 5, -165796510)),
                                (d = a(d, o, c, l, t[e + 6], 9, -1069501632)),
                                (l = a(l, d, o, c, t[e + 11], 14, 643717713)),
                                (c = a(c, l, d, o, t[e], 20, -373897302)),
                                (o = a(o, c, l, d, t[e + 5], 5, -701558691)),
                                (d = a(d, o, c, l, t[e + 10], 9, 38016083)),
                                (l = a(l, d, o, c, t[e + 15], 14, -660478335)),
                                (c = a(c, l, d, o, t[e + 4], 20, -405537848)),
                                (o = a(o, c, l, d, t[e + 9], 5, 568446438)),
                                (d = a(d, o, c, l, t[e + 14], 9, -1019803690)),
                                (l = a(l, d, o, c, t[e + 3], 14, -187363961)),
                                (c = a(c, l, d, o, t[e + 8], 20, 1163531501)),
                                (o = a(o, c, l, d, t[e + 13], 5, -1444681467)),
                                (d = a(d, o, c, l, t[e + 2], 9, -51403784)),
                                (l = a(l, d, o, c, t[e + 7], 14, 1735328473)),
                                (c = a(c, l, d, o, t[e + 12], 20, -1926607734)),
                                (o = s(o, c, l, d, t[e + 5], 4, -378558)),
                                (d = s(d, o, c, l, t[e + 8], 11, -2022574463)),
                                (l = s(l, d, o, c, t[e + 11], 16, 1839030562)),
                                (c = s(c, l, d, o, t[e + 14], 23, -35309556)),
                                (o = s(o, c, l, d, t[e + 1], 4, -1530992060)),
                                (d = s(d, o, c, l, t[e + 4], 11, 1272893353)),
                                (l = s(l, d, o, c, t[e + 7], 16, -155497632)),
                                (c = s(c, l, d, o, t[e + 10], 23, -1094730640)),
                                (o = s(o, c, l, d, t[e + 13], 4, 681279174)),
                                (d = s(d, o, c, l, t[e], 11, -358537222)),
                                (l = s(l, d, o, c, t[e + 3], 16, -722521979)),
                                (c = s(c, l, d, o, t[e + 6], 23, 76029189)),
                                (o = s(o, c, l, d, t[e + 9], 4, -640364487)),
                                (d = s(d, o, c, l, t[e + 12], 11, -421815835)),
                                (l = s(l, d, o, c, t[e + 15], 16, 530742520)),
                                (c = s(c, l, d, o, t[e + 2], 23, -995338651)),
                                (o = u(o, c, l, d, t[e], 6, -198630844)),
                                (d = u(d, o, c, l, t[e + 7], 10, 1126891415)),
                                (l = u(l, d, o, c, t[e + 14], 15, -1416354905)),
                                (c = u(c, l, d, o, t[e + 5], 21, -57434055)),
                                (o = u(o, c, l, d, t[e + 12], 6, 1700485571)),
                                (d = u(d, o, c, l, t[e + 3], 10, -1894986606)),
                                (l = u(l, d, o, c, t[e + 10], 15, -1051523)),
                                (c = u(c, l, d, o, t[e + 1], 21, -2054922799)),
                                (o = u(o, c, l, d, t[e + 8], 6, 1873313359)),
                                (d = u(d, o, c, l, t[e + 15], 10, -30611744)),
                                (l = u(l, d, o, c, t[e + 6], 15, -1560198380)),
                                (c = u(c, l, d, o, t[e + 13], 21, 1309151649)),
                                (o = u(o, c, l, d, t[e + 4], 6, -145523070)),
                                (d = u(d, o, c, l, t[e + 11], 10, -1120210379)),
                                (l = u(l, d, o, c, t[e + 2], 15, 718787259)),
                                (c = u(c, l, d, o, t[e + 9], 21, -343485551)),
                                (o = r(o, n)),
                                (c = r(c, p)),
                                (l = r(l, f)),
                                (d = r(d, h));
                        }
                        return [o, c, l, d];
                    })(
                        (function (t) {
                            if (0 === t.length) return [];
                            const e = 8 * t.length,
                                r = new Uint32Array(n(e));
                            for (let n = 0; n < e; n += 8) r[n >> 5] |= (255 & t[n / 8]) << n % 32;
                            return r;
                        })(t),
                        8 * t.length
                    )
                );
            };
        },
        4790: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var n = { randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
            e.default = n;
        },
        6314: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0), (e.default = "00000000-0000-0000-0000-000000000000");
        },
        8222: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r,
                o = (r = n(6435)) && r.__esModule ? r : { default: r };
            e.default = function (t) {
                if (!(0, o.default)(t)) throw TypeError("Invalid UUID");
                let e;
                const n = new Uint8Array(16);
                return (
                    (n[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24),
                    (n[1] = (e >>> 16) & 255),
                    (n[2] = (e >>> 8) & 255),
                    (n[3] = 255 & e),
                    (n[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8),
                    (n[5] = 255 & e),
                    (n[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8),
                    (n[7] = 255 & e),
                    (n[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8),
                    (n[9] = 255 & e),
                    (n[10] = ((e = parseInt(t.slice(24, 36), 16)) / 1099511627776) & 255),
                    (n[11] = (e / 4294967296) & 255),
                    (n[12] = (e >>> 24) & 255),
                    (n[13] = (e >>> 16) & 255),
                    (n[14] = (e >>> 8) & 255),
                    (n[15] = 255 & e),
                    n
                );
            };
        },
        58: function (t, e) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0), (e.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
        },
        3319: function (t, e) {
            "use strict";
            let n;
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.default = function () {
                    if (!n && ((n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)), !n))
                        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return n(r);
                });
            const r = new Uint8Array(16);
        },
        3757: function (t, e) {
            "use strict";
            function n(t, e, n, r) {
                switch (t) {
                    case 0:
                        return (e & n) ^ (~e & r);
                    case 1:
                    case 3:
                        return e ^ n ^ r;
                    case 2:
                        return (e & n) ^ (e & r) ^ (n & r);
                }
            }
            function r(t, e) {
                return (t << e) | (t >>> (32 - e));
            }
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            e.default = function (t) {
                const e = [1518500249, 1859775393, 2400959708, 3395469782],
                    o = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
                if ("string" == typeof t) {
                    const e = unescape(encodeURIComponent(t));
                    t = [];
                    for (let n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
                } else Array.isArray(t) || (t = Array.prototype.slice.call(t));
                t.push(128);
                const i = t.length / 4 + 2,
                    a = Math.ceil(i / 16),
                    s = new Array(a);
                for (let e = 0; e < a; ++e) {
                    const n = new Uint32Array(16);
                    for (let r = 0; r < 16; ++r) n[r] = (t[64 * e + 4 * r] << 24) | (t[64 * e + 4 * r + 1] << 16) | (t[64 * e + 4 * r + 2] << 8) | t[64 * e + 4 * r + 3];
                    s[e] = n;
                }
                (s[a - 1][14] = (8 * (t.length - 1)) / Math.pow(2, 32)), (s[a - 1][14] = Math.floor(s[a - 1][14])), (s[a - 1][15] = (8 * (t.length - 1)) & 4294967295);
                for (let t = 0; t < a; ++t) {
                    const i = new Uint32Array(80);
                    for (let e = 0; e < 16; ++e) i[e] = s[t][e];
                    for (let t = 16; t < 80; ++t) i[t] = r(i[t - 3] ^ i[t - 8] ^ i[t - 14] ^ i[t - 16], 1);
                    let a = o[0],
                        u = o[1],
                        c = o[2],
                        l = o[3],
                        d = o[4];
                    for (let t = 0; t < 80; ++t) {
                        const o = Math.floor(t / 20),
                            s = (r(a, 5) + n(o, u, c, l) + d + e[o] + i[t]) >>> 0;
                        (d = l), (l = c), (c = r(u, 30) >>> 0), (u = a), (a = s);
                    }
                    (o[0] = (o[0] + a) >>> 0), (o[1] = (o[1] + u) >>> 0), (o[2] = (o[2] + c) >>> 0), (o[3] = (o[3] + l) >>> 0), (o[4] = (o[4] + d) >>> 0);
                }
                return [
                    (o[0] >> 24) & 255,
                    (o[0] >> 16) & 255,
                    (o[0] >> 8) & 255,
                    255 & o[0],
                    (o[1] >> 24) & 255,
                    (o[1] >> 16) & 255,
                    (o[1] >> 8) & 255,
                    255 & o[1],
                    (o[2] >> 24) & 255,
                    (o[2] >> 16) & 255,
                    (o[2] >> 8) & 255,
                    255 & o[2],
                    (o[3] >> 24) & 255,
                    (o[3] >> 16) & 255,
                    (o[3] >> 8) & 255,
                    255 & o[3],
                    (o[4] >> 24) & 255,
                    (o[4] >> 16) & 255,
                    (o[4] >> 8) & 255,
                    255 & o[4],
                ];
            };
        },
        4008: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0), (e.unsafeStringify = a);
            var r,
                o = (r = n(6435)) && r.__esModule ? r : { default: r };
            const i = [];
            for (let t = 0; t < 256; ++t) i.push((t + 256).toString(16).slice(1));
            function a(t, e = 0) {
                return (
                    i[t[e + 0]] +
                    i[t[e + 1]] +
                    i[t[e + 2]] +
                    i[t[e + 3]] +
                    "-" +
                    i[t[e + 4]] +
                    i[t[e + 5]] +
                    "-" +
                    i[t[e + 6]] +
                    i[t[e + 7]] +
                    "-" +
                    i[t[e + 8]] +
                    i[t[e + 9]] +
                    "-" +
                    i[t[e + 10]] +
                    i[t[e + 11]] +
                    i[t[e + 12]] +
                    i[t[e + 13]] +
                    i[t[e + 14]] +
                    i[t[e + 15]]
                ).toLowerCase();
            }
            e.default = function (t, e = 0) {
                const n = a(t, e);
                if (!(0, o.default)(n)) throw TypeError("Stringified UUID is invalid");
                return n;
            };
        },
        3990: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r,
                o = (r = n(3319)) && r.__esModule ? r : { default: r },
                i = n(4008);
            let a,
                s,
                u = 0,
                c = 0;
            e.default = function (t, e, n) {
                let r = (e && n) || 0;
                const l = e || new Array(16);
                let d = (t = t || {}).node || a,
                    p = void 0 !== t.clockseq ? t.clockseq : s;
                if (null == d || null == p) {
                    const e = t.random || (t.rng || o.default)();
                    null == d && (d = a = [1 | e[0], e[1], e[2], e[3], e[4], e[5]]), null == p && (p = s = 16383 & ((e[6] << 8) | e[7]));
                }
                let f = void 0 !== t.msecs ? t.msecs : Date.now(),
                    h = void 0 !== t.nsecs ? t.nsecs : c + 1;
                const g = f - u + (h - c) / 1e4;
                if ((g < 0 && void 0 === t.clockseq && (p = (p + 1) & 16383), (g < 0 || f > u) && void 0 === t.nsecs && (h = 0), h >= 1e4)) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                (u = f), (c = h), (s = p), (f += 122192928e5);
                const m = (1e4 * (268435455 & f) + h) % 4294967296;
                (l[r++] = (m >>> 24) & 255), (l[r++] = (m >>> 16) & 255), (l[r++] = (m >>> 8) & 255), (l[r++] = 255 & m);
                const v = ((f / 4294967296) * 1e4) & 268435455;
                (l[r++] = (v >>> 8) & 255), (l[r++] = 255 & v), (l[r++] = ((v >>> 24) & 15) | 16), (l[r++] = (v >>> 16) & 255), (l[r++] = (p >>> 8) | 128), (l[r++] = 255 & p);
                for (let t = 0; t < 6; ++t) l[r + t] = d[t];
                return e || (0, i.unsafeStringify)(l);
            };
        },
        8237: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r = i(n(7925)),
                o = i(n(4163));
            function i(t) {
                return t && t.__esModule ? t : { default: t };
            }
            var a = (0, r.default)("v3", 48, o.default);
            e.default = a;
        },
        7925: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }),
                (e.URL = e.DNS = void 0),
                (e.default = function (t, e, n) {
                    function r(t, r, a, s) {
                        var u;
                        if (
                            ("string" == typeof t &&
                                (t = (function (t) {
                                    t = unescape(encodeURIComponent(t));
                                    const e = [];
                                    for (let n = 0; n < t.length; ++n) e.push(t.charCodeAt(n));
                                    return e;
                                })(t)),
                                "string" == typeof r && (r = (0, i.default)(r)),
                                16 !== (null === (u = r) || void 0 === u ? void 0 : u.length))
                        )
                            throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                        let c = new Uint8Array(16 + t.length);
                        if ((c.set(r), c.set(t, r.length), (c = n(c)), (c[6] = (15 & c[6]) | e), (c[8] = (63 & c[8]) | 128), a)) {
                            s = s || 0;
                            for (let t = 0; t < 16; ++t) a[s + t] = c[t];
                            return a;
                        }
                        return (0, o.unsafeStringify)(c);
                    }
                    try {
                        r.name = t;
                    } catch (t) { }
                    return (r.DNS = a), (r.URL = s), r;
                });
            var r,
                o = n(4008),
                i = (r = n(8222)) && r.__esModule ? r : { default: r };
            const a = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
            e.DNS = a;
            const s = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
            e.URL = s;
        },
        5355: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r = a(n(4790)),
                o = a(n(3319)),
                i = n(4008);
            function a(t) {
                return t && t.__esModule ? t : { default: t };
            }
            e.default = function (t, e, n) {
                if (r.default.randomUUID && !e && !t) return r.default.randomUUID();
                const a = (t = t || {}).random || (t.rng || o.default)();
                if (((a[6] = (15 & a[6]) | 64), (a[8] = (63 & a[8]) | 128), e)) {
                    n = n || 0;
                    for (let t = 0; t < 16; ++t) e[n + t] = a[t];
                    return e;
                }
                return (0, i.unsafeStringify)(a);
            };
        },
        3764: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r = i(n(7925)),
                o = i(n(3757));
            function i(t) {
                return t && t.__esModule ? t : { default: t };
            }
            var a = (0, r.default)("v5", 80, o.default);
            e.default = a;
        },
        6435: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r,
                o = (r = n(58)) && r.__esModule ? r : { default: r };
            e.default = function (t) {
                return "string" == typeof t && o.default.test(t);
            };
        },
        8464: function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
            var r,
                o = (r = n(6435)) && r.__esModule ? r : { default: r };
            e.default = function (t) {
                if (!(0, o.default)(t)) throw TypeError("Invalid UUID");
                return parseInt(t.slice(14, 15), 16);
            };
        },
        3897: function (t) {
            (t.exports = function (t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r;
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        5372: function (t) {
            (t.exports = function (t) {
                if (Array.isArray(t)) return t;
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        6115: function (t) {
            (t.exports = function (t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t;
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        6690: function (t) {
            (t.exports = function (t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        9728: function (t, e, n) {
            var r = n(4062);
            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    (o.enumerable = o.enumerable || !1), (o.configurable = !0), "value" in o && (o.writable = !0), Object.defineProperty(t, r(o.key), o);
                }
            }
            (t.exports = function (t, e, n) {
                return e && o(t.prototype, e), n && o(t, n), Object.defineProperty(t, "prototype", { writable: !1 }), t;
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        8416: function (t, e, n) {
            var r = n(4062);
            (t.exports = function (t, e, n) {
                return (e = r(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        3808: function (t) {
            function e(n) {
                return (
                    (t.exports = e = Object.setPrototypeOf
                        ? Object.getPrototypeOf.bind()
                        : function (t) {
                            return t.__proto__ || Object.getPrototypeOf(t);
                        }),
                    (t.exports.__esModule = !0),
                    (t.exports.default = t.exports),
                    e(n)
                );
            }
            (t.exports = e), (t.exports.__esModule = !0), (t.exports.default = t.exports);
        },
        1655: function (t, e, n) {
            var r = n(6015);
            (t.exports = function (t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), Object.defineProperty(t, "prototype", { writable: !1 }), e && r(t, e);
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        9498: function (t) {
            (t.exports = function (t) {
                if (("undefined" != typeof Symbol && null != t[Symbol.iterator]) || null != t["@@iterator"]) return Array.from(t);
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        2218: function (t) {
            (t.exports = function () {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        4993: function (t, e, n) {
            var r = n(8698).default,
                o = n(6115);
            (t.exports = function (t, e) {
                if (e && ("object" === r(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return o(t);
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        6015: function (t) {
            function e(n, r) {
                return (
                    (t.exports = e = Object.setPrototypeOf
                        ? Object.setPrototypeOf.bind()
                        : function (t, e) {
                            return (t.__proto__ = e), t;
                        }),
                    (t.exports.__esModule = !0),
                    (t.exports.default = t.exports),
                    e(n, r)
                );
            }
            (t.exports = e), (t.exports.__esModule = !0), (t.exports.default = t.exports);
        },
        1589: function (t, e, n) {
            var r = n(5372),
                o = n(9498),
                i = n(6116),
                a = n(2218);
            (t.exports = function (t) {
                return r(t) || o(t) || i(t) || a();
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        5036: function (t, e, n) {
            var r = n(8698).default;
            (t.exports = function (t, e) {
                if ("object" !== r(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var o = n.call(t, e || "default");
                    if ("object" !== r(o)) return o;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === e ? String : Number)(t);
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        4062: function (t, e, n) {
            var r = n(8698).default,
                o = n(5036);
            (t.exports = function (t) {
                var e = o(t, "string");
                return "symbol" === r(e) ? e : String(e);
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        8698: function (t) {
            function e(n) {
                return (
                    (t.exports = e =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                return typeof t;
                            }
                            : function (t) {
                                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                            }),
                    (t.exports.__esModule = !0),
                    (t.exports.default = t.exports),
                    e(n)
                );
            }
            (t.exports = e), (t.exports.__esModule = !0), (t.exports.default = t.exports);
        },
        6116: function (t, e, n) {
            var r = n(3897);
            (t.exports = function (t, e) {
                if (t) {
                    if ("string" == typeof t) return r(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0;
                }
            }),
                (t.exports.__esModule = !0),
                (t.exports.default = t.exports);
        },
        9583: function (t) {
            "use strict";
            t.exports = JSON.parse(
                '{"origin-hint":{"seed":"Seed {{position}}","winner-bracket":"Loser of $t(abbreviations.winner-bracket) {{round}}.{{position}}","winner-bracket-semi-final":"Loser of $t(abbreviations.winner-bracket) Semi {{position}}","winner-bracket-final":"Loser of $t(abbreviations.winner-bracket) Final","consolation-final":"Loser of Semi {{position}}","grand-final":"Winner of $t(abbreviations.loser-bracket) Final","double-elimination-consolation-final-opponent-1":"Loser of $t(abbreviations.loser-bracket) Semi 1","double-elimination-consolation-final-opponent-2":"Loser of $t(abbreviations.loser-bracket) Final"},"match-label":{"default":"Match {{matchNumber}}","winner-bracket":"$t(abbreviations.winner-bracket)","loser-bracket":"$t(abbreviations.loser-bracket)","standard-bracket":"$t(abbreviations.match)","standard-bracket-semi-final":"Semi {{matchNumber}}","standard-bracket-final":"Final","double-elimination":"{{matchPrefix}} {{roundNumber}}.{{matchNumber}}","double-elimination-semi-final":"{{matchPrefix}} Semi {{matchNumber}}","double-elimination-final":"{{matchPrefix}} Final","consolation-final":"Consolation Final","grand-final-single":"Grand Final","grand-final":"$t(abbreviations.grand-final) Round {{roundNumber}}","match-game":"Game {{gameNumber}}"},"match-status":{"locked":"Locked","waiting":"Waiting","ready":"Ready","running":"Running","completed":"Completed","archived":"Archived"},"abbreviations":{"win":"W","loss":"L","forfeit":"F","position":"P","seed":"#","winner-bracket":"WB","loser-bracket":"LB","match":"M","grand-final":"GF"},"ranking":{"rank":{"text":"#","tooltip":"Rank"},"id":{"text":"Name","tooltip":"Name"},"played":{"text":"P","tooltip":"Played"},"wins":{"text":"$t(abbreviations.win)","tooltip":"Wins"},"draws":{"text":"D","tooltip":"Draws"},"losses":{"text":"$t(abbreviations.loss)","tooltip":"Losses"},"forfeits":{"text":"$t(abbreviations.forfeit)","tooltip":"Forfeits"},"scoreFor":{"text":"SF","tooltip":"Score For"},"scoreAgainst":{"text":"SA","tooltip":"Score Against"},"scoreDifference":{"text":"+/-","tooltip":"Score Difference"},"points":{"text":"Pts","tooltip":"Points"}},"common":{"bye":"BYE","best-of-x":"Bo{{x}}","consolation":"Consolation","group-name":"Group {{groupNumber}}","group-name-winner-bracket":"Winner Bracket","group-name-loser-bracket":"Loser Bracket","round-name":"Round {{roundNumber}}","round-name-final":"Final Round","round-name-winner-bracket":"$t(abbreviations.winner-bracket) Round {{roundNumber}}","round-name-winner-bracket-final":"$t(abbreviations.winner-bracket) Final Round","round-name-loser-bracket":"$t(abbreviations.loser-bracket) Round {{roundNumber}}","round-name-loser-bracket-final":"$t(abbreviations.loser-bracket) Final Round"},"form-creator":{"stage-name-label":"Name your stage","stage-name-placeholder":"Give a name for your stage","stage-selector-label":"Select a stage","team-label":"Name your teams","team-label-placeholder":"Comma separated List of Team Names (must be 2^n)","team-count":"Or a team count","team-count-placeholder":"How many teams do you want?","group-label":"How many groups?","group-placeholder":"How many groups do you want?","seed-order-label":"How would you like to order your seeds?","double-elimination-seed-order-placeholder":"Seed order for double elimination comma separated","round-robin-mode-label":"Which round robin mode do you like?","consolation-final-label":"Consolation Final","skip-first-round-label":"Skip first round","grand-final-type-label":"Grand final type","submit":"Create"}}'
            );
        },
        8159: function (t) {
            "use strict";
            t.exports = JSON.parse(
                '{"origin-hint":{"seed":"Seed {{position}}","winner-bracket":"Perdant $t(abbreviations.winner-bracket) {{round}}.{{position}}","winner-bracket-semi-final":"Perdant $t(abbreviations.winner-bracket) Semi {{position}}","winner-bracket-final":"Perdant Finale $t(abbreviations.winner-bracket)","consolation-final":"Perdant Semi {{position}}","grand-final":"Gagnant Finale $t(abbreviations.loser-bracket)","double-elimination-consolation-final-opponent-1":"Perdant $t(abbreviations.loser-bracket) Semi 1","double-elimination-consolation-final-opponent-2":"Perdant $t(abbreviations.loser-bracket) Final"},"match-label":{"default":"Match {{matchNumber}}","winner-bracket":"$t(abbreviations.winner-bracket)","loser-bracket":"$t(abbreviations.loser-bracket)","standard-bracket":"$t(abbreviations.match)","standard-bracket-semi-final":"Semi {{matchNumber}}","standard-bracket-final":"Finale","double-elimination":"{{matchPrefix}} {{roundNumber}}.{{matchNumber}}","double-elimination-semi-final":"{{matchPrefix}} Semi {{matchNumber}}","double-elimination-final":"Finale {{matchPrefix}}","consolation-final":"Petite finale","grand-final-single":"Grande finale","grand-final":"$t(abbreviations.grand-final) Round {{roundNumber}}","match-game":"Game {{gameNumber}}"},"match-status":{"locked":"Verrouillé","waiting":"En attente","ready":"Prêt","running":"En cours","completed":"Terminé","archived":"Archivé"},"abbreviations":{"win":"V","loss":"D","forfeit":"F","position":"P","seed":"#","winner-bracket":"WB","loser-bracket":"LB","match":"M","grand-final":"GF"},"ranking":{"rank":{"text":"#","tooltip":"Rang"},"id":{"text":"Name","tooltip":"Nom"},"played":{"text":"J","tooltip":"Joué"},"wins":{"text":"$t(abbreviations.win)","tooltip":"Victoires"},"draws":{"text":"N","tooltip":"Match nul"},"losses":{"text":"$t(abbreviations.loss)","tooltip":"Défaites"},"forfeits":{"text":"$t(abbreviations.forfeit)","tooltip":"Forfaits"},"scoreFor":{"text":"SF","tooltip":"Score pour"},"scoreAgainst":{"text":"SA","tooltip":"Score contre"},"scoreDifference":{"text":"+/-","tooltip":"Différence de score"},"points":{"text":"Pts","tooltip":"Points"}},"common":{"bye":"BYE","best-of-x":"Bo{{x}}","consolation":"Consolation","group-name":"Groupe {{groupNumber}}","group-name-winner-bracket":"Winner Bracket","group-name-loser-bracket":"Loser Bracket","round-name":"Round {{roundNumber}}","round-name-final":"Round final","round-name-winner-bracket":"$t(abbreviations.winner-bracket) Round {{roundNumber}}","round-name-winner-bracket-final":"$t(abbreviations.winner-bracket) Round final","round-name-loser-bracket":"$t(abbreviations.loser-bracket) Round {{roundNumber}}","round-name-loser-bracket-final":"$t(abbreviations.loser-bracket) Round final"},"form-creator":{"stage-name-label":"Name your stage","stage-name-placeholder":"Give a name for your stage","stage-selector-label":"Select a stage","team-label":"Name your teams","team-placeholder":"Comma separated List of Team Names (must be 2^n)","team-count":"Or a team count","team-count-placeholder":"How many teams do you want?","group-label":"How many groups?","group-placeholder":"How many groups do you want?","seed-order-label":"How would you like to order your seeds?","double-elimination-seed-order-placeholder":"Seed order for double elimination comma separated","round-robin-mode-label":"Which round robin mode do you like?","consolation-final-label":"Consolation Final","skip-first-round-label":"Skip first round","grand-final-type-label":"Grand final type","submit":"Create"}}'
            );
        },
    },
        e = {};
    function n(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var i = (e[r] = { exports: {} });
        return t[r].call(i.exports, i, i.exports, n), i.exports;
    }
    (n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
    }),
        (function () {
            "use strict";
            const t = n(2038),
                e = n(9037),
                r = n(825);
            (window.bracketsViewer = new r.BracketsViewer()), (window.inMemoryDatabase = new t.InMemoryDatabase()), (window.bracketsManager = new e.BracketsManager(window.inMemoryDatabase));
        })();
})();



// Add this helper function to check if BracketsViewer is loaded
window.isBracketsViewerLoaded = function () {
    window.bracketsViewer = new BracketsViewer();
    return typeof BracketsViewer !== 'undefined';
};

// Main function to render the tournament bracket
window.renderTournamentBracket = function (tournamentData) {
    try {
        console.log('Starting bracket render with BracketsViewer library...');
        const container = document.getElementById("bracketsViewerContainer");

        if (!container) {
            throw new Error('Bracket container element not found');
        }

        // Show loading state
        container.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary"></div><p class="mt-2">Loading bracket...</p></div>';

        // Parse the tournament data if it's a string
        let parsedData = tournamentData;
        if (typeof tournamentData === 'string') {
            try {
                parsedData = JSON.parse(tournamentData);
                console.log('Successfully parsed tournament data from string');
            } catch (parseError) {
                console.error('Failed to parse tournament data:', parseError);
                throw new Error('Invalid tournament data format');
            }
        }

        // Check if BracketsViewer is available
        if (typeof BracketsViewer === 'undefined') {
            console.error('BracketsViewer is not defined. Make sure the library is loaded correctly.');
            container.innerHTML = '<div class="alert alert-danger">BracketsViewer library is not available. Please ensure the library is loaded correctly.</div>';
            return;
        }

        // Initialize BracketsViewer
        window.bracketsViewer = new BracketsViewer();

        // Convert tournament data to the expected format
        const convertedData = {
            stage: [{
                id: 1,
                name: parsedData.name || "Tournament",
                type: "single_elimination"
            }],
            participant: [],
            match: [],
            match_game: []
        };

        console.log('Converting tournament data...');

        const participantMap = new Map();
        let participantId = 1;

        // Process all participants first
        parsedData.rounds.forEach(round => {
            if (round.matches && Array.isArray(round.matches)) {
                round.matches.forEach(matchData => {
                    if (matchData.match) {
                        const match = matchData.match;

                        // Process player 1
                        if (match.player1Id && !participantMap.has(match.player1Id)) {
                            participantMap.set(match.player1Id, participantId++);
                            convertedData.participant.push({
                                id: participantMap.get(match.player1Id),
                                name: match.player1Name || "Player 1"
                            });
                        }

                        // Process player 2
                        if (match.player2Id && !participantMap.has(match.player2Id)) {
                            participantMap.set(match.player2Id, participantId++);
                            convertedData.participant.push({
                                id: participantMap.get(match.player2Id),
                                name: match.player2Name || "Player 2"
                            });
                        }
                    }
                });
            }
        });

        // Now process all matches
        let matchId = 1;
        parsedData.rounds.forEach((round, roundIndex) => {
            if (round.matches && Array.isArray(round.matches)) {
                round.matches.forEach((matchData, matchIndex) => {
                    if (matchData.match) {
                        const match = matchData.match;

                        // Process match results
                        const opponent1Id = match.player1Id ? participantMap.get(match.player1Id) : null;
                        const opponent2Id = match.player2Id ? participantMap.get(match.player2Id) : null;

                        // Determine match status (4 = completed in the example)
                        let status = 1; // Default status (1 = pending)
                        let opponent1Score = null;
                        let opponent2Score = null;

                        if (matchData.winnerPlayerId) {
                            status = 4; // Completed

                            if (matchData.winnerPlayerId === match.player1Id) {
                                opponent1Score = 2;
                                opponent2Score = 0;
                            } else if (matchData.winnerPlayerId === match.player2Id) {
                                opponent1Score = 0;
                                opponent2Score = 2;
                            }
                        }

                        // Create match object
                        const matchObj = {
                            id: matchId++,
                            stage_id: 1,
                            group_id: 1,
                            round_id: roundIndex + 1,
                            number: matchIndex + 1,
                            status: status,
                            opponent1: {
                                id: opponent1Id,
                                score: opponent1Score
                            },
                            opponent2: {
                                id: opponent2Id,
                                score: opponent2Score
                            }
                        };

                        // Add special property for our click handler
                        matchObj.matchId = match.id;

                        convertedData.match.push(matchObj);
                    }
                });
            }
        });

        if (convertedData.participant.length === 0 || convertedData.match.length === 0) {
            console.warn('No valid participants or matches found in the data');
            container.innerHTML = '<div class="alert alert-warning">No valid tournament data available to display.</div>';
            return;
        }

        // Clear the container
        container.innerHTML = '';

        console.log('Rendering bracket with library...');

        // Use the library to render
        window.bracketsViewer.render({
            stages: convertedData.stage,
            matches: convertedData.match,
            matchGames: convertedData.match_game,
            participants: convertedData.participant,
        }, {
            selector: '#bracketsViewerContainer',
            participantOriginPlacement: 'before',
            separatedChildCountLabel: true,
            showSlotsOrigin: true,
            highlightParticipantOnHover: true,
            onMatchClick: function (match) {
                if (match.matchId) {
                    window.location.href = `/matches/details/${match.matchId}`;
                }
            }
        });

        applyCustomStyles();
        console.log('Bracket rendered successfully');

    } catch (error) {
        console.error('Bracket render error:', error);
        const container = document.getElementById("bracketsViewerContainer");
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error rendering bracket</h4>
                    <p>${error.message}</p>
                    <p>Please check the browser console for more details.</p>
                </div>`;
        }
    }
};

function applyCustomStyles() {
    // Remove any existing custom styles
    const existingStyle = document.getElementById('brackets-viewer-custom-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Create and add new styles
    const style = document.createElement('style');
    style.id = 'brackets-viewer-custom-styles';
    style.textContent = `
        .brackets-viewer .match {
            background-color: var(--surface, #1e1e2e);
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 8px;
            margin: 5px;
        }

        .brackets-viewer .participant {
            padding: 6px;
            border-radius: 4px;
            margin: 2px 0;
        }

        .brackets-viewer .connect-previous, 
        .brackets-viewer .connect-next {
            stroke: var(--primary, #89b4fa);
            stroke-width: 2px;
        }

        .brackets-viewer .name {
            font-weight: bold;
        }

        .brackets-viewer .result {
            font-weight: bold;
            color: var(--primary, #89b4fa);
        }

        .brackets-viewer .participant.win .name {
            color: var(--success, #a6e3a1);
        }

        .brackets-viewer .participant.loss .name {
            color: var(--danger, #f38ba8);
        }
    `;
    document.head.appendChild(style);
}

console.log('Direct BracketsViewer integration loaded');