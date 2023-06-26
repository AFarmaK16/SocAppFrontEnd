export const formFields = {
  account: [
    { label: "Nom", name: "name", type: "text" },
    { label: "Prenom", name: "name", type: "text" },
    { label: "Identifiant", name: "username", type: "text" },
    { label: "Mot de passe", name: "password", type: "password" },
    { label: "Role", name: "role", type: "select" },
  ],
  product: [
    // ✔
    { label: "Nom Qualité Produit", name: "product_label", type: "text" },

    { label: "Code Qualité Produit", name: "product_type", type: "text" },
    { label: "Tarification", name: "tarification", type: "select" },
    {
      label: " Description",
      name: "product_description",
      type: "text",
    },
  ],
  payMode: [
    // ✔
    { label: "Nom", name: "name", type: "text" },
    { label: "Type", name: "paymentMode", type: "select" },
  ],
  destination: [
    // ✔
    { label: "Destination Name", name: "city", type: "text" },
    { label: "Tarification", name: "tarification", type: "select" },
  ],
  tarification: [
    { label: "Date Fin", name: "datefin", type: "date" },
    { label: "Montant", name: "montant", type: "number" },
  ],
  payType: [
    // ✔
    { label: "Libelle", name: "libelle", type: "text" },
  ],
};
