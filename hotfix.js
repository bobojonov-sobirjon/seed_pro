// Emergency hotfix for hasOwnProperty error
// Add this script to your production HTML before the main bundle

// Override hasOwnProperty to handle undefined objects
if (typeof Object.prototype.hasOwnProperty === 'function') {
  const originalHasOwnProperty = Object.prototype.hasOwnProperty;
  Object.prototype.hasOwnProperty = function(prop) {
    if (this == null || this === undefined) {
      return false;
    }
    return originalHasOwnProperty.call(this, prop);
  };
}

// Alternative: Add safe hasOwnProperty check
if (typeof Object.prototype.safeHasOwnProperty === 'undefined') {
  Object.prototype.safeHasOwnProperty = function(prop) {
    return this != null && typeof this === 'object' && Object.prototype.hasOwnProperty.call(this, prop);
  };
}
