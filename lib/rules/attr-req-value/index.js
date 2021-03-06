const { is_boolean_attribute } = require("../../knife");
const { is_tag_node, has_non_empty_attribute } = require("../../knife/tag_utils");

module.exports = {
  name: "attr-req-value",
  on: "dom"
};

module.exports.lint = function(node, opts, { report }) {
  if (is_tag_node(node) === false) {
    return;
  }
  // TODO: Remove after `raw-ignore-text` refacto
  const attributes = node.attributes.filter(({ name }) => /^¤+$/.test(name.chars) === false);
  attributes.forEach(attribute => {
    const name = attribute.name.chars.toLowerCase();

    if (!has_non_empty_attribute(node, name) && !is_boolean_attribute(name)) {
      report({
        code: "E006",
        position: attribute.loc,
        meta: {
          data: {
            attribute: name
          }
        }
      });
    }
  });
};
