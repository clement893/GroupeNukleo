import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';
import { useLanguage } from '@/contexts/LanguageContext';

const GRAD = 'linear-gradient(to right, #6B1817, #523DCB)';
const OFF_WHITE = '#EFE8E8';
const PURPLE = '#523DCB';
const DARK = '#21242E';
const GREY = '#6b7280';

const leaders = [
  {
    name: 'Clément Roy',
    title: 'Président du Groupe Nukleo',
    image: '/team/Clement.webp',
    linkedin: 'https://www.linkedin.com/in/clement-roy/',
    bio: "Clément pilote la vision et la stratégie du Groupe Nukleo. Passionné par la transformation numérique des PME et des OBNL, il s'assure que chaque client bénéficie d'un partenaire à l'écoute, exigeant et orienté résultats.",
  },
  {
    name: 'Lionel Pardin',
    title: 'Associé — Stratégie',
    image: '/team/Lionel.png',
    linkedin: 'https://www.linkedin.com/in/lionelpardin/',
    bio: "Lionel apporte une profondeur stratégique et une expertise sectorielle qui renforcent la capacité du Groupe Nukleo à accompagner ses clients dans leurs transformations les plus ambitieuses.",
  },
];

const entities = [
  {
    logo: '/NukleoLogo.png',
    name: 'nukleo.',
    url: 'https://nukleo.digital',
  },
  {
    logo: '/RobLogo.png',
    name: 'Rouge On Blue',
    url: 'https://rougeonblue.com',
  },
];

