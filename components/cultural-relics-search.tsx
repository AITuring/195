'use client'

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CulturalRelic {
  名称: string;
  时代: string;
  出土地点: string;
  出土时间: string;
  现藏: string;
  批次: string;
  简介: string;
}

export function CulturalRelicsSearchComponent() {
  const [relics, setRelics] = useState<CulturalRelic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [randomImage, setRandomImage] = useState('');


  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For this example, we'll use a mock fetch function
    const fetchData = async () => {
      try {
        const response = await fetch('/culture.json');
        const data = await response.json();
        setRelics(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const images = ['a.png', 'b.png', 'c.png'];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  const filteredRelics = relics.filter(relic =>
    relic.名称.toLowerCase().includes(searchTerm.toLowerCase()) ||
    relic.时代.toLowerCase().includes(searchTerm.toLowerCase()) ||
    relic.出土地点.toLowerCase().includes(searchTerm.toLowerCase()) ||
    relic.现藏.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
      <Image src={`/assets/search/${randomImage}`} alt="Logo" width={36} height={36} />
      <h1 className="text-2xl font-bold ml-2">禁止出境展览文物</h1>
      </div>
      <Input
        type="text"
        placeholder="搜索文物名称、时代、出土地点或现藏地点..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRelics.map((relic, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{relic.名称}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>时代：</strong>{relic.时代}</p>
              <p><strong>出土地点：</strong>{relic.出土地点}</p>
              <p><strong>出土时间：</strong>{relic.出土时间}</p>
              <p><strong>现藏：</strong>{relic.现藏}</p>
              <p><strong>批次：</strong>{relic.批次}</p>
              <p className="mt-2"><strong>简介：</strong>{relic.简介}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}