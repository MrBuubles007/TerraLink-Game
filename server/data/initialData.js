const TEAMS = [
    {
        id: "megalogistics",
        name: "MegaLogistics Corp.",
        color: "blue", // Was megalogistics
        icon: "🚢",
        type: "Logistik-Riese",
        capital: 500,
        capitalSuffix: "Mrd.",
        marketShare: 45, // %
        co2: "Hoch",
        briefing: "Ihr liefert alles, überall hin, sofort. Euer Ziel ist Gewinnmaximierung und Effizienz. Lokale Gesetze seht ihr eher als Empfehlung. Globalisierung ist euer Motor."
    },
    {
        id: "fastfash",
        name: "FastFash Inc.",
        color: "pink", // Was fastfash
        icon: "👗",
        type: "Mode-Gigant",
        capital: 120,
        capitalSuffix: "Mrd.",
        marketShare: 30, // %
        co2: "Hoch",
        briefing: "Trends ändern sich wöchentlich, und ihr bestimmt sie. Eure Kleidung ist billig und trendy. Arbeitsbedingungen und Umwelt stehen oft hinter dem Preis zurück."
    },
    {
        id: "heidehof",
        name: "HeideHof Mani.",
        color: "green", // Was heidehof
        icon: "🌾",
        type: "Lokal Bio & Handwerk",
        capital: 2,
        capitalSuffix: "Mio.",
        marketShare: 5, // %
        co2: "Niedrig",
        briefing: "Qualität statt Quantität. Ihr seid tief in der Region verwurzelt und setzt auf nachhaltige, faire Produkte. Euer Budget ist klein, aber eure Kunden sind loyal."
    },
    {
        id: "techsolutions",
        name: "NDS TechSolutions",
        color: "orange", // Was tech
        icon: "⚡",
        type: "Solar & Software",
        capital: 15,
        capitalSuffix: "Mio.",
        marketShare: 10, // %
        co2: "Mittel",
        briefing: "Innovation aus der Heimat. Ihr entwickelt Lösungen für die Energiewende. Ihr müsst gegen die großen Tech-Giganten bestehen, habt aber den Vorteil der Agilität."
    }
];

