import React from 'react';
import { BarChart3, Users, FileText, FolderOpen, TrendingUp, Clock, Globe, Activity } from 'lucide-react';
import { useDashboardData, useGrowthMetrics } from '../../contexts/AnalyticsContext';

export const AdminDashboard: React.FC = () => {
  const { dashboardStats, loading, error, lastUpdated } = useDashboardData();
  const {
    userGrowthRate,
    projectsCompletedThisMonth,
    newUsersThisMonth,
    averageProgress,
    completionRate
  } = useGrowthMetrics();

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Erreur de chargement</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardStats) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        {lastUpdated && (
          <div className="text-sm text-gray-500">
            Dernière mise à jour: {lastUpdated.toLocaleTimeString('fr-FR')}
          </div>
        )}
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pages</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalPages}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{newUsersThisMonth} ce mois</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FolderOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Projets</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeProjects}</p>
              <p className="text-xs text-purple-600">{projectsCompletedThisMonth} terminés ce mois</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Globe className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Visiteurs</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.monthlyVisitors.toLocaleString()}</p>
              <p className="text-xs text-yellow-600">Ce mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métriques de Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">Uptime du système</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">{dashboardStats.systemUptime}%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${dashboardStats.systemUptime}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">Note moyenne des cours</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">{dashboardStats.averageRating}/5</span>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(dashboardStats.averageRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Taux de completion</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900">{dashboardStats.completionRate}%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${dashboardStats.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité en Temps Réel</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-600">Utilisateurs en ligne</span>
              </div>
              <span className="text-lg font-semibold text-green-600">{dashboardStats.onlineUsers}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm text-gray-600">Messages échangés</span>
              </div>
              <span className="text-lg font-semibold text-blue-600">{dashboardStats.messagesExchanged}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm text-gray-600">Croissance utilisateurs</span>
              </div>
              <span className="text-lg font-semibold text-purple-600">+{userGrowthRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">
                {newUsersThisMonth} nouveaux utilisateurs inscrits ce mois - il y a quelques minutes
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">
                {projectsCompletedThisMonth} projets terminés ce mois - il y a 2 heures
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">
                Système mis à jour avec {dashboardStats.systemUptime}% d'uptime - il y a 1 jour
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              <p className="text-sm text-gray-600">
                Taux de completion des cours: {dashboardStats.completionRate}% - il y a 2 jours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};