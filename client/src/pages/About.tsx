import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import StructuredData, { createPersonSchema } from '@/components/StructuredData';

/* ─── Tokens de design ─────────────────────────────────────────────────────── */
const CREAM = '#EFE8E8';
const WHITE = '#FFFFFF';
const DARK = '#1A1A1A';
const GREY = '#6b7280';
const PURPLE = '#523DCB';
const GRAD = 'linear-gradient(90deg, #6B1817 0%, #7B1D3A 35%, #523DCB 100%)';

export default function About() {
  const personSchema = createPersonSchema({
    name: 'Clément Roy',
    jobTitle: 'Président du Groupe Nukleo',
    image: 'https://groupenukleo.com/team/Clement-about.png',
    url: 'https://www.linkedin.com/in/clement-roy/',
    sameAs: ['https://www.linkedin.com/in/clement-roy/'],
    worksFor: { name: 'Groupe Nukleo', url: 'https://groupenukleo.com' },
  });

  return (
    <PageLayout>
      <SEO
        title="Le Groupe Nukleo — Transformation numérique à portée de main"
        description="Nukleo et Rouge on Blue, deux forces réunies pour accompagner votre évolution numérique. Stratégie, technologie et créativité au service de votre croissance."
        keywords="Groupe Nukleo, Rouge on Blue, transformation numérique, agence IA, Montréal, Halifax"
      />
      <StructuredData data={personSchema} />

      <div style={{ background: CREAM, color: DARK }}>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
            Maquette: fond beige, titre dégradé gauche, tagline droite, photo équipe pleine largeur
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: CREAM,
          paddingTop: 'clamp(7rem, 14vh, 10rem)',
          paddingLeft: '3%',
          paddingRight: '3%',
          paddingBottom: 0,
        }}>
          {/* Titre + tagline */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
          }}>
            {/* Titre dégradé */}
            <h1 style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: 0,
              flexShrink: 0,
              background: GRAD,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}>
              <span style={{ display: 'block', fontWeight: 600, fontSize: '0.42em', letterSpacing: '-0.02em' }}>Le Groupe</span>
              Nukleo
            </h1>

            {/* Tagline droite */}
            <p style={{
              fontFamily: "'Neue Haas Unica Pro', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(0.85rem, 1.15vw, 1rem)',
              lineHeight: 1.6,
              color: DARK,
              margin: 0,
              maxWidth: '38ch',
              textAlign: 'right',
              paddingBottom: '0.5rem',
            }}>
              Partenaire de votre évolution numérique, Nukleo intègre l'innovation au cœur de vos supports pour anticiper le futur.
            </p>
          </div>

          {/* Photo équipe pleine largeur — fond dégradé bordeaux→violet intégré à la photo */}
          <div style={{
            width: '100%',
            borderRadius: '1.5rem 1.5rem 0 0',
            overflow: 'hidden',
            background: 'linear-gradient(to right, #8B1538, #523DCB)',
            aspectRatio: '16/7',
            position: 'relative',
          }}>
            <img
              src="/about-team.jpg"
              alt="L'équipe du Groupe Nukleo"
              loading="eager"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                display: 'block',
              }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2 — QUI SOMMES-NOUS
            Maquette: fond blanc, label violet centré, grand titre dégradé centré,
            2 colonnes (photo gauche / texte droite), 2 cartes logos en bas
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: WHITE,
          padding: 'clamp(5rem, 10vh, 8rem) 3%',
        }}>
          {/* Label */}
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 600,
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: PURPLE,
            textAlign: 'center',
            margin: '0 0 1.25rem 0',
          }}>
            Qui sommes-nous
          </p>

          {/* Grand titre centré dégradé */}
          <h2 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            margin: '0 auto clamp(4rem, 8vh, 6rem)',
            maxWidth: '18ch',
            background: GRAD,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
          }}>
            Rouge on Blue & Nukleo, c'est la transformation numérique à portée de main.
          </h2>

          {/* 2 colonnes : photo gauche / texte droite */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center',
            marginBottom: 'clamp(4rem, 8vh, 6rem)',
          }}>
            {/* Photo ambiance */}
            <div style={{
              borderRadius: '1.25rem',
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: '#e5e5e5',
            }}>
              <img
                src="/demo/dept-agency.jpg"
                alt="Équipe Groupe Nukleo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </div>

            {/* Texte */}
            <div>
              <p style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 600,
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: GREY,
                margin: '0 0 0.6rem 0',
              }}>
                L'union de deux forces
              </p>
              <h3 style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                lineHeight: 1.2,
                color: DARK,
                margin: '0 0 1.25rem 0',
                letterSpacing: '-0.02em',
              }}>
                La naissance du Groupe Nukleo
              </h3>
              <p style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
                lineHeight: 1.75,
                color: '#4b5563',
                margin: '0 0 1rem 0',
              }}>
                Le Groupe Nukleo est né de l'alliance stratégique entre les expertises de Nukleo et de l'agence Rouge On Blue. Ensemble, à Montréal et à Halifax, nous bâtissons un pôle stratégique d'envergure, capable d'innover et de vous propulser vers l'avant.
              </p>
              <p style={{
                fontFamily: "'Neue Haas Unica Pro', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.875rem, 1.05vw, 0.95rem)',
                lineHeight: 1.75,
                color: '#4b5563',
                margin: '0 0 2rem 0',
              }}>
                En fusionnant stratégie, création et technologies de pointe, nous couvrons l'ensemble du numérique pour offrir des solutions complètes, efficaces et durables à chacun de nos clients.
              </p>
              <a
                href="#"
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: DARK,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  borderBottom: `1px solid ${DARK}`,
                  paddingBottom: '0.1rem',
                }}
              >
                En savoir plus sur l'histoire du Groupe Nukleo &gt;
              </a>
            </div>
          </div>

          {/* 2 cartes entités */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1rem, 2.5vw, 2rem)',
          }}>
            {/* Carte Nukleo */}
            <div style={{
              background: WHITE,
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '1rem',
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1.75rem',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            }}>
              <img
                src="/NukleoLogo-black.png"
                alt="nukleo."
                style={{
                  height: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <a
                href="https://nukleo.ca"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: DARK,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  borderBottom: `1px solid ${DARK}`,
                  paddingBottom: '0.1rem',
                }}
              >
                Visiter le site &gt;
              </a>
            </div>

            {/* Carte Rouge On Blue */}
            <div style={{
              background: WHITE,
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '1rem',
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '1.75rem',
              boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            }}>
              <img
                src="/RobLogo-black.png"
                alt="Rouge On Blue"
                style={{
                  height: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <a
                href="https://rougeonblue.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: DARK,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  borderBottom: `1px solid ${DARK}`,
                  paddingBottom: '0.1rem',
                }}
              >
                Visiter le site &gt;
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 3 — DIRIGEANTS
            Maquette: fond beige, texte intro (1ère phrase dégradé), 2 cartes dirigeants
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: CREAM,
          padding: 'clamp(5rem, 10vh, 8rem) 3%',
        }}>
          {/* Texte intro */}
          <p style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            lineHeight: 1.55,
            color: DARK,
            maxWidth: '55ch',
            margin: '0 0 clamp(3rem, 6vh, 5rem) 0',
          }}>
            <span style={{
              background: GRAD,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}>
              Une vision partagée, une direction complémentaire.
            </span>
            {' '}Le Groupe Nukleo est porté par une synergie de leaders passionnés, alliant vision technologique et profondeur stratégique.
          </p>

          {/* 2 cartes dirigeants */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {/* Clément Roy */}
            <div style={{
              background: WHITE,
              borderRadius: '1rem',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              display: 'flex',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              alignItems: 'flex-start',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 'clamp(80px, 10vw, 110px)',
                height: 'clamp(80px, 10vw, 110px)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Clement-about.png"
                  alt="Clément Roy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: DARK,
                  margin: '0 0 0.2rem 0',
                }}>
                  Clément Roy
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: GREY,
                  margin: '0 0 0.85rem 0',
                }}>
                  Président du Groupe Nukleo
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.78rem, 0.95vw, 0.875rem)',
                  lineHeight: 1.65,
                  color: '#4b5563',
                  margin: 0,
                }}>
                  Notre philosophie repose sur une combinaison d'expertise et de talent. En tant que groupe organisé et soutenu, nous offrons des solutions adaptées aux besoins spécifiques de chaque client. Nous sommes l'architecte de votre transformation numérique et nous construirons un avenir pour anticiper l'impact et conduire les entreprises vers le succès.
                </p>
              </div>
            </div>

            {/* Lionel Pardin */}
            <div style={{
              background: WHITE,
              borderRadius: '1rem',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              display: 'flex',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              alignItems: 'flex-start',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                flexShrink: 0,
                width: 'clamp(80px, 10vw, 110px)',
                height: 'clamp(80px, 10vw, 110px)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                background: '#e5e5e5',
              }}>
                <img
                  src="/team/Lionel-about.png"
                  alt="Lionel Pardin"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: DARK,
                  margin: '0 0 0.2rem 0',
                }}>
                  Lionel Pardin
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: GREY,
                  margin: '0 0 0.85rem 0',
                }}>
                  Associé — Stratégie
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.78rem, 0.95vw, 0.875rem)',
                  lineHeight: 1.65,
                  color: '#4b5563',
                  margin: 0,
                }}>
                  Innovateur numérique, Lionel Pardin est à l'avant-garde de l'innovation et de l'intégration de l'intelligence artificielle au sein du Groupe Nukleo. Il accompagne les entreprises dans leur transformation numérique en mettant en œuvre des stratégies efficaces et innovantes, pour les aider à anticiper les défis de demain et à atteindre leurs objectifs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 4 — 2 VILLES
            Maquette: fond blanc, titre centré violet, 2 cartes avec carte + adresse + icône pin
        ══════════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: WHITE,
          padding: 'clamp(4rem, 8vh, 6rem) 3% clamp(6rem, 12vh, 9rem)',
        }}>
          {/* Titre centré */}
          <h2 style={{
            fontFamily: "'Neue Haas Unica Pro', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            color: PURPLE,
            margin: '0 auto clamp(3rem, 6vh, 5rem)',
          }}>
            2 villes pour être plus proche de vous.
          </h2>

          {/* 2 cartes bureaux */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1rem, 2.5vw, 2rem)',
          }}>
            {/* Montréal */}
            <div style={{
              background: '#F8F8F8',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            }}>
              <iframe
                title="Bureau Montréal"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.6260%2C45.5230%2C-73.5960%2C45.5380&layer=mapnik&marker=45.5305%2C-73.6110"
                style={{
                  width: '100%',
                  height: 'clamp(160px, 20vw, 240px)',
                  border: 'none',
                  display: 'block',
                  filter: 'grayscale(40%) contrast(0.9)',
                }}
                loading="lazy"
              />
              <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: GREY,
                  margin: '0 0 0.5rem 0',
                }}>
                  Montréal
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  lineHeight: 1.6,
                  color: DARK,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                }}>
                  <span style={{ color: GREY, flexShrink: 0, marginTop: '0.1rem' }}>📍</span>
                  7236 Rue Waverly, Montréal, QC H2R 0C2
                </p>
              </div>
            </div>

            {/* Halifax */}
            <div style={{
              background: '#F8F8F8',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            }}>
              <iframe
                title="Bureau Halifax"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-63.5850%2C44.6430%2C-63.5550%2C44.6580&layer=mapnik&marker=44.6505%2C-63.5700"
                style={{
                  width: '100%',
                  height: 'clamp(160px, 20vw, 240px)',
                  border: 'none',
                  display: 'block',
                  filter: 'grayscale(40%) contrast(0.9)',
                }}
                loading="lazy"
              />
              <div style={{ padding: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: GREY,
                  margin: '0 0 0.5rem 0',
                }}>
                  Halifax
                </p>
                <p style={{
                  fontFamily: "'Neue Haas Unica Pro', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  lineHeight: 1.6,
                  color: DARK,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                }}>
                  <span style={{ color: GREY, flexShrink: 0, marginTop: '0.1rem' }}>📍</span>
                  1800 Argyle St Unit 801, Halifax, NS B3J 3N8
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