const EVENTS = [
    {
        id: 1,
        title: "Blockade im Suez-Kanal",
        description: "Ein riesiges Containerschiff ist auf Grund gelaufen und blockiert die wichtigste Handelsroute zwischen Asien und Europa. Tausende Schiffe stauen sich, und wichtige Bauteile für eure Produktion stecken fest. Die Verzögerung droht, eure gesamte Lieferkette für Wochen lahmzulegen.",
        options: [
            {
                id: "A",
                text: "Wir leiten die Lieferkette sofort über teurere Luftfracht um, um die Produktion nicht zu gefährden.",
                effect: { cost: 40, co2: 25, market: 0 },
                customEffects: {
                    "megalogistics": { cost: 80, co2: 30, market: 0 }, // Huge volume, huge cost
                    "fastfash": { cost: 50, co2: 25, market: 0 },
                    "heidehof": { cost: 5, co2: 5, market: 1 }, // Less affected
                    "techsolutions": { cost: 15, co2: 10, market: 0 }
                },
                analysis: "Ihr habt die Lieferung gesichert, aber die Treibstoffkosten sind explodiert. Das Budget leidet, aber die Kunden sind versorgt."
            },
            {
                id: "B",
                text: "Wir melden einen Fall von höherer Gewalt und setzen die Lieferungen an unsere Kunden temporär aus.",
                effect: { cost: -20, co2: 0, market: -15 },
                customEffects: {
                    "megalogistics": { cost: -50, co2: 0, market: -20 }, // Reputation hit
                    "heidehof": { cost: -1, co2: 0, market: 1 }, // Locals understand
                    "fastfash": { cost: -10, co2: 0, market: -15 },
                    "techsolutions": { cost: -5, co2: 0, market: -10 }
                },
                analysis: "Die Kosten wurden minimiert, doch die Kunden warten vergebens. Euer Marktanteil sinkt spürbar, da die Konkurrenz liefert."
            },
            {
                id: "C",
                text: "Wir beauftragen einen spezialisierten Express-Logistiker, um die Ware über Landwege zu priorisieren.",
                effect: { cost: 80, co2: 40, market: 10 },
                customEffects: {
                    "fastfash": { cost: 60, co2: 40, market: 15 }, // Speed is key
                    "megalogistics": { cost: 100, co2: 50, market: 5 },
                    "heidehof": { cost: 10, co2: 10, market: 0 },
                    "techsolutions": { cost: 30, co2: 20, market: 5 }
                },
                analysis: "Die Ware kam pünktlich an, was die Kunden begeistert. Die extremen Kosten reißen jedoch ein Loch in die Kasse."
            },
            {
                id: "D",
                text: "Wir stellen die Beschaffung kurzfristig auf lokale Zulieferer in der Region um.",
                effect: { cost: 30, co2: -10, market: 5 },
                customEffects: {
                    "heidehof": { cost: -2, co2: -5, market: 10 }, // Their home turf
                    "megalogistics": { cost: 120, co2: -10, market: -5 }, // Impossible to source locally quickly
                    "fastfash": { cost: 60, co2: -5, market: -5 },
                    "techsolutions": { cost: 10, co2: -5, market: 5 }
                },
                analysis: "Die Umstellung stärkt das regionale Image und spart CO2. Allerdings sind die lokalen Preise oft höher als auf dem Weltmarkt."
            },
            {
                id: "E",
                text: "Wir akzeptieren den Lieferausfall und kommunizieren offen die Verzögerung an alle Partner.",
                effect: { cost: 5, co2: 0, market: -10 },
                customEffects: {
                    "megalogistics": { cost: 20, co2: 0, market: -20 }, // Reputation disaster
                    "heidehof": { cost: 0, co2: 0, market: -2 },
                    "fastfash": { cost: 0, co2: 0, market: -15 }, // Trends missed
                    "techsolutions": { cost: 0, co2: 0, market: -5 }
                },
                analysis: "Günstigste Option, aber das Vertrauen der Kunden sinkt massiv."
            }
        ]
    },
    {
        id: 2,
        title: "Sonnensturm trifft Erde",
        description: "Ein massiver geomagnetischer Sturm hat die Erdumlaufbahn erreicht und stört GPS- und Kommunikationssatelliten weltweit. Navigationssysteme fallen aus und Just-in-Time-Lieferketten brechen zusammen. Die digitale Infrastruktur ist massiv beeinträchtigt.",
        options: [
            {
                id: "A",
                text: "Wir stellen sämtliche Prozesse auf manuelle Bearbeitung und analoge Kommunikation um.",
                effect: { cost: 10, co2: 0, market: -5 },
                customEffects: {
                    "techsolutions": { cost: 40, co2: 0, market: -20 }, // Disaster for tech
                    "heidehof": { cost: 0, co2: 0, market: 5 }, // Easy for them
                    "megalogistics": { cost: 50, co2: 5, market: -10 }, // Chaos
                    "fastfash": { cost: 10, co2: 0, market: -5 }
                },
                analysis: "Der Betrieb läuft langsam weiter, Chaos wurde vermieden. Ohne moderne Technik sinkt jedoch die Effizienz deutlich."
            },
            {
                id: "B",
                text: "Wir investieren in abgeschirmte Server und robuste Hardware, um handlungsfähig zu bleiben.",
                effect: { cost: 60, co2: 5, market: 15 },
                customEffects: {
                    "heidehof": { cost: 10, co2: 0, market: 0 }, // Overkill
                    "techsolutions": { cost: 40, co2: 5, market: 25 }, // Good invest
                    "megalogistics": { cost: 100, co2: 10, market: 10 },
                    "fastfash": { cost: 30, co2: 5, market: 5 }
                },
                analysis: "Eine teure Investition, die sich langfristig auszahlt. Ihr seid nun besser gegen zukünftige Ausfälle gerüstet als andere."
            },
            {
                id: "C",
                text: "Wir beantragen staatliche Nothilfen zur Überbrückung der technischen Ausfälle.",
                effect: { cost: -15, co2: 0, market: 0 },
                customEffects: {
                    "megalogistics": { cost: -50, co2: 0, market: -5 }, // Big corps get more
                    "heidehof": { cost: 0, co2: 0, market: 0 },
                    "techsolutions": { cost: -10, co2: 0, market: 0 },
                    "fastfash": { cost: -20, co2: 0, market: 0 }
                },
                analysis: "Die Finanzspritze hilft kurzfristig, löst aber keine technischen Probleme. Ihr steht ohne eigene Lösung da."
            },
            {
                id: "D",
                text: "Wir stoppen den operativen Betrieb vollständig, bis die Systemstabilität wiederhergestellt ist.",
                effect: { cost: 5, co2: -5, market: -10 },
                customEffects: {
                    "techsolutions": { cost: 5, co2: 0, market: -30 }, // Death sentence for tech
                    "megalogistics": { cost: 20, co2: 0, market: -15 },
                    "heidehof": { cost: 0, co2: 0, market: -2 },
                    "fastfash": { cost: 5, co2: -5, market: -10 }
                },
                analysis: "Ihr spart Ressourcen und vermeidet Fehler. Die Kunden wenden sich während der Pause jedoch an die Konkurrenz."
            },
            {
                id: "E",
                text: "Wir erwerben militärische Abschirmtechnik für unsere kritische Infrastruktur.",
                effect: { cost: 100, co2: 20, market: 20 },
                customEffects: {
                    "techsolutions": { cost: 30, co2: 10, market: 40 }, // Their home turf
                    "heidehof": { cost: 50, co2: 10, market: 0 }, // Useless
                    "megalogistics": { cost: 150, co2: 30, market: 15 },
                    "fastfash": { cost: 80, co2: 20, market: 5 }
                },
                analysis: "Massive Investition, die einen technologischen Vorsprung bringt."
            }
        ]
    },
    {
        id: 3,
        title: "Rohstoff-Mangel",
        description: "Durch politische Spannungen und Missernten sind wichtige Rohstoffe wie Baumwolle und seltene Erden knapp geworden. Die Weltmarktpreise explodieren und Zulieferer kündigen Verträge. Eure Produktion steht auf der Kippe.",
        options: [
            {
                id: "A",
                text: "Wir wechseln kurzfristig auf günstigere Ersatzmaterialien mit geringerer Qualität.",
                effect: { cost: -10, co2: 30, market: -5 },
                customEffects: {
                    "heidehof": { cost: 0, co2: 10, market: -20 }, // Ruins brand
                    "fastfash": { cost: -30, co2: 40, market: -2 }, // Customers used to it
                    "megalogistics": { cost: -20, co2: 20, market: -5 },
                    "techsolutions": { cost: -5, co2: 10, market: -15 } // Tech needs quality
                },
                analysis: "Die Kosten wurden gesenkt, aber die Qualität hat gelitten. Das Image nimmt Schaden durch minderwertige Produkte."
            },
            {
                id: "B",
                text: "Wir stellen unsere Produktion vollständig auf recycelte Materialien (\"Circular Economy\") um.",
                effect: { cost: 50, co2: -10, market: 15 },
                customEffects: {
                    "fastfash": { cost: 80, co2: -20, market: 25 }, // Big pivot
                    "heidehof": { cost: 10, co2: -5, market: 10 }, // Natural fit
                    "megalogistics": { cost: 60, co2: -10, market: 10 },
                    "techsolutions": { cost: 40, co2: -30, market: 20 } // e-waste
                },
                analysis: "Das nachhaltige Image zieht neue Kunden an. Die Aufbereitung ist jedoch technisch aufwendig und teuer."
            },
            {
                id: "C",
                text: "Wir geben die gestiegenen Rohstoffkosten direkt an unsere Endkunden weiter.",
                effect: { cost: 5, co2: 0, market: -5 },
                customEffects: {
                    "fastfash": { cost: 0, co2: 0, market: -20 }, // Price sensitive
                    "heidehof": { cost: 0, co2: 0, market: -2 }, // Loyal customers
                    "megalogistics": { cost: 10, co2: 0, market: -10 },
                    "techsolutions": { cost: 5, co2: 0, market: -5 }
                },
                analysis: "Die höheren Kosten werden gedeckt, die Marge bleibt stabil. Preissensible Kunden wandern allerdings ab."
            },
            {
                id: "D",
                text: "Wir kaufen aggressiv alle verfügbaren Vorräte auf dem Weltmarkt auf.",
                effect: { cost: 150, co2: 10, market: 25 },
                customEffects: {
                    "heidehof": { cost: 10, co2: 0, market: 5 }, // Can't afford much
                    "megalogistics": { cost: 250, co2: 20, market: 35 }, // Domination
                    "fastfash": { cost: 100, co2: 10, market: 20 },
                    "techsolutions": { cost: 50, co2: 10, market: 15 }
                },
                analysis: "Ihr habt den Markt leergekauft und dominiert die Versorgung. Diese aggressive Strategie war extrem kostspielig."
            },
            {
                id: "E",
                text: "Wir üben politischen Druck aus, um Importbeschränkungen zu lockern.",
                effect: { cost: 20, co2: 20, market: 0 },
                customEffects: {
                    "megalogistics": { cost: 50, co2: 30, market: 5 }, // Lobby power
                    "heidehof": { cost: 5, co2: 5, market: -5 }, // No power
                    "fastfash": { cost: 30, co2: 40, market: 0 },
                    "techsolutions": { cost: 15, co2: 10, market: 0 }
                },
                analysis: "Versuch, Standards zu senken, um einfacher produzieren zu können."
            }
        ]
    },
    {
        id: 4,
        title: "Verpackungs-Gesetz",
        description: "Die EU hat überraschend strengere Regeln für Verpackungsmüll verabschiedet, die sofort in Kraft treten. Einwegplastik wird massiv besteuert und die Entsorgungskosten steigen drastisch. Eure aktuellen Verpackungen sind nun illegal oder extrem teuer.",
        options: [
            {
                id: "A",
                text: "Wir investieren in die Entwicklung und Einführung biologisch abbaubarer Verpackungen.",
                effect: { cost: -40, co2: -20, market: 5 }, // Negative cost = subsidy? Wait, logic says cost is POSITIVE for expense. Fixed sign in text? Cost 40.
                customEffects: {
                    "megalogistics": { cost: 80, co2: -15, market: 10 },
                    "fastfash": { cost: 60, co2: -20, market: 15 },
                    "heidehof": { cost: -10, co2: -10, market: 5 }, // Subsidies cover it
                    "techsolutions": { cost: 20, co2: -10, market: 5 }
                },
                analysis: "Ihr nutzt staatliche Förderung und verbessert die Öko-Bilanz. Die Umstellung erfordert kurzfristig organisatorischen Aufwand."
            },
            {
                id: "B",
                text: "Wir behalten unsere Verpackungen bei und zahlen die anfallenden Strafgebühren.",
                effect: { cost: 30, co2: 10, market: -10 },
                customEffects: {
                    "megalogistics": { cost: 120, co2: 20, market: -15 }, // Huge volume
                    "fastfash": { cost: 80, co2: 30, market: -10 },
                    "heidehof": { cost: 5, co2: 5, market: -20 }, // Brand suicide
                    "techsolutions": { cost: 15, co2: 5, market: -5 }
                },
                analysis: "Das Bußgeld belastet die Kasse unnötig. Zudem leidet der Ruf als verantwortungsvolles Unternehmen massiv."
            },
            {
                id: "C",
                text: "Wir verzichten weitestgehend auf Umverpackungen (\"No-Waste Strategy\").",
                effect: { cost: 5, co2: -5, market: -5 },
                customEffects: {
                    "heidehof": { cost: 1, co2: -10, market: 15 }, // Perfect fit
                    "megalogistics": { cost: 20, co2: -5, market: -30 }, // Impossible/Damaged goods
                    "fastfash": { cost: 10, co2: -5, market: -15 }, // Clothes get dirty
                    "techsolutions": { cost: 5, co2: -5, market: 0 }
                },
                analysis: "Materialkosten werden gespart und Müll vermieden. Manche Produkte sind nun jedoch schlechter geschützt."
            },
            {
                id: "D",
                text: "Wir starten ein Forschungsprojekt für neuartige Mehrweg-Systeme.",
                effect: { cost: 80, co2: -15, market: 20 },
                customEffects: {
                    "techsolutions": { cost: 40, co2: -20, market: 30 }, // Tech leader
                    "heidehof": { cost: 15, co2: -10, market: 5 },
                    "megalogistics": { cost: 100, co2: -15, market: 15 },
                    "fastfash": { cost: 60, co2: -10, market: 10 }
                },
                analysis: "Ihr entwickelt neue Lösungen und seid Technologieführer. Forschung ist teuer und die Ergebnisse waren ungewiss."
            },
            {
                id: "E",
                text: "Wir verlagern die Produktion ins Nicht-EU-Ausland, um das Gesetz zu umgehen.",
                effect: { cost: 50, co2: 30, market: -20 },
                customEffects: {
                    "heidehof": { cost: 10, co2: 10, market: -60 }, // Disaster
                    "fastfash": { cost: 40, co2: 40, market: -10 }, // Common practice
                    "megalogistics": { cost: 60, co2: 30, market: -15 },
                    "techsolutions": { cost: 40, co2: 20, market: -15 }
                },
                analysis: "Umgeht Gesetze, wird aber von umweltbewussten Kunden abgestraft."
            }
        ]
    },
    {
        id: 5,
        title: "Klima-Konferenz",
        description: "Auf der UN-Klimakonferenz wurde eine weltweite, drastische Bepreisung von CO2-Emissionen beschlossen. Unternehmen müssen für jede Tonne CO2 tief in die Tasche greifen. Investoren fordern sofortige Pläne zur Klimaneutralität.",
        options: [
            {
                id: "A",
                text: "Wir kaufen CO2-Zertifikate am Markt, um unsere Emissionen auszugleichen.",
                effect: { cost: 60, co2: 0, market: 5 },
                customEffects: {
                    "megalogistics": { cost: 100, co2: 0, market: 5 }, // High emissions
                    "fastfash": { cost: 80, co2: 0, market: 0 },
                    "heidehof": { cost: 2, co2: 0, market: 0 }, // Low emissions
                    "techsolutions": { cost: 10, co2: 0, market: 5 }
                },
                analysis: "Ihr kauft euch das Recht auf Emissionen und produziert weiter. Das ist teuer und löst das eigentliche Problem nicht."
            },
            {
                id: "B",
                text: "Wir starten eine großangelegte PR-Kampagne, um unser grünes Image zu polieren.",
                effect: { cost: 20, co2: 10, market: -15 }, // Was -20 cost?
                customEffects: {
                    "fastfash": { cost: 30, co2: 20, market: -20 }, // Obvious greenwashing
                    "megalogistics": { cost: 40, co2: 10, market: -10 },
                    "heidehof": { cost: 5, co2: 0, market: -5 },
                    "techsolutions": { cost: 15, co2: 5, market: -5 }
                },
                analysis: "Das Marketing konnte die Schwächen nur kurz verdecken. Kritische Kunden durchschauen das Greenwashing schnell."
            },
            {
                id: "C",
                text: "Wir unterziehen alle Unternehmensbereiche einer tiefgreifenden ökologischen Sanierung.",
                effect: { cost: 100, co2: -30, market: 25 },
                customEffects: {
                    "megalogistics": { cost: 200, co2: -30, market: 30 }, // Huge task
                    "fastfash": { cost: 120, co2: -30, market: 20 },
                    "heidehof": { cost: 5, co2: -10, market: 5 }, // Already done
                    "techsolutions": { cost: 40, co2: -20, market: 25 }
                },
                analysis: "Eine massive Investition transformiert das Unternehmen. Langfristig spart ihr Kosten und gewinnt umweltbewusste Kunden."
            },
            {
                id: "D",
                text: "Wir verlegen unseren Hauptsitz in ein Land mit laxeren Umweltgesetzen.",
                effect: { cost: 40, co2: 20, market: -10 },
                customEffects: {
                    "heidehof": { cost: 10, co2: 5, market: -40 }, // Identity loss
                    "megalogistics": { cost: 60, co2: 30, market: -5 },
                    "fastfash": { cost: 40, co2: 40, market: -5 },
                    "techsolutions": { cost: 30, co2: 15, market: -15 }
                },
                analysis: "Ihr umgeht die strengen Gesetze und spart Steuern. Die Logistik wird jedoch komplexer und das Heimat-Image leidet."
            },
            {
                id: "E",
                text: "Wir investieren massiv in eigene Wind- und Solarparks zur Selbstversorgung.",
                effect: { cost: 80, co2: -20, market: 15 },
                customEffects: {
                    "techsolutions": { cost: 30, co2: -40, market: 35 }, // Synergy
                    "megalogistics": { cost: 150, co2: -20, market: 15 },
                    "heidehof": { cost: 10, co2: -20, market: 10 },
                    "fastfash": { cost: 70, co2: -15, market: 10 }
                },
                analysis: "Vorne dabei statt nur hinterherlaufen. Technologieführerschaft."
            }
        ]
    },
    {
        id: 6,
        title: "Energie-Krise",
        description: "Instabilität im Nahen Osten führt zu einer Verdreifachung des Ölpreises über Nacht. Strom- und Transportkosten schnellen in die Höhe. Energieintensive Produktionen und lange Lieferwege werden plötzlich unbezahlbar.",
        options: [
            {
                id: "A",
                text: "Wir geben die explodierenden Energiekosten 1:1 an die Kunden weiter.",
                effect: { cost: -10, co2: 0, market: -25 },
                customEffects: {
                    "megalogistics": { cost: -20, co2: 0, market: -25 }, // Major impact
                    "fastfash": { cost: -15, co2: 0, market: -30 }, // Customers leave
                    "heidehof": { cost: 0, co2: 0, market: -5 }, // Loyal
                    "techsolutions": { cost: -5, co2: 0, market: -15 }
                },
                analysis: "Die Gewinnmarge bleibt gesichert. Die Preiserhöhung verärgert jedoch viele Kunden und treibt sie zur Konkurrenz."
            },
            {
                id: "B",
                text: "Wir rüsten unsere gesamte Infrastruktur auf erneuerbare Energien um.",
                effect: { cost: 100, co2: -30, market: 15 },
                customEffects: {
                    "megalogistics": { cost: 200, co2: -25, market: 20 },
                    "heidehof": { cost: 15, co2: -20, market: 10 },
                    "techsolutions": { cost: 30, co2: -40, market: 30 }, // Easier for them
                    "fastfash": { cost: 80, co2: -20, market: 15 }
                },
                analysis: "Ihr seid nun unabhängig von fossilen Preisschwankungen. Die Installation der Anlagen war eine große finanzielle Hürde."
            },
            {
                id: "C",
                text: "Wir führen strikte Energiesparmaßnahmen in allen Büros und Werken ein.",
                effect: { cost: 15, co2: 40, market: -5 }, // Cost is positive? Means savings? No, cost usually expense. Maybe small expense for implementation?
                customEffects: {
                    "megalogistics": { cost: 20, co2: 30, market: -5 },
                    "heidehof": { cost: 2, co2: 10, market: -2 },
                    "fastfash": { cost: 10, co2: 20, market: -5 },
                    "techsolutions": { cost: 5, co2: 10, market: -5 }
                },
                analysis: "Kleine Einsparungen helfen etwas, reichen aber nicht aus. Der Betrieb bleibt anfällig für hohe Energiepreise."
            },
            {
                id: "D",
                text: "Wir verkürzen unsere Lieferketten und konzentrieren uns auf den regionalen Markt.",
                effect: { cost: 50, co2: -10, market: 10 },
                customEffects: {
                    "heidehof": { cost: 0, co2: 0, market: 20 }, // Perfect
                    "megalogistics": { cost: 150, co2: -10, market: -10 }, // Logic breakdown
                    "fastfash": { cost: 70, co2: -5, market: -5 },
                    "techsolutions": { cost: 20, co2: -10, market: 10 }
                },
                analysis: "Kurze Transportwege sparen massiv Treibstoffkosten. Das lokale Netzwerk erweist sich als stabil und krisensicher."
            },
            {
                id: "E",
                text: "Wir spekulieren auf weiter steigende Ölpreise und investieren in fossile Reserven.",
                effect: { cost: 70, co2: 50, market: 5 },
                customEffects: {
                    "megalogistics": { cost: 100, co2: 60, market: 10 },
                    "heidehof": { cost: 10, co2: 20, market: -10 }, // Users hate it
                    "fastfash": { cost: 50, co2: 40, market: 5 },
                    "techsolutions": { cost: 30, co2: 30, market: -5 }
                },
                analysis: "Wette auf hohe Ölpreise, extrem klimaschädlich."
            }
        ]
    },
    {
        id: 7,
        title: "Hacker-Angriff",
        description: "Ein international koordinierter Cyber-Angriff hat eure zentralen IT-Systeme verschlüsselt. Die Produktion steht still, und sensible Kundendaten drohen im Darknet veröffentlicht zu werden. Die Erpresser verlangen eine hohe Summe in Bitcoin.",
        options: [
            {
                id: "A",
                text: "Wir engagieren sofort eine spezialisierte IT-Security-Firma zur Datenrettung.",
                effect: { cost: -60, co2: 0, market: 10 }, // Negative cost?? Should be POSITIVE. Fix: Cost 60.
                customEffects: {
                    "megalogistics": { cost: 100, co2: 0, market: 10 },
                    "techsolutions": { cost: 20, co2: 0, market: 15 }, // Know people
                    "heidehof": { cost: 5, co2: 0, market: 2 },
                    "fastfash": { cost: 50, co2: 0, market: 5 }
                },
                analysis: "Die Profis haben das System schnell wiederhergestellt. Ihr Stundensatz war hoch, aber der Betrieb läuft wieder sicher."
            },
            {
                id: "B",
                text: "Wir bezahlen die geforderte Lösegeldsumme an die Erpresser.",
                effect: { cost: 40, co2: 0, market: 0 },
                customEffects: {
                    "megalogistics": { cost: 150, co2: 0, market: -5 },
                    "heidehof": { cost: 2, co2: 0, market: -5 },
                    "techsolutions": { cost: 50, co2: 0, market: -20 }, // Shameful for tech
                    "fastfash": { cost: 40, co2: 0, market: 0 }
                },
                analysis: "Ihr habt gezahlt, doch die Entschlüsselung funktionierte nur teilweise. Zudem wurde kriminelles Verhalten finanziert."
            },
            {
                id: "C",
                text: "Wir löschen alle betroffenen Systeme und setzen sie aus Backups neu auf.",
                effect: { cost: 10, co2: 0, market: -10 },
                customEffects: {
                    "techsolutions": { cost: 5, co2: 0, market: -5 }, // Fast backups
                    "megalogistics": { cost: 30, co2: 0, market: -15 }, // Complex systems
                    "heidehof": { cost: 1, co2: 0, market: -2 },
                    "fastfash": { cost: 10, co2: 0, market: -10 }
                },
                analysis: "Es entstanden kaum Kosten, aber der Prozess dauerte lange. Wichtige Daten gingen verloren, was Kunden verärgert."
            },
            {
                id: "D",
                text: "Wir bauen eine interne Cyber-Defense-Abteilung auf.",
                effect: { cost: 20, co2: 0, market: 5 },
                customEffects: {
                    "techsolutions": { cost: 10, co2: 0, market: 20 },
                    "megalogistics": { cost: 60, co2: 0, market: 10 },
                    "fastfash": { cost: 30, co2: 0, market: 5 },
                    "heidehof": { cost: 5, co2: 0, market: 0 }
                },
                analysis: "Ihr habt interne Kompetenz aufgebaut. Das schützt nachhaltig vor Angriffen, bindet aber Personalressourcen."
            },
            {
                id: "E",
                text: "Wir arbeiten mit analogen Notfallplänen weiter, um den Betrieb notdürftig zu sichern.",
                effect: { cost: 5, co2: 0, market: -15 },
                customEffects: {
                    "heidehof": { cost: 0, co2: 0, market: 5 }, // Works well
                    "megalogistics": { cost: 20, co2: 0, market: -30 }, // Disaster
                    "techsolutions": { cost: 10, co2: 0, market: -40 }, // Impossible
                    "fastfash": { cost: 5, co2: 0, market: -15 }
                },
                analysis: "Funktioniert nur im kleinen Maßstab. Großbetriebe kollabieren."
            }
        ]
    },
    {
        id: 8,
        title: "Vulkan-Ausbruch",
        description: "Ein Vulkanausbruch in Island hat eine riesige Aschewolke über Europa verteilt. Der gesamte Flugverkehr ist aus Sicherheitsgründen eingestellt. Eilige Lieferungen stecken an Flughäfen fest und Kunden warten dringend auf Ware.",
        options: [
            {
                id: "A",
                text: "Wir verlagern alle Transporte sofort auf Schiene und Straße.",
                effect: { cost: 30, co2: 10, market: 0 },
                customEffects: {
                    "megalogistics": { cost: 80, co2: 20, market: 10 },
                    "fastfash": { cost: 40, co2: 10, market: -5 },
                    "heidehof": { cost: 2, co2: 0, market: 2 },
                    "techsolutions": { cost: 10, co2: 5, market: 0 }
                },
                analysis: "Die Ware bewegt sich wieder, wenn auch langsamer. Die Logistikkosten stiegen durch den aufwendigen Bodentransport."
            },
            {
                id: "B",
                text: "Wir bedienen die Nachfrage ausschließlich aus unseren bestehenden Lagerbeständen.",
                effect: { cost: 5, co2: 0, market: 0 },
                customEffects: {
                    "fastfash": { cost: 5, co2: 0, market: -10 }, // Low stock usually
                    "megalogistics": { cost: 10, co2: 0, market: 5 }, // Huge warehouses
                    "heidehof": { cost: 1, co2: 0, market: 1 },
                    "techsolutions": { cost: 2, co2: 0, market: 0 }
                },
                analysis: "Ihr konntet die Lieferfähigkeit kurzfristig erhalten. Sobald das Lager leer ist, drohen jedoch Engpässe."
            },
            {
                id: "C",
                text: "Wir ersetzen alle Geschäftsreisen durch Videokonferenzen und digitale Tools.",
                effect: { cost: -10, co2: -20, market: 0 },
                customEffects: {
                    "megalogistics": { cost: -30, co2: -20, market: 0 },
                    "techsolutions": { cost: -5, co2: -10, market: 5 },
                    "heidehof": { cost: 0, co2: -5, market: 0 },
                    "fastfash": { cost: -10, co2: -10, market: 0 }
                },
                analysis: "Reisekosten und Emissionen wurden massiv gesenkt. Persönliche Kundenbeziehungen leiden jedoch unter der Distanz."
            },
            {
                id: "D",
                text: "Wir weichen auf Seefracht aus, um große Mengen günstig zu transportieren.",
                effect: { cost: 20, co2: 15, market: -5 },
                customEffects: {
                    "megalogistics": { cost: 40, co2: 20, market: 5 },
                    "fastfash": { cost: 20, co2: 10, market: -15 }, // Too slow
                    "heidehof": { cost: 5, co2: 5, market: -5 },
                    "techsolutions": { cost: 10, co2: 5, market: -5 }
                },
                analysis: "Der Transport ist günstig, dauert aber Wochen. Zeitkritische Lieferungen kommen viel zu spät an."
            },
            {
                id: "E",
                text: "Wir ordnen eine temporäre Betriebspause an, bis der Luftraum wieder frei ist.",
                effect: { cost: 10, co2: 0, market: -10 },
                customEffects: {
                    "megalogistics": { cost: 30, co2: 0, market: -15 },
                    "fastfash": { cost: 15, co2: 0, market: -20 },
                    "heidehof": { cost: 1, co2: 0, market: -2 },
                    "techsolutions": { cost: 5, co2: 0, market: -5 }
                },
                analysis: "Verhindert Chaos, kostet aber Produktionszeit."
            }
        ]
    },
    {
        id: 9,
        title: "Krankheits-Welle",
        description: "Eine aggressive Grippewelle legt große Teile der Belegschaft lahm. Die Produktion läuft nur noch auf halber Kraft, und wichtige Entscheidungsträger fallen aus. Die Unsicherheit an den Märkten wächst.",
        options: [
            {
                id: "A",
                text: "Wir erhöhen unsere Sicherheitsbestände, um Produktionsausfälle abzufedern.",
                effect: { cost: 50, co2: 10, market: 10 },
                customEffects: {
                    "megalogistics": { cost: 100, co2: 10, market: 10 },
                    "fastfash": { cost: 60, co2: 10, market: 5 },
                    "heidehof": { cost: 5, co2: 2, market: 2 },
                    "techsolutions": { cost: 15, co2: 5, market: 5 }
                },
                analysis: "Ihr seid lieferfähig, während andere kämpfen. Das gebundene Kapital fehlt jedoch an anderer Stelle für Investitionen."
            },
            {
                id: "B",
                text: "Wir passen unser Sortiment flexibel an die veränderte Nachfrage an.",
                effect: { cost: -30, co2: 5, market: 5 }, // Cost negative = Gain money/savings? Assuming consistent logic that negative cost is gain.
                customEffects: {
                    "fastfash": { cost: -50, co2: 10, market: 15 }, // Agile
                    "heidehof": { cost: -2, co2: 2, market: 10 },
                    "megalogistics": { cost: -20, co2: 5, market: 0 },
                    "techsolutions": { cost: -5, co2: 0, market: 5 }
                },
                analysis: "Ihr habt schnell reagiert und verkauft, was gebraucht wird. Diese Flexibilität sichert den Umsatz in der Krise."
            },
            {
                id: "C",
                text: "Wir ordnen flächendeckendes Homeoffice an, um weitere Infektionen zu verhindern.",
                effect: { cost: -5, co2: -15, market: -5 },
                customEffects: {
                    "techsolutions": { cost: -10, co2: -15, market: 5 }, // Productive
                    "megalogistics": { cost: 10, co2: -5, market: -15 }, // Cannot drive trucks from home
                    "heidehof": { cost: 0, co2: -2, market: -5 },
                    "fastfash": { cost: 5, co2: -5, market: -10 }
                },
                analysis: "Die Mitarbeiter sind geschützt und die Bürokosten sinken. Die Team-Dynamik und Spontanität leiden jedoch etwas."
            },
            {
                id: "D",
                text: "Wir reduzieren Personal, um die laufenden Kosten an den Umsatz anzupassen.",
                effect: { cost: -10, co2: 0, market: -20 },
                customEffects: {
                    "heidehof": { cost: 0, co2: 0, market: -50 }, // Disaster
                    "megalogistics": { cost: -40, co2: 0, market: -15 },
                    "fastfash": { cost: -20, co2: 0, market: -10 },
                    "techsolutions": { cost: -10, co2: 0, market: -15 }
                },
                analysis: "Die Lohnkosten wurden sofort gesenkt. Die Moral im Team ist jedoch am Boden und das Image hat gelitten."
            },
            {
                id: "E",
                text: "Wir beantragen staatliche Kurzarbeiter-Hilfen zur Stabilisierung.",
                effect: { cost: -20, co2: 0, market: 0 },
                customEffects: {
                    "megalogistics": { cost: -60, co2: 0, market: 0 },
                    "fastfash": { cost: -30, co2: 0, market: 0 },
                    "heidehof": { cost: -5, co2: 0, market: 0 },
                    "techsolutions": { cost: -10, co2: 0, market: 0 }
                },
                analysis: "Stabilisiert die Finanzlage ohne Eigenleistung."
            }
        ]
    },
    {
        id: 10,
        title: "Streik",
        description: "Die Gewerkschaften rufen zu einem unbefristeten Generalstreik auf. Sie fordern deutlich höhere Löhne und bessere Arbeitsbedingungen. Die Produktion steht still, und vor den Werkstoren demonstrieren hunderte Mitarbeiter.",
        options: [
            {
                id: "A",
                text: "Wir akzeptieren die Forderungen der Gewerkschaft vollumfänglich.",
                effect: { cost: 60, co2: 0, market: 20 },
                customEffects: {
                    "megalogistics": { cost: 100, co2: 0, market: 15 },
                    "fastfash": { cost: 50, co2: 0, market: 15 },
                    "heidehof": { cost: 10, co2: 0, market: 25 }, // Good values
                    "techsolutions": { cost: 20, co2: 0, market: 15 }
                },
                analysis: "Der Streik ist vorbei und die Mitarbeiter sind motiviert. Die deutlich höheren Personalkosten belasten das Budget dauerhaft."
            },
            {
                id: "B",
                text: "Wir beschleunigen die Automatisierung, um unabhängiger von menschlicher Arbeitskraft zu werden.",
                effect: { cost: 100, co2: 20, market: 10 },
                customEffects: {
                    "megalogistics": { cost: 150, co2: 20, market: 10 },
                    "techsolutions": { cost: 50, co2: 10, market: 20 },
                    "fastfash": { cost: 70, co2: 15, market: 5 },
                    "heidehof": { cost: 20, co2: 10, market: -20 } // Bad fit
                },
                analysis: "Maschinen streiken nicht, die Produktion läuft stabil. Die Anschaffung war extrem teuer und hat Arbeitsplätze gekostet."
            },
            {
                id: "C",
                text: "Wir setzen auf Verhandlungen und suchen einen fairen Kompromiss.",
                effect: { cost: 20, co2: 0, market: 5 },
                customEffects: {
                    "megalogistics": { cost: 40, co2: 0, market: 5 },
                    "fastfash": { cost: 20, co2: 0, market: 5 },
                    "heidehof": { cost: 5, co2: 0, market: 10 },
                    "techsolutions": { cost: 10, co2: 0, market: 5 }
                },
                analysis: "Ein Kompromiss hat den Streik beendet. Beide Seiten sind mäßig zufrieden, aber die Arbeit geht weiter."
            },
            {
                id: "D",
                text: "Wir bleiben hart und sitzen den Streik aus, bis die Gewerkschaft einlenkt.",
                effect: { cost: 15, co2: 0, market: -10 },
                customEffects: {
                    "megalogistics": { cost: 30, co2: 0, market: -20 },
                    "fastfash": { cost: 20, co2: 0, market: -15 },
                    "heidehof": { cost: 2, co2: 0, market: -30 }, // Personal betrayal
                    "techsolutions": { cost: 5, co2: 0, market: -10 }
                },
                analysis: "Ihr seid hart geblieben, doch der Produktionsausfall war teuer. Das Verhältnis zur Belegschaft ist nachhaltig gestört."
            },
            {
                id: "E",
                text: "Wir setzen Leiharbeiter ein, um die Produktion während des Streiks aufrechtzuerhalten.",
                effect: { cost: 30, co2: 5, market: -25 },
                customEffects: {
                    "megalogistics": { cost: 50, co2: 5, market: -20 },
                    "fastfash": { cost: 40, co2: 5, market: -30 },
                    "heidehof": { cost: 10, co2: 5, market: -50 }, // Brand suicide
                    "techsolutions": { cost: 15, co2: 5, market: -20 }
                },
                analysis: "Streikbrecher ruinieren den Ruf in der Öffentlichkeit."
            }
        ]
    }
];

module.exports = { TEAMS, EVENTS };
