/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SentinelProvider } from './hooks/useSentinelState';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { GlobalRiskCenter } from './pages/GlobalRiskCenter';
import { NewsIntelligenceFeed } from './pages/NewsIntelligenceFeed';
import { SupplyChainDigitalTwin } from './pages/SupplyChainDigitalTwin';
import { RiskAssessmentEngine } from './pages/RiskAssessmentEngine';
import { AlternativeSuppliers } from './pages/AlternativeSuppliers';
import { VoiceAICommandCenter } from './pages/VoiceAICommandCenter';
import { AWSArchitecture } from './pages/AWSArchitecture';
import { AnalyticsDeepDive } from './pages/AnalyticsDeepDive';
import { AlertControlCenter } from './pages/AlertControlCenter';
import { OrgSettings } from './pages/OrgSettings';
import { Team } from './pages/Team';

export default function App() {
  return (
    <Router>
      <SentinelProvider>
        <Routes>
          {/* Public Venture Landing View */}
          <Route path="/" element={<LandingPage />} />

          {/* Console Admin Workspace nested routes */}
          <Route
            path="/app/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="dashboard" element={<ExecutiveDashboard />} />
                  <Route path="risk-center" element={<GlobalRiskCenter />} />
                  <Route path="news-feed" element={<NewsIntelligenceFeed />} />
                  <Route path="digital-twin" element={<SupplyChainDigitalTwin />} />
                  <Route path="risk-engine" element={<RiskAssessmentEngine />} />
                  <Route path="alternatives" element={<AlternativeSuppliers />} />
                  <Route path="voice-ai" element={<VoiceAICommandCenter />} />
                  <Route path="aws-architecture" element={<AWSArchitecture />} />
                  <Route path="analytics" element={<AnalyticsDeepDive />} />
                  <Route path="alerts" element={<AlertControlCenter />} />
                  <Route path="settings" element={<OrgSettings />} />
                  <Route path="team" element={<Team />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </DashboardLayout>
            }
          />

          {/* Global Fallback redirections */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SentinelProvider>
    </Router>
  );
}
