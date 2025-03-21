
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import FoodManager from '@/components/admin/FoodManager';
import CategoryManager from '@/components/admin/CategoryManager';
import BannerManager from '@/components/admin/BannerManager';
import AdminHeader from '@/components/admin/AdminHeader';

const Admin = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader onSignOut={() => {}} />
      
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">TrendyVaults Dashboard</h1>
          <p className="text-gray-600">Manage your Trendy Food content</p>
        </div>
        
        <Tabs defaultValue="foods" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="foods">Food Items</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="banners">Banner Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="foods" className="space-y-4">
            <FoodManager />
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <CategoryManager />
          </TabsContent>
          
          <TabsContent value="banners" className="space-y-4">
            <BannerManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
