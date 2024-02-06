import { XMLParser } from "fast-xml-parser";
import { validateWorkzag } from "~/utils/lib";

const FETCH_INTERVAL_MS = 30000;

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<workzag-jobs>


  <position>
    <id>1302648</id>
    <subcompany>mrge</subcompany>
    <office>Berlin</office>
    <additionalOffices>
      <office>Hamburg</office>
    </additionalOffices>
    <department>Operations</department>
    <recruitingCategory>Festangestellte</recruitingCategory>

    <name>Head of Yield Optimization (m/f/d)</name>

    <jobDescriptions>
    </jobDescriptions>

    <employmentType>permanent</employmentType>

    <seniority>executive</seniority>

    <schedule>full-time</schedule>

    <yearsOfExperience>5-7</yearsOfExperience>


    <occupation>general_and_other_business_and_strategic_management</occupation>

    <occupationCategory>business_and_strategic_development</occupationCategory>

    <createdAt>2023-10-24T17:39:04+00:00</createdAt>

  </position>



  <position>
    <id>1238019</id>
    <subcompany>mrge</subcompany>
    <office>Berlin / Hamburg</office>
    <department>Advertiser Sales &amp; Success</department>
    <recruitingCategory>Festangestellte</recruitingCategory>

    <name>Senior Customer Success Manager (m/w/d)</name>

    <jobDescriptions>
      <jobDescription>
        <name>Auf der Suche nach einer spannenden Herausforderung? </name>
        <value>
          <![CDATA[
                                Begleite uns auf unserer Mission, ein globaler Champion im Bereich Commerce Advertising und Performance Marketing zu werden.<br> <br>Unterstützt von unserem Investor Waterland Private Equity, bilden unsere vier Unternehmen digidip, shopping24, Sourceknowledge und Yieldkit mrge. <br>Gemeinsam bauen wir Technologieplattformen auf, die alle das Ziel verfolgen, Werbetreibende und Publisher auf eine für beide Seiten vorteilhafte Weise miteinander zu verbinden.<br><br>Wir sind ein internationales, mehrsprachiges Team mit flachen Hierarchien. Unsere Teams arbeiten mit einem hohen Maß an Selbstständigkeit, sowohl in den Büros in Hamburg und Berlin als auch von unterwegs aus.<br> <br>Unsere Kultur ist geprägt von Vertrauen, Freundlichkeit und Kollegialität und fördert eine positive Arbeitsatmosphäre.<br>Die Zusammenarbeit mit uns ist einfach und macht Spaß - frag einfach unsere Kunden, denen wir auf unkomplizierte und zuverlässige Weise helfen, ihre Ziele zu erreichen. <br>In enger Zusammenarbeit mit unseren Partnern sorgen wir für Werbeformate, die echte Relevanz für unsere Nutzer bieten und so zu mehr Umsatz führen.<br><br>Wir würden uns freuen, wenn du bei mrge mitmachen als Senior Customer Success Manager!
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Deine Aufgaben: </name>
        <value>
          <![CDATA[
                                Als Senior Customer Success Manager beim shopping24 commerce network übernimmst Du eine strategische Rolle bei der Entwicklung und Pflege unserer Advertiser. Du arbeitest eng mit bestehenden und potenziellen Partnern zusammen, um die Marketingziele zu verstehen und maßgeschneiderte Lösungen anzubieten. Deine Aufgaben umfassen:<ul><li>Partnerschaftsentwicklung: Identifikation, Akquisition und Betreuung neuer Geschäftspartner, einschließlich E-Commerce-Unternehmen, Brands und Retailer.</li><li>Strategische Beratung: Verstehen der Geschäftsanforderungen der Partner und Beratung hinsichtlich der bestmöglichen Integration in unser commerce network Entwicklung von individuellen Strategien zur Steigerung der Sichtbarkeit und des Umsatzes unserer Partner.</li><li>Beziehungsaufbau mit Shops und passenden Publishern: Aufbau und Pflege langfristiger Partnerschaften. Regelmäßiger Austausch, Beziehungspflege und proaktive Kommunikation, um Partnerschaften zu stärken.</li><li>KPI Management: Analyse der Leistung von Partnerschaften. Identifikation von Chancen zur Optimierung von Programmen und zur Erreichung der definierten Ziele.</li><li>Verhandlungsführung: Verhandlungen von Partnerschaftsverträgen, Konditionen und Vereinbarungen. Sicherstellen einer Win-Win-Situation für unsere Partner und uns.</li><li>Teamübergreifende Zusammenarbeit: Zusammenarbeit mit internen Teams wie Sales, Marketing und Technologie, um sicherzustellen, dass Partneranforderungen erfüllt und optimale Lösungen angeboten werden.</li><li>Projektmanagement: Entwicklung neuer potentieller Geschäftsbereiche in Zusammenarbeit mit den Tech-Teams.</li><li>Marktbeobachtung: Kontinuierliche Beobachtung der E-Commerce- und digitalen Marketingbranche, um Trends und Entwicklungen zu identifizieren, die für die Partnerschaftsstrategie relevant sein könnten.</li></ul>
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Dein Profil</name>
        <value>
          <![CDATA[
                                <ul><li>Du besitzt eine hohe Affinität zum E-Commerce und bist mit gängigen Kennzahlen wie CPC, CPO, CR und KUR vertraut</li><li>Du hast Erfahrung im (Online-) B2B-Vertrieb und ein hohes Verkaufs- und Verhandlungsgeschick</li><li>Du hast ein starkes analytisches und technisches Verständnis von online Marketing sowie Spaß an neuen Technologien</li><li>Du hast ein sehr gutes Zeitmanagement, ausgeprägte Organisationsfähigkeiten sowie ein hohes Maß an Eigeninitiative.</li><li>Du hast Spaß am Umgang mit Kunden und starke Kommunikationsfähigkeiten auf Deutsch und Englisch</li><li>Du kennst dich optimalerweise mit Salesforce und Tableau aus</li></ul>
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Warum wir?</name>
        <value>
          <![CDATA[
                                <ul><li>Gestalte einen innovativen, wachstumsorientierten internationalen Konzern von Anfang an aktiv mit und nutz die Chance, unersetzlich zu werden!</li><li>Übernimm Verantwortung und werde ein wichtiger Teil eines jungen, ehrgeizigen und sympathischen Teams, das sich gemeinsam weiterentwickeln will</li><li>Genieß die Möglichkeit, selbständig und mit flexiblen Arbeitszeiten zu arbeiten </li><li>Genieß erstklassige Sozialleistungen: 30 bezahlte Urlaubstage, modernste Technik, individueller Entwicklungsplan, Prepaid-Spenditkarte (50€ monatliches Budget) und vieles mehr</li><li>Bring deine Fähigkeiten, Talente und deine Karriere auf die nächste Stufe, während du mit uns wachst</li></ul><br><br>Haben wir dich überzeugt? Dann können wir es kaum erwarten, deine Bewerbung zu lesen!<br> <br>Alle unsere Mitarbeiter haben bei mrge gleiche Karrierechancen, unabhängig von Geschlecht, Herkunft, ethnischer Zugehörigkeit, Religion, sexueller Orientierung, Alter oder anderen persönlichen Eigenschaften.
]]>
        </value>
      </jobDescription>
    </jobDescriptions>

    <employmentType>permanent</employmentType>

    <seniority>experienced</seniority>

    <schedule>full-time</schedule>

    <yearsOfExperience>5-7</yearsOfExperience>


    <occupation>business_development_and_new_accounts</occupation>

    <occupationCategory>sales_and_business_development</occupationCategory>

    <createdAt>2023-08-31T14:18:37+00:00</createdAt>

  </position>
  <script id="bw-fido2-page-script"/>



  <position>
    <id>1229982</id>
    <subcompany>mrge</subcompany>
    <office>Berlin / Hamburg</office>
    <department>Advertiser Sales &amp; Success</department>
    <recruitingCategory>Festangestellte</recruitingCategory>

    <name>Senior Strategic Partnership Manager (m/w/d)</name>

    <jobDescriptions>
      <jobDescription>
        <name>Auf der Suche nach einer spannenden Herausforderung? </name>
        <value>
          <![CDATA[
                                Begleite uns auf unserer Mission, ein globaler Champion im Bereich Commerce Advertising und Performance Marketing zu werden.<br> <br>Unterstützt von unserem Investor Waterland Private Equity, bilden unsere vier Unternehmen digidip, shopping24, Sourceknowledge und Yieldkit mrge. <br>Gemeinsam bauen wir Technologieplattformen auf, die alle das Ziel verfolgen, Werbetreibende und Publisher auf eine für beide Seiten vorteilhafte Weise miteinander zu verbinden.<br><br>Wir sind ein internationales, mehrsprachiges Team mit flachen Hierarchien. Unsere Teams arbeiten mit einem hohen Maß an Selbstständigkeit, sowohl in den Büros in Hamburg und Berlin als auch von unterwegs aus.<br> <br>Unsere Kultur ist geprägt von Vertrauen, Freundlichkeit und Kollegialität und fördert eine positive Arbeitsatmosphäre.<br>Die Zusammenarbeit mit uns ist einfach und macht Spaß - frag einfach unsere Kunden, denen wir auf unkomplizierte und zuverlässige Weise helfen, ihre Ziele zu erreichen. <br>In enger Zusammenarbeit mit unseren Partnern sorgen wir für Werbeformate, die echte Relevanz für unsere Nutzer bieten und so zu mehr Umsatz führen.<br>​<br>Wir würden uns freuen, wenn du bei mrge mitmachen als Senior Partnership Manager!
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Deine Aufgaben: </name>
        <value>
          <![CDATA[
                                Als Senior Strategic Partnership Manager beim shopping24 commerce network übernimmst Du eine strategische Rolle bei der Entwicklung und Pflege <b>unserer kommerziellen Aktivitäten mit Advertisern und Publishern</b>. Du arbeitest eng mit bestehenden und potenziellen Partnern zusammen, um die Marketingziele zu verstehen und maßgeschneiderte Lösungen anzubieten. Deine Aufgaben umfassen:<ul><li>Partnerschaftsentwicklung: Identifikation, Akquisition und Betreuung neuer Geschäftspartner, einschließlich E-Commerce-Unternehmen, Brands und Retailer <strong>bzw. Publisher</strong>.</li><li>Strategische Beratung: Verstehen der Geschäftsanforderungen der Partner und Beratung hinsichtlich der bestmöglichen Integration in unser commerce network Entwicklung von individuellen Strategien zur Steigerung der Sichtbarkeit und des Umsatzes unserer Partner.</li><li>Beziehungsaufbau mit Shops und passenden Publishern: Aufbau und Pflege langfristiger Partnerschaften. Regelmäßiger Austausch, Beziehungspflege und proaktive Kommunikation, um Partnerschaften zu stärken.</li><li>KPI Management: Analyse der Leistung von Partnerschaften. Identifikation von Chancen zur Optimierung von Programmen und zur Erreichung der definierten Ziele.</li><li>Verhandlungsführung: Verhandlungen von Partnerschaftsverträgen, Konditionen und Vereinbarungen. Sicherstellen einer Win-Win-Situation für unsere Partner und uns.</li><li>Teamübergreifende Zusammenarbeit: Zusammenarbeit mit internen Teams wie Sales, Marketing und Technologie, um sicherzustellen, dass Partneranforderungen erfüllt und optimale Lösungen angeboten werden.</li><li>Projektmanagement: Entwicklung neuer potentieller Geschäftsbereiche in Zusammenarbeit mit den Tech-Teams.</li><li>Marktbeobachtung: Kontinuierliche Beobachtung der E-Commerce- und digitalen Marketingbranche, um Trends und Entwicklungen zu identifizieren, die für die Partnerschaftsstrategie relevant sein könnten.</li></ul>
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Dein Profil</name>
        <value>
          <![CDATA[
                                <ul><li>Du besitzt eine hohe Affinität zum E-Commerce und bist mit gängigen Kennzahlen wie CPC, CPO, CR und KUR vertraut</li><li>Du hast Erfahrung im (Online-) B2B-Vertrieb und ein hohes Verkaufs- und Verhandlungsgeschick</li><li>Du hast ein starkes analytisches und technisches Verständnis von online Marketing sowie Spaß an neuen Technologien</li><li>Du hast ein sehr gutes Zeitmanagement, ausgeprägte Organisationsfähigkeiten sowie ein hohes Maß an Eigeninitiative.</li><li>Du hast Spaß am Umgang mit Kunden und starke Kommunikationsfähigkeiten auf Deutsch und Englisch</li><li>Du kennst dich optimalerweise mit Salesforce und Tableau aus</li></ul>
]]>
        </value>
      </jobDescription>
      <jobDescription>
        <name>Warum wir?</name>
        <value>
          <![CDATA[
                                <ul><li>Gestalte einen innovativen, wachstumsorientierten internationalen Konzern von Anfang an aktiv mit und nutz die Chance, unersetzlich zu werden!</li><li>Übernimm Verantwortung und werde ein wichtiger Teil eines jungen, ehrgeizigen und sympathischen Teams, das sich gemeinsam weiterentwickeln will</li><li>Genieß die Möglichkeit, selbständig und mit flexiblen Arbeitszeiten zu arbeiten </li><li>Genieß erstklassige Sozialleistungen: 30 bezahlte Urlaubstage, modernste Technik, individueller Entwicklungsplan, Prepaid-Spenditkarte (50€ monatliches Budget) und vieles mehr</li><li>Bring deine Fähigkeiten, Talente und deine Karriere auf die nächste Stufe, während du mit uns wachst</li></ul><br>Haben wir dich überzeugt? Dann können wir es kaum erwarten, deine Bewerbung zu lesen!<br> <br><em>Alle unsere Mitarbeiter haben bei mrge gleiche Karrierechancen, unabhängig von Geschlecht, Herkunft, ethnischer Zugehörigkeit, Religion, sexueller Orientierung, Alter oder anderen persönlichen Eigenschaften.</em><br><em>Die Bewerber werden auf der Grundlage ihrer Fähigkeiten, ihrer Qualifikation und der Anforderungen des Unternehmens gleichermaßen berücksichtigt und ausgewählt.</em><br><em>Wir wissen, dass Erfahrung und Fähigkeiten eine Frage der Entwicklung und des Gewinns während der Arbeit sind. Daher ermutigen wir dich, sich zu bewerben, auch wenn dein Profil nicht zu 100 % den Anforderungen für diese Stelle entspricht.</em>
]]>
        </value>
      </jobDescription>
    </jobDescriptions>

    <employmentType>permanent</employmentType>

    <seniority>experienced</seniority>

    <schedule>full-time</schedule>

    <yearsOfExperience>5-7</yearsOfExperience>


    <occupation>business_development_and_new_accounts</occupation>

    <occupationCategory>sales_and_business_development</occupationCategory>

    <createdAt>2023-08-24T11:54:25+00:00</createdAt>

  </position>



  <position>
    <id>1300075</id>
    <subcompany>mrge</subcompany>
    <office>Berlin</office>
    <additionalOffices>
      <office>Hamburg</office>
    </additionalOffices>
    <department>Operations</department>
    <recruitingCategory>Festangestellte</recruitingCategory>

    <name>Teamlead Technical Sales Engineer (m/f/d)</name>

    <jobDescriptions>
    </jobDescriptions>

    <employmentType>permanent</employmentType>

    <seniority>experienced</seniority>

    <schedule>full-time</schedule>

    <yearsOfExperience>5-7</yearsOfExperience>


    <occupation>technical_presales_support__technical_sales</occupation>

    <occupationCategory>sales_and_business_development</occupationCategory>

    <createdAt>2023-10-23T10:15:35+00:00</createdAt>

  </position>



</workzag-jobs>
`;

export default defineNitroPlugin((nitroApp) => {
  console.log("Job watcher plugin added");
  const interval = setInterval(() => {
    console.log("Job watcher fetching...");
    const XMLdata = xml;
    const parser = new XMLParser();
    let json = parser.parse(XMLdata);
    const positions = json["workzag-jobs"]["position"];

    const validPositions = positions
      .map((position: any) => {
        try {
          const p = validateWorkzag(position);

          if (!p.success) {
            console.error("Error validating Workzag data: ", p.error);
            return null;
          }
          return p;
        } catch (err: any) {
          console.error("Error validating Workzag data: ", err.error);
        }
      })
      .filter((p: any) => p);

    console.log("Found valid jobs: ", validPositions.length);
  }, FETCH_INTERVAL_MS);

  nitroApp.hooks.hook("close", async () => {
    clearTimeout(interval);
    console.log("Job watcher plugin removed");
  });
});
