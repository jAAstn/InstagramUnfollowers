import React, { useState } from "react";
import { Timings } from "../model/timings";
import { FeatureSettings, LastPostMode } from "../model/last-post";
import { UserNode } from "../model/user";
import { WhitelistManager } from "./WhitelistManager";
import { DEFAULT_USERS_PER_SEARCH_CYCLE } from "../constants/constants";
import { Language, t } from "../utils/i18n";

interface SettingMenuProps {
  setSettingState: (state: boolean) => void;
  currentTimings: Timings;
  setTimings: (timings: Timings) => void;
  featureSettings: FeatureSettings;
  setFeatureSettings: (settings: FeatureSettings) => void;
  whitelistedUsers: readonly UserNode[];
  onWhitelistUpdate: (users: readonly UserNode[]) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SettingMenu = ({
  setSettingState,
  currentTimings,
  setTimings,
  featureSettings,
  setFeatureSettings,
  whitelistedUsers,
  onWhitelistUpdate,
  lang,
  onLanguageChange,
}: SettingMenuProps) => {
  const [timeBetweenSearchCycles, setTimeBetweenSearchCycles] = useState(currentTimings.timeBetweenSearchCycles);
  const [timeToWaitAfterFiveSearchCycles, setTimeToWaitAfterFiveSearchCycles] = useState(currentTimings.timeToWaitAfterFiveSearchCycles);
  const [timeBetweenUnfollows, setTimeBetweenUnfollows] = useState(currentTimings.timeBetweenUnfollows);
  const [timeToWaitAfterFiveUnfollows, setTimeToWaitAfterFiveUnfollows] = useState(currentTimings.timeToWaitAfterFiveUnfollows);
  const [usersPerSearchCycle, setUsersPerSearchCycle] = useState(currentTimings.usersPerSearchCycle ?? DEFAULT_USERS_PER_SEARCH_CYCLE);
  const [lastPostBadgeEnabled, setLastPostBadgeEnabled] = useState(featureSettings.lastPostBadgeEnabled);
  const [lastPostMode, setLastPostMode] = useState<LastPostMode>(featureSettings.lastPostMode);

  const handleSave = (event: any) => {
    event.preventDefault();
    setTimings({
      timeBetweenSearchCycles,
      timeToWaitAfterFiveSearchCycles,
      timeBetweenUnfollows,
      timeToWaitAfterFiveUnfollows,
      usersPerSearchCycle,
    });
    setFeatureSettings({
      lastPostBadgeEnabled,
      lastPostMode,
    });
    setSettingState(false);
  };

  // @ts-ignore
  const handleInputChange = (event: any, setter: (value: number) => void) => {

    const value = Number(event?.target?.value);
    setter(value);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="backdrop">
        <div className="setting-menu">
          {/* Settings Module */}
          <div className="settings-module">
            <div className="module-header">
              <h3>{t(lang, "settingsTitle")}</h3>
            </div>

            <div className="settings-content">
              <div className="row">
                <label className="minimun-width">{t(lang, "language")}</label>
                <select
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}
                  value={lang}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onLanguageChange(e.currentTarget.value as Language)}
                >
                  <option value="en" style={{ background: "#222" }}>English (EN)</option>
                  <option value="es" style={{ background: "#222" }}>Español (ES)</option>
                </select>
              </div>

              <div className="row">
                <label className="minimun-width">{t(lang, "timeBetweenSearchCycles")}</label>
                <input
                  type="number"
                  id="searchCycles"
                  name="searchCycles"
                  min={500}
                  max={999999}
                  value={timeBetweenSearchCycles}
                  onChange={(e) => handleInputChange(e, setTimeBetweenSearchCycles)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">{t(lang, "timeToWaitAfterFiveCycles")}</label>
                <input
                  type="number"
                  id="fiveSearchCycles"
                  name="fiveSearchCycles"
                  min={4000}
                  max={999999}
                  value={timeToWaitAfterFiveSearchCycles}
                  onChange={(e) => handleInputChange(e, setTimeToWaitAfterFiveSearchCycles)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">{t(lang, "timeBetweenUnfollows")}</label>
                <input
                  type="number"
                  id="timeBetweenUnfollow"
                  name="timeBetweenUnfollow"
                  min={1000}
                  max={999999}
                  value={timeBetweenUnfollows}
                  onChange={(e) => handleInputChange(e, setTimeBetweenUnfollows)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">{t(lang, "timeToWaitAfterFiveUnfollows")}</label>
                <input
                  type="number"
                  id="timeAfterFiveUnfollows"
                  name="timeAfterFiveUnfollows"
                  min={70000}
                  max={999999}
                  value={timeToWaitAfterFiveUnfollows}
                  onChange={(e) => handleInputChange(e, setTimeToWaitAfterFiveUnfollows)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">{t(lang, "usersPerSearchCycle")}</label>
                <input
                  type="number"
                  id="usersPerSearchCycle"
                  name="usersPerSearchCycle"
                  min={1}
                  max={200}
                  value={usersPerSearchCycle}
                  onChange={(e) => handleInputChange(e, setUsersPerSearchCycle)}
                />
                <label className="margin-between-input-and-label">(users)</label>
              </div>

              <div className="warning-container">
                <h3 className="warning"><b>{t(lang, "warningPrefix")}</b> {t(lang, "settingsWarning1")}</h3>
                <h3 className="warning">{t(lang, "settingsWarning2")}</h3>
              </div>

              <div className="row">
                <label className="minimun-width">Show last-post age</label>
                <input
                  type="checkbox"
                  id="lastPostBadgeEnabled"
                  name="lastPostBadgeEnabled"
                  checked={lastPostBadgeEnabled}
                  onChange={(e) => setLastPostBadgeEnabled(e.currentTarget.checked)}
                />
              </div>

              {lastPostBadgeEnabled && (
                <>
                  <div className="row">
                    {(["manual", "auto"] as const).map(mode => (
                      <label key={mode} className="margin-between-input-and-label">
                        <input type="radio" name="lastPostMode" value={mode} checked={lastPostMode === mode} onChange={() => setLastPostMode(mode)} />
                        &nbsp;{mode === "manual" ? "Manual (on click)" : "Auto (visible cards)"}
                      </label>
                    ))}
                  </div>
                  <p className="margin-between-input-and-label">
                    Only fetches when the scan is finished or paused, one account at a time, and caches each result.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="module-divider" />

          {/* Whitelist Management Module */}
          <div className="whitelist-module">
            <WhitelistManager
              whitelistedUsers={whitelistedUsers}
              onWhitelistUpdate={onWhitelistUpdate}
              lang={lang}
            />
          </div>

          {/* Action Buttons */}
          <div className="btn-container">
            <button className="btn" type="button" onClick={() => setSettingState(false)}>
              {t(lang, "cancel")}
            </button>
            <button className="btn" type="submit">
              {t(lang, "save")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
