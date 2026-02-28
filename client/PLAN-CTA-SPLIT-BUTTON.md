# Plan : CTA unifiés (bouton divisé + flèche)

## Design cible

Tous les CTA principaux du site doivent reprendre le **bouton divisé avec flèche** :

- **Forme** : pilule (`borderRadius: 999`), une seule entité visuelle.
- **Partie gauche** : lien/bouton avec le **texte** (ex. « Contactez-nous », « Performez maintenant »).
- **Partie droite** : zone fixe avec **icône ArrowUpRight** uniquement (pas de texte).
- **Style** : même fond (ex. `#5B21B6`), même hauteur, `boxShadow` optionnel.
- **Comportement** : les deux parties pointent vers la **même URL** (ou la partie flèche peut être un `span` à l’intérieur d’un seul lien pour l’accessibilité).

**Référence d’implémentation** (déjà correcte) :  
`HomepageDemo5.tsx` — sections « SOYONS AUDACIEUX » (l.754–789) et « Prêt.e à performer ? » (l.974–1008).

```tsx
// Structure cible
<div style={{ display: 'inline-flex', alignItems: 'stretch', borderRadius: 999, overflow: 'hidden', boxShadow: '...' }}>
  <Link href="..." style={{ ... partie texte, borderTopLeftRadius: 999, borderBottomLeftRadius: 999 }}>
    {label}
  </Link>
  <Link href="..." style={{ ... partie flèche, width: 52, justifyContent: 'center', borderTopRightRadius: 999, borderBottomRightRadius: 999 }} aria-label="...">
    <ArrowUpRight size={20} strokeWidth={2.5} />
  </Link>
</div>
```

---

## Option recommandée : composant réutilisable

Créer un composant **`SplitCTAButton`** (ou `CTASplitButton`) dans `client/src/components/` :

- **Props** : `href`, `label`, `ariaLabel?`, `variant?: 'primary' | 'secondary'`, `className?`
- **Rendu** : un seul `<a>` ou wrapper sémantique contenant la pilule en deux zones (texte + flèche) pour garder un seul lien accessible.
- **Utilisation** : remplacer les CTA actuels par `<SplitCTAButton href={...} label="..." />` partout où le design cible s’applique.

Cela évite la duplication et garantit la cohérence (couleur, taille, ombre, focus).

---

## Inventaire des CTA à adapter

### 1. Déjà au bon format (bouton divisé + flèche)

| Fichier | Section / usage |
|--------|------------------|
| `pages/HomepageDemo5.tsx` | « SOYONS AUDACIEUX » — Performez maintenant (l.754–789) |
| `pages/HomepageDemo5.tsx` | « Prêt.e à performer ? » — Contactez-nous (l.974–1008) |

À conserver tels quels (ou migrer vers le composant si créé).

---

### 2. À modifier (passer en split + flèche)

| # | Fichier | Emplacement | CTA actuel | Action |
|---|---------|-------------|------------|--------|
| 1 | `components/ServiceDetailLayout.tsx` | CTA section (l.218–233) | Un seul lien avec texte + `ArrowUpRight` côte à côte | Remplacer par bouton divisé (texte \| flèche), même `ctaHref`. |
| 2 | `pages/About.tsx` | CTA « Prêt.e à performer ? » (l.239–257) | Un seul `<a>` avec texte + flèche en `gap` | Remplacer par structure split (texte \| flèche). |
| 3 | `pages/FAQ.tsx` | CTA « Vous avez d’autres questions ? » (l.293–315) | Un seul `<Link>` avec `<span>` arrondi (texte seulement) | Remplacer par split (texte \| flèche), lien vers `/contact`. |
| 4 | `components/Header.tsx` | Zone « Contactez-nous » + cercle flèche (l.118–136) | Deux liens séparés : bouton texte + cercle flèche | Fusionner en un seul CTA split (texte \| flèche) pointant vers `/contact` (ou garder start-project pour la flèche selon maquette). |
| 5 | `pages/Services.tsx` | CTA Section (l.398–429) | Deux boutons : primaire (texte + ArrowRight) et secondaire (texte seul) | Au moins le **primaire** en split (texte \| flèche). Secondaire peut rester simple ou avoir un style « outline » cohérent. |
| 6 | `components/CTASection.tsx` | Bouton principal (l.19–25) | `<Button>` arrondi, texte seul | Remplacer par split (texte \| flèche), lien vers `/start-project`. |
| 7 | `pages/Approche.tsx` | CTA « Prêt à travailler avec méthode ? » (l.223–239) | Bouton « Démarrer un projet » avec ArrowRight en gap | Remplacer par split (texte \| flèche). Optionnel : second CTA « Voir nos départements » peut rester simple. |

---

### 3. CTA secondaires ou contextuels (à traiter au cas par cas)

| Fichier | Contexte | Suggestion |
|---------|----------|------------|
| `components/ClientLogos.tsx` | Lien texte « Commencer votre projet » + flèche → | Soit lien texte simple, soit petit split si on veut homogénéiser. |
| `components/WhoWeServeSection.tsx` | Bottom CTA | Vérifier le rendu actuel ; si c’est un CTA principal, appliquer le split. |
| `components/TeamCarousel.tsx` | CTA dans le carousel | Idem : si CTA principal, split ; sinon garder ou adapter léger. |
| `components/HeroSection.tsx` | CTAs hero | Si un bouton principal « Contact » ou « Démarrer », le passer en split. |
| `components/TestimonialsCarousel.tsx` | CTA link | Souvent lien discret ; pas forcément split. |
| `components/NukleoGroupSection.tsx` | Liens avec ArrowUpRight | Cards / liens, pas CTA plein écran ; optionnel. |
| `pages/Resources.tsx` | Boutons outils / newsletter | CTA principaux de section → split ; liens secondaires → laisser ou style outline. |
| `pages/AIGlossary.tsx` | CTA Section (si page encore utilisée) | Même règle : CTA principal en split. |
| `pages/RadarNew.tsx` | RadarCTA | Vérifier `RadarCTA` : si bouton principal, split. |

---

## Ordre de mise en œuvre suggéré

1. **Créer le composant** `SplitCTAButton` (ou équivalent) avec les props ci-dessus et le style aligné sur HomepageDemo5.
2. **Remplacer les CTA « à modifier »** (tableau 2) un par un, en commençant par les pages les plus visibles :
   - `ServiceDetailLayout.tsx` (toutes les pages services)
   - `About.tsx`
   - `FAQ.tsx`
   - `Header.tsx`
   - `Services.tsx`
   - `CTASection.tsx`
   - `Approche.tsx`
3. **Vérifier les CTA secondaires** (tableau 3) et appliquer le split uniquement aux CTA principaux de section.
4. **Tests** : vérifier visuellement `/fr`, `/fr/about`, `/fr/contact`, `/fr/faq`, `/fr/services`, `/fr/services/tech`, header sur toutes les pages, et liens clavier / screen reader.

---

## Constantes de style à centraliser (optionnel)

- Couleur primaire CTA : `#5B21B6` (BTN_PURPLE).
- Largeur zone flèche : `52px` (ou variable CSS).
- `boxShadow` : `0 4px 14px rgba(91,33,182,0.25)`.
- Taille icône : `ArrowUpRight size={20} strokeWidth={2.5}`.

Ces valeurs peuvent être définies dans le composant `SplitCTAButton` ou dans un fichier de thème.
