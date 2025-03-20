
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import FoodManager from '@/components/admin/FoodManager';
import CategoryManager from '@/components/admin/CategoryManager';
import BannerManager from '@/components/admin/BannerManager';
import AdminHeader from '@/components/admin/AdminHeader';

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }
        
        // Check if user is an admin
        const { data, error } = await supabase.rpc('has_role', {
          user_id: session.user.id,
          required_role: 'admin'
        });
        
        if (error) throw error;
        
        setIsAdmin(!!data);
        
        if (!data) {
          // User is authenticated but not an admin
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges. Please contact an administrator.",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        console.error('Error checking auth status:', error);
        toast({
          title: "Authentication Error",
          description: error.message || "There was a problem verifying your credentials",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-food-primary/30 border-t-food-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access the admin panel.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')}>Go to Homepage</Button>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminHeader onSignOut={handleSignOut} />
      
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
