<!-- cSpell:words aonprd azoralaw communityuse fancontent foundryvtt nethys orclicense paizo pathfinder2e -->

# Pathfinder Second Edition notice decision

This file records the choices for the Pathfinder Second Edition character creator, then reads each notice against those choices. [`LEGAL.md`](../LEGAL.md) is the notice text. This file is why that text is what it is.

The reading is of Paizo's published policy pages at the time of writing. When one of those pages changes, re-read it before trusting the evaluation that cites it.

## How to use this file

The choices state what the project does. Each notice under them says whether those choices require it in full, in part, or not at all, and which change would produce a different result. The summary lists the notices those results require today.

When a choice changes, follow [After a change](#after-a-change).

## Project

The repository is a static, public site of browser character creators. There is no backend. Characters stay in the browser that created them.

The project name is "RPG character creator". The application name is "Pathfinder Second Edition character creator". Contact is the GitHub profile [github.com/vasilii-kovalev](https://github.com/vasilii-kovalev). The email already listed on that profile is the contact method.

The Pathfinder application's job in this version is to show that character choices change the character's statistics. It needs enough classes, specializations, origins, feats, traits, and conditions to make that visible. It does not need every option in every book.

The goals that shape the code are in [Goals](../README.md#goals).

## Choices

### Free access

The project is non-profit. The application is free to open and free to use. There is no price, paywall, account, survey, or mailing-list opt-in. There is no donation link, advertising, or sponsor.

### A character creator under the Pathfinder name

The application creates Pathfinder Second Edition characters and uses that name in the interface and the repository.

### Player Core and Player Core 2, in this project's own words

The rules sources are the remaster books Pathfinder Player Core and Pathfinder Player Core 2. The application uses the names of those rules and short original descriptions of their mechanical effects. It does not reproduce the books' prose. GM Core, Monster Core, and the pre-remaster books are out of this version.

### No lore, art, logos, or maps

The application does not include the books' lore, art, logos, or maps. It does not use a compatibility logo or the Pathfinder-icons font.

### Setting names only when they change a mechanic

Deity and setting names appear only where they change a choice on the character. In the remaster, a deity restriction is sanctification, edicts, and anathema. Ancestries use boosts and flaws.

### Other people's reference material

[Archives of Nethys](https://2e.aonprd.com/) is the official free rules reference for reading the Player Core and Player Core 2 rules. [foundryvtt/pf2e](https://github.com/foundryvtt/pf2e) is a public implementation used to see how options are arranged. Wording from either source stays out of the application.

### Paizo only, on this website

This application uses material from Paizo and from no other publisher. It is this website. It is not a Pathfinder Infinite title, a sold video game, or a mass-produced product.

### The project's own code

The source code, the tests, the interface, and the site design are the project's own material and are released under the MIT license in [`LICENSE`](../LICENSE). The adapted rule descriptions are rules content.

## Notices

### Community Use Policy

[paizo.com/licenses/communityuse](https://paizo.com/licenses/communityuse)

Applied in part. It is the permission for the Pathfinder name and for deity and setting names used where they change a character choice. The mechanical descriptions and the project's own code sit outside it.

The policy requires a project to be free for everyone to access, including free of hassle in front of the content. The free-access choice meets that. Free access is the condition this result depends on. The project being non-profit is a separate fact. Donations, advertising, and a clearly named sponsor are allowed by the policy and would keep this result, provided access itself stays free.

[`LEGAL.md`](../LEGAL.md) includes Paizo's required paragraph in full, with the product name "Pathfinder Second Edition character creator". The contact line is the GitHub profile. The email stays on the profile.

The paragraph and the contact line have to appear on the website. An installable or offline copy has to include the same paragraph and the same contact line. Links to Paizo and GitHub can wait until the device is online.

This result changes when access costs money, sits behind a paywall, or requires an account or a similar gate. For a paid RPG publication, Paizo points publishers to Pathfinder Infinite or a commercial license.

This policy can be dropped when the application no longer uses the Pathfinder name, deity or setting names, or any other Paizo material that this policy is the permission for.

### ORC License

[paizo.com/orclicense](https://paizo.com/orclicense)

Applied in part, to the mechanical descriptions from Player Core and Player Core 2. Paizo's [license overview](https://paizo.com/licenses/) says an RPG product that uses mechanics Paizo released under the ORC License has to comply with it. Prose, lore, art, logos, maps, the Pathfinder name, setting names, and the project's own code stay outside it.

[`LEGAL.md`](../LEGAL.md) includes the four statements the license asks for. The ORC notice says where the license is and that warranties are disclaimed, and the license text is placed at "available online at various locations including paizo.com/orclicense, azoralaw.com/orclicense, and others." Attribution names Pathfinder Player Core and Pathfinder Player Core 2 and asks a downstream user to credit "RPG character creator © 2026 Vasilii Kovalev". Reserved material names "RPG character creator", the source code, the tests, the interface, and the site design, except where they express game mechanics. Expressly designated licensed material is none, so the project's own code and name are not offered onward under this license. Mechanics the application expresses are licensed material by the ORC definition.

The authors lines were matched to public reproductions of the copyright notices, including the licenses page on pathfinder2e.org for Player Core. Reproductions of the Player Core 2 line include no "Designed by" clause. The copyright page inside each book is the check before that line is treated as final.

The same ORC section has to appear in the application, including an offline copy.

Adding GM Core or Monster Core keeps this result and adds that book and its authors to the attribution. Dropping every ORC mechanic lets this section go.

### MIT License

[`LICENSE`](../LICENSE)

Applied in full to the project's own code, and not to the adapted rules. The ORC License does not allow different terms on licensed material, so those rules stay under the ORC section of [`LEGAL.md`](../LEGAL.md).

Offering the interface, the tests, or the project name as expressly designated licensed material would change the ORC section. The MIT file would still cover the code.

### Fan Content Policy

[paizo.com/licenses/fancontent](https://paizo.com/licenses/fancontent/)

Not applied. The project is a character creator that uses rule names and mechanical descriptions. The policy excludes character generators, character builders, rules databases, and other RPG products. [Paizo's license overview](https://paizo.com/licenses/) says the policy does not cover products that contain game mechanics.

It would apply to a separate fan work the policy covers, such as an actual-play stream or physical merchandise. The character creator staying free does not bring it under this policy.

### Compatibility License

[paizo.com/licenses/compatibility](https://paizo.com/licenses/compatibility)

Not applied. The license grants the compatibility logos and the Pathfinder-icons font, for products compatible with the named game and for advertising those products. Paizo's Fan Content Policy FAQ describes that grant as the whole license. It does not grant rules text or setting lore.

It would apply in addition to the Community Use Policy and the ORC License if the project used that logo or font.

Setting lore written in this project's own words on the free site would stay under the Community Use Policy. The attribution would have to include the copyright and trademark notices from the Paizo material actually used.

### Open Game License

Described on [Paizo's license overview](https://paizo.com/licenses/). Not applied. The rules sources are the remaster Player Core and Player Core 2, which Paizo published under the ORC License.

It would apply in part to mechanics that exist only under the Open Game License. A pre-remaster Pathfinder Second Edition book is the usual case. That part would carry this license, and the Player Core and Player Core 2 parts would keep the ORC License. Paizo's overview says Open Game Content cannot be republished as ORC licensed material, and ORC content cannot be republished as Open Game Content.

### Pathfinder Infinite

[Pathfinder Infinite and the ORC License](https://paizo.com/blog/pathfinder-infinite-and-the-orc-license)

Not applied.

It would apply to this creator, or a body of its content, published on Pathfinder Infinite. The notice for that publication would follow Infinite's agreement. That agreement prohibits releasing the Infinite product as ORC licensed material. The website would keep the summary below for as long as the website itself still matches the choices above.

### Commercial license

Described on [Paizo's license overview](https://paizo.com/licenses/). Not applied. Paizo grants this license case by case for products outside the public policies, including video games, film and television, and mass-produced goods.

It would apply if the project were offered as that kind of product. Charging for access would also end the Community Use result above.

## Required notices

For the choices as they stand:

- The Community Use Policy, in part, for the Pathfinder name and for deity and setting names. Paizo's required paragraph and the GitHub contact are in [`LEGAL.md`](../LEGAL.md), and they have to appear in the application.
- The ORC License, in part, for the Player Core and Player Core 2 names and short original mechanical descriptions. The four-part notice is in [`LEGAL.md`](../LEGAL.md), and it has to appear in the application.
- The MIT License, in full for the source code, the tests, the interface, and the site design, in [`LICENSE`](../LICENSE). It does not cover the adapted rules.

The Fan Content Policy, the Compatibility License, the Open Game License, Pathfinder Infinite, and a commercial license are unused.

## A game notice inside LICENSE

[`LICENSE`](../LICENSE) stays the MIT code license, so license detection still sees MIT. The game notice stays in [`LEGAL.md`](../LEGAL.md) and in the application.

## After a change

1. Update the choice in this file, including a choice that is new.
2. Re-read each notice against the choices and update its result.
3. Update [Required notices](#required-notices) to match those results.
4. Update [`LEGAL.md`](../LEGAL.md), and the same text in the application, to match that summary. A new remaster book, a credit, or a contact detail is an edit inside a notice the summary already lists. Placement of the text in the interface can change on its own.
