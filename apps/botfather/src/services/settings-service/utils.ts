export const sanitizeGroupNames = (groupNames: string[]) => {
  return groupNames.map((groupName) => {
    return (
      "@" + groupName.replace("https://t.me/", "").replace("http://t.me/", "")
    );
  });
};