export default function About() {
  const { t } = useLanguage();

  const personSchema = createPersonSchema({
    name: 'Clément Roy',
    jobTitle: 'Président du Groupe Nukleo',
    image: 'https://nukleo.digital/team/Clement.webp',
    url: 'https://www.linkedin.com/in/clement-roy/',
    sameAs: ['https://www.linkedin.com/in/clement-roy/'],
    worksFor: { name: 'Groupe Nukleo', url: 'https://nukleo.digital' },
  });

  return (
    <PageLayout>
      <SEO
        title="Le Groupe Nukleo — Transformation numérique à portée de main"
        description="Nukleo et Rouge on Blue, deux forces réunies pour accompagner votre évolution numérique. Stratégie, technologie et créativité au service de votre croissance."
        keywords="Groupe Nukleo, Rouge on Blue, transformation numérique, agence IA, Montréal, Halifax"
      />
      <StructuredData data={personSchema} />

      <div style={{ minHeight: '100vh', background: OFF_WHITE, color: DARK }}>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1 — HERO
        ───────────────────────────────────────────────────────────── */}
        <section
          style={{
            padding: 'clamp(7rem, 14vh, 10rem) 3% 0',
            background: OFF_WHITE,
          }}
        >
          {/* Deux colonnes : titre gauche / accroche droite */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1.5rem, 4vw, 4rem)',
              alignItems: 'flex-end',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            {/* Titre */}
            <h1
              style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                margin: 0,
                background: GRAD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Le Groupe<br />Nukleo
            </h1>

            {/* Accroche */}
            <p
              style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                lineHeight: 1.6,
                color: GREY,
                margin: 0,
                paddingBottom: '0.5rem',
                maxWidth: 420,
              }}
            >
              Partenaire de votre évolution numérique, Nukleo intègre l'innovation au cœur de vos supports pour anticiper le futur.
            </p>
          </div>

          {/* Photo équipe pleine largeur */}
          <div
            style={{
              width: '100%',
              borderRadius: '1.5rem 1.5rem 0 0',
              overflow: 'hidden',
              position: 'relative',
              aspectRatio: '16/7',
            }}
          >
            <img
              src="/about-hero.png"
              alt="L'équipe du Groupe Nukleo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
            {/* Overlay dégradé bas pour transition */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to bottom, transparent, #FAFAF9)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2 — QUI SOMMES-NOUS
        ───────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: '#FAFAF9',
            padding: 'clamp(4rem, 8vh, 7rem) 3%',
          }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: PURPLE,
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            Qui sommes-nous
          </p>

          {/* Grand titre centré dégradé */}
          <h2
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              margin: '0 auto clamp(3rem, 6vh, 5rem)',
              maxWidth: '70%',
              background: GRAD,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Rouge on Blue &amp; Nukleo, c'est la transformation numérique à portée de main.
          </h2>

          {/* Deux colonnes : photo gauche / texte droite */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'center',
              marginBottom: 'clamp(3rem, 6vh, 5rem)',
            }}
          >
            {/* Photo ambiance */}
            <div
              style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                aspectRatio: '4/3',
              }}
            >
              <img
                src="/about-hero.png"
                alt="Équipe Groupe Nukleo en réunion"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  filter: 'grayscale(20%)',
                }}
              />
            </div>

            {/* Texte */}
            <div>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: GREY,
                  marginBottom: '0.75rem',
                }}
              >
                L'union de deux forces
              </p>
              <h3
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  lineHeight: 1.2,
                  color: DARK,
                  margin: '0 0 1.25rem 0',
                }}
              >
                La naissance du Groupe Nukleo
              </h3>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                  lineHeight: 1.75,
                  color: '#4b5563',
                  margin: '0 0 1rem 0',
                }}
              >
                Le Groupe Nukleo est né de l'alliance stratégique entre les expertises de Nukleo et de l'agence Rouge On Blue. Ensemble, à Montréal et à Halifax, nous bâtissons un pôle stratégique d'envergure, capable d'innover et de vous propulser vers l'avant.
              </p>
              <p
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                  lineHeight: 1.75,
                  color: '#4b5563',
                  margin: '0 0 2rem 0',
                }}
              >
                En fusionnant stratégie, création et technologies de pointe, nous couvrons l'ensemble du numérique pour offrir des solutions complètes, efficaces et durables à chacun de nos clients.
              </p>
              <a
                href="https://nukleo.digital"
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: PURPLE,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                En savoir plus →
              </a>
            </div>
          </div>

          {/* Cartes entités */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
            }}
          >
            {entities.map((e) => (
              <div
                key={e.name}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '1.25rem',
                  padding: 'clamp(2rem, 4vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                }}
              >
                <img
                  src={e.logo}
                  alt={e.name}
                  style={{
                    height: 'clamp(2rem, 4vw, 3rem)',
                    width: 'auto',
                    objectFit: 'contain',
                  }}
                />
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: PURPLE,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  Visiter le site →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3 — DIRIGEANTS
        ───────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: '#fff',
            padding: 'clamp(4rem, 8vh, 7rem) 3%',
          }}
        >
          {/* Texte intro */}
          <p
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
              lineHeight: 1.55,
              color: DARK,
              maxWidth: 700,
              marginBottom: 'clamp(3rem, 6vh, 5rem)',
            }}
          >
            <span
              style={{
                background: GRAD,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Une vision partagée, une direction complémentaire.
            </span>{' '}
            Le Groupe Nukleo est porté par une synergie de leaders passionnés, alliant vision technologique et profondeur stratégique.
          </p>

          {/* Cartes dirigeants */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1.5rem, 3vw, 3rem)',
            }}
          >
            {leaders.map((l) => (
              <div
                key={l.name}
                style={{
                  display: 'flex',
                  gap: 'clamp(1rem, 2vw, 1.75rem)',
                  alignItems: 'flex-start',
                  background: '#FAFAF9',
                  borderRadius: '1.25rem',
                  padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    width: 'clamp(64px, 8vw, 96px)',
                    height: 'clamp(64px, 8vw, 96px)',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={l.image}
                    alt={l.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Texte */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "'Neue Haas Unica Pro', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                      color: DARK,
                      margin: '0 0 0.2rem 0',
                    }}
                  >
                    {l.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Neue Haas Unica Pro', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: PURPLE,
                      margin: '0 0 0.85rem 0',
                    }}
                  >
                    {l.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Neue Haas Unica Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                      lineHeight: 1.65,
                      color: '#4b5563',
                      margin: 0,
                    }}
                  >
                    {l.bio}
                  </p>
                  <a
                    href={l.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '0.85rem',
                      fontFamily: "'Neue Haas Unica Pro', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      color: PURPLE,
                      textDecoration: 'none',
                    }}
                  >
                    LinkedIn →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4 — 2 VILLES
        ───────────────────────────────────────────────────────────── */}
        <section
          style={{
            background: '#fff',
            padding: 'clamp(3rem, 6vh, 5rem) 3% clamp(5rem, 10vh, 8rem)',
          }}
        >
          {/* Titre */}
          <h2
            style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              textAlign: 'center',
              color: DARK,
              margin: '0 auto clamp(2.5rem, 5vh, 4rem)',
            }}
          >
            2 villes pour être plus proche de vous.
          </h2>

          {/* Cartes bureaux */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
            }}
          >
            {/* Montréal */}
            <div
              style={{
                background: '#FAFAF9',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              {/* Carte géo via OpenStreetMap embed */}
              <iframe
                title="Bureau Montréal"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.6260%2C45.5230%2C-73.5960%2C45.5380&layer=mapnik&marker=45.5305%2C-73.6110"
                style={{
                  width: '100%',
                  height: 'clamp(160px, 22vw, 260px)',
                  border: 'none',
                  display: 'block',
                  filter: 'grayscale(30%)',
                }}
                loading="lazy"
              />
              <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <p
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: GREY,
                    margin: '0 0 0.4rem 0',
                  }}
                >
                  Montréal
                </p>
                <p
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                    lineHeight: 1.6,
                    color: DARK,
                    margin: 0,
                  }}
                >
                  7236 Rue Waverly<br />Montréal, QC H2R 0C2
                </p>
              </div>
            </div>

            {/* Halifax */}
            <div
              style={{
                background: '#FAFAF9',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              <iframe
                title="Bureau Halifax"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-63.5850%2C44.6430%2C-63.5550%2C44.6580&layer=mapnik&marker=44.6505%2C-63.5700"
                style={{
                  width: '100%',
                  height: 'clamp(160px, 22vw, 260px)',
                  border: 'none',
                  display: 'block',
                  filter: 'grayscale(30%)',
                }}
                loading="lazy"
              />
              <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <p
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: GREY,
                    margin: '0 0 0.4rem 0',
                  }}
                >
                  Halifax
                </p>
                <p
                  style={{
                    fontFamily: "'Neue Haas Unica Pro', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                    lineHeight: 1.6,
                    color: DARK,
                    margin: 0,
                  }}
                >
                  1800 Argyle St Unit 801<br />Halifax, NS B3J 3N8
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
