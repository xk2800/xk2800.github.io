import { archiveEntry } from "./archiveEntry";
import { experience } from "./experience";
import { project } from "./project";
import { skillGroup } from "./skillGroup";
import { navigation } from "./navigation";
import { profile } from "./profile";
import { linksPage } from "./linksPage";
import { markRequired } from "./markRequired";

export const schemaTypes = [experience, project, skillGroup, archiveEntry, profile, navigation, linksPage].map(
  markRequired,
);
